import React, { Component } from 'react'
import { HomepageMaker, BannerMaker, SWMaker } from 'components/software-market'
import './PortalHomepage.scss'

class PortalHomepage extends Component {
  render () {
    return (
      <div className='homepage-wrap'>
        <HomepageMaker
          header={{title: '导航'}}
        />
        <BannerMaker
          header={{title: 'Banner 图'}}
        />
        <SWMaker
          header={{title: '软件市场'}}
          boxTitle='软件'
        />
        <BannerMaker
          header={{title: '平台介绍'}}
        />
      </div>
    )
  }
}

export default PortalHomepage
