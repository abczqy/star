/**
 * 公共组件-星云v2-Page
 * 1- 一个用来统一/定制页面的padding/loadding和底色等的容器组件
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Page.scss'

class Page extends Component {
  render () {
    const {
      backgroundColor = '#f4f4f4',
      paddingTop = '10px',
      paddingRight = '10px',
      paddingBottom = '10px',
      paddingLeft = '10px'
    } = this.props
    return (
      <div
        className='page-wrap'
        style={{
          backgroundColor,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft
        }}
      >
        { this.props.children }
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.any, // 子元素
  backgroundColor: PropTypes.string, // 背景色
  paddingTop: PropTypes.string, // 上填充/边距
  paddingRight: PropTypes.string, // 右填充/边距
  paddingBottom: PropTypes.string, // 下填充/边距
  paddingLeft: PropTypes.string // 左填充/边距
}

export default Page
