/**
 * 工作台-个人中心-首页
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import webStorage from 'webStorage'
import { Layout, Card, Row, Col, Menu, Avatar } from 'antd'
import classNames from 'classnames'
import { Page, Align, UploadFile } from '../../../components/common'
import avatar from '../../../assets/images/work-plat/avatar.png'
import './Home.scss'

const { Sider, Content } = Layout
const { Item } = Menu

// 一个临时组件 -- 用来做元素的高度和margin的
const LabelBox = props => (
  <div style={{ display: 'inline-block', margin: props.margin || '0' }}>
    {props.children}
  </div>
)

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      avatarState: avatar, // 头像默认src
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
   * 获得角色名
   */
  getRolecodeName = (code) => {
    let rolecodeName = ''
    switch (code) {
      case 'teacher':
        rolecodeName = '教师'
        break
      case 'parents':
        rolecodeName = '家长'
        break
      case 'students':
        rolecodeName = '学生'
        break
      case 'school':
        rolecodeName = '学校'
        break
      case 'vendor':
        rolecodeName = '厂商'
        break
      case 'eduBureau':
        rolecodeName = '教育局'
        break
      default:
        rolecodeName = '游客'
    }
    return rolecodeName
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
  callbackAvatar = (src) => {
    this.setState({
      avatarState: src
    })
  }

  componentDidMount () {
    // 需要重定向到'基本信息'
    this.props.history.replace('/operate-manage-home/work-plat/per-center/base-info')
  }

  render () {
    let rolecode = webStorage.getItem('STAR_WEB_ROLE_CODE')
    let rolecodeName = this.getRolecodeName(rolecode)
    return (
      <Page
        paddingTop='10px'
        paddingLeft='10%'
        paddingRight='10%'
        paddingBottom='0'
      >
        <Layout className='layout-wrap'>
          <Sider theme='light'>
            <Row>
              <Card
                bordered={false}
              >
                <Row>
                  <Col span={24}>
                    <Align>
                      <Avatar
                        size={96}
                        src={this.state.avatarState}
                      />
                    </Align>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Align>
                      <LabelBox margin='10px 0 15px 0'>
                        <UploadFile callbackAvatar={this.callbackAvatar} />
                      </LabelBox>
                    </Align>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Align>
                      <LabelBox margin='15px 0 10px 0'>
                        <span className='label-font color-normal'>
                          {webStorage.getItem('STAR_WEB_PERSON_INFO').userName || '无'} | {rolecodeName}
                        </span>
                      </LabelBox>
                    </Align>
                  </Col>
                </Row>
              </Card>
            </Row>
            <Row className='margin-card'>
              <Card
                bordered={false}
                bodyStyle={{
                  padding: '10px 0',
                  margin: '0'
                }}
              >
                <Menu
                  className='per-menu-wrap'
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
                  {
                    webStorage.getItem('STAR_WEB_ROLE_CODE') === 'vendor' &&
                    <Item key='6'>
                      <Link
                        to='/operate-manage-home/work-plat/per-center/fund-manage'
                      >
                        <span
                          className={this.getMenuItemClass('6')}
                        >
                          资金管理
                        </span>
                      </Link>
                    </Item>
                  }
                  {
                    webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents' &&
                    <Item key='7'>
                      <Link
                        to='/operate-manage-home/work-plat/per-center/child-bind'
                      >
                        <span
                          className={this.getMenuItemClass('7')}
                        >
                        孩子绑定
                        </span>
                      </Link>
                    </Item>
                  }
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
                        账号设置
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
          <Content
            style={{
              background: '#fff',
              margin: '0 0 0 10px',
              borderRadius: '4px'
            }}
          >
            { renderRoutes(this.props.route.childRoutes) }
          </Content>
        </Layout>
      </Page>
    )
  }
}

Home.propTypes = {
  route: PropTypes.any, // 子路由
  history: PropTypes.any // 路由中的history对象
}

// 内部定义组件的PropsType
LabelBox.propTypes = {
  children: PropTypes.any.isRequired,
  margin: PropTypes.string // 规定margin
}

export default withRouter(Home)
