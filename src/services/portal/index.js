import {axios} from '../../utils'

/**
 * 用户登陆
 */
export function login (params, sucFn) {
  return axios.put('/session/login', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 更新用户信息
 */
export function updateUserInfo (params, sucFn) {
  return axios.post('/', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 获取年级{grade}、教师职位{teacher_duty}下拉列表数据
 */
export function getUserInfoList (params, sucFn) {
  return axios.get('/getCodeTable/' + params.type, {})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 修改密码
 */
export function modifyPassword (params, sucFn) {
  return axios.post('/updateFirstPassword', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-Banner图片
 */
export function getPortalBannerImg (params, sucFn) {
  return axios.get('/getPlatformBannerList')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-热门推荐
 */
export function getRecommendApp (params, sucFn) {
  return axios.get('/getRecommendApp')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-软件市场
 */
export function getSoftMarketList (params, sucFn) {
  return axios.get('/getSoftMarketList')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-教育新闻
 */
export function getNewsNoticeList (params, sucFn) {
  return axios.get('/getNewsNoticeList')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-信息公开
 */
export function getPublicNoticeList (params, sucFn) {
  return axios.get('/getPublicNoticeList')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-应用总数统计
 */
export function getAllAppCount (params, sucFn) {
  return axios.get('/getAllAppCount')
    .then(function (res) {
      sucFn(res)
    })
}
