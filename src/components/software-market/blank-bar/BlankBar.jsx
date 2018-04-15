/**
 * 做一个用来撑开元素间距离的
 * 高度可定制，由父组件通过props传进来
 * 目前先支持水平撑开
 * 增长点：prop-types的使用
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BlankBar extends Component {
  getHeight = () => (this.props.height || '25px')

  render() {
    return <div style={{ width: '100%', height: this.getHeight() }} />
  }
}


BlankBar.propTypes = {
  height: PropTypes.string
}

export default BlankBar