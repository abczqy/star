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

  // 运营管理/软件管理-运营中
  Business: AJAX_HOST + '/Business',

  // 运营管理/会员管理-厂商
  getFactory: AJAX_HOST + '/factoryManage/getFactory',
  // 个人中心-我的应用
  personalApps: AJAX_HOST + '/personal/apps',
  // 个人中心-我的收藏
  personalCollections: AJAX_HOST + '/personal/collections',
  // 教育新闻列表
  newsList: AJAX_HOST + '/applicaion/newslistget',
  // 教育新闻列表详情
  newsListDet: AJAX_HOST + '/applicaion/newsdetailget',
  // 信息公开列表
  information: AJAX_HOST + '/applicaion/InfoListGet',
  // 信息公开列表详情
  informationDet: AJAX_HOST + '/applicaion/InfoDetialGet'
}
