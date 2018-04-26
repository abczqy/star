/**
 * 软件相关
 * 用于填充在详情弹框中
 */
import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import { BlankBar } from 'components/software-market'
import PropsTypes from 'prop-types'
import moment from 'moment'

class SWRelate extends Component {
  render () {
    const { resData } = this.props
    let swPath = []
    // 刨除第一个元素剩余的内容
    let swPathRest = []
    let isFirst = true
    if (resData.sw_path) {
      for (var key in Object.keys(resData.sw_path)) {
        swPath.push(key)
        if (!isFirst) {
          swPathRest.push(key)
        }
        isFirst = false
      }
    }

    console.log('resData:', resData)
    console.log('swPathRest:', swPathRest)

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
              <span>{resData.sw_type ? resData.sw_type : '默认分类'}</span>
            </Col>
            <Col span={2} offset={6}>
              上架时间:
            </Col>
            <Col span={4}>
              <span>{resData.sw_time_real ? moment(resData.sw_time_real).format('YYYY-MM-DD') : '2099-9-9'}</span>
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={1}>
              <span>系统描述:</span>
            </Col>
            <Col span={19}>
              <span>{resData.sw_desc ? resData.sw_desc : '描述描述描述描述描述描述描述描述描述'}</span>
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={1}>
              <span>兼容系统:</span>
            </Col>
            <Col span={9}>
              <span>{swPath && swPath[0] ? swPath[0] : 'Windows32'}:</span>
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
              {swPathRest && swPathRest.map((item) => {
                return <span>
                  <span>{resData.sw_path[item]}</span>
                  <span><Icon type='link' /><span>PC端.dmg</span></span>
                </span>
              })}
            </Col>
          </Row>
          <Row>
            <Col span={2} offset={1}>
              <span>软件图标:</span>
            </Col>
            <Col>
              <img alt='软件的图标' src={resData.sw_icon} />
            </Col>
          </Row>
          <Row className='sw-relate-move-L'>
            <Col span={3}>
              <span>PC端界面截图:</span>
            </Col>
            <Col>
              <img alt='pc端的界面截图' src={resData.sw_computer_photo} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

SWRelate.propTypes = {
  resData: PropsTypes.any
}

export default SWRelate
