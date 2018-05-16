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

  // 分享列表接口
  detList: AJAX_HOST + '/application/detList', // 现在公告和详情页分享列表用的是这个

  /** *******************************注册************************************ */
  registerValitemail: AJAX_HOST + '/register/vailEmail', // 校验邮箱是否被占用
  register: AJAX_HOST + '/register/registermaf', // 注册按钮
  /* 账号设置 */
  // 家长注册接口-查询与家长绑定的学生
  relationQueryStu: AJAX_HOST + '/addRelation/queryStu',
  // 家长注册接口-与学生绑定
  relationAdd: AJAX_HOST + '/addRelation/add',
  // 家长注册接口-查询与家长绑定的学生
  relationdelete: AJAX_HOST + '/addRelation/delete',
  // 登出
  sessionLogout: AJAX_HOST + '/session/logout',
  // 消息通知列表
  getAllMessageList: AJAX_HOST + '/getAllMessageList',
  // 未读消息数
  getMessageCount: AJAX_HOST + '/getUnreadMessageCount',
  // 消息通知列表详情
  getMessageListDetail: AJAX_HOST + '/getMessageDetail',
  // 账号设置-密码修改
  updateUserPassword: AJAX_HOST + '/control/updateUserPassword',
  // 账号设置-手机验证
  updatePhoneNum: AJAX_HOST + '/updatePhoneNum',
  // 忘记密码
  forgetThePassword: AJAX_HOST + '/control/updateUserPassword',
  // 获取短信验证码
  SMSVerification: AJAX_HOST + '/SMSVerification',

  // 统计分析-软件下载量变化
  softwareDownload: AJAX_HOST + '/getDownloadStatisticalAnalysisList',

  // 统计分析-应用类型占比
  softwareType: AJAX_HOST + '/getAppTypeStatisticalAnalysisList',

  // 统计分析-当月应用下载型占比
  softwareDownloadConst: AJAX_HOST + '/getAppTypeMonthStatisticalAnalysisList',

  // 统计分析-全部软件下拉列表
  getAllAppCode: AJAX_HOST + '/getAppStatisticalAnalysisList',

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
