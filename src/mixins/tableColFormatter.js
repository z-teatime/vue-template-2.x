/**
 * @file table-coloum 的格式化
 */
import moment from 'moment'
import { DEF_FORMATTER, INVALID_DATE, SECOND_FORMATTER } from '@/settings/date'

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
