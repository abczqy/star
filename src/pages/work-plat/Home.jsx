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
import { Page, LabelIcon } from '../../components/common'
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
 * Card.Grid的样式
 */
const gridStyle = {
  // textAlign: 'center',
  // border: 'none'
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
   * 获取系统推荐的渲染 -- 因为有Row和Col的嵌套渲染 -- 所以需要递归的算法
   * @param { array } data 渲染用的数据 后面可以加适配器 在传入时统一格式
   * @param { num } gridCol 九宫格 -- 格子有几列 默认3列 这个值要参与后面渲染时的运算
   */
  // getAppListRender = (data, gridCol) => {
  //   // 容错-空值
  //   data = data || []
  //   gridCol = gridCol || 3
  //   // 长度在5个以上时 需要截取前6个
  //   data.length > 5 && data.splice(6)
  //   return data.map((v, i) => {
  //     // 默认逢3渲染一个Row
  //     if (i % gridCol === 0) {
  //       // 默认3个为一排
  //       return (
  //         <Row>

  //         </Row>
  //       )
  //     } else {
  //       return (
  //         <Col span={24 / gridCol}>
  //           <LabelIcon label={v.label} />
  //         </Col>)
  //     }
  //   })
  // }

  /**
   * 获取格子的渲染
   * @param { array } data 用来渲染的数据 -- 可以在输入前加适配器
   * @param { num } gridCol 九宫格 -- 格子有几列 默认3列 这个值要参与后面渲染时的运算
   * @param { num } count 阈值 只渲染多少个
   */
  getCellsRender = (data, gridCol, count) => {
    // 容错-空值
    data = data || []
    count = count || 6
    gridCol = gridCol || 3
    const len = data.length
    // 长度在5个以上时 需要截取前6个
    data.length > count && data.splice(count)
    return data.map((v, i) => (
      <div
        key={i}
        className='grid'
        style={{
          ...gridStyle,
          width: (100 / gridCol + '%'),
          height: (100 / len * gridCol + '%')
        }}>
        <div>
          <LabelIcon label={v.label} />
        </div>
      </div>
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
              <div className='cells-wrap'>
                { this.getCellsRender(mock.sysRecommend) }
              </div>
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
              内容
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card
              bordered={false}
              title={'我的收藏'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle}}
              extra={<Extra />}
            >
              内容
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
