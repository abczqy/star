// import Imported from 'react-imported-component'
import MainView from 'views/main-view/MainView'
import LoginHome from 'views/main-view/LoginHome'
import OperateManage from 'views/main-view/OperateManage'
import SoftwareMarket from 'views/main-view/SoftwareMarket'

export default [{
  path: '/',
  component: MainView,
  childRoutes: [{
    path: '/login-home', // 游客对应的首页
    component: LoginHome
  }, {
    path: '/operate-manage-home', // 登陆后-运营管理入口
    component: OperateManage
  },
  {
    path: '/software-market-home', // 登陆后-软件市场入口
    component: SoftwareMarket
  }]
}]
