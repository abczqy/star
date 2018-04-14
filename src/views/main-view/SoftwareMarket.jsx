/**
 * 软件市场入口
 */
import React from 'react'
import { Layout, Menu, Icon } from 'antd'
const { SubMenu } = Menu
const { Header, Content, Sider } = Layout
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'
export default class SoftwareMarket extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <Layout>
        <Header className='header'>
          <div className='logo' />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#001529' }}>
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key='sub1' title={<span><Icon type='user' />软件管理</span>}>
                <Menu.Item key='1'>运营中</Menu.Item>
                <Menu.Item key='2'>待审核</Menu.Item>
                <Menu.Item key='3'>迭代审核</Menu.Item>
              </SubMenu>
              <SubMenu key='sub2' title={<span><Icon type='laptop' />会员管理</span>}>
                <Menu.Item key='5'>厂商</Menu.Item>
                <Menu.Item key='6'>学校</Menu.Item>
                <Menu.Item key='7'>老师</Menu.Item>
                <Menu.Item key='8'>学生</Menu.Item>
                <Menu.Item key='81'>家长</Menu.Item>
              </SubMenu>
              <SubMenu key='sub3' title={<span><Icon type='notification' />平台管理</span>}>
                <Menu.Item key='9'>门户首页</Menu.Item>
                <Menu.Item key='10'>新闻列表</Menu.Item>
                <Menu.Item key='11'>信息公开</Menu.Item>
                <Menu.Item key='12'>信息公开审核</Menu.Item>
                <Menu.Item key='13'>平台首页</Menu.Item>
              </SubMenu>
              <SubMenu key='sub3' title={<span><Icon type='notification' />运营统计</span>}>
                <Menu.Item key='9'>应用统计</Menu.Item>
                <Menu.Item key='10'>用户统计</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
