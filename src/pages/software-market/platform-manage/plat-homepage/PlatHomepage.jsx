import React, { Component } from 'react'
import { BannerMaker } from 'components/software-market'
import './PlatHomepage.scss'

class PlatHomepage extends Component {
  render () {
    return (
      <div className='homepage-wrap'>
        <BannerMaker
          header={{title: 'Banner 图'}}
        />
        <BannerMaker
          header={{title: '热门推荐'}}
        />
      </div>
    )
  }
}

export default PlatHomepage
