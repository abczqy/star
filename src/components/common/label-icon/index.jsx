/**
 * 上图下标的小组件
 * 1- 实验 - 父组件class可以写入
 * 2- 内置两种默认的样式： 图是圆形 或者 圆角方块（默认）
 * 3- 目前位置暂时为：上图下标 -- 后续可以增量开发
 * 4- 应用的背景色 -- 可以根据应用的类别（作下标）来选择
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './LabelIcon.scss'
import AppMore from '../../../assets/images/work-plat/app-more.png'

class LabelIcon extends Component {
  render () {
    return (
      <div
        className='label-icon-wrap'
        onClick={this.props.onClick}
      >
        <div
          className='icon-wrap'
          style={{
            ...this.props.style
          }}
        >
          <img
            src={this.props.icon || AppMore}
          />
        </div>
        {
          this.props.label &&
          <span className='label'>
            { this.props.label || '' }
          </span>
        }
      </div>
    )
  }
}

LabelIcon.propTypes = {
  icon: PropTypes.any, // 图标
  label: PropTypes.any, // 标签
  style: PropTypes.object, // Icon部分的样式 -- 可以进行尺寸和样式的定制
  onClick: PropTypes.func // 点击事件
}

export default LabelIcon
