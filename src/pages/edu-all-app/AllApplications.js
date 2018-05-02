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
    return (
      <div>
        <div style={{width: '100%', height: '250px'}}><img style={{width: '100%', height: '100%'}} src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2126622145,1468696620&fm=27&gp=0.jpg' /></div>
        <Layout style={{marginLeft: '10%', marginTop: '20px'}}>
          <Sider >
            <Menu
              style={{ width: 256, height: 800, textAlign: 'center', border: 0, boxShadow: '2px 2px 5px #999' }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode={this.state.mode}
              theme={this.state.theme}
            >
              <Menu.Item key='1' style={{height: 60, lineHeight: '60px', fontSize: 16}}>
                <Link to='/operate-manage-home/all-app/all-app?all'>全部应用</Link>
              </Menu.Item>
              <Menu.Item key='2' style={{height: 60, lineHeight: '60px', fontSize: 16}}>
                <Link to='/operate-manage-home/all-app/all-app?edu'>教学类</Link>
              </Menu.Item>
              <Menu.Item key='3' style={{height: 60, lineHeight: '60px', fontSize: 16}}>
                <Link to='/operate-manage-home/all-app/all-app?teach'>教辅类</Link>
              </Menu.Item>
              <Menu.Item key='4' style={{height: 60, lineHeight: '60px', fontSize: 16}}>
                <Link to='/operate-manage-home/all-app/all-app?manage'>管理类</Link>
              </Menu.Item>
              <Menu.Item key='5' style={{height: 60, lineHeight: '60px', fontSize: 16}}>
                <Link to='/operate-manage-home/all-app/all-app?other'>其他</Link>
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
      </div>
    )
  }
}
