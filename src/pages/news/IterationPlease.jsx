/**
 * 迭代申请
 */
import React from 'react'
import {Row, Col, Card, Input, Select, Button, DatePicker, Upload, Icon, message} from 'antd'
import { withRouter } from 'react-router-dom'
import { axios, array2Str } from 'utils'
import config from '../../config'
import { getUpload, getMultiUpload } from '../../services/upload'
import title from '../../assets/images/title.png'
import './NewsList.scss'
import {appId} from 'services/software-manage'
import webStorage from 'webStorage'
import PropTypes from 'prop-types'

const { TextArea } = Input

const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_EDU_MARKET = config.SERVICE_EDU_MARKET

class IterationPlease extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewHeight: 500,
      imgTitle: title,
      type: '',
      Edition: 1,
      renderEdition: [],
      // 有关上传截图
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }],
      dataL: [
        {
          key: 'win32',
          value: 'Win32'
        },
        {
          key: 'win64',
          value: 'Win64'
        },
        {
          key: 'ios',
          value: 'ios'
        },
        {
          key: 'android',
          value: 'android'
        }
      ],
      AppData: null,
      fileListOneF: [], // 用来存软件版本的文件id
      fileListTwo: [], // 用来存软件图标的文件id
      fileListThree: [], // 用来存PC端界面截图的文件id
      appId: '', // app的id  -- 新的state
      newVersion: '', // 新版本号
      newFeatrue: '', // 描述
      updateTime: null, // 更新时间
      sysVersion: '', // 用来存软件版本的文件的系统版本
      phoneIconId: null, // 软件图标-文件上传后后台传回的id
      appSoftId: null, // 软件本身-文件上传后后台传回的id
      pcIconIds: [], // 软件pc图标-文件上传后后台传回的id
      appSoft: null, // 文件-上传的文件本身
      pcIcons: [], // 文件-上传的pc截图
      phoneIcons: [], // 文件-上传的手机端截图
      currentVersion: null
    }
  }
  componentWillMount () {
    let a = window.location.href.split('?')[1].split('&')
    this.setState({
      appId: String(a[0]),
      currentVersion: String(a[1])
    })
    this.renderEdition()
    this.getAppData(String(a[0]))
    this.getHeight()
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === null) {
      this.setState({
        webStorage: false
      }, () => {
        this.getHeight()
      })
    } else {
      this.setState({
        webStorage: true
      }, () => {
        this.getHeight()
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps !== this.props) {
      if (webStorage.getItem('STAR_WEB_ROLE_CODE') === null) {
        this.setState({
          webStorage: false
        }, () => {
          this.getHeight()
        })
      } else {
        this.setState({
          webStorage: true
        }, () => {
          this.getHeight()
        })
      }
    }
  }

// 获取app数据
getAppData = (a) => {
  let value = {
    sw_id: a
  }
  appId(value, (response) => {
    this.setState({
      AppData: response
    })
  })
}
  // 添加按钮
  // addBtn=() => {
  //   this.setState({
  //     Edition: this.state.Edition + 1
  //   }, () => {
  //     this.renderEdition()
  //   })
  // }

  /**
   * 渲染软件版本-上传文件部分
   */
  getEditionRender = () => {
    let uploadSoftProps = {
      onRemove: (file) => {
        this.setState({
          appSoft: null
        })
      },
      beforeUpload: (file) => {
        this.setState({
          appSoft: file
        })
        // 采用手动上传
        return false
      },
      accept: '.exe'
    }
    return (
      <Row>
        <Col span={12}>
          <Col span={6}><span style={{visibility: 'hidden'}}>*PC无无无</span>
            <span style={{color: 'red'}}>* </span>软件版本 :
          </Col>
          <Col span={9}>
            <Select placeholder='请选择安装包版本' style={{ width: 200 }} onChange={(value) => this.onSelectChange(value)}>
              {this.state.dataL.map((item, index) => {
                return <Select.Option value={item.key} key={index}>{item.value}</Select.Option>
              })}
            </Select>
          </Col>
          <Col span={9}>
            <Upload {...uploadSoftProps}>
              <Button>
                <Icon type='upload' /> 上传文件
              </Button>
              <span className='extend'>
                <span style={{visibility: 'hidden'}}>无无无无无呜呜呜无无无无</span>支持扩展名：.exe..</span>
            </Upload>
          </Col>
        </Col>
      </Row>
    )
  }

  // 渲染软件版本列表
  renderEdition=() => {
    let value = []
    for (let i = 0; i < this.state.Edition; i++) {
      let uploadSoftProps = {
        onRemove: (file) => {
          this.setState(({ fileListOneF }) => {
            const index = fileListOneF.indexOf(file)
            const newFileList = fileListOneF.slice()
            newFileList.splice(index, 1)
            return {
              fileListOneF: newFileList
            }
          })
        },
        beforeUpload: (file) => {
          this.setState(({ fileListOneF }) => ({
            fileListOneF: [...fileListOneF, file]
          }))
          return false
        },
        fileListOneF: this.state.fileListOneF
      }

      if (i === 0) {
        value.push(
          <div key={i} style={{marginBottom: '10px'}}>
            <Row>
              <Col span={12}>
                <Col span={6}><span style={{visibility: 'hidden'}}>*PC无无无</span>
                  <span style={{color: 'red'}}>* </span>软件版本 :
                </Col>
                <Col span={9}>
                  <Select placeholder='请选择安装包版本' style={{ width: 200 }} onChange={(value) => this.onSelectChange(value, i)}>
                    {this.state.dataL.map((item, index) => {
                      return <Select.Option value={item.key} key={index}>{item.value}</Select.Option>
                    })}
                  </Select>
                </Col>
                <Col span={9}>
                  <Upload {...uploadSoftProps}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                    <span className='extend'>
                      <span style={{visibility: 'hidden'}}>无无无无无呜呜呜无无无无</span>支持扩展名：.exe..</span>
                  </Upload>
                </Col>
              </Col>
            </Row>
          </div>)
      } else {
        value.push(
          <div key={i} style={{marginBottom: '10px'}}>
            <Row>
              <Col span={12}>
                <Col span={6}>
                  <span style={{visibility: 'hidden'}}>*PC无无无<span style={{color: 'red'}}>* </span>软件版本 :</span>
                </Col>
                <Col span={9}>
                  <Select placeholder='请选择安装包版本' style={{ width: 200 }} onChange={(value) => this.onSelectChange(value, i)}>
                    {this.state.dataL.map((item, index) => {
                      return <Select.Option value={item.key} key={index}>{item.value}</Select.Option>
                    })}
                  </Select>
                </Col>
                <Col span={9}>
                  <Upload {...uploadSoftProps}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                    <span className='extend'>
                      <span style={{visibility: 'hidden'}}>无无无无呜呜呜无无无无无</span>支持扩展名：.exe..</span>
                  </Upload>
                </Col>
              </Col>
            </Row>
          </div>)
      }
    }
    this.setState({
      renderEdition: value
    }, () => {
      console.log(this.state.renderEdition)
    })
  }

  // 日期点击确定
  onOk=(value) => {
    this.setState({
      updateTime: value
    })
  }
// 整合软件版本数据
zH=() => {
  let a = []
  for (let i = 0; i < this.state.Edition; i++) {
    let c = this.state.fileListOneF[i] // 用来存软件版本的文件id
    a.push(c)
  }
  return a
}
// 整合软件版本数据
zHs=() => {
  let a = []
  for (let i = 0; i < this.state.Edition; i++) {
    let c = []
    let w = this.state.sysVersion[i]
    c.push(w)
    c.push(this.state.fileListOneF[i] ? this.state.fileListOneF[i].name : '')
    // c[w] = this.state.fileListOneF[i].name // 用来存软件版本的文件的系统版本
    a.push(c)
  }
  return a
}

  // 获取高度
  getHeight=() => {
    if (this.state.webStorage) {
      this.setState({
        viewHeight: window.innerHeight - 230
      })
    }
  }

  // 用来存软件版本的文件的系统版本
  onSelectChange =(value, index) => {
    // let a = this.state.sysVersion
    // a[index] = value
    this.setState({
      sysVersion: value
    }, () => {
      console.log('软件版本的文件的系统版本', this.state.sysVersion)
    })
  }

  // 日期变化
  onDateChange=(value, dateString) => {
    this.setState({
      updateTime: value
    })
  }

  /**
  * 更新版本
  */
  onGetVersion=(e) => {
    let {value} = e.target
    this.setState({
      newVersion: value
    })
  }

  /**
   * 软件描述
   */
  onGetNewFeatrue=(e) => {
    let {value} = e.target
    this.setState({
      newFeatrue: value
    })
  }

  /**
   * params组织 - 获取迭代接口需要的params
   */
  getParams = (thiz) => {
    const {
      appId,
      sysVersion,
      newVersion,
      newFeatrue,
      appSoftId,
      pcIconIds,
      phoneIconId,
      currentVersion
    } = this.state

    let result = {
      appDownloadAddress: appSoftId, // 下载地址 - 给后台静态文件id
      appId: appId || '', // appId
      appPcPic: array2Str(pcIconIds), // app的pc截图 -- 数组
      appPhonePic: array2Str(phoneIconId), // app的图标
      appStatus: '',
      appVersion: newVersion || '', // 新版本信息
      authDetail: '',
      newFeatures: newFeatrue || '', // app新特性
      packageName: '',
      runningPlatform: sysVersion || '', // 平台信息
      versionInfo: '',
      versionSize: '',
      currentVersion: currentVersion
    }
    // const userId = webStorage.getItem('STAR_WEB_PERSON_INFO').userId
    // result.userId = userId
    return result
  }

  /**
   * 数据获取-获取app详细信息
   */
  getAppDetail = (thiz) => {
    let { appId, currentVersion } = thiz.state
    axios.get(API_BASE_URL_V2 + SERVICE_EDU_MARKET + `/app-version?appId=${appId}&appVersion=${currentVersion}`)
      .then(function (res) {
        if (res.data.code === 200) {
          const data = res.data
          data.data &&
        thiz.setState({
          appDetail: data.data.data[0]
        })
        } else {
          message.warning(res.data.msg || '请求出错')
        }
      })
  }

  /**
   * 上传App本身
   */
  uploadApp = (thiz, callBack) => {
    if (thiz.state.appSoft) {
      // 当appSoft有值时 -- 有文件上传时
      getUpload('soft', this.state.appSoft, (res) => {
      // 设置对应的文件id
        if (res.data && res.data.code === 200) {
          thiz.setState({
            appSoftId: res.data.data
          }, function () {
            callBack && callBack(thiz)
          })
        } else {
          callBack && callBack(thiz)
        }
      })
    } else {
      // 保证回调执行-不阻塞
      callBack && callBack(thiz)
    }
  }

  /**
   * 上传phoneIcons
   */
  uploadPhoneIcons = (thiz, callBack) => {
    if (thiz.state.phoneIcons) {
      // 当phoneIcons有值时 -- 有文件上传时
      getMultiUpload('pic', this.state.phoneIcons, (res) => {
        // 设置对应的文件id
        if (res.data && res.data.code === 200) {
          thiz.setState({
            phoneIconId: res.data.data.slice()
          }, function () {
            callBack && callBack(thiz)
          })
        } else {
          callBack && callBack(thiz)
        }
      })
    } else {
      // 保证回调执行-不阻塞
      callBack && callBack(thiz)
    }
  }

  /**
   * 上传App的pc截图
   */
  uploadPcPics = (thiz, callBack) => {
    if (thiz.state.pcIcons.length !== 0) {
      getMultiUpload('pic', this.state.pcIcons, (res) => {
        // 设置对应的文件id
        if (res.data && res.data.code === 200) {
          thiz.setState({
            pcIconIds: res.data.data.slice()
          }, function () {
            callBack && callBack(thiz)
          })
        } else {
          callBack && callBack(thiz)
        }
      })
    } else {
      // 保证回调执行-不阻塞
      callBack && callBack(thiz)
    }
  }

  /**
   * 接口调用 - 提交数据
   */
  getSubmit = (thiz) => {
    const appId = thiz.state.appId
    // const userId = webStorage.getItem('STAR_WEB_PERSON_INFO').userId
    // const url = `http://192.168.2.142:10301/app-version/apply/${appId}`
    const url = API_BASE_URL_V2 + SERVICE_EDU_MARKET + `/app-version/apply/${appId}`
    axios.post(url, {...thiz.getParams()})
      .then(function (res) {
        if (res.data.code === 200) {
          message.success(res.data.msg || '提交成功')
          // 还要跳回上一页
          thiz.props.history.goBack()
        } else {
          message.warning(res.data.msg || '提交失败')
        }
      })
  }

  /**
   * 提交
   */
  onSubmit = (thiz) => {
    // 先上传state中的文件数据
    // 先上传app的手机端图标
    thiz.uploadPhoneIcons(thiz, () => {
      // 上传app软件
      thiz.uploadApp(thiz, () => {
        thiz.uploadPcPics(thiz, () => {
          // 提交整个表单
          thiz.getSubmit(thiz)
        })
      })
    })
    // 再在上传回调中提交本次表单数据
  }

  /**
   * 取消
   */
  onCancel = () => {
    this.props.history.goBack()
  }

  componentDidMount () {
    // 获取appId
    this.getAppDetail(this)
  }

  render () {
    // 上传手机端截图
    const uploadPhonePicsProps = {
      listType: 'picture',
      onRemove: (file, fileList) => {
        // 从state中拷贝一个文件数组 删除一个文件对应的元素 返回一个删除后的新数组
        let newFileList = this.state.phoneIcons.slice()
        const index = newFileList.indexOf(file)
        newFileList.splice(index, 1)
        this.setState({
          phoneIcons: newFileList
        })
      },
      beforeUpload: (file, fileList) => {
        // 把新文件添加到state原来的数组中
        this.setState({
          phoneIcons: [...this.state.phoneIcons, file]
        })
        // 采用手动上传
        return false
      }
    }
    // 上传pc界面截图
    const uploadPcIconProps = {
      listType: 'picture',
      onRemove: (file, fileList) => {
        // 从state中拷贝一个文件数组 删除一个文件对应的元素 返回一个删除后的新数组
        let newFileList = this.state.pcIcons.slice()
        const index = newFileList.indexOf(file)
        newFileList.splice(index, 1)
        this.setState({
          pcIcons: newFileList
        })
      },
      beforeUpload: (file, fileList) => {
        // 把新文件添加到state原来的数组中
        this.setState({
          pcIcons: [...this.state.pcIcons, file]
        })
        // 采用手动上传
        return false
      }
    }
    return (
      <Card title='迭代申请' style={{marginLeft: '12%', width: '80%', minHeight: this.state.viewHeight}}>
        <div >
          <Row>
            <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />软件相关</p></Row>
            <Row className='Wxd'>
              <Col span={12}>
                <Col span={6}>
                  <span style={{visibility: 'hidden'}}>*PC无无无</span>
                  <span style={{visibility: 'hidden'}}>* </span>软件类型 :
                </Col>
                <Col span={5}>
                  <span>
                    { this.state.appDetail && (this.state.appDetail.APP_TYPE_NAME || '教学类') }
                  </span>
                </Col>
              </Col>
              <Col span={8}>
                <Col span={5}>
                  <span style={{visibility: 'hidden'}}>* </span>软件名称 :
                </Col>
                <Col span={18}>
                  {/* <span>超级教师</span> */}
                  <span>
                    { this.state.appDetail && (this.state.appDetail.APP_NAME || '英语教室') }
                  </span>
                </Col>
              </Col>
            </Row>
            <Row className='Wxd'>
              <Col span={12}>
                <Col span={6}>
                  <span style={{visibility: 'hidden'}}>*PC无无无</span>
                  <span style={{visibility: 'hidden'}}>* </span>当前版本 :
                </Col>
                <Col span={5}>
                  <span>
                    { this.state.appDetail && (this.state.appDetail.APP_VERSION || 'v8.0') }
                  </span>
                </Col>
              </Col>
              <Col span={8}>
                <Col span={5}>
                  <span style={{color: 'red'}}>* </span>更新版本 :
                </Col>
                <Col span={18}>
                  <Input placeholder='请输入版本号' style={{ width: 280 }} onChange={this.onGetVersion} value={this.state.newVersion} /></Col>
              </Col>
            </Row>
            <Row className='Wxd'>
              <Col span={23}>
                <span style={{visibility: 'hidden'}}>*PC无无无</span>
                <span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>新版本特性 : </span>
                <span style={{visibility: 'hidden'}}>无无无 </span>
                <TextArea placeholder='请输入新版本特性' style={{ width: 880 }} onChange={this.onGetNewFeatrue} value={this.state.newFeatrue} /></Col>
            </Row>
            <Row className='Wxd'>
              <Row className='Wxds'>
                { this.getEditionRender() }
              </Row>
              <Row className='Wxd'>
                <Col span={12}>
                  <Col span={6}>
                    <span style={{visibility: 'hidden'}}>*PC无无无</span>
                    <span style={{visibility: 'hidden'}}>* 软件描述 : </span>
                  </Col>
                  {/* <Col span={5}>
                    <Button type='danger' onClick={this.addBtn}>+添加提供版本</Button>
                  </Col> */}
                </Col>
              </Row>
              <Row className='Wxd'>
                <Col span={12}>
                  <Col span={6}>
                    <span style={{visibility: 'hidden'}}>*PC</span>
                  手机端界面截图 :
                  </Col>
                  <Col span={9}>
                    <Upload {...uploadPhonePicsProps}>
                      <Button>
                        <Icon type='upload' /> 上传文件
                      </Button>
                      <span className='extend'>
                        <span style={{visibility: 'hidden'}}>无无无无无无无无无无五五</span>支持扩展名：.png .jpg ... （400px*400px）</span>
                    </Upload>
                  </Col>
                </Col>
              </Row>
              <Row className='Wxd'>
                <Col span={12}>
                  <Col span={6}>
                    <span style={{visibility: 'hidden'}}>*PC 无</span>
                    <span>PC端界面截图 : </span>
                  </Col>
                  <Col span={9}>
                    <Upload {...uploadPcIconProps}>
                      <Button>
                        <Icon type='upload' /> 上传文件
                      </Button>
                      <span className='extend'>
                        <span style={{visibility: 'hidden'}}>无无无无无无无无无无五五</span>支持扩展名：.png .jpg ... （400px*400px）</span>
                    </Upload>
                  </Col>
                </Col>
              </Row>
            </Row>
            <Row>
              <Col span={12}>
                <Col span={6}>
                  <span style={{visibility: 'hidden'}}>*PC无无无</span>
                  <span>更新时间 : </span>
                </Col>
                <Col span={16}>
                  <DatePicker
                    style={{width: '280px'}}
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'
                    placeholder='Select Time'
                    onChange={this.onDateChange}
                    onOk={this.onOk}
                  />
                </Col>
              </Col>
            </Row>
            <Row>
              <div style={{marginTop: '20px'}}>
                <Col>
                  <Col span={16} />
                  <Col span={2}>
                    <Button type='primary' onClick={() => this.onSubmit(this)}>
                      提交申请
                    </Button>
                  </Col>
                  <Col span={2}>
                    <Button onClick={this.onCancel}>
                      取消
                    </Button>
                  </Col>
                </Col>
              </div>
            </Row>
          </Row>
        </div>
      </Card>
    )
  }
}

IterationPlease.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(IterationPlease)
