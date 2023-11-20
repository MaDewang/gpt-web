import RequestHttp from './request'

const server = new RequestHttp()

export const messages = (param: {
    input: {},
    query: '',
    response_mode: 'streaming',
    conversation_id: '',
    user: 'abc-123'
}) => {
    return server.post('/chat-maessages', param)
}