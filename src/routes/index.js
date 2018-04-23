// import Imported from 'react-imported-component'
import LoginHome from 'views/main-view/LoginHome'
import OperateManage from 'views/main-view/OperateManage'
import SoftwareMarket from 'views/main-view/SoftwareMarket'
import Home from 'pages/login-home/Home'

import Information from 'pages/news/Information'// 游客的信息公开
import InformationDet from 'pages/news/InformationDet'// 游客的信息公开详情
import NewsList from 'pages/news/NewsList'// 游客的新闻列表
import NewsDetails from 'pages/news/NewsDetails'// 游客的新闻列表详情

import NewsListEd from 'pages/news/NewsListEd'// 教育局的新闻列表
import NewDetailsEd from 'pages/news/NewDetailsEd'// 教育局的新闻列表详情
import PlaceInformation from 'pages/news/PlaceInformation'// 教育局的信息公开
import InformationDetEd from 'pages/news/InformationDetEd'// 教育局的信息公开详情
import InformationEd from 'pages/news/InformationEd'// 教育局的信息列表编辑
import Policy from 'pages/news/Policy'// 页面式的政策发布
import Please from 'pages/news/ShelfPlease'// 上架流程
import Iteration from 'pages/news/IterationPlease'// 迭代申请

import {
  PortalHomepage,
  PlatHomepage,
  NewsList as NewsListManage,
  PublicInfo,
  PublicInfoVerify,
  Businessing,
  IterationVerify,
  WaitVerify,
  EducationalServices,
  Manufacturer,
  Parent,
  School,
  Student,
  Teacher,
  NewsListAdd,
  NewsListEdit,
  PublicInfoAdd,
  PublicInfoEdit,
  PublicInfoVerifyDetail
} from 'pages/software-market'

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

import TeacherHome from '../pages/after-logging-home/TeacherHome'

import Register from '../pages/register/Register'
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
    path: '/unlogged/newsDetails',
    component: NewsDetails
  }, {
    path: '/unlogged/information',
    component: Information
  }, {
    path: '/unlogged/informationDet',
    component: InformationDet
  }]
}, {
  path: '/operate-manage-home', // 登陆后-运营管理入口
  component: OperateManage,
  childRoutes: [{
    path: '/operate-manage-home/home',
    component: TeacherHome
  }, {
    path: '/operate-manage-home/edu',
    component: NewsListEd
  }, {
    path: '/operate-manage-home/NewDetailsEd',
    component: NewDetailsEd
  }, {
    path: '/operate-manage-home/public',
    component: PlaceInformation
  }, {
    path: '/operate-manage-home/informationDetEd',
    component: InformationDetEd
  }, {
    path: '/operate-manage-home/informationEd',
    component: InformationEd
  }, {
    path: '/operate-manage-home/please', // 上架
    component: Please
  }, {
    path: '/operate-manage-home/iteration', // 迭代
    component: Iteration
  }, {
    path: '/operate-manage-home/member',
    component: PersonnelManagement
  }, {
    path: '/operate-manage-home/informationDet',
    component: InformationDet
  }, {
    path: '/operate-manage-home/public/policy',
    component: Policy
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
    component: MyApp
  }, {
    path: '/operate-manage-home/all-app-detail-mineabc',
    component: MyAppDetail
  }]
}, {
  path: '/software-market-home', // 登陆后-软件市场入口
  component: SoftwareMarket,
  childRoutes: [{
    path: '/software-market-home/software-manage/businessing',
    component: Businessing
  }, {
    path: '/software-market-home/software-manage/iteration-verify',
    component: IterationVerify
  }, {
    path: '/software-market-home/software-manage/wait-verify',
    component: WaitVerify
  }, {
    path: '/software-market-home/member-manage/educational-services',
    component: EducationalServices
  }, {
    path: '/software-market-home/member-manage/manufacturer',
    component: Manufacturer
  }, {
    path: '/software-market-home/member-manage/parent',
    component: Parent
  }, {
    path: '/software-market-home/member-manage/school',
    component: School
  }, {
    path: '/software-market-home/member-manage/student',
    component: Student
  }, {
    path: '/software-market-home/member-manage/teacher',
    component: Teacher
  }, {
    path: '/software-market-home/platform-manage/news-list',
    component: NewsListManage
  }, {
    path: '/software-market-home/platform-manage/plat-homepage',
    component: PlatHomepage
  }, {
    path: '/software-market-home/platform-manage/porttal-homepage',
    component: PortalHomepage
  }, {
    path: '/software-market-home/platform-manage/public-info',
    component: PublicInfo
  }, {
    path: '/software-market-home/platform-manage/public-info-verify',
    component: PublicInfoVerify
  }, {
    path: '/software-market-home/platform-manage/news-list-add',
    component: NewsListAdd
  }, {
    path: '/software-market-home/platform-manage/news-list-edit',
    component: NewsListEdit
  }, {
    path: '/software-market-home/platform-manage/public-info-add',
    component: PublicInfoAdd
  }, {
    path: '/software-market-home/platform-manage/public-info-edit',
    component: PublicInfoEdit
  }, {
    path: '/software-market-home/platform-manage/public-verify-detail',
    component: PublicInfoVerifyDetail
  }]
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
}, {
  path: '/register-home', // 登陆后-软件市场入口
  component: Register
}]
