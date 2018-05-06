/**
 * Created by Administrator on 2018/5/4.
 */
import {axios} from '../../utils'
/**
 * 市场分析-表格
 */
export function marketAnalysis (params, sucFn) {
  return axios.post('/getMarketAnalysisList', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
/**
 * 市场分析-关键词搜索
 */
export function wordCloud (params, sucFn) {
  return axios.get('/wordcloud', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
