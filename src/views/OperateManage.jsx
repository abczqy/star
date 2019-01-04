/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 有身份登陆进来的首页
 * 运营管理入口
 */
import React from 'react'
import {Layout, Icon, Badge, Row, message} from 'antd'
import { renderRoutes } from 'react-router-config'
import BottomHeader from '../components/common/BottomHeader'
import SignOut from './SignOut'
// import GlobalSearch from '../pages/after-logging-home/GlobalSearch'
import {getMessageCount} from '../services/topbar-mation/index'
import {Logged} from 'components/common/hoc/Logged'
import './Operateview.scss'
import { withRouter, Route } from 'react-router'
import webStorage from 'webStorage'
import _ from 'lodash'
import AllApplications from 'pages/edu-all-app/AllApplications'
import TeacherHome from 'pages/after-logging-home/TeacherHome'
import Please from 'pages/news/ShelfPlease'// 上架流程
import Iteration from 'pages/news/IterationPlease'// 迭代申请
import PersonnelManagement from 'pages/personnel-management/PersonnelManagement'
import PersonalCenter from 'pages/personal-center/PersonalCenter'
import StatisticalAnalysis from 'pages/statistical-analysis/StatisticalAnalysis'
import MarketAnalysis from 'pages/market-analysis/MarketAnalysis'
import MyAppDetail from 'pages/app-detail/MyAppDetail'
import SelfSupport from 'pages/app-detail/SelfSupport'
import ThirdPartyAppDetail from 'pages/app-detail/ThirdPartyAppDetail'
// import SelfPleasePreview from 'pages/app-detail/SelfPleasePreview'
import MyApp from 'pages/app-detail/MyApp'
import routes from '../routes'

let LAllApplications = Logged(AllApplications)
let LTeacherHome = Logged(TeacherHome)
let LPlease = Logged(Please)
let LIteration = Logged(Iteration)
let LPersonnelManagement = Logged(PersonnelManagement)
let LPersonalCenter = Logged(PersonalCenter)
let LStatisticalAnalysis = Logged(StatisticalAnalysis)
let LMarketAnalysis = Logged(MarketAnalysis)

let LMyAppDetail = Logged(MyAppDetail)
let LSelfSupport = Logged(SelfSupport)
let LThirdPartyAppDetail = Logged(ThirdPartyAppDetail)
// let LSelfPleasePreview = Logged(SelfPleasePreview)
let LMyApp = Logged(MyApp)

class OperateManage extends React.Component {
  constructor (props) {
    super(props)
    let pathName = this.props.location.pathname
    this.state = {
      activeTab: this.getDefaultTabKey(pathName),
      signOutVisible: false, // 退出系统
      messageCount: '0'
    }
  }

  getDefaultTabKey (pathName) {
    let activeTab
    switch (pathName) {
      case '/operate-manage-home/home':// 首页
        activeTab = 'home'
        break
      case '/operate-manage-home/all-app/all-app':// 全部应用
        activeTab = 'allApp'
        break
      case '/operate-manage-home/all-app-detail':// 应用详情
        activeTab = 'allApp'
        break
      case '/operate-manage-home/all-app-detail-third':
        activeTab = 'allApp'
        break
      // case '/operate-manage-home/all-app-selfplsprv':
      //   activeTab = 'allApp'
      //   break
      case '/operate-manage-home/please':
        activeTab = 'allApp'
        break
      case '/operate-manage-home/iteration':
        activeTab = 'allApp'
        break
      case '/operate-manage-home/all-app':
        activeTab = 'allApp'
        break
      case '/operate-manage-home/center':// 个人中心
        activeTab = 'peopleCenter'
        break
      case '/operate-manage-home/member':// 人员管理
        activeTab = 'peopleMang'
        break
      // case '/operate-manage-home/all-app-detail-mine':// 我的应用
      //   activeTab = 'myApp'
      //   break
      case '/operate-manage-home/statis':// 统计分析
        activeTab = 'statisAnaly'
        break
      case '/operate-manage-home/market':// 市场分析
        activeTab = 'marketAnaly'
        break
      default:
        activeTab = 'home'
    }
    return activeTab
  }

