import React, { Component } from 'react'
import { Icon, Button } from 'antd'
import PropsTypes from 'prop-types'
import './HomepageManageBar.scss'

class HomepageManageBar extends Component {
  /**
   * bar-left的部分阻止默认的“展开”事件冒泡
   */

  onCancel = (e) => {
    e.stopPropagation()
  }
  render () {
    const { title, expand, addpage, click } = this.props
    return (
      <div className='bar-wrap'>
        <span className='bar-left' onClick={this.onCancel}>
          <span>{title}</span>
          {expand ? <Button onClick={click} className='bar-btn2-right'>撤销修改</Button> : ''}
          {expand ? <Button className='bar-btn1-right' type='primary' onClick={addpage}>保存</Button> : ''}
        </span>
        <span className='bar-right' ><Icon type={expand ? 'up' : 'down'} />{expand ? '收起' : '展开'}</span>
      </div>
    )
  }
}

HomepageManageBar.propTypes = {
  title: PropsTypes.string,
  expand: PropsTypes.bool,
  addpage: PropsTypes.func,
  click: PropsTypes.func
}

export default HomepageManageBar
