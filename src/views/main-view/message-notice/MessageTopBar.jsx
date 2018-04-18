/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Layout, Icon, Badge} from 'antd'
import { renderRoutes } from 'react-router-config'
import BottomHeader from '../../../components/common/BottomHeader'
import '../../../components/common/bottom.scss'
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'
import '../Operateview.scss'
export default class MessageTopBar extends React.Component {
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
            <div style={{height: '30px', float: 'right'}} className='header-bar-icon'>
              <Badge count={5} >
                <Icon type='mail' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/notice')} />
              </Badge>
              <Icon type='setting' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/setting')} />
              <Icon type='poweroff' style={{ fontSize: 16 }} onClick={this.handleTabChange.bind(this, '/topbar-manage/poweroff')} />
            </div>
          </div>
          <Layout.Header className='xingyun-header' style={{height: '92px'}}>
            <div className='xingyun-logo' style={{marginTop: '30px'}} onClick={this.handleTabChange.bind(this, 'operate-manage-home/market')} />
          </Layout.Header>
          <div>
            {renderRoutes(this.props.route.childRoutes)}
          </div>
          {/* <Layout className='xingyun-iden-top-bar'> */}
          {/* <div className='header-container'> */}
          {/* <li><a onClick={this.handleTabChange.bind(this, '/topbar-manage-notice/notice')}>首页</a></li> */}
          {/* <li><a onClick={this.handleTabChange.bind(this, '/operate-manage-home/edu')}>教育新闻</a></li> */}
          {/* </div> */}
          {/* {renderRoutes(this.props.route.childRoutes)} */}
          {/* </Layout> */}
        </Layout>
        <BottomHeader />
      </div>
    )
  }
}
