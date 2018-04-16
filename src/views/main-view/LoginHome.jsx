/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * 游客登陆界面
 */
import React from 'react'
import { Layout } from 'antd'
import { renderRoutes } from 'react-router-config'

class LoginHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
          <Layout.Header className='xingyun-header' style={{height: '92px'}}>
            <div className='xingyun-logo' style={{marginTop: '30px'}} />
          </Layout.Header>
          <Layout className='xingyun-top-header'>
            <div className='header-container'>
              <li><a onClick={this.handleTabChange.bind(this, '/unlogged/home')}>首页</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/unlogged/newsList')}>教育新闻</a></li>
              <li><a onClick={this.handleTabChange.bind(this, '/unlogged/information')}>信息公开</a></li>
            </div>
            {renderRoutes(this.props.route.childRoutes)}
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default LoginHome
