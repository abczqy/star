/**
 * 工作台-首页
 * 分层治之
 * 1- view层
 * 2- 逻辑层 -- 接收数据并去参与view活动需要的逻辑
 * 3- 数据适配层 -- 根据逻辑层需要的数据提供适配数据
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import webStorage from 'webStorage'
import {
  Row,
  Col,
  Card,
  Avatar,
  Progress,
  Tabs
} from 'antd'
import {
  Page,
  LabelIcon,
  Grid,
  AppCard,
  Echarts
} from '../../components/common'
import './Home.scss'
import More from '../../assets/images/work-plat/more.png'
import AvatarIcon from '../../assets/images/work-plat/avatar.png'
import WaitToDoPre from '../../assets/images/work-plat/wait-to-do-pre.png'
import WaitToDoSuffix from '../../assets/images/work-plat/wait-to-do-suffix.png'
import Book from '../../assets/images/work-plat/book.png'
import Member from '../../assets/images/work-plat/member.png'
import Org from '../../assets/images/work-plat/org.png'
import MsgIcon from '../../assets/images/work-plat/message.png'
import Location from '../../assets/images/work-plat/location.png'
import Compony from '../../assets/images/work-plat/compony.png'
import Job from '../../assets/images/work-plat/job.png'
import Call from '../../assets/images/work-plat/call.png'
import CLass from '../../assets/images/work-plat/class.png'
/* 一些子页面 */
import { DownHistory, UserManage } from './home/index'
/* mock数据 */
import mock from './mock-data'

const TabPane = Tabs.TabPane

/**
 * 排序的序号颜色
 * 1- 数组 - 下标就是序号
 */
const orderColor = ['#FF6D4A', '#4ECB73', '#fad337', '#666']

/**
 * 消息的主题颜色
 * 1- 这个可以后面如果公用 -- 可以抽出去
 */
const msgColor = {
  pass: '#4ECB73', // 成功-通过
  info: '#40B3F9', // 消息
  reject: '#f00' // 错误-拒绝
}

/**
 * APP-icon的style
 */
const iconStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  padding: '2px 5px 5px 5px'
}

/**
 * Card的头部的统一/共有样式
 */
const headStyle = {
  backgroundColor: '#f4f4f4',
  padding: '0',
  height: '32px',
  lineHeight: '32px'
}

/**
 * Card的body的统一/共有样式
 */
const bodyStyle = {
  border: 'none',
  padding: '20px'
}

/**
 * Card头部的Extra
 */
const Extra = () => (
  <span className='extra-font'>
    更多
    <img src={More} className='extra-icon' />
  </span>
)

/**
 * 待办列表-Item
 */
const WaitToDoItem = (props) => (
  <div className='wait-to-do-item'>
    <img src={WaitToDoPre} className='wait-to-do-item-icon-pre' />
    <span>
      { props.message || '' }
    </span>
    <img src={WaitToDoSuffix} className='wait-to-do-item-icon-suffix' />
    <span className='wait-to-do-item-date'>[3-24]</span>
  </div>
)

/**
 * 应用使用统计 Item
 */
const StatItem = (props) => (
  <Row className='order-item-wrap'>
    <Col span={1}>
      <span className='order-num' style={{ backgroundColor: props.orderColor || '#666' }} >
        { props.orderNum || ''}
      </span>
    </Col>
    <Col span={4}>
      <span>{ props.title || '' }</span>
    </Col>
    <Col span={19}>
      <Progress percent={props.percent} />
    </Col>
  </Row>
)

