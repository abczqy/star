/**
 * 重构v2版接口地址
 */
import axios from 'axios'
import config from '../config/index'
import webStorage from 'webStorage'
const {API_BASE_URL_V2} = config

Object.assign(axios.defaults, {
  baseURL: API_BASE_URL_V2,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  withCredentials: false
})

// const xhrQueue = []
/**
 * 请求前钩子函数
 */
axios.interceptors.request.use(function (config) {
  // if (config.showLoading) {
  // //  xhrQueue.push(1)
  // }
  let STAR_WEB_SESSION_ID = webStorage.getItem('STAR_WEB_SESSION_ID') ? webStorage.getItem('STAR_WEB_SESSION_ID') : ''
  if (config.url.indexOf('?') > 0) {
    config.url = config.url + '&STAR_WEB_SESSION_ID=' + STAR_WEB_SESSION_ID
  } else {
    config.url = config.url + '?STAR_WEB_SESSION_ID=' + STAR_WEB_SESSION_ID
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 如果是登录超时
  if (response.data && response.data.isLoggedTimeOut) {
    window.location.reload(response.data.loginUrl)
  }
  // console.log('拦截请求')
  // window.location.href = 'https://www.baidu.com/'
  return response
})

export {axios}
