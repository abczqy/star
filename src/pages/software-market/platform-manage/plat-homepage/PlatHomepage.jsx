import React, { Component } from 'react'
import { HomepageMaker } from 'components/software-market'
import './PlatHomepage.scss'

class PlatHomepage extends Component {
  render () {
    return (
      <div className='homepage-wrap'>
        <HomepageMaker
          header={{title: 'Banner 图'}}
        />
        <HomepageMaker
          header={{title: '热门推荐'}}
        />
      </div>
    )
  }
}

export default PlatHomepage
