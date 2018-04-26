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
 * 会员管理-厂商-列表/查询
 */
export function firmRenewList (params, sucFn) {
  return axios.post('/factoryManage/getFactory', {...params})
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
 * 会员管理-厂商-删除某个厂商账号
 */
export function delFaId (params, sucFn) {
  return axios.post('/factoryManage/deleteFactory', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 会员管理-厂商-改变某个厂商的登录状态
 */
export function changeFaLoginState (params, sucFn) {
  return axios.post('/factoryManage/tologin', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 会员管理-厂商-初始化厂商的密码
 */
export function initFaPwd (params, sucFn) {
  return axios.post('/factoryManage/updatepwd', {params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-厂商-获取厂商详情
 */
export function getFaDetails (params, sucFn) {
  return axios.post('/factoryManage/getdetail', {params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-厂商-批量导出
 */
export function faBatchLeadout (params, sucFn) {
  return axios.post('/management/batchleadoutfa', {params})
    .then((res) => {
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
 * 软件管理-待审核详情
 */
export function verifyDetail (params, sucFn) {
  return axios.post('/management/appdetail', params)
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件管理-待审核-审核
 */
export function waitVeriExam (params, sucFn) {
  return axios.post('/management/examineapp', params)
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

/**
 * 软件管理-迭代审核详情
 */
export function iterVeriDetail (params, sucFn) {
  return axios.post('/management/appdetailiter', params)
    .then(function (res) {
      sucFn(res)
    })
}
