import React from 'react'
import {Row, Col, Card, Input, Select, Button, message, Upload, Icon, DatePicker, Modal, Radio} from 'antd'
import title from '../../assets/images/title.png'
import './newsList.scss'

const { TextArea } = Input
const RadioGroup = Radio.Group

class ShelfPlease extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imgTitle: title,
      rname: '',
      type: '',
      rDescribe: '',
      Edition: 1,
      renderEdition: [],
      hopeTime: '',
      name: '',
      idNumber: '',
      conPeople: '',
      conPeopleNum: '',
      radio: '',
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
      ]
    }
  }
  componentWillMount () {
    this.renderEdition()
  }
  // 软件名称
  rnameChange=(e) => {
    let {value} = e.target
    this.setState({
      rname: value
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
              <Col span={1} />
              <Col span={6}><span><span style={{color: 'red'}}>* </span>软件版本 : </span><Select placeholder='请选择安装包版本' style={{ width: 200 }} >
                {this.state.dataL.map((item, index) => {
                  return <Select.Option value={item.value} key={index}>{item.value}</Select.Option>
                })}
              </Select></Col>
              <Col span={6}>
                <Upload {...props}>
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                </Upload>
              </Col>
            </Row>
          </div>)
      } else {
        value.push(
          <div key={i} style={{marginBottom: '10px'}}>
            <Row>
              <Col span={1} />
              <Col span={6}><span style={{visibility: 'hidden'}}>* 软件版本 : </span><Select placeholder='请选择安装包版本' style={{ width: 200 }} >
                {this.state.dataL.map((item, index) => {
                  return <Select.Option value={item.value} key={index}>{item.value}</Select.Option>
                })}
              </Select></Col>
              <Col span={6}>
                <Upload {...props}>
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                </Upload>
              </Col></Row>
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
  // 存开发相关的name
  name=(e) => {
    let {value} = e.target
    this.setState({
      name: value
    })
  }
  // 存身份证号
  idNumber=(e) => {
    let {value} = e.target
    this.setState({
      idNumber: value
    })
  }
  // 存联系人
  conPeople=(e) => {
    let {value} = e.target
    this.setState({
      conPeople: value
    })
  }
  // 存联系人
  conPeopleNum=(e) => {
    let {value} = e.target
    this.setState({
      conPeopleNum: value
    })
  }
  // 存单选框
  radio = (e) => {
    this.setState({
      radio: e.target.value
    })
  }
  // 提交表单啦
  submit=() => {
    let value = {
      rname: this.state.rname, // 软件名称
      type: this.state.type, // 软件类型
      rDescribe: this.state.rDescribe, // 软件描述
      hopeTime: this.state.hopeTime, // 期望上架时间
      name: this.state.name, // 开发相关名字
      idNumber: this.state.idNumber, // 身份证号
      conPeople: this.state.conPeople, // 主要联系人
      conPeopleNum: this.state.conPeopleNum, // 主要联系人电话
      radio: this.state.radio// 软件版权类别
    }
    console.log('上架流程点击提交传的值', value)
  }
  render () {
    const data = [
      {
        key: '1',
        value: '类型1'
      },
      {
        key: '2',
        value: '类型2'
      },
      {
        key: '3',
        value: '类型3'
      }
    ]
    const propss = {
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
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    return <Card title='上架申请' style={{marginLeft: '15%', width: '1300px'}}>
      <div >
        <Row>
          <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />软件相关</p></Row>
          <Row className='Wxd'>
            <Col span={1} />
            <Col span={12}><span style={{color: 'red'}}>* </span>软件名称 : <Input placeholder='请输入关键字' style={{ width: 280 }} onChange={this.rnameChange} value={this.state.rname} /></Col>
            <Col span={11}><span style={{color: 'red'}}>* </span>类型 : <Select placeholder='教育类' style={{ width: 200 }} onChange={(value) => this.type(value)} value={this.state.type} >
              {data.map((item, index) => {
                return <Select.Option value={item.value} key={index}>{item.value}</Select.Option>
              })}
            </Select></Col>
          </Row>
          <Row className='Wxd'>
            <Col span={1} />
            <Col span={20}><span style={{color: 'red'}}>* </span>软件描述 : <TextArea placeholder='请输入关键字' style={{ width: 880 }} onChange={this.rDescribe} value={this.state.rDescribe} /></Col>
          </Row>
          <Row className='Wxd'>
            <Row className='Wxds'>
              {this.state.renderEdition.map((item, index) => {
                return item
              })}
            </Row>
            <Row className='Wxd'>
              <Col span={1} />
              <Col span={6}>
                <span style={{visibility: 'hidden'}}>* 软件描述 : </span>
                <Button type='danger' onClick={this.addBtn}>+添加提供版本</Button>
              </Col>
            </Row>
            <Row className='Wxd'>
              <Col span={1} />
              <Col span={10}>
                <span style={{color: 'red'}}>* </span>软件图标 : <Upload {...propss}>
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                </Upload>
              </Col>
              <Col span={8}>
                <span>期望上架时间 : </span><DatePicker
                  style={{width: '280px'}}
                  showTime
                  format='YYYY-MM-DD HH:mm:ss'
                  placeholder='Select Time'
                  onChange={this.onChange}
                  onOk={this.onOk}
                />
              </Col>
            </Row>
            <Row className='Wxd'>
              <Col span={10}>
                <Col span={1} />
                <Col span={6}><span>PC端界面截图 : </span></Col>
                <Col span={10}><Upload
                  action='//jsonplaceholder.typicode.com/posts/'
                  listType='picture-card'
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload></Col>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt='example' style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Col>
            </Row>
            <div style={{borderBottom: '2px dotted #ddd', height: '2px', width: '1200px', marginLeft: '2%', marginBottom: '2%', marginTop: '4%'}} />
          </Row>
        </Row>
        <Row>
          <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />开发相关</p></Row>
          <Row className='Wxd'>
            <Col span={1} />
            <Col span={12}><span style={{color: 'red'}}>* </span>姓名 : <Input placeholder='请输入名字' style={{ width: 280 }} onChange={this.name} value={this.state.name} /></Col>
            <Col span={11}><span style={{color: 'red'}}>* </span>身份证号 : <Input placeholder='请输入身份证号' style={{ width: 200 }} onChange={this.idNumber} value={this.state.idNumber} /></Col>
          </Row>
          <Row className='Wxd'>
            <Col span={1} />
            <Col><span style={{color: 'red'}}>* </span>手持身份证照片 : <Upload {...propss}>
              <Button>
                <Icon type='upload' /> 上传文件
              </Button>
            </Upload></Col>
          </Row>
          <Row className='Wxd'>
            <Col span={1} />
            <Col span={12}><span style={{color: 'red'}}>* </span>主要联系人 : <Input placeholder='请输入联系人' style={{ width: 280 }} onChange={this.conPeople} value={this.state.conPeople} /></Col>
            <Col span={8}><span style={{color: 'red'}}>* </span>联系人电话 : <Input placeholder='请输入联系人电话' style={{ width: 200 }} onChange={this.conPeopleNum} value={this.state.conPeopleNum} /></Col>
          </Row>
          <div style={{borderBottom: '2px dotted #ddd', height: '2px', width: '1200px', marginLeft: '2%', marginBottom: '3%', marginTop: '4%'}} />
        </Row>
        <Row>
          <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />软件版权</p></Row>
          <Row className='Wxd'>
            <Col span={1} />
            <Col span={15}>
              <RadioGroup onChange={this.radio} value={this.state.radio}>
                <Radio value={1}>软件凭证 : <Upload {...propss}>
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                </Upload></Radio>
                <Radio value={2}>开发者权利声明 : <Upload {...propss}>
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                </Upload></Radio>
              </RadioGroup></Col>
            <Col span={5}><a href='javascript:;'>下载模版</a></Col>
          </Row>
          <div style={{borderBottom: '2px dotted #ddd', height: '2px', width: '1200px', marginLeft: '2%', marginBottom: '3%', marginTop: '4%'}} />
        </Row>
        <Row>
          <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />财务凭证</p></Row>
          <Row>
            <Col span={1} />
            <Col span={8}>
              <span>财务审核凭证 : </span><Upload {...propss}>
                <Button>
                  <Icon type='upload' /> 上传文件
                </Button>
              </Upload>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col>
            <Col span={16} />
            <Col span={2}><Button type='primary' onClick={this.submit}>提交申请</Button></Col>
            <Col span={2}><Button>取消</Button></Col>
          </Col>
        </Row></div>
    </Card>
  }
}

export default ShelfPlease