class Home extends Component {
  /**
   * 获取Echarts的options -- 用户统计
   * 1- 接受参数来生成专门的options
   */
  getUserStatOptions = (data) => {
    return {
      title: {
        text: '数量占比',
        left: 'center',
        top: 'middle',
        textStyle: {
          color: '#474747',
          fontSize: 24,
          fontWeight: 400
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      color: ['#fad337', '#3aa0ff', '#4ecb73'],
      series: [
        {
          name: '数量占比',
          type: 'pie',
          radius: ['60%', '85%'],
          avoidLabelOverlap: false,
          data: [
            {value: 335, name: '学生'},
            {value: 310, name: '教师'},
            {value: 234, name: '家长'}
          ]
        }

      ]
    }
  }

  /**
   * 获取待办事项列表-厂商
   */
  getVndWaitToDoListRender = (data) => {
    // 容错-空值
    let d = data.slice() || []
    // 长度在5个以上时 需要截取前6个
    d.length > 2 && d.splice(3)
    return d.map((v, i) => (
      <Row className='wait-to-do-vend'>
        <Col span={2}>
          <span
            className='message-icon-wrap'
            style={{ backgroundColor: msgColor[v.type] }}
          >
            <img src={MsgIcon} />
          </span>
        </Col>
        <Col span={20} className='wtdv-col'>
          <Row>
            <Col span={6}>
              { v.title || '' }
            </Col>
            <Col span={6} offset={12}>
              { v.date || '' }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              { v.content || '' }
            </Col>
          </Row>
          { v.more &&
            <Row>
              <Col span={24}> { v.more } </Col>
            </Row>
          }
        </Col>
        <Col span={2} className='wtdv-col'>
          查看
        </Col>
      </Row>
    ))
  }

  /**
   * 获取应用使用统计列表的渲染
   */
  getStatListRender = (data) => {
    // 容错-空值
    data = data || []
    // 长度在5个以上时 需要截取前6个
    data.length > 4 && data.splice(5)
    return data.map((v, i) => (
      <StatItem
        key={i}
        orderNum={i + 1 + ''}
        orderColor={i > 2 ? orderColor[3] : orderColor[i]}
        title={v.title}
        percent={v.percent}
      />
    ))
  }

  /**
   * 获取待办列表的渲染
   */
  getWaitToDoListRender = (data) => {
    // 容错-空值
    data = data || []
    // 长度在5个以上时 需要截取前6个
    data.length > 5 && data.splice(6)
    return data.map((v, i) => {
      return (
        <WaitToDoItem
          key={i}
          message={v.message}
        />
      )
    })
  }

  /**
   * 获得单个App的card
   */
  getAppCardRender = () => {
    return (
      <AppCard />
    )
  }

  /**
   * 获得单个的App - LabelIcon
   * @param { object } style 描述labelIcon的style
   * @returns 为了传递这个函数（并且可以携带参数） 我们返回值是返回一个函数（info和item传入的上下文不一样）
   */
  getAppRender = (style) => {
    // 返回函数 -- 可以模拟一下集成和多态
    style = style || {}
    // itemData 就是 传给LabelIcon的props数据
    return function (itemData, style) {
      return (
        <LabelIcon
          style={{ ...style }}
          label={itemData.label}
        />
      )
    }
  }

  /**
   * 获取格子的渲染
   * @param { array } data 用来渲染的数据 -- 可以在输入前加适配器
   * @param { num } gridCol 九宫格 -- 格子有几列 默认3列 这个值要参与后面渲染时的运算
   * @param { num } count 阈值 只渲染多少个
   * @param { func } itemRender 用来渲染格子的内容
   */
  getCellsRender = (data, gridCol, count, itemRender) => {
    // 容错-空值
    data = data || []
    count = count || 6
    gridCol = gridCol || 3
    // 长度在5个以上时 需要截取前6个
    let d = data.slice()
    d.length > count && d.splice(count)
    const len = count
    return d.map((v, i) => {
      return <Grid
        key={i}
        gridCount={len}
        gridCol={gridCol}
      >
        {/* <LabelIcon
          label={v.label}
        /> */}
        { itemRender(v) }
      </Grid>
    }
    )
  }

  /**
   * 渲染-工作台（个人中心）部分
   * @param {string} role 当前角色
   */
  getPersonRender = (role) => {
    if (role === 'teacher') {
      // 教师-个人中心部分渲染
      return (
        <Row className='row-box row-box-tch'>
          <Col span={24}>
            <Row>
              <Col span={16}>
                <img src={Compony} className='mini-icon' />
                单位：
                <span>xxx小学</span>
              </Col>
              <Col span={8}>
                <img src={Job} className='mini-icon' />
                学科：
                <span>数学</span>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <img src={Call} className='mini-icon' />
                电话：
                <span>12345678901</span>
              </Col>
              <Col span={8}>
                <img src={Job} className='mini-icon' />
                职称：
                <span>小教一级</span>
              </Col>
            </Row>
          </Col>
        </Row>
      )
    } else if (role === 'parents') {
      // 家长-个人中心部分渲染
      return (
        <Row className='row-box row-box-tch'>
          <Col span={14}>
            <img src={Compony} className='mini-icon' />
                单位：
            <span>xxx小学</span>
          </Col>
          <Col span={10}>
            <img src={Call} className='mini-icon' />
                电话：
            <span>12345678901</span>
          </Col>
        </Row>
      )
    } else if (role === 'students') {
      // 学生-个人中心部分渲染
      return (
        <Row className='row-box row-box-tch'>
          <Col span={14}>
            <img src={Compony} className='mini-icon' />
                单位：
            <span>xxx小学</span>
          </Col>
          <Col span={10}>
            <img src={CLass} className='mini-icon' />
                年级：
            <span>一年三班</span>
          </Col>
        </Row>
      )
    } else {
      return (
        <Row gutter={128} className='row-box'>
          <Col span={6} offset={1}>
            <LabelIcon
              style={{ ...iconStyle, backgroundColor: '#40B3F9' }}
              label='订单管理'
              icon={Book}
            />
          </Col>
          <Col span={6}>
            <LabelIcon
              style={{ ...iconStyle, backgroundColor: '#4ECB73' }}
              label='人员管理'
              icon={Member}
            />
          </Col>
          <Col span={6}>
            <LabelIcon
              style={{ ...iconStyle, backgroundColor: '#FF6D4A' }}
              label='组织管理'
              icon={Org}
            />
          </Col>
        </Row>
      )
    }
  }

  /**
   * 渲染非厂商部分的内容
   */
  getNoVendorRender = () => (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            bordered={false}
            title={'系统推荐'}
            headStyle={{...headStyle}}
            bodyStyle={{...bodyStyle, height: '220px'}}
          >
            {
              this.getCellsRender(mock.sysRecommend, 3, 6, this.getAppRender({ borderRadius: '4px' }))
            }
          </Card>
        </Col>
        <Col span={16}>
          <Card
            bordered={false}
            title={'我的应用'}
            headStyle={{...headStyle}}
            bodyStyle={{...bodyStyle, height: '220px'}}
            extra={<Extra />}
          >
            {
              this.getCellsRender(mock.myApps, 9, 18, this.getAppRender({ borderRadius: '50%' }))
            }
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card
            bordered={false}
            title={'我的收藏'}
            headStyle={{...headStyle}}
            bodyStyle={{...bodyStyle, height: '250px'}}
            extra={<Extra />}
          >
            {
              this.getCellsRender(mock.myApps, 5, 10, this.getAppCardRender)
            }
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            bordered={false}
            title={'用户统计'}
            headStyle={{...headStyle}}
            bodyStyle={{...bodyStyle, height: '260px'}}
          >
            <div className='echarts-wrap'>
              <Echarts options={this.getUserStatOptions()} />
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card
            bordered={false}
            title={'应用使用统计'}
            headStyle={{...headStyle}}
            bodyStyle={{...bodyStyle, height: '260px'}}
          >
            <Tabs
              type='card'
            >
              <TabPane
                key='stat-time'
                tab='使用市场'
              >
                {
                  this.getStatListRender(mock.statList)
                }
              </TabPane>
              <TabPane
                key='stat-rate'
                tab='使用频率'
              >
                {
                  this.getStatListRender(mock.statList)
                }
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card
            bordered={false}
            title={'下载历史'}
            headStyle={{...headStyle}}
            bodyStyle={{...bodyStyle}}
            extra={<Extra />}
          >
            <DownHistory />
          </Card>
        </Col>
      </Row>
    </div>
  )

  render () {
    return (
      <Page
        paddingLeft='10%'
        paddingRight='10%'
      >
        <Row gutter={16}>
          <Col span={8}>
            <Card
              bordered={false}
              title={'工作台'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle, height: '230px'}}
            >
              <Row
                type='flex'
                justify='space-around'
                align='middle'
              >
                <Col span={6}>
                  <Avatar
                    size={88}
                    src={AvatarIcon}
                  />
                </Col>
                <Col span={8}>
                  <Row
                    type='flex'
                    justify='center'
                  >
                    <Col span={14}>
                     学校名称
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                    海纳百川 有容乃大
                    </Col>
                  </Row>
                </Col>
                <Col span={6}>
                  <Link
                    to='/operate-manage-home/work-plat/per-center'
                  >
                    个人中心
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col span={6} offset={18}>
                  <img src={Location} className='mini-icon' />
                  <span>福建-福州</span>
                </Col>
              </Row>
              {
                this.getPersonRender(webStorage.getItem('STAR_WEB_ROLE_CODE'))
              }
            </Card>
          </Col>
          <Col span={16}>
            <Card
              bordered={false}
              title={<span>待办事项<span className='tip-red'>{'(23)'}</span></span>}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle, height: '230px'}}
              extra={<Extra />}
            >
              { webStorage.getItem('STAR_WEB_ROLE_CODE') === 'vendor'
                ? this.getVndWaitToDoListRender(mock.waitToDoVnd)
                : this.getWaitToDoListRender(mock.waitToDoData)
              }
            </Card>
          </Col>
        </Row>
        {
          webStorage.getItem('STAR_WEB_ROLE_CODE') === 'vendor'
            ? <Card
              bordered={false}
              title={'用户管理'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle}}
              extra={<Extra />}
            >
              <UserManage />
            </Card>
            : this.getNoVendorRender()
        }
      </Page>
    )
  }
}

WaitToDoItem.propTypes = {
  message: PropTypes.string
}

StatItem.propTypes = {
  orderColor: PropTypes.string,
  orderNum: PropTypes.string,
  title: PropTypes.string,
  percent: PropTypes.number
}

export default Home
