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
import AppIcon from '../app-icon'
// import AppMore from '../../../assets/images/work-plat/app-more.png'

class LabelIcon extends Component {
  /**
   * 组件点击事件
   */
  onClick = () => {
    // 把应用id返回父组件
    this.props.onClick &&
      this.props.onClick(this.props.id)
  }
  render () {
    return (
      <div
        className='label-icon-wrap'
        onClick={this.onClick}
      >
        {
          this.props.icon
            ? <div
              className='icon-wrap'
              style={{
                ...this.props.style
              }}
            >
              <img
                src={this.props.icon}
                style={{
                  ...this.props.imgStyle
                }}
              />
            </div>
            : <AppIcon />
        }
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
  id: PropTypes.string, // 应用id
  icon: PropTypes.any, // 图标
  label: PropTypes.any, // 标签
  style: PropTypes.object, // Icon的wrap部分的样式 -- 可以进行尺寸和样式的定制
  imgStyle: PropTypes.object, // 图标的样式
  onClick: PropTypes.func // 点击事件
}

export default LabelIcon
