/**
 * Created by Administrator on 2018/4/28.
 */
import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL, API_BASE_URL_V2, SERVICE_PORTAL} = config
/**
 * 校验邮箱是否被占用
 */
export function registerValitemail (params, sucFn, errFn) {
  return axios.post(API_BASE_URL + '/register/vailEmail', {...params})
    .then(function (res) {
      sucFn(res)
    }).catch(function (err) {
      errFn(err)
    })
}
/**
 * 注册按钮
 */
export function register (params, sucFn) {
  return axios.post(API_BASE_URL + '/register/registermaf', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 家长自注册
 */
export function registerParent (params, sucFn) {
  return axios.post(API_BASE_URL_V2 + SERVICE_PORTAL + '/parentsOperation', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 注册用户协议
 */
export function getRegisterAgreement (params, sucFn) {
  return axios.get(API_BASE_URL + '/register/getRegisterAgreement', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-查询与家长绑定的学生
 */
export function relationQueryStu (params, sucFn) {
  return axios.post(API_BASE_URL + '/addRelation/queryStu', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-添加学生绑定
 */
export function relationAdd (params, sucFn) {
  return axios.post(API_BASE_URL + '/addRelation/add', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-删除绑定的学生
 */
export function relationdelete (params, sucFn) {
  return axios.post(API_BASE_URL + '/addRelation/delete', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-登出
 */
export function sessionLogout (params, sucFn) {
  return axios.put(API_BASE_URL + '/session/logout', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 消息通知-消息通知列表
 */
export function getAllMessageList (params, id, sucFn) {
  return axios.get(`${API_BASE_URL_V2}${SERVICE_PORTAL}/messages/${id}`, {params: params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 消息通知-未读消息数
 */
export function getMessageCount (params, id, sucFn) {
  return axios.get(`${API_BASE_URL_V2}${SERVICE_PORTAL}/messages/count/${id}`, {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 消息通知-消息通知列表详情
 */
export function getMessageListDetail (params, sucFn) {
  return axios.get(API_BASE_URL + '/getMessageDetail', { params: params })
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-密码修改
 */
export function updateUserPassword (params, sucFn) {
  return axios.post(API_BASE_URL_V2 + SERVICE_PORTAL + '/account-security', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-返回手机绑定默认消息
 */
export function whetherOrNotToVerify (params, sucFn) {
  return axios.get(API_BASE_URL + '/whetherOrNotToVerify', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * // 账号设置-手机验证
 */
export function updatePhoneNum (params, sucFn) {
  return axios.post(API_BASE_URL + '/updatePhoneNum', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * // 账号设置-获取厂商默认值
 */
export function queryFactoryMsg (params, sucFn) {
  return axios.get(API_BASE_URL + '/factoryManage/queryFactoryMsg', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * // 账号设置-修改厂商名称
 */
export function updateVendorName (params, sucFn) {
  return axios.post(API_BASE_URL + '/factoryManage/updateFactoryName', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * // 账号设置-修改厂商描述
 */
export function updateFactoryDesc (params, sucFn) {
  return axios.post(API_BASE_URL + '/factoryManage/updateFactoryDesc', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * // 账号设置-修改厂商合同号
 */
export function updateFactoryNum (params, sucFn) {
  return axios.post(API_BASE_URL + '/factoryManage/updateFactoryNum', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * // 账号设置-修改厂商营业执照
 */
export function updateFactoryContract (params, sucFn) {
  return axios.post(API_BASE_URL + '/factoryManage/updateFactoryContract', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 忘记密码
 */
export function forgetThePassword (params, sucFn) {
  return axios.post(API_BASE_URL + '/forgetThePassword', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 忘记密码-获取短信验证码
 */
export function SMSVerification (params, sucFn) {
  return axios.post(API_BASE_URL + '/SMSVerification', params)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 忘记密码-校验短信验证码
 */
export function Verificationv2 (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + SERVICE_PORTAL + '/account-security/' + params.phone + '/' + params.valid)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 忘记密码-修改密码
 */
export function updataPasswordv2 (params, sucFn) {
  return axios.post(API_BASE_URL_V2 + SERVICE_PORTAL + '/account-security/', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 忘记密码-获取短信验证码
 */
export function SMSVerificationv2 (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + SERVICE_PORTAL + '/account-security/send-security-phone-valid/' + params.phone)
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 人员管理-教师管理-学生管理列表
 */
export function applicationteacherlist (params, url, sucFn) {
  return axios.post(url, {...params})
    .then(function (res) {
      sucFn(res)
    })
}

/**
 * 人员管理- 教师编辑
 */
export function teacherUpdate (params, sucFn) {
  return axios.post(API_BASE_URL + '/manage/teacher/update', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 人员管理- 教师删除
 */
export function teacherDelete (params, sucFn) {
  return axios.post(API_BASE_URL + '/manage/teacher/delete', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 人员管理- 学生编辑
 */
export function sutdentUpdate (params, sucFn) {
  return axios.post(API_BASE_URL + '/manage/student/update', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 人员管理- 学生删除
 */
export function sutdentDelete (params, sucFn) {
  return axios.post(API_BASE_URL + '/manage/student/delete', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 人员管理-批量导入
 */
export function batchImport (params, sucFn) {
  return axios.post(API_BASE_URL + '/application/batchleadin', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
