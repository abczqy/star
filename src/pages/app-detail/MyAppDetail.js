/**
 * 全部应用-应用详情
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import { withRouter } from 'react-router-dom'
import './MyAppDetail.css'
import { Icon, Carousel, message } from 'antd'
import PropTypes from 'prop-types'
import config from '../../config'
import { axios } from 'utils'
import {thirdPartyAppDetail} from 'services/all-app/'
import {developmentRelated} from 'services/my-app/'

const IMG_BASE_URL_V2 = config.IMG_BASE_URL_V2
const SOFT_BASE_URL_V2 = config.SOFT_BASE_URL_V2
const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_EDU_MARKET = config.SERVICE_EDU_MARKET

class MyAppDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      appId: '1', // 应用id
      mode: 'inline',
      theme: 'light',
      appDetailId: '',
      appData: {},
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
    history: PropTypes.object
  }

  getMyappData = () => {
    thirdPartyAppDetail({
      sw_id: this.state.appDetailId
    }, (res) => {
      this.setState({
        appData: res.data
      }, () => {
        // let shishi = this.state.appData.sw_path.replace(/\//g, '')
        // eslint-disable-next-line no-eval
        // let ceshi = eval('(' + shishi + ')')
        // let a = this.state.appData.APP_PC_PIC + ''
        // let aa = JSON.parse(a)
        let bb = []
        for (let i in this.state.appData.APP_PC_PIC) {
          bb.push(this.state.appData.APP_PC_PIC[i])
        }
        this.setState({
          computerCarousel: bb,
          compatibleSystem: this.state.appData.sw_path || []
        })
        // this.handleCompatibleSystem(this.state.appData.sw_path)
      })
    }).catch((e) => { console.log(e) })
  }
  // 获取开发相关数据
  getDevelopmentRelated = () => {
    developmentRelated({
      sw_id: this.state.appDetailId
    }, (res) => {
      this.setState({
        developmentRelated: res.data || []
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
      let bb = []
      for (let i in this.state.appData.APP_PC_PIC) {
        bb.push(this.state.appData.APP_PC_PIC[i])
      }
      this.setState({
        computerCarousel: bb
      })
    } else {
      let dd = []
      for (let i in this.state.appData.sw_phone_photo) {
        dd.push(this.state.appData.sw_phone_photo[i])
      }
      this.setState({
        computerCarousel: dd
      })
    }
  }
  // 处理兼容系统字段
  handleCompatibleSystem = (data) => {
    // 第二步以逗号为分隔符分割
    let pathArray = []
    pathArray = data.length > 0 ? data.split(',') : []
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

  /**
   * 获取详情数据
   */
  getData = (thiz) => {
    let appId = this.state.appId
    axios.get(API_BASE_URL_V2 + SERVICE_EDU_MARKET + `/manage-app/detail-by-id/${appId}`)
      .then(function (res) {
        if (res.data.code === 200) {
          const data = res.data
          data.data &&
          thiz.setState({
            appData: data.data.slice()[0]
          })
        } else {
          message.warning(res.data.msg || '请求出错')
        }
      })
  }

  componentDidMount () {
    let appId = this.props.history.location.search.replace('?', '')
    this.setState({
      appId: appId
    }, function () {
      this.getData(this)
    })
    // this.setState({
    //   appDetailId: appId
    // }, () => {
    //   this.getMyappData()
    //   this.getDevelopmentRelated()
    // })
  }
  render () {
    return (
      <div className='app-detail'>
        <div className='app-detail-header'>
          <img src={IMG_BASE_URL_V2 + this.state.appData.APP_PC_PIC} />
          <div className='app-detail-header-right'>
            <p>
              <span className='header-titlea'>软件名称：{this.state.appData.APP_NAME}</span>
              <span className='header-titlea'>当前版本：{this.state.appData.APP_VERSION}</span>
            </p>
            <p>
              <span className='header-titlea'>软件类型：{this.state.appData.APP_TYPE_NAME}</span>
              <span className='header-titlea'>上架时间：{this.state.appData.CREATE_TIME}</span>
            </p>
            {/* <p>
              <span className='header-titlea'>兼容系统：{
                this.state.compatibleSystem.map((item, index, arr) => {
                  return (
                    <span key={index}>{Object.keys(arr[index])}&nbsp;&nbsp;</span>
                  )
                })
              }</span>
            </p> */}
            <p>
              <span className='header-titlea'>
                兼容系统：
                <span>{this.state.appData.RUNNING_PLATFORM}</span>
              </span>
              <span className='header-titlea'>
                <a href={`${SOFT_BASE_URL_V2}${this.state.appData.APP_DOWNLOAD_ADDRESS}`}>
                  下载
                </a>
              </span>
            </p>
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
                <div style={{width: '82%', marginLeft: '13%'}}>
                  <Carousel ref='exhibition-inside-carousel'>
                    {this.state.computerCarousel.map((item, index, arr) => {
                      return (
                        <div key={index}>
                          <div>
                            {this.state.computerCarousel[index].map((item, index, arr) => {
                              return (
                                <div key={index} style={{width: '27%', height: 448, backgroundColor: '#ccc', marginRight: '5%', float: 'left'}}>
                                  <img style={{width: '100%', height: '100%'}} src={IMG_BASE_URL_V2 + item} />
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
          {/* <div className='app-detail-introducea'>
            <h3>开发相关</h3>
            <img src={config.IMG_BASE_URL_V2 + this.state.developmentRelated.dev_photo} />
            <div>
              <div className='introduce-detail'>姓名：{this.state.developmentRelated.developers}</div>
              <div className='introduce-detail'>身份证号：{this.state.developmentRelated.dev_idcard}</div>
              <div className='introduce-detail'>主要联系人：{this.state.developmentRelated.dev_contact}</div>
              <div className='introduce-detail'>联系人电话：{this.state.developmentRelated.dev_contact_phone}</div>
            </div>
          </div> */}
          {/* <div style={{width: '100%', height: '180px', float: 'left'}}>
            <div className='app-detail-characteristica'>
              <h3>软件版权</h3>
              <img src={config.IMG_BASE_URL_V2 + this.state.appData.sw_copyright} />
            </div>
            <div className='app-detail-characteristica'>
              <h3>审核凭证</h3>
              <img src={config.IMG_BASE_URL_V2 + this.state.appData.fin_audit} />
            </div>
          </div> */}
          {/* <div className='app-detail-relevanta'>
            <h3>历史版本</h3>
            <div>
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
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

export default withRouter(MyAppDetail)
