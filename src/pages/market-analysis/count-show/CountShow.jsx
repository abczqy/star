/**
 * 下载数量条状展示
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CountShow.scss'

class CountShow extends Component {
  render () {
    let color = '#A9AFCB'
    let { index } = this.props
    switch (index) {
      case 1:
        color = '#F00'
        break
      case 2:
        color = '#F60'
        break
      case 3:
        color = '#00A4F7'
        break
      default:
        color = '#A9AFCB'
        break
    }
    let styleObj = {
      width: `${this.props.percent}%`,
      background: color
    }
    return (
      <div className='count-show'>
        <div className='count' style={styleObj} />
      </div>
    )
  }
}

CountShow.propTypes = {
  percent: PropTypes.number,
  index: PropTypes.number
}

export default CountShow
