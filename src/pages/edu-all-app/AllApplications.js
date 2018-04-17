/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import { Layout, Menu } from 'antd'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'
const { Sider, Content } = Layout

// import axiosApi from '../../../api'
export default class AllApplications extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'inline',
      theme: 'light'
    }
  }
  static propTypes = {
    visible: PropTypes.bool,
    route: PropTypes.arr
  }
  changeMode = (value) => {
    this.setState({
      mode: value ? 'vertical' : 'inline'
    })
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light'
    })
  }
  componentWillReceiveProps (nextProps) {
    if ((nextProps.visible !== this.props.visible) && nextProps.visible) {
    }
  }
  render () {
    console.log('88888888')
    console.log(this.props.route.childRoutes)
    return (
      <Layout style={{marginLeft: '10%'}}>
        <Sider >
          <Menu
            style={{ width: 256, height: 800, textAlign: 'center', border: 0, boxShadow: '2px 2px 5px #999' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={this.state.mode}
            theme={this.state.theme}
          >
            <Menu.Item key='1' style={{height: 60, lineHeight: '60px', fontSize: 16}}>
              <Link to='/operate-manage-home/all-app/all-app'>全部应用</Link>
            </Menu.Item>
            <Menu.Item key='2' style={{height: 60, lineHeight: '60px', fontSize: 16}}>
            教学类
            </Menu.Item>
            <Menu.Item key='3' style={{height: 60, lineHeight: '60px', fontSize: 16}}>
            教辅类
            </Menu.Item>
            <Menu.Item key='4' style={{height: 60, lineHeight: '60px', fontSize: 16}}>
            管理类
            </Menu.Item>
            <Menu.Item key='5' style={{height: 60, lineHeight: '60px', fontSize: 16}}>
            其他
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{minHeight: '800px', _height: '800px'}}>
          <Content>
            {
              renderRoutes(this.props.route.childRoutes)
            }

          </Content>
        </Layout>
      </Layout>
    )
  }
}
