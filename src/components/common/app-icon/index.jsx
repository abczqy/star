/**
 * 应用图标 - 默认图标
 * 1- 一个有背景色的默认图标
 */
import React, {} from 'react'
import './AppIcon.scss'
import AppMore from '../../../assets/images/work-plat/app-more.png'

const AppIcon = (props) => (
  <div
    className='app-icon-wrap'
  >
    <img
      src={AppMore}
    />
  </div>
)

export default AppIcon
