/**
 * 软件市场首页
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Tabs, Rate, message, Row, Col, Input } from 'antd'
import webStorage from 'webStorage'
import ajaxUrl from 'config'
import { getSoftMarketList } from 'services/portalnew'
import {newAppRankingList, manufacturerSignInRankingList, teacherRecommend, homeCollection, homeCancelCollection} from 'services/software-home'
import HomeCarousel from './HomeCarousel'
import './TeacherHome.scss'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import imgApp from '../../assets/images/work-plat/app-more.png'
const TabPane = Tabs.TabPane
const Search = Input.Search
class TeacherHome extends Component {
  static propTypes = {
    history: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      tableDatas: [],
      hotSearchDatas: [],
      currentType: 'teaching',
      obj: {
        display: 'none'
      },
      rankingData: [],
      rankingNewAppData: [],
      rankingType: 0,
      rankingDataSplice: [],
      teacherData: [],
      hotData: [],
      teacherMoreNum: 8,
      hotMoreNum: 8,
      collectionType: 'cancel',
      downloadIcon: {
        display: ''
      },
      downloadButton: {
        display: ''
      },
      openButton: {
        display: ''
      },
      openUpButton: {
        display: ''
      },
      jump: '/operate-manage-home/all-app-detail-third',
      aaa: '开通'
    }
  }
  componentDidMount () {
    // console.log('teacherhome~~~~~~')
    // 学生 老师 家长才显示教师推荐
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents' || webStorage.getItem('STAR_WEB_ROLE_CODE') === 'students') {
      this.setState({
        obj: {
          display: 'block'
        }
      })
      this.getTeacherData()
    }
    this.getRankingData()
    this.getHotData()
  }
  // componentWillMount () {

  // }
  // 获取排行榜数据
  getRankingData = (activeKey) => {
    manufacturerSignInRankingList({
      num: 10,
      chartType: activeKey === '1' ? 0 : 1
    }, (res) => {
      if (res.data.code === 200) {
        // console.log('下载排行', res.data.data.content)
        this.setState({
          rankingData: res.data.data.content || []
        }, () => {
        })
      } else {
        // message.warning(res.data.msg || '出现异常')
      }
    }).catch((e) => { console.log(e) })

    newAppRankingList({
      // num: 10,
      // chartType: activeKey === '1' ? 0 : 1
    }, (res) => {
      if (res.data.code === 200) {
        // console.log('新应用排行', res.data.data.data)
        this.setState({
          rankingNewAppData: res.data.data.data || []
        }, () => {
        })
      } else {
        // message.warning(res.data.msg || '出现异常')
      }
    }).catch((e) => { console.log(e) })
  }
  // 排行榜获取数据
  handleRanking = (activeKey) => {
    this.getRankingData(activeKey)
  }
  // 获取老师推荐数据
  getTeacherData = () => {
    teacherRecommend({
      pageSize: this.state.teacherMoreNum
      // teacherId: '1'
    }, (res) => {
      if (res.data.code === 200) {
        // console.log('教师推荐', res.data.data.data)
        this.setState({
          teacherData: res.data.data.data
        })
      } else {
        // message.warning(res.data.msg || '出现异常')
      }
    }).catch((e) => { console.log(e) })
  }
  // 获取热门推荐数据
  getHotData = () => {
    getSoftMarketList({}, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data.content || []
        this.setState({
          hotData: result || []
        })
      } else {
        // message.warning(response.data.msg || '出现异常')
      }
    })
    /* hotRecommend({
      pageNum: '1',
      pageSize: this.state.hotMoreNum
    }, (res) => {
      if (res.data.code === 200) {
        console.log('热门推荐', res.data.data)
        this.setState({
          hotData: res.data.data || []
        })
      } else {
        // message.warning(res.data.msg || '出现异常')
      }
    }).catch((e) => { console.log(e) }) */
  }
  // 处理老师推荐的更多按钮
  handleTeacherMore = () => {
    let pageNum = this.state.teacherMoreNum + 8
    this.setState({
      teacherMoreNum: pageNum
    }, () => {
      this.getTeacherData()
    })
  }
  // 处理热门推荐的更多按钮
  handleHotMor = () => {
    let pageNum = this.state.hotMoreNum + 8
    this.setState({
      hotMoreNum: pageNum
    }, () => {
      this.getHotData()
    })
  }
  // 处理收藏按钮
  handleCollection = (id, isCollect, e) => {
    let node = e.currentTarget
    if (isCollect === '1') {
      homeCancelCollection({
        appId: id + ''
      }, (res) => {
        if (res.data.code === 200) {
          node.style.background = 'rgba(255, 109, 74, 1)'
          message.success('取消收藏成功')
          // 学生 老师 家长才显示教师推荐
          if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents' || webStorage.getItem('STAR_WEB_ROLE_CODE') === 'students') {
            this.getTeacherData()
          }
          this.getHotData()
        } else {
          message.warning(res.data.msg || '出现异常')
        }
      }).catch((e) => { console.log(e) })
    } else {
      homeCollection({
        appId: id
      }, (res) => {
        if (res.data.code === 200) {
          node.style.background = 'red'
          message.success('收藏成功')
          // console.log('收藏按钮：', res.data.msg)
          // 学生 老师 家长才显示教师推荐
          if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents' || webStorage.getItem('STAR_WEB_ROLE_CODE') === 'students') {
            this.getTeacherData()
          }
          this.getHotData()
        } else {
          message.warning(res.data.msg || '出现异常')
        }
      }).catch((e) => { console.log(e) })
    }
  }

  // 经典或者下载排行
  handleRankingappSource = (item, index) => {
    let b = {}

    if (index === 0) {
      b = {backgroundColor: '#CC9900'}
    } else if (index === 1) {
      b = {backgroundColor: '#FF9933'}
    } else if (index === 2) {
      b = {backgroundColor: '#FFCC33'}
    } else {
      b = {backgroundColor: '#33CCFF'}
    }
    return (
      <div className='lista' key={index}>
        <div className='lista-title'>
          <span className='title-num' style={b}>{index + 1}</span>
          <span className='title-detaila'>{item.APP_NAME}</span>
          <div className='app-install'>
            <dl className='app-install-dl'>
              <dt className='app-install-dt'>
                {item.APP_ICON
                  ? <img style={{width: '100%', height: '100%'}} src={ajaxUrl.IMG_BASE_URL_V2 + item.APP_ICON} />
                  : <img style={{width: '100%', height: '100%', backgroundColor: '#1890ff'}} src={imgApp} />
                }
              </dt>
              <dd className='app-install-dd'>
                <p className='download-num'>下载次数： {item.DOWNLOAD || '0'}</p>
                <Rate disabled value={item.SW_STAR || 10} />
              </dd>
            </dl>
            <Button type='primary' className='install-button' onClick={() => { this.handleBtnClick(item) }}>{this.getBtnText(item)}</Button>
          </div>
        </div>
      </div>
    )
  }
  // 新应用排行
  handleRankingNewApp = (item, index) => {
    let b = {}

    if (index === 0) {
      b = {backgroundColor: '#CC9900'}
    } else if (index === 1) {
      b = {backgroundColor: '#FF9933'}
    } else if (index === 2) {
      b = {backgroundColor: '#FFCC33'}
    } else {
      b = {backgroundColor: '#33CCFF'}
    }
    return (
      <div className='lista' key={index}>
        <div className='lista-title'>
          <span className='title-num' style={b}>{index + 1}</span>
          <span className='title-detaila'>{item.APP_NAME || '无'}</span>
          <div className='app-install'>
            <dl className='app-install-dl'>
              <dt className='app-install-dt'>
                {item.APP_ICON
                  ? <img style={{width: '100%', height: '100%'}} src={ajaxUrl.IMG_BASE_URL_V2 + item.APP_ICON} />
                  : <img style={{width: '100%', height: '100%', backgroundColor: '#1890ff'}} src={imgApp} />
                }
              </dt>
              <dd className='app-install-dd'>
                <p className='download-num'>下载次数： {item.DOWNLOAD || '0'}</p>
                <Rate disabled value={item.SW_STAR || 10} />
              </dd>
            </dl>
            <Button type='primary' className='install-button' onClick={() => { this.handleBtnClick(item) }}>{this.getBtnText(item)}</Button>
          </div>
        </div>
      </div>
    )
  }

  handleBtnClick (item) {
    if (item.APP_SOURCE === 'pt' && item.IS_OPEN === '1') {
      window.open(item.APP_LINK || '')
    } else {
      this.props.history.push({
        pathname: '/operate-manage-home/all-app-detail-third',
        search: item.APP_ID
      })
    }
  }
  getBtnText (item) {
    if (item.APP_SOURCE === 'pt' && item.IS_OPEN === '1') {
      return '打开'
    } else {
      return '安装'
    }
  }
  // 老师推荐
  handleTeacherappSource = (item, index) => {
    return (
      <div key={index} className='list'>
        <dl className='list-item'>
          <dt className='dl-dt'>
            {item.APP_ICON
              ? <img style={{width: '100%', height: '100%', backgroundColor: '#1890ff'}} src={ajaxUrl.IMG_BASE_URL_V2 + item.APP_ICON} />
              : <img style={{width: '100%', height: '100%', backgroundColor: '#1890ff'}} src={imgApp} /> }
          </dt>
          <dd className='dl-dd'>
            <span className='dd-title'>{item.APP_NAME || '软件名称'}</span>
            <p className='dd-p'>{item.APP_NOTES || '软件描述'}</p>
          </dd>
        </dl>
        <p style={{float: 'right'}}>
          {item.APP_SOURCE === 'pt' && item.IS_OPEN === '1'
            ? <Button className='openUpButton' type='primary'>
              <a href={item.APP_LINK} target='_blank'>打开</a>
            </Button>
            : <Button className='openButton' type='primary'>
              <Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: item.APP_ID}}>详情</Link>
            </Button>}
          <Icon style={{backgroundColor: 'rgb(255, 187, 69)'}}
            type='heart' />
          <Icon style={{backgroundColor: 'rgba(255, 109, 74, 1)'}}
            onClick={(e) => this.handleCollection(item.APP_ID, item.IS_COLLECT, e)}
            type='star' theme={item.IS_COLLECT === '1' ? 'filled' : ''} />
          <Icon style={{backgroundColor: 'rgba(78, 203, 115, 1)'}} type='share-alt' />
        </p>
      </div>
    )
  }
  handleTeacherOpen = (item) => {
    window.open(item.sw_url)
  }
  // 热门推荐
  handleHotRecomappSource = (item, index) => {
    return (
      <div key={index} className='list'>
        <dl className='list-item'>
          <dt className='dl-dt'>
            {item.appIcon
              ? <img style={{width: '100%', height: '100%', backgroundColor: '#fff'}} src={ajaxUrl.IMG_BASE_URL_V2 + item.appIcon} />
              : <img style={{width: '100%', height: '100%', backgroundColor: '#fff'}} src={imgApp} /> }
          </dt>
          <dd className='dl-dd'>
            <span className='dd-title'>{item.APP_NAME || '软件名称'}</span>
            <p className='dd-p'>{item.APP_NOTES || '软件描述'}</p>
          </dd>
        </dl>
        <p style={{float: 'right'}}>
          {item.APP_SOURCE === 'pt' && item.IS_OPEN === '1'
            ? <Button className='openUpButton' type='primary'>
              <a href={item.APP_LINK} target='_blank'>打开</a>
            </Button>
            : <Button className='openButton' type='primary'>
              <Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: item.appId}}>详情</Link>
            </Button>}
          <Icon style={{backgroundColor: 'rgb(255, 187, 69)'}}
            type='heart' />
          <Icon style={{backgroundColor: 'rgba(255, 109, 74, 1)'}}
            onClick={(e) => this.handleCollection(item.appId, item.IS_COLLECT, e)}
            type='star' theme={item.IS_COLLECT === '1' ? 'filled' : ''} />
          <Icon style={{backgroundColor: 'rgba(78, 203, 115, 1)'}} type='share-alt' />
        </p>
      </div>
    )
  }
  // handleHotOpen = (item) => {
  //   window.open(item.sw_url)
  // }
  render () {
    return (
      <div className='logged-home'>
        <HomeCarousel />
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
        <div className='logged-home-recommendation'>
          <div className='logged-home-border'>
            <div className='popular-recommendation'>
              <div className='popular-recommendation-title'>
                <h3 className='chinese'>热门推荐</h3>
                <span className='english'>Hot recommendation</span>
                <span className='more' onClick={this.handleHotMor}>加载更多>></span>
                {/* <span className='more'>
                  <Link to={{pathname: '/operate-manage-home/all-app/all-app'}}>更多 > ></Link>
                </span> */}
              </div>
              <div className='popular-recommendation-item'>
                {this.state.hotData && this.state.hotData instanceof Array && this.state.hotData.map((item, index, arr) => {
                  return this.handleHotRecomappSource(item, index)
                })}
              </div>
              <div className='popular-recommendation' style={this.state.obj}>
                <div className='popular-recommendation-title'>
                  <h3 className='chinese'>老师推荐</h3>
                  <span className='english'>Teacher recommendation</span>
                  <span className='more' onClick={this.handleTeacherMore}>加载更多>></span>
                  {/* <span className='more'>
                    <Link to={{pathname: '/operate-manage-home/all-app/all-app'}}>更多 > ></Link>
                  </span> */}
                </div>
                <div className='popular-recommendation-item'>
                  {this.state.teacherData && this.state.teacherData instanceof Array && this.state.teacherData.map((item, index, arr) => {
                    return this.handleTeacherappSource(item, index)
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='ranking'>
            <div className='ranking-title'>
              <h3 className='title-detail'>排行榜</h3>
              <span className='english'>Ranking</span>
            </div>
            <Tabs style={{width: '100%'}} type='card' onChange={this.handleRanking}>
              <TabPane tab='新应用' key='1'>
                {this.state.rankingNewAppData && this.state.rankingNewAppData instanceof Array && this.state.rankingNewAppData.map((item, index, arr) => {
                  return this.handleRankingNewApp(item, index)
                })}
              </TabPane>
              <TabPane tab='经典排行' key='2'>
                {this.state.rankingData && this.state.rankingData instanceof Array && this.state.rankingData.map((item, index, arr) => {
                  return this.handleRankingappSource(item, index)
                })}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(TeacherHome)
