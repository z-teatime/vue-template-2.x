<script>
/**
 * 级联选择 <br />
 * 由 <el-cascader /> 扩展
 * @author zhuangpinghua@98du.com
 * @see 具体文档 &nbsp;
 * <a href="https://element.eleme.cn/#/zh-CN/component/cascader">element-cascader</a>
 */
import Vue from 'vue'

function getUUID() {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export default {
  name: 'NeSelectCascade',
  data() {
    return {
      /**
       * 搜索关键字
       * @type String
       */
      search: undefined,
      /**
       * 悬浮弹窗的类名, 不支持修改
       * @type String
       */
      popperClass: `ne-sc-popper-${getUUID()}`,
      /**
       * 用于临时存储
       * @type Function
       */
      abortPopper: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.abortPopper = this.watchPopper()
    })
  },
  methods: {
    createSearchInput() {
      return this.$createElement('div', {
        class: 'ne-sc-input-wrap'
      }, [
        this.$createElement('el-input', {
          props: {
            value: this.search,
            placeholder: '请输入内容',
            'prefix-icon': 'el-icon-search'
          },
          class: 'ne-sc-input',
          on: {
            input: (val) => {
              this.search = val
            },
            change: (val) => {
              const { vm } = this.$refs
              if (vm == null) return console.error(`<<< Get el-cascade vnode error.`)
              vm.inputValue = val
              vm.handleInput(val)
            }
          },
        })
      ])
    },
    getPopperElement() {
      const ele = document.body.querySelector(`.${this.popperClass}`)
      if (ele == null) {
        console.error(`<<< NeSelectCascade select popper error!`, ele)
      }
      return ele
    },
    insertSearch() {
      this.abortPopper && this.abortPopper()
      const { createSearchInput } = this

      const searchEle = new Vue({
        render() {
          return createSearchInput()
        },
      }).$mount()
      const popperEle = this.getPopperElement()
      popperEle?.insertBefore(searchEle.$el, popperEle.firstChild)
    },
    watchPopper() {
      return this.$watch(() => {
        return this.$refs.vm.dropDownVisible
      }, (val) => {
        if (val && !this.watchPopper.inserted) {
          this.watchPopper.inserted = true
          this.$nextTick(() => {
            this.insertSearch(this)
          })
        }
      })
    },
  },
  render(createElement) {
    const vm = createElement('el-cascader', {
      props: {
        filterable: true,
        'collapse-tags': true,
        clearable: true,
        ...this.$attrs,
        props: {
          multiple: true,
          ...this.$attrs.props,
        },
        'popper-class': this.popperClass,
      },
      on: {
        ...this.$listeners,
      },
      ref: 'vm',
    })
    return vm
  },
}
</script>

<style>
.ne-sc-input-wrap {
  padding: 10px;
}
.ne-sc-input-wrap .ne-sc-input {
  width: 100%;
  min-width: auto !important;
}
.el-cascader__tags .el-cascader__search-input {
  display: none;
}
.el-cascader__tags .el-tag {
  max-width: 100px;
}
/* .el-cascader__dropdown .el-cascader-menu {
  width: 100%;
} */
</style>
