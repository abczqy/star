/**
 * 设置cookie
 * @param key   cookie的key
 * @param value
 * @param iDay
 */
export function setCookie (key, value, iDay) {
  var oDate = new Date()
  oDate.setDate(oDate.getDate() + iDay)
  document.cookie = key + '=' + value + ';expires=' + oDate
}

/**
 * 清空kookie
 */
export function clearCookie () {
  // eslint-disable-next-line
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  console.log(keys)
  if (keys) {
    for (var i = keys.length; i--;) { document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() }
  }
}
