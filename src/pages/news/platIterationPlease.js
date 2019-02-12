import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './NewsList.scss'
import {Card, Row, Col, Input, DatePicker, Upload, Button, Icon, message} from 'antd'
import { axios } from 'utils'
import config from '../../config'
import { getUpload, getMultiUpload } from '../../services/upload'
// import title from '../../assets/images/title.png'
// import {appId} from 'services/software-manage'
// import webStorage from 'webStorage'
import PropTypes from 'prop-types'
const TextArea = Input.TextArea
const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_EDU_MARKET = config.SERVICE_EDU_MARKET
class PlatIterationPlease extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newVersion: '',
      newFeatrue: '',
      newDescription: '',
      newInstall: '',
      indexUrl: '',
      testUrl: '',
      md5: '',
      token: '',
      pcIcons: [],
      softList: [],
      icon: [],
      showIcon: [],
      platId: '',
      currentVersion: '',
      appDetail: [],
      iconId: '',
      softId: '',
      imgId: []
    }
  }
  componentWillMount () {
    let a = window.location.href.split('?')[1].split('&')
    this.setState({
      platId: String(a[0]),
      currentVersion: String(a[1])
    })
  }
  componentDidMount () {
    this.getPlatData(this)
  }

  // 获取数据
  getPlatData = (thiz) => {
    const { platId, currentVersion } = thiz.state
    axios.get(API_BASE_URL_V2 + SERVICE_EDU_MARKET + `/app-version?appId=${platId}&appVersion=${currentVersion}`)
      .then(function (res) {
        console.log(res.data.data)
        if (res.data.code === 200) {
          const data = res.data
          let detail = data.data.data[0]
          data.data &&
          thiz.setState({
            appDetail: data.data.data[0],
            newDescription: detail.APP_NOTES,
            newInstall: detail.INSTALL_INFO,
            indexUrl: detail.INDEX_URL,
            testUrl: detail.TEST_URL
          })
        } else {
          message.warning(res.data.msg || '请求出错')
        }
      })
  }
  onGetVersion = (e) => {
    const {value} = e.target
    this.setState({
      newVersion: value
    })
  }
  onGetNewFeatrue = (e) => {
    const {value} = e.target
    this.setState({
      newFeatrue: value
    })
  }
  onGetDescription = (e) => {
    const {value} = e.target
    this.setState({
      newDescription: value
    })
  }
  onGetInstall = (e) => {
    const {value} = e.target
    this.setState({
      newInstall: value
    })
  }
  onGetIndexUrl = (e) => {
    const {value} = e.target
    this.setState({
      indexUrl: value
    })
  }
  onGetTestURL = (e) => {
    const {value} = e.target
    this.setState({
      testUrl: value
    })
  }
  onGetMd5 = (e) => {
    const {value} = e.target
    this.setState({
      md5: value
    })
  }
  onGetToken = (e) => {
    const {value} = e.target
    this.setState({
      token: value
    })
  }
  // 提交数据
  handleSubmit = () => {
    console.log(this)
    this.uploadIcon(this, () => {
      this.uploadSoft(this, () => {
        this.uploadPCImg(this, () => {
          this.postData(this)
        })
      })
    })
  }
  // 上传图标
  uploadIcon = (thiz, callBack) => {
    if (thiz.state.icon.length > 0) {
      getUpload('pic', this.state.icon[0], (res) => {
        if (res.data && res.data.code === 200) {
          thiz.setState({
            iconId: res.data.data
          }, () => {
            callBack && callBack(thiz)
          })
        } else {
          message.warn('图标上传失败')
        }
      })
    } else {
      callBack && callBack(thiz)
    }
  }
  // 上传应用文件
  uploadSoft = (thiz, callBack) => {
    if (this.state.softList.length > 0) {
      getUpload('soft', thiz.state.softList[0], (res) => {
        console.log(res.data.code === 200)
        if (res.data.code === 200) {
          thiz.setState({
            softId: res.data.data
          })
          callBack && callBack(thiz)
        } else {
          message.warn('文件上传失败')
        }
      })
    } else {
      message.warn('请上传文件')
    }
  }
  // 上传界面截图
  uploadPCImg = (thiz, callBack) => {
    if (thiz.state.pcIcons.length > 0) {
      getMultiUpload('pic', thiz.state.pcIcons, (res) => {
        console.log(res.data.code === 200)
        if (res.data && res.data.code === 200) {
          thiz.setState({
            imgId: res.data.data
          })
          callBack && callBack(thiz)
        } else {
          message.warn('截图上传失败')
        }
      })
    } else {
      callBack && callBack(thiz)
    }
  }
  // 提交数据
  postData = (thiz) => {
    console.log(thiz)
    const {platId, currentVersion, newVersion, newFeature, newDescription, newInstall, indexUrl, testUrl, md5, token, iconId, imgId, softId} = thiz.state
    if (newVersion === '') {
      message.warn('请填写更新版本')
      return
    }
    if (newFeature === '') {
      message.warn('请填写新特性')
      return
    }
    if (md5 === '') {
      message.warn('请填写md5校验码')
      return
    }
    if (token === '') {
      message.warn('请填写单点登录临时token接受地址')
      return
    }
    let params = {
      appId: platId,
      appStatus: '',
      appVersion: newVersion,
      newFeature: newFeature,
      currentVersion: currentVersion,
      indexUrl: indexUrl,
      installInfo: newInstall,
      md5Code: md5,
      tokenAddress: token,
      appNotes: newDescription,
      testUrl: testUrl
    }
    if (iconId !== '') {
      params.appIcon = iconId
    }
    if (imgId.length > 0) {
      params.appPcPic = imgId
    }
    if (softId !== '') {
      params.storeLocation = softId
    }
    params.appPcPic = params.appPcPic.join(',')
    const url = API_BASE_URL_V2 + SERVICE_EDU_MARKET + `/app-version/apply/${platId}`
    axios.post(url, {...params})
      .then((res) => {
        console.log(res)
        if (res.data && res.data.code === 200) {
          message.success('上传成功')
          thiz.props.history.goBack()
        } else {
          message.warn(res.data.msg)
        }
      })
  }
  render () {
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
    const uplaodSoft = {
      onRemove: (file, fileList) => {
        this.setState({
          softList: []
        })
      },
      beforeUpload: (file, fileList) => {
        console.log(fileList)
        this.setState({
          softList: fileList
        })
        return false
      }
    }
    const uplaodIcon = {
      listType: 'picture',
      onRemove: (file, fileList) => {
        this.setState({
          icon: []
        })
      },
      beforeUpload: (file, fileList) => {
        console.log(fileList)
        this.setState({
          icon: [file]
        })
        return false
      },
      onChange: ({fileList}) => {
        fileList = fileList.slice(-1)
        console.log(fileList)
        this.setState({
          showIcon: fileList
        })
      }
    }
    return (
      <div>
        <Card title='迭代申请' style={{marginLeft: '12%', width: '80%', minHeight: 800}}>
          <div>
            <Row>
              <Row><p style={{fontSize: '14px'}}>应用相关</p></Row>
              <Row className='Wxd'>
                <Col span={12}>
                  <Col span={6}>
                    <span style={{visibility: 'hidden'}}>*PC无无无</span>
                    <span style={{visibility: 'hidden'}}>* </span>应用类型 :
                  </Col>
                  <Col span={5}>
                    <span>
                      { this.state.appDetail && (this.state.appDetail.APP_TYPE_NAME || '教学类') }
                    </span>
                  </Col>
                </Col>
                <Col span={8}>
                  <Col span={5}>
                    <span style={{visibility: 'hidden'}}>* </span>应用名称 :
                  </Col>
                  <Col span={18}>
                    {/* <span>超级教师</span> */}
                    <span>
                      { this.state.appDetail && (this.state.appDetail.APP_NAME || '无') }
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
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>应用文件：</span>
                </Col>
                <Col span={20}>
                  <Upload {...uplaodSoft} fileList={this.state.softList}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                    <span className='extend'>支持扩展名：.zip</span>
                  </Upload>
                </Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>* </span>
                  <span>新版本特性：</span>
                </Col>
                <Col span={20}>
                  <TextArea placeholder='请输入新版本特性' style={{ width: 880 }} onChange={this.onGetNewFeatrue} value={this.state.newFeatrue} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>软件描述：</span>
                </Col>
                <Col span={20}>
                  <TextArea placeholder='请输入软件描述' onChange={this.onGetDescription} value={this.state.newDescription} style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>安装说明：</span>
                </Col>
                <Col span={20}>
                  <TextArea placeholder='请输入安装说明' onChange={this.onGetInstall} value={this.state.newInstall} style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>根路径：</span>
                </Col>
                <Col span={20}>
                  <Input placeholder='请输入根路径' onChange={this.onGetIndexUrl} value={this.state.indexUrl} style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>测试路径：</span>
                </Col>
                <Col span={20}>
                  <Input placeholder='请输入测试路径' onChange={this.onGetTestURL} value={this.state.testUrl} style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>应用安装包MD5校验码：</span>
                </Col>
                <Col span={20}>
                  <TextArea placeholder='请输入校验码' onChange={this.onGetMd5} value={this.state.md5} style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>单点登陆临时TOKEN接受地址：</span>
                </Col>
                <Col span={20}>
                  <TextArea placeholder='请输入token' onChange={this.onGetToken} value={this.state.token} style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>应用图标：</span>
                </Col>
                <Col span={20}>
                  <Upload {...uplaodIcon} fileList={this.state.showIcon} >
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                    <span className='extend'>支持扩展名：.zip</span>
                  </Upload>
                </Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span>界面截图 : </span>
                </Col>
                <Col span={20}>
                  <Upload {...uploadPcIconProps}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                    <span className='extend'>支持扩展名：.png .jpg ... （400px*400px）</span>
                  </Upload>
                </Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
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
              </Row>
              <Row className='Wxd'>
                <Col span={5} offset={8}>
                  <Button type='primary' onClick={this.handleSubmit}>提交</Button>
                </Col>
                <Col span={5}>
                  <Button onClick={() => {
                    this.props.history.goBack()
                  }}>取消</Button>
                </Col>
              </Row>
            </Row>
          </div>
        </Card>
      </div>
    )
  }
}

PlatIterationPlease.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(PlatIterationPlease)
