import Vue from 'vue'
import nestark from '@nestark/auth'
import watermark from 'dolphin-watermark'

const watermarkStr = `${nestark.getUserInfo().username}#${window.location.host}`

Vue.directive('watermark', {
  inserted(el) {
    // el.style.background = 'none'
    el.style.background = watermark(watermarkStr, 15, 100, 100)
  },
})
