import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL} = config

// 我的应用-运营中
export function myAppInOperation (params, sucFn) {
  return axios.post(API_BASE_URL + '/application/myapp', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 应用类型下拉框
export function applicationTypeData (params, sucFn) {
  return axios.get(API_BASE_URL + '/management/apptype', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 我的应用-审核中
export function myAppToExamine (params, sucFn) {
  return axios.post(API_BASE_URL + '/application/myappexamine', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 我的应用-迭代审核
export function myAppIteration (params, sucFn) {
  return axios.post(API_BASE_URL + '/application/myappiteratrionexamine', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 我的应用-审核和迭代中的撤销
export function myAppRevoke (params, sucFn) {
  return axios.post(API_BASE_URL + '/application/examinecancel', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 我的应用详情 - 开发相关
export function developmentRelated (params, sucFn) {
  return axios.post(API_BASE_URL + '/personal/developer', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
