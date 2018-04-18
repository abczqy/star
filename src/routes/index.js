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
import AllApplications from '../pages/edu-all-app/AllApplications'
import AllApplicationsDetail from '../pages/edu-all-app/AllApplicationsDetail'
import SelfSupport from '../pages/app-detail/SelfSupport'
import ThirdPartyAppDetail from '../pages/app-detail/ThirdPartyAppDetail'
import MyAppDetail from '../pages/app-detail/MyAppDetail'
import MyApp from '../pages/app-detail/MyApp'
import MessageTopBar from 'views/main-view/message-notice/MessageTopBar'
import MessageNotice from 'views/main-view/message-notice/MessageNotice'
import MessageSetting from 'views/main-view/message-notice/MessageSetting'
import MessageDetail from 'views/main-view/message-notice/MessageDetail'

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
  }, {
    path: '/operate-manage-home/all-app',
    component: AllApplications,
    childRoutes: [{
      path: '/operate-manage-home/all-app/all-app',
      component: AllApplicationsDetail
    }]
  }, {
    path: '/operate-manage-home/all-app-detail',
    component: SelfSupport
  }, {
    path: '/operate-manage-home/all-app-detail-third',
    component: ThirdPartyAppDetail
  }, {
    path: '/operate-manage-home/all-app-detail-mine',
    component: MyAppDetail
  }, {
    path: '/operate-manage-home/all-app-detail-mineabc',
    component: MyApp
  }]
}, {
  path: '/software-market-home', // 登陆后-软件市场入口
  component: SoftwareMarket
}, {
  path: '/topbar-manage', // 新消息通知页面
  component: MessageTopBar,
  childRoutes: [{
    path: '/topbar-manage/notice',
    component: MessageNotice
  }, {
    path: '/topbar-manage/setting',
    component: MessageSetting
  }, {
    path: '/topbar-manage/detail',
    component: MessageDetail
  }]
}]
