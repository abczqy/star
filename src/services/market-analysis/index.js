/**
 * Created by Administrator on 2018/5/4.
 */
import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL, API_BASE_URL_V2} = config
/**
 * 市场分析-表格
 */
export function marketAnalysis (params, sucFn) {
  return axios.get(API_BASE_URL_V2 + '/edu-market/count/list', {params: params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 市场分析-关键词搜索
 */
export function wordCloud (params, sucFn) {
  return axios.get(API_BASE_URL + '/wordcloud', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
