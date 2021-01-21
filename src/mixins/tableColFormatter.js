/**
 * @file table-coloum 的格式化
 */
import moment from 'moment'
import { DEF_FORMATTER, INVALID_DATE, SECOND_FORMATTER } from '@/settings/date'
import {
  PUSH_TYPE_ARR_OPTIONS, FIRM_OPTIONS, TRIAL_PU_STATUS,
  TRIAL_PU_CONFIG_STATUS, TRIAL_PU_VIDEO_OPTIONS, CHANNEL_OPTIONS,
  PUSH_STATUS_OPTIONS, PUSH_USHER_TYPE_OPTIONS2
  // TRIAL_PU_CONFIG_STATUS
} from '@/settings/options'
import { createOptionsFn } from '@/utils'
// import store from '@/store'

/**
 * 推送格式化
 */
export const pushFormatter = {
  methods: {
    /**
     * 推送类型格式化
     */
    pushTypeFormatter: createOptionsFn(PUSH_TYPE_ARR_OPTIONS),
    /**
     * 类型格式化
     */
    // typeFormatter: createOptionsFn(PUSH_TYPE_OPTIONS),
    typeFormatter2: createOptionsFn(PUSH_USHER_TYPE_OPTIONS2),
    /**
     * 渠道应用格式化
     */
    channelFormatter(row, column, cellValue, index) {
      if (cellValue == null) return ''
      const ret = cellValue.split(',').map(o => {
        const t = this.$store.state.push.allAppPackageCodeMap[o]
        return t ? t.name : cellValue
      })
      return !ret.length ? cellValue : ret.join(', ')
    },
    channelFormatter2: createOptionsFn(CHANNEL_OPTIONS),
    /**
     * 厂商
     */
    handleFirmFormatter: createOptionsFn(FIRM_OPTIONS),
    /**
     * 试推-推送状态
     */
    handleTriaPuStatus: createOptionsFn(TRIAL_PU_STATUS),
    /**
     * 试推-马甲包
     */
    handleAppPackages(...rest) {
      if (!this.handleAppPackages.fn) {
        this.handleAppPackages.fn = createOptionsFn(this.$store.getters.appPackages)
      }
      return this.handleAppPackages.fn(...rest)
    },
    /**
     * 迭代推-应用过虑
     * @description 配合 @/mixins/appPackage使用
     */
    handleAppPackages2(...rest) {
      if (!this.handleAppPackages2.fn) {
        this.handleAppPackages2.fn = createOptionsFn(this.$store.state.push.allAppPackageCodeMap2Name)
      }
      return this.handleAppPackages2.fn(...rest)
    },
    /**
     * 迭代推-推送类型格式化2
     */
    handlePushTypeFormatter: function(row, column, cellValue, index) {
      const options = this.$store.state.push.pushConfig[row.projectType] || { typeArr: {}, specialArr: {}}
      const typeArr = {
        ...options.typeArr,
        ...options.specialArr[3] || {}
      }
      const ret = typeArr[String(cellValue)]
      return ret == null ? '' : ret
    },
    /**
     * 视频状态
     */
    handlePushTypeVideoTypeFormatter: createOptionsFn(TRIAL_PU_VIDEO_OPTIONS),
    /**
     * 迭代推全局配置状态
     */
    handleIterStateFormatter: createOptionsFn(TRIAL_PU_CONFIG_STATUS),
    /**
     * 迭代推-用户激活日
     */
    handleActDayFormatter: function(row, column, cellValue, index) {
      if (cellValue == null) return ''
      return `第${cellValue}天`
    },
    /**
     * 查询-推送状态码
     */
    handlePushStatusFormatter: createOptionsFn(PUSH_STATUS_OPTIONS),
  },
}

/**
 * 日期格式化
 */
export const dateFormatter = {
  methods: {
    // YYYY-MMM-DD
    dateFormatter(row, column, cellValue, index) {
      const ret = moment(cellValue).format(DEF_FORMATTER)
      if (ret === INVALID_DATE) return ''
      return ret
    },
    // YYYY-MM-DD HH:mm:ss
    dateFormatterSecond(row, column, cellValue, index) {
      const ret = moment(cellValue).format(SECOND_FORMATTER)
      if (ret === INVALID_DATE) return ''
      return ret
    }
  }
}

/**
 * 数值转换
 */
export const numFormatter = {
  methods: {
    /**
     * 根据指标类型获取对应的格式化函数
     * 1，整型，2百分比 3 两位小数点 4四位小数
     * @param { String } type
     */
    getFormatterWithType(type) {
      let ret = this.defFormatter

      switch (String(type)) {
        case '1':
          ret = this.integerFormatter
          break
        case '2':
          ret = this.percentFormatter
          break
        case '3':
          ret = this.floatFormatter
          break
        case '4':
          ret = this.floatFormatter4
          break

        default:
          break
      }
      return ret
    },
    /**
     * 默认的格式化函数
     */
    defFormatter(row, column, cellValue, index) {
      return cellValue
    },
    /**
     * 默认的格式化函数
     */
    defNumFormatter(row, column, cellValue, index) {
      return cellValue || 0
    },
    /**
     * 分钟
     */
    minFormatter(row, column, cellValue, index) {
      const ret = Number(cellValue) / 60000
      if (Number.isNaN(ret)) {
        return ''
      }
      return ret.toFixed(2)
    },
    /**
     * 百分比, 保留2位小数
     */
    percentFormatter(row, column, cellValue, index) {
      let ret = Number(cellValue)
      if (Number.isNaN(ret)) {
        return ''
      }
      ret = ret * 100
      return `${ret.toFixed(2)}%`
    },
    percentFormatter2(row, column, cellValue, index) {
      const ret = Number(cellValue)
      if (Number.isNaN(ret)) {
        return ''
      }
      // ret = ret * 100
      return `${ret.toFixed(2)}%`
    },
    /**
     * 小数, 保留2位小数
     */
    floatFormatter(row, column, cellValue, index) {
      const ret = Number(cellValue)
      if (Number.isNaN(ret)) {
        return ''
      }
      return ret.toFixed(2)
    },
    /**
     * 小数, 保留4位小数
     */
    floatFormatter4(row, column, cellValue, index) {
      const ret = Number(cellValue)
      if (Number.isNaN(ret)) {
        return ''
      }
      return ret.toFixed(4)
    },
    /**
     * 整数
     */
    integerFormatter(row, column, cellValue, index) {
      const ret = Number(cellValue)
      if (Number.isNaN(ret)) {
        return ''
      }
      return Math.floor(ret)
    }
  }
}

/**
 * 默认
 */
export const defFormatter = {
  methods: {
    defFormatter(row, column, cellValue, index) {
      if (cellValue === 'NaN') return ''
      return cellValue
    },
  },
}
