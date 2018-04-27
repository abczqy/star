/* eslint-disable react/jsx-no-bind,react/prop-types,no-undef,no-return-assign */
/**
 * 游客登陆界面
 */
import React from 'react'
import { Badge, Icon } from 'antd'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import apiConfig from '../../config'
import SignOut from './SignOut'
import axios from 'axios'
import ajaxUrl from 'config'
import './Operateview.scss'
import BottomHeader from 'components/common/BottomHeader'
import webStorage from 'webStorage'

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
    this.setState({
      activeTab: this.getDefaultTabKey(nextProps.location.pathname)
    })
  }

  getDefaultTabKey (pathName) {
    let temArr = pathName.split('/')
    return temArr[temArr.length - 1] || 'home'
  }
  componentDidMount () {
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
  handleTabChange (link, key) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    this.setState({
      activeTab: key
    })
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

  updatePage () {
    this.setState({
      refresh: !this.state.refresh
    }, () => {
      if (webStorage.getItem('STAR_WEB_IS_LOGGED')) {
        this.getMessageCount()
      }
    })
  }
  render () {
    return (
      <div className='xingyun'>
        <div style={{height: '100%'}}>
          {
            webStorage.getItem('STAR_WEB_IS_LOGGED') ? (
              <div style={{height: '30px', width: '100%'}}>
                <div style={{marginLeft: '10%', float: 'left', lineHeight: '30px'}}>欢迎您,{ webStorage.getItem('STAR_WEB_PERSON_INFO') ? (webStorage.getItem('STAR_WEB_PERSON_INFO').name || '游客') : '游客'}</div>
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
              <li><a className={this.state.activeTab === 'home' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/unlogged/home', 'home')}><span>首页</span></a>
              </li>
              <li><a className={this.state.activeTab === 'newsList' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/unlogged/newsList', 'newsList')}><span>教育新闻</span></a></li>
              <li><a className={this.state.activeTab === 'information' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/unlogged/information', 'information')}><span>信息公开</span></a></li>
            </div>
          </div>
          <div className='content-container' >
            {renderRoutes(this.props.route.childRoutes, {
              updatePage: () => { this.updatePage() }
            })}
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

const mapStateToProps = state => ({
  roleCode: state.role.code,
  isLogged: state.role.isLogged,
  personInfo: state.role.personInfo
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginHome)
