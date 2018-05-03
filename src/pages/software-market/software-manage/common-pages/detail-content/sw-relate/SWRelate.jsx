/**
 * 软件相关
 * 用于填充在详情弹框中
 */
import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import { BlankBar } from 'components/software-market'
import PropsTypes from 'prop-types'
import moment from 'moment'
import ajaxUrl from 'config'

class SWRelate extends Component {
  render () {
    const { resData, isWaitItera, isBusiDeta } = this.props

    // +++转换接收到的兼容系统sw_path参数内容为数组+++
    // 第一步把获取到的sw_path以逗号为分隔符分割
    let pathArray = []
    pathArray = resData && resData.sw_path ? resData.sw_path.split(',') : []
    let swPath = []
    // 刨除第一个元素剩余的内容
    let swPathRest = []
    for (let i = 0; i < pathArray.length; i++) {
      // 第二步以冒号为分隔符分割
      swPath.push(pathArray[i].split(':'))
    }
    // 给swPathRest赋值
    for (let i = 1; i < swPath.length; i++) {
      swPathRest.push(swPath[i])
    }

    // 转换接收到的PC端界面截图sw_computer_photo参数类型为数组
    let computerPho = []
    computerPho = resData && resData.sw_computer_photo ? resData.sw_computer_photo.split(';') : []

    return (
      <div className='ralate-wrap'>
        <Row>
          <Col span={4}>
            软件相关
          </Col>
        </Row>
        <BlankBar height='20px' />
        <div className='relate-content'>
          <Row>
            <Col span={2} offset={1}>
              软件分类:
            </Col>
            <Col span={9}>
              <span>{resData && resData.sw_type ? resData.sw_type : '默认分类'}</span>
            </Col>
            <Col span={2} offset={6}>
              上架时间:
            </Col>
            <Col span={4}>
              <span>{resData && resData.sw_time_real ? moment(resData.sw_time_real).format('YYYY-MM-DD') : '2099-9-9'}</span>
            </Col>
          </Row>
          <BlankBar height='20px' />
          <Row>
            <Col span={2} offset={1}>
              <span>软件描述:</span>
            </Col>
            <Col span={19}>
              <span>{resData && resData.sw_desc ? resData.sw_desc : '描述描述描述描述描述描述描述描述描述'}</span>
            </Col>
          </Row>
          <BlankBar height='20px' />
          {isWaitItera || isBusiDeta ? <Row>
            <Col span={2} offset={1}>
              <span>兼容系统:</span>
            </Col>
            <Col span={9}>
              <span>{swPath && swPath[0] ? swPath[0][0] : 'Windows32'}:</span>
              <span><Icon type='paper-clip' /></span>
              <span>{swPath && swPath[0] ? swPath[0][1].substr(1) : 'PC端.dmg'}</span>
              {!isBusiDeta ? <a href={swPath && swPath[0] && ajaxUrl.IMG_BASE_URL + swPath[0][1]}><Icon type='download' /></a> : null}
            </Col>
            <Col span={2} offset={6}>
              版本号:
            </Col>
            <Col span={4}>
              <span>V{resData.version}</span>
            </Col>
          </Row> : null}
          {isWaitItera || isBusiDeta ? <Row>
            <Col span={9} offset={3}>
              {swPathRest.length > 0 && swPathRest.map((item, index) => {
                let fileName = item && item[1].substr(1)
                return <span key={index}>
                  <span>{item && item[0]}:</span>
                  <span><Icon type='paper-clip' /></span>
                  <span>{fileName}</span>
                  {!isBusiDeta ? <a href={item && ajaxUrl.IMG_BASE_URL + item[1]}><Icon type='download' /></a> : null}
                </span>
              })}
            </Col>
          </Row> : null}
          <BlankBar height='20px' />
          <Row>
            <Col span={2} offset={1}>
              <span>软件图标:</span>
            </Col>
            <Col>
              <img style={{ width: 48, height: 42 }} alt='软件的图标' src={resData && ajaxUrl.IMG_BASE_URL + resData.sw_icon} />
            </Col>
          </Row>
          <BlankBar height='20px' />
          {isWaitItera || isBusiDeta ? <Row className='sw-relate-move-L'>
            <Col span={3}>
              <span>PC端界面截图:</span>
            </Col>
            <Col>
              {computerPho.length > 0 && computerPho.map((item, index) => {
                return <img style={{ width: 81, height: 55 }} alt='pc端的界面截图' src={resData && ajaxUrl.IMG_BASE_URL + item} />
              })}
            </Col>
          </Row> : null}
        </div>
      </div>
    )
  }
}

SWRelate.propTypes = {
  resData: PropsTypes.object,
  isWaitItera: PropsTypes.bool,
  isBusiDeta: PropsTypes.bool
}

export default SWRelate
