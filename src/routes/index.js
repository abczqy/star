// import Imported from 'react-imported-component'
import MainView from 'views/main-view/MainView'
import OperateManage from 'views/main-view/OperateManage'
import SoftwareMarket from 'views/main-view/SoftwareMarket'

export default [{
  path: '/',
  component: MainView,
  childRoutes: [{
    path: '/operate-manage',
    component: OperateManage
  },
  {
    path: '/software-market',
    component: SoftwareMarket
  }]
}]
