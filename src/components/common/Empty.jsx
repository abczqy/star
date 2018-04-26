/**
 * 暂无数据
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'antd'

class Empty extends React.Component {
  render () {
    let style = {
      'textAlign': 'center',
      'marginBottom': '20px'
    }
    return (
      <div className='empty' style={{...style, ...this.props.style}} >
        <Icon type='meh-o' />
        {this.props.msg || ' 暂无数据'}
      </div>
    )
  }
}

Empty.propTypes = {
  msg: PropTypes.string,
  style: PropTypes.object
}

export default Empty
