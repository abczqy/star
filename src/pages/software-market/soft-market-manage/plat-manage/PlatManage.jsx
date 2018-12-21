/**
 * 软件超市-平台管理
 */
import React, { Component } from 'react'
import { HomepageMaker, BannerMaker, SWMaker, KeyPush } from 'components/software-market'
import './PlatManage.scss'

class PlatManage extends Component {
  render () {
    return (
      <div className='homepage-wrap'>
        <HomepageMaker
          header={{title: '导航'}}
        />
        <BannerMaker
          header={{title: 'Banner 图'}}
        />
        <KeyPush
          header={{title: '重点推送'}}
          boxTitle='推送'
        />
        <SWMaker
          header={{title: '软件市场'}}
          boxTitle='软件'
        />
      </div>
    )
  }
}

export default PlatManage