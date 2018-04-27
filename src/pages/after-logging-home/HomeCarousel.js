/**
 * 市场分析
 */
import React, { Component } from 'react'
import { Carousel } from 'antd'
import ajaxUrl from 'config'
import axios from 'axios'
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
    axios.get(ajaxUrl.homeCarousel, {
    }).then((res) => {
      this.setState({
        homeCarouselDatas: res.data.list
      }, () => {
        console.log(8888888, this.state.homeCarouselDatas)
      })
    }).catch((e) => { console.log(e) })
  }
  render () {
    return (
      <div className='home-carousel'>
        <Carousel>
          {this.state.homeCarouselDatas.map((item, index, arr) => {
            return (
              <div key={index}>
                <h3>
                  <img style={{width: '100%', height: '360px'}} src={ajaxUrl.IMG_BASE_URL + '/' + item.BANNER_URL} />
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
