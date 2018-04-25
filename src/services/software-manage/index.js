import {axios} from '../../utils'

/**
 * 软件管理-运营中
 */
export function getAppListData (params, sucFn) {
  return axios.post('/management/applistm', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件管理-运营中-续费
 */
export function appRenew (params, sucFn) {
  return axios.post('/management/renewal', params)
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 会员管理-厂商
 */
export function firmRenewList (params, sucFn) {
  return axios.post('/a', params)
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 会员管理-厂商-厂商详情
 */
export function getFactoryDetail (params, sucFn) {
  return axios.post('/factoryManage/getdetail', params)
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 会员管理-厂商-续签
 */
export function firmRenew (params, sucFn) {
  return axios.post('/factoryManage/renew', params)
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件管理-待审核
 */
export function getExamList (params, sucFn) {
  return axios.post('/management/examinelistm', params)
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件管理-迭代审核
 */
export function iterVerify (params, sucFn) {
  return axios.post('/management/iterationexaminelistm', params)
    .then(function (res) {
      sucFn(res)
    })
}
