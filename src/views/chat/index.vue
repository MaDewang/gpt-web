<template>
    <div class="chat">
        <FoldContainer>
            <template #sider>
                <div class="chat-sessions flex flex-col h-full">
                    <div class="flex justify-between p-3">
                        <el-input v-model="inputVal" class="w-50 m-2" placeholder="输入搜索对话" :prefix-icon="Search" />
                        <el-button :icon="Plus" circle @click="newMessage" />
                    </div>
                    <div class="sessions-box p-3 pt-0">
                        <div :class="['sessions', { active: item.id === activeId }]" v-for="item in sessionlist"
                            :key="item.id" @click="itemClick(item)">
                            <div class="flex justify-between items-center">
                                <div class="pr-3 truncate">
                                    <div class="truncate flex items-center"><!----><span>{{ item.title }}</span></div>
                                    <div class="text-muted text-xs">{{ item.time }}</div>
                                </div>
                                <div class="opt flex-shrink-0 text-lg text-sm">
                                    <div role="none" class="n-space animate__animated animate__fadeInRight animate__faster"
                                        style="display: flex; flex-flow: wrap; justify-content: flex-start; gap: 4px 8px;">
                                        <IconFont type="wenbenshuru" class="icon" />
                                        <el-popover popper-class="diandian-popper" :width="60">
                                            <el-button type="danger" text @click="handleDelSession(item)">删除</el-button>
                                            <template #reference>
                                                <IconFont type="diandian" class="icon" />
                                            </template>
                                        </el-popover>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #main>
                <div class="chat-box h-full p-3 flex overflow-hidden pt-0">
                    <div class="chat-main-box h-full w-full">
                        <div class="chat-header py-2 flex justify-between items-center min-w-0">
                            <div class="truncate pr-1">
                                <div class="text-base font-bold truncate">{{ activeSession?.title }}</div>
                                <!---->
                            </div>
                            <div class="flex-shrink-0">
                                <div role="none" class="n-space"
                                    style="display: flex; flex-flow: wrap; justify-content: flex-start; gap: 4px 8px;">
                                    <IconFont type="wenbenshuru" class="icon" />
                                </div>
                            </div>
                        </div>
                        <div class="chat-items">
                            <div id="chat-content" role="none" class="n-scrollbar"
                                style="--n-scrollbar-bezier: cubic-bezier(.4, 0, .2, 1); --n-scrollbar-color: rgba(0, 0, 0, 0.25); --n-scrollbar-color-hover: rgba(0, 0, 0, 0.4); --n-scrollbar-border-radius: 5px; --n-scrollbar-width: 5px; --n-scrollbar-height: 5px;">
                                <div role="none" class="n-scrollbar-container" ref="scrollbarContainer">
                                    <div v-for="message in activeSession?.messages" :key="message.id"
                                        :class="['chat-item', 'p-3', 'mode-list', { user: message.isUser }, { ai: !message.isUser }]">
                                        <span class="n-avatar chat-avatar flex-shrink-0" data-v-e6e4f7e3=""
                                            style="--n-font-size: 14px; --n-border: none; --n-border-radius: 50%; --n-color: rgba(204, 204, 204, 1); --n-color-modal: rgba(204, 204, 204, 1); --n-color-popover: rgba(204, 204, 204, 1); --n-bezier: cubic-bezier(.4, 0, .2, 1); --n-merged-size: var(--n-avatar-size-override, 40px);"><img
                                                crossorigin="anonymous" loading="lazy"
                                                :src="message.isUser ? 'https://zxai.vip/assets/b1-b6f6889f.webp' : 'https://zxai.vip/file/upload/2023/08/24/1694707840544935936.png'"
                                                data-image-src="https://zxai.vip/assets/b1-b6f6889f.webp"><!----></span>

                                        <div class="content max-w-full overflow-hidden">
                                            <div class="chat-text">
                                                <div class="whitespace-pre-wrap mt-2">
                                                    <p>
                                                        <v-md-preview :text="message.content"></v-md-preview>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="mt-2 text-xs text-muted chat-toolbar">
                                                <el-button v-if="message.answering" type="danger" text @click="() => message.cancelRequest && message.cancelRequest()">取消回答</el-button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="n-scrollbar-rail n-scrollbar-rail--vertical" data-scrollbar-rail="true"
                                    aria-hidden="true"><!----></div><!---->
                            </div>
                        </div>
                        <div class="tool">
                            
                        </div>
                        <div class="chat-input-box">
                            <div class="flex items-center">
                                <el-input v-model="inputVal2" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                                 placeholder="输入消息内容（Shift+Enter换行）" @keydown="handleKeyDown"
                                    clearable />
                                <el-button :icon="Promotion" circle @click="sendMessage" />
                            </div>
                        </div>
                    </div>
                </div>

            </template>
        </FoldContainer>
    </div>
