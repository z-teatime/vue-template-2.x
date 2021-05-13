import nestarkAuth from './nestarkAuth'
import Vue from 'vue'

// import Cookies from 'js-cookie'
import { isInIcestark, getMountNode, registerAppEnter, registerAppLeave } from '@ice/stark-app'
import { store as starkStore } from '@ice/stark-data'
import { getContainer, setContainer, onuninstall, setCache, getCache } from '@/utils/mf-cache'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import '@/element-ui'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import api from '@/api'
import Widget from 'widget'
import NeUi from '98du-ui'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import '@/components'

import * as filters from './filters' // global filters

import '@/directive/watermark'

const pkg = require('../package.json')

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

const username = nestarkAuth.getUserInfo().username

Vue.prototype.$api = api
Vue.prototype.$user = {
  name: username,
  watermarkStr: username + `#${window.location.host}`
}
Vue.use(Widget)
Vue.use(NeUi)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

if (isInIcestark()) {
  let vue
  const mountNode = getMountNode()

  // 获取主应用注入的信息
  // TODO:
  store.commit('app/setCurProject', starkStore.get('curProject'))
  starkStore.on('curProject', (route) => {
    store.commit('app/setCurProject', route)
  })

  registerAppEnter(() => {
    // 获取缓存的容器, 不做卸载
    const rootContainer = getContainer(pkg.name)

    if (rootContainer) {
      const cacheOptions = getCache(`${pkg.name}-vm`)
      // 切换微应用后, 会导致pushState注册的事件全部卸载(ice拦截了pushState)
      // 这里切回来的时候, 重新注册
      cacheOptions.vm._router.app = null
      cacheOptions.vm._router.apps = []
      cacheOptions.vm._router.history.listeners = []
      // cacheOptions.vm._router.history.setupListeners()
      cacheOptions.vm._router.init(cacheOptions.vm)

      const cacheMountNode = document.querySelector('#icestarkNode')
      cacheMountNode.removeChild(cacheMountNode.querySelector('#app'))
      cacheMountNode.appendChild(rootContainer)
    } else {
      vue = new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')

      // for vue don't replace mountNode
      mountNode.innerHTML = ''
      mountNode.appendChild(vue.$el)

      // 缓存容器
      setContainer(pkg.name, vue.$el)
      setCache(`${pkg.name}-vm`, {
        Vue,
        router,
        vm: vue,
      })
      // 清楚容器缓存的时候卸载
      onuninstall(() => {
        vue && vue.$destroy()

        // 由于主应用资源持久化(永久保存). 这里的资源不能删除.
        // if (window.npushWebpackJsonp) {
        //   delete window.npushWebpackJsonp
        // }
      })
    }
  })

  // make sure the unmount event is triggered
  registerAppLeave(() => {
  })
} else {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
