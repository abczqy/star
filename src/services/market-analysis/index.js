/**
 * Created by Administrator on 2018/5/4.
 */
import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL} = config
/**
 * 市场分析-表格
 */
export function marketAnalysis (params, sucFn) {
  return axios.post(API_BASE_URL + '/getMarketAnalysisList', {...params})
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
