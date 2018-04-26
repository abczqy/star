/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Icon, Badge} from 'antd'
import { renderRoutes } from 'react-router-config'
import BottomHeader from '../../../components/common/BottomHeader'
import SignOut from '../SignOut'
import axios from 'axios'
import ajaxUrl from 'config'
import { connect } from 'react-redux'
import apiConfig from '../../../config'
import webStorage from 'webStorage'
import '../../../components/common/bottom.scss'
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'
import '../Operateview.scss'
class MessageTopBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      signOutVisible: false, // 退出系统
      messageCount: '0'
    }
  }
  componentDidMount () {
    this.getMessageCount()
  }
  // 未读消息数
  getMessageCount=() => {
    axios.post(ajaxUrl.getMessageCount).then((response) => {
      console.log('返回未读消息数量', response)
      this.setState({
        messageCount: response.data.count
      })
    })
  }
  handleTabChange (link) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    window.location.href = apiConfig.BASE_TAB + '/#' + link
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
  render () {
    return (
      <div className='xingyun'>
        <div style={{height: '30px', width: '100%'}}>
          <div style={{marginLeft: '10%', float: 'left', lineHeight: '30px'}}>
            欢迎您,{webStorage.getItem('STAR_WEB_PERSON_INFO') ? (webStorage.getItem('STAR_WEB_PERSON_INFO').name || '游客') : '游客'
            }</div>
          <div style={{height: '30px', float: 'right', marginRight: '10%'}} className='header-bar-icon'>
            <Badge count={this.state.messageCount} >
              <Icon type='mail' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/notice')} />
            </Badge>
            <Icon type='setting' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/setting')} />
            <Icon type='poweroff' style={{ fontSize: 16 }} onClick={() => { this.signOut() }} />
          </div>
        </div>
        <div className='xingyun-header' onClick={this.handleTabChange.bind(this, 'unlogged/home')}>
          <div className='xingyun-logo' />
        </div>
        <div>
          {renderRoutes(this.props.route.childRoutes)}
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
const mapStateToProps = state => ({
  personInfo: state.role.personInfo
})
export default connect(mapStateToProps)(MessageTopBar)
