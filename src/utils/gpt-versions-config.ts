type TokenMap = {
    '1': string,
    '2': string
}
type TokenMapKey = keyof TokenMap

export const tokenMap = {
    1: 'app-qnXAy7ykODkZf6QxbNgLtAVd',
    2: 'app-qnXAy7ykODkZf6QxbNgLtAVd',
}
let modelType: TokenMapKey = '1'

export const getModelType = () => {
    return modelType
}

export const setModelType =(type: keyof TokenMap) => {
    if (tokenMap[type]) {
        modelType = type
        localStorage.setItem('modelType', type)
    }
}

export const getToken = () => {
    return tokenMap[modelType]
}
setModelType(localStorage.getItem('modelType') as TokenMapKey || '1')