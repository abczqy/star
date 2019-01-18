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
  PublicInfoVerifyDetail,
  Analysis // v2 - 运营分析
} from 'pages/software-market'
import {
  Reject,
  Remove
} from '../pages/software-market/software-manage'
import {
  Home
} from 'pages/work-plat'
import {
  PerHome
} from 'pages/work-plat/per-center'
import {
  BaseInfo
} from '../pages/work-plat/per-center/base-info'
import {
  OrderManage
} from '../pages/work-plat/per-center/order-manage'
import {
  LoginSet
} from '../pages/work-plat/per-center/login-set'
import {
  AddrManage
} from '../pages/work-plat/per-center/addr-manage'
import {
  InvoiceManage
} from '../pages/work-plat/per-center/invoice-manage'
import {
  FundManage
} from '../pages/work-plat/per-center/fund-manage'
import UserManage from '../pages/work-plat/home/user-manage/UserManage'
import UserManageDetail from '../pages/work-plat/home/user-manage/UserManageDetail'
import DownHistory from '../pages/work-plat/home/down-history/DownHistory'
import {
  ChildBind
} from '../pages/work-plat/per-center/child-bind'
import {
  PlatManage
} from '../pages/software-market/soft-market-manage'
import {Logged} from 'components/common/hoc/Logged'
import AppCount from 'pages/software-market/business-count/AppCount'
import UserCount from 'pages/software-market/business-count/UserCount'
import Tourist from 'pages/software-market/member-manage/tourist/Tourist'
import Messages from 'pages/software-market/software-manage/messages/Messages'

export default {
  workPlat: [{
    path: '/operate-manage-home/work-plat/home',
    component: Logged(Home)
  }, {
    path: '/operate-manage-home/work-plat/per-center',
    component: Logged(PerHome),
    childRoutes: [{
      path: '/operate-manage-home/work-plat/per-center/base-info',
      component: Logged(BaseInfo)
    }, {
      path: '/operate-manage-home/work-plat/per-center/order-manage',
      component: Logged(OrderManage)
    }, {
      path: '/operate-manage-home/work-plat/per-center/login-set',
      component: Logged(LoginSet)
    }, {
      path: '/operate-manage-home/work-plat/per-center/addr-manage',
      component: Logged(AddrManage)
    }, {
      path: '/operate-manage-home/work-plat/per-center/invoice-manage',
      component: Logged(InvoiceManage)
    }, {
      path: '/operate-manage-home/work-plat/per-center/fund-manage',
      component: Logged(FundManage)
    }, {
      path: '/operate-manage-home/work-plat/per-center/child-bind',
      component: Logged(ChildBind)
    }]
  }, {
    path: '/operate-manage-home/work-plat/user-manage',
    component: Logged(UserManage)
  }, {
    path: '/operate-manage-home/work-plat/user-manage-detail',
    component: Logged(UserManageDetail)
  }, {
    path: '/operate-manage-home/work-plat/down-history',
    component: Logged(DownHistory)
  }],
  softwareMarketChildRoutes: [{
    path: '/software-market-home/software-manage/analysis',
    component: Logged(Analysis)
  }, {
    path: '/software-market-home/software-manage/reject',
    component: Logged(Reject)
  }, {
    path: '/software-market-home/software-manage/remove',
    component: Logged(Remove)
  }, {
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
    path: '/software-market-home/member-manage/tourist',
    component: Logged(Tourist)
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
  }, {
    path: '/software-market-home/soft-market-manage/plat-manage',
    component: Logged(PlatManage)
  }, {
    path: '/software-market-home/software-manage/messages',
    component: Logged(Messages)
  }]
}
