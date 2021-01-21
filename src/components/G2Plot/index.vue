<script>
import { Line } from '@antv/g2plot'
import LineOpt from './options/line'

let count = 0

export default {
  name: 'GChart',
  props: {
    /**
     * 预留字段, 用于区分图标类型
     */
    type: {
      type: String,
      default: 'line',
    },
    /**
     * 图表选项
     */
    options: {
      type: Object,
      default() {
        return {}
      },
    },
    /**
     * 图表的构造函数
     * @constructor
     */
    /* eslint-disable-next-line */
    Ctor: {
      type: Function,
      default: Line,
    },
    /**
     * 数据加载完的promise
     */
    load: {
      type: Function,
      required: true,
    },
    /**
     * tootip 格式化函数
     */
    tooltipFormatter: {
      type: Function,
      default(value, type) {
        return {
          name: type,
          value: value
        }
      },
    },
    /**
     * 创建实例的时候初始化
     */
    immediate: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      /**
       * @private
       */
      id: `j-line-chart-${++count}`,
      g2Container: null, // 容器
      g2Instance: null, // 实例
      g2Data: null, // 数据
      g2Options: null, // 配置
    }
  },
  mounted() {
    this.immediate && this.load().then(({ chartData }) => {
      if (chartData == null) return new Error(`<<< load Promise必须返回一个带有chartData属性的对象.`)

      const opt = { data: chartData }
      this.g2SetOptions(opt)
      this.$nextTick(_ => { // DOM 加载完成后绘制
        this.draw()
      })
    })
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    /**
     * 绘制折线图
     * @description 绘图钱必须执行g2SetOptions设置options
     * @return { Line }
     */
    draw() {
      if (typeof this.id !== 'string') return new Error('<<< 绘制g2plot折线图必须传递容器.')

      this.destroy()

      this.g2Container = document.getElementById(this.id)

      this.g2Instance = new this.Ctor(
        this.g2Container,
        this.g2Options || {},
      )

      this.g2Instance.render()

      return this.g2Instance
    },
    /**
     * 设置g2plot的选项
     */
    g2SetOptions(options = {}) {
      this.g2Options = {
        ...LineOpt(this, this.tooltipFormatter),
        ...this.options,
        ...options,
      }
      this.g2Data = this.g2Options.data
      return this.g2Instance
    },
    /**
     * 更新数据
     */
    g2ChangeData(data) {
      if (this.g2Container == null) return new Error('<<< 更新数据前请设置g2plot的容器.')

      this.g2Data = data || this.g2Data
      this.g2Instance.changeData(this.g2Data)
      return this.g2Instance
    },
    /**
     * 销毁实例
     */
    destroy() {
      this.g2Instance && this.g2Instance.destroy()
      return this.g2Instance
    },
  },
  render() {
    return (<div id={ this.id } />)
  },
}
</script>
