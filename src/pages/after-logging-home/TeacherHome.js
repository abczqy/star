/**
 * 软件市场首页
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Tabs, Rate } from 'antd'
import webStorage from 'webStorage'
import ajaxUrl from 'config'
import axios from 'axios'
import PropTypes from 'prop-types'
import HomeCarousel from './HomeCarousel'
import { connect } from 'react-redux'
import './TeacherHome.scss'
const TabPane = Tabs.TabPane
class TeacherHome extends Component {
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
      collectionType: 'cancel'
    }
  }
  componentDidMount () {
    if (this.props.roleCode === 'teacher' || this.props.roleCode === 'students') {
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
  getRankingData = () => {
    axios.post(ajaxUrl.manufacturerSignInRankingList, {
      num: 10,
      chartType: this.state.rankingType
    }).then((res) => {
      this.setState({
        rankingData: res.data.data
      }, () => {
        let newArr = []
        for (var i = 0; i < this.state.rankingData.length; i++) {
          newArr.push(this.state.rankingData[i])
        }
        newArr.splice(0, 3)
        this.setState({
          rankingDataSplice: newArr
        })
      })
    }).catch((e) => { console.log(e) })
  }
  // 排行榜获取数据
  handleRanking = (activeKey) => {
    if (activeKey === 1) {
      console.log(activeKey)
      this.setState({
        rankingType: 0
      }, () => {
        this.getRankingData()
      })
    }
    if (activeKey === 2) {
      console.log(activeKey)
      this.setState({
        rankingType: 1
      }, () => {
        this.getRankingData()
      })
    }
  }
  // 获取老师推荐数据
  getTeacherData = () => {
    axios.post(ajaxUrl.teacherRecommend, {
      num: this.state.teacherMoreNum
    }).then((res) => {
      this.setState({
        teacherData: res.data.list
      })
    }).catch((e) => { console.log(e) })
  }
  // 获取热门推荐数据
  getHotData = () => {
    axios.post(ajaxUrl.hotRecommend, {
      num: this.state.hotMoreNum
    }).then((res) => {
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
  handleCollection = (id) => {
    if (this.state.collectionType === 'cancel') {
      this.setState({
        collectionType: 'collect'
      }, () => {
        this.postCollection(id)
      })
    } else {
      this.setState({
        collectionType: 'cancel'
      }, () => {
        this.postCollection(id)
      })
    }
  }
  // 发送收藏按钮请求
  postCollection = (id) => {
    axios.post(ajaxUrl.homeCollection, {
      sw_id: id,
      type: this.state.collectionType
    }).then((res) => {
    }).catch((e) => { console.log(e) })
  }
  render () {
    console.log(65656464, webStorage.getItem('STAR_WEB_ROLE_CODE'))
    return (
      <div className='logged-home'>
        <HomeCarousel />
        <div className='logged-home-recommendation'>
          <div className='logged-home-border'>
            <div className='popular-recommendation' style={this.state.obj}>
              <div className='popular-recommendation-title'>
                <h3 className='chinese'>老师推荐</h3>
                <span className='english'>Hot recommendation</span>
                <span className='more' onClick={this.handleTeacherMore}>更多 > ></span>
              </div>
              <div className='popular-recommendation-item'>
                {this.state.teacherData && this.state.teacherData.map((item, index, arr) => {
                  return (
                    <div key={index} className='list'>
                      <dl className='list-item'>
                        <dt className='dl-dt'><img style={{width: '100%', height: '100%'}} src={item.SW_ICON} /></dt>
                        <dd className='dl-dd'>
                          <span className='dd-title'>{item.SW_NAME}</span>
                          <p className='dd-p'>{item.SW_DESC}</p>
                        </dd>
                      </dl>
                      <p style={{float: 'right'}}><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: item.SW_ID}}><Icon style={{backgroundColor: '#08A1E9', color: '#FFF', width: 20, height: 20, lineHeight: '20px'}} type='download' /><Button style={{width: 60, height: 20, lineHeight: '18px', fontSize: '10px', textAlign: 'center', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, backgroundColor: '#40B3F9'}} type='primary'>下载</Button></Link><Icon style={{width: 20, height: 20, backgroundColor: '#FFBB45', lineHeight: '20px', color: '#fff', marginLeft: '10px', cursor: 'pointer'}} onClick={() => this.handleCollection(item.SW_ID)} type='star-o' /></p>
                    </div>
                  )
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
                  return (
                    <div key={index} className='list'>
                      <dl className='list-item'>
                        <dt className='dl-dt'><img style={{width: '100%', height: '100%'}} src={item.SW_ICON} /></dt>
                        <dd className='dl-dd'>
                          <span className='dd-title'>{item.SW_NAME}</span>
                          <p className='dd-p'>{item.SW_DESC}</p>
                        </dd>
                      </dl>
                      <p style={{float: 'right'}}><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: item.SW_ID}}><Icon style={{backgroundColor: '#08A1E9', color: '#FFF', width: 20, height: 20, lineHeight: '20px'}} type='download' /><Button style={{width: 60, height: 20, lineHeight: '18px', fontSize: '10px', textAlign: 'center', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, backgroundColor: '#40B3F9'}} type='primary'>下载</Button></Link><Icon style={{width: 20, height: 20, backgroundColor: '#FFBB45', lineHeight: '20px', color: '#fff', marginLeft: '10px', cursor: 'pointer'}} onClick={() => this.handleCollection(item.SW_ID)} type='star-o' /></p>
                    </div>
                  )
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
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num'>1</span>
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[0].SW_NAME : ''}</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[0].SW_ICON : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[0].SW_DOWNLOADS : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[0].SW_STAR : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: this.state.rankingData.length > 0 ? this.state.rankingData[0].SW_ID : ''}}>安装</Link></Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FF9933'}}>2</span>
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[1].SW_NAME : ''}</span>
                    <div id='bbbbbb' className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[1].SW_ICON : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[1].SW_DOWNLOADS : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[1].SW_STAR : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: this.state.rankingData.length > 0 ? this.state.rankingData[1].SW_ID : ''}}>安装</Link></Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FFCC33'}}>3</span>
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[2].SW_NAME : ''}</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[2].SW_ICON : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[2].SW_DOWNLOADS : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[2].SW_STAR : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: this.state.rankingData.length > 0 ? this.state.rankingData[2].SW_ID : ''}}>安装</Link></Button>
                    </div>
                  </p>
                </div>
                {this.state.rankingDataSplice && this.state.rankingDataSplice.map((item, index, arr) => {
                  return (
                    <div className='lista' key={index}>
                      <p className='lista-title'>
                        <span className='title-num' style={{backgroundColor: '#33CCFF'}}>{index + 4}</span>
                        <span className='title-detaila'>{item.SW_NAME}</span>
                        <div className='app-install'>
                          <dl className='app-install-dl'>
                            <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={item.SW_ICON} /></dt>
                            <dd className='app-install-dd'>
                              <p className='download-num'>下载次数： {item.SW_DOWNLOADS}</p>
                              <Rate disabled value={item.SW_STAR} />
                            </dd>
                          </dl>
                          <Button className='install-button' type='primary'><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: item.SW_ID}}>安装</Link></Button>
                        </div>
                      </p>
                    </div>
                  )
                })}
              </TabPane>
              <TabPane tab='经典排行' key='2'>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num'>1</span>
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[0].SW_NAME : ''}</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[0].SW_ICON : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[0].SW_DOWNLOADS : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[0].SW_STAR : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: this.state.rankingData.length > 0 ? this.state.rankingData[0].SW_ID : ''}}>安装</Link></Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FF9933'}}>2</span>
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[1].SW_NAME : ''}</span>
                    <div id='bbbbbb' className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[1].SW_ICON : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[1].SW_DOWNLOADS : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[1].SW_STAR : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: this.state.rankingData.length > 0 ? this.state.rankingData[1].SW_ID : ''}}>安装</Link></Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FFCC33'}}>3</span>
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[2].SW_NAME : ''}</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[2].SW_ICON : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[2].SW_DOWNLOADS : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[2].SW_STAR : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: this.state.rankingData.length > 0 ? this.state.rankingData[2].SW_ID : ''}}>安装</Link></Button>
                    </div>
                  </p>
                </div>
                {this.state.rankingDataSplice && this.state.rankingDataSplice.map((item, index, arr) => {
                  return (
                    <div className='lista' key={index}>
                      <p className='lista-title'>
                        <span className='title-num' style={{backgroundColor: '#33CCFF'}}>{index + 4}</span>
                        <span className='title-detaila'>{item.SW_NAME}</span>
                        <div className='app-install'>
                          <dl className='app-install-dl'>
                            <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={item.SW_ICON} /></dt>
                            <dd className='app-install-dd'>
                              <p className='download-num'>下载次数： {item.SW_DOWNLOADS}</p>
                              <Rate disabled value={item.SW_STAR} />
                            </dd>
                          </dl>
                          <Button className='install-button' type='primary'><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: item.SW_ID}}>安装</Link></Button>
                        </div>
                      </p>
                    </div>
                  )
                })}
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}
TeacherHome.propTypes = {
  roleCode: PropTypes.string
}
const mapStateToProps = state => ({
  roleCode: state.role.code
})

const mapDispatchToProps = dispatch => ({
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherHome)
