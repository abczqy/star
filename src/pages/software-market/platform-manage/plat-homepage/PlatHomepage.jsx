import React, { Component } from 'react'
import { BannerMaker, HotPush } from 'components/software-market'
import './PlatHomepage.scss'

class PlatHomepage extends Component {
  render () {
    return (
      <div className='homepage-wrap'>
        <BannerMaker
          header={{title: 'Banner 图'}}
        />
        <HotPush
          header={{title: '热门推荐'}}
          boxTitle='推送'
        />
      </div>
    )
  }
}

export default PlatHomepage
