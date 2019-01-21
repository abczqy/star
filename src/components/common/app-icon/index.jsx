/**
 * 应用图标 - 默认图标
 * 1- 一个有背景色的默认图标
 */
import React, {} from 'react'
import PropTypes from 'prop-types'
import './AppIcon.scss'
import AppMore from '../../../assets/images/work-plat/app-more.png'

const AppIcon = (props) => (
  <div
    className='app-icon-wrap'
    style={{
      ...props.wrapStyle
    }}
  >
    <img
      style={{
        ...props.imgStyle
      }}
      src={props.img || AppMore}
    />
  </div>
)

AppIcon.propTypes = {
  wrapStyle: PropTypes.object, // 图标wrap的样式
  imgStyle: PropTypes.object, // 图标的样式
  img: PropTypes.any // 图标
}

export default AppIcon
