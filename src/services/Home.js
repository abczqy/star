import {axios} from '../utils'

/**
 * 获取首页信息
 */
export function getHomeData (sucFn) {
  return axios.get('/home/getHomeData')
    .then(response => { sucFn(response.data) })
}
