/**
 * 游客登陆-首页
 */
import React from 'react'
import { Row, Col } from 'antd'
import MainBander from './MainBander'
import WebApp from './WebApp'
import SoftMarket from './SoftMarket'
import BottomHeader from '../../components/common/BottomHeader'
import AppCount from './AppCount'
import NewsAndInfo from './NewsAndInfo'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='login-home-container'>
        <Row>
          <Col span={24}>
            <MainBander />
          </Col>
        </Row>
        <Row style={{background: '#FAFCFF'}}>
          <WebApp />
        </Row>
        <Row>
          <SoftMarket />
        </Row>
        <Row>
          <Col span={24}>
            <NewsAndInfo />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <AppCount />
          </Col>
        </Row>
        <Row>
          <BottomHeader />
        </Row>
      </div>
    )
  }
}
