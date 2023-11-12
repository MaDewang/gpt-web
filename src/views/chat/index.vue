<template>
    <div class="chat">
        <FoldContainer>
            <template #sider>
                <div class="chat-sessions flex flex-col h-full">
                    <div class="flex justify-between p-3">
                        <el-input v-model="inputVal" class="w-50 m-2" placeholder="输入搜索对话" :prefix-icon="Search" />
                        <el-button :icon="Plus" circle />
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
                                        <IconFont type="diandian" class="icon" />
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
                                <div role="none" class="n-scrollbar-container">
                                    <div v-for="message in messages" :key="message.id"
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
                                                        {{ message.content }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="mt-2 text-xs text-muted chat-toolbar"></div>
                                        </div>

                                    </div>
                                </div>
                                <div class="n-scrollbar-rail n-scrollbar-rail--vertical" data-scrollbar-rail="true"
                                    aria-hidden="true"><!----></div><!---->
                            </div>
                        </div>
                        <div class="chat-input-box">
                            <div class="flex items-center">
                                <el-input v-model="inputVal2" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                                    placeholder="输入消息内容（Shift+Enter换行）" />
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
import { computed, ref } from 'vue'
const inputVal = ref('')
const activeId = ref(1)
const activeSession = computed(() => {
    return sessionlist.value.find(item => item.id === activeId.value)
})
type session = {
    id: number,
    title: string,
    content: string,
    time: string
}
const sessionlist = ref<session[]>([
    {
        id: 1,
        title: '测试1',
        content: '测试1',
        time: '2021-08-01 12:00:00',

    },
    {
        id: 2,
        title: '测试2',
        content: '测试2',
        time: '2021-08-01 12:00:00',

    }
])

const itemClick = (item: session) => {
    activeId.value = item.id
}

const messages = ref([
    // 初始化对话消息
    { id: 1, content: "你好，欢迎来到ChatGPT！", isUser: false }
]
)
const inputVal2 = ref('')
const sendMessage = () => {
    if (inputVal2.value.trim() !== "") {
        // 添加用户输入消息到对话列表
        messages.value.push({
            id: new Date().getTime(),
            content: inputVal2.value,
            isUser: true
        });
        // 清空用户输入
        inputVal2.value = "";
        // 发送消息给ChatGPT进行处理（这里只是模拟）
        setTimeout(() => {
            messages.value.push({
                id: new Date().getTime(),
                content: "这是ChatGPT的回复",
                isUser: false
            });
        }, 1000);
    }
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
</style>