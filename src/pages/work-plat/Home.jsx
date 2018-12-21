/**
 * 工作台-首页
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Card,
  Button,
  Avatar
} from 'antd'
import {
  Page,
  LabelIcon,
  Grid,
  AppCard
} from '../../components/common'
import './Home.scss'
import More from '../../assets/images/work-plat/more.png'
import avatar from '../../assets/images/work-plat/avatar.png'
import WaitToDoPre from '../../assets/images/work-plat/wait-to-do-pre.png'
import waitToDoSuffix from '../../assets/images/work-plat/wait-to-do-suffix.png'
/* mock数据 */
import mock from './mock-data'

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
    <img src={waitToDoSuffix} className='wait-to-do-item-icon-suffix' />
    <span className='wait-to-do-item-date'>[3-24]</span>
  </div>
)

class Home extends Component {
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
    data.length > count && data.splice(count)
    const len = data.length
    return data.map((v, i) => (
      <Grid
        key={i}
        gridCount={len}
        gridCol={gridCol}
      >
        {/* <LabelIcon
          label={v.label}
        /> */}
        { itemRender(v) }
      </Grid>
    ))
  }

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
              bodyStyle={{...bodyStyle, height: '220px'}}
            >
              <Row
                type='flex'
                justify='space-around'
                align='middle'
              >
                <Col span={6}>
                  <Avatar
                    size={88}
                    src={avatar}
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
              <Row gutter={16} className='row-box'>
                <Col span={6} offset={3}>
                  <Button type='primary'>订单管理</Button>
                </Col>
                <Col span={6}>
                  <Button type='primary'>订单管理</Button>
                </Col>
                <Col span={6}>
                  <Button type='primary'>订单管理</Button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={16}>
            <Card
              bordered={false}
              title={<span>待办事项<span className='tip-red'>{'(23)'}</span></span>}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle, height: '220px'}}
              extra={<Extra />}
            >
              { this.getWaitToDoListRender(mock.waitToDoData) }
            </Card>
          </Col>
        </Row>
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
                this.getCellsRender(mock.myApps, 9, 14, this.getAppRender({ borderRadius: '50%' }))
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
              bodyStyle={{...bodyStyle}}
            >
              内容
            </Card>
          </Col>
          <Col span={16}>
            <Card
              bordered={false}
              title={'应用使用统计'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle}}
            >
              内容
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
              内容
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

WaitToDoItem.propTypes = {
  message: PropTypes.string
}

export default Home
