/**
 *  这是个占位用的添加小方块的+
 *  功能是点击后会出现一个可编辑的小框
 */
import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import './HomepageAdd.scss'

class HomepageAdd extends Component {
  render () {
    const {onAdd} = this.props
    return (
      <div className='add-wrap'>
        <div className='add-content-wrap' onClick={onAdd}>
          <span>
            +  添加
          </span>
        </div>
      </div>
    )
  }
}

HomepageAdd.propTypes = {
  onAdd: PropsTypes.func
}

export default HomepageAdd
