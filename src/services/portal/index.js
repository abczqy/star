import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL, API_BASE_URL_AUTHENTICATION} = config

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
 * 用户登陆(新)
 */
export function loginNew (params, sucFn) {
  return axios.post(API_BASE_URL_AUTHENTICATION + '/authentication', {...params})
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
  return axios.get(API_BASE_URL + '/getPlatformBannerList')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-热门推荐
 */
export function getRecommendApp (params, sucFn) {
  return axios.get(API_BASE_URL + '/getRecommendApp')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-软件市场
 */
export function getSoftMarketList (params, sucFn) {
  return axios.get(API_BASE_URL + '/getSoftwareMarketShow')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-教育新闻
 */
export function getNewsNoticeList (params, sucFn) {
  return axios.get(API_BASE_URL + '/getNewsNoticeList')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-信息公开
 */
export function getPublicNoticeList (params, sucFn) {
  return axios.get(API_BASE_URL + '/getPublicNoticeList')
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 门户首页-应用总数统计
 */
export function getAllAppCount (params, sucFn) {
  return axios.get(API_BASE_URL + '/getAllAppCount')
    .then(function (res) {
      sucFn(res)
    })
}
