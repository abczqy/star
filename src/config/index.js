
const Config = {
  API_BASE_URL: 'http://192.168.1.26:52999/server',
  // IMG_BASE_URL: 'http://fjdownload.nebedu.cn',
  IMG_BASE_URL: 'http://192.168.1.26:52999',
  BASE_TAB: 'http://localhost:8080',
  USER_COUNT: 'http://localhost:8080/static/operation-statistical/statistics/userStatistics.html', // 后台管理系统->运营统计->用户统计
  APP_COUNT: 'http://localhost:8080/static/operation-statistical/statistics/appStatistics.html', // 后台管理系统->运营统计->应用统计
  LOGOUT_URL: '',
  LOGIN_URL: 'http://127.0.0.1/cas/login',
  API_BASE_URL_EDUMARKET: 'http://192.168.1.71:10301', // 门户 服务接口
  API_BASE_URL_PORTAL: 'http://192.168.1.71:10300', // 应用市场  服务  接口
  API_BASE_URL_AUTHENTICATION: 'http://192.168.1.71:10200', // 登陆接口
  API_BASE_URL_V2: 'http://192.168.1.31:10101', // 服务器总路径
  SERVICE_PORTAL: '/portal', // 门户
  SERVICE_EDU_MARKET: '/edu-market', // 市场
  SERVICE_AUTHENTICATION: '/authentication', // 用户认证
  IMG_BASE_URL_V2: 'http://192.168.1.31:4400/', // 文件服务器-图片
  DOC_BASE_URL_V2: 'http://192.168.1.31:4400/', // 文件服务器-文档
  SOFT_BASE_URL_V2: 'http://192.168.1.31:4400/' // 文件服务器-软件
}

export default Config
