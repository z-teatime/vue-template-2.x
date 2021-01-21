import Cookies from 'js-cookie'
// import store from '../store'

/* eslint-disable */
export const TOKEN = 'nauth-token' + process.env.VUE_APP_TOKEN_ENV
// const UserInfo = 'NPush-Info'
export const USER_ID = 'nauth-userid' + process.env.VUE_APP_TOKEN_ENV
export const USER_NAME = 'nauth-username' + process.env.VUE_APP_TOKEN_ENV
export const REDIRECT = 'nauth-redirect'

export const plat = 'npush'

export function getToken() {
  return Cookies.get(TOKEN)
}

export function setToken(token) {
  return Cookies.set(TOKEN, token)
}

export function removeToken() {
  return Cookies.remove(TOKEN)
}

export function getUserId() {
  return Cookies.get(USER_ID)
}

export function setUserId(id) {
  return Cookies.set(USER_ID, id)
}

export function getUserName() {
  return Cookies.get(USER_NAME)
}

export function setUserName(name) {
  return Cookies.set(USER_NAME, name)
}

export function removeRedirect() {
  return Cookies.remove(REDIRECT)
}
