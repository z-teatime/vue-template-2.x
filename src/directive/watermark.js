import Vue from 'vue'
import nestarkAuth from '@nestark/auth'
import watermark from 'dolphin-watermark'

const watermarkStr = `${nestarkAuth.getUserInfo().username}#${window.location.host}`

Vue.directive('watermark', {
  inserted(el) {
    // el.style.background = 'none'
    el.style.background = watermark(watermarkStr, 15, 100, 100)
  },
})
