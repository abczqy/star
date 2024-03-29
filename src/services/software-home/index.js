import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL, API_BASE_URL_V2, SERVICE_PORTAL} = config

// 厂商登录首页排行榜
export function manufacturerSignInRankingList (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/count/download-ranking/10/1')
    .then(function (res) {
      sucFn(res)
    })
}
// 软件超市首页新应用排行榜
export function newAppRankingList (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/app-ranking-top?topSize=10')
    .then(function (res) {
      sucFn(res)
    })
}
// 首页搜索
export function homeSearch (params, sucFn) {
  return axios.post(API_BASE_URL + '/details/search', {...params})
    .then(function (res) {
      sucFn(res)
    })
    .then(function (d) {
      sucFn(d)
    })
}
// 首页老师推荐
export function teacherRecommend (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/portal/teacher-recommend-app/list', {params: params})
    .then(function (res) {
      sucFn(res)
    })
}
// 首页热门推荐
export function hotRecommend (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/hot-app/detail-list/' + params.pageNum + '/' + params.pageSize)
    .then(function (res) {
      sucFn(res)
    })
}
// 首页轮播图
export function homeCarousel (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/portal/banners/' + params.bannerType)
    .then(function (res) {
      sucFn(res)
    })
}
// 首页收藏
export function homeCollection (params, sucFn) {
  return axios.post(API_BASE_URL_V2 + '/edu-market/app-collect', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 首页取消收藏
export function homeCancelCollection (params, sucFn) {
  return axios.delete(API_BASE_URL_V2 + '/edu-market/app-collect/' + params.appId)
    .then(function (res) {
      sucFn(res)
    })
}
/** 老师推荐点击 */
export function clickRecommend (params, sucFn) {
  return axios.post(API_BASE_URL_V2 + SERVICE_PORTAL + '/teacher-recommend-app/commend?appId=' + params.appId)
    .then(res => {
      sucFn(res)
    })
}
