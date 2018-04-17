/**
 * 游客登陆-首页
 */
import React from 'react'
import { Row, Col } from 'antd'
import MainBander from './MainBander'
import WebApp from './WebApp'
import SoftMarket from './SoftMarket'
import BottomHeader from '../../components/common/BottomHeader'
import AppCount from './AppCount'
import NewsAndInfo from './NewsAndInfo'
import axiosApi from '../../services'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      webAppData: [],
      softMarketData: [{

      }],
      newsAndInfoData: {
        newsData: [],
        infoData: []
      },
      appCountData: []
    }
  }

  componentDidMount () {
    this.getHomeData()
  }

  /**
   * 请求页面初始数据
   */
  getHomeData () {
    axiosApi.getHomeData((response) => {
      this.setState({
        webAppData: response.webAppData,
        softMarketData: response.softMarketData,
        newsAndInfoData: response.newsAndInfoData,
        appCountData: response.appCountData
      })
    })
  }

  render () {
    return (
      <div className='login-home-container'>
        <Row>
          <Col span={24}>
            <MainBander />
            <div className='home-title-container'>
              <div style={{marginBottom: '30px', height: '50px'}}>
                <div className='title-logo' />
                <div className='title-split' />
                <div style={{
                  float: 'left',
                  fontFamily: "'PingFangSC-Regular', 'PingFang SC'",
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '26px',
                  color: '#FFFFFF'}}>教育平台</div>
              </div>
              <div className='title-hori-split' />
              <div>
                <span className='title-content-bottom'>百年大计  教育为本</span>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{background: '#FAFCFF'}}>
          <WebApp data={this.state.webAppData} />
        </Row>
        <Row>
          <SoftMarket data={this.state.softMarketData} />
        </Row>
        <Row>
          <Col span={24}>
            <div className='center-banner' />
          </Col>
        </Row>
        <Row style={{background: 'white'}}>
          <Col span={24}>
            <NewsAndInfo data={this.state.newsAndInfoData} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <AppCount data={this.state.appCountData} />
          </Col>
        </Row>
        <Row>
          <BottomHeader />
        </Row>
      </div>
    )
  }
}
