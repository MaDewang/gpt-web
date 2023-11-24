// @ts-ignore
import tokenMap from "/public/tokenMap.json"
type TokenMap = {
    [key: string]: string;
}
type TokenMapKey = keyof TokenMap

export const getTokens = () => {
    return Object.keys(tokenMap).map(key => {
        return {
            label: key,
            value: tokenMap[key]
        }
    })
}
let modelType: TokenMapKey = Object.keys(tokenMap)[0]

export const getModelType = () => {
    return modelType
}

export const setModelType =(type: string) => {
    if (tokenMap[type]) {
        modelType = type
        localStorage.setItem('modelType', type)
    }
}

export const getToken = () => {
    return tokenMap[modelType]
}
setModelType(String(localStorage.getItem('modelType') || modelType))