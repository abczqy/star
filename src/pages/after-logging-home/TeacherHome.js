/**
 * 软件市场首页
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Tabs, Rate } from 'antd'
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
      rankingType: '0',
      rankingDataSplice: []
    }
  }
  componentDidMount () {
    if (this.props.roleCode === 'teacher' || this.props.roleCode === 'student') {
      this.setState({
        obj: {
          display: 'block'
        }
      })
    }
  }
  componentWillMount () {
    this.getRankingData()
  }
  // 获取排行榜数据
  getRankingData = () => {
    axios.post(ajaxUrl.manufacturerSignInRankingList, {
      params: {
        num: 10,
        chartType: this.state.rankingType
      }
    }).then((res) => {
      console.log(2222222, res.data.data)
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
    if (activeKey === '1') {
      console.log(activeKey)
      this.setState({
        rankingType: '0'
      }, () => {
        this.getRankingData()
      })
    }
    if (activeKey === '2') {
      console.log(activeKey)
      this.setState({
        rankingType: '1'
      }, () => {
        this.getRankingData()
      })
    }
  }
  render () {
    console.log(1111111, this.props.roleCode)
    const datac = [{
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    },
    {
      src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1119189850,3457576052&fm=27&gp=0.jpg',
      title: '超级教师',
      detail: '1111111111111333333333333333333333333333'
    }]
    return (
      <div className='logged-home'>
        <HomeCarousel />
        <div className='logged-home-recommendation'>
          <div className='logged-home-border'>
            <div className='popular-recommendation' style={this.state.obj}>
              <div className='popular-recommendation-title'>
                <h3 className='chinese'>老师推荐</h3>
                <span className='english'>Hot recommendation</span>
                <span className='more'>更多 > ></span>
              </div>
              <div className='popular-recommendation-item'>
                {datac.map((item, index, arr) => {
                  return (
                    <div key={index} className='list'>
                      <dl className='list-item'>
                        <dt className='dl-dt'><img style={{width: '100%', height: '100%'}} src={item.src} /></dt>
                        <dd className='dl-dd'>
                          <span className='dd-title'>{item.title}</span>
                          <p className='dd-p'>{item.detail}</p>
                        </dd>
                      </dl>
                      <p style={{float: 'right'}}><Link to='/operate-manage-home/all-app-detail-third'><Icon style={{backgroundColor: '#08A1E9', color: '#FFF', width: 20, height: 20, lineHeight: '20px'}} type='download' /><Button style={{width: 60, height: 20, lineHeight: '18px', fontSize: '10px', textAlign: 'center', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, backgroundColor: '#40B3F9'}} type='primary'>下载</Button></Link><Icon style={{width: 20, height: 20, backgroundColor: '#FFBB45', lineHeight: '20px', color: '#fff', marginLeft: '10px'}} type='star-o' /></p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='popular-recommendation'>
              <div className='popular-recommendation-title'>
                <h3 className='chinese'>热门推荐</h3>
                <span className='english'>Hot recommendation</span>
                <span className='more'>更多 > ></span>
              </div>
              <div className='popular-recommendation-item'>
                {datac.map((item, index, arr) => {
                  return (
                    <div key={index} className='list'>
                      <dl className='list-item'>
                        <dt className='dl-dt'><img style={{width: '100%', height: '100%'}} src={item.src} /></dt>
                        <dd className='dl-dd'>
                          <span className='dd-title'>{item.title}</span>
                          <p className='dd-p'>{item.detail}</p>
                        </dd>
                      </dl>
                      <p style={{float: 'right'}}><Link to='/operate-manage-home/all-app-detail-third'><Icon style={{backgroundColor: '#08A1E9', color: '#FFF', width: 20, height: 20, lineHeight: '20px'}} type='download' /><Button style={{width: 60, height: 20, lineHeight: '18px', fontSize: '10px', textAlign: 'center', borderBottomLeftRadius: 0, borderTopLeftRadius: 0, borderBottomRightRadius: 0, borderTopRightRadius: 0, backgroundColor: '#40B3F9'}} type='primary'>下载</Button></Link><Icon style={{width: 20, height: 20, backgroundColor: '#FFBB45', lineHeight: '20px', color: '#fff', marginLeft: '10px'}} type='star-o' /></p>
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
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[0].sw_name : ''}</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[0].sw_icon : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[0].downloads : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[0].star_rate : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>安装</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FF9933'}}>2</span>
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[1].sw_name : ''}</span>
                    <div id='bbbbbb' className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[1].sw_icon : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[1].downloads : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[1].star_rate : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>安装</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FFCC33'}}>3</span>
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[2].sw_name : ''}</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[2].sw_icon : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[2].downloads : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[2].star_rate : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>安装</Button>
                    </div>
                  </p>
                </div>
                {this.state.rankingDataSplice.map((item, index, arr) => {
                  return (
                    <div className='lista' key={index}>
                      <p className='lista-title'>
                        <span className='title-num' style={{backgroundColor: '#33CCFF'}}>{index + 4}</span>
                        <span className='title-detaila'>{item.sw_name}</span>
                        <div className='app-install'>
                          <dl className='app-install-dl'>
                            <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={item.sw_icon} /></dt>
                            <dd className='app-install-dd'>
                              <p className='download-num'>下载次数： {item.downloads}</p>
                              <Rate disabled value={item.star_rate} />
                            </dd>
                          </dl>
                          <Button className='install-button' type='primary'>安装</Button>
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
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[0].sw_name : ''}</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[0].sw_icon : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[0].downloads : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[0].star_rate : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>安装</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FF9933'}}>2</span>
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[1].sw_name : ''}</span>
                    <div id='bbbbbb' className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[1].sw_icon : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[1].downloads : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[1].star_rate : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>安装</Button>
                    </div>
                  </p>
                </div>
                <div className='lista'>
                  <p className='lista-title'>
                    <span className='title-num' style={{backgroundColor: '#FFCC33'}}>3</span>
                    <span className='title-detaila'>{this.state.rankingData.length > 0 ? this.state.rankingData[2].sw_name : ''}</span>
                    <div className='app-install'>
                      <dl className='app-install-dl'>
                        <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={this.state.rankingData.length > 0 ? this.state.rankingData[2].sw_icon : ''} /></dt>
                        <dd className='app-install-dd'>
                          <p className='download-num'>下载次数： {this.state.rankingData.length > 0 ? this.state.rankingData[2].downloads : ''}</p>
                          <Rate disabled value={this.state.rankingData.length > 1 ? this.state.rankingData[2].star_rate : 0} />
                        </dd>
                      </dl>
                      <Button className='install-button' type='primary'>安装</Button>
                    </div>
                  </p>
                </div>
                {this.state.rankingDataSplice.map((item, index, arr) => {
                  return (
                    <div className='lista' key={index}>
                      <p className='lista-title'>
                        <span className='title-num' style={{backgroundColor: '#33CCFF'}}>{index + 4}</span>
                        <span className='title-detaila'>{item.sw_name}</span>
                        <div className='app-install'>
                          <dl className='app-install-dl'>
                            <dt className='app-install-dt'><img style={{width: '100%', height: '100%'}} src={item.sw_icon} /></dt>
                            <dd className='app-install-dd'>
                              <p className='download-num'>下载次数： {item.downloads}</p>
                              <Rate disabled value={item.star_rate} />
                            </dd>
                          </dl>
                          <Button className='install-button' type='primary'>安装</Button>
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
