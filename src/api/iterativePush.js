/**
 * @file 迭代推接口文档
 */

import request from '@/utils/request'
import qs from 'qs'

export default {
  // 获取推送管理列表
  getGlobalConfBox(params = {}) {
    return request({
      url: '/iterPush/GlobalConfBox',
      method: 'get',
      params
    })
  },
  // 数字迭代推全局配置页面—查询
  getIterGlobalConf(params = {}) {
    return request({
      url: '/iterPush/iterGlobalConf',
      method: 'get',
      params
    })
  },
  // 数字迭代推全局布局配置页面—添加或编辑
  addOrUpdateGlobalConfById(params = {}) {
    return request.post('/iterPush/addOrUpdateGlobalConfById', qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 数字迭代推全局布局页面—删除
  deleteGlobalConfById(params = {}) {
    return request.post('/iterPush/deleteGlobalConfById', qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 系统表格列表分页
  pushDataGetList(params = {}) {
    return request({
      url: '/pushData/getList',
      method: 'get',
      params
    })
  },
  // 指标筛选数据获取
  getTargetData(params = {}) {
    return request.post('/pushData/getTitle', qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 上传文件
  fileUpload(fromData) {
    return request.post('/file/upload', fromData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
  },
  // 获取视频信息
  getVideoInfo(params = {}) {
    return request.post('/pushData/getVideoInfo', qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 系统-编辑
  pushDataUpdate(params = {}) {
    return request.post('/pushData/update', qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 系统-添加
  pushDataAdd(params = {}) {
    return request.post('/pushData/add', qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 系统-删除
  pushDataDelete(params = {}) {
    return request.post('/pushData/delete', qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 系统-数据趋势-图表
  pushDataDetailGetList(params = {}) {
    return request.post('/pushDataDetail/getList', qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 概览明细
  iterPushUsrPushOpenRatio(params = {}) {
    return request({
      url: '/iterPush/usrPushOpenRatio',
      method: 'get',
      params
    })
  },
  // 系统-获取总的激活日总数
  pushDataGetActUsrDay(params = {}) {
    return request({
      url: '/pushData/getActUsrDay',
      method: 'get',
      params
    })
  },
}
