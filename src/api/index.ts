import RequestHttp from './request'

const server = new RequestHttp()

export const getMessages = (conversation_id: string) => {
    return server.get('/messages', {
        first_id: '',
        conversation_id: conversation_id
    })
}

export const conversations = () => {
    return server.get('/conversations')
}

export const chatMessages = ({
    query,
    conversation_id
}: {
    query: string,
    conversation_id : string
}) => {
    return server.stream('/chat-messages', {
        "inputs": {},
        "query": query,
        "response_mode": "streaming",
        "conversation_id": conversation_id
    })
}

export const delSession = (conversation_id: string) => {
    return server.delete(`/conversations/${conversation_id}`)
}

export const cancelChatMessages = () => {
    server.cancelRequest('/chat-messages')
}