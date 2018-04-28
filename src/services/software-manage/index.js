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
  return axios.post('/management/renew', params)
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 软件管理-运营中-下架
 */
export function undercarriage (params, sucFn) {
  return axios.post('/management/undercarriage', params)
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
  return axios.post('/factoryManage/updatepwd', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-厂商-获取厂商详情
 */
export function getFaDetails (params, sucFn) {
  return axios.post('/factoryManage/getdetail', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-厂商-批量导出
 */
export function faBatchLeadout (params, sucFn) {
  return axios.post('/management/batchleadoutfa', {...params})
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
 * 会员管理-学生-查询
 */
export function getStudentDatas (params, sucFn) {
  axios.post('/stuManage/getMsg', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-学生-改变登录状态
 */
export function changeStuToLogin (params, sucFn) {
  axios.post('/stuManage/updatelogin', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-学生-重置密码
 */
export function initStuPwd (params, sucFn) {
  axios.post('/stuManage/updatepwd', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-学生-删除学生账号
 */
export function delStuLoginId (params, sucFn) {
  axios.post('/stuManage/updatestate', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-学生-批量导出
 */
export function stBatchLeadout (params, sucFn) {
  axios.post('/management/batchleadoutst', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-家长-查询
 */
export function paGetData (params, sucFn) {
  axios.post('/parentmanage/getlist', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-家长-批量导出
 */
export function paBatchLeadout (params, sucFn) {
  axios.post('/management/batchleadoutpa', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-家长-改变登录状态
 */
export function changePaToLogin (params, sucFn) {
  axios.post('/parentmanage/tologin', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-家长-重置密码
 */
export function initPaPwd (params, sucFn) {
  axios.post('/parentmanage/updatepwd', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-家长-删除家长账号
 */
export function delPaLoginId (params, sucFn) {
  axios.post('/parentmanage/updatestate', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-学校-查询
 */
export function schGetData (params, sucFn) {
  axios.post('/manage/school', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-学校-删除
 */
export function schDelId (params, sucFn) {
  axios.post('/manage/delete', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-学校-密码重置
 */
export function schInitPwd (params, sucFn) {
  axios.post('/manage/updatePassword', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-学校-批量导出
 */
export function schBatchLeadout (params, sucFn) {
  axios.post('/manage/updatePassword', {...params})
    .then((res) => {
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

/**
 * 软件时长-上架申请
 */
export function shelf (params, sucFn) {
  return axios.post('/uploadSw/upload', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 迭代申请
 */
export function iteration (params, sucFn) {
  return axios.post('/updateSoft/update', params)
    .then(function (res) {
      sucFn(res)
    })
}
