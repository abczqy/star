/* eslint-disable react/prop-types */
/**
 * 有身份登录进来的首页
 * 软件市场入口
 */
import React from 'react'
import { Layout, Icon } from 'antd'
import { renderRoutes } from 'react-router-config'
import {
  Businessing
} from 'pages/software-market'
import SignOut from './SignOut'
import { withRouter, Route } from 'react-router'
import { MenuItemsCreater } from '../components/common'
import menuData from './data/menuData'

const { Header, Content, Sider } = Layout

class SoftwareMarket extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      subMenuKey: '0',
      signOutVisible: false // 退出系统
    }
  }

  /**
   * 暂时：通过修改state触发渲染
   * 后期：加入redux做状态管理
   */
  renderContent = ({ item, key, keyPath }) => {
    this.setState({
      subMenuKey: key
    })
  }

  getContent = () => {
    if (this.state.subMenuKey !== '0') {
      return renderRoutes(this.props.childRoutes)
    } else {
      // 当subMenuKey === '0' 为初始页面
      return <Businessing />
    }
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

  /**
   * 点击logo回到门户首页
   */
  handleLogoClick () {
    this.props.history.push({
      pathname: '/'
    })
  }

  renderChildContent () {
<<<<<<< HEAD
    return <Content style={{ background: '#fff', padding: 20, margin: 0 }}>
=======
    return <Content style={{ background: '#fff', padding: 20, margin: 0, overflowY: 'auto' }}>
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
      {
        this.props.childRoutes.map((item, index, arr) => {
          return <Route key={index} path={item.path} component={item.component} />
        })
      }
    </Content>
  }

  render () {
    return (
      <div className='xingyun'>
        <div className='operManaPlat-body' >
          <Layout>
            <Header style={{ padding: '15px 2%', background: 'white', height: '65px' }}>
              <div className='logo' style={{ float: 'left', cursor: 'pointer' }} onClick={() => { this.handleLogoClick() }} />
<<<<<<< HEAD
              <div style={{ float: 'right', height: '35px', lineHeight: '35px', marginRight: '10%' }}><Icon type='poweroff' style={{ fontSize: 16 }} onClick={this.signOut} /></div>
=======
              <div style={{ float: 'right', height: '35px', lineHeight: '35px', marginRight: '10%' }}><Icon type='poweroff' style={{ fontSize: 16, cursor: 'pointer' }} onClick={this.signOut} /></div>
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
            </Header>
            <Layout className='sider-bar'>
              <Sider width={200}>
                <MenuItemsCreater
                  data={menuData}
                  mode='inline'
                  theme='dark'
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={({ item, key, keyPath }) => this.renderContent({ item, key, keyPath })}
                />
              </Sider>
              <Layout style={{ padding: '20px ' }}>
                {
<<<<<<< HEAD
                  this.state.subMenuKey !== '0' ? this.renderChildContent() : <Content style={{ background: '#fff', padding: 20, margin: 0 }}>
=======
                  this.state.subMenuKey !== '0' ? this.renderChildContent() : <Content style={{ background: '#fff', padding: 20, margin: 0, overflowY: 'auto' }}>
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
                    <Businessing />
                  </Content>
                }
              </Layout>
            </Layout>
          </Layout>
        </div>
        <SignOut
          visible={this.state.signOutVisible}
          hiddenModal={() => { this.hiddenModal('signOutVisible') }}
        />
      </div>
    )
  }
}

SoftwareMarket.propTypes = {
  // route: PropTypes.object
}

export default withRouter(SoftwareMarket)
