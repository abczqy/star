/**
 * 分享内容
 */
export default {
// 分享到新浪微博
  shareToSinaWB: (event) => {
    event.preventDefault()
    var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=895033136' // 真实的appkey，必选参数
    _shareUrl += '&url=' + encodeURIComponent(document.location) // 参数url设置分享的内容链接|默认当前页location，可选参数
    _shareUrl += '&title=' + encodeURIComponent(document.title) // 参数title设置分享的标题|默认当前页标题，可选参数
    _shareUrl += '&source=' + encodeURIComponent('')
    _shareUrl += '&sourceUrl=' + encodeURIComponent('')
    _shareUrl += '&content=' + 'utf-8' // 参数content设置页面编码gb2312|utf-8，可选参数
    _shareUrl += '&pic=' + encodeURIComponent('') // 参数pic设置图片链接|默认为空，可选参数
    window.open(_shareUrl, '_blank')
  },

  // 分享到QQ空间
  shareToQzone: (event) => {
    event.preventDefault()
    var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'
    _shareUrl += 'url=' + encodeURIComponent(document.location) // 参数url设置分享的内容链接|默认当前页location
    _shareUrl += '&showcount=' + 1 // 参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
    _shareUrl += '&desc=' + encodeURIComponent('分享的描述') // 参数desc设置分享的描述，可选参数
    _shareUrl += '&summary=' + encodeURIComponent('分享摘要') // 参数summary设置分享摘要，可选参数
    _shareUrl += '&title=' + encodeURIComponent('标题123') // 参数title设置分享标题，可选参数
    _shareUrl += '&site=' + encodeURIComponent('分享来源') // 参数site设置分享来源，可选参数
    _shareUrl += '&pics=' + encodeURIComponent('') // 参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
    window.open(_shareUrl, '_blank')
  },

  // 分享到微信朋友圈
  shareToWeChat: (event) => {
    event.preventDefault()
  }

}
