// const AJAX_HOST = 'http://172.16.36.159:20000/app/mock/21'// Rap地址
const AJAX_HOST = 'http://p1663488m8.imwork.net:49784'// 测试服务器地址

window.mungConfig = {
  // API_BASE_URL: 'http://172.16.36.159:20000/app/mock/21',
  API_BASE_URL: 'http://p1663488m8.imwork.net:49784', // 测试地址
  IMG_BASE_URL: 'http://p1663488m8.imwork.net:15206',
  BASE_TAB: 'http://localhost:8080',
  LOGIN_URL: '',
  USER_COUNT: 'http://localhost:8080/static/operation-statistical/statistics/userStatistics.html', // 后台管理系统->运营统计->用户统计
  APP_COUNT: 'http://localhost:8080/static/operation-statistical/statistics/appStatistics.html', // 后台管理系统->运营统计->应用统计
  /** *******************************软件市场************************************ */
  // 市场分析-表格
  MarketAnalysis: AJAX_HOST + '/getMarketAnalysisList',

  // 市场分析-词云图
  hotSearch: AJAX_HOST + '/hotSearch', // wyl 待修改

  // 个人中心-我的应用
  personalApps: AJAX_HOST + '/personal/apps',

  // 个人中心-我的收藏
  personalCollections: AJAX_HOST + '/personal/collections',

  // 个人中心-学生应用
  studentApps: AJAX_HOST + '/personal/student/app',

  // 个人中心-我的应用删除
  personalAppsDelete: AJAX_HOST + '/personal/apps/delete',

  // 个人中心-我的收藏删除
  personalCollectionsDelete: AJAX_HOST + '/personal/collections/delete',

  // 个人中心-学生应用删除
  studentAppsDelete: AJAX_HOST + '/personal/collections/delete', // wyl 待修改

  // 个人中心-学生应用收藏/取消收藏
  studentAppsCollect: AJAX_HOST + '/app/collect',

  // 厂商登录首页排行榜
  manufacturerSignInRankingList: AJAX_HOST + '/app/charts',
  // 首页老师推荐
  teacherRecommend: AJAX_HOST + '/app/teacherRecommendApp',
  // 首页热门推荐
  hotRecommend: AJAX_HOST + '/app/hotApp',
  // 全部应用 - 软件应用
  allAppList: AJAX_HOST + '/app/appList',
  // 全部应用 - 平台应用
  allAppPlatformList: AJAX_HOST + '/app/platform',

  // 应用详情（第三方）
  thirdPartyAppDetail: AJAX_HOST + '/app/details',
  // 应用详情 (自营)
  selfSupportAppDetail: AJAX_HOST + '/app/platform/details',
  // 我的应用-运营中
  myAppInOperation: AJAX_HOST + '/application/myapp',
  // 我的应用-审核中
  myAppToExamine: AJAX_HOST + '/application/myappexamine',
  // 我的应用-迭代审核
  myAppIteration: AJAX_HOST + '/application/myappiteratrionexamine',
  // 我的应用-审核和迭代中的撤销
  myAppRevoke: AJAX_HOST + '/application/examinecancel',

  // 统计分析-软件下载量变化
  softwareDownload: AJAX_HOST + '/getDownloadStatisticalAnalysisList',

  // 统计分析-应用类型占比
  softwareType: AJAX_HOST + '/getAppTypeStatisticalAnalysisList',

  // 统计分析-当月应用下载型占比
  softwareDownloadConst: AJAX_HOST + '/getAppTypeMonthStatisticalAnalysisList',

  // 统计分析-全部软件下拉列表
  getAllAppCode: AJAX_HOST + '/getAppStatisticalAnalysisList',

  // 首页收藏
  homeCollection: AJAX_HOST + '/app/collect',
  // 首页轮播图
  homeCarousel: AJAX_HOST + '/homepage/banner',
  // 全部应用-应用详情-相关应用
  relatedApplications: AJAX_HOST + '/personal/relatedApp',
  // 我的应用详情 - 开发相关
  developmentRelated: AJAX_HOST + '/personal/developer',
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
