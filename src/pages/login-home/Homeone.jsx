/* eslint-disable react/prop-types */
// eslint-disable-next-line react/jsx-no-bind
/**
 * 游客登陆-首页
 */
import React from 'react'
import Slider from 'react-slick'
import { Row, Col, Carousel, Input, Button } from 'antd'
import Config from 'config'
// import { Row, Col, Input, Bu tton } from 'antd'
import { HomeCard } from 'components/home'
import MainBander from './MainBander'
import HomeWebApp from './HomeWebApp'
import HomeSrcLibEcharts from './HomeSrcLibEcharts'
// import SoftMarket from './SoftMarket'
import AppCount from './AppCount'
import HomeNewsAndInfo from './HomeNewsAndInfo'
import Platdata from './Platdata'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { getMessageCaro, getPortalBannerImg, getRecommendApp, getSoftMarketList, getNewsNoticeList, getPublicNoticeList, getAllAppCount } from 'services/portalnew'
import imgBanner from '../../assets/images/login-home/u686.jpg'
import imgAd1 from '../../assets/images/login-home/u700.png'
import imgAd2 from '../../assets/images/login-home/u703.png'
import imgAd3 from '../../assets/images/login-home/u706.png'
import imgAd4 from '../../assets/images/login-home/u711.png'
import webStorage from 'webStorage'
const Search = Input.Search

