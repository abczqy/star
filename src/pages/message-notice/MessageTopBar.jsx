/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import { Icon, Badge, message } from 'antd'
// import { renderRoutes } from 'react-router-config'
import BottomHeader from 'components/common/BottomHeader'
import SignOut from '../../views/SignOut'
import { getMessageCount } from '../../services/topbar-mation/index'
import webStorage from 'webStorage'
import { withRouter, Route } from 'react-router'
import 'components/common/bottom.scss'
import '../../views/Operateview.scss'
import {Logged} from 'components/common/hoc/Logged'
import MessageNotice from 'pages/message-notice/MessageNotice'
import MessageSetting from 'pages/message-notice/MessageSetting'
import MessageDetail from 'pages/message-notice/MessageDetail'
let LMessageNotice = Logged(MessageNotice)
let LMessageSetting = Logged(MessageSetting)
let LMessageDetail = Logged(MessageDetail)

class MessageTopBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      signOutVisible: false, // 退出系统
      messageCount: '0'
    }
  }
  componentDidMount () {
    this.getMessageCo()
  }
  // 未读消息数
  getMessageCo = () => {
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
  handleTabChange (link) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    } else {
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
  signOut = () => {
    this.setState({
      signOutVisible: true
    })
  }
  hiddenModal (type) {
    this.setState({
      [type]: false
    })
  }
  // 当子页面MessageNotice信息阅读后实时更新未读消息数量
  updateMessageCount (value) {
    this.setState({
      messageCount: value
    })
  }
  render () {
    let STAR_WEB_ROLE_CODE = webStorage.getItem('STAR_WEB_ROLE_CODE')
    let roleCode = STAR_WEB_ROLE_CODE || ''
    return (
      <div className='xingyun'>
        <div style={{ height: '30px', width: '100%' }}>
          <div style={{ marginLeft: '10%', float: 'left', lineHeight: '30px' }}>
            欢迎您 ,
            <span onClick={this.handlePerson.bind(this, '/operate-manage-home/center')}>
              {webStorage.getItem('STAR_WEB_PERSON_INFO')
                ? (webStorage.getItem('STAR_WEB_PERSON_INFO').userName || '游客')
                : '游客'
              }
              {webStorage.getItem('STAR_WEB_ROLE_CODE') === 'teacher' ? '老师' : ''}
            </span>
          </div>
          <div style={{ height: '30px', float: 'right', marginRight: '10%' }} className='header-bar-icon'>
            <Badge count={this.state.messageCount} >
              <Icon type='mail' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/notice')} />
            </Badge>
            <Icon type='setting' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/setting')} />
            <Icon type='poweroff' style={{ fontSize: 16 }} onClick={() => { this.signOut() }} />
          </div>
        </div>
        <div className='xingyun-header' onClick={this.handleTabChange.bind(this, '/home/index')}>
          <div className='xingyun-logo' />
        </div>
        <div className='xingyun-top-header'>
          <div className='header-container'>
            <li><a className={this.state.activeTab === 'home' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/home/index', 'home')}><span>首页</span></a>
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
        <div>
          <Route path='/topbar-manage/notice' render={() => {
            // eslint-disable-next-line react/jsx-no-undef
            return <LMessageNotice
              updateMessageCount={(value) => { this.updateMessageCount(value) }} />
          }} />
          <Route path='/topbar-manage/setting' render={() => {
            // eslint-disable-next-line react/jsx-no-undef
            return <LMessageSetting
              updateMessageCount={(value) => { this.updateMessageCount(value) }} />
          }} />
          <Route path='/topbar-manage/detail' render={() => {
            // eslint-disable-next-line react/jsx-no-undef
            return <LMessageDetail
              updateMessageCount={(value) => { this.updateMessageCount(value) }} />
          }} />
        </div>
        <SignOut
          visible={this.state.signOutVisible}
          hiddenModal={this.hiddenModal.bind(this, 'signOutVisible')}
        />
        <BottomHeader />
      </div>
    )
  }
}

export default withRouter(MessageTopBar)
