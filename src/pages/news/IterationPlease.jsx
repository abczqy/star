/**
 * 迭代申请
 */

import React from 'react'
import {Row, Col, Card, Input, Select, Button, DatePicker, Upload, Icon} from 'antd'
import title from '../../assets/images/title.png'
import './NewsList.scss'
// import Upload from './Upload'
import axios from 'axios'
import ajaxUrl from 'config'
// import axios from 'axios'
// import ajaxUrl from 'config'
import {iteration} from 'services/software-manage'

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
      hopeTime: null,
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
      AppData: null,
      fileListOneC: [], // 用来存软件版本的文件的系统版本
      fileListOneF: [], // 用来存软件版本的文件id
      fileListTwo: [], // 用来存软件图标的文件id
      fileListThree: [], // 用来存PC端界面截图的文件id
      appId: ''
    }
  }
  componentWillMount () {
    let a = window.location.href.split('?')
    this.setState({
      appId: a[1]
    })
    this.renderEdition()
    this.getAppData(a[1])
  }
  // 更新版本
  newV=(e) => {
    let {value} = e.target
    this.setState({
      newV: value
    })
  }
// 获取app数据
getAppData=(a) => {
  let value = {
    sw_id: a
  }
  axios.post(ajaxUrl.appId,
    value
  ).then(item => {
    this.setState({
      AppData: item
    }, () => {
      console.log(this.state.AppData)
    })
  }).catch(err => {
    console.log(err)
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
  // 用来存软件版本的文件的系统版本
  SChange =(value, index) => {
    let a = this.state.fileListOneC
    a[index] = value
    this.setState({
      fileListOneC: a
    }, () => {
      console.log('软件版本的文件的系统版本', this.state.fileListOneC)
    })
  }
  // 渲染软件版本列表
  renderEdition=() => {
    let value = []
    for (let i = 0; i < this.state.Edition; i++) {
      let propsO = {
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
                  <Select placeholder='请选择安装包版本' style={{ width: 200 }} onChange={(value) => this.SChange(value, i)}>
                    {this.state.dataL.map((item, index) => {
                      return <Select.Option value={item.key} key={index}>{item.value}</Select.Option>
                    })}
                  </Select>
                </Col>
                <Col span={9}>
                  <Upload {...propsO}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                    <span className='extend'>
                      <span style={{visibility: 'hidden'}}>无无无无无无无无无</span>支持扩展名：.png .jpg ...</span>
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
                  <Select placeholder='请选择安装包版本' style={{ width: 200 }} onChange={(value) => this.SChange(value, i)}>
                    {this.state.dataL.map((item, index) => {
                      return <Select.Option value={item.key} key={index}>{item.value}</Select.Option>
                    })}
                  </Select>
                </Col>
                <Col span={9}>
                  <Upload {...propsO}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                    <span className='extend'>
                      <span style={{visibility: 'hidden'}}>无无无无无无无无无</span>支持扩展名：.png .jpg ...</span>
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
    this.setState({
      hopeTime: value
    })
  }
  // 日期点击确定
  onOk=(value) => {
    console.log('onOk: ', value)
    this.setState({
      hopeTime: value
    })
  }
// 整合软件版本数据
zH=() => {
  let a = []
  for (let i = 0; i < this.state.Edition; i++) {
    let c = {
      fileListOneC: this.state.fileListOneC[i], // 用来存软件版本的文件的系统版本
      fileListOneF: this.state.fileListOneF[i] // 用来存软件版本的文件id
    }
    a.push(c)
  }
  console.log(a)
  return a
}
  // 提交表单啦
  submit=() => {
    const formData = new FormData()
    formData.append('newV', this.state.newV)// 软件图标
    formData.append('rDescribe_new', this.state.rDescribe)// 软件描述
    formData.append('updateTime', this.state.hopeTime === null ? '' : this.state.hopeTime.format('YYYY-MM-DD')) // 期望上架时间
    formData.append('sw_computer_photo_new', this.state.fileListThree)// pc电脑图片
    formData.append('sw_icon_new', this.state.fileListTwo)// 软件图标
    formData.append('copTypes', this.zH())// 软件版本的文件id和系统类别
    formData.append('sw_id', '5564654654654')// 软件id
    // formData.append('sw_id', this.state.appId)// appId
    iteration(formData, (response) => {
      console.log(response)
    })
  }
  render () {
    const propsT = {
      onRemove: (file) => {
        this.setState(({ fileListTwo }) => {
          const index = fileListTwo.indexOf(file)
          const newFileList = fileListTwo.slice()
          newFileList.splice(index, 1)
          return {
            fileListTwo: newFileList
          }
        }, () => {
          console.log('this.state.fileListTwo', this.state.fileListTwo)
        })
      },
      beforeUpload: (file) => {
        this.setState(({ fileListTwo }) => ({
          fileListTwo: [...fileListTwo, file]
        }), () => {
          console.log('this.state.fileListTwo', this.state.fileListTwo)
        })
        return false
      },
      fileListTwo: this.state.fileListTwo
    }
    const propsP = {
      onRemove: (file) => {
        this.setState(({ fileListThree }) => {
          const index = fileListThree.indexOf(file)
          const newFileList = fileListThree.slice()
          newFileList.splice(index, 1)
          return {
            fileListThree: newFileList
          }
        }, () => {
          console.log('fileListThree', this.state.fileListThree)
        })
      },
      beforeUpload: (file) => {
        this.setState(({ fileListThree }) => ({
          fileListThree: [...fileListThree, file]
        }), () => {
          console.log('fileListThree', this.state.fileListThree)
        })
        return false
      },
      fileListThree: this.state.fileListThree
    }
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
                <span>{this.state.AppData ? (this.state.AppData.data
                  ? this.state.AppData.data.sw_type
                  : '教学') : '教学'}</span>
                {/* <span>教学类</span> */}
              </Col>
            </Col>
            <Col span={8}>
              <Col span={5}>
                <span style={{visibility: 'hidden'}}>* </span>软件名称 :
              </Col>
              <Col span={18}>
                {/* <span>超级教师</span> */}
                <span>
                  {this.state.AppData ? (this.state.AppData.data
                    ? this.state.AppData.data.sw_name
                    : '超级教') : '超级教'}
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
                <span>{this.state.AppData ? (this.state.AppData.data
                  ? this.state.AppData.data.version
                  : 'v1.') : 'v1.'}</span>
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
              <span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>软件描述 : </span>
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
                <Col span={9}>
                  <Upload {...propsT}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                    <span className='extend'>
                      <span style={{visibility: 'hidden'}}>无无无无无无无无无</span>支持扩展名：.png .jpg ...</span>
                  </Upload></Col>
              </Col>
            </Row>
            <Row className='Wxd'>
              <Col span={12}>
                <Col span={6}>
                  <span style={{visibility: 'hidden'}}>*PC 无</span>
                  <span>PC端界面截图 : </span>
                </Col>
                <Col span={9}>
                  <Upload {...propsP}>
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                    <span className='extend'>
                      <span style={{visibility: 'hidden'}}>无无无无无无无无无</span>支持扩展名：.png .jpg ...</span>
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
