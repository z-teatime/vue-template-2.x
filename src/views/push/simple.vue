<template>
  <PushWrap ref="wrap" :load="load" :table-attrs="tableAttrs" :table-listeners="tableListeners" :watermark="$user.watermarkStr">
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
          <el-select v-model="filter.appPackage" placeholder="请选择" clearable>
            <el-option
              v-for="(item, key) in []"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="search-btn fr">
        <el-button class="reset" type="text" icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handleUpdate">搜索</el-button>
      </div>
    </div>

    <template slot="tools">
      <el-button class="reset" type="text" icon="el-icon-refresh" @click="resetWidth">重置列宽</el-button>
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
  </PushWrap>
</template>

<script>
import { cloneDeep } from 'lodash'
import { dateFormatter } from '@/mixins/tableColFormatter'

import PushWrap from './wrap'

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
    PushWrap,
  },
  mixins: [PushWrap.Update, dateFormatter],
  data() {
    return {
      tableAttrs: {}, // 表格参数
      tableListeners: undefined, // 表格事件
      tableData: [], // 表格数据

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
    }
  },
  computed: {
    editTitleText() {
      return this.editMode === 1 ? '新增' : '编辑'
    },
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
        tableData: [{ name: 'name' }],
        total: 1,
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
    handleRowEdit() {
      this.editMode = 2
      this.editFormVisible = true
    },
    /**
     * 操作-删除
     */
    handleRowDel() {

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
