/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import './ThirdPartyAppDetail.css'
import { Button, Icon, Carousel, Rate } from 'antd'
import PropTypes from 'prop-types'
import ajaxUrl from 'config'
import {thirdPartyAppDetail} from 'services/all-app/'
// import { renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'
// const { Sider, Content } = Layout
export default class ThirdPartyAppDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'inline',
      theme: 'light',
      obj: {
        display: 'none'
      },
      addClassName: 'see-detail-itema',
      appId: '',
      appDetailData: [],
      computerCarousel: [],
      relateData: []
    }
  }
  static propTypes = {
    location: PropTypes.object
  }
  componentDidMount () {
    let a = this.props.location.search.replace('?', '')
    this.setState({
      appId: a
    }, () => {
      this.getThirdPartyAppDetailData()
    })
  }
  componentWillReceiveProps (nextprops) {
    let a = nextprops.location.search.replace('?', '')
    this.setState({
      appId: a
    }, () => {
      this.getThirdPartyAppDetailData()
    })
  }
  // 获取应用详情数据
  getThirdPartyAppDetailData = () => {
    thirdPartyAppDetail({
      sw_id: this.state.appId
    }, (res) => {
      this.setState({
        appDetailData: res.data
      }, () => {
        let bb = []
        for (let i in this.state.appDetailData.sw_computer_photo) {
          bb.push(this.state.appDetailData.sw_computer_photo[i])
        }
        this.setState({
          computerCarousel: bb,
          relateData: this.state.appDetailData.sw_related || []
        })
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
  // pc展示  手机展示  切换
  handleSwitchCarousel = (type) => {
    if (type === 'computer') {
      let bb = []
      for (let i in this.state.appDetailData.sw_computer_photo) {
        bb.push(this.state.appDetailData.sw_computer_photo[i])
      }
      this.setState({
        computerCarousel: bb
      })
    } else {
      let dd = []
      for (let i in this.state.appDetailData.sw_phone_photo) {
        dd.push(this.state.appDetailData.sw_phone_photo[i])
      }
      this.setState({
        computerCarousel: dd
      })
    }
  }
  // // 获取相关应用数据
  // getRelatedApplications = () => {
  //   relatedApplications({
  //     sw_tpe: this.state.appDetailData.sw_related,
  //     type: 'software'
  //   }, (res) => {
  //     this.setState({
  //       relateData: res.data
  //     })
  //   }).catch((e) => { console.log(e) })
  // }
  handleLeftClick = () => {
    this.refs['exhibition-inside-carousel'].prev()
  }
  handleRightClick = () => {
    this.refs['exhibition-inside-carousel'].next()
  }
  render () {
    console.log(111111, this.state.appDetailData.sw_path ? this.state.appDetailData.sw_path[0].win32 : '')
    const swPath = this.state.appDetailData.sw_path
    const imgUrl = ajaxUrl.IMG_BASE_URL
    return (
      <div className='app-detail'>
        <div className='app-detail-header'>
          <img src={ajaxUrl.IMG_BASE_URL + this.state.appDetailData.sw_icon} />
          <div className='app-detail-header-right'>
            <h2 className='header-title'>{this.state.appDetailData.sw_name}</h2>
            <p className='header-classification'>分类：{this.state.appDetailData.sw_type}</p>
            <div>
              {swPath && swPath[0] ? <a href={imgUrl + swPath[0].win32}><Button className='header-button'>windows 32位<Icon style={{color: '#fff'}} type='download' /></Button></a> : null}
              {swPath && swPath[1] ? <a href={imgUrl + swPath[1].win64}><Button className='header-button'>windows 64位<Icon style={{color: '#fff'}} type='download' /></Button></a> : null}
              {swPath && swPath[2] ? <a href={imgUrl + swPath[2].ios}><Button className='header-button'>ios系统<Icon style={{color: '#fff'}} type='download' /></Button></a> : null}
              {swPath && swPath[3] ? <a href={imgUrl + swPath[3].android}><Button className='header-button'>安卓系统<Icon style={{color: '#fff'}} type='download' /></Button></a> : null}
            </div>
            <div className='header-see-detail'>
              <span onClick={this.handleSeeDetail} style={{cursor: 'pointer', zIndex: '100'}}>查看详情</span><Icon style={{marginLeft: '8px'}} type='caret-down' />
            </div>
          </div>
          <div className={this.state.addClassName} ref='see-detail-item' style={this.state.obj}>
            <div className='see-detail-item-top'>
              <div style={{float: 'left', marginRight: '25%'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>软件大小:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>{this.state.appDetailData.sw_size}M</span></div>
              <div style={{float: 'left', marginRight: '25%'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>版本号:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>{this.state.appDetailData.version}</span></div>
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
              <div onClick={() => this.handleSwitchCarousel('computer')}>pc展示</div>
              <div onClick={() => this.handleSwitchCarousel('phone')}>手机展示</div>
            </div>
            <div className='exhibition-outside'>
              <div className='exhibition-insideb'>
                <Icon onClick={this.handleLeftClick} className='exhibition-inside-left' type='left' />
                <div style={{width: '82%', marginLeft: '13%'}}>
                  <Carousel ref='exhibition-inside-carousel'>
                    {this.state.computerCarousel.map((item, index, arr) => {
                      return (
                        <div key={index}>
                          <div>
                            {this.state.computerCarousel[index].map((item, index, arr) => {
                              return (
                                <div key={index} style={{width: '27%', height: 448, backgroundColor: '#ccc', marginRight: '5%', float: 'left'}}>
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
          <div className='app-detail-introduceaa'>
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
            {this.state.relateData.map((item, index, arr) => {
              return (
                <dl key={index}>
                  <dt>
                    <img src={ajaxUrl.IMG_BASE_URL + item.sw_icon} />
                  </dt>
                  <dd>
                    <Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: item.sw_id}}><span>{item.sw_name}</span></Link>
                    <div>{item.sw_desc}</div>
                    <Rate disabled count={3} value={3} />
                  </dd>
                </dl>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
