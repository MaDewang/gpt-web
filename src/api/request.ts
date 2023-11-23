import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage  } from 'element-plus'
import { getToken } from '@/utils/gpt-versions-config'
import { getFingerprint } from '@/utils/fingerprint'

// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
    code: number;
    msg: string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
    data?: T;
}
enum RequestEnums {
    TIMEOUT = 20000,
    OVERDUE = 600, // 登录失效
    FAIL = 999, // 请求失败
    SUCCESS = 200, // 请求成功
}
const defaultConfig = {
    // 默认地址
    baseURL: import.meta.env.VITE_APP_PROXY_API || '',
    // 设置超时时间
    timeout: RequestEnums.TIMEOUT as number,
    // 跨域时候允许携带凭证
    withCredentials: true
}

class RequestHttp {
    // 定义成员变量并指定类型
    service: AxiosInstance;
    config: any;
    // 存放取消请求控制器Map
    abortControllerMap: Map<string, AbortController>;
    public constructor(config?: AxiosRequestConfig) {
        // 实例化axios
        this.config = Object.assign({}, defaultConfig, config)
        this.service = axios.create(this.config);
        this.abortControllerMap = new Map();

        /**
         * 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
         */
        this.service.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                // 保存控制器
                const controller = new AbortController()
                const url = config.url || ''
                config.signal = controller.signal
                this.abortControllerMap.set(url, controller)

                const user = await getFingerprint()
                config.params = config.params || {}
                config.params.user || (config.params.user = user)

                const token = getToken()
                if (token) {
                    config.headers.set({
                        'Authorization': `Bearer ${token}`, // 请求头中携带token信息
                    })
                }
                return config
            },
            (error: AxiosError) => {
                // 请求报错
                Promise.reject(error)
            }
        )

        /**
         * 响应拦截器
         * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data, config } = response; // 解构

                // 删除控制器
                const url = config.url || ''
                this.abortControllerMap.delete(url)

                if (data.code === RequestEnums.OVERDUE) {
                    // 登录信息失效，应跳转到登录页面，并清空本地的token
                    localStorage.setItem('token', '');
                    // router.replace({
                    //   path: '/login'
                    // })
                    return Promise.reject(data);
                }
                // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
                if (data.code && data.code !== RequestEnums.SUCCESS) {
                    ElMessage.error(data); // 此处也可以使用组件提示报错信息
                    return Promise.reject(data)
                }
                return data;
            },
            (error: AxiosError) => {
                const response: any = error.response;
                if (response) {
                    this.handleCode(response?.status, response?.data?.msg || '')
                }
                if (!window.navigator.onLine) {
                    ElMessage.error('网络连接失败');
                    // 可以跳转到错误页面，也可以不做操作
                    // return router.replace({
                    //   path: '/404'
                    // });
                }
            }
        )
    }
    handleCode(code: number | undefined, msg: string): void {
        switch (code) {
            case 401:
                ElMessage.error('登录失败，请重新登录');
                break;
            default:
                ElMessage.error(msg || '请求失败');
                break;
        }
    }

    // 常用方法封装
    get<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.get(url, { params });
    }
    post<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.post(url, params);
    }
    put<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.put(url, params);
    }
    delete<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.delete(url, { params });
    }
    async stream(url: string, params?: object) {
        const user = await getFingerprint()
        // 保存控制器
        const controller = new AbortController()
        const signal = controller.signal
        params = params || {}
        this.abortControllerMap.set(url + JSON.stringify(params).substring(0, 60), controller)
        return fetch(`${this.config.baseURL || ''}${url}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...params, user}),
                signal
            }).then(res => {
                this.abortControllerMap.delete(url);
                (res as (Response & {cancelRequest: () => void}))['cancelRequest'] = () => controller.abort()
                return res
            })
    }

    /**
     * 取消全部请求
     */
    cancelAllRequest() {
        for (const [, controller] of this.abortControllerMap) {
            controller.abort()
        }
        this.abortControllerMap.clear()
    }
    /**
     * 取消指定的请求
     * @param url 待取消的请求URL
     */
    cancelRequest(url: string | string[]) {
        const urlList = Array.isArray(url) ? url : [url]
        for (const _url of urlList) {
            this.abortControllerMap.get(_url)?.abort()
            this.abortControllerMap.delete(_url)
        }
    }
}

// 导出一个实例对象
export default RequestHttp;
