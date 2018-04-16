/**
 * 游客登陆-首页-应用个数统计
 */
import React from 'react'
import { Row, Col } from 'antd'

export default class AppCount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='bottom-banner'>
        <div className='div-wapper'>
          <Row>
            <Col span={8}>
              <div className='item'>
                <span className='num'>50</span>
                <span className='more'>+</span>
                <div className='category'>教育类App(个)</div>
              </div>
            </Col>
            <Col span={8}>
              <div className='item'>
                <span className='num'>50</span>
                <span className='more'>+</span>
                <div className='category'>教育类App(个)</div>
              </div>
            </Col>
            <Col span={8}>
              <div className='item'>
                <span className='num'>50</span>
                <span className='more'>+</span>
                <div className='category'>教育类App(个)</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
