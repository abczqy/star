
const Config = {
  API_BASE_URL: 'http://p1663488m8.imwork.net:49784',
  IMG_BASE_URL: 'http://p1663488m8.imwork.net:15206',
  BASE_TAB: 'http://localhost:8080',
  USER_COUNT: 'http://localhost:8080/static/operation-statistical/statistics/userStatistics.html', // 后台管理系统->运营统计->用户统计
  APP_COUNT: 'http://localhost:8080/static/operation-statistical/statistics/appStatistics.html', // 后台管理系统->运营统计->应用统计
  LOGOUT_URL: '',
  LOGIN_URL: 'http://127.0.0.1/cas/login'
}

if (window && window.mungConfig) {
  Object.assign(Config, window.mungConfig)
}

export default Config
