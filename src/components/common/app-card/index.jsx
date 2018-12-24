/**
 * 应用卡片 - 业务向组件
 * 1- 可以收藏/订阅/下载
 * 2- 接受部分的样式定制
 * 3- 因为是业务性的组件 -- 我们可以使用antd等第三方依赖（其他的组件要减少对第三方的依赖/耦合）
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import './AppCard.scss'
import AppMore from '../../../assets/images/work-plat/app-more.png'
import DownLoad from '../../../assets/images/work-plat/down-load.png'
import Share from '../../../assets/images/work-plat/share.png'
import Celect from '../../../assets/images/work-plat/celect.png'

class AppCard extends Component {
  render () {
    const {
      icon = AppMore,
      title = '应用名称',
      desc = '应用描述'
    } = this.props
    return (
      <div className='app-card'>
        <Row>
          <Col span={8}>
            <div
              className='icon-wrap'
            >
              <img
                className='icon'
                src={icon}
              />
            </div>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={24} className='app-title'>
                {title}
              </Col>
            </Row>
            <Row>
              <Col span={24} className='app-desc'>
                {desc}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='bottom-row'>
          <Col span={3} offset={10}>
            <span className='btn-icon-wrap share-icon'>
              <img
                className='mini-icon'
                src={DownLoad}
              />
            </span>
          </Col>
          <Col span={5} >
            <span className='btn-wrap btn-text-wrap down-load-icon'>
              下载
            </span>
          </Col>
          <Col span={3} >
            <span className='btn-icon-wrap share-icon'>
              <img
                className='mini-icon'
                src={Celect}
              />
            </span>
          </Col>
          <Col span={3} >
            <span className='btn-icon-wrap celect-icon'>
              <img
                className='mini-icon'
                src={Share}
              />
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}

AppCard.propTypes = {
  icon: PropTypes.any, // 图片
  title: PropTypes.any, // 名称
  desc: PropTypes.string // 描述
}

export default AppCard
