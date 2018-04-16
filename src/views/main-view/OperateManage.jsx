/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * 有身份登陆进来的首页
 * 运营管理入口
 */
import React from 'react'
import { Layout } from 'antd'
import { renderRoutes } from 'react-router-config'
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'

export default class OperateManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
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
          <div style={{height: '30px'}}>
            <div style={{height: '30px', float: 'left'}}>欢迎你，小姐姐</div>
            <div style={{height: '30px', float: 'right'}}>欢迎你，小姐姐</div>
          </div>
          <Layout.Header className='xingyun-header' style={{height: '92px'}}>
            <div className='xingyun-logo' style={{marginTop: '30px'}} />
          </Layout.Header>
          <Layout className='xingyun-iden-top-bar'>
            <div className='header-container'>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/home')}>首页</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/edu')}>教育新闻</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/public')}>信息公开</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/member')}>人员管理</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/center')}>个人中心</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/statis')}>统计分析</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/market')}>市场分析</a></li>
            </div>
            {renderRoutes(this.props.route.childRoutes)}
          </Layout>
        </Layout>
      </div>
    )
  }
}
