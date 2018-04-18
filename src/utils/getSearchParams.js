/**
 * 取url 中的参数
 * @param search
 * @param name
 * @returns {null}
 */
const getSearchString = (search, name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = search.substr(1).match(reg)
  if (r != null) { return unescape(r[2]) }
  return null
}

export default getSearchString
