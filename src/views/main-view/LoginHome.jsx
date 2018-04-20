/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * 游客登陆界面
 */
import React from 'react'
import { Layout } from 'antd'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import apiConfig from '../../config'

class LoginHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: this.getDefaultTabKey()
    }
  }

  getDefaultTabKey () {
    let pathName = this.props.location.pathname
    let temArr = pathName.split('/')
    return temArr[temArr.length - 1] || 'home'
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

  render () {
    return (
      <div>
        <Layout>
          <Layout.Header className='xingyun-header' style={{height: '92px'}}>
            <div className='xingyun-logo' style={{marginTop: '30px'}} />
          </Layout.Header>
          <Layout className='xingyun-top-header'>
            <div className='header-container'>
              <li><a className={this.state.activeTab === 'home' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/unlogged/home', 'home')}><span>首页</span></a>
              </li>
              <li><a className={this.state.activeTab === 'newsList' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/unlogged/newsList', 'newsList')}><span>教育新闻</span></a></li>
              <li><a className={this.state.activeTab === 'information' ? 'selected' : ''} onClick={this.handleTabChange.bind(this, '/unlogged/information', 'information')}><span>信息公开</span></a></li>
            </div>
            {renderRoutes(this.props.route.childRoutes)}
          </Layout>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  roleCode: state.role.code
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginHome)
