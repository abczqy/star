/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * 游客登陆界面
 */
import React from 'react'
import { Layout, Badge, Icon } from 'antd'
import { renderRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import apiConfig from '../../config'
import './Operateview.scss'

class LoginHome extends React.Component {
  constructor (props) {
    super(props)
    let pathName = this.props.location.pathname
    this.state = {
      activeTab: this.getDefaultTabKey(pathName)
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
          {
            this.props.isLogged ? (
              <div style={{height: '30px', width: '100%', margin: 'auto'}}>
                <div style={{height: '30px', marginLeft: '50px', float: 'left'}}>欢迎您,{ this.props.personInfo.name ? this.props.personInfo.name : ''}</div>
                <div style={{height: '30px', float: 'right', marginRight: '50px'}} className='header-bar-icon'>
                  <Badge count={5} >
                    <Icon type='mail' style={{ fontSize: 16 }} onClick={() => { this.handleTabChange('/topbar-manage/notice') }} />
                  </Badge>
                  <Icon type='setting' style={{ fontSize: 16 }} onClick={() => { this.handleTabChange('/topbar-manage/setting') }} />
                  <Icon type='poweroff' style={{ fontSize: 16 }} onClick={this.signOut} />
                </div>
              </div>
            ) : null
          }
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
