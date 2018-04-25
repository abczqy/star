/**
 * 迭代申请
 */

import React from 'react'
import {Row, Col, Card, Input, Select, Button, DatePicker} from 'antd'
import title from '../../assets/images/title.png'
import './NewsList.scss'
import Upload from './Upload'
import axios from 'axios'
import ajaxUrl from 'config'
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
      fileListOneC: ['1'], // 用来存软件版本的文件的系统版本
      fileListOneF: ['1'], // 用来存软件版本的文件id
      fileListTwo: ['1'], // 用来存软件图标的文件id
      fileListThree: ['1'] // 用来存PC端界面截图的文件id
    }
  }
  componentWillMount () {
    let a = window.location.href.split('?')
    let value = {
      news_id: a[a.length - 1]
    }
    this.renderEdition()
    this.getAppData(value)
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
    appId: a
  }
  axios.get(ajaxUrl.appId, {
    value
  }).then(item => {
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
  // 用来存软件版本的文件id
  getFileListOneF =(fileList, index) => {
    let a = this.state.fileListOneF
    a[index] = fileList.map((data) => { return data.fileId || data.id })
    this.setState({
      fileListOneF: a
    }, () => {
      console.log('软件版本的文件id', this.state.fileListOneF)
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
                      return <Select.Option value={item.value} key={index}>{item.value}</Select.Option>
                    })}
                  </Select>
                </Col>
                <Col span={9}>
                  <Upload
                    getFileList={this.getFileListOneF}
                    index={i}
                    indexD
                    // update={this.state.update}
                    // updateDone={() => { this.setState({update: false}) }}
                  />
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
                      return <Select.Option value={item.value} key={index}>{item.value}</Select.Option>
                    })}
                  </Select>
                </Col>
                <Col span={9}>
                  <Upload
                    getFileList={this.getFileListOneF}
                    index={i}
                    indexD
                    // update={this.state.update}
                    // updateDone={() => { this.setState({update: false}) }}
                  />
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
  // 用来存软件图标的文件id
  getFileListTwo =(fileList, index) => {
    let a = this.state.fileListTwo
    a[index] = fileList.map((data) => { return data.fileId || data.id })
    this.setState({
      fileListTwo: a
    }, () => {
      console.log('软件图标的文件id', this.state.fileListTwo)
    })
  }
  // 用来存PC端界面截图的文件id
  getFileListThree =(fileList, index) => {
    let a = this.state.fileListThree
    a[index] = fileList.map((data) => { return data.fileId || data.id })
    this.setState({
      fileListThree: a
    }, () => {
      console.log('PC端界面截图的文件id', this.state.fileListThree)
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
    let z = []
    z[0] = this.state.fileListTwo
    z[1] = this.state.fileListThree

    let value = {
      newV: this.state.newV, // 更新版本
      rDescribe: this.state.rDescribe, // 软件描述
      hopeTime: this.state.hopeTime === null ? '' : this.state.hopeTime.format('YYYY-MM-DD HH:mm:ss'), // 期望上架时间value.beginTime == null?'':value.beginTime.format('YYYY-MM-DD HH:mm')
      copTypes: this.zH(), // 软件版本的文件id和系统类别
      filelist: z // 其他附件
    }
    console.log('迭代申请点击提交传的值', value)
    axios.get(ajaxUrl.iteration, {
      value
    }).then(item => {
      console.log(item)
    }).catch(err => {
      console.log(err)
    })
  }
  render () {
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
                <span>{this.state.AppData ? (this.state.AppData.type ? this.state.AppData.type : '教学类') : '教学类'}</span>
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
                  {this.state.AppData ? (this.state.AppData.rname ? this.state.AppData.rname : '超级教师') : '超级教师'}
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
                <span>{this.state.AppData ? (this.state.AppData.edition ? this.state.AppData.edition : 'v1.3') : 'v1.3'}</span>
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
                  <Upload
                    getFileList={this.getFileListTwo}
                    indexD={false}
                    // update={this.state.update}
                    // updateDone={() => { this.setState({update: false}) }}
                  /></Col>
              </Col>
            </Row>
            <Row className='Wxd'>
              <Col span={12}>
                <Col span={6}>
                  <span style={{visibility: 'hidden'}}>*PC 无</span>
                  <span>PC端界面截图 : </span>
                </Col>
                <Col span={9}>
                  <Upload
                    getFileList={this.getFileListThree}
                    indexD={false}
                    // update={this.state.update}
                    // updateDone={() => { this.setState({update: false}) }}
                  />
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
