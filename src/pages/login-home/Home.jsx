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
import SureInfoWin from './SureInfoWin'
import ChangeInfoWin from './ChangeInfoWin'
import ChangeInfoOkWin from './ChangeInfoOkWin'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
      webAppData: [],
      softMarketData: [],
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
    }, () => {
      this.handleAfterLogged()
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
            <MainBander showSureWin={(data) => { this.showSureWin(data) }}
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
  roleCode: state.role.code
})

const mapDispatchToProps = dispatch => ({
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))
