/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Icon, Badge} from 'antd'
import { renderRoutes } from 'react-router-config'
import BottomHeader from 'components/common/BottomHeader'
import SignOut from '../../views/SignOut'
import {getMessageCount} from '../../services/topbar-mation/index'
import webStorage from 'webStorage'
import { withRouter } from 'react-router'
import 'components/common/bottom.scss'
import '../../views/Operateview.scss'

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
  getMessageCo=() => {
    getMessageCount({}, (response) => {
      webStorage.setItem('Unread_Message', response.data.count)
      this.setState({
        messageCount: response.data.count
      })
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
  // 当子页面MessageNotice信息阅读后实时更新未读消息数量
  updateMessageCount (value) {
    this.setState({
      messageCount: value
    })
  }
  render () {
    return (
      <div className='xingyun'>
        <div style={{height: '30px', width: '100%'}}>
          <div style={{marginLeft: '10%', float: 'left', lineHeight: '30px'}}>
            欢迎您 , <span onClick={this.handlePerson.bind(this, '/operate-manage-home/center')}>{webStorage.getItem('STAR_WEB_PERSON_INFO') ? (webStorage.getItem('STAR_WEB_PERSON_INFO').name || '游客') : '游客'
            }</span></div>
          <div style={{height: '30px', float: 'right', marginRight: '10%'}} className='header-bar-icon'>
            <Badge count={this.state.messageCount} >
              <Icon type='mail' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/notice')} />
            </Badge>
            <Icon type='setting' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/setting')} />
            <Icon type='poweroff' style={{ fontSize: 16 }} onClick={() => { this.signOut() }} />
          </div>
        </div>
        <div className='xingyun-header' onClick={this.handleTabChange.bind(this, '/unlogged/home')}>
          <div className='xingyun-logo' />
        </div>
        <div>
          {renderRoutes(this.props.route.childRoutes, {
            updateMessageCount: (value) => { this.updateMessageCount(value) }
          })}
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
