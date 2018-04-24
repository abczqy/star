/**
 * 软件相关
 * 用于填充在详情弹框中
 */
import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import { BlankBar } from 'components/software-market'

class SWRelate extends Component {
  render () {
    return (
      <div className='ralate-wrap'>
        <Row>
          <Col span={4}>
            软件相关
          </Col>
        </Row>
        <BlankBar height='10px' />
        <div className='relate-content'>
          <Row>
            <Col span={2} offset={1}>
            软件分类:
            </Col>
            <Col span={9}>
              <span>教辅类:</span>
            </Col>
            <Col span={2} offset={6}>
            上架时间:
            </Col>
            <Col span={4}>
              <span>2018-4-23</span>
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={1}>
              <span>系统描述:</span>
            </Col>
            <Col span={19}>
              <span>
              这里是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述
              是软件描述是软件描述是软件描述              这里是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述
              是软件描述是软件描述是软件描述
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={1}>
              <span>兼容系统:</span>
            </Col>
            <Col span={9}>
              <span>Windows_32：</span>
              <span><Icon type='link' /><span>PC端.dmg</span></span>
            </Col>
            <Col span={2} offset={6}>
            版本号：
            </Col>
            <Col span={4}>
              <span>V2.1</span>
            </Col>
          </Row>
          <Row>
            <Col span={9} offset={3}>
              <span>Windows_32：</span>
              <span><Icon type='link' /><span>PC端.dmg</span></span>
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={1}>
              <span>软件图标:</span>
            </Col>
            <Col>
              <img alt='软件的图标' />
            </Col>
          </Row>
          <Row className='sw-relate-move-L'>
            <Col span={3}>
              <span>PC端界面截图:</span>
            </Col>
            <Col>
              <img alt='pc端的界面截图' />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default SWRelate
