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
  templateDownload: AJAX_HOST + '/templateDownload'

}
