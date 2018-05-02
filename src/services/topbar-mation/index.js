/**
 * Created by Administrator on 2018/4/28.
 */
import {axios} from '../../utils'
/**
 * 校验邮箱是否被占用
 */
export function registerValitemail (params, sucFn, errFn) {
  return axios.post('/register/vailEmail', {...params})
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
  return axios.post('/register/registermaf', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-查询与家长绑定的学生
 */
export function relationQueryStu (params, sucFn) {
  return axios.post('/addRelation/queryStu', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-添加学生绑定
 */
export function relationAdd (params, sucFn) {
  return axios.post('/addRelation/add', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-删除绑定的学生
 */
export function relationdelete (params, sucFn) {
  return axios.post('/addRelation/delete', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-登出
 */
export function sessionLogout (params, sucFn) {
  return axios.put('/session/logout', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 消息通知-消息通知列表
 */
export function getAllMessageList (params, sucFn) {
  return axios.post('/getAllMessageList', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 消息通知-未读消息数
 */
export function getMessageCount (params, sucFn) {
  return axios.post('/getUnreadMessageCount', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 消息通知-消息通知列表详情
 */
export function getMessageListDetail (params, sucFn) {
  return axios.get('/getMessageDetail', { params: params })
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 账号设置-密码修改
 */
export function updateUserPassword (params, sucFn) {
  return axios.post('/control/updateUserPassword', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * // 账号设置-手机验证
 */
export function updatePhoneNum (params, sucFn) {
  return axios.post('/updatePhoneNum', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 忘记密码
 */
export function forgetThePassword (params, sucFn) {
  return axios.post('/control/updateUserPassword', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 忘记密码-获取短信验证码
 */
export function SMSVerification (params, sucFn) {
  return axios.post('/SMSVerification', {...params})
    .then(function (res) {
      sucFn(res)
    })
}