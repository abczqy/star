import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL, API_BASE_URL_V2} = config

// 全部应用 - 软件应用
export function allAppList (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/manage-app/condition', {params: params})
    .then(function (res) {
      sucFn(res)
    })
}
// 全部应用 - 平台应用
export function allAppPlatformList (params, sucFn) {
  return axios.get(API_BASE_URL + '/app/platform', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 应用详情（第三方）
export function thirdPartyAppDetail (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/manage-app/detail-by-id/' + params.appId)
    .then(function (res) {
      sucFn(res)
    })
}
// 判断应用是否开通
export function appIsOpen (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/manage-app/detail/open/' + params.appId)
    .then(function (res) {
      sucFn(res)
    })
}
// 开通应用
export function appOpen (params, sucFn) {
  return axios.post(API_BASE_URL_V2 + '/edu-market/app-open', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

// 应用详情 (自营)
export function selfSupportAppDetail (params, sucFn) {
  return axios.post(API_BASE_URL + '/app/platform/details', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 全部应用-应用详情-相关应用
export function relatedApplications (params, sucFn) {
  return axios.post(API_BASE_URL + '/personal/relatedApp', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

// 全部应用-应用详情-开通
export function openPlatformAppByUser (params, sucFn) {
  return axios.post(API_BASE_URL + '/app/openPlatformAppByUser', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

// 全部应用-应用分类
export function getAppType (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/app-type')
    .then(function (res) {
      sucFn(res)
    })
}
