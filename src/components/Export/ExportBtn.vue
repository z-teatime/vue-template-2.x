<template>
  <el-button icon="el-icon-download" size="mini" v-bind="$attrs" v-on="$listeners">导出</el-button>
</template>

<script>
// import { download } from '@/utils'

export default {
  name: 'ExportBtn',
  // props: {
  //   href: {
  //     type: String,
  //     default: '',
  //   },
  // },
  // methods: {
  //   download() {
  //     if (this.href === '') return new Error(`<<< 请传入地址.`)
  //     download(this.href)
  //   },
  // },
}
</script>
