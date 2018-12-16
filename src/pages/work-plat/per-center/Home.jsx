/**
 * 工作台-个人中心-首页
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Layout, Card, Row, Menu } from 'antd'
import classNames from 'classnames'
import { Page } from '../../../components/common'
import './Home.scss'

const { Sider, Content } = Layout
const { Item } = Menu

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectKey: '1' // 菜单选中的Item的key
    }
  }

  /**
   * 获得菜单选项的className
   * 主要是用来切换菜单Item的颜色之类等
   */
  getMenuItemClass = (key) => {
    return classNames('menu-item', {
      'menu-item-select': this.state.selectKey === key
    })
  }

  /**
   * menu的Item在被选中时调用
   */
  onMenuSelect = ({ item, key, selectedKeys }) => {
    console.log('item: ' + item)
    console.log('key: ' + key)
    console.log('selectedKeys: ' + selectedKeys)
    this.setState({
      selectKey: key
    })
  }

  componentDidMount () {
    // 需要重定向到'基本信息'
  }

  render () {
    return (
      <Page
        paddingTop='10px'
        paddingLeft='10%'
        paddingRight='10%'
        paddingBottom='0'
      >
        <Layout>
          <Sider theme='light'>
            <Row>
              <Card>
                头像
              </Card>
            </Row>
            <Row>
              <Card
                bodyStyle={{
                  padding: '10px 0'
                }}
              >
                <Menu
                  style={{
                    border: 'none',
                    color: '#666'
                  }}
                  defaultSelectedKeys={['1']}
                  onSelect={this.onMenuSelect}
                >
                  <Item key='1'>
                    <Link
                      to='/operate-manage-home/work-plat/per-center/base-info'
                    >
                      <span
                        className={this.getMenuItemClass('1')}
                      >
                        基本信息
                      </span>
                    </Link>
                  </Item>
                  <Item key='2'>
                    <Link
                      to='/operate-manage-home/work-plat/per-center/order-manage'
                    >
                      <span
                        className={this.getMenuItemClass('2')}
                      >
                        订单管理
                      </span>
                    </Link>
                  </Item>
                  <Item key='3'>
                    <Link
                      to='/operate-manage-home/work-plat/per-center/login-set'
                    >
                      <span
                        className={this.getMenuItemClass('3')}
                      >
                        账号管理
                      </span>
                    </Link>
                  </Item>
                  <Item key='4'>
                    <Link
                      to='/operate-manage-home/work-plat/per-center/addr-manage'
                    >
                      <span
                        className={this.getMenuItemClass('4')}
                      >
                        地址管理
                      </span>
                    </Link>
                  </Item>
                  <Item key='5'>
                    <Link
                      to='/operate-manage-home/work-plat/per-center/invoice-manage'
                    >
                      <span
                        className={this.getMenuItemClass('5')}
                      >
                        发票管理
                      </span>
                    </Link>
                  </Item>
                </Menu>
              </Card>
            </Row>
          </Sider>
          <Content>
            { renderRoutes(this.props.route.childRoutes) }
          </Content>
        </Layout>
      </Page>
    )
  }
}

Home.propTypes = {
  route: PropTypes.any // 子路由
}

export default Home
