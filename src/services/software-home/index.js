import {axios} from '../../utils'

// 厂商登录首页排行榜
export function manufacturerSignInRankingList (params, sucFn) {
  return axios.post('/app/charts', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 首页搜索
export function homeSearch (params, sucFn) {
  return axios.post('/details/search', {...params})
    .then(function (res) {
      sucFn(res)
    })
    .then(function (d) {
      sucFn(d)
    })
}
// 首页老师推荐
export function teacherRecommend (params, sucFn) {
  return axios.post('/app/teacherRecommendApp', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 首页热门推荐
export function hotRecommend (params, sucFn) {
  return axios.post('/app/hotApp', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 首页轮播图
export function homeCarousel (params, sucFn) {
  return axios.get('/homepage/banner', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
// 首页收藏
export function homeCollection (params, sucFn) {
  return axios.post('/app/collect', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
