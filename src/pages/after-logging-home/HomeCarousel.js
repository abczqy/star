/**
 * 市场分析
 */
import React, { Component } from 'react'
import { Carousel } from 'antd'
import ajaxUrl from 'config'
import imgBanner from '../../assets/images/software-market/u6372.png'
import {homeCarousel} from 'services/software-home/'
import './HomeCarousel.scss'

class HomeCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      homeCarouselDatas: []
    }
  }
  componentDidMount () {
    this.getCarouselData()
    // var aa = '{aaaa: 111, bbb: 2222}'
    // let bb = JSON.parse(JSON.stringify(aa))
    // eslint-disable-next-line no-eval
    // var bb = eval('(' + aa + ')')
    // aa.replace(/^\[(\D*)]$/, '$1')
  }
  getCarouselData = () => {
    homeCarousel({
      bannerType: 3
    }, (res) => {
      // console.log('软超首页轮播图', res.data.data)
      this.setState({
        homeCarouselDatas: res.data.data || []
      }, () => {
        // console.log(8888888, this.state.homeCarouselDatas)
      })
    }).catch((e) => { console.log(e) })
  }
  render () {
    return (
      <div className='home-carousel'>
        <Carousel>
          {this.state.homeCarouselDatas && this.state.homeCarouselDatas.map((item, index, arr) => {
            return (
              <div key={index}>
                <h3>
                  {item.picUrl ? <img style={{width: '100%', height: '360px'}} src={ajaxUrl.IMG_BASE_URL_V2 + item.picUrl} />
                    : <img style={{width: '100%', height: '360px'}} src={imgBanner} />}

                </h3>
              </div>
            )
          })}
          {/*
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
          </div> */}
        </Carousel>
      </div>
    )
  }
}

export default HomeCarousel
