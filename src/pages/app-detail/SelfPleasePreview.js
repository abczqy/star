/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import './ThirdPartyAppDetail.css'
import { Icon, Carousel } from 'antd'
import PropTypes from 'prop-types'
import ajaxUrl from 'config'
// import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router'
// const { Sider, Content } = Layout
class SelfPleasePreview extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      appDetailData: props.location.state.data || '',
      obj: {
        display: 'none'
      }
    }
  }
  static propTypes = {
    location: PropTypes.object
  }
  componentDidMount () {
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
  render () {
    return (
      <div className='app-detail'>
        <div className='app-detail-header'>
          <img src={ajaxUrl.IMG_BASE_URL + this.state.appDetailData.sw_icon} />
          <div className='app-detail-header-right'>
            <h2 className='header-title'>{this.state.appDetailData.get('rname')}</h2>
            <p className='header-classification'>分类：{this.state.appDetailData.get('rType')}</p>
            <div className='header-see-detail'>
              <span onClick={this.handleSeeDetail} style={{cursor: 'pointer', zIndex: '100'}}>查看详情</span><Icon style={{marginLeft: '8px'}} type='caret-down' />
            </div>
          </div>
          <div className={this.state.addClassName} ref='see-detail-item' style={this.state.obj}>
            <div className='see-detail-item-top'>
              <div style={{float: 'left', marginRight: '15%'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>包类型:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>{this.state.appDetailData.get('detailType')}</span></div>
              <div style={{float: 'left', marginRight: '15%'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>软件大小:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>{this.state.appDetailData.sw_size}M</span></div>
              <div style={{float: 'left', marginRight: '15%'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>版本号:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>{this.state.appDetailData.version}</span></div>
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
                    {/* {this.state.computerCarousel.map((item, index, arr) => {
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
                    })} */}
                  </Carousel>
                </div>
                <Icon onClick={this.handleRightClick} className='exhibition-inside-right' type='right' />
              </div>
            </div>
          </div>
          <div className='app-detail-introduceaa'>
            <h3>应用介绍</h3>
            <p>{this.state.appDetailData.get('rDescribe')}</p>
          </div>
          <div className='app-detail-characteristic'>
            <h3>新版特性</h3>
            <p>{this.state.appDetailData.get('rFeatures')}</p>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(SelfPleasePreview)