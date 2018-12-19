/**
 * 工作台-首页
 */
import React, { Component } from 'react'
import { Row, Col, Card } from 'antd'
import { Page } from '../../components/common'
import './Home.scss'
import More from '../../assets/images/work-plat/more.png'

/**
 * Card的头部的统一样式
 */
const headStyle = {
  backgroundColor: '#f4f4f4',
  padding: '0',
  height: '32px',
  lineHeight: '32px'
}

/**
 * Card的body的统一样式
 */
const bodyStyle = {
  border: 'none'
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

class Home extends Component {
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
              bodyStyle={{...bodyStyle}}
            >
              内容
            </Card>
          </Col>
          <Col span={16}>
            <Card
              bordered={false}
              title={'待办事项'}
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
              title={'系统推荐'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle}}
            >
              内容
            </Card>
          </Col>
          <Col span={16}>
            <Card
              bordered={false}
              title={'我的应用'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle}}
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

export default Home
