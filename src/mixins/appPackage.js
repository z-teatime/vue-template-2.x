import { flatten } from 'lodash'

export default {
  data() {
    return {
      appPackageOptions: [], // 筛选
      parentAppPackageOptions: [], // 所有项目
      allAppPackageOptions: {}, // 所有数据分类显示
      allAppPackageCodeMap2Parent: {}, // 所有数据对应映射项目
      allAppPackageCodeMap: {},
    }
  },
  methods: {
    /**
     * 获取应用信息
     */
    getAppPackageData() {
      return this.$api.getGlobalConfBox().then(res => {
        this.parentAppPackageOptions = res.map(o => ({ label: o.name, value: o.code }))
        Promise.all(res.map(o => {
          this.allAppPackageOptions[o.code] = {}
          return this.$api.getGlobalConfBox({
            subjectCode: o.code
          })
        })).then(subRes => {
          const ret = subRes.map((item, index) => {
            const options = item.map(o => {
              this.allAppPackageCodeMap2Parent[o.code] = res[index]
              this.allAppPackageCodeMap[o.code] = o
              return {
                label: o.name, value: o.code
              }
            })
            this.allAppPackageOptions[res[index].code] = options
            return options
          })
          this.appPackageOptions = flatten(ret)
        })
      })
    },
  }
}
