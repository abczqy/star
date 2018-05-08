/**
 * 软件市场首页
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Tabs, Rate } from 'antd'
import webStorage from 'webStorage'
import ajaxUrl from 'config'
import {manufacturerSignInRankingList, teacherRecommend, hotRecommend, homeCollection} from 'services/software-home/'
import HomeCarousel from './HomeCarousel'
import './TeacherHome.scss'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
const TabPane = Tabs.TabPane
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
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents' || webStorage.getItem('STAR_WEB_ROLE_CODE') === 'students' || webStorage.getItem('STAR_WEB_ROLE_CODE') === 'teacher') {
      this.setState({
        obj: {
          display: 'block'
        }
      })
    }
    this.getRankingData()
    this.getTeacherData()
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
      this.setState({
        rankingData: res.data.data
      }, () => {
      })
    }).catch((e) => { console.log(e) })
  }
  // 排行榜获取数据
  handleRanking = (activeKey) => {
    this.getRankingData(activeKey)
  }
  // 获取老师推荐数据
  getTeacherData = () => {
    teacherRecommend({
      num: this.state.teacherMoreNum
    }, (res) => {
      this.setState({
        teacherData: res.data.list
      })
    }).catch((e) => { console.log(e) })
  }
  // 获取热门推荐数据
  getHotData = () => {
    hotRecommend({
      num: this.state.hotMoreNum
    }, (res) => {
      this.setState({
        hotData: res.data.data
      })
    }).catch((e) => { console.log(e) })
  }
  // 处理老师推荐的更多按钮
  handleTeacherMore = () => {
    this.setState({
      teacherMoreNum: 16
    }, () => {
      this.getTeacherData()
    })
  }
  // 处理热门推荐的更多按钮
  handleHotMor = () => {
    this.setState({
      hotMoreNum: 16
    }, () => {
      this.getHotData()
    })
  }
  // 处理收藏按钮
  handleCollection = (id, isCollect) => {
    homeCollection({
      sw_id: id,
      type: isCollect === 'false' ? 'collect' : 'cancel'
    }, (res) => {
      console.log(777777, res.data.result)
      if (res.data.result === 'success') {
        this.getTeacherData()
        this.getHotData()
      }
    }).catch((e) => { console.log(e) })
  }

  handleRankingIsSelfSupport = (item, index) => {
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
          <span className='title-detaila'>{item.SW_NAME}</span>
          <div className='app-install'>
            <dl className='app-install-dl'>
              <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={ajaxUrl.IMG_BASE_URL + item.SW_ICON} /></dt>
              <dd className='app-install-dd'>
                <p className='download-num'>下载次数： {item.SW_DOWNLOADS}</p>
                <Rate disabled value={item.SW_STAR} />
              </dd>
            </dl>
            <Button type='primary' className='install-button' onClick={() => { this.handleBtnClick(item) }}>{this.getBtnText(item)}</Button>
          </div>
        </div>
      </div>
    )
  }

  handleBtnClick (item) {
    console.log(2222222, item)
    if (item.isSelfSupport === 'false') {
      this.props.history.push({
        pathname: '/operate-manage-home/all-app-detail-third',
        search: item.SW_ID
      })
    } else {
      if (item.isSelfSupport === 'true' && item.isOpen === 'true') {
        window.open(item.sw_url)
      } else {
        this.props.history.push({
          pathname: '/operate-manage-home/all-app-detail',
          search: item.SW_ID
        })
      }
    }
  }
  getBtnText (item) {
    if (item.isSelfSupport === 'false') {
      return '安装'
    } else {
      if (item.isSelfSupport === 'true' && item.isOpen === 'true') {
        return '打开'
      } else {
        return '开通'
      }
    }
  }
  // 老师推荐
  handleTeacherIsSelfSupport = (item, index) => {
    let jump = ''
    if (item.isSelfSupport === 'false') {
      jump = '/operate-manage-home/all-app-detail-third'
    } else {
      if (item.isSelfSupport === 'true' && item.isOpen === 'true') {
      } else {
        jump = '/operate-manage-home/all-app-detail'
      }
    }
    return (
      <div key={index} className='list'>
        <dl className='list-item'>
          <dt className='dl-dt'><img style={{width: '100%', height: '100%'}} src={ajaxUrl.IMG_BASE_URL + item.SW_ICON} /></dt>
          <dd className='dl-dd'>
            <span className='dd-title'>{item.SW_NAME}</span>
            <p className='dd-p'>{item.SW_DESC}</p>
          </dd>
        </dl>
        <p style={{float: 'right'}}>
          {item.isSelfSupport === 'false' ? <Icon className='downloadIcon' type='download' /> : null}
          {item.isSelfSupport === 'false' ? <Button className='downloadButton' type='primary'><Link to={{pathname: jump, search: item.SW_ID}}>下载</Link></Button> : null}
          {item.isSelfSupport === 'true' && item.isOpen === 'false' ? <Button className='openButton' type='primary'><Link to={{pathname: jump, search: item.SW_ID}}>开通</Link></Button> : null}
          {item.isSelfSupport === 'true' && item.isOpen === 'true' ? <Button className='openUpButton' type='primary'><a href={item.sw_url} target='_blank'>打开</a></Button> : null}
          <Icon style={{width: 20, height: 20, backgroundColor: '#FFBB45', lineHeight: '20px', color: '#fff', marginLeft: '10px', cursor: 'pointer', marginRight: '5px'}} onClick={() => this.handleCollection(item.SW_ID, item.isCollect)} type={item.isCollect === 'false' ? 'star-o' : 'star'} />
        </p>
      </div>
    )
  }
  handleTeacherOpen = (item) => {
    window.open(item.sw_url)
  }
  // 热门推荐
  handleHotRecomIsSelfSupport = (item, index) => {
    let jumpa = ''
    if (item.isSelfSupport === 'false') {
      jumpa = '/operate-manage-home/all-app-detail-third'
    } else {
      if (item.isSelfSupport === 'true' && item.isOpen === 'true') {
      } else {
        jumpa = '/operate-manage-home/all-app-detail'
      }
    }
    return (
      <div key={index} className='list'>
        <dl className='list-item'>
          <dt className='dl-dt'><img style={{width: '100%', height: '100%'}} src={ajaxUrl.IMG_BASE_URL + item.SW_ICON} /></dt>
          <dd className='dl-dd'>
            <span className='dd-title'>{item.SW_NAME}</span>
            <p className='dd-p'>{item.SW_DESC}</p>
          </dd>
        </dl>
        <p style={{float: 'right'}}>
          {item.isSelfSupport === 'false' ? <Icon className='downloadIcon' type='download' /> : null}
          {item.isSelfSupport === 'false' ? <Button className='downloadButton' type='primary'><Link to={{pathname: jumpa, search: item.SW_ID}}>下载</Link></Button> : null}
          {item.isSelfSupport === 'true' && item.isOpen === 'false' ? <Button className='openButton' type='primary'><Link to={{pathname: jumpa, search: item.SW_ID}}>开通</Link></Button> : null}
          {item.isSelfSupport === 'true' && item.isOpen === 'true' ? <Button className='openUpButton' type='primary'><a href={item.sw_url} target='_blank'>打开</a></Button> : null}
          <Icon style={{width: 20, height: 20, backgroundColor: '#FFBB45', lineHeight: '20px', color: '#fff', marginLeft: '10px', cursor: 'pointer', marginRight: '5px'}} onClick={() => this.handleCollection(item.SW_ID, item.isCollect)} type={item.isCollect === 'false' ? 'star-o' : 'star'} />
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
        <div className='logged-home-recommendation'>
          <div className='logged-home-border'>
            <div className='popular-recommendation' style={this.state.obj}>
              <div className='popular-recommendation-title'>
                <h3 className='chinese'>老师推荐</h3>
                <span className='english'>Teacher recommendation</span>
                <span className='more' onClick={this.handleTeacherMore}>更多 > ></span>
              </div>
              <div className='popular-recommendation-item'>
                {this.state.teacherData && this.state.teacherData.map((item, index, arr) => {
                  return this.handleTeacherIsSelfSupport(item, index)
                })}
              </div>
            </div>
            <div className='popular-recommendation'>
              <div className='popular-recommendation-title'>
                <h3 className='chinese'>热门推荐</h3>
                <span className='english'>Hot recommendation</span>
                <span className='more' onClick={this.handleHotMor}>更多 > ></span>
              </div>
              <div className='popular-recommendation-item'>
                {this.state.hotData && this.state.hotData.map((item, index, arr) => {
                  return this.handleHotRecomIsSelfSupport(item, index)
                })}
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
                {this.state.rankingData && this.state.rankingData.map((item, index, arr) => {
                  return this.handleRankingIsSelfSupport(item, index)
                })}
              </TabPane>
              <TabPane tab='经典排行' key='2'>
                {this.state.rankingData && this.state.rankingData.map((item, index, arr) => {
                  return this.handleRankingIsSelfSupport(item, index)
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
