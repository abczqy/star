/* eslint-disable react/prop-types */
// eslint-disable-next-line react/jsx-no-bind
/**
 * 游客登陆-首页
 */
import React from 'react'
import { Row, Col } from 'antd'
import HomeCard from 'components/common/home/HomeCard'
import MainBander from './MainBander'
import HomeWebApp from './HomeWebApp'
import HomeSrcLibEcharts from './HomeSrcLibEcharts'
// import SoftMarket from './SoftMarket'
import AppCount from './AppCount'
import HomeNewsAndInfo from './HomeNewsAndInfo'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { getRecommendApp, getSoftMarketList, getNewsNoticeList, getPublicNoticeList, getAllAppCount } from 'services/portal'

class Home extends React.Component {
  static propTypes = {
    roleCode: PropTypes.string,
    history: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      sureDate: [],
      webAppData: [], // 热门推荐
      softMarketData: [], // 软件市场
      newsData: [], // 新闻列表
      infoData: [], // 信息公开
      appCountData: []// 软件统计
    }
  }

  componentDidMount () {
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
    return (
      <div className='login-home-container' style={{background: '#FAFCFF'}}>
        <Row>
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
                <HomeCard title='我的空间' moreUrl='' cardWidth={'100%'} cardBgColor='rgba(5, 187, 246, 1)' titleColor='white'>
                  <HomeWebApp data={this.state.webAppData || []} />
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
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </HomeCard>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <AppCount data={this.state.appCountData || []} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Home)
