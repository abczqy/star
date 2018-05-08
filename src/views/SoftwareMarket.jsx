/**
 * 有身份登陆进来的首页
 * 软件市场入口
 */
import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import {
  Businessing
} from 'pages/software-market'
import ImgSoft from '../assets/images/operationMana/u103.png'
import ImgMemb from '../assets/images/operationMana/u15.png'
import ImgPlat from '../assets/images/operationMana/u57.png'
// import ImgOper from '../assets/images/operationMana/u83.png'
import SignOut from './SignOut'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout
// import { withRouter } from 'react-router-dom'
export default class SoftwareMarket extends React.Component {
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
      return renderRoutes(this.props.route.childRoutes)
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

  render () {
    return (
      <div className='xingyun'>
        <div className='operManaPlat-body' >
          <Layout>
            <Header style={{ padding: '15px 2%', background: 'white', height: '65px' }}>
              <div className='logo' style={{ float: 'left' }} />
              <div style={{ float: 'right', height: '35px', lineHeight: '35px', marginRight: '10%' }}><Icon type='poweroff' style={{ fontSize: 16 }} onClick={this.signOut} /></div>
            </Header>
            <Layout className='sider-bar'>
              <Sider width={200}>
                <Menu
                  mode='inline'
                  theme='dark'
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={({ item, key, keyPath }) => this.renderContent({ item, key, keyPath })}
                >
                  <SubMenu
                    key='sub1'
                    title={<span><img style={{ width: 14, height: 14, marginRight: 10, marginTop: -3 }} src={ImgSoft} />软件管理</span>} >
                    <Menu.Item key='1'>
                      <Link to='/software-market-home/software-manage/businessing'>运营中</Link>
                    </Menu.Item>
                    <Menu.Item key='2'>
                      <Link to='/software-market-home/software-manage/wait-verify'>待审核</Link>
                    </Menu.Item>
                    <Menu.Item key='3'>
                      <Link to='/software-market-home/software-manage/iteration-verify'>迭代审核</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key='sub2' title={<span><img style={{ width: 14, height: 14, marginRight: 10, marginTop: -3 }} src={ImgMemb} />会员管理</span>}>
                    <Menu.Item key='5'>
                      <Link to='/software-market-home/member-manage/manufacturer'>厂商</Link>
                    </Menu.Item>
                    <Menu.Item key='6'>
                      <Link to='/software-market-home/member-manage/school'>学校</Link>
                    </Menu.Item>
                    <Menu.Item key='7'>
                      <Link to='/software-market-home/member-manage/teacher'>老师</Link>
                    </Menu.Item>
                    <Menu.Item key='8'>
                      <Link to='/software-market-home/member-manage/student'>学生</Link>
                    </Menu.Item>
                    <Menu.Item key='81'>
                      <Link to='/software-market-home/member-manage/parent'>家长</Link>
                    </Menu.Item>
                    <Menu.Item key='82'>
                      <Link to='/software-market-home/member-manage/educational-services'>教育机构</Link>
                    </Menu.Item>
                  </SubMenu>
                  <SubMenu key='sub3' title={<span><img style={{ width: 14, height: 14, marginRight: 10, marginTop: -3 }} src={ImgPlat} />平台管理</span>}>
                    <Menu.Item key='9'>
                      <Link to='/software-market-home/platform-manage/porttal-homepage'>门户首页</Link>
                    </Menu.Item>
                    <Menu.Item key='10'>
                      <Link to='/software-market-home/platform-manage/news-list'>新闻列表</Link>
                    </Menu.Item>
                    <Menu.Item key='11'>
                      <Link to='/software-market-home/platform-manage/public-info'>信息公开</Link>
                    </Menu.Item>
                    <Menu.Item key='12'>
                      <Link to='/software-market-home/platform-manage/public-info-verify'>信息公开审核</Link>
                    </Menu.Item>
                    <Menu.Item key='13'>
                      <Link to='/software-market-home/platform-manage/plat-homepage'>平台首页</Link>
                    </Menu.Item>
                  </SubMenu>
                  {/* <SubMenu key='sub4' title={<span><img style={{ width: 14, height: 14, marginRight: 10, marginTop: -3 }} src={ImgOper} />运营统计</span>}>
                    <Menu.Item key='sub4-apply'>
                      <Link to='/software-market-home/platform-manage/app-count'>应用统计</Link>
                    </Menu.Item>
                    <Menu.Item key='sub4-satis'>
                      <Link to='/software-market-home/platform-manage/user-count'>用户统计</Link>
                    </Menu.Item>
                  </SubMenu> */}
                </Menu>
              </Sider>
              <Layout style={{ padding: '20px ' }}>
                <Content style={{ background: '#fff', padding: 20, margin: 0 }}>
                  {
                    this.getContent()
                  }
                </Content>
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
  route: PropTypes.object
}
