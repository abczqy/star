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
import AppCount from 'pages/software-market/business-count/AppCount'
import UserCount from 'pages/software-market/business-count/UserCount'

export default {
  softwareMarketChildRoutes: [{
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
  }, {
    path: '/software-market-home/platform-manage/app-count',
    component: Logged(AppCount)
  }, {
    path: '/software-market-home/platform-manage/user-count',
    component: Logged(UserCount)
  }]
}
