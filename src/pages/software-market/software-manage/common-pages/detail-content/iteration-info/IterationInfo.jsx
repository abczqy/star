/**
 * 软件相关
 * 用于填充在详情弹框中
 */
import React, { Component } from 'react'
import { Row, Col, Icon, DatePicker } from 'antd'
import { BlankBar } from 'components/software-market'

class IterationInfo extends Component {
  render () {
    return (
      <div className='ralate-wrap'>
        <Row>
          <Col span={4}>
            迭代信息
          </Col>
        </Row>
        <BlankBar height='10px' />
        <div className='relate-content'>
          <Row>
            <Col span={2} offset={1}>
            兼容系统:
            </Col>
            <Col span={9}>
              <span>Windows 7:</span>
              <span><Icon type='link' /></span>
              <span>PC端.dmg</span>
              <span><Icon type='download' /></span>
            </Col>
            <Col span={2} offset={6}>
            版本号:
            </Col>
            <Col span={4}>
              <span>V2.1</span>
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={1}>
              <span>迭代描述:</span>
            </Col>
            <Col span={19}>
              <span>
              迭代描述迭代描述迭代描述迭代描述迭代描述迭代描述迭代描述迭代描述迭代描述迭代描述迭代描述迭代描述
                迭代描述迭代描述迭代描述迭代描述
              </span>
            </Col>
          </Row>
          <Row className='sw-relate-move-L'>
            <Col span={3}>
              <span>PC端界面截图:</span>
            </Col>
            <Col span={6}>
              <img alt='pc端的界面截图' />
            </Col>
            <Col span={3} offset={6}>
            期望上架时间:
            </Col>
            <Col span={4}>
              <span><DatePicker /></span>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default IterationInfo
