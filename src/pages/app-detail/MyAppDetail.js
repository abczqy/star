/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import './MyAppDetail.css'
import { Icon, Carousel } from 'antd'
import PropTypes from 'prop-types'
import ajaxUrl from 'config'
import axios from 'axios'
// import { renderRoutes } from 'react-router-config'
// import { Link } from 'react-router-dom'
// const { Sider, Content } = Layout

// import axiosApi from '../../../api'
export default class MyAppDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'inline',
      theme: 'light',
      appDetailId: '',
      appDetailData: {},
      obj: {
        display: 'none'
      },
      addClassName: 'see-detail-itema',
      computerCarousel: [],
      compatibleSystem: [],
      developmentRelated: []
    }
  }
  static propTypes = {
    location: PropTypes.abj
  }
  componentDidMount () {
    let a = this.props.location.search.replace('?', '')
    this.setState({
      appDetailId: a
    }, () => {
      this.getMyAppDetailData()
      this.getDevelopmentRelated()
    })
  }
  getMyAppDetailData = () => {
    axios.post(ajaxUrl.thirdPartyAppDetail, {
      sw_id: this.state.appDetailId
    }).then((res) => {
      this.setState({
        appDetailData: res.data
      }, () => {
        // let shishi = this.state.appDetailData.sw_path.replace(/\//g, '')
        // eslint-disable-next-line no-eval
        // let ceshi = eval('(' + shishi + ')')
        let aa = JSON.parse(this.state.appDetailData.sw_computer_photo)
        let bb = []
        for (let i in aa) {
          bb.push(aa[i])
        }
        this.setState({
          computerCarousel: bb
        })
        this.handleCompatibleSystem(this.state.appDetailData.sw_path)
      })
    }).catch((e) => { console.log(e) })
  }
  // 获取开发相关数据
  getDevelopmentRelated = () => {
    axios.post(ajaxUrl.developmentRelated, {
      sw_id: this.state.appDetailId
    }).then((res) => {
      this.setState({
        developmentRelated: res.data
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
  handleLeftClick = () => {
    this.refs['exhibition-inside-carousel'].prev()
  }
  handleRightClick = () => {
    this.refs['exhibition-inside-carousel'].next()
  }
  // pc展示  手机展示  切换
  handleSwitchCarousel = (type) => {
    if (type === 'computer') {
      console.log(22222)
      let aa = JSON.parse(this.state.appDetailData.sw_computer_photo)
      let bb = []
      for (let i in aa) {
        bb.push(aa[i])
      }
      this.setState({
        computerCarousel: bb
      })
    } else {
      console.log(33333333)
      let cc = JSON.parse(this.state.appDetailData.sw_phone_photo)
      let dd = []
      for (let i in cc) {
        dd.push(cc[i])
      }
      this.setState({
        computerCarousel: dd
      })
    }
  }
  // 处理兼容系统字段
  handleCompatibleSystem = (data) => {
    // 第一步把获取到的sw_path去掉{}
    let path = []
    path = data ? data.slice(1, -1) : []
    // 第二步以逗号为分隔符分割
    let pathArray = []
    pathArray = path.length > 0 ? path.split(',') : []
    let swPath = []
    // 刨除第一个元素剩余的内容
    let swPathRest = []
    for (let i = 0; i < pathArray.length; i++) {
      // 第三步以冒号为分隔符分割
      swPath.push(pathArray[i].split(':'))
    }
    // 给swPathRest赋值
    for (let i = 1; i < swPath.length; i++) {
      swPathRest.push(swPath[i])
    }
    this.setState({
      compatibleSystem: swPath
    })
  }
  render () {
    console.log('00000000', this.state.compatibleSystem)
    return (
      <div className='app-detail'>
        <div className='app-detail-header'>
          <img src={ajaxUrl.IMG_BASE_URL + this.state.appDetailData.sw_icon} />
          <div className='app-detail-header-right'>
            <p>
              <span className='header-titlea'>软件名称：{this.state.appDetailData.sw_name}</span>
              <span className='header-titlea'>当前版本：{this.state.appDetailData.version}</span>
            </p>
            <p>
              <span className='header-titlea'>软件类型：{this.state.appDetailData.sw_type}</span>
              <span className='header-titlea'>上架时间：{this.state.appDetailData.sw_time_real}</span>
            </p>
            <p>
              <span className='header-titlea'>兼容系统：{
                this.state.compatibleSystem.map((item, index, arr) => {
                  return (
                    <span>{arr[index][0]}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  )
                })
              }</span>
            </p>
          </div>
          <div className={this.state.addClassName} ref='see-detail-item' style={this.state.obj}>
            <div className='see-detail-item-top'>
              <div style={{float: 'left', marginRight: '300px'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>软件大小:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>28.71M</span></div>
              <div style={{float: 'left', marginRight: '300px'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>版本号:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>5.3.0</span></div>
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
                    {/* <div>
                      <div>
                        <div style={{width: 300, height: 448, backgroundColor: '#ccc', marginRight: '50px', float: 'left'}}>
                          <img style={{width: '100%', height: '100%'}} src='https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=5a0f156f57b5c9ea7df305e3e538b622/cf1b9d16fdfaaf519d4aa2db805494eef01f7a2c.jpg' />
                        </div>
                        <div style={{width: 300, height: 448, backgroundColor: '#ccc', marginRight: '50px', float: 'left'}}>
                          <img style={{width: '100%', height: '100%'}} src='https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=5a0f156f57b5c9ea7df305e3e538b622/cf1b9d16fdfaaf519d4aa2db805494eef01f7a2c.jpg' />
                        </div>
                        <div style={{width: 300, height: 448, backgroundColor: '#ccc', marginRight: '50px', float: 'left'}}>
                          <img style={{width: '100%', height: '100%'}} src='https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=5a0f156f57b5c9ea7df305e3e538b622/cf1b9d16fdfaaf519d4aa2db805494eef01f7a2c.jpg' />
                        </div>
                      </div>
                    </div> */}
                  </Carousel>
                </div>
                <Icon onClick={this.handleRightClick} className='exhibition-inside-right' type='right' />
              </div>
            </div>
          </div>
          <div className='app-detail-introducea'>
            <h3>开发相关</h3>
            <img src={ajaxUrl.IMG_BASE_URL + this.state.developmentRelated.dev_photo} />
            <div>
              <div className='introduce-detail'>姓名：{this.state.developmentRelated.developers}</div>
              <div className='introduce-detail'>身份证号：{this.state.developmentRelated.dev_idcard}</div>
              <div className='introduce-detail'>主要联系人：{this.state.developmentRelated.dev_contact}</div>
              <div className='introduce-detail'>联系人电话：{this.state.developmentRelated.dev_contact_phone}</div>
            </div>
          </div>
          <div style={{width: '100%', height: '180px', float: 'left'}}>
            <div className='app-detail-characteristica'>
              <h3>软件版权</h3>
              <img src={ajaxUrl.IMG_BASE_URL + this.state.appDetailData.sw_copyright} />
            </div>
            <div className='app-detail-characteristica'>
              <h3>审核凭证</h3>
              <img src={ajaxUrl.IMG_BASE_URL + this.state.appDetailData.fin_audit} />
            </div>
          </div>
          <div className='app-detail-relevanta'>
            <h3>历史版本</h3>
            <p>
              <p className='relevant-introduce'>
                <span>超级教师 3.0</span>
                <span>2018年3月1日</span>
              </p>
              <p className='relevant-introduce'>
                <span>超级教师 2.0</span>
                <span>2018年2月1日</span>
              </p>
              <p className='relevant-introduce'>
                <span>超级教师 1.0</span>
                <span>2018年1月1日</span>
              </p>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
