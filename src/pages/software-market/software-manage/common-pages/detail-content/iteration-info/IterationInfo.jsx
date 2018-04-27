/**
 * 软件相关
 * 用于填充在详情弹框中
 */
import React, { Component } from 'react'
import { Row, Col, Icon, DatePicker } from 'antd'
import { BlankBar } from 'components/software-market'
import PropsTypes from 'prop-types'

class IterationInfo extends Component {
  onChange = (date, dateString) => {
    this.props.getOnShelfTime(dateString)
  }
  render () {
    const { resData } = this.props

    // 第一步把获取到的sw_path去掉{}
    let path = []
    path = resData.sw_path0 ? resData.sw_path0.slice(1, -1) : []
    // 第二步以逗号为分隔符分割
    let pathArray = []
    pathArray = path.length > 0 ? path.split(',') : []
    let swPath = []
    // 刨除第一个元素剩余的内容
    let swPathRest = []
    for (let i = 0; i < pathArray.length; i++) {
      // 第三步以冒号为分隔符分割
      swPath.push(pathArray[i].split(':'))
    }
    // 给swPathRest赋值
    for (let i = 1; i < swPath.length; i++) {
      swPathRest.push(swPath[i])
    }
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
              <span>{swPath && swPath[0] ? swPath[0][0] : 'Windows32'}:</span>
              <span><Icon type='link' /></span>
              <span>{swPath && swPath[0] ? swPath[0][1] : 'PC端.dmg'}</span>
              <span><Icon type='download' /></span>
            </Col>
            <Col span={2} offset={6}>
            版本号:
            </Col>
            <Col span={4}>
              <span>{resData.iteration_version}</span>
            </Col>
          </Row>
          <Row>
            <Col span={9} offset={3}>
              {swPathRest && swPathRest.map((item, index) => {
                return <span key={index}>
                  <span>{item && item[0]}:</span>
                  <span><Icon type='link' /><span>{item && item[1]}</span></span>
                  <span><Icon type='download' /></span>
                </span>
              })}
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={1}>
              <span>迭代描述:</span>
            </Col>
            <Col span={19}>
              <span>{resData.sw_desc0 ? resData.sw_desc0 : '描述描述描述描述描述描述描述描述描述'}</span>
            </Col>
          </Row>
          <Row className='sw-relate-move-L'>
            <Col span={3}>
              <span>PC端界面截图:</span>
            </Col>
            <Col span={6}>
              <img alt='pc端的界面截图' src={resData.sw_computer_photo0} />
            </Col>
            <Col span={3} offset={6}>
            期望上架时间:
            </Col>
            <Col span={4}>
              <span><DatePicker onChange={this.onChange} /></span>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

IterationInfo.propTypes = {
  resData: PropsTypes.object,
  getOnShelfTime: PropsTypes.func
}

export default IterationInfo
