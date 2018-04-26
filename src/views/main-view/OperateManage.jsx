/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 有身份登陆进来的首页
 * 运营管理入口
 */
import React from 'react'
import {Layout, Icon, Badge, Row} from 'antd'
import { renderRoutes } from 'react-router-config'
// import AllApplications from '../../pages/edu-all-app/AllApplications'
import PropTypes from 'prop-types'
import BottomHeader from '../../components/common/BottomHeader'
import SignOut from './SignOut'
// import SelfSupport from '../../pages/app-detail/SelfSupport'
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import apiConfig from '../../config'
import './Operateview.scss'
import webStorage from 'webStorage'

class OperateManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 'home',
      signOutVisible: false // 退出系统
    }
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
  getTabArr () {
    let baseTabArr = [{
      text: '首页',
      src: '/operate-manage-home/home'
    }, {
      text: '全部应用',
      src: '/operate-manage-home/all-app'
    }, {
      text: '个人中心',
      src: '/operate-manage-home/center'
    }]
    if (this.props.roleCode === 'parents') { // 家长
      return baseTabArr
    } else if (this.props.roleCode === 'students') { // 学生
      return baseTabArr
    } else if (this.props.roleCode === 'teacher') { // 教师
      return baseTabArr
    } else if (this.props.roleCode === 'school') { // 学校
      return [{
        text: '首页',
        src: '/operate-manage-home/home'
      }, {
        text: '全部应用',
        src: '/operate-manage-home/all-app'
      }, {
        text: '人员管理',
        src: '/operate-manage-home/member'
      }, {
        text: '个人中心',
        src: '/operate-manage-home/center'
      }]
    } else if (this.props.roleCode === 'vendor') { // 厂商
      return [{
        text: '首页',
        src: '/operate-manage-home/home'
      }, {
        text: '全部应用',
        src: '/operate-manage-home/all-app'
      }, {
        text: '我的应用',
        src: '/operate-manage-home/all-app-detail-mine'
      }, {
        text: '统计分析',
        src: '/operate-manage-home/statis'
      }, {
        text: '市场分析',
        src: '/operate-manage-home/market'
      }]
    } else if (this.props.roleCode === '') { // 游客

    } else if (this.props.roleCode === 'eduBureau') { // 教育局

    }
  }

  render () {
    let tabArr = this.getTabArr() || []
    return (
      <div className='xingyun'>
        <Layout>
          <div style={{height: '30px'}}>
            <div style={{marginLeft: '10%', float: 'left', lineHeight: '30px'}}>欢迎您，{ webStorage.getItem('STAR_WEB_PERSON_INFO').name || '游客'}</div>
            <div style={{height: '30px', float: 'right', marginRight: '10%'}} className='header-bar-icon'>
              <Badge count={5} >
                <Icon type='mail' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/notice')} />
              </Badge>
              <Icon type='setting' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/setting')} />
              <Icon type='poweroff' style={{ fontSize: 16 }} onClick={this.signOut} />
            </div>
          </div>
          <div className='xingyun-header'>
            <div className='xingyun-logo' />
          </div>
          <Layout className='xingyun-iden-top-bar'>
            <div style={{minHeight: '40px', _height: '40px', width: '100%', backgroundColor: '#1890FF'}}>
              <div className='header-container'>
                {
                  tabArr.map((item, index) => {
                    return <li key={index}><a onClick={this.handleTabChange.bind(this, item.src)}>{item.text}</a></li>
                  })
                }
              </div>
            </div>
            {renderRoutes(this.props.route.childRoutes)}
          </Layout>

          <Row style={{width: '100%', height: 100, marginTop: '30px', backgroundColor: '#000'}}>
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

OperateManage.propTypes = {
  roleCode: PropTypes.string
}
const mapStateToProps = state => ({
  roleCode: state.role.code
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperateManage)
