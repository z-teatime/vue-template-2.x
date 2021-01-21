/**
 * @file 推送管理
 */

import request from '@/utils/request'
import qs from 'qs'

export default {
  // 获取来电渠道
  getLaidianPushChannel(params = {}) {
    return request({
      url: '/push/getLaidianPushChannel',
      method: 'get',
      params
    })
  },
  // 敏感词检测
  getSensitiveWord(params = {}) {
    return request({
      url: '/moderation/text',
      method: 'get',
      params
    })
  },
  // 敏感词检测2
  getSensitiveWord2(params = {}) {
    return request({
      url: '/moderation/checkTextPush',
      method: 'get',
      params
    })
  },

  // 获取推送管理列表
  getPushList(params = {}) {
    return request({
      url: '/push/list',
      method: 'get',
      params
    })
  },
  // 获取推送配置
  getPushConfig(params = {}) {
    return request({
      url: '/push/pushConfig',
      method: 'get',
      params
    })
  },
  // 获取推送信息
  getPushData(params = {}) {
    return request({
      url: '/push/view',
      method: 'get',
      params
    })
  },
  // 删除推送
  delPush(params = {}) {
    return request.post('/push/destroy', qs.stringify(params), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 推送编辑
  pushEdit(params = {}) {
    return request.post('/push/update', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 添加推送
  pushAdd(params = {}) {
    return request.post('/push/store', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
  },
  // 获取报表列表
  getPushResult(params = {}) {
    return request({
      url: '/push/pushResult',
      method: 'get',
      params
    })
  },
  // 获取试推手机列表（分页） 试推
  getPhoneList(params = {}) {
    return request({
      url: '/tryPush/getPhoneList',
      method: 'get',
      params
    })
  },
  // 获取全部手机号. 试推手机
  getPhoneAll(params = {}) {
    return request({
      url: '/tryPush/getAll',
      method: 'get',
      params
    })
  },
  // 推送内容列表
  getContentList(params = {}) {
    return request({
      url: '/tryPush/getContentList',
      method: 'get',
      params
    })
  },
  // 新增手机号
  addPhoneItem(params = {}) {
    return request({
      url: '/tryPush/addPhone',
      method: 'post',
      params
    })
  },
  // 删除手机号
  delPhoneItem(params = {}) {
    return request({
      url: '/tryPush/deletePhone',
      method: 'get',
      params
    })
  },
  // 立即测试-保存
  saveContent(params = {}) {
    return request.post('/tryPush/saveContent', params, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  },
  // 立即测试-测试
  saveContentTryPush(params = {}) {
    return request({
      url: '/tryPush/tryPush',
      method: 'get',
      params
    })
  },
  // 立即测试-测试
  getApppackages(params = {}) {
    return request({
      url: '/tryPush/getAppPackageList',
      method: 'get',
      params
    })
  },
  // 根据标签预估人数
  getUserLabel(params = {}) {
    return request({
      baseURL: process.env.VUE_APP_BIGDATA_BASE_API,
      url: '/api/push/predictCount',
      method: 'POST',
      params
    })
  },
  /*
   * 获取项目/应用列表
   */
  getAppPackagesForType(params = {}) {
    return request({
      url: '/iterPush/GlobalConfBox',
      method: 'GET',
      params
    })
  },
  /*
   * 获取
   */
  getVideosCatList(params = {}) {
    return request({
      url: '/push/getVideosCatList',
      method: 'GET',
      params
    })
  },

  // 自动推送 - 获取自动推送配置列表
  fetchAutoConfigList(params = {}) {
    return request({
      url: '/autoPushConfig/getAutoPushConfigList',
      method: 'post',
      params,
      headers: {
        'Content-Type': 'application/form-data'
      },
    })
  },

  // 自动推送 - 根据Id查看自动推送配置详情
  fetchSelectById(params = {}) {
    return request.post('/autoPushConfig/selectById', params, {
      headers: {
        'Content-Type': 'application/form-data'
      },
    })
  },

  // 自动推送 - 编辑自动推送配置
  updateAutoPushConfig(params = {}) {
    return request({
      url: '/autoPushConfig/updateAutoPushConfig',
      method: 'post',
      params,
      headers: {
        'Content-Type': 'application/form-data'
      },
    })
  },
  getVideoInfoById(params = {}) {
    return request({
      url: '/push/searchVideo',
      method: 'GET',
      params
    })
  },

  // 推送日志查询
  pushCountGetList(params = {}) {
    return request({
      url: '/pushCount/getList',
      method: 'GET',
      params
    })
  },
  // 文案id，包、类型、渠道聚合查询
  pushCountGetPAMCCount(params = {}) {
    return request({
      url: '/pushCount/getPAMCCount',
      method: 'GET',
      params
    })
  },
  // 包、类型、渠道聚合查询
  pushCountGetAMCCount(params = {}) {
    return request({
      url: '/pushCount/getAMCCount',
      method: 'GET',
      params
    })
  },
}
