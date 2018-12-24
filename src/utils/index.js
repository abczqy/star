import getEchartsOptions from './getEchartsOptions'
import getSearchString from './getSearchParams'
import {axios} from './HttpClient'
import {axiosV2} from './HttpClientV2'

/**
 * 截取字符串
 * @param str
 * @param n
 * @returns {*}
 */
const processStr = (str, n) => {
  if (!str) {
    str = ''
  }
  let l = str.length
  if (l <= n) return str
  return str.slice(0, n) + '...'
}
export {
  getEchartsOptions,
  axios,
  axiosV2,
  getSearchString,
  processStr
}
