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
 * 软件市场/个人中心/学生应用删除
 */
export function teacShare (params, sucFn) {
  return axios.post('/application/teacherrecomend', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
