/**
 * 个人中心
 */

import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import ApplicationCard from '../../components/personal-center/application-card/ApplicationCard'
import './PersonalCenter.scss'

class PersonalCenter extends Component {
  render () {
    return (
      <div className='personal-center center-view'>
        <Card title='我的应用' bordered={false} >
          <Row>
            <Col span={6} >
              <ApplicationCard />
            </Col>
            <Col span={6} >
              <ApplicationCard />
            </Col>
            <Col span={6} >
              <ApplicationCard />
            </Col>
            <Col span={6} >
              <ApplicationCard />
            </Col>
            <Col span={6} >
              <ApplicationCard />
            </Col>
            <Col span={6} >
              <ApplicationCard />
            </Col>
            <Col span={6} >
              <ApplicationCard />
            </Col>
          </Row>

        </Card>
      </div>
    )
  }
}

export default PersonalCenter
