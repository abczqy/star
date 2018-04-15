/**
 * 游客登录页软件市场
 */
import React from 'react'
import { Row, Col } from 'antd'

export default class SoftMarket extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div style={{width: '96%', padding: '40px'}}>
        <Row gutter={14}>
          <Col span={6}>
            <div style={{border: '1px solid red', height: '220px'}} />
          </Col>
          <Col span={6}>
            <div style={{border: '1px solid red', height: '220px'}} />
          </Col>
          <Col span={6}>
            <div style={{border: '1px solid red', height: '220px'}} />
          </Col>
          <Col span={6}>
            <div style={{border: '1px solid red', height: '220px'}} />
          </Col>
        </Row>
      </div>
    )
  }
}
