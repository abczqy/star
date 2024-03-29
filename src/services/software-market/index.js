import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL, API_BASE_URL_V2, SERVICE_PORTAL} = config

// +++++++++++++++++++++++++软件市场/个人中心接口+++++++++++++++++++++++++

/**
 * 软件市场/个人中心/学生应用删除
 */
export function studentAppsDelete (params, sucFn) {
  return axios.post(API_BASE_URL + '/personal/stuapps/delete', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的应用-教师分享
 */
export function teacShare (params, sucFn) {
  return axios.post(API_BASE_URL + '/application/teacherrecomend', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的应用
 */
export function personalApps (params, sucFn) {
  return axios.post(API_BASE_URL + '/personal/apps', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的收藏
 */
export function personalCollections (params, sucFn) {
  return axios.post(API_BASE_URL + '/personal/collections', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/学生应用
 */
export function personalStudentApp (params, sucFn) {
  return axios.post(API_BASE_URL + '/personal/student/app', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的应用删除
 */
export function personalAppsDelete (params, sucFn) {
  return axios.post(API_BASE_URL + '/personal/delete', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的收藏删除
 */
export function personalCollectionsDelete (params, sucFn) {
  return axios.post(API_BASE_URL + '/personal/collect/delete', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的收藏删除
 */
export function appCollect (params, sucFn) {
  return axios.post(API_BASE_URL + '/app/collect', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

// +++++++++++++++++++++++++软件市场/统计分析接口++++++++++++++++++++++++

/**
 * 统计分析-软件下载量变化
 */
export function softwareDownload (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/count/download-change', {params: params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 统计分析-软件收藏量变化
 */
export function softwareCollect (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/count/collection-change', {params: params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 统计分析-应用类型占比
 */
export function softwareType (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/count/app-type-percent', {params: params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 统计分析-当月应用下载型占比
 */
export function softwareDownloadConst (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/count/download-type', {params: params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 统计分析-全部软件下拉列表
 */
export function getAllAppCode (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/count/company-app', {params})
    .then(function (res) {
      sucFn(res)
    })
}
/** 修改用户信息
  */
export function updateUser (id, params, sucFn) {
  return axios.put(`${API_BASE_URL_V2}${SERVICE_PORTAL}/user-info/updateUserInfo?userId=${params.userId}`, params)
    .then(res => {
      sucFn(res)
    })
}
