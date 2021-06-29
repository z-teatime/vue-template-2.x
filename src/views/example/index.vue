<template>
  <WidgetClassicView
    ref="wrap"
    :load="load"
    :table-attrs="tableAttrs"
    :table-listeners="tableListeners"
    :watermark="$user.watermarkStr"
  >
    <div slot="filter" class="clearfix filter bd">
      <div class="filter-item">
        <span class="title">渠道包</span>
        <div class="content max key-word">
          <el-select v-model="filter.projectType" placeholder="请选择" @change="filter.appPackage = ''">
            <el-option
              v-for="(item, key) in []"
              :key="key"
              :label="item.label"
              :value="key"
            />
          </el-select>
        </div>
      </div>

      <div class="filter-item">
        <span class="title">应用</span>
        <div class="content max">
          <!-- <NeSelectAll v-model="filter.appPackage" :options="appPackageOptions" /> -->
          <NeSelectCascade
            :options="options"
          />
        </div>
      </div>

      <div class="search-btn fr">
        <el-button class="reset" type="text" icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handleUpdate">搜索</el-button>
      </div>
    </div>

    <template slot="tools">
      <el-button v-permission="`vip`">权限按钮</el-button>
      <el-button v-permission="`vip`" class="reset" type="text" icon="el-icon-refresh" @click="resetWidth">重置列宽</el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">新增</el-button>
    </template>

    <template slot="table">
      <WTableColumn prop="id" label="ID" />
      <WTableColumn prop="name" label="代理商名称" />
      <WTableColumn prop="channel" label="渠道CODE" />
      <WTableColumn prop="appPackage" label="所属应用" />
      <WTableColumn prop="createTime" label="创建时间" :formatter="dateFormatterSecond" />
      <WTableColOperate label="操作" min-width="190">
        <template v-slot="scope">
          <el-button type="text" size="mini" @click="handleRowEdit(scope)">编辑</el-button>
          <el-button type="text" size="mini" @click="handleRowDel(scope)">删除</el-button>
        </template>
      </WTableColOperate>
    </template>

    <el-dialog
      :title="editTitleText"
      :visible.sync="editFormVisible"
      :before-close="handleBeforeClose"
      custom-class="dialog-form"
    >
      <el-form ref="form" :model="editForm" :rules="rules" label-width="82px">
        <el-form-item label="应用" prop="appPackage">
          <el-select v-model="editForm.appPackage" placeholder="请选择应用" @change="() => {}">
            <el-option
              v-for="(item, key) in []"
              :key="key"
              :label="item.label"
              :value="key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="代理商名称" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="渠道号" prop="name">
          <el-input v-model="editForm.channel" placeholder="请输入" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSumit">确 定</el-button>
      </span>
    </el-dialog>
  </WidgetClassicView>
</template>

<script>
import WidgetClassicView from 'widget/views/WClassicView'
import { cloneDeep } from 'lodash'
import { dateFormatter } from '@/mixins/tableColFormatter'
import NeSelectCascade from './cascade'

const initFilterData = {
  /**
   * 应用
   * @type { String }
  */
  appPackage: undefined,
  /**
   * 代理商
   * @type { String }
   */
  name: undefined,
}

const initEditFormData = {
  ...initFilterData,
  /**
   * 渠道号
   * @type { String }
   */
  channel: undefined,
}

