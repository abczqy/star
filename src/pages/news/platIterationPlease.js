import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './NewsList.scss'
import {Card, Row, Col, Input, DatePicker, Upload, Button, Icon} from 'antd'
// import { axios, array2Str } from 'utils'
// import config from '../../config'
// import { getUpload, getMultiUpload } from '../../services/upload'
// import title from '../../assets/images/title.png'
// import {appId} from 'services/software-manage'
// import webStorage from 'webStorage'
// import PropTypes from 'prop-types'
const TextArea = Input.TextArea
class PlatIterationPlease extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newVersion: '',
      newFeatrue: '',
      pcIcons: [],
      softList: [],
      icon: []
    }
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
                      {/* { this.state.appDetail && (this.state.appDetail.APP_TYPE_NAME || '教学类') } */}
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
                      {/* { this.state.appDetail && (this.state.appDetail.APP_NAME || '英语教室') } */}
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
                      {/* { this.state.appDetail && (this.state.appDetail.APP_VERSION || 'v8.0') } */}
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
                  <TextArea placeholder='请输入软件描述' style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>安装说明：</span>
                </Col>
                <Col span={20}>
                  <TextArea placeholder='请输入安装说明' style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>根路径：</span>
                </Col>
                <Col span={20}>
                  <Input placeholder='请输入根路径' style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>测试路径：</span>
                </Col>
                <Col span={20}>
                  <Input placeholder='请输入测试路径' style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>应用安装包mMD5校验码：</span>
                </Col>
                <Col span={20}>
                  <TextArea placeholder='请输入校验码' style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>单点登陆临时token接受地址：</span>
                </Col>
                <Col span={20}>
                  <TextArea placeholder='请输入token' style={{ width: 880 }} /></Col>
              </Row>
              <Row className='Wxd'>
                <Col span={2} offset={2}>
                  <span style={{color: 'red'}}>*</span>
                  <span>应用图标：</span>
                </Col>
                <Col span={20}>
                  <Upload {...uplaodIcon} fileList={this.state.icon}>
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
              <Row>
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
            </Row>
          </div>
        </Card>
      </div>
    )
  }
}

export default withRouter(PlatIterationPlease)
