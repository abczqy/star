/**
 * 市场分析
 */
import React, { Component } from 'react'
import Slider from 'react-slick'
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
  componentWillMount () {
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
    const sliderProps = {
      dots: true,
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      arrows: false
    }
    return (
      <div className='home-carousel'>
        {this.state.homeCarouselDatas && <Slider {...sliderProps}>
          {this.state.homeCarouselDatas.map((item, index, arr) => {
            return (
              <div key={index}>
                <h3>
                  {item.picUrl ? <img style={{width: '100%', height: '360px'}} src={ajaxUrl.IMG_BASE_URL_V2 + item.picUrl} />
                    : <img style={{width: '100%', height: '360px'}} src={imgBanner} />}
                </h3>
              </div>
            )
          })}
        </Slider>}
      </div>
    )
  }
}

export default HomeCarousel
