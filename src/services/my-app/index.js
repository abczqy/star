import {axios} from '../../utils'

// 我的应用-运营中
export function myAppInOperation (params, sucFn) {
  return axios.post('/application/myapp', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 我的应用-审核中
export function myAppToExamine (params, sucFn) {
  return axios.post('/application/myappexamine', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 我的应用-迭代审核
export function myAppIteration (params, sucFn) {
  return axios.post('/application/myappiteratrionexamine', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 我的应用-审核和迭代中的撤销
export function myAppRevoke (params, sucFn) {
  return axios.post('/application/examinecancel', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 我的应用详情 - 开发相关
export function developmentRelated (params, sucFn) {
  return axios.post('/personal/developer', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
