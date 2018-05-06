/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 有身份登陆进来的首页
 * 运营管理入口
 */
import React from 'react'
import {Layout, Icon, Badge, Row} from 'antd'
import { renderRoutes } from 'react-router-config'
import BottomHeader from '../components/common/BottomHeader'
import SignOut from './SignOut'
import GlobalSearch from '../pages/after-logging-home/GlobalSearch'
import {getMessageCount} from '../services/topbar-mation/index'
import './Operateview.scss'
import { withRouter } from 'react-router'
import webStorage from 'webStorage'
import _ from 'lodash'

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
      case '/operate-manage-home/center':// 个人中心
        activeTab = 'peopleCenter'
        break
      case '/operate-manage-home/member':// 人员管理
        activeTab = 'peopleMang'
        break
      case '/operate-manage-home/all-app-detail-mine':// 我的应用
        activeTab = 'myApp'
        break
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
    if (_.indexOf(['/unlogged/home', '/unlogged/newsList', '/unlogged/information'], nextProps.location.pathname) !== -1) {
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
      webStorage.setItem('Unread_Message', response.data.count)
      this.setState({
        messageCount: response.data.count
      })
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
    }, {
      text: '个人中心',
      tabKey: 'peopleCenter',
      src: '/operate-manage-home/center'
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
        text: '人员管理',
        tabKey: 'peopleMang',
        src: '/operate-manage-home/member'
      }, {
        text: '个人中心',
        tabKey: 'peopleCenter',
        src: '/operate-manage-home/center'
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
      }, {
        text: '我的应用',
        tabKey: 'myApp',
        src: '/operate-manage-home/all-app-detail-mine'
      }, {
        text: '统计分析',
        tabKey: 'statisAnaly',
        src: '/operate-manage-home/statis'
      }, {
        text: '市场分析',
        tabKey: 'marketAnaly',
        src: '/operate-manage-home/market'
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
        text: '个人中心',
        tabKey: 'peopleCenter',
        src: '/operate-manage-home/center'
      }, {
        text: '政策通知',
        tabKey: 'policyNotice',
        src: '/operate-manage-home/public/policy'
      }]
    }
  }

  render () {
    let tabArr = this.getTabArr() || []
    return (
      <div className='xingyun'>
        <Layout>
          <div style={{height: '30px'}}>
            <div style={{marginLeft: '10%', float: 'left', lineHeight: '30px'}}>欢迎您，{ webStorage.getItem('STAR_WEB_PERSON_INFO') ? (webStorage.getItem('STAR_WEB_PERSON_INFO').name || '游客') : '游客'}</div>
            <div style={{height: '30px', float: 'right', marginRight: '10%'}} className='header-bar-icon'>
              <Badge count={this.state.messageCount} >
                <Icon type='mail' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/notice')} />
              </Badge>
              <Icon type='setting' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/setting')} />
              <Icon type='poweroff' style={{ fontSize: 16 }} onClick={this.signOut} />
            </div>
          </div>
          <div className='xingyun-header'>
            <div className='xingyun-logo' />
            <GlobalSearch />
          </div>
          <Layout className='xingyun-iden-top-bar'>
            <div style={{minHeight: '40px', _height: '40px', width: '100%', backgroundColor: '#1890FF'}}>
              <div className='header-container'>
                {
                  tabArr.map((item, index) => {
                    return <li style={{textAlign: 'center'}} className={this.state.activeTab === item.tabKey ? 'selected' : ''} key={index}><a onClick={this.handleTabChange.bind(this, item.src, item.tabKey)}>{item.text}</a></li>
                  })
                }
              </div>
            </div>
            {renderRoutes(this.props.route.childRoutes)}
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
