/**
 * 暂无数据
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'antd'

class Empty extends React.Component {
  render () {
    let style = {
      'textAlign': 'center'
    }
    return (
      <div className='empty' style={style} >
        <Icon type='meh-o' />
        {this.props.msg || ' 暂无数据'}
      </div>
    )
  }
}

Empty.propTypes = {
  msg: PropTypes.string
}

export default Empty
