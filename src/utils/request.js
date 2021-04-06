import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

export const baseURL = process.env.VUE_APP_BASE_API + `/api`

// create an axios instance
const service = axios.create({
  baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5 * 1000 // request timeout
})

service.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

// 默认头部属性
service.defaults.validateStatus = status => {
  return status < 1000
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token && !config.headers['Authorization']) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const code = response.data.code
    const status = response.status

    if (typeof res === 'string') return Promise.resolve(res)

    switch (status) {
      case 500:
        Message({ message: (res && res.msg) || (res && res.message) || '接口请求错误！', type: 'error' })
        return Promise.reject(res)

      default:
        break
    }

    switch (code) {
      case 403: // 用户登录过期
      case 401: // 用户登录过期
      case -2:
        showErrMsg(res)
        store.dispatch('user/logout')
        return Promise.reject(res)
      case 500:
      case 502:
        Message({ message: res.msg || res.message, type: 'error' })
        return Promise.reject(res)
      case 0:
        return res.data
      case 200:
        return res.data
      default:
        Message({
          message: res.message,
          type: 'error'
        })
        return Promise.reject(res)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      // duration: 30 * 1000
    })
    return Promise.reject(error)
  }
)

function showErrMsg(data) {
  Message({
    message: data.message,
    type: 'error',
    // duration: 5 * 1000
  })
}

export default service
