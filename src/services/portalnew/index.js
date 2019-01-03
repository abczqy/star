import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL, API_BASE_URL_V2} = config

/**
 * 用户登陆
 */
export function login (params, sucFn) {
  return axios.put(API_BASE_URL + '/session/login', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 获取验证码
 */
export function getIdentifying (params, sucFn) {
  return axios.get(API_BASE_URL + '/accountSecurity/sendSecurityPhoneValid/' + params)
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 更新用户信息
 */
export function updateUserInfo (params, sucFn) {
  return axios.post(API_BASE_URL + '/control/update/' + params.type, {...params.params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 获取年级{grade}、教师职位{teacher_duty}下拉列表数据
 */
export function getUserInfoList (params, sucFn) {
  return axios.get(API_BASE_URL + '/getCodeTable/' + params.type, {})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 修改密码
 */
export function modifyPassword (params, sucFn) {
  return axios.post(API_BASE_URL + '/updateFirstPassword', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-Banner图片
 */
export function getPortalBannerImg (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/portal/banners/' + params.bannerType)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 门户首页-轮播消息
 */
export function getMessageCaro (userId, params, sucFn) {
  return axios.post(API_BASE_URL_V2 + '/portal/messages', {params: params})
  // return axios.get(API_BASE_URL_V2 + '/portal/messages')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-工作台我的应用
 */
export function getRecommendApp (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/app-open')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-软件市场重点推荐
 */
export function getSoftMarketList (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/top-app/1/6')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-教育新闻
 */
export function getNewsNoticeList (params, sucFn) {
  // console.log(params)
  return axios.get(API_BASE_URL_V2 + '/portal/news/list/1', {params: params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-信息公开
 */
export function getPublicNoticeList (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/portal/notifications/list/1', {params: params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-应用总数统计
 */
export function getAllAppCount (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/manage-app/app-info')
    .then(function (res) {
      sucFn(res)
    })
}
