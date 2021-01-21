import Vue from 'vue'
import { getUserName } from '@/utils/auth'
import watermark from 'dolphin-watermark'

const watermarkStr = `${getUserName()}#${window.location.host}`

Vue.directive('watermark', {
  inserted(el) {
    // el.style.background = 'none'
    el.style.background = watermark(watermarkStr, 15, 100, 100)
  },
})
