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
 * 软件管理-运营中-置顶
 */
export function stick (params, sucFn) {
  return axios.post('/management/stick', params)
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 会员管理-账号-下拉菜单-获取数据
 */
export function getIdSelectList (params, sucFn) {
  return axios.post('/manage/listRoleAccount', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 会员管理-名称-下拉菜单-获取数据
 */
export function getNameSelectList (params, sucFn) {
  return axios.post('/manage/listRoleName', {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 会员管理-合同状态-下拉菜单-获取数据
 */
export function getContractSelectList (params, sucFn) {
  return axios.post('/manage/listContract', {...params})
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
 * 会员管理-学校/老师/机构-删除
 */
export function maDelId (params, sucFn) {
  axios.post('/manage/delete', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-学校/老师/机构-密码重置
 */
export function maInitPwd (params, sucFn) {
  axios.post('/manage/updatePassword', {...params})
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
 * 会员管理-学校-批量导出
 */
export function schBatchLeadout (params, sucFn) {
  axios.post('/manage/updatePassword', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-教师-查询
 */
export function thGetData (params, sucFn) {
  axios.post('/manage/teacher', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-教师-批量导出
 */
export function thBatchLeadout (params, sucFn) {
  axios.post('/manage/teacher', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-教育机构-查询
 */
export function eduGetData (params, sucFn) {
  axios.post('/manage/educational', {...params})
    .then((res) => {
      sucFn(res)
    })
}

/**
 * 会员管理-教育机构-批量导出
 */
export function eduBatchLeadout (params, sucFn) {
  axios.post('/management/batchleadoutedu', {...params})
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
/**
 * 平台首页-门户导航添加
 */
export function addGatewayNavigation (params, sucFn) {
  return axios.post('/addGatewayNavigation', params)
}
/*
 * 信息公开编辑
 */
export function informationEdListEdit (params, sucFn) {
  return axios.post('/manage/editPublicInfo', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 平台首页-门户导航查询
 */
export function getGatewayNavigationList (params, sucFn) {
  return axios.get('/getGatewayNavigationList', params)
}
/*
 * 信息公开新增
 */
export function informationEdListAdd (params, sucFn) {
  return axios.post('/manage/addPublicInfo', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
<<<<<<< Updated upstream
 * 平台首页-门户导航删除
 */
export function deleteGatewayNavigation (params, sucFn) {
  return axios.post('/deleteGatewayNavigation', params)
}
/*
 * 信息公开删除
 */
export function informationEdListDelete (params, id, sucFn) {
  return axios.get(`/manage/deleteEduMsgList?InfoId=${id}`, params)
    .then(function (res) {
      sucFn(res)
    })
}
/*
/**
 * 平台首页-banner图添加
 */
export function addGatewayBanner (params, sucFn) {
  return axios.post('/addGatewayBanner', params)
}
/*
 * 信息公开编辑的列表
 */
export function informationEdList (params, sucFn) {
  return axios.post('/manage/getPublicInfo', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
<<<<<<< Updated upstream
 * 平台首页-banner图查询
 */
export function getGatewayBannerList (params, sucFn) {
  return axios.get('/getGatewayBannerList', params)
}
/*
 * 用appId获取app数据接口
 */
export function appId (params, sucFn) {
  return axios.post('/app/details', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 平台首页-banner图删除
 */
export function deleteGatewayBanner (params, sucFn) {
  return axios.post('/deleteGatewayBanner', params)
}
/*
 * 教育新闻列表
 */
export function newsList (params, sucFn) {
  return axios.post('/application/newslist', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 教育新闻列表详情
 */
export function newsListDet (params, sucFn) {
  return axios.post('/application/newdetial', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 信息公开列表
 */
export function information (params, sucFn) {
  return axios.post('/application/infolist', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 信息公开列表编辑
 */
export function informationDet (params, sucFn) {
  return axios.post('/application/infodetail', params)
    .then(function (res) {
      sucFn(res)
    })
}
