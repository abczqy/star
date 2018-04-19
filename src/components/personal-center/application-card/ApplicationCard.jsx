/**
 * 应用卡片
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Badge, Icon } from 'antd'
import './ApplicationCard.scss'

class ApplicationCard extends Component {
  render () {
    return (
      <div className='application-card'>
        {/* 分享 */}
        {
          this.props.share && (
            <span className='share'>
              <Icon type='export' />
            </span>
          )
        }
        {/* 应用图标 */}
        <Badge dot={this.props.update} >
          <span className='appLogo'>
            <img src={this.props.content.sw_icon} alt='' />
          </span>
        </Badge>
        {/* 应用文字介绍 */}
        <div className='info'>
          <div className='name'>{this.props.content.sw_name}</div>
          <div className='description ellipsis'>{this.props.content.sw_desc}</div>
        </div>
        {/* 更新 */}
        {
          this.props.update && (
            <div className='update'>
              <button>更新</button>
            </div>
          )
        }
        {/* 下载 */}
        {
          this.props.download && (
            <div className='download opt-box'>
              {
                this.props.collection && (
                  <span className='collection plr6'>
                    <Icon type='star-o' />
                  </span>
                )
              }
              <span>
                <Icon type='download' className='plr6' />
                <span className='plr6'>下载</span>
              </span>
            </div>
          )
        }
        {/* 打开 */}
        {
          this.props.open && (
            <div className='open opt-box'>
              {
                this.props.collection && (
                  <span className='collection plr6'>
                    <Icon type='star-o' />
                  </span>
                )
              }
              <span className='plr6' >
                打开
              </span>
            </div>
          )
        }
      </div>
    )
  }
}

ApplicationCard.propTypes = {
  content: PropTypes.object,
  share: PropTypes.bool,
  update: PropTypes.bool,
  download: PropTypes.bool,
  open: PropTypes.bool,
  collection: PropTypes.bool
}

export default ApplicationCard
