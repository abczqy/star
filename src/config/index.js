
const Config = {
  API_BASE_URL: 'http://192.168.1.26:52999/server',
  API_BASE_URL_V2: 'http://192.168.1.71:10101', // 服务器总路径
  API_BASE_URL_EDUMARKET: 'http://192.168.1.71:10301', // 门户 服务接口
  API_BASE_URL_PORTAL: 'http://192.168.1.71:10300', // 应用市场  服务  接口
  API_BASE_URL_AUTHENTICATION: 'http://192.168.1.71:10200', // 登陆接口
  // IMG_BASE_URL: 'http://fjdownload.nebedu.cn',
  IMG_BASE_URL: 'http://192.168.1.26:52999',
  BASE_TAB: 'http://localhost:8080',
  USER_COUNT: 'http://localhost:8080/static/operation-statistical/statistics/userStatistics.html', // 后台管理系统->运营统计->用户统计
  APP_COUNT: 'http://localhost:8080/static/operation-statistical/statistics/appStatistics.html', // 后台管理系统->运营统计->应用统计
  LOGOUT_URL: '',
  LOGIN_URL: 'http://127.0.0.1/cas/login'
}

export default Config
