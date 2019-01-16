/**
 * 软件超市-平台管理
 */
import React, { Component } from 'react'
import { HomepageMaker, BannerMaker, KeyPush } from 'components/software-market'
import './PlatManage.scss'

class PlatManage extends Component {
  render () {
    return (
      <div className='homepage-wrap'>
        <HomepageMaker
          header={{title: '导航'}}
        />
        <BannerMaker
          header={{title: 'Banner 图', from: '软件超市'}}
        />
        <KeyPush
          header={{title: '热门推荐'}}
          boxTitle='推荐'
        />
      </div>
    )
  }
}

export default PlatManage
