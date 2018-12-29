/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import Slider from 'react-slick'
import Config from 'config'
import { Layout, Menu, Row, Col, Input } from 'antd'
import PropTypes from 'prop-types'
// import { renderRoutes } from 'react-router-config'
// import { Link } from 'react-router-dom'
import allApp from '../../assets/images/all-app/u2835.jpg'
import {Logged} from 'components/common/hoc/Logged'
import { Route } from 'react-router'
import AllApplicationsDetail from 'pages/edu-all-app/AllApplicationsDetail'
import {getAppType, allAppList} from 'services/all-app/'
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
    // console.log('上架时间')
    if (this.state.shelfTimeSort === 'desc') {
      this.setState({
        shelfTimeSort: 'asc'
      }, () => {
        // 获取软件应用数据
        this.getAppListRj({
          sort: 'asc',
          orderType: 'time',
          appType: this.state.key
        })
        // // 获取平台应用
        // this.getAppListPt({
        //   sort: 'asc',
        //   orderType: 'time',
        //   appType: this.state.key,
        //   platformType: 'pt'
        // })
      })
    } else {
      this.setState({
        shelfTimeSort: 'desc'
      }, () => {
        // 获取软件应用数据
        this.getAppListRj({
          sort: 'desc',
          orderType: 'time',
          appType: this.state.key
        })
        // // 获取平台应用
        // this.getAppListPt({
        //   sort: 'desc',
        //   orderType: 'time',
        //   appType: this.state.key,
        //   platformType: 'pt'
        // })
      })
    }
  }
  // 下载量处理
  handleDownloadNum = () => {
    // console.log('下载量')
    if (this.state.downloadNum === 'desc') {
      this.setState({
        downloadNum: 'asc'
      }, () => {
        // 获取软件应用数据
        this.getAppListRj({
          sort: 'asc',
          orderType: 'download',
          appType: this.state.key
        })
        // // 获取平台应用
        // this.getAppListPt({
        //   sort: 'asc',
        //   orderType: 'download',
        //   appType: this.state.key,
        //   platformType: 'pt'
        // })
      })
    } else {
      this.setState({
        downloadNum: 'desc'
      }, () => {
        // 获取软件应用数据
        this.getAppListRj({
          sort: 'desc',
          orderType: 'download',
          appType: this.state.key
        })
        // // 获取平台应用
        // this.getAppListPt({
        //   sort: 'desc',
        //   orderType: 'download',
        //   appType: this.state.key,
        //   platformType: 'pt'
        // })
      })
    }
  }
  // 获取软件应用数据
  getAppListRj = (params) => {
    allAppList(params, (res) => {
      // console.log('获取软件应用数据', res.data.data.data)
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
        appType: key
      })
      // 获取平台应用
      this.getAppListPt({
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
        console.log('getPortalBannerImg全部应用轮播图异常:', response.data.msg)
      }
    })

    // 获取全部软件应用数据 appType platformType 默认是软件应用
    this.getAppListRj()
    // 获取全部平台应用
    this.getAppListPt({
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
        console.log('getAppType出现异常:', response.data.msg || '')
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
          <Col span={1}><a href=''>资源类</a></Col>
          <Col span={1}><a href=''>应用类</a></Col>
          <Col span={1}><a href=''>最新上架</a></Col>
        </Row>
        <div className='img-slider-container' style={{width: '100%', height: '242px', marginTop: '1%'}}>
          <Slider {...settings}>
            {
              (this.state.bannerBottomImg instanceof Array) && this.state.bannerBottomImg.map((item, index, arr) => {
                return item.picUrl
                  ? <img key={index} src={(Config.IMG_BASE_URL + item.picUrl) || ''} />
                  : <img key={index} src={allApp} />
              })
            }
            {/* <img src={allApp} style={{height: '100%'}} /> */}
          </Slider>
          {/* <img style={{width: '100%', height: '100%'}} src={allApp} /> */}
        </div>
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
                  allAppListData={this.state.allAppListData} platformAppDataa={this.state.platformAppDataa}
                  handleDownloadNum={this.handleDownloadNum}
                  handleShelfTime={this.handleShelfTime} />
              }} />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
