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
import {Logged} from 'components/common/hoc/Logged'
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
import ForgetPass from '../pages/register/ForgetPass'

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
  component: Logged(OperateManage),
  childRoutes: [{
    path: '/operate-manage-home/home',
    component: Logged(TeacherHome)
  }, {
    path: '/operate-manage-home/edu',
    component: Logged(NewsListEd)
  }, {
    path: '/operate-manage-home/NewDetailsEd',
    component: Logged(NewDetailsEd)
  }, {
    path: '/operate-manage-home/public',
    component: Logged(PlaceInformation)
  }, {
    path: '/operate-manage-home/informationDetEd',
    component: Logged(InformationDetEd)
  }, {
    path: '/operate-manage-home/informationEd',
    component: Logged(InformationEd)
  }, {
    path: '/operate-manage-home/please', // 上架
    component: Logged(Please)
  }, {
    path: '/operate-manage-home/iteration', // 迭代
    component: Logged(Iteration)
  }, {
    path: '/operate-manage-home/member',
    component: Logged(PersonnelManagement)
  }, {
    path: '/operate-manage-home/informationDet',
    component: Logged(InformationDet)
  }, {
    path: '/operate-manage-home/public/policy',
    component: Logged(Policy)
  }, {
    path: '/operate-manage-home/center',
    component: Logged(PersonalCenter)
  }, {
    path: '/operate-manage-home/statis',
    component: Logged(StatisticalAnalysis)
  }, {
    path: '/operate-manage-home/market',
    component: Logged(MarketAnalysis)
  }, {
    path: '/operate-manage-home/all-app',
    component: Logged(AllApplications),
    childRoutes: [{
      path: '/operate-manage-home/all-app/all-app',
      component: Logged(AllApplicationsDetail)
    }]
  }, {
    path: '/operate-manage-home/all-app-detail',
    component: Logged(SelfSupport)
  }, {
    path: '/operate-manage-home/all-app-detail-third',
    component: Logged(ThirdPartyAppDetail)
  }, {
    path: '/operate-manage-home/all-app-detail-mine',
    component: Logged(MyApp)
  }, {
    path: '/operate-manage-home/all-app-detail-mineabc',
    component: Logged(MyAppDetail)
  }]
}, {
  path: '/software-market-home', // 登陆后-软件市场入口
  component: Logged(SoftwareMarket),
  childRoutes: [{
    path: '/software-market-home/software-manage/businessing',
    component: Logged(Businessing)
  }, {
    path: '/software-market-home/software-manage/iteration-verify',
    component: Logged(IterationVerify)
  }, {
    path: '/software-market-home/software-manage/wait-verify',
    component: Logged(WaitVerify)
  }, {
    path: '/software-market-home/member-manage/educational-services',
    component: Logged(EducationalServices)
  }, {
    path: '/software-market-home/member-manage/manufacturer',
    component: Logged(Manufacturer)
  }, {
    path: '/software-market-home/member-manage/parent',
    component: Logged(Parent)
  }, {
    path: '/software-market-home/member-manage/school',
    component: Logged(School)
  }, {
    path: '/software-market-home/member-manage/student',
    component: Logged(Student)
  }, {
    path: '/software-market-home/member-manage/teacher',
    component: Logged(Teacher)
  }, {
    path: '/software-market-home/platform-manage/news-list',
    component: Logged(NewsListManage)
  }, {
    path: '/software-market-home/platform-manage/plat-homepage',
    component: Logged(PlatHomepage)
  }, {
    path: '/software-market-home/platform-manage/porttal-homepage',
    component: Logged(PortalHomepage)
  }, {
    path: '/software-market-home/platform-manage/public-info',
    component: Logged(PublicInfo)
  }, {
    path: '/software-market-home/platform-manage/public-info-verify',
    component: Logged(PublicInfoVerify)
  }, {
    path: '/software-market-home/platform-manage/news-list-add',
    component: Logged(NewsListAdd)
  }, {
    path: '/software-market-home/platform-manage/news-list-edit',
    component: Logged(NewsListEdit)
  }, {
    path: '/software-market-home/platform-manage/public-info-add',
    component: Logged(PublicInfoAdd)
  }, {
    path: '/software-market-home/platform-manage/public-info-edit',
    component: Logged(PublicInfoEdit)
  }, {
    path: '/software-market-home/platform-manage/public-verify-detail',
    component: Logged(PublicInfoVerifyDetail)
  }]
}, {
  path: '/topbar-manage', // 新消息通知页面
  component: Logged(MessageTopBar),
  childRoutes: [{
    path: '/topbar-manage/notice',
    component: Logged(MessageNotice)
  }, {
    path: '/topbar-manage/setting',
    component: Logged(MessageSetting)
  }, {
    path: '/topbar-manage/detail',
    component: Logged(MessageDetail)
  }]
}, {
  path: '/register-home',
  component: Register
}, {
  path: '/forget-home',
  component: ForgetPass
}]
