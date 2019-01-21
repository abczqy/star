/**
 * 分享内容
 */
export default {
// 分享到新浪微博
  shareToSinaWB: (event, title) => {
    event.preventDefault()
    let params = {
      url: document.location.href,
      title: title || '', /* 分享标题(可选) */
      pic: '', /* 参数pic设置图片链接|默认为空，可选参数 */
      content: '',
      source: '',
      sourceUrl: ''
    }
    let s = []
    for (let i in params) {
      s.push(i + '=' + encodeURIComponent(params[i] || ''))
    }
    window.open('http://v.t.sina.com.cn/share/share.php?&appkey=895033136?' + s.join('&'), '_blank')
  },

  // 分享到QQ空间
  shareToQzone: (event, title) => {
    event.preventDefault()
    let params = {
      url: document.location.href,
      showcount: '1', /* 是否显示分享总数,显示：'1'，不显示：'0' */
      desc: '', /* 默认分享理由(可选) */
      summary: '', /* 分享摘要(可选) */
      title: title || '', /* 分享标题(可选) */
      site: '', /* 分享来源 如：腾讯网(可选) */
      pics: '', /* 分享图片的路径(可选) */
      style: '203',
      width: 98,
      height: 22
    }
    let s = []
    for (let i in params) {
      s.push(i + '=' + encodeURIComponent(params[i] || ''))
    }
    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&'), '_blank')
  },

  // 分享到微信朋友圈   返回网页生成二维码图片的地址
  getQRCodeUrl: (title) => {
    let params = {
      t: document.location.href, // 需要生成二维码的地址
      s: 300 // 二维码的宽高
    }
    let s = []
    for (let i in params) {
      s.push(i + '=' + encodeURIComponent(params[i] || ''))
    }
    return 'http://www.gbtags.com/gb/qrcode?' + s.join('&')
  }
}