  componentWillReceiveProps (nextProps) {
    // 如果下一个路由是首页   新闻列表    信息公开里其中的某一个  则需要切换选中样式
    if (_.indexOf(['/', '/home/newsList', '/home/information'], nextProps.location.pathname) !== -1) {
      this.setState({
        activeTab: this.getDefaultTabKey(nextProps.location.pathname)
      })
    }
  }
  componentDidMount () {
    this.getMessageCo()
  }
  // 未读消息数
  getMessageCo=() => {
    getMessageCount({}, (response) => {
      if (response.data.code === 200) {
        webStorage.setItem('Unread_Message', response.data.data)
        this.setState({
          messageCount: response.data.data
        })
      } else {
        message.warn(response.data.msg)
      }
    })
  }
  handleTabChange (link, tabKey) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    } else {
      if (tabKey) {
        this.setState({
          activeTab: tabKey
        })
      }
      this.props.history.push({
        pathname: link
      })
    }
  }
  // 跳转到个人中心
  handlePerson (link) {
    let per = webStorage.getItem('STAR_WEB_ROLE_CODE')
    if (per !== 'operator' && per !== 'vendor') {
      this.handleTabChange(link)
    }
  }
  // 退出系统
  signOut=() => {
    this.setState({
      signOutVisible: true
    })
  }
  hiddenModal (type) {
    this.setState({
      [type]: false
    })
  }
  getTabArr () {
    let STAR_WEB_ROLE_CODE = webStorage.getItem('STAR_WEB_ROLE_CODE')
    let roleCode = STAR_WEB_ROLE_CODE || ''
    let baseTabArr = [{
      text: '首页',
      tabKey: 'home',
      src: '/operate-manage-home/home'
    }, {
      text: '全部应用',
      tabKey: 'allApp',
      src: '/operate-manage-home/all-app/all-app'
    // }, {
    //   text: '个人中心',
    //   tabKey: 'peopleCenter',
    //   src: '/operate-manage-home/center'
    }, {
      text: '工作台', // 工作台首页
      tabKey: 'workPlat',
      src: '/operate-manage-home/work-plat/home'
    }]
    if (roleCode === 'parents') { // 家长
      return baseTabArr
    } else if (roleCode === 'students') { // 学生
      return baseTabArr
    } else if (roleCode === 'teacher') { // 教师
      return baseTabArr
    } else if (roleCode === 'school') { // 学校
      return [{
        text: '首页',
        tabKey: 'home',
        src: '/operate-manage-home/home'
      }, {
        text: '全部应用',
        tabKey: 'allApp',
        src: '/operate-manage-home/all-app/all-app'
      }, {
      //   text: '人员管理',
      //   tabKey: 'peopleMang',
      //   src: '/operate-manage-home/member'
      // }, {
      //   text: '个人中心',
      //   tabKey: 'peopleCenter',
      //   src: '/operate-manage-home/center'
      // }, {
        text: '工作台', // 工作台首页
        tabKey: 'workPlat',
        src: '/operate-manage-home/work-plat/home'
      }]
    } else if (roleCode === 'vendor') { // 厂商
      return [{
        text: '首页',
        tabKey: 'home',
        src: '/operate-manage-home/home'
      }, {
        text: '全部应用',
        tabKey: 'allApp',
        src: '/operate-manage-home/all-app/all-app'
      },
      // {
      //   text: '我的应用',
      //   tabKey: 'myApp',
      //   src: '/operate-manage-home/all-app-detail-mine'
      // },
      {
        text: '统计分析',
        tabKey: 'statisAnaly',
        src: '/operate-manage-home/statis'
      }, {
        text: '市场分析',
        tabKey: 'marketAnaly',
        src: '/operate-manage-home/market'
      }, {
        text: '工作台', // 工作台首页
        tabKey: 'workPlat',
        src: '/operate-manage-home/work-plat/home'
      }]
    } else if (roleCode === 'eduBureau') { // 教育局
      return [{
        text: '首页',
        tabKey: 'home',
        src: '/operate-manage-home/home'
      }, {
        text: '全部应用',
        tabKey: 'allApp',
        src: '/operate-manage-home/all-app/all-app'
      }, {
      //   text: '个人中心',
      //   tabKey: 'peopleCenter',
      //   src: '/operate-manage-home/center'
      // }, {
        text: '工作台', // 工作台首页
        tabKey: 'workPlat',
        src: '/operate-manage-home/work-plat/home'
      }]
    }
  }

  changeActiveTab (activeTab) {
    this.setState({
      activeTab
    })
  }

  /**
   * 点击logo回到门户首页
   */
  handleLogoClick () {
    this.props.history.push({
      pathname: '/'
    })
  }

  render () {
    let tabArr = this.getTabArr() || []
    return (
      <div className='xingyun'>
        <Layout>
          <div style={{height: '30px'}}>
            <div style={{marginLeft: '10%', float: 'left', lineHeight: '30px'}}>欢迎您 ,
              {/* <span onClick={this.handlePerson.bind(this, '/operate-manage-home/center')}> { webStorage.getItem('STAR_WEB_PERSON_INFO') ? (webStorage.getItem('STAR_WEB_PERSON_INFO').userName || '游客') : '游客'}</span> */}
              <span>{ webStorage.getItem('STAR_WEB_PERSON_INFO')
                ? (webStorage.getItem('STAR_WEB_PERSON_INFO').userName || '游客')
                : '游客'}</span>
              {webStorage.getItem('STAR_WEB_ROLE_CODE') === 'teacher' ? '老师' : ''}
            </div>
            <div style={{height: '30px', float: 'right', marginRight: '10%', 'lineHeight': '32px'}} className='header-bar-icon'>
              <Badge count={this.state.messageCount} >
                <Icon type='mail' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/notice')} />
              </Badge>
              {/* <Icon type='setting' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/setting')} /> */}
              <Icon type='poweroff' style={{ fontSize: 16 }} onClick={this.signOut} />
            </div>
          </div>
          <div className='xingyun-header'>
            <div className='xingyun-logo' onClick={() => { this.handleLogoClick() }} />
            {/* <GlobalSearch /> */}
          </div>
          <Layout className='xingyun-iden-top-bar'>
            {/* <div style={{minHeight: '40px', _height: '40px', width: '100%', backgroundColor: '#1890FF'}}>
              <div className='header-container'> */}
            <div className='xingyun-top-header'>
              <div className='header-container'>
                {
                  tabArr.map((item, index) => {
                    return <li style={{textAlign: 'center'}}
                      key={index}>
                      <a className={this.state.activeTab === item.tabKey ? 'selected' : ''}
                        onClick={this.handleTabChange.bind(this, item.src, item.tabKey)}>
                        <span>{item.text}</span>
                      </a>
                    </li>
                  })
                }
              </div>
            </div>
            <Route path='/operate-manage-home/home' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LTeacherHome
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            <Route path='/operate-manage-home/please' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LPlease
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            <Route path='/operate-manage-home/iteration' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LIteration
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            <Route path='/operate-manage-home/member' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LPersonnelManagement
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            <Route path='/operate-manage-home/center' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LPersonalCenter
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            <Route path='/operate-manage-home/statis' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LStatisticalAnalysis
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            <Route path='/operate-manage-home/market' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LMarketAnalysis
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            <Route path='/operate-manage-home/all-app' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LAllApplications
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />

            <Route path='/operate-manage-home/all-app-detail' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LSelfSupport
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            <Route path='/operate-manage-home/all-app-detail-third' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LThirdPartyAppDetail
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            {/* <Route path='/operate-manage-home/all-app-selfplsprv' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LSelfPleasePreview
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} /> */}
            <Route path='/operate-manage-home/all-app-detail-mine' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LMyApp
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            <Route path='/operate-manage-home/all-app-detail-mineabc' render={() => {
              // eslint-disable-next-line react/jsx-no-undef
              return <LMyAppDetail
                changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }} />
            }} />
            { renderRoutes(routes.workPlat) }
          </Layout>
          <Row style={{width: '100%', height: 65, marginTop: '30px', backgroundColor: '#000'}}>
            <BottomHeader />
          </Row>
          <SignOut
            visible={this.state.signOutVisible}
            hiddenModal={this.hiddenModal.bind(this, 'signOutVisible')}
          />
        </Layout>
      </div>
    )
  }
}

export default withRouter(OperateManage)
