<template>
  <div id="app" class="__light__">
    <router-view v-if="firstLoad" />
  </div>
</template>

<script>
import Vue from 'vue'
import { delay } from 'lodash'
import nestarkAuth from '@nestark/auth'

export default {
  name: 'App',
  data() {
    Vue.prototype.$app = this
    return {
      firstLoad: false
    }
  },
  created() {
    const ps = [
      // this.$store.dispatch('push/getPushConfig'),
    ]

    if (process.env.NODE_ENV !== 'production') {
      // 获取 projectId, 本地调试需要添加
      // 根据域名修改参数, 第二个参数是query参数, ehr中设置的项目域名
      ps.push(nestarkAuth.getProjectId('operation', { k: 'wnl' }))
    }

    // 调用一些接口后渲染, 用于获取一些配置信息和选择框的选项数据.
    Promise.all(ps)
      .then(_ => (this.firstLoad = true))
      .catch(_ => (this.firstLoad = true))

    // 最高等待 1s
    delay(() => (this.firstLoad = true), 1000)
  },
}
</script>
