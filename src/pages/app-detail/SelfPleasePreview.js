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
    this.state = {
      appDetailData: props.dataPre || '',
      obj: {
        display: 'none'
      },
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
    hiddenModal: PropTypes.func
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
    let thiz = this.state.appDetailData
    let rname = thiz.get('rname')
    let rType = thiz.get('rType')
    let detailType = thiz.get('detailType').split(',')
    let detailSize = thiz.get('detailSize').split(',')
    let detailVersionNum = thiz.get('detailVersionNum').split(',')
    let detailPackName = thiz.get('detailPackName').split(',')
    let detailAuth = thiz.get('detailAuth').split(',')
    let rDescribe = thiz.get('rDescribe')
    let rFeatures = thiz.get('rFeatures')
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
            <img src={this.state.icon && this.state.icon[0]} />
            <div className='app-preview-header-right'>
              <h2 className='header-title'>{rname || '无'}</h2>
              <p className='header-classification'>分类：{rType || '无'}</p>
              <div className='header-see-detail'>
                <span onClick={this.handleSeeDetail} style={{cursor: 'pointer', zIndex: '100'}}>查看详情</span><Icon style={{marginLeft: '8px'}} type='caret-down' />
              </div>
            </div>
            <div className={this.state.addClassName} ref='see-detail-item' style={this.state.obj}>
              {detailType && detailType.map((item, index) => {
              // eslint-disable-next-line no-unused-expressions
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
              <div className='see-detail-item-jurisdiction'>
                <span className='jurisdiction-title'>权限详情:</span>
                <ul className='jurisdiction-list'>
                  {detailAuth && detailAuth.map((item, index) => {
                  // eslint-disable-next-line no-unused-expressions
                    return <li className='jurisdiction-list-detail' key={index} >{this.state.authItem[item] || '无'}</li>
                  })}
                </ul>
              </div>
            </div>
            <div className='app-preview-exhibition'>
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
                            <img style={{width: '100%', height: '100%'}} src={item} />
                          </div>
                        )
                      })}
                      {this.state.pictype === 'phone' && this.state.phonePhoto && this.state.phonePhoto.map((item, index, arr) => {
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
            <div className='app-preview-introduceaa'>
              <h3>应用介绍</h3>
              <p>{rDescribe || '无'}</p>
            </div>
            <div className='app-preview-characteristic'>
              <h3>新版特性</h3>
              <p>{rFeatures || '无'}</p>
            </div>
          </div>
        </div>
      </Modal>

    )
  }
}
export default Form.create()(SelfPleasePreview)