</template>

<script lang="ts" setup>
import FoldContainer from '@/components/FoldContainer.vue';
import { Search, Plus, Promotion } from '@element-plus/icons-vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { conversations, getMessages, chatMessages, delSession } from '@/api/index'
import { ElInput, ElButton, ElPopover, } from 'element-plus';
const inputVal = ref('')
const activeId = ref('')

type Session = {
    id: string,
    title: string,
    messages: Message[],
    time: string,
    isnew?: boolean
}
type Message = { id: string; content: string; isUser: boolean; cancelRequest?: () => void, answering?: boolean }
const sessionlist = ref<Session[]>([])
const activeSession = computed<Session>(() => {
    return sessionlist.value.find(item => item.id === activeId.value) || sessionlist.value[0]
})
const itemClick = (item: Session) => {
    if (activeId.value === item.id) return
    activeId.value = item.id
    getMessageList(item)
}

let idCount = 0
const newMessage = () => {
    idCount++
    sessionlist.value.unshift({
        id: String(idCount),
        title: '新对话',
        isnew: true,
        messages: [],
        time: ''
    })
    activeId.value = String(idCount)
}

const scrollbarContainer = ref()
const scrollToEnd = () => {
    setTimeout(() => {
        // 滚动到底部
        if (scrollbarContainer?.value) {
            scrollbarContainer.value.scrollTo(0, scrollbarContainer.value.scrollHeight)
        }
    })
}
const inputVal2 = ref('')
const sendMessage = () => {
    if (inputVal2.value.trim() !== "") {
        // 添加用户输入消息到对话列表
        activeSession.value.messages.push({
            id: String(new Date().getTime()),
            content: inputVal2.value,
            isUser: true
        });
        fetchMessage(inputVal2.value)
        scrollToEnd()
    }
    setTimeout(() => {
        inputVal2.value = "";
    })
    scrollToEnd()
}
type MessagesData = {
    event: string,
    task_id: string,
    id: string,
    answer: string,
    created_at: number,
    conversation_id: string
}
const fetchMessage = async (val: string) => {
    const response: (Response & { cancelRequest?: () => void }) = await chatMessages({
        query: val,
        conversation_id: activeSession.value.isnew ? '' : activeSession.value.id
    })

    if (!response.body) return;

    const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
    const activeData: Message = reactive({
        id: '',
        content: '',
        isUser: false,
        answering: true
    })
    const cancelRequest = () => {
        response?.cancelRequest && response?.cancelRequest()
        activeData.answering = false
    }
    activeData.cancelRequest = cancelRequest
    const len = activeSession.value.messages.length
    activeSession.value.messages.push(activeData)
    while (true) {
        var { value, done } = await reader.read();
        if (done) {
            activeData.answering = false
            break;
        }
        value = value || ''
        const lines = value
            .toString()
            .split("\n\n")
            .filter((line: string) => line.trim() !== "");
        let isEnd = false;
        lines.forEach((item: string) => {
            const dataStr = item?.replace('undefined', '').replace("data: ", "")
            if (dataStr === 'event: ping') return;
            const resData: MessagesData = JSON.parse(dataStr as string)
            if (resData.event === 'message_end') {
                isEnd = true
            } else if (resData.event === 'message') {
                activeData.content += resData.answer
                // 滚动到底部
                scrollToEnd()

                activeSession.value.id = resData.conversation_id
                if (activeSession.value.isnew) {
                    activeSession.value.isnew = false
                    activeSession.value.title = activeSession.value.messages[activeSession.value.messages.length - 2].content
                }
            }
            activeSession.value.messages[len] = activeData
        })
        if (isEnd) {
            activeData.answering = false
            break
        }
    }
}


const handleKeyDown = (event: KeyboardEvent | Event) => {
    if (event instanceof KeyboardEvent) {
    if (event.shiftKey) {
        // 在这里执行带有 shift 键的逻辑
        } else {
            sendMessage()
        }
    }
}

