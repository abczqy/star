// const AJAX_HOST = 'http://172.16.36.159:20000/app/mock/21'// Rap地址
const AJAX_HOST = 'http://p1663488m8.imwork.net:49784/server'// 测试服务器地址

window.mungConfig = {
  // API_BASE_URL: 'http://172.16.36.159:20000/app/mock/21',
  API_BASE_URL: 'http://p1663488m8.imwork.net:49784/server', // 测试地址
  IMG_BASE_URL: 'http://p1663488m8.imwork.net:15206',
  BASE_TAB: 'http://localhost:8080',
  LOGIN_URL: '',
  USER_COUNT: 'http://localhost:8080/static/operation-statistical/statistics/userStatistics.html', // 后台管理系统->运营统计->用户统计
  APP_COUNT: 'http://localhost:8080/static/operation-statistical/statistics/appStatistics.html', // 后台管理系统->运营统计->应用统计
  /** *******************************软件市场************************************ */

  // 门户首页-门户导航
  addGatewayNavigation: AJAX_HOST + '/addGatewayNavigation',
  // 门户导航-查询接口
  getGatewayNavigationList: AJAX_HOST + '/getGatewayNavigationList',
  // 门户导航-删除接口
  deleteGatewayNavigation: AJAX_HOST + '/deleteGatewayNavigation',
  // banner-新增接口
  addGatewayBanner: AJAX_HOST + '/addGatewayBanner',
  // banner-查询接口
  getGatewayBannerList: AJAX_HOST + '/getGatewayBannerList',
  // banner-删除接口
  deleteGatewayBanner: AJAX_HOST + '/deleteGatewayBanner'

}
