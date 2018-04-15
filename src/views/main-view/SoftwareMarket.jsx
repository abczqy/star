/**
 * 有身份登陆进来的首页
 * 软件市场入口
 */
import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import {
  Businessing,
  IterationVerify,
  WaitVerify
} from './software-market'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'
export default class SoftwareMarket extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      subMenuKey: '1'
    }
  }

  /**
   * 测试用：把obj转成string -- 有的obj用JSON.stringify转不了
   * 后面可以作为测试函数放在utils中
   */
  Obj2String = (obj) => {
    let str = '';

    for (let item in obj) {
      str += `${item}: ${obj[item]} \n`;
    }

    return str;
  }

  /**
   * 暂时：通过修改state触发渲染
   * 后期：加入redux做状态管理
   */
  renderContent = ({item, key, keyPath}) => {
    // console.log(`item: ${this.Obj2String(item)} \n`);
    // console.log(`key: ${key} \n keyPath: ${keyPath}`);
    console.log(`item: ${item} \n key: ${key} keyPath: ${keyPath}`)
    this.setState({
      subMenuKey: key
    })
  }

  /**
   * 渲染每一个submenu对应的Content
   */
  getContent = () => {
    let result = null
    //判断下state.subMenuKey的值 -- 暂时用switch吧 后面可以考虑映射关系的处理 用json对象或者switch单独处理
    switch (this.state.subMenuKey) {
      case '1':
        result = <Businessing />
        break;
      case '2':
        result = <WaitVerify />
        break;
      case '3':
        result = <IterationVerify />
        break;
      default:
       //其他操作
    }

    return result;  
  }

  render() {
    return (
      <Layout>
        <Header className='xingyun-header'>
          <div className='xingyun-logo' />
        </Header>
        <Layout className='sider-bar'>
          <Sider width={200}>
            <Menu
              mode='inline'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={ ({item, key, keyPath}) => this.renderContent({item, key, keyPath}) }
            >
              <SubMenu 
                key='sub1'
                title={<span><Icon type='user' />软件管理</span>} >
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
              <SubMenu key='sub4' title={<span><Icon type='notification' />运营统计</span>}>
                <Menu.Item key='9'>应用统计</Menu.Item>
                <Menu.Item key='10'>用户统计</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              { this.getContent() }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
