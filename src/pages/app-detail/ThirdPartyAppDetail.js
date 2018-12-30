/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import './ThirdPartyAppDetail.css'
// import { Button, Icon, Carousel, Rate } from 'antd'
import { Button, Icon, Carousel, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import ajaxUrl from 'config'
import {thirdPartyAppDetail} from 'services/all-app/'
// import { renderRoutes } from 'react-router-config'
// import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
// const { Sider, Content } = Layout
class ThirdPartyAppDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'inline',
      theme: 'light',
      obj: {
        display: 'none'
      },
      picType: 'computer', // 默认截图展示类型
      authItem: ['', '（基于网络的）粗略位置', '查看网络状态', '查看 Wi-Fi 状态', '创建蓝牙连接', '拍摄照片和视频', '更改 Wi-Fi 状态', '完全的互联网访问权限', '开机时自动启动'],
      addClassName: 'see-detail-itema',
      appId: '',
      appDetailData: '',
      computerCarousel: [],
      phoneCarousel: [],
      authArray: [], // 权限详情
      verInfoArray: [], // 版本信息
      verNameArray: [], // 包名
      verSizeArray: [], // 包大小
      verNumArray: [] // 版本号
      // relateData: []
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
      appId: this.state.appId
    }, (res) => {
      if (res.data.code === 200) {
        console.log('应用详情：', res.data.data[0])
        this.setState({
          appDetailData: res.data.data[0]
        }, () => {
          // RUNNING_PLATFORM 没画
          // pc图片处理
          let bb = []
          if (this.state.appDetailData && this.state.appDetailData.APP_PC_PIC) {
            bb = this.state.appDetailData.APP_PC_PIC.split(',')
            this.setState({
              computerCarousel: bb || []
            })
          }
          // 手机图片处理
          let cc = []
          if (this.state.appDetailData && this.state.appDetailData.APP_PHONE_PIC) {
            cc = this.state.appDetailData.APP_PHONE_PIC.split(',')
            this.setState({
              phoneCarousel: cc || []
            })
          }
          // 权限处理
          let dd = []
          if (this.state.appDetailData && this.state.appDetailData.AUTH_DETAIL) {
            dd = this.state.appDetailData.AUTH_DETAIL.split(',')
            this.setState({
              authArray: dd || []
            })
          }
          // 版本信息处理 32 64 ios
          let ee = []
          if (this.state.appDetailData && this.state.appDetailData.VERSION_INFO) {
            ee = this.state.appDetailData.VERSION_INFO.split(',')
            this.setState({
              verInfoArray: ee || []
            })
          }
          // 版本号处理
          let ff = []
          if (this.state.appDetailData && this.state.appDetailData.APP_VERSION) {
            ff = this.state.appDetailData.APP_VERSION.split(',')
            this.setState({
              verNumArray: ff || []
            })
          }
          // 软件大小处理
          let gg = []
          if (this.state.appDetailData && this.state.appDetailData.VERSION_SIZE) {
            gg = this.state.appDetailData.VERSION_SIZE.split(',')
            this.setState({
              verSizeArray: gg || []
            })
          }
          // 包名处理
          let hh = []
          if (this.state.appDetailData && this.state.appDetailData.PACKAGE_NAME) {
            hh = this.state.appDetailData.PACKAGE_NAME.split(',')
            this.setState({
              verNameArray: hh || []
            })
          }
        })
      } else {
        console.log('查询应用详情失败：', res.data.msg || '')
      }
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
      this.setState({
        picType: 'computer'
      })
    } else {
      this.setState({
        picType: 'phone'
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
    // console.log(111111, this.state.appDetailData.sw_path ? this.state.appDetailData.sw_path[0].win32 : '')
    const verInfoArray = this.state.verInfoArray
    let win32 = 'win32'.indexOf(this.state.appDetailData.VERSION_INFO)
    let win64 = 'win64'.indexOf(this.state.appDetailData.VERSION_INFO)
    let android = 'android'.indexOf(this.state.appDetailData.VERSION_INFO)
    let ios = 'ios'.indexOf(this.state.appDetailData.VERSION_INFO)
    const imgUrl = ajaxUrl.IMG_BASE_URL_V2
    return (
      <div className='app-detail'>
        <div className='app-detail-header'>
          <img src={ajaxUrl.IMG_BASE_URL_V2 + this.state.appDetailData.APP_ICON || ''} />
          <div className='app-detail-header-right'>
            <h2 className='header-title'>{this.state.appDetailData.APP_NAME || '无'}</h2>
            <p className='header-classification'>分类：{this.state.appDetailData.APP_TYPE_NAME || '无'}</p>
            <div>
              {verInfoArray && win32 > 0
                ? <a href={imgUrl}>
                  <Button className='header-button'>
                windows 32位
                    <Icon style={{color: '#fff'}} type='download' />
                  </Button>
                </a>
                : null}
              {verInfoArray && win64 > 0
                ? <a href={imgUrl}>
                  <Button className='header-button'>
                windows 64位
                    <Icon style={{color: '#fff'}} type='download' />
                  </Button>
                </a>
                : null}
              {verInfoArray && android > 0
                ? <a href={imgUrl}>
                  <Button className='header-button'>
                  Android
                    <Icon style={{color: '#fff'}} type='download' />
                  </Button>
                </a>
                : null}
              {verInfoArray && ios > 0
                ? <a href={imgUrl}>
                  <Button className='header-button'>
                IOS
                    <Icon style={{color: '#fff'}} type='download' />
                  </Button>
                </a>
                : null}
            </div>
            <div className='header-see-detail'>
              <span onClick={this.handleSeeDetail} style={{cursor: 'pointer', zIndex: '100'}}>
              查看详情
              </span>
              <Icon style={{marginLeft: '8px'}} type='caret-down' />
            </div>
          </div>
          <div className={this.state.addClassName} ref='see-detail-item' style={this.state.obj}>
            <div className='see-detail-item-top'>
              {this.state.verInfoArray && this.state.verInfoArray.map((item, index) => {
                return <Row key={index}>
                  <Col span={6}>
              软件版本：{this.state.verInfoArray[index]}
                  </Col>
                  <Col span={6}>
              软件大小：{this.state.verSizeArray[index]}
                  </Col>
                  <Col span={6}>
              版本号：{this.state.verNumArray[index]}
                  </Col>
                  <Col span={6}>
              包名：{this.state.verNameArray[index]}
                  </Col>
                </Row>
              })}
            </div>
            <div className='see-detail-item-jurisdiction'>
              <span className='jurisdiction-title'>权限详情:</span>
              <ul className='jurisdiction-list'>
                {this.state.authArray && this.state.authArray.map((item, index) => {
                  return <li key={index} className='jurisdiction-list-detail'>{this.state.authItem[item]}</li>
                })}
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
                    {this.state.picType === 'computer' && this.state.computerCarousel && this.state.computerCarousel.map((item, index, arr) => {
                      return (
                        <div key={index} style={{width: '27%', height: 448, backgroundColor: '#ccc', marginRight: '5%', float: 'left'}}>
                          <img style={{width: '100%', height: '100%'}} src={item} />
                        </div>
                      )
                    })}
                    {this.state.picType === 'phone' && this.state.phoneCarousel && this.state.phoneCarousel.map((item, index, arr) => {
                      return (
                        <div key={index} style={{width: '27%', height: 448, backgroundColor: '#ccc', marginRight: '5%', float: 'left'}}>
                          <img style={{width: '100%', height: '100%'}} src={item} />
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
            <p>{this.state.appDetailData.APP_NOTES || '无'}</p>
          </div>
          <div className='app-detail-characteristic'>
            <h3>新版特性</h3>
            <p>{this.state.appDetailData.NEW_FEATURES || '无'}</p>
          </div>
          {/* <div className='app-detail-relevant'>
            <h3>相关应用</h3>
            {this.state.relateData.map((item, index, arr) => {
              return (
                <dl key={index}>
                  <dt>
                    <img src={ajaxUrl.IMG_BASE_URL_V2 + item.sw_icon} />
                  </dt>
                  <dd>
                    <Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: item.sw_id}}><span>{item.sw_name}</span></Link>
                    <div>{item.sw_desc}</div>
                    <Rate disabled count={3} value={3} />
                  </dd>
                </dl>
              )
            })}
          </div> */}
        </div>
      </div>
    )
  }
}
export default withRouter(ThirdPartyAppDetail)
