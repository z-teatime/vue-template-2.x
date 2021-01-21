<template>
  <PushWrap ref="wrap" :load="load" :table-attrs="tableAttrs" :table-listeners="tableListeners" :watermark="$user.watermarkStr">
    <div slot="filter" class="clearfix filter bd">
      <div class="filter-item">
        <span class="title">项目</span>
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

      <div class="filter-item">
        <span class="title">渠道</span>
        <div class="content max">
          <el-select v-model="filter.pushChannel" placeholder="请选择" clearable>
            <el-option
              v-for="(item, key) in []"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="filter-item">
        <span class="title">日期</span>
        <div class="content max">
          <el-date-picker
            v-model="filter.date"
            align="right"
            type="date"
            placeholder="选择日期"
          />
        </div>
      </div>

      <div class="filter-item">
        <span class="title">类型</span>
        <div class="content max">
          <el-select v-model="filter.pushMethod" placeholder="请选择" clearable>
            <el-option
              v-for="(item, key) in []"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>

      <div class="filter-item">
        <span class="title">推送文案id</span>
        <div class="content max">
          <el-input v-model="filter.pushId" placeholder="请输入" />
        </div>
      </div>

      <div class="search-btn fr">
        <el-button class="reset" type="text" icon="el-icon-refresh" @click="handleReset">重置</el-button>
        <el-button type="primary" icon="el-icon-search" @click="handleUpdate">搜索</el-button>
      </div>
    </div>

    <template slot="tools">
      <el-button type="primary" icon="el-icon-circle-plus-outline">添加</el-button>
    </template>

    <template slot="table">
      <el-table-column prop="id" label="序号" width="80" show-overflow-tooltip />
      <el-table-column prop="appPackage" label="应用" show-overflow-tooltip />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="noteContent" label="内容" />
      <el-table-column prop="type" label="类型">
        <template slot-scope="{ row }">{{ getTypeLabel(row) }}</template>
      </el-table-column>
      <el-table-column prop="pushType" label="推送方式" show-overflow-tooltip />
      <el-table-column prop="pushTime" label="推送时间" show-overflow-tooltip />
      <WTableColOperate label="操作" min-width="190">
        <template v-slot="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleRowEdit(scope)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleRowDel(scope)">删除</el-button>
        </template>
      </WTableColOperate>
    </template>
  </PushWrap>
</template>

<script>
import PushWrap from './'
import { cloneDeep } from 'lodash'

const initFilterData = {
  projectType: '',
  appPackage: '',
  pushChannel: '',
  date: '',
  pushMethod: '',
  pushId: '',
}

export default {
  name: 'PushManage',
  components: {
    PushWrap,
  },
  mixins: [PushWrap.Update],
  data() {
    return {
      title: '', // 搜索条件, 后台命名title
      appPackage: [], // 搜索条件
      tableAttrs: {}, // 表格参数
      tableListeners: undefined, // 表格事件
      tableData: [], // 表格数据

      filter: cloneDeep(initFilterData), // 搜索条件
    }
  },
  methods: {
    /**
     * 加载数据
     * @return { Promise } { tableData: Array }
     */
    load(page = 1, pageSize = 10, total = 0) {
      return Promise.resolve({
        tableData: [],
        total: 0,
      })
    },
    /**
     * 操作-编辑
     */
    handleRowEdit() {},
    /**
     * 操作-删除
     */
    handleRowDel() {},
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
  },
}
</script>

<style lang="scss" scoped>
</style>
