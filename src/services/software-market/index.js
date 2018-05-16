import {axios} from '../../utils'

/**
 * 软件市场/个人中心/学生应用删除
 */
export function studentAppsDelete (params, sucFn) {
  return axios.post('/personal/stuapps/delete', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的应用-教师分享
 */
export function teacShare (params, sucFn) {
  return axios.post('/application/teacherrecomend', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的应用
 */
export function personalApps (params, sucFn) {
  return axios.post('/personal/apps', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的收藏
 */
export function personalCollections (params, sucFn) {
  return axios.post('/personal/collections', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/学生应用
 */
export function personalStudentApp (params, sucFn) {
  return axios.post('/personal/student/app', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的应用删除
 */
export function personalAppsDelete (params, sucFn) {
  return axios.post('/personal/delete', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的收藏删除
 */
export function personalCollectionsDelete (params, sucFn) {
  return axios.post('/personal/collect/delete', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件市场/个人中心/我的收藏删除
 */
export function appCollect (params, sucFn) {
  return axios.post('/app/collect', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

// 个人中心-学生应用收藏/取消收藏
// studentAppsCollect: AJAX_HOST + '/app/collect'
