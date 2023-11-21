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