export default {
  name: 'ChanenlBusinessManage',
  components: {
    WidgetClassicView,
    NeSelectCascade,
  },
  mixins: [WidgetClassicView.Update, dateFormatter],
  data() {
    return {
      tableAttrs: {}, // 表格参数
      tableListeners: undefined, // 表格事件
      // tableData: [], // 表格数据

      filter: cloneDeep(initFilterData), // 搜索条件
      editForm: {
        ...cloneDeep(initEditFormData),
      }, // 弹窗
      editFormVisible: false,
      editMode: 1, // 1: 新增 2: 编辑
      rules: {
        appPackage: { required: true, message: '请选择应用' },
        name: { required: true, message: '请输入应用' },
        channel: { required: true, message: '请输入渠道号' },
      },

      tableData: [{
        id: 1,
        name: 'name',
        channel: 'xy_xxxx',
        appPackage: '茜柚视频',
        createTime: new Date(),
      }],
      options: [{
        value: 'zhinan',
        label: '指南',
        // children: [{
        //   value: 'shejiyuanze',
        //   label: '设计原则',
        //   children: [{
        //     value: 'yizhi',
        //     label: '一致'
        //   }, {
        //     value: 'fankui',
        //     label: '反馈'
        //   }, {
        //     value: 'xiaolv',
        //     label: '效率'
        //   }, {
        //     value: 'kekong',
        //     label: '可控'
        //   }]
        // }, {
        //   value: 'daohang',
        //   label: '导航',
        //   children: [{
        //     value: 'cexiangdaohang',
        //     label: '侧向导航'
        //   }, {
        //     value: 'dingbudaohang',
        //     label: '顶部导航'
        //   }]
        // }]
      }, {
        value: 'zujian',
        label: '组件',
        // children: [{
        //   value: 'basic',
        //   label: 'Basic',
        //   children: [{
        //     value: 'layout',
        //     label: 'Layout 布局'
        //   }, {
        //     value: 'color',
        //     label: 'Color 色彩'
        //   }, {
        //     value: 'typography',
        //     label: 'Typography 字体'
        //   }, {
        //     value: 'icon',
        //     label: 'Icon 图标'
        //   }, {
        //     value: 'button',
        //     label: 'Button 按钮'
        //   }]
        // }, {
        //   value: 'form',
        //   label: 'Form',
        //   children: [{
        //     value: 'radio',
        //     label: 'Radio 单选框'
        //   }, {
        //     value: 'checkbox',
        //     label: 'Checkbox 多选框'
        //   }, {
        //     value: 'input',
        //     label: 'Input 输入框'
        //   }, {
        //     value: 'input-number',
        //     label: 'InputNumber 计数器'
        //   }, {
        //     value: 'select',
        //     label: 'Select 选择器'
        //   }, {
        //     value: 'cascader',
        //     label: 'Cascader 级联选择器'
        //   }, {
        //     value: 'switch',
        //     label: 'Switch 开关'
        //   }, {
        //     value: 'slider',
        //     label: 'Slider 滑块'
        //   }, {
        //     value: 'time-picker',
        //     label: 'TimePicker 时间选择器'
        //   }, {
        //     value: 'date-picker',
        //     label: 'DatePicker 日期选择器'
        //   }, {
        //     value: 'datetime-picker',
        //     label: 'DateTimePicker 日期时间选择器'
        //   }, {
        //     value: 'upload',
        //     label: 'Upload 上传'
        //   }, {
        //     value: 'rate',
        //     label: 'Rate 评分'
        //   }, {
        //     value: 'form',
        //     label: 'Form 表单'
        //   }]
        // }, {
        //   value: 'data',
        //   label: 'Data',
        //   children: [{
        //     value: 'table',
        //     label: 'Table 表格'
        //   }, {
        //     value: 'tag',
        //     label: 'Tag 标签'
        //   }, {
        //     value: 'progress',
        //     label: 'Progress 进度条'
        //   }, {
        //     value: 'tree',
        //     label: 'Tree 树形控件'
        //   }, {
        //     value: 'pagination',
        //     label: 'Pagination 分页'
        //   }, {
        //     value: 'badge',
        //     label: 'Badge 标记'
        //   }]
        // }, {
        //   value: 'notice',
        //   label: 'Notice',
        //   children: [{
        //     value: 'alert',
        //     label: 'Alert 警告'
        //   }, {
        //     value: 'loading',
        //     label: 'Loading 加载'
        //   }, {
        //     value: 'message',
        //     label: 'Message 消息提示'
        //   }, {
        //     value: 'message-box',
        //     label: 'MessageBox 弹框'
        //   }, {
        //     value: 'notification',
        //     label: 'Notification 通知'
        //   }]
        // }, {
        //   value: 'navigation',
        //   label: 'Navigation',
        //   children: [{
        //     value: 'menu',
        //     label: 'NavMenu 导航菜单'
        //   }, {
        //     value: 'tabs',
        //     label: 'Tabs 标签页'
        //   }, {
        //     value: 'breadcrumb',
        //     label: 'Breadcrumb 面包屑'
        //   }, {
        //     value: 'dropdown',
        //     label: 'Dropdown 下拉菜单'
        //   }, {
        //     value: 'steps',
        //     label: 'Steps 步骤条'
        //   }]
        // }, {
        //   value: 'others',
        //   label: 'Others',
        //   children: [{
        //     value: 'dialog',
        //     label: 'Dialog 对话框'
        //   }, {
        //     value: 'tooltip',
        //     label: 'Tooltip 文字提示'
        //   }, {
        //     value: 'popover',
        //     label: 'Popover 弹出框'
        //   }, {
        //     value: 'card',
        //     label: 'Card 卡片'
        //   }, {
        //     value: 'carousel',
        //     label: 'Carousel 走马灯'
        //   }, {
        //     value: 'collapse',
        //     label: 'Collapse 折叠面板'
        //   }]
        // }]
      }, {
        value: 'ziyuan',
        label: '资源',
        // children: [{
        //   value: 'axure',
        //   label: 'Axure Components'
        // }, {
        //   value: 'sketch',
        //   label: 'Sketch Templates'
        // }, {
        //   value: 'jiaohu',
        //   label: '组件交互文档'
        // }]
      }]
    }
  },
  computed: {
    editTitleText() {
      return this.editMode === 1 ? '新增' : '编辑'
    },
  },
  created() {
    console.log('router', this.$router, this.$route)
  },
  methods: {
    /**
     * 获取请求参数
     */
    getParams() {
      return {
        appPackage: undefined,
        name: undefined,
      }
    },
    /**
     * 加载数据
     * @return { Promise } { tableData: Array }
     */
    load(page = 1, pageSize = 10, total = 0) {
      return Promise.resolve({
        tableData: this.tableData,
        total: this.tableData.length,
      })
    },
    /**
     * 新增
     */
    handleAdd() {
      this.editMode = 1
      this.editFormVisible = true
    },
    /**
     * 操作-编辑
     */
    handleRowEdit(scope) {
      this.editMode = 2
      this.editFormVisible = true
      Object.assign(this.editForm, scope.row)
    },
    /**
     * 操作-删除
     */
    handleRowDel(scope) {
      return this.$confirm('确定移除该记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(scope.$index, 1)
        this.$nextTick(() => {
          this.$message.success(`移除成功.`)
        })
      })
    },
    /**
     * 添加编辑弹窗关闭回调
     */
    handleBeforeClose(next) {
      this.editForm = cloneDeep(initEditFormData)
      this.$refs.form && this.$refs.form.resetFields()
      next()
    },
    /**
     * 编辑新增提交事件
     */
    handleSumit() {
      this.$refs.form.validate().then(() => {
        this.$message.info('触发提交事件')
      })
    },
    /**
     * 重置表格
     */
    handleReset() {
      this.filter = cloneDeep(initFilterData)
      this.$refs.wrap && this.$refs.wrap.reLoad(true)
    },
    /**
     * 更新数据
     */
    handleUpdate() {
      this.update()
    },
    /**
     * 重置列宽
     */
    resetWidth() {
      const { table } = this.$refs.wrap.$refs
      table.handleResetWidth()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