class Home extends React.Component {
  static propTypes = {
    roleCode: PropTypes.string,
    history: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      bannerBottomImg: [], // 底部轮播图片
      messageCaro: [], // 轮播消息
      roleCode: '', // 角色
      sureDate: [],
      webAppData: [], // 工作台我的应用
      softMarketData: [], // 软件市场重点推荐
      newsData: [], // 新闻列表
      infoData: [], // 信息公开
      appCountData: []// 软件统计
    }
  }

  componentDidMount () {
    // console.log('componentDidMount开始')
    this.setState({
      roleCode: webStorage.getItem('STAR_WEB_ROLE_CODE')
    })
    this.getHomeData()
    // console.log('componentDidMount开始')

    // this.timerID = setInterval(
    //   () => this.messageScroll(),
    //   3000
    // )
  }

  componentWillUnmount () {
    // clearInterval(this.timerID)
  }

  /**
   * 请求页面初始数据
   */
  getHomeData () {
  // 门户首页-工作台我的应用
    getRecommendApp({
      userId: '1'
    }, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data || []
        result.map((item, index) => {
          item.appId = item.APP_ID
          item.appName = item.APP_NAME
          item.apppath = item.APP_LINK
          item.appIcon = item.APP_ICON
        })
        // console.log('工作台我的应用', result)
        // if (result.success) {
        this.setState({
          webAppData: result || []
        })
        // }
      } else {
        // message.warning(response.data.msg || '出现异常')
      }
    })
    // 门户首页-软件市场
    getSoftMarketList({}, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data.content || []
        // console.log('软件市场重点推荐', result)
        this.setState({
          softMarketData: result || []
        })
      } else {
        // message.warning(response.data.msg || '出现异常')
      }
    })
    // 门户首页-教育新闻
    getNewsNoticeList({pageSize: '6', pageNum: '1'}, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data.info || []
        // console.log('教育新闻', result)
        this.setState({
          newsData: result || []
        })
      } else {
        // message.warning(response.data.msg || '出现异常')
      }
    })
    // 门户首页-信息公开
    getPublicNoticeList({pageSize: '6', pageNum: '1'}, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data.info || []
        // console.log('信息公开', result)
        this.setState({
          infoData: result || []
        })
      } else {
        // message.warning(response.data.msg || '出现异常')
      }
    })
    // 门户首页-应用总数统计
    getAllAppCount({}, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data || []
        // console.log('应用总数', result)
        this.setState({
          appCountData: result || []
        })
      } else {
        // message.warning(response.data.msg || '出现异常')
      }
    })
    // 底部轮播图
    getPortalBannerImg({
      bannerType: '2'
    }, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data || []
        // console.log('底部轮播', result)
        this.setState({
          bannerBottomImg: result || []
        })
      } else {
        // message.warning(response.data.msg || '出现异常')
      }
    })
    // 首页轮播消息
    getMessageCaro('string', {
      pageNum: '1'
    }, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data.info || []
        // console.log('消息轮播', result)
        this.setState({
          messageCaro: result || []
        })
      } else {
        // message.warning(response.data.msg || '出现异常')
      }
    })
  }

  handleAfterLogged () {
  // 如果是运营商
    if (this.props.roleCode === 'operator') {
      this.props.history.push({
        pathname: '/software-market-home'
      })
    } else {
      this.props.history.push({
        pathname: '/operate-manage-home'
      })
    }
  }

  handleChangeVisible (key, flag) {
    this.setState({
      [key]: flag
    })
  }

  showSureWin (data) {
    this.setState({
      sureInfoWinVisible: true,
      sureDate: data || []
    })
  }

  updateSureWinData (data) {
    this.setState({
      sureDate: data || []
    })
  }

  render () {
    // console.log('render smData: ', this.state.softMarketData)
    let roleCode = this.state.roleCode
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
      <div className='login-home-container' style={{ background: '#FAFCFF' }}>
        <Row style={{ marginTop: '1%', paddingTop: '1%' }} type='flex' align='middle'>
          <Col span={8} offset={5}>
            <Search
              placeholder='教育'
              enterButton='搜索'
              size='large'
              onSearch={value => console.log(value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={1}>&nbsp;</Col>
          <Col span={1}><a href=''>资源类</a></Col>
          <Col span={1}><a href=''>应用类</a></Col>
          <Col span={1}><a href=''>新闻类</a></Col>
          <Col span={1}><a href=''>信息类</a></Col>
          <Col span={1}><a href=''>最新上架</a></Col>
        </Row>
        <Row style={{ marginTop: '1%' }}>
          <Col span={20} offset={2}>
            <MainBander {...this.props}
              handleChangeVisible={(key, flag) => { this.handleChangeVisible(key, flag) }}
              showSureWin={(data) => { this.showSureWin(data) }}
              handleAfterLogged={(key, flag) => { this.handleChangeVisible(key, flag) }} />
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={2}>
            <div className='message-container'>
              <Carousel vertical autoplay autoplaySpeed='20'>
                {this.state.messageCaro && this.state.messageCaro.map((item, index) => {
                  return <div key={index}>
                    <span className='messageleft' />
                    <div className='messageright'>{item.message.content}</div>
                  </div>
                })}
                {/* <div>
                  <span className='messageleft' />
                  <div className='messageright'>【好消息！中办、国办发文 要提高这群人的待遇】近日，中共中央办公厅、国务院办公厅印发了《关于提高技术工人待遇的意见》</div>
                </div>
                <div>
                  <span className='messageleft' />
                  <div className='messageright'>【好消息！中办、国办发文 要提高这群人的待遇】近日，中共中央办公厅、国务院办公厅印发了《关于提高技术工人待遇的意见》</div>
                </div> */}
              </Carousel>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: '1%' }}>
          <Col span={20} offset={2}>
            <Row type='flex' justify='space-between'>
              <Col style={{ width: '22.25%' }}>
                <HomeCard title={(roleCode === 'school' || roleCode === 'vendor' || roleCode === 'eduBureau') ? '工作台' : '我的空间'}
                  moreUrl='/operate-manage-home/work-plat/home' cardWidth={'100%'} cardBgColor='rgba(5, 187, 246, 1)' titleColor='white'>
                  {roleCode
                    ? <HomeWebApp data={this.state.webAppData || []} />
                    : <div style={{ textAlign: 'center' }}>
                      <div style={{ marginTop: '20%' }}>你好，请先登陆、免费注册</div>
                      <div style={{ marginTop: '20%' }}><Button type='primary'>注册</Button>&nbsp;&nbsp;<Button type='primary'>登陆</Button></div>
                    </div>
                  }
                </HomeCard>
              </Col>
              <Col className='news-info-content' style={{ width: '53.83%' }}>
                <HomeCard title='教育新闻' moreUrl='/home/newsList' cardWidth={'100%'} cardBgColor='rgba(217, 229, 237, 1)' titleColor='black'>
                  {this.state.newsData && this.state.newsData.map((item, index) => {
                    return <HomeNewsAndInfo key={index} changeActiveTab={this.props.changeActiveTab} isNews infoOrNewsData={item || ''} index={index + 1} />
                  })}
                </HomeCard>
              </Col>
              <Col className='news-info-content' style={{ width: '22.25%' }}>
                <HomeCard title='资源库' moreUrl='' cardWidth={'100%'} cardBgColor='rgba(5, 187, 246, 1)' titleColor='white'>
                  <HomeSrcLibEcharts />
                </HomeCard>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: '1%' }}>
          <Col span={20} offset={2}>
            <Row type='flex' justify='space-between'>
              <Col style={{ width: '22.25%' }}>
                <HomeCard title='软件市场' moreUrl='/operate-manage-home/home' cardWidth={'100%'} cardBgColor='rgba(5, 187, 246, 1)' titleColor='white'>
                  <HomeWebApp data={this.state.softMarketData || []} />
                </HomeCard>
              </Col>
              <Col style={{ width: '53.83%' }}>
                <HomeCard title='信息公开' moreUrl='/home/information' cardWidth={'100%'} cardBgColor='rgba(217, 229, 237, 1)' titleColor='black'>
                  {this.state.infoData && this.state.infoData.map((item, index) => {
                    return <HomeNewsAndInfo key={'info-' + index} changeActiveTab={this.props.changeActiveTab} infoOrNewsData={item || ''} index={index + 1} />
                  })}
                </HomeCard>
              </Col>
              <Col style={{ width: '22.25%' }}>
                <HomeCard title='平台数据' moreUrl='' cardWidth={'100%'} cardBgColor='rgba(5, 187, 246, 1)' titleColor='white'>
                  <Platdata />
                </HomeCard>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: '1%' }}>
          <Col span={20} offset={2}>
            <div className='ad-carousel' >
              {/* <Carousel autoplay autoplaySpeed='20' >
                <div><img alt='' src={imgTeacher} width='100%' /></div>
                <div><img alt='' src={imgTeacher} width='100%' /></div>
              </Carousel> */}
              <Slider {...settings}>
                {
                  (this.state.bannerBottomImg instanceof Array) && this.state.bannerBottomImg.map((item, index, arr) => {
                    return item.picUrl ? <img key={index} src={(Config.IMG_BASE_URL + item.picUrl) || ''} style={{height: '530px', width: '100%'}} />
                      : <img key={index} src={imgBanner} style={{height: '530px', width: '100%'}} />
                  })
                }
              </Slider>
            </div>
          </Col>
          <div className='ad-content' >
            <Row style={{
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: '28px',
              color: '#CBFFF0',
              lineHeight: 2
            }}>
              <Col span={24}>
                我省已有&nbsp;&nbsp;<span style={{fontWeight: '500', fontSize: '48px', color: '#FFFFFF'}}>1653</span>&nbsp;&nbsp;所学校开通了智慧校园服务
              </Col>
            </Row>
            <Row style={{
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 2
            }}>
              <Col span={24}>
                仅需1分钟即可开始免费体验智慧校园产品服务
              </Col>
            </Row>
            <Row style={{
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: '14px',
              color: '#FFFFFF',
              lineHeight: 5
            }}>
              <Col span={6}><img src={imgAd1} width='32px' />&nbsp;&nbsp;校园生活一体化</Col>
              <Col span={6}><img src={imgAd2} width='32px' />&nbsp;&nbsp;校园管理职能化</Col>
              <Col span={6}><img src={imgAd4} width='32px' />&nbsp;&nbsp;校园设施数字化</Col>
              <Col span={6}><img src={imgAd3} width='32px' />&nbsp;&nbsp;课堂教学高效化</Col>
            </Row>
            {roleCode
              ? ''
              : <Row style={{marginTop: '18%'}}>
                <Col span={3}>详情咨询<br />Tel：18729910829</Col>
                <Col span={6} offset={15}><Button type='primary' size='large'>开通智慧校园</Button></Col>
              </Row>
            }

          </div>
        </Row>
        <Row style={{ marginTop: '1%' }}>
          <Col span={24}>
            <AppCount data={this.state.appCountData || []} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Home)
