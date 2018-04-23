const AJAX_HOST = 'http://172.16.36.159:20000/app/mock/21'
window.mungConfig = {
  API_BASE_URL: 'http://172.16.36.159:20000/app/mock/21',
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
  Business: AJAX_HOST + '/Business',

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
  newsList: AJAX_HOST + '/applicaion/newslistget',
  // 教育新闻列表详情
  newsListDet: AJAX_HOST + '/applicaion/newsdetailget',
  // 信息公开列表
  information: AJAX_HOST + '/applicaion/InfoListGet',
  // 信息公开列表详情
  informationDet: AJAX_HOST + '/applicaion/InfoDetialGet',
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

  /** *******************************注册************************************ */
  registerValitemail: AJAX_HOST + '/register/vailEmail', // 校验邮箱是否被占用
  register: AJAX_HOST + '/register/registermaf' // 注册按钮

}
