/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import Slider from 'react-slick'
import Config from 'config'
import { Layout, Menu, Row, Col, Input, message } from 'antd'
import PropTypes from 'prop-types'
// import { renderRoutes } from 'react-router-config'
// import { Link } from 'react-router-dom'
import allApp from '../../assets/images/all-app/u2835.jpg'
import {Logged} from 'components/common/hoc/Logged'
import { Route } from 'react-router'
import AllApplicationsDetail from 'pages/edu-all-app/AllApplicationsDetail'
import {getAppType, allAppList} from 'services/all-app/'
import {homeCollection, homeCancelCollection} from 'services/software-home/'
import {getPortalBannerImg} from 'services/portalnew/'
import './AllApplications.css'
const Search = Input.Search
const { Sider, Content } = Layout
let LAllApplicationsDetail = Logged(AllApplicationsDetail)

export default class AllApplications extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      allAppListData: [],
      platformAppDataa: [],
      mode: 'inline',
      theme: 'light',
      shelfTimeSort: 'desc',
      downloadNum: 'decsc',
      key: '0',
      currentPage: 1,
      totalCountPt: 0,
      pageSizeRj: 1000,
      menuData: [] // 存全部应用的分类
    }
  }
  static propTypes = {
    // location: PropTypes.object,
    allAppListData: PropTypes.array,
    platformAppDataa: PropTypes.array
  }
  // 上架时间处理
  handleShelfTime = () => {
    console.log('上架时间')
    if (this.state.shelfTimeSort === 'desc') {
      this.setState({
        shelfTimeSort: 'asc'
      }, () => {
        // 获取软件应用数据
        this.getAppListRj({
          pageSize: this.state.pageSizeRj,
          sort: 'asc',
          orderType: 'time',
          appType: this.state.key
        })
      })
    } else {
      this.setState({
        shelfTimeSort: 'desc'
      }, () => {
        // 获取软件应用数据
        this.getAppListRj({
          pageSize: this.state.pageSizeRj,
          sort: 'desc',
          orderType: 'time',
          appType: this.state.key
        })
      })
    }
  }
  // 轮播图左右翻页-向右
  onClickRight = () => {
    let page = this.state.currentPage + 1
    if (this.state.currentPage * 6 < this.state.totalCountPt) {
      this.setState({
        currentPage: page
      }, () => {
        // 获取平台应用
        this.getAppListPt({
          pageNum: this.state.currentPage,
          pageSize: 6,
          appType: this.state.key,
          platformType: 'pt'
        })
      })
    } else {
      message.warning('没有更多数据')
    }
  }
  // 轮播图左右翻页-向左
  onClickLeft = () => {
    let page = this.state.currentPage - 1
    if (page > 0) {
      this.setState({
        currentPage: page
      }, () => {
        // 获取平台应用
        this.getAppListPt({
          pageNum: this.state.currentPage,
          pageSize: 6,
          appType: this.state.key,
          platformType: 'pt'
        })
      })
    } else {
      message.warning('没有更多数据')
    }
  }
  // 处理收藏按钮
  handleCollection = (id, isCollect) => {
    console.log('收藏和取消收藏')
    if (isCollect === '1') {
      homeCancelCollection({
        appId: id + ''
      }, (res) => {
        if (res.data.code === 200) {
          message.success('收藏成功')
          // 获取软件应用数据
          this.getAppListRj({
            pageSize: this.state.pageSizeRj,
            appType: this.state.key
          })
        } else {
          message.warning(res.data.msg || '出现异常')
        }
      }).catch((e) => { console.log(e) })
    } else {
      homeCollection({
        appId: id
      }, (res) => {
        if (res.data.code === 200) {
          message.success('取消收藏成功')
          // 获取软件应用数据
          this.getAppListRj({
            appType: this.state.key
          })
        } else {
          message.warning(res.data.msg || '出现异常')
        }
      }).catch((e) => { console.log(e) })
    }
  }

  // 下载量处理
  handleDownloadNum = () => {
    console.log('下载量')
    if (this.state.downloadNum === 'desc') {
      this.setState({
        downloadNum: 'asc'
      }, () => {
        // 获取软件应用数据
        this.getAppListRj({
          pageSize: this.state.pageSizeRj,
          sort: 'asc',
          orderType: 'download',
          appType: this.state.key
        })
      })
    } else {
      this.setState({
        downloadNum: 'desc'
      }, () => {
        // 获取软件应用数据
        this.getAppListRj({
          pageSize: this.state.pageSizeRj,
          sort: 'desc',
          orderType: 'download',
          appType: this.state.key
        })
      })
    }
  }
  // 获取软件应用数据
  getAppListRj = (params) => {
    allAppList(params, (res) => {
      console.log('获取软件应用数据', params)
      this.setState({
        allAppListData: res.data.data.data || []
      })
    }).catch((e) => { console.log(e) })
  }
  // 获取平台应用数据
  getAppListPt = (params) => {
    allAppList(params, (res) => {
      // console.log('获取平台应用数据', res.data.data.data)
      var result = []
      for (var i = 0; i < res.data.data.data.length; i += 6) {
        result.push(res.data.data.data.slice(i, i + 6))
      }
      // console.log('获取平台应用数据---转化', result)
      this.setState({
        totalCountPt: res.data.data.totalCount || 0,
        platformAppDataa: result || []
      })
    }).catch((e) => { console.log(e) })
  }
  // 获取分类对应的平台应用和软件应用
  getTypeData = ({ item, key, keyPath }) => {
    // console.log('选中', key)
    this.setState({
      key: key
    }, () => {
      // 获取软件应用数据
      this.getAppListRj({
        pageSize: this.state.pageSizeRj,
        appType: key
      })
      // 获取平台应用
      this.getAppListPt({
        pageNum: this.state.currentPage,
        pageSize: 6,
        appType: key,
        platformType: 'pt'
      })
    })
  }

  componentDidMount () {
    // 获取全部应用页面的轮播图
    getPortalBannerImg({
      bannerType: '4'
    }, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data || []
        // console.log('全部应用页面轮播', result)
        this.setState({
          bannerBottomImg: result || []
        })
      } else {
        // message.warning(response.data.msg || '出现异常')
        // console.log('getPortalBannerImg全部应用轮播图异常:', response.data.msg)
      }
    })

    // 获取全部软件应用数据 appType platformType 默认是软件应用
    this.getAppListRj({
      pageSize: this.state.pageSizeRj
    })
    // 获取全部平台应用
    this.getAppListPt({
      pageNum: this.state.currentPage,
      pageSize: 6,
      platformType: 'pt'
    })

    // 获取应用分类
    getAppType({}, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data
        // console.log('获取应用分类', result)
        this.setState({
          menuData: result || []
        })
      } else {
        // console.log('getAppType出现异常:', response.data.msg || '')
      }
    }).catch((e) => { console.log(e) })
  }

  render () {
    var settings = {
      dots: false, // 下侧省略号
      infinite: true,
      speed: 500,
      arrows: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
      <div>
        <div className='img-slider-container' style={{width: '100%', height: '242px'}}>
          <Slider {...settings}>
            {
              (this.state.bannerBottomImg instanceof Array) && this.state.bannerBottomImg.map((item, index, arr) => {
                return item.picUrl
                  ? <img key={index} src={(Config.IMG_BASE_URL_V2 + item.picUrl) || ''} />
                  : <img key={index} src={allApp} />
              })
            }
            {/* <img src={allApp} style={{height: '100%'}} /> */}
          </Slider>
          {/* <img style={{width: '100%', height: '100%'}} src={allApp} /> */}
        </div>
        <Row style={{ marginTop: '1%', paddingTop: '1%' }} type='flex' align='middle'>
          <Col span={8} offset={5}>
            <Search
              placeholder='应用'
              enterButton='搜索'
              size='large'
              onSearch={value => console.log(value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={1}>&nbsp;</Col>
          <Col span={1}>资源类</Col>
          <Col span={1}>应用类</Col>
          <Col span={1}>最新上架</Col>
        </Row>
        <Layout style={{marginLeft: '10%', marginTop: '20px'}}>
          <Sider >
            <Menu
              style={{ width: 256, height: 800, textAlign: 'center', border: 0, boxShadow: '2px 2px 5px #999' }}
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['sub1']}
              mode={this.state.mode}
              theme={this.state.theme}
              onClick={this.getTypeData}
            >
              {this.state.menuData && this.state.menuData.map((item, index) => {
                return <Menu.Item key={item.APP_TYPE_ID || 0}
                  style={{height: 60, lineHeight: '60px', fontSize: 16}}>
                  {item.APP_TYPE_NAME || '无'}
                </Menu.Item>
              })}
            </Menu>
          </Sider>
          <Layout style={{minHeight: '800px', _height: '800px', width: '80%'}}>
            <Content>
              <Route path='/operate-manage-home/all-app/all-app' render={() => {
                // eslint-disable-next-line react/jsx-no-undef
                return <LAllApplicationsDetail
                  handleCollection={this.handleCollection}
                  allAppListData={this.state.allAppListData}
                  platformAppDataa={this.state.platformAppDataa}
                  handleDownloadNum={this.handleDownloadNum}
                  handleShelfTime={this.handleShelfTime}
                  onClickLeft={this.onClickLeft}
                  onClickRight={this.onClickRight} />
              }} />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
