// 1定时 2立即
export const PUSH_TYPE_ARR_OPTIONS = {
  1: '定时',
  2: '立即',
}

// 1启动app2链接3短视频4小视频5金币任务
// export const PUSH_TYPE_OPTIONS = {
//   '/kuaishou_video': '快手小视频',
//   '/main': '首页',
//   '/small_video': '小视频',
//   '/task_main': '任务中心',
//   '/video': '视频页',
//   '/webview': '网页链接',
// }

// 1.app启动 2.链接 3.短视频 4.小视频 5.金币任务 6.快手小视频
// export const PUSH_TYPE_OPTIONS_2 = {
//   1: '启动APP',
//   2: '链接',
//   3: '短视频',
// }

export const PUSH_USHER_TYPE_OPTIONS = {
  '10': '全部用户',
  '20': '指定用户',
  '30': '根据兴趣标签圈定',
}

// 1:手动推送 2:自动推送 3:数字化迭代推送
export const PUSH_USHER_TYPE_OPTIONS2 = {
  '1': '手动推送',
  '2': '自动推送',
  '3': '数字化迭代推送',
}

export const PUSH_STATUS_OPTIONS = {
  '1': '推送成功',
  '2': '推送失败',
}

export const IS_OPTIONS = {
  0: '否',
  1: '是',
}

export const FIRM_OPTIONS = {
  '1': '华为',
  '2': '友盟',
  '3': 'vivo',
}

// 1:友盟 2:华为 3:VIVO 4:OPPO 5:小米
export const CHANNEL_OPTIONS = {
  '1': '友盟',
  '2': '华为',
  '3': 'vivo',
  '4': 'OPPO',
  '5': '小米',
}

// -1-未知错误 0-未推送1-已推送 2-推送失败
export const TRIAL_PU_STATUS = {
  '-1': '未知错误',
  '0': '未推送',
  '1': '已推送',
  '2': '推送失败',
}

export const TRIAL_PU_STATUS_COLOR = {
  '-1': 'danger',
  '0': '',
  '1': 'success',
  '2': 'danger',
}

export const TRIAL_PU_CONFIG_STATUS = {
  '1': '开启',
  '0': '关闭',
}

// 迭代推概览-打开类型
export const TRIAL_PU_CONFIG_OPEN_TYPE = {
  '1': '开启',
  '0': '关闭',
}

// 用户激活日总数, 先前端写死
export const TRIAL_PU_ACTDAY_COUNT = 100

// // 激活日选项1 { 1: '第一日', 2: '第二日' }
// const TRIAL_PU_ACTDAY_OPTIONS = {}
// // 激活日选项2 { 0: '平均打开率', 1: '第一条打开率' }
// const TRIAL_PU_ACTDAY_OPTIONS2 = { '0': '平均' }
// // 激活日线下数组 ['第一日']
// const TRIAL_PU_ACTDAY_OPTIONS_ARRAY = []

// new Array(TRIAL_PU_ACTDAY_COUNT).fill(1).map((_, index) => {
//   const txt = `第${index + 1}天`
//   TRIAL_PU_ACTDAY_OPTIONS[index + 1] = txt
//   TRIAL_PU_ACTDAY_OPTIONS2[index + 1] = `第${index + 1}条平均打开率`
//   TRIAL_PU_ACTDAY_OPTIONS_ARRAY.push({ label: txt, value: index + 1 })
// })

// export { TRIAL_PU_ACTDAY_OPTIONS, TRIAL_PU_ACTDAY_OPTIONS_ARRAY, TRIAL_PU_ACTDAY_OPTIONS2 }

// 项目类型的值
export const TRIAL_PU_PROJECT_OPTIONS2 = {
  '2': {
    label: '视频',
    code: 'shipin',
  },
  '1': {
    label: '来电',
    code: 'laidian',
  },
}

// { 'shipin': '2', 'laidian': '1' }
export const TRIAL_PU_PROJECT_OPTIONS = {}

Object.keys(TRIAL_PU_PROJECT_OPTIONS2).forEach(o => {
  TRIAL_PU_PROJECT_OPTIONS[TRIAL_PU_PROJECT_OPTIONS2[o].code] = o
})

export const TRIAL_PU_VIDEO_OPTIONS = {
  '1': '上线',
  '2': '预上线',
  '-1': '待审核',
  '-3': '下线'
}
