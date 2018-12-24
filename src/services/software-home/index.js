import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL} = config

// 厂商登录首页排行榜
export function manufacturerSignInRankingList (params, sucFn) {
  return axios.post(API_BASE_URL + '/app/charts', {...params})
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
  return axios.post(API_BASE_URL + '/app/teacherRecommendApp', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 首页热门推荐
export function hotRecommend (params, sucFn) {
  return axios.post(API_BASE_URL + '/app/hotApp', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 首页轮播图
export function homeCarousel (params, sucFn) {
  return axios.get(API_BASE_URL + '/homepage/banner', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 首页收藏
export function homeCollection (params, sucFn) {
  return axios.post(API_BASE_URL + '/app/collect', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
