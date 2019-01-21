/**
 * 居中容器组件
 * 1- 子元素在其中会居中显示
 * 2- 居中的兼容性问题在这里统一处理
 * 3- 优先非脱离文档流的方法
 * 4- 该容器尺寸为 100% 100%
 * 5- 后面可以扩展出可以垂直/水平 - 居中/左/右/上/下的内容位置方案
 * 6- 可以为行内块元素和块元素两种 - 可以设置开关量
 * 7- 其实antd的Row/Col有flex的位置方案（不过flex布局有浏览器兼容问题）
 *     不过这个组件保留 后面做一些兼容性较好的方案补充进来
 * 版本：
 * v1 - 简单的水平居中
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Align.scss'

class Align extends Component {
  render () {
    return (
      <div className='middle-wrap'>
        <div>
          { this.props.children || '' }
        </div>
      </div>
    )
  }
}

Align.propTypes = {
  children: PropTypes.any
}

export default Align
