import {axios} from '../../utils'

// 全部应用 - 软件应用
export function allAppList (params, sucFn) {
  return axios.post('/app/appList', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 全部应用 - 平台应用
export function allAppPlatformList (params, sucFn) {
  return axios.get('/app/platform', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 应用详情（第三方）
export function thirdPartyAppDetail (params, sucFn) {
  return axios.post('/app/details', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

// 应用详情 (自营)
export function selfSupportAppDetail (params, sucFn) {
  return axios.post('/app/platform/details', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 全部应用-应用详情-相关应用
export function relatedApplications (params, sucFn) {
  return axios.post('/personal/relatedApp', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
