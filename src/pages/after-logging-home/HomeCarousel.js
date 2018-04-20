/**
 * 市场分析
 */
import React, { Component } from 'react'
import { Carousel } from 'antd'
import './HomeCarousel.scss'

class HomeCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableDatas: [],
      hotSearchDatas: [],
      currentType: 'teaching',
      changeState: 0
    }
  }

  render () {
    return (
      <div className='home-carousel'>
        <Carousel>
          <div>
            <h3>
              <img style={{width: '100%', height: '360px'}} src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=757275540,2350409923&fm=27&gp=0.jpg' />
            </h3>
          </div>
          <div>
            <h3>
              <img style={{width: '100%', height: '360px'}} src='https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=214132984,1434336132&fm=27&gp=0.jpg' />
            </h3>
          </div>
          <div>
            <h3>
              <img style={{width: '100%', height: '360px'}} src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=925218702,996481670&fm=27&gp=0.jpg' />
            </h3>
          </div>
          <div>
            <h3>
              <img style={{width: '100%', height: '360px'}} src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3127662306,2229390857&fm=27&gp=0.jpg' />
            </h3>
          </div>
        </Carousel>
      </div>
    )
  }
}

export default HomeCarousel
