import nestarkAuth from './nestarkAuth'
import Vue from 'vue'

// import Cookies from 'js-cookie'
import { isInIcestark, getMountNode, registerAppEnter, registerAppLeave } from '@ice/stark-app'
import { store as starkStore } from '@ice/stark-data'

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
import './directive'
import '@/components'

import * as filters from './filters' // global filters

import '@/directive/watermark'

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
  registerAppEnter(() => {
    vue = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')

    store.commit('app/setCurProject', starkStore.get('curProject'))
    starkStore.on('curProject', (route) => {
      store.commit('app/setCurProject', route)
    })

    // for vue don't replace mountNode
    mountNode.innerHTML = ''
    mountNode.appendChild(vue.$el)
  })

  // make sure the unmount event is triggered
  registerAppLeave(() => {
    // if (window.npushWebpackJsonp) {
    //   delete window.npushWebpackJsonp
    // }
    vue && vue.$destroy()
  })
} else {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
