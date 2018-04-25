/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Layout, Icon, Badge} from 'antd'
import { renderRoutes } from 'react-router-config'
import BottomHeader from '../../../components/common/BottomHeader'
import SignOut from '../SignOut'
import { connect } from 'react-redux'
import '../../../components/common/bottom.scss'
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'
import '../Operateview.scss'
class MessageTopBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      signOutVisible: false // 退出系统
    }
  }

  handleTabChange (link) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    window.location.href = 'http://localhost:8080/#' + link
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
      <div>
        <Layout>
          <div style={{height: '30px'}}>
            <div style={{height: '30px', float: 'left', paddingLeft: '110px'}}>欢迎你,{this.props.personInfo.name ? this.props.personInfo.name : ''}</div>
            <div style={{height: '30px', float: 'right'}} className='header-bar-icon'>
              <Badge count={5} >
                <Icon type='mail' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/notice')} />
              </Badge>
              <Icon type='setting' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/setting')} />
              <Icon type='poweroff' style={{ fontSize: 16 }} onClick={() => { this.signOut() }} />
            </div>
          </div>
          <Layout.Header className='xingyun-header' style={{height: '92px', paddingLeft: '110px'}}>
            <div className='xingyun-logo' style={{marginTop: '30px'}} onClick={this.handleTabChange.bind(this, 'operate-manage-home/market')} />
          </Layout.Header>
          <div>
            {renderRoutes(this.props.route.childRoutes)}
          </div>
        </Layout>
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
