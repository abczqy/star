/**
 * 设置cookie
 * @param key   cookie的key
 * @param value
 * @param iDay
 */
export function setCookie (key, value, iDay) {
  var oDate = new Date()
  oDate.setTime(oDate.getTime() + (iDay * 24 * 60 * 60 * 1000))
  console.log(oDate)
  document.cookie = key + '=' + value + ';expires=' + oDate.toUTCString()
}

export function getCookie (key) {
  var name = key + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim()
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return ''
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
