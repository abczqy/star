// eslint-disable-next-line react/jsx-no-bind
/**
 * 游客登陆-首页
 */
import React from 'react'
import { Row, Col } from 'antd'
import MainBander from './MainBander'
import WebApp from './WebApp'
import SoftMarket from './SoftMarket'
import AppCount from './AppCount'
import NewsAndInfo from './NewsAndInfo'
import SureInfoWin from './SureInfoWin'
import ChangeInfoWin from './ChangeInfoWin'
import ChangeInfoOkWin from './ChangeInfoOkWin'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
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
      changeInfoOkWinVisible: false,
      sureInfoWinVisible: false,
      changeInfoWinVisible: false,
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
      this.setState({
        webAppData: result.data
      })
    })
    // 门户首页-软件市场
    getSoftMarketList({}, (response) => {
      let result = response.data
      this.setState({
        softMarketData: result.data
      })
    })
    // 门户首页-教育新闻
    getNewsNoticeList({}, (response) => {
      let result = response.data
      this.setState({
        newsData: result.data
      })
    })
    // 门户首页-信息公开
    getPublicNoticeList({}, (response) => {
      let result = response.data
      this.setState({
        infoData: result.data
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

  handleInfoOk () {
    this.setState({
      changeInfoWinVisible: true,
      sureInfoWinVisible: false
    })
  }

  handleChangeInfoOk () {
    this.setState({
      changeInfoOkWinVisible: true,
      changeInfoWinVisible: false
    })
  }

  handleBack () {
    this.setState({
      changeInfoWinVisible: false,
      sureInfoWinVisible: true
    })
  }

  render () {
    return (
      <div className='login-home-container'>
        <Row>
          <Col span={24}>
            <MainBander {...this.props}
              handleChangeVisible={(key, flag) => { this.handleChangeVisible(key, flag) }}
              showSureWin={(data) => { this.showSureWin(data) }}
              handleAfterLogged={(key, flag) => { this.handleChangeVisible(key, flag) }} />
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
          <WebApp data={this.state.webAppData || []} />
        </Row>
        <Row>
          <SoftMarket data={this.state.softMarketData || []} />
        </Row>
        <Row>
          <Col span={24}>
            <div className='center-banner' />
          </Col>
        </Row>
        <Row style={{background: 'white'}}>
          <Col span={24}>
            <NewsAndInfo infoData={this.state.infoData || []} newsData={this.state.newsData || []} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <AppCount data={this.state.appCountData || []} />
          </Col>
        </Row>
        <ChangeInfoOkWin visible={this.state.changeInfoOkWinVisible}
          handleChangeVisible={(key, flag) => { this.handleChangeVisible(key, flag) }}
          handleClose={() => { this.handleChangeVisible('changeInfoOkWinVisible', false) }}
        />
        <SureInfoWin visible={this.state.sureInfoWinVisible} data={this.state.sureDate}
          handleChangeVisible={(key, flag) => { this.handleChangeVisible(key, flag) }}
          handleClose={() => { this.handleChangeVisible('sureInfoWinVisible', false) }}
          handleInfoOk={() => { this.handleInfoOk() }} />
        <ChangeInfoWin visible={this.state.changeInfoWinVisible}
          handleClose={() => { this.handleChangeVisible('changeInfoWinVisible', false) }}
          handleChangeVisible={(key, flag) => { this.handleChangeVisible(key, flag) }}
          handleBack={() => { this.handleBack() }}
          handleChangeInfoOk={() => { this.handleChangeInfoOk() }}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  roleCode: state.role.code,
  isLogged: state.role.isLogged
})

const mapDispatchToProps = dispatch => ({
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))
