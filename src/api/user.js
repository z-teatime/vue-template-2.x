import request from '@/utils/request'
import qs from 'qs'
// import { /* getToken,  */getUerInfo, plat } from '@/utils/auth':
// import store from '@/store'

export const baseURL = process.env.VUE_APP_BASE_LOGIN + `/api`

export function login(data) {
  return request.post('/auth/login', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL,
  })
}

export function getInfo(params) {
  // const userInfo = getUerInfo()
  // return request.post('/auth/user', qs.stringify({
  //   ...params,
  //   username: userInfo,
  //   platForm: plat,
  // }), {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   baseURL,
  // })
  return Promise.resolve({})
}

export function logout(params) {
  return request.post('/auth/logout', qs.stringify(params), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    baseURL,
  })
}

export function getCaptcha() {
  return request.post(`/auth/captcha?t=${new Date().valueOf()}`, '', {
    baseURL,
  })
}
