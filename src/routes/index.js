// import Imported from 'react-imported-component'
import LoginHome from 'views/main-view/LoginHome'
import OperateManage from 'views/main-view/OperateManage'
import SoftwareMarket from 'views/main-view/SoftwareMarket'
import Home from 'pages/login-home/Home'
import Information from 'pages/news/information'
import NewsList from 'pages/news/newsList'
import PersonnelManagement from 'pages/personnel-management/PersonnelManagement'
import PersonalCenter from 'pages/personal-center/PersonalCenter'
import StatisticalAnalysis from 'pages/statistical-analysis/StatisticalAnalysis'
import MarketAnalysis from 'pages/market-analysis/MarketAnalysis'

export default [{
  path: '/unlogged',
  component: LoginHome,
  childRoutes: [{
    path: '/unlogged/home',
    component: Home
  }, {
    path: '/unlogged/newsList',
    component: NewsList
  }, {
    path: '/unlogged/information',
    component: Information
  }]
}, {
  path: '/operate-manage-home', // 登陆后-运营管理入口
  component: OperateManage,
  childRoutes: [{
    path: '/operate-manage-home/home',
    component: Home
  }, {
    path: '/operate-manage-home/edu',
    component: Home
  }, {
    path: '/operate-manage-home/public',
    component: Home
  }, {
    path: '/operate-manage-home/member',
    component: PersonnelManagement
  }, {
    path: '/operate-manage-home/center',
    component: PersonalCenter
  }, {
    path: '/operate-manage-home/statis',
    component: StatisticalAnalysis
  }, {
    path: '/operate-manage-home/market',
    component: MarketAnalysis
  }]
}, {
  path: '/software-market-home', // 登陆后-软件市场入口
  component: SoftwareMarket
}]