// 获取会话列表
const handleGetConversations = () => {
    // 获取会话列表
    conversations().then(res => {
        const data: [] = res.data as [] || []
        sessionlist.value = data.map((item: any) => {
            return {
                id: item.id,
                title: item.name,
                messages: [],
                time: ''
            }
        })
        if (sessionlist.value.length) {
            activeId.value = sessionlist.value[0].id
        } else {
            newMessage()
        }
        sessionlist.value[0] && getMessageList(sessionlist.value[0])
    })
}

// 获取会话历史
const getMessageList = async (session: Session) => {
    if (session.isnew) return
    const res = await getMessages(session.id)
    const list: Message[] = [];
    (res?.data as []).forEach((item: any) => {
        list.push({ id: item.id, content: item.query, isUser: true }, { id: item.id, content: item.answer, isUser: false })
    })
    session.messages = list
    scrollToEnd()
}

onMounted(() => {
    handleGetConversations()
})

// 删除会话
const handleDelSession = async (item: Session) => {
    if (item.isnew) {
        sessionlist.value = sessionlist.value.filter(v => v.id !== item.id)
        return
    }
    await delSession(item.id)
    handleGetConversations()
}

</script>

<style lang="scss" scoped>
.chat {
    width: 100%;
    height: 100%;

    .chat-sessions {
        width: 100%;
        background-color: var(--aa-bg-second);
        color: rgb(51, 54, 57);

        .sessions-box {
            margin: 0 0 30px;

            .sessions {
                padding: 10px;
                background-color: var(--aa-bg-box);
                border-radius: var(--aa-border-radius);
                border: 1px solid var(--aa-c-border);
                cursor: pointer;
                transition: all .06s;

                .opt {
                    display: none;
                }

                &.active,
                &:hover {
                    background-color: var(--aa-c-primary-low);
                    border-color: var(--aa-c-primary);
                    color: var(--aa-c-primary);

                    .opt {
                        display: block;
                    }
                }

                &:not(:last-child) {
                    margin-bottom: 10px;
                }

            }

        }

    }

    .chat-box {
        background-color: var(--aa-bg-box);
        flex: 1 1;
        box-sizing: border-box;

        .chat-main-box {
            position: relative;
            display: flex;
            flex-direction: column;

            .chat-header {
                border-bottom: 1px solid var(--aa-c-border);
            }

            .chat-items {
                flex: 1 1;
                overflow: auto;
                padding: 10px 0;

                .chat-item {
                    display: flex;
                    border-radius: var(--aa-border-radius);

                    &:not(:last-child) {
                        margin-bottom: 10px;
                    }

                    .n-avatar {
                        margin-right: 10px;
                        --n-font-size: 14px;
                        --n-border: none;
                        --n-border-radius: 50%;
                        --n-color: rgba(204, 204, 204, 1);
                        --n-color-modal: rgba(204, 204, 204, 1);
                        --n-color-popover: rgba(204, 204, 204, 1);
                        --n-bezier: cubic-bezier(.4, 0, .2, 1);
                        --n-merged-size: var(--n-avatar-size-override, 40px);
                        width: var(--n-merged-size);
                        height: var(--n-merged-size);
                        color: #FFF;
                        font-size: var(--n-font-size);
                        display: inline-flex;
                        position: relative;
                        overflow: hidden;
                        text-align: center;
                        border: var(--n-border);
                        border-radius: var(--n-border-radius);
                        --n-merged-color: var(--n-color);
                        background-color: var(--n-merged-color);
                        transition: border-color .3s var(--n-bezier), background-color .3s var(--n-bezier), color .3s var(--n-bezier);
                    }

                    &.ai {
                        background-color: var(--aa-bg-body);
                    }
                }

                .chat-input-box {
                    width: 100%;
                    border-top: 1px solid var(--aa-c-border);
                    padding-top: 10px;
                }
            }
        }
    }

}

::v-deep(.el-button.is-circle) {
    font-size: 16px;
    font-weight: bold;
    margin-left: 12px;
    padding: 8px 24px;
}

::v-deep(.whitespace-pre-wrap) {
    white-space: normal;
}
</style>

<style lang="scss">
.diandian-popper.el-popper {
    padding: 0;
    min-width: 20px;
}
</style>