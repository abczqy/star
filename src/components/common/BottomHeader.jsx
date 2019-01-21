/**
 * 页面底部信息栏
 */
import React from 'react'
import './bottom.scss'

export default class BottomHeader extends React.Component {
  render () {
    return (
      <div className='bottom-header'>
        <p>福建省教育厅主办 技术运营支持： 福建省星云大数据应用服务有限公司</p>
        <p>Copyright©2016 fjedu.nebedu.cn All rights reserved     闽ICP备17018531号-2</p>
      </div>
    )
  }
}
