/**
 * 上图下标的小组件
 * 1- 实验 - 父组件class可以写入
 * 2- 内置两种默认的样式： 图是圆形 或者 圆角方块（默认）
 * 3- 目前位置暂时为：上图下标 -- 后续可以增量开发
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './LabelIcon.scss'
import AppMore from '../../../assets/images/work-plat/app-more.png'

class LabelIcon extends Component {
  render () {
    return (
      <div className='label-icon-wrap' >
        <div className='icon-wrap'>
          <img
            className='icon'
            src={this.props.icon || AppMore}
          />
        </div>
        {
          this.props.label &&
          <span className='label'>
            { this.props.label }
          </span>
        }
      </div>
    )
  }
}

LabelIcon.propTypes = {
  icon: PropTypes.any, // 图标
  label: PropTypes.any // 标签
}

export default LabelIcon
