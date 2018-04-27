/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import './SelfSupport.css'
import ajaxUrl from 'config'
import axios from 'axios'
import { Button, Icon, Carousel, Rate } from 'antd'
import PropTypes from 'prop-types'
// import { renderRoutes } from 'react-router-config'
// import { Link } from 'react-router-dom'
// const { Sider, Content } = Layout

// import axiosApi from '../../../api'
export default class SelfSupport extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'inline',
      theme: 'light',
      appId: '',
      appDetailData: {},
      obj: {
        display: 'none'
      },
      addClassName: 'see-detail-itema',
      relateData: [],
      computerCarousel: []
    }
  }
  static propTypes = {
    location: PropTypes.object
  }
  componentDidMount () {
    let a = this.props.location.search.replace('?', '')
    console.log(1111111111111111, a)
    this.setState({
      appId: a
    }, () => {
      this.getThirdPartyAppDetailData()
    })
  }
  // 获取应用详情数据
  getThirdPartyAppDetailData = () => {
    axios.post(ajaxUrl.selfSupportAppDetail, {
      sw_id: this.state.appId
    }).then((res) => {
      this.setState({
        appDetailData: res.data
      }, () => {
        let aa = JSON.parse(this.state.appDetailData.sw_computer_photo)
        console.log(888, aa)
        let bb = []
        for (let i in aa) {
          bb.push(aa[i])
          console.log(77777, bb)
        }
        this.setState({
          computerCarousel: bb
        })
        this.getRelatedApplications()
      })
    }).catch((e) => { console.log(e) })
  }
  handleSeeDetail = () => {
    if (this.state.obj.display === 'none') {
      this.setState({
        obj: {
          display: 'block'
        }
      })
    } else {
      setTimeout(() => {
        this.setState({
          obj: {
            display: 'none'
          }
        })
      }, 450)
    }

    if (this.state.addClassName === 'see-detail-itema') {
      setTimeout(() => {
        this.setState({
          addClassName: 'see-detail-itemb'
        })
      }, 50)
    } else {
      this.setState({
        addClassName: 'see-detail-itema'
      })
    }
  }
  // 获取相关应用数据
  getRelatedApplications = () => {
    axios.post(ajaxUrl.relatedApplications, {
      sw_tpe: this.state.appId,
      type: 'platform'
    }).then((res) => {
      this.setState({
        relateData: res.appDetailData.sw_tpe
      })
    }).catch((e) => { console.log(e) })
  }
  handleLeftClick = () => {
    this.refs['exhibition-inside-carousel'].prev()
  }
  handleRightClick = () => {
    this.refs['exhibition-inside-carousel'].next()
  }

  handleClick () {
    window.open(this.state.appDetailData.sw_path)
  }
  render () {
    return (
      <div className='app-detail'>
        <div className='app-detail-header'>
          <img src={ajaxUrl.IMG_BASE_URL + this.state.appDetailData.sw_icon} />
          <div className='app-detail-header-right'>
            <h2 className='header-title'>{this.state.appDetailData.sw_name}</h2>
            <p className='header-classification'>分类：{this.state.appDetailData.sw_type}</p>
            <Button className='header-button' onClick={() => { this.handleClick() }}>开通</Button>
            <div className='header-see-detail'>
              <span onClick={this.handleSeeDetail} style={{cursor: 'pointer', zIndex: '100'}}>查看详情</span><Icon style={{marginLeft: '8px'}} type='caret-down' />
            </div>
          </div>
          <div className={this.state.addClassName} ref='see-detail-item' style={this.state.obj}>
            <div className='see-detail-item-top'>
              <div style={{float: 'left', marginRight: '300px'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>软件大小:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>28.71M</span></div>
              <div style={{float: 'left', marginRight: '300px'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>版本号:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>{this.state.appDetailData.version}</span></div>
              <div style={{float: 'left'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>包名:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>com.netease.vopen</span></div>
            </div>
            <div className='see-detail-item-jurisdiction'>
              <span className='jurisdiction-title'>权限详情:</span>
              <ul className='jurisdiction-list'>
                <li className='jurisdiction-list-detail'>（基于网络的）粗略位置</li>
                <li className='jurisdiction-list-detail'>精准的(GPS)位置</li>
                <li className='jurisdiction-list-detail'>查看网络状态</li>
                <li className='jurisdiction-list-detail'>查看 Wi-Fi 状态</li>
                <li className='jurisdiction-list-detail'>创建蓝牙连接</li>
                <li className='jurisdiction-list-detail'>蓝牙管理</li>
                <li className='jurisdiction-list-detail'>拍摄照片和视频</li>
                <li className='jurisdiction-list-detail'>更改网络连接性</li>
                <li className='jurisdiction-list-detail'>更改 Wi-Fi 状态</li>
                <li className='jurisdiction-list-detail'>完全的互联网访问权限</li>
                <li className='jurisdiction-list-detail'>装载和卸载文件系统</li>
                <li className='jurisdiction-list-detail'>开机时自动启动</li>
                <li className='jurisdiction-list-detail'>使用帐户的身份验证凭据</li>
                <li className='jurisdiction-list-detail'>修改全局系统设置</li>
              </ul>
            </div>
          </div>
          <div className='app-detail-exhibition'>
            <div className='exhibition-title'>
              <h3>软件展示</h3>
              <div>pc展示</div>
              <div>手机展示</div>
            </div>
            <div className='exhibition-outside'>
              <div className='exhibition-inside'>
                <Icon onClick={this.handleLeftClick} className='exhibition-inside-left' type='left' />
                <div style={{width: '80%', marginLeft: '160px'}}>
                  <Carousel ref='exhibition-inside-carousel'>
                    {this.state.computerCarousel.map((item, index, arr) => {
                      return (
                        <div key={index}>
                          <div>
                            {this.state.computerCarousel[index].map((item, index, arr) => {
                              return (
                                <div key={index} style={{width: 300, height: 448, backgroundColor: '#ccc', marginRight: '50px', float: 'left'}}>
                                  <img style={{width: '100%', height: '100%'}} src={ajaxUrl.IMG_BASE_URL + item} />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </Carousel>
                </div>
                <Icon onClick={this.handleRightClick} className='exhibition-inside-right' type='right' />
              </div>
            </div>
          </div>
          <div className='app-detail-introduceaaa'>
            <h3>应用介绍</h3>
            <p>{this.state.appDetailData.sw_desc}</p>
            {/* <p>产品团队始终坚持在内容和设计上与时俱进、不断突破，曾荣登新周刊"优化生活特别奖"、新京报"年度公益奖"、DCCI"最学习奖"，并于2015年中国产业互联网峰会中荣获"最具价值在线教育平台"称号。· 课程资源好又多：作为中国最大最全的课程视频平台，拥有来自国内外顶尖学府的海量名师名课，覆盖文学艺术、历史哲学、经济社会、物理化学、心理管理、计算机技术等二十多个专业领域；作为TED官方合作伙伴，向国内用户提供最新最赞的TED演讲；引人入胜又发人深省的纪录片、轻松易学的可汗学院，无数好内容就在这里等着你。 </p>
            <p>翻译实力坚强：拥有超过三百人的庞大翻译团队，具备各类专业素质的高级翻译人才，将在第一时间向您献出最优质的字幕翻译服务，再也不用因为看不懂国外好课而捉急了。</p> */}
          </div>
          <div className='app-detail-characteristic'>
            <h3>新版特性</h3>
            <p>优化了部分细节，体验更贴心！</p>
          </div>
          <div className='app-detail-relevant'>
            <h3>相关应用</h3>
            <dl>
              <dt>
                <img src='http://img3.imgtn.bdimg.com/it/u=3554140130,2754099239&fm=27&gp=0.jpg' />
              </dt>
              <dd>
                <span>超级教师</span>
                <div>1111111111111111111111111111111</div>
                <Rate disabled count={3} value={3} />
              </dd>
            </dl>
            <dl>
              <dt>
                <img src='http://img3.imgtn.bdimg.com/it/u=3554140130,2754099239&fm=27&gp=0.jpg' />
              </dt>
              <dd>
                <span>超级教师</span>
                <div>1111111111111111111111111111111</div>
                <Rate disabled count={3} value={3} />
              </dd>
            </dl>
            <dl>
              <dt>
                <img src='http://img3.imgtn.bdimg.com/it/u=3554140130,2754099239&fm=27&gp=0.jpg' />
              </dt>
              <dd>
                <span>超级教师</span>
                <div>1111111111111111111111111111111</div>
                <Rate disabled count={3} value={3} />
              </dd>
            </dl>
            <dl>
              <dt>
                <img src='http://img3.imgtn.bdimg.com/it/u=3554140130,2754099239&fm=27&gp=0.jpg' />
              </dt>
              <dd>
                <span>超级教师</span>
                <div>1111111111111111111111111111111</div>
                <Rate disabled count={3} value={3} />
              </dd>
            </dl>
          </div>
        </div>
      </div>
    )
  }
}
