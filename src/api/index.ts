import axios from 'axios'
import { ElMessage } from 'element-plus'
import qs from 'qs'
// import router from '../router/index'
import { useUserLoginStore } from '@/stores/userLogin'
const request = axios.create({
    //基地址
    baseURL: '/api',
    // baseURL: '/',
    //超时时间30秒
    timeout: 30 * 1000
})

const messageType = {
    INFO: 'success',
    WARN: 'warning',
    ERROR: 'error'
}

const showMessage = (
    type: string | number,
    message: { duration: number; grouping: boolean; message: any }
) => {
    const msgType = messageType[type] || 'success'
    ElMessage[msgType](message)
}

//请求拦截器
request.interceptors.request.use(
    function (config) {
        const { accessToken } = useUserLoginStore()
        config.headers.Authorization = accessToken || ''
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)
// 响应拦截器
request.interceptors.response.use(
    (res) => {
        if (res.data.statusCode === 0) {
            if (res.data.message !== '成功') {
                //全局成功提示
                showMessage(res.data.msgType, res.data.message)
            }
            return Promise.resolve(res)
        } else if (res.config.responseType === 'blob') {
            //返回的文件下载
            return Promise.resolve(res)
        }
        //  else {
        //     //未登录跳转
        //     if (!res.data.logined && router.currentRoute.value.path !== '/login') {
        //         const { clear } = useUserLoginStore()
        //         clear()
        //         sessionStorage.clear()
        //         localStorage.clear()
        //         router.replace({ path: '/login' })
        //         // window.location.replace(res.data.data);
        //     }
        else {
            //全局错误提示
            showMessage(res.data.msgType, {
                duration: 1000,
                grouping: true,
                message: res.data.data || res.data.message
            })
        }

        //     return Promise.reject(res)
        // }
    },
    (error) => {
        if (error?.response?.data?.message) {
            //后端报400或500正常返回的错误
            showMessage(error.response.data.msgType, error.response.data.message)
        }
        return Promise.reject(error)
    }
)
//通用方法
export const POST = (url: any, params = {}) => {
    return request
        .post(`${url}`, params, {
            transformRequest: [
                function (data) {
                    const formData = new URLSearchParams()
                    Object.keys(data).forEach((key) => formData.append(key, data[key]))
                    return formData
                }
            ]
        })
        .then((res) => res.data)
}

export const POST_DOWN = (url: any, params = {}) => {
    return request
        .post(`${url}`, params, {
            transformRequest: [
                function (data) {
                    const formData = new URLSearchParams()
                    Object.keys(data).forEach((key) => formData.append(key, data[key]))
                    return formData
                }
            ],
            responseType: 'arraybuffer'
        })
        .then((res) => res.data)
}

export const POST_JSON = (url: string, params = {}) => {
    return request.post(`${url}`, params).then((res) => res.data)
}

export const GET = (url: string, params = {}) => {
    return request
        .get(`${url}`, {
            params: params,
            paramsSerializer: {
                serialize: function (params) {
                    return qs.stringify(params, { indices: false })
                }
            }
        })
        .then((res) => (res ? res.data : res))
}

export const GET_DOWN = (url: any, params = {}) => {
    return request
        .get(`${url}`, {
            params: params,
            paramsSerializer: {
                serialize: function (params) {
                    return qs.stringify(params, { indices: false })
                }
            },
            responseType: 'blob'
        })
        .then((res) => (res ? res.data : res))
}

export const PUT = (url: any, params = {}) => {
    return request
        .put(`${url}`, params, {
            transformRequest: [
                function (data) {
                    const formData = new URLSearchParams()
                    Object.keys(data).forEach((key) => formData.append(key, data[key]))
                    return formData
                }
            ]
        })
        .then((res) => res.data)
}

export const PUT_JSON = (url: any, params = {}) => {
    return request.put(`${url}`, params).then((res) => res.data)
}

export const DELETE = (url: any, params = {}) => {
    return request.delete(`${url}`, { params: params }).then((res) => res.data)
}

export const PATCH = (url: any, params = {}) => {
    return request.patch(`${url}`, params).then((res) => res.data)
}

//导出axios默认的请求对象,可能会有用
export { request }
