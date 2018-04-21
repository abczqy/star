/**
 * 迭代申请
 */

import React from 'react'
import {Row, Col, Card, Input, Select, Button, message, Upload, Icon, DatePicker, Modal} from 'antd'
import title from '../../assets/images/title.png'
import './NewsList.scss'
// import axios from 'axios'
// import ajaxUrl from 'config'

const { TextArea } = Input

class IterationPlease extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imgTitle: title,
      newV: '',
      type: '',
      rDescribe: '',
      Edition: 1,
      renderEdition: [],
      hopeTime: '',
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
          key: '1',
          value: 'Windows7'
        },
        {
          key: '2',
          value: 'Windows8'
        },
        {
          key: '3',
          value: 'phone'
        }
      ],
      array: [],
      arrays: []
    }
  }
  componentWillMount () {
    this.renderEdition()
  }
  // 更新版本
  newV=(e) => {
    let {value} = e.target
    this.setState({
      newV: value
    })
  }
  // 类型
  type=(value) => {
    this.setState({
      type: value
    })
  }
  // 软件描述
  rDescribe=(e) => {
    let {value} = e.target
    this.setState({
      rDescribe: value
    })
  }
  // 添加按钮
  addBtn=() => {
    this.setState({
      Edition: this.state.Edition + 1
    }, () => {
      this.renderEdition()
    })
  }
  // 渲染软件版本列表
  renderEdition=() => {
    let props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text'
      },
      onChange (info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`)
        }
      }
    }
    let value = []
    for (let i = 0; i < this.state.Edition; i++) {
      if (i === 0) {
        value.push(
          <div key={i} style={{marginBottom: '10px'}}>
            <Row>
              <Col span={12}>
                <Col span={6}><span style={{visibility: 'hidden'}}>*PC无无无</span>
                  <span style={{color: 'red'}}>* </span>软件版本 :
                </Col>
                <Col span={9}>
                  <Select placeholder='请选择安装包版本' style={{ width: 200 }} >
                    {this.state.dataL.map((item, index) => {
                      return <Select.Option value={item.value} key={index}>{item.value}</Select.Option>
                    })}
                  </Select>
                </Col>
                <Col span={6}>
                  <Upload {...props}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
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
                  <Select placeholder='请选择安装包版本' style={{ width: 200 }} >
                    {this.state.dataL.map((item, index) => {
                      return <Select.Option value={item.value} key={index}>{item.value}</Select.Option>
                    })}
                  </Select>
                </Col>
                <Col span={6}>
                  <Upload {...props}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
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
  // 日期变化
  onChange=(value, dateString) => {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }
  // 日期点击确定
  onOk=(value) => {
    console.log('onOk: ', value)
    this.setState({
      hopeTime: value
    })
  }
  // 关闭图片
  handleCancel = () => this.setState({ previewVisible: false })
  // 显示图片
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  // 图片改变
  handleChange = ({ fileList }) => this.setState({ fileList })

  // 关闭图片
  handleCancels = () => this.setState({ previewVisible: false })
  // 显示图片
  handlePreviews = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }
  // 图片改变
  handleChanges = ({ fileList }) => this.setState({ fileList })

  // 提交表单啦
  submit=() => {
    let value = {
      newV: this.state.newV, // 更新版本
      rDescribe: this.state.rDescribe, // 软件描述
      hopeTime: this.state.hopeTime, // 期望上架时间
      copTypes: this.state.array, // 多个系统类别
      filelist: this.state.arrays // 附件列表
    }
    console.log('上架流程点击提交传的值', value)
  }
  render () {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    return <Card title='迭代申请' style={{marginLeft: '15%', width: '1300px'}}>
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
                <span>教育类</span>
              </Col>
            </Col>
            <Col span={8}>
              <Col span={5}>
                <span style={{visibility: 'hidden'}}>* </span>软件名称 :
              </Col>
              <Col span={18}>
                <span>超级教书的</span>
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
                <span>v1.3</span>
              </Col>
            </Col>
            <Col span={8}>
              <Col span={5}>
                <span style={{color: 'red'}}>* </span>更新版本 :
              </Col>
              <Col span={18}>
                <Input placeholder='请输入关键字' style={{ width: 280 }} onChange={this.newV} value={this.state.newV} /></Col>
            </Col>
          </Row>
          <Row className='Wxd'>
            <Col span={23}>
              <span style={{visibility: 'hidden'}}>*PC无无无</span>
              <span style={{color: 'red'}}>* </span>软件描述 :
              <span style={{visibility: 'hidden'}}>无</span>
              <TextArea placeholder='请输入关键字' style={{ width: 880 }} onChange={this.rDescribe} value={this.state.rDescribe} /></Col>
          </Row>
          <Row className='Wxd'>
            <Row className='Wxds'>
              {this.state.renderEdition.map((item, index) => {
                return item
              })}
            </Row>
            <Row className='Wxd'>
              <Col span={12}>
                <Col span={6}>
                  <span style={{visibility: 'hidden'}}>*PC无无无</span>
                  <span style={{visibility: 'hidden'}}>* 软件描述 : </span>
                </Col>
                <Col span={5}>
                  <Button type='danger' onClick={this.addBtn}>+添加提供版本</Button>
                </Col>
              </Col>
            </Row>
            <Row className='Wxd'>
              <Col span={12}>
                <Col span={6}>
                  <span style={{visibility: 'hidden'}}>*PC无无无</span>
                  <span style={{color: 'red'}}>* </span>软件图标 :
                </Col>
                <Upload
                  action='//jsonplaceholder.typicode.com/posts/'
                  listType='picture-card'
                  fileList={fileList}
                  onPreview={this.handlePreviews}
                  onChange={this.handleChanges}
                >
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
              </Col>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancels}>
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Row>
            <Row className='Wxd'>
              <Col span={12}>
                <Col span={6}>
                  <span style={{visibility: 'hidden'}}>*PC 无</span>
                  <span>PC端界面截图 : </span>
                </Col>
                <Col span={13}>
                  <Upload
                    action='//jsonplaceholder.typicode.com/posts/'
                    listType='picture-card'
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                </Col>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt='example' style={{ width: '100%' }} src={previewImage} />
                </Modal>
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
                  onChange={this.onChange}
                  onOk={this.onOk}
                />
              </Col>
            </Col>
          </Row>
          <Row>
            <div style={{marginTop: '20px'}}>
              <Col>
                <Col span={16} />
                <Col span={2}><Button type='primary' onClick={this.submit}>提交申请</Button></Col>
                <Col span={2}><Button>取消</Button></Col>
              </Col>
            </div>
          </Row>
        </Row>
      </div>
    </Card>
  }
}

export default IterationPlease
