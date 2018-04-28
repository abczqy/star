// const AJAX_HOST = 'http://172.16.36.159:20000/app/mock/21'// Rap地址
const AJAX_HOST = 'http://p1663488m8.imwork.net:49784'// 测试服务器地址

window.mungConfig = {
  // API_BASE_URL: 'http://172.16.36.159:20000/app/mock/21',
  API_BASE_URL: 'http://p1663488m8.imwork.net:49784', // 测试地址
  BASE_TAB: 'http://localhost:8080',
  LOGIN_URL: '',
  /** *******************************软件市场************************************ */
  // 市场分析-表格
  MarketAnalysis: AJAX_HOST + '/getMarketAnalysisList',

  // 市场分析-词云图
  hotSearch: AJAX_HOST + '/hotSearch', // wyl 待修改

  // 人员管理-教师管理列表
  teacherManagement: AJAX_HOST + '/personnelManagement',

  // 人员管理- 教师编辑
  teacherUpdate: AJAX_HOST + '/manage/teacher/update',
  // 人员管理 -删除教师
  teacherDelete: AJAX_HOST + '/manage/teacher/delete',

  // 人员管理-学生管理列表
  studentManagement: AJAX_HOST + '/studentManagement',

  // 人员管理-模板下载
  templateDownload: AJAX_HOST + '/templateDownload',

  // 人员管理-批量导入
  batchImport: AJAX_HOST + '',

  // 运营管理/软件管理-运营中
  Business: AJAX_HOST + '/management/applistm',

  // 运营管理/软件管理-迭代审核列表
  iterVerify: AJAX_HOST + '/management/iterationexaminelistm',

  // 运营管理/软件管理-待审核列表
  waitVerify: AJAX_HOST + '/management/examinelistm',

  // 运营管理/软件管理-迭代审核、待审核详情
  verityDetail: AJAX_HOST + '/management/appdetail',

  // 运营管理/会员管理-厂商
  getFactory: AJAX_HOST + '/factoryManage/getFactory',

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
  // 教育新闻列表
  newsList: AJAX_HOST + '/application/newslist',
  // 教育新闻列表详情
  newsListDet: AJAX_HOST + '/application/newdetial',
  // 信息公开列表
  information: AJAX_HOST + '/application/infolist',
  // 信息公开列表详情
  informationDet: AJAX_HOST + '/application/infodetail',

  // 教育局信息公开列表编辑获取列表
  informationEdList: AJAX_HOST + '/manage/getPublicInfo',
  // 教育局信息公开列表编辑新增
  informationEdListAdd: AJAX_HOST + '/manage/addPublicInfo',
  // 教育局信息公开列表编辑编辑
  informationEdListEdit: AJAX_HOST + '/manage/editPublicInfo',
  // 教育局信息公开列表编辑删除
  informationEdListDelete: AJAX_HOST + '/manage/deleteEduMsgList?InfoId="7"',
  // 分享列表接口
  detList: AJAX_HOST + '/application/detList', // 现在公告和详情页分享列表用的是这个
  // 上传文件接口
  Upload: AJAX_HOST + '/upload',
  // 迭代申请接口
  iteration: AJAX_HOST + '/updateSoft/querySw',
  // 申请上架接口
  shelf: AJAX_HOST + '/uploadSw/upload',
  // 用appId获取app数据接口
  appId: AJAX_HOST + '/app/details',

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
