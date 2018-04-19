import React, { Component } from 'react'
import { HomepageMaker } from 'components/software-market'
import './PortalHomepage.scss'

class PortalHomepage extends Component {
  render () {
    return (
      <div className='homepage-wrap'>
        <HomepageMaker
          header={{title: '导航'}}
        />
        <HomepageMaker
          header={{title: 'Banner 图'}}
        />
        <HomepageMaker
          header={{title: '重点推送'}}
        />
        <HomepageMaker
          header={{title: '软件市场'}}
        />
      </div>
    )
  }
}

export default PortalHomepage
