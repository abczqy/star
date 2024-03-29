/* eslint-disable no-dupe-class-members */
/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import './SelfPleasePreview.css'
import { Modal, Icon, Carousel, Form } from 'antd'
import PropTypes from 'prop-types'
// import ajaxUrl from 'config'
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router'
// const { Sider, Content } = Layout
class SelfPleasePreview extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      appDetailData: props.dataPre || '',
      type: props.dataUploadType || '01',
      obj: {
        display: 'none'
      },
      dataPlatPre: props.dataPlatPre,
      platicon: props.dataPlatIcon,
      platPC: props.dataPlatPCUrl,
      pictype: 'computer',
      icon: props.dataIcon || [],
      pcPhoto: props.dataPc || [],
      phonePhoto: props.dataPhone || [],
      authItem: ['', '（基于网络的）粗略位置', '查看网络状态', '查看 Wi-Fi 状态', '创建蓝牙连接', '拍摄照片和视频', '更改 Wi-Fi 状态', '完全的互联网访问权限', '开机时自动启动']
    }
    // console.log(this.state.appDetailData)
  }
  static propTypes = {
    // location: PropTypes.object,
    dataPre: PropTypes.object,
    dataPc: PropTypes.array,
    dataIcon: PropTypes.array,
    dataPhone: PropTypes.array,
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    dataUploadType: PropTypes.object,
    dataPlatPre: PropTypes.object,
    dataPlatIcon: PropTypes.array,
    dataPlatPCUrl: PropTypes.array
    // icon1: PropTypes.any
  }

  // pc展示  手机展示  切换
  handleSwitchCarousel = (type) => {
    // console.log('点击了pc')
    if (type === 'computer') {
      this.setState({
        pictype: 'computer'
      })
    } else {
      this.setState({
        pictype: 'phone'
      })
    }
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

  shouldComponentUpdate () {
    // console.log('shouldComponentUpdate')
    return true
  }

  componentDidMount () {
    // console.log('componentDidMount')

    // if (this.state.icon && this.state.icon !== [] && this.state.icon.length === 0) {
    //   console.log('进来了')

    //   this.handleSwitchCarousel('computer')
    // }
  }

  render () {
    // console.log('render')
    // console.log('render this.props.dataIcon.icon = ', this.props.dataIcon)
    // console.log('render this.props.dataIcon.icon.length= ', this.props.dataIcon.length)
    // console.log('this.state.icon[0] render= ', this.state.icon.shift())
    const { type, platicon, platPC } = this.state
    let thiz, appInfo, rname, rType, detailAuth, rDescribe, rFeatures, icon
    // 处理传过来的app信息
    let detailType = []
    let detailPackName = []
    let detailVersionNum = []
    let detailSize = []
    let platDate
    if (type === '1') {
      thiz = this.state.appDetailData
      appInfo = JSON.parse(thiz.get('appInfo'))
      rname = thiz.get('appName')
      rType = thiz.get('appType')
      detailAuth = thiz.get('detailAuth').split(',')
      rDescribe = thiz.get('appDesc')
      rFeatures = thiz.get('feature')
      icon = thiz.get('sw_icon')
      for (let i = 0; i < appInfo.length; i++) {
        detailType.push(appInfo[i].appVersion)
        detailPackName.push(appInfo[i].packageName)
        detailVersionNum.push(appInfo[i].versioInfo)
        detailSize.push(appInfo[i].versionSize)
      }
    } else {
      platDate = this.state.dataPlatPre
    }
    return (
      <Modal
        title='上架预览'
        visible={this.props.visible}
        onCancel={this.props.hiddenModal}
        width='80%'
        footer={null}
      >
        <div className='app-preview'>
          <div className='app-preview-header'>
            {
              type === '1' ? <img src={icon} /> : <img src={platicon[0] ? platicon[0].thumbUrl : ''} />
            }
            <div className='app-preview-header-right'>
              <h2 className='header-title'>{ type === '1' ? rname : platDate.name}</h2>
              <p className='header-classification'>分类：{type === '1' ? rType : platDate.typeName}</p>
              <div className='header-see-detail'>
                <span onClick={this.handleSeeDetail} style={{cursor: 'pointer', zIndex: '100'}}>查看详情</span><Icon style={{marginLeft: '8px'}} type='caret-down' />
              </div>
            </div>
            <div className={this.state.addClassName} ref='see-detail-item' style={this.state.obj}>
              {type === '1' && detailType && detailType.map((item, index) => {
                return <div className='see-detail-item-top' key={index}>
                  <div style={{float: 'left', marginRight: '15%'}}>
                    <span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>
                  包类型:</span>&nbsp;&nbsp;&nbsp;
                    <span style={{fontWeight: 400, color: '#666', fontSize: 14}}>
                      {detailType[index] || '无'}
                    </span>
                  </div>
                  <div style={{float: 'left', marginRight: '15%'}}>
                    <span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>
                  软件大小:</span>&nbsp;&nbsp;&nbsp;
                    <span style={{fontWeight: 400, color: '#666', fontSize: 14}}>
                      {detailSize[index] || '无'}
                    </span>
                  </div>
                  <div style={{float: 'left', marginRight: '15%'}}>
                    <span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>
                  版本号:</span>&nbsp;&nbsp;&nbsp;
                    <span style={{fontWeight: 400, color: '#666', fontSize: 14}}>
                      {detailVersionNum[index] || '无'}
                    </span>
                  </div>
                  <div style={{float: 'left'}}>
                    <span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>
                  包名:</span>&nbsp;&nbsp;&nbsp;
                    <span style={{fontWeight: 400, color: '#666', fontSize: 14}}>
                      {detailPackName[index] || '无'}
                    </span>
                  </div>
                </div>
              })}
              {
                type === '2' ? <div className='see-detail-item-top'>
                  <div style={{float: 'left', marginRight: '15%'}}>
                    <span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>
                  包类型:</span>&nbsp;&nbsp;&nbsp;
                    <span style={{fontWeight: 400, color: '#666', fontSize: 14}}>
                      {platDate.type || '无'}
                    </span>
                  </div>
                  <div style={{float: 'left', marginRight: '15%'}}>
                    <span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>
                  包大小:</span>&nbsp;&nbsp;&nbsp;
                    <span style={{fontWeight: 400, color: '#666', fontSize: 14}}>
                      {platDate.size || '无'}
                    </span>
                  </div>
                  <div style={{float: 'left', marginRight: '15%'}}>
                    <span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>
                      包名:</span>&nbsp;&nbsp;&nbsp;
                    <span style={{fontWeight: 400, color: '#666', fontSize: 14}}>
                      {platDate.packageName || '无'}
                    </span>
                  </div>
                  <div style={{float: 'left', marginRight: '15%'}}>
                    <span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>
                  版本号:</span>&nbsp;&nbsp;&nbsp;
                    <span style={{fontWeight: 400, color: '#666', fontSize: 14}}>
                      {platDate.versionNum || '无'}
                    </span>
                  </div>
                </div> : null
              }
              <div className='see-detail-item-jurisdiction'>{
                type === '1' ? <div>
                  <span className='jurisdiction-title'>权限详情:</span>
                  <ul className='jurisdiction-list'>
                    {detailAuth && detailAuth.map((item, index) => {
                      // eslint-disable-next-line no-unused-expressions
                      return <li className='jurisdiction-list-detail' key={index} >{this.state.authItem[item] || '无'}</li>
                    })}
                  </ul>
                </div> : null
              }
              </div>
            </div>
            <div className='app-preview-exhibition'>
              {
                type === '1' ? <div>
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
                          {this.state.pictype === 'computer' && this.state.pcPhoto && this.state.pcPhoto.map((item, index, arr) => {
                            return (
                              <div key={index} style={{width: '27%', height: 448, backgroundColor: '#ccc', marginRight: '5%', float: 'left'}}>
                                <img style={{width: '100%', height: '100%'}} src={item.thumbUrl} />
                              </div>
                            )
                          })}
                          {this.state.pictype === 'phone' && this.state.phonePhoto && this.state.phonePhoto.map((item, index, arr) => {
                            // console.log(item)
                            return (
                              <div key={index} style={{width: '27%', height: 448, backgroundColor: '#ccc', marginRight: '5%', float: 'left'}}>
                                <img style={{width: '100%', height: '100%'}} src={item.thumbUrl} />
                              </div>
                            )
                          })}
                        </Carousel>
                      </div>
                      <Icon onClick={this.handleRightClick} className='exhibition-inside-right' type='right' />
                    </div>
                  </div>
                </div> : <div>
                  <div className='exhibition-title'>
                    <h3>应用展示</h3>
                  </div>
                  <div className='exhibition-outside'>
                    <div className='exhibition-insideb'>
                      <Icon onClick={this.handleLeftClick} className='exhibition-inside-left' type='left' />
                      <div style={{width: '82%', marginLeft: '13%'}}>
                        <Carousel ref='exhibition-inside-carousel'>
                          {platPC && platPC.map((item, index, arr) => {
                            return (
                              <div key={index} style={{width: '27%', height: 448, backgroundColor: '#ccc', marginRight: '5%', float: 'left'}}>
                                <img style={{width: '100%', height: '100%'}} src={item.thumbUrl} />
                              </div>
                            )
                          })}
                          {this.state.pictype === 'phone' && this.state.phonePhoto && this.state.phonePhoto.map((item, index, arr) => {
                            // console.log(item)
                            return (
                              <div key={index} style={{width: '27%', height: 448, backgroundColor: '#ccc', marginRight: '5%', float: 'left'}}>
                                <img style={{width: '100%', height: '100%'}} src={item.thumbUrl} />
                              </div>
                            )
                          })}
                        </Carousel>
                      </div>
                      <Icon onClick={this.handleRightClick} className='exhibition-inside-right' type='right' />
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className='app-preview-introduceaa'>
              {
                type === '1' ? <div>
                  <h3>软件介绍</h3>
                  <p>{rDescribe || '无'}</p>
                </div> : <div>
                  <h3>应用介绍</h3>
                  <p>{platDate.description || '无'}</p>
                </div>
              }
            </div>
            <div className='app-preview-characteristic'>
              <h3>新版特性</h3>
              {
                type === '1' ? <div>
                  <p>{rFeatures || '无'}</p>
                </div> : <div>
                  <p>{platDate.special || '无'}</p>
                </div>
              }
            </div>
            <div className='app-preview-characteristic'>
              {
                type === '2' ? <div>
                  <h3>安装说明</h3>
                  <p>{platDate.install || '无'}</p>
                </div> : null
              }
            </div>
          </div>
        </div>
      </Modal>

    )
  }
}
export default Form.create()(SelfPleasePreview)
