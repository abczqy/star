/* eslint-disable react/jsx-no-bind,react/prop-types,no-undef,no-return-assign */
/**
 * 游客登陆界面
 */
import React from 'react'
import { Badge, Icon } from 'antd'
// import { renderRoutes } from 'react-router-config'
import SignOut from './SignOut'
import {getMessageCount} from '../services/topbar-mation'
import './Operateview.scss'
import BottomHeader from 'components/common/BottomHeader'
import webStorage from 'webStorage'
import { withRouter, Route } from 'react-router'
import _ from 'lodash'

class LoginHome extends React.Component {
  constructor (props) {
    super(props)
    let pathName = this.props.location.pathname
    this.state = {
      activeTab: this.getDefaultTabKey(pathName),
      signOutVisible: false, // 退出系统
      messageCount: '0',
      refresh: true // 专用于用户登录后刷新用户
    }
  }

  componentWillReceiveProps (nextProps) {
    // 如果下一个路由是首页   新闻列表    信息公开里其中的某一个  则需要切换选中样式
    if (_.indexOf(['/', '/home/newsList', '/home/information'], nextProps.location.pathname) !== -1) {
      this.setState({
        activeTab: this.getDefaultTabKey(nextProps.location.pathname)
      })
    }
  }

  getDefaultTabKey (pathName) {
    let activeTab
    switch (pathName) {
      case '/':// 首页
        activeTab = 'home'
        break
      case '/home/newsList':// 教育新闻
        activeTab = 'newsList'
        break
      case '/home/newsDetails':// 教育新闻详情
        activeTab = 'newsList'
        break
      case '/home/information':// 信息公开
        activeTab = 'information'
        break
      case '/home/informationDet':// 信息公开详情
        activeTab = 'information'
        break
      case '/home/edu':// 教育局教育新闻
        activeTab = 'newsList'
        break
      case '/home/NewDetailsEd':// 教育局教育新闻详情
        activeTab = 'newsList'
        break
      case '/home/public':// 教育局信息公开
        activeTab = 'information'
        break
      case '/home/informationDetEd':// 教育局信息公开详情
        activeTab = 'information'
        break
      case '/operate-manage-home/home':// 软件市场
        activeTab = 'appStore'
        break
      default:
        activeTab = 'home'
    }
    return activeTab
  }

  changeActiveTab (activeTab) {
    this.setState({
      activeTab
    })
  }

  componentDidMount () {
    if (webStorage.getItem('Unread_Message')) {
      this.setState({
        messageCount: webStorage.getItem('Unread_Message')
      })
    }
  }
  // 未读消息数
  getMessageCo=() => {
    getMessageCount({}, (response) => {
      console.log('返回未读消息数量', response)
      webStorage.setItem('Unread_Message', response.data.count)
      this.setState({
        messageCount: response.data.count
      })
    })
  }
  handleTabChange (link, key) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    this.setState({
      activeTab: key
    }, () => {
      this.props.history.push({
        pathname: link
      })
    })
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

  updatePage () {
    this.setState({
      refresh: !this.state.refresh
    }, () => {
      if (webStorage.getItem('STAR_WEB_IS_LOGGED')) {
        this.getMessageCo()
      }
    })
  }
  render () {
    let STAR_WEB_ROLE_CODE = webStorage.getItem('STAR_WEB_ROLE_CODE')
    let roleCode = STAR_WEB_ROLE_CODE || ''
    return (
      <div className='xingyun'>
        <div style={{height: '100%'}}>
          {
            webStorage.getItem('STAR_WEB_IS_LOGGED') ? (
              <div style={{height: '30px', width: '100%'}}>
                <div style={{marginLeft: '10%', float: 'left', lineHeight: '30px'}}>欢迎您,
                  <span onClick={this.handlePerson.bind(this, '/operate-manage-home/center')}>{ webStorage.getItem('STAR_WEB_PERSON_INFO') ? (webStorage.getItem('STAR_WEB_PERSON_INFO').name || '游客') : '游客'}</span>
                </div>
                <div style={{height: '30px', float: 'right', marginRight: '10%'}} className='header-bar-icon'>
                  <Badge count={this.state.messageCount} >
                    <Icon type='mail' style={{ fontSize: 16 }} onClick={() => { this.handleTabChange('/topbar-manage/notice') }} />
                  </Badge>
                  <Icon type='setting' style={{ fontSize: 16 }} onClick={() => { this.handleTabChange('/topbar-manage/setting') }} />
                  <Icon type='poweroff' style={{ fontSize: 16 }} onClick={this.signOut} />
                </div>
              </div>
            ) : null
          }
          <div className='xingyun-header'>
            <div className='xingyun-logo' />
          </div>
          <div className='xingyun-top-header'>
            <div className='header-container'>
              <li><a className={this.state.activeTab === 'home' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/', 'home')}><span>首页</span></a>
              </li>
              {roleCode === '' ? null : <li><a className={this.state.activeTab === 'appStore' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/operate-manage-home/home', 'appStore')}><span>软件市场</span></a>
              </li>}
              <li>
                {
                  roleCode === 'eduBureau'
                    ? <a className={this.state.activeTab === 'newsList' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/home/edu', 'newsList')}><span>教育新闻</span></a>
                    : <a className={this.state.activeTab === 'newsList' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/home/newsList', 'newsList')}><span>教育新闻</span></a>
                }
              </li>
              <li>
                {
                  roleCode === 'eduBureau'
                    ? <a className={this.state.activeTab === 'information' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/home/public', 'information')}><span>信息公开</span></a>
                    : <a className={this.state.activeTab === 'information' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/home/information', 'information')}><span>信息公开</span></a>
                }
              </li>
            </div>
          </div>
          <div className='content-container' >
            {
              this.props.childRoutes.map((item, index, arr) => {
                return <Route key={index} path={item.path} component={item.component}
                  updatePage={() => { this.updatePage() }}
                  changeActiveTab={(activeTab) => { this.changeActiveTab(activeTab) }}
                />
              })
            }
          </div>
          <BottomHeader />
        </div>
        <SignOut
          visible={this.state.signOutVisible}
          hiddenModal={this.hiddenModal.bind(this, 'signOutVisible')}
        />
      </div>
    )
  }
}

export default withRouter(LoginHome)
