/* eslint-disable react/prop-types */
// eslint-disable-next-line react/jsx-no-bind
/**
 * 游客登陆-首页
 */
import React from 'react'
import { Row, Col, Carousel, Input, Button } from 'antd'
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
import { getRecommendApp, getSoftMarketList, getNewsNoticeList, getPublicNoticeList, getAllAppCount } from 'services/portal'
import imgTeacher from '../../assets/images/login-home/u686.jpg'
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
      roleCode: '', // 角色
      sureDate: [],
      webAppData: [], // 热门推荐
      softMarketData: [], // 软件市场
      newsData: [], // 新闻列表
      infoData: [], // 信息公开
      appCountData: []// 软件统计
    }
  }

  componentDidMount () {
    this.setState({
      roleCode: webStorage.getItem('STAR_WEB_ROLE_CODE')
    })
    this.getHomeData()
  }

  /**
   * 请求页面初始数据
   */
  getHomeData () {
    // 门户首页-热门推荐
    getRecommendApp({}, (response) => {
      let result = response.data
      if (result.success) {
        this.setState({
          webAppData: result.data || []
        })
      }
    })
    // 门户首页-软件市场
    getSoftMarketList({}, (response) => {
      let result = response.data
      if (result.success) {
        this.setState({
          softMarketData: result.data || []
        })
      }
    })
    // 门户首页-教育新闻
    getNewsNoticeList({}, (response) => {
      let result = response.data
      this.setState({
        newsData: result.data || []
      })
    })
    // 门户首页-信息公开
    getPublicNoticeList({}, (response) => {
      let result = response.data
      this.setState({
        infoData: result.data || []
      })
    })
    // 门户首页-应用总数统计
    getAllAppCount({}, (response) => {
      let result = response.data
      this.setState({
        appCountData: result.data
      })
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
    let roleCode = this.state.roleCode
    console.log('roleCode')
    console.log(roleCode)
    return (
      <div className='login-home-container' style={{background: '#FAFCFF'}}>
        <Row style={{marginTop: '1%', paddingTop: '1%'}} type='flex' align='middle'>
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
        <Row style={{marginTop: '1%'}}>
          <Col span={20} offset={2}>
            <MainBander {...this.props}
              handleChangeVisible={(key, flag) => { this.handleChangeVisible(key, flag) }}
              showSureWin={(data) => { this.showSureWin(data) }}
              handleAfterLogged={(key, flag) => { this.handleChangeVisible(key, flag) }} />
          </Col>
        </Row>
        <Row style={{marginTop: '1%'}}>
          <Col span={20} offset={2}>
            <Row type='flex' justify='space-between'>
              <Col style={{width: '22.25%'}}>
                <HomeCard title={(roleCode === 'school' || roleCode === 'vendor' || roleCode === 'eduBureau') ? '工作台' : '我的空间'} moreUrl='' cardWidth={'100%'} cardBgColor='rgba(5, 187, 246, 1)' titleColor='white'>
                  {roleCode
                    ? <HomeWebApp data={this.state.webAppData || []} />
                    : <div style={{textAlign: 'center'}}>
                      <div style={{marginTop: '20%'}}>你好，请先登陆、免费注册</div>
                      <div style={{marginTop: '20%'}}><Button type='primary'>注册</Button>&nbsp;&nbsp;<Button type='primary'>登陆</Button></div>
                    </div>
                  }
                </HomeCard>
              </Col>
              <Col style={{width: '53.83%'}}>
                <HomeCard title='教育新闻' moreUrl='' cardWidth={'100%'} cardBgColor='rgba(217, 229, 237, 1)' titleColor='black'>
                  {this.state.newsData && this.state.newsData.map((item, index) => {
                    return <HomeNewsAndInfo key={index} changeActiveTab={this.props.changeActiveTab} isNews infoOrNewsData={item || ''} index={index + 1} />
                  })}
                </HomeCard>
              </Col>
              <Col style={{width: '22.25%'}}>
                <HomeCard title='资源库' moreUrl='' cardWidth={'100%'} cardBgColor='rgba(5, 187, 246, 1)' titleColor='white'>
                  <HomeSrcLibEcharts />
                </HomeCard>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{marginTop: '1%'}}>
          <Col span={20} offset={2}>
            <Row type='flex' justify='space-between'>
              <Col style={{width: '22.25%'}}>
                <HomeCard title='软件市场' moreUrl='' cardWidth={'100%'} cardBgColor='rgba(5, 187, 246, 1)' titleColor='white'>
                  <HomeWebApp data={this.state.softMarketData || []} />
                </HomeCard>
              </Col>
              <Col style={{width: '53.83%'}}>
                <HomeCard title='信息公开' moreUrl='' cardWidth={'100%'} cardBgColor='rgba(217, 229, 237, 1)' titleColor='black'>
                  {this.state.infoData && this.state.infoData.map((item, index) => {
                    return <HomeNewsAndInfo key={'info-' + index} changeActiveTab={this.props.changeActiveTab} infoOrNewsData={item || ''} index={index + 1} />
                  })}
                </HomeCard>
              </Col>
              <Col style={{width: '22.25%'}}>
                <HomeCard title='平台数据' moreUrl='' cardWidth={'100%'} cardBgColor='rgba(5, 187, 246, 1)' titleColor='white'>
                  <Platdata />
                </HomeCard>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{marginTop: '1%'}}>
          <Col span={20} offset={2}>
            <div className='ad-carousel' >
              <Carousel autoplay autoplaySpeed='20' >
                <div><img alt='' src={imgTeacher} width='100%' /></div>
                <div><img alt='' src={imgTeacher} width='100%' /></div>
              </Carousel>
            </div>
          </Col>
        </Row>
        <Row style={{marginTop: '1%'}}>
          <Col span={24}>
            <AppCount data={this.state.appCountData || []} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Home)
