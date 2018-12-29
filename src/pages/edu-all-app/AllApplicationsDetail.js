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
import {homeCollection} from 'services/software-home/'
import './AllApplicationsDetail.css'
import LimitedInfiniteScroll from 'react-limited-infinite-scroll'
import imgApp from '../../assets/images/work-plat/app-more.png'
class AllApplicationsDetail extends React.Component {
  constructor (props) {
    super(props)
    this.form =
      this.state = {
        allAppListData: [],
        platformAppDataa: [],
        shelfTimeSort: 'desc',
        downloadNum: 'desc',
        appType: 'all'
      }
  }
  static propTypes = {
    // location: PropTypes.object,
    handleShelfTime: PropTypes.func,
    handleDownloadNum: PropTypes.func,
    allAppListData: PropTypes.array,
    platformAppDataa: PropTypes.array
  }
  componentDidMount () {
    // this.getAllAppData()
    // this.getPlatformAppData()
    this.setState({
      allAppListData: this.props.allAppListData,
      platformAppDataa: this.props.platformAppDataa
    })
  }
  componentWillReceiveProps (nextProps) {
    // let a = nextProps.location ? (nextProps.location.search ? nextProps.location.search.replace('?', '') : '') : ''
    this.setState({
      allAppListData: nextProps.allAppListData,
      platformAppDataa: nextProps.platformAppDataa
    })
  }

  // 轮播图左右翻页
  onClickRight = () => {
    this.refs['test'].next()
  }
  onClickLeft = () => {
    this.refs['test'].prev()
  }

  // 处理收藏按钮
  handleCollection = (id, isCollect) => {
    homeCollection({
      sw_id: id,
      type: isCollect === 'false' ? 'collect' : 'cancel'
    }, (res) => {
      // console.log(777777, res.data.result)
      if (res.data.result === 'success') {
        this.getAllAppData()
      }
    }).catch((e) => { console.log(e) })
  }
  loadNextFunc = () => {}
  // 打开按钮页面跳转
  handleChangeJump = (item) => {
    // window.open(item.sw_url)
  }
  render () {
    let total = this.state.allAppListData.length
    const items = this.state.allAppListData && this.state.allAppListData instanceof Array && this.state.allAppListData.map((item, index) => {
      return (
        <div key={index} className='software-application'>
          <dl>
            <dt>
              {item.APP_ICON
                ? <img src={ajaxUrl.IMG_BASE_URL + item.APP_ICON} />
                : <img src={imgApp} style={{backgroundColor: '#1890ff'}} />
              }
            </dt>
            <dd>
              <span>{item.APP_NAME || '应用名称'}</span>
              <p>{item.APP_NOTES || '应用描述'}</p>
            </dd>
          </dl>
          <p style={{float: 'right'}}>
            <Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: item.APP_ID}}>
              {/* <Icon style={{backgroundColor: '#08A1E9', color: '#FFF', width: 20, height: 20, lineHeight: '20px', borderTopLeftRadius: 4, borderBottomLeftRadius: 4}} type='download' /> */}
              <Button style={{width: 60,
                height: 23,
                lineHeight: '23px',
                fontSize: '10px',
                textAlign: 'center',
                borderRadius: '4',
                marginRight: '5px',
                backgroundColor: '#40B3F9',
                border: 0}} type='primary'>
              详情
              </Button>
            </Link>
            <Icon style={{backgroundColor: 'rgb(255, 187, 69)'}} onClick={() => this.handleCollection(item.APP_ID, item.isCollect)} type={item.isCollect === 'false' ? 'star-o' : 'star'} />
            <Icon style={{backgroundColor: 'rgba(255, 109, 74, 1)'}} type={item.isCollect === 'false' ? 'heart-o' : 'heart'} />
            <Icon style={{backgroundColor: 'rgba(78, 203, 115, 1)'}} type={item.isCollect === 'false' ? 'share-alt-o' : 'share-alt'} />
          </p>
        </div>
      )
    })
    return (
      <div className='gundongtiao' style={{ overflow: 'auto', width: 1020, marginLeft: '6%' }}>
        <div>
          <span style={{ fontSize: 20 }}>平台应用</span>
          <div className='all-app-carousel'>
            <div className='all-app-left-arrow' onClick={this.onClickLeft}> &lt; </div>
            <div className='all-app-carousel-detail'>
              <Carousel style={{width: 800}} ref='test'>
                {this.state.platformAppDataa && this.state.platformAppDataa instanceof Array && this.state.platformAppDataa.map((item, index, arr) => {
                  return (
                    <div key={index}>
                      <div>
                        { this.state.platformAppDataa[index] && this.state.platformAppDataa[index] instanceof Array && this.state.platformAppDataa[index].map((item, index, arr) => {
                          return (
                            <dl key={index} className='carousel-detail-item'>
                              <dt>
                                {item.APP_ICON
                                  ? <img src={ajaxUrl.IMG_BASE_URL + item.APP_ICON} />
                                  : <img src={imgApp} style={{backgroundColor: '#1890ff'}} />
                                }
                              </dt>
                              <dd>
                                <span className='name'>{item.APP_NAME}</span>
                                {
                                  item.IS_OPEN !== 1
                                    ? <Button
                                      style={{ height: '26px', lineHeight: '20px' }}
                                      type='primary'>
                                      <Link to={{pathname: '/operate-manage-home/all-app-detail', search: item.APP_ID}}>详情</Link>
                                    </Button>
                                    : <Button
                                      // onClick={this.handleChangeJump(item)}
                                      style={{height: '26px', lineHeight: '20px', backgroundColor: '#7ED321', border: 0}}
                                      className='open'
                                      type='primary'
                                    ><a href={item.APP_LINK} target='_blank'>打开</a></Button>
                                }
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
        <div style={{ marginTop: 10, width: 1019 }}>
          <div>
            <span style={{ fontSize: 20 }}>软件应用</span>
            <p style={{float: 'right', marginTop: '10px'}}>
              <span
                style={{cursor: 'pointer'}}
                onClick={this.props.handleShelfTime}>
            上架时间
              </span>
              <Icon className='arrowhead-rotation' type='swap' />
              <span
                style={{marginLeft: 10, cursor: 'pointer'}}
                onClick={this.props.handleDownloadNum}>
            下载量
              </span>
              <Icon className='arrowhead-rotation' type='swap' /></p>
          </div>
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
