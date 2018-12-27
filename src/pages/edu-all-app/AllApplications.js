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
import { Link } from 'react-router-dom'
import allApp from '../../assets/images/all-app/u2835.jpg'
import {Logged} from 'components/common/hoc/Logged'
import { Route } from 'react-router'
import AllApplicationsDetail from 'pages/edu-all-app/AllApplicationsDetail'
import {getAppType, allAppList, allAppPlatformList} from 'services/all-app/'
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
      menuData: [] // 存全部应用的分类
    }
  }
  static propTypes = {
    // location: PropTypes.object,
    allAppListData: PropTypes.array,
    platformAppDataa: PropTypes.array
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

    // 获取软件应用数据
    allAppList({
      appType: '0'
    }, (res) => {
      // console.log('获取软件应用数据', res.data.data.data)
      this.setState({
        allAppListData: res.data.data.data || []
      })
    }).catch((e) => { console.log(e) })

    // 获取平台应用数据
    allAppPlatformList({
    }, (res) => {
      // console.log('获取平台应用数据', res.data)
      this.setState({
        platformAppData: res.data.data || []
      }, () => {
        this.state.platformAppDataa = []
        for (let i in this.state.platformAppData) {
          this.state.platformAppDataa.push(this.state.platformAppData[i])
        }
      })
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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode={this.state.mode}
              theme={this.state.theme}
            >
              {this.state.menuData && this.state.menuData.map((item, index) => {
                return <Menu.Item key={index} style={{height: 60, lineHeight: '60px', fontSize: 16}}>
                  <Link to={'/operate-manage-home/all-app/all-app?' + item.APP_TYPE_ID || ''}>{item.APP_TYPE_NAME || '无'}</Link>
                </Menu.Item>
              })}
            </Menu>
          </Sider>
          <Layout style={{minHeight: '800px', _height: '800px', width: '80%'}}>
            <Content>
              <Route path='/operate-manage-home/all-app/all-app' render={() => {
                // eslint-disable-next-line react/jsx-no-undef
                return <LAllApplicationsDetail allAppListData={this.state.allAppListData} platformAppDataa={this.state.platformAppDataa} />
              }} />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
