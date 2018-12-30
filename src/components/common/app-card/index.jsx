/**
 * 应用卡片 - 业务向组件
 * 1- 可以收藏/订阅/下载
 * 2- 接受部分的样式定制
 * 3- 因为是业务性的组件 -- 我们可以使用antd等第三方依赖（其他的组件要减少对第三方的依赖/耦合）
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import AppIcon from '../app-icon'
import './AppCard.scss'
import '../../../assets/index.scss'
// import AppMore from '../../../assets/images/work-plat/app-more.png'
// import DownLoad from '../../../assets/images/work-plat/down-load.png'
import Share from '../../../assets/images/work-plat/share.png'
import Celect from '../../../assets/images/work-plat/celect.png'

class AppCard extends Component {
  /**
   * 动作（详情/下载） - 点击事件
   */
  onAction = () => {
    // 把应用id返回父组件
    this.props.onAction && this.props.onAction(this.props.id)
  }
  render () {
    // const {
    //   title = '应用名称',
    //   desc = '应用描述'
    // } = this.props
    return (
      <div className='app-card'>
        <Row>
          <Col span={8}>
            {
              this.props.icon
                ? <div
                  className='icon-wrap'
                >
                  <img
                    className='icon'
                    src={this.props.icon}
                  />
                </div>
                : <AppIcon />
            }
          </Col>
          <Col span={16}>
            <Row>
              <Col span={24} className='app-title'>
                {this.props.title || '名称'}
              </Col>
            </Row>
            <Row>
              <Col span={24} className='app-desc ellipsis'>
                {this.props.desc || '应用描述12345654321234543'}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='bottom-row'>
          {/* <Col span={3} offset={10}>
            <span
              className='btn-icon-wrap down-load-icon'
              onClick={this.props.onAction}
            >
              <img
                className='mini-icon'
                src={DownLoad}
              />
            </span>
          </Col> */}
          <Col span={5} offset={13} >
            <span
              className='btn-wrap btn-text-wrap down-load-icon'
              onClick={this.onAction}
            >
              {this.props.action || '详情'}
            </span>
          </Col>
          <Col span={3} >
            <span
              className='btn-icon-wrap share-icon'
            >
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
  id: PropTypes.string, // 应用id
  icon: PropTypes.any, // 图片
  title: PropTypes.any, // 名称
  desc: PropTypes.string, // 描述
  action: PropTypes.string, // 动作 -- 下载/详情/开通
  onAction: PropTypes.func // 点击'动作'的回调
}

export default AppCard
