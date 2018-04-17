const AJAX_HOST = 'http://172.16.36.159:20000/app/mock/21'
window.mungConfig = {
  API_BASE_URL: 'http://172.16.36.133:10000/cpc',
  LOGIN_URL: '',
  /** *******************************软件市场************************************ */
  // 市场分析-表格
  MarketAnalysis: AJAX_HOST + '/MarketAnalysis',
  // 市场分析-词云图
  hotSearch: AJAX_HOST + '/hotSearch',
  // 人员管理
  personnelManagement: AJAX_HOST + '/personnelManagement',
  // 人员管理-模板下载
  templateDownload: AJAX_HOST + '/templateDownload'

}
