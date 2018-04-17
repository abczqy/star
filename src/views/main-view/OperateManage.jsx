/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 有身份登陆进来的首页
 * 运营管理入口
 */
import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Layout } from 'antd'
// import AllApplications from '../../pages/edu-all-app/AllApplications'
// import PropTypes from 'prop-types'
// import BottomHeader from '../../components/common/BottomHeader'
// import SelfSupport from '../../pages/app-detail/SelfSupport'
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'

export default class OperateManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 'home'
    }
  }

  handleTabChange (link) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    window.location.href = 'http://localhost:8080/#' + link
  }

  render () {
    return (
      <div>
        <Layout>
          <div style={{height: '30px', width: '80%', margin: 'auto'}}>
            <div style={{height: '30px', float: 'left'}}>欢迎你，小姐姐</div>
            <div style={{height: '30px', float: 'right'}}>欢迎你，小姐姐</div>
          </div>
          <div style={{height: '92px', width: '100%', backgroundColor: '#fff'}}>
            <Layout.Header className='xingyun-header' style={{height: '92px', width: '80%', margin: 'auto'}}>
              <div className='xingyun-logo' style={{marginTop: '30px'}} />
            </Layout.Header>
          </div>
          <Layout className='xingyun-iden-top-bar'>
            <div className='header-container'>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/home')}>首页</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/edu')}>教育新闻</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/public')}>信息公开</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/member')}>人员管理</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/center')}>个人中心</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/statis')}>统计分析</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/market')}>市场分析</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/all-app')}>全部应用</a></li>
            </div>
            {renderRoutes(this.props.route.childRoutes)}
          </Layout>
          {/* <Layout.Footer style={{width: '100%', height: 100, marginTop: '30px', backgroundColor: '#000'}}>
            <BottomHeader />
          </Layout.Footer> */}
        </Layout>
      </div>
    )
  }
}

OperateManage.propTypes = {
  // route: PropTypes.arr
}
