<template>
  <div id="app" class="__light__">
    <router-view v-if="firstLoad" />
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  data() {
    Vue.prototype.$app = this
    return {
      firstLoad: false
    }
  },
  created() {
    this.firstLoad = true
    // Promise.all([
    //   this.$store.dispatch('push/getPushConfig'),
    //   this.$store.dispatch('push/getAppPackages'),
    //   this.$store.dispatch('push/getAppPackages2'),
    //   this.$store.dispatch('push/getTargetData'),
    //   this.$store.dispatch('push/getAppPackagesForType'),
    //   this.$store.dispatch('push/getVideoCate'),
    // ])
    //   .then(_ => (this.firstLoad = true))
    //   .catch(_ => (this.firstLoad = true))
  },
}
</script>
