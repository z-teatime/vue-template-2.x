import Vue from 'vue'
import Element from 'element-ui'
import Cookies from 'js-cookie'
// import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})
