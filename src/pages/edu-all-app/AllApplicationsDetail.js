/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import { Carousel, Button, Icon } from 'antd'
import ajaxUrl from 'config'
// import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {allAppList, allAppPlatformList} from 'services/all-app/'
import {homeCollection} from 'services/software-home/'
import './AllApplicationsDetail.css'
import LimitedInfiniteScroll from 'react-limited-infinite-scroll'
class AllApplicationsDetail extends React.Component {
  constructor (props) {
    super(props)
    this.form =
      this.state = {
        allAppListData: [],
        platformAppData: [],
        platformAppDataa: [],
        page0: [],
        page1: [],
        page2: [],
        page3: [],
        page4: [],
        shelfTimeSort: 'desc',
        downloadNum: 'desc',
        appType: 'all',
        collectionType: 'cancel'
      }
  }
  static propTypes = {
    location: PropTypes.abj
  }
  componentDidMount () {
    this.getAllAppData()
    this.getPlatformAppData()
  }
  componentWillReceiveProps (nextProps) {
    let a = nextProps.location.search.replace('?', '')
    this.setState({
      appType: a
    }, () => {
      this.getAllAppData()
      this.getPlatformAppData()
    })
  }
  // 获取软件应用数据
  getAllAppData = () => {
    allAppList({
      appType: this.state.appType === '' ? 'all' : this.state.appType,
      timeOrd: this.state.shelfTimeSort,
      numOrd: this.state.downloadNum
    }, (res) => {
      this.setState({
        allAppListData: res.data.data
      })
    }).catch((e) => { console.log(e) })
  }
  // 获取平台应用数据
  getPlatformAppData = () => {
    allAppPlatformList({
    }, (res) => {
      this.setState({
        platformAppData: res.data.data
      }, () => {
        this.state.platformAppDataa = []
        for (let i in this.state.platformAppData) {
          this.state.platformAppDataa.push(this.state.platformAppData[i])
        }
      })
    }).catch((e) => { console.log(e) })
  }
  // 轮播图左右翻页
  onClickRight = () => {
    this.refs['test'].next()
  }
  onClickLeft = () => {
    this.refs['test'].prev()
  }
  // 上架时间处理
  handleShelfTime = () => {
    if (this.state.shelfTimeSort === 'desc') {
      this.setState({
        shelfTimeSort: 'asc'
      }, () => {
        this.getAllAppData()
      })
    } else {
      this.setState({
        shelfTimeSort: 'desc'
      }, () => {
        this.getAllAppData()
      })
    }
  }
  // 下载量处理
  handleDownloadNum = () => {
    if (this.state.downloadNum === 'desc') {
      this.setState({
        downloadNum: 'asc'
      }, () => {
        this.getAllAppData()
      })
    } else {
      this.setState({
        downloadNum: 'desc'
      }, () => {
        this.getAllAppData()
      })
    }
  }
  // 处理收藏按钮
  handleCollection = (id) => {
    if (this.state.collectionType === 'cancel') {
      this.setState({
        collectionType: 'collect'
      }, () => {
        this.postCollection(id)
      })
    } else {
      this.setState({
        collectionType: 'cancel'
      }, () => {
        this.postCollection(id)
      })
    }
  }
  // 发送收藏按钮请求
  postCollection = (id) => {
    homeCollection({
      sw_id: id,
      type: this.state.collectionType
    }, (res) => {
    }).catch((e) => { console.log(e) })
  }
  loadNextFunc = () => {}
  // 打开按钮页面跳转
  handleChangeJump = (item) => {
    window.open(item.sw_url)
  }
  render () {
    let total = this.state.allAppListData.length
    const items = this.state.allAppListData.map((item, index) => {
      return (
        <div key={index} className='software-application'>
          <dl>
            <dt><img src={ajaxUrl.IMG_BASE_URL + item.SW_ICON} /></dt>
            <dd>
              <span>{item.SW_NAME}</span>
              <p>{item.SW_DESC}</p>
            </dd>
          </dl>
          <p style={{float: 'right'}}><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: item.SW_ID}}><Icon style={{backgroundColor: '#08A1E9', color: '#FFF', width: 20, height: 20, lineHeight: '20px', borderTopLeftRadius: 4, borderBottomLeftRadius: 4}} type='download' /><Button style={{width: 60, height: 20, lineHeight: '18px', fontSize: '10px', textAlign: 'center', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 4, borderTopRightRadius: 4, backgroundColor: '#40B3F9', border: 0}} type='primary'>下载</Button></Link><Icon style={{width: 20, height: 20, backgroundColor: '#FFBB45', lineHeight: '20px', color: '#fff', marginLeft: '10px', cursor: 'pointer', marginRight: '5px'}} onClick={() => this.handleCollection(item.SW_ID)} type='star-o' /></p>
        </div>
      )
    })
    return (
      <div className='gundongtiao' style={{ width: 1000, marginLeft: '6%' }}>
        <div>
          <span style={{ fontSize: 20 }}>平台应用</span>
          <div className='all-app-carousel'>
            <div className='all-app-left-arrow' onClick={this.onClickLeft}> &lt; </div>
            <div className='all-app-carousel-detail'>
              <Carousel style={{width: 800}} ref='test'>
                {this.state.platformAppDataa.map((item, index, arr) => {
                  return (
                    <div key={index}>
                      <div>
                        { this.state.platformAppDataa[index].map((item, index, arr) => {
                          let a = { height: '26px', lineHeight: '20px' }
                          let b = { height: '26px', lineHeight: '20px' }
                          if (item.isOpen === 'true') {
                            a = { height: '26px', lineHeight: '20px', display: 'none' }
                            b = { height: '26px', lineHeight: '20px', marginLeft: '16px', backgroundColor: '#7ED321', display: 'block' }
                          } else {
                            a = { height: '26px', lineHeight: '20px', marginLeft: '16px', display: 'block' }
                            b = { height: '26px', lineHeight: '20px', display: 'none' }
                          }
                          return (
                            <dl key={index} className='carousel-detail-item'>
                              <dt>
                                <img src={ajaxUrl.IMG_BASE_URL + item.SW_ICON} />
                              </dt>
                              <dd>
                                <span>{item.SW_NAME}</span>
                                <Button style={a} type='primary'><Link to={{pathname: '/operate-manage-home/all-app-detail', search: item.SW_ID}}>开通</Link></Button>
                                <Button onClick={this.handleChangeJump(item)} style={b} type='primary'>打开</Button>
                              </dd>
                            </dl>
                          )
                        }) }
                      </div>
                    </div>
                  )
                })}
              </Carousel>
            </div>
            <div className='all-app-right-arrow' onClick={this.onClickRight}> &gt; </div>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <p>
            <span style={{ fontSize: 20 }}>软件应用</span>
            <p style={{float: 'right', marginTop: '10px'}}><span style={{cursor: 'pointer'}} onClick={this.handleShelfTime}>上架时间</span><Icon className='arrowhead-rotation' type='swap' /><span style={{marginLeft: 10, cursor: 'pointer'}} onClick={this.handleDownloadNum}>下载量</span><Icon className='arrowhead-rotation' type='swap' /></p>
          </p>
          <div style={{overflow: 'auto', height: 550, width: 1020}}>
            <LimitedInfiniteScroll
              limit={5}
              pageStart={0}
              hasMore={total === undefined || items.length < total}
              spinLoader={<div className='loader'>Loading...</div>}
              mannualLoader={<span style={{fontSize: 20, lineHeight: 1.5, marginTop: 20, marginBottom: 20, display: 'inline-block'}}>Load More</span>}
              // noMore={<div className='loader'>No More Items</div>}
              loadNext={this.loadNextFunc}>
              {items}
            </LimitedInfiniteScroll>
          </div>
        </div>
      </div>
    )
  }
}
export default AllApplicationsDetail
