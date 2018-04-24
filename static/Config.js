const AJAX_HOST = 'http://172.16.36.159:20000/app/mock/21'
window.mungConfig = {
  API_BASE_URL: 'http://172.16.36.159:20000/app/mock/21',
  // API_BASE_URL: 'http://p1663488m8.imwork.net:49784/', // 测试地址
  BASE_TAB: 'http://localhost:8080',
  LOGIN_URL: '',
  /** *******************************软件市场************************************ */
  // 市场分析-表格
  MarketAnalysis: AJAX_HOST + '/MarketAnalysis',

  // 市场分析-词云图
  hotSearch: AJAX_HOST + '/hotSearch',

  // 人员管理-教师管理列表
  teacherManagement: AJAX_HOST + '/personnelManagement',

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

  // 运营管理/会员管理-厂商
  getFactory: AJAX_HOST + '/factoryManage/getFactory',

  // 个人中心-我的应用
  personalApps: AJAX_HOST + '/personal/apps',

  // 个人中心-我的收藏
  personalCollections: AJAX_HOST + '/personal/collections',

  // 个人中心-我的应用删除
  personalAppsDelete: AJAX_HOST + '/personal/apps/delete',

  // 个人中心-我的收藏删除
  personalCollectionsDelete: AJAX_HOST + '/personal/collections/delete',
  // 厂商登录首页排行榜
  manufacturerSignInRankingList: AJAX_HOST + '/app/charts',
  // 全部应用
  allAppList: AJAX_HOST + '/app/appList',

  // 教育新闻列表
  newsList: AJAX_HOST + '/applicaion/newslist',
  // 教育新闻列表详情
  newsListDet: AJAX_HOST + '/applicaion/newsdetailget',
  // 信息公开列表
  information: AJAX_HOST + '/applicaion/infolist',
  // 信息公开列表详情
  informationDet: AJAX_HOST + '/applicaion/infodetail',

  // 教育局信息公开列表编辑
  informationEdList: AJAX_HOST + '/applicaion/InfoListEd',
  // 教育局信息公开列表编辑新增
  informationEdListAdd: AJAX_HOST + '/applicaion/InfoListEdAdd',
  // 教育局信息公开列表编辑编辑
  informationEdListEdit: AJAX_HOST + '/applicaion/InfoListEdEdit',
  // 教育局信息公开列表编辑删除
  informationEdListDelete: AJAX_HOST + '/applicaion/InfoListEdDelete',
  // 分享列表接口
  detList: AJAX_HOST + '/applicaion/detList',
  // 上传文件接口
  Upload: AJAX_HOST + '/upload',
  // 迭代申请接口
  iteration: AJAX_HOST + '/applicaion/iteration',
  // 申请上架接口
  shelf: AJAX_HOST + '/applicaion/shelf',
  // 用appId获取app数据接口
  appId: AJAX_HOST + '/applicaion/appId',

  /** *******************************注册************************************ */
  registerValitemail: AJAX_HOST + '/register/vailEmail', // 校验邮箱是否被占用
  register: AJAX_HOST + '/register/registermaf', // 注册按钮
  /* 账号设置 */
  relationQueryStu: AJAX_HOST + '/addRelation/queryStu', // 家长注册接口-查询与家长绑定的学生
  relationAdd: AJAX_HOST + '/addRelation/add', // 接口名称:	家长注册接口-与学生绑定
  relationdelete: AJAX_HOST + '/addRelation/delete', // 家长注册接口-查询与家长绑定的学生

  sessionLogout: AJAX_HOST + '/session/logout', // 登出
  getMessageList: AJAX_HOST + '/getMessageList', // 消息通知列表
  getMessageListDetail: AJAX_HOST + '/getMessageList/detail', // 消息通知列表详情
  // 应用详情（第三方）
  thirdPartyAppDetail: AJAX_HOST + '/app/details',
  // 我的应用-运营中
  myAppInOperation: AJAX_HOST + '/applicaion/myapp',
  // 我的应用-审核中
  myAppToExamine: AJAX_HOST + '/applicaion/myappexamine',
  // 我的应用-迭代审核
  myAppIteration: AJAX_HOST + '/applicaion/myappiteratrionexaminesearch',
  // 我的应用-审核和迭代中的撤销
  myAppRevoke: AJAX_HOST + '/applicaion/examinecancel'
}
