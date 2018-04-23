/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 上架流程
 */
import React from 'react'
import {Row, Col, Card, Input, Select, Button, DatePicker, Radio} from 'antd'
import title from '../../assets/images/title.png'
import './NewsList.scss'
import Upload from './Upload'
import axios from 'axios'
import ajaxUrl from 'config'
// import axios from 'axios'
// import ajaxUrl from 'config'

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
      hopeTime: null,
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
      ],
      fileListOneC: ['1'], // 用来存软件版本的文件的系统版本
      fileListOneF: ['1'], // 用来存软件版本的文件id
      fileListTwo: '1', // 用来存软件图标的文件id
      fileListThree: ['1'], // 用来存PC端界面截图的文件id
      fileListFour: '1', // 用来存身份证照片文件id
      fileListFive: '1', // 用来存软件版权的文件id
      fileListSix: '1' // 用来存财务审核凭证的文件id
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
  // 用来存软件版本的文件id
  getFileListOneF =(fileList, index) => {
    let a = []
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
  // 日期取消
  onBlur =(value) => {
    if (value) {
      this.setState({
        hopeTime: value
      })
    }
  }
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
  // 存联系人电话
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
  // 用来存软件图标的文件id
  getFileListTwo =(fileList, index) => {
    let a = []
    a[index] = fileList.map((data) => { return data.fileId || data.id })
    this.setState({
      fileListTwo: a
    }, () => {
      console.log('软件图标的文件id', this.state.fileListTwo)
    })
  }
  // 用来存PC端界面截图的文件id
  getFileListThree =(fileList, index) => {
    let a = []
    a[index] = fileList.map((data) => { return data.fileId || data.id })
    this.setState({
      fileListThree: a
    }, () => {
      console.log('PC端界面截图的文件id', this.state.fileListThree)
    })
  }
  // 用来存身份证照片文件id
  getFileListFour =(fileList, index) => {
    let a = []
    a[index] = fileList.map((data) => { return data.fileId || data.id })
    this.setState({
      fileListFour: a
    }, () => {
      console.log('身份证照片文件id', this.state.fileListFour)
    })
  }
  // 用来存财务审核凭证的文件id
  getFileListFive =(fileList, index) => {
    let a = []
    a[index] = fileList.map((data) => { return data.fileId || data.id })
    this.setState({
      fileListFive: a
    }, () => {
      console.log('财务审核凭证的文件id', this.state.fileListFive)
    })
  }
  // 用来存财务审核凭证的文件id
  getFileListSix =(fileList, index) => {
    let a = []
    a[index] = fileList.map((data) => { return data.fileId || data.id })
    this.setState({
      fileListSix: a
    }, () => {
      console.log('财务审核凭证的文件id', this.state.fileListSix)
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
    z[2] = this.state.fileListFour
    z[3] = this.state.fileListFive
    z[4] = this.state.fileListSix
    let value = {
      rname: this.state.rname, // 软件名称
      rType: this.state.type, // 软件类型
      rDescribe: this.state.rDescribe, // 软件描述
      hopeTime: this.state.hopeTime === null ? '' : this.state.hopeTime.format('YYYY-MM-DD HH:mm:ss'), // 期望上架时间
      name: this.state.name, // 开发相关名字
      idNumber: this.state.idNumber, // 身份证号
      conPeople: this.state.conPeople, // 主要联系人
      conPeopleNum: this.state.conPeopleNum, // 主要联系人电话
      copType: this.state.radio, // 软件版权类别
      copTypes: this.zH(), // 软件版本的文件id和系统类别
      filelist: z // 附件列表
    }
    console.log('上架流程点击提交传的值', value)
    axios.get(ajaxUrl.shelf, {
      value
    }).then(item => {
      console.log(item)
    }).catch(err => {
      console.log(err)
    })
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
    return <Card title='上架申请' style={{marginLeft: '15%', width: '1300px'}}>
      <div >
        <Row>
          <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />软件相关</p></Row>
          <Row className='Wxd'>
            <Col span={12}>
              <Col span={6}><span style={{visibility: 'hidden'}}>*PC无无无</span>
                <span style={{color: 'red'}}>* </span>软件名称 :
              </Col>
              <Input placeholder='请输入关键字' style={{ width: 280 }} onChange={this.rnameChange} value={this.state.rname} /></Col>
            <Col span={8}>
              <Col span={4}>
                <span style={{color: 'red'}}>* </span>类型 :
              </Col>
              <Col span={20}>
                <Select placeholder='教育类' style={{ width: 260 }} onChange={(value) => this.type(value)} value={this.state.type} >
                  {data.map((item, index) => {
                    return <Select.Option value={item.value} key={index}>{item.value}</Select.Option>
                  })}
                </Select>
              </Col>
            </Col>
          </Row>
          <Row className='Wxd'>
            <Col span={23}>
              <span style={{visibility: 'hidden'}}>*PC无无无</span>
              <span><span style={{color: 'red'}}>* </span>软件描述 : </span>
              <span style={{visibility: 'hidden'}}>无</span>
              <TextArea placeholder='请输入关键字' style={{ width: 880 }} onChange={this.rDescribe} value={this.state.rDescribe} /></Col>
          </Row>
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
              <Button type='danger' onClick={this.addBtn}>+添加提供版本</Button>
            </Col>
          </Row>
          <Row className='Wxd'>
            <Col span={12}>
              <Col span={6}>
                <span style={{visibility: 'hidden'}}>*PC无无无</span>
                <span style={{color: 'red'}}>* </span>软件图标 :
              </Col>
              <Col span={8}>
                <Upload
                  getFileList={this.getFileListTwo}
                  indexD={false}
                // update={this.state.update}
                // updateDone={() => { this.setState({update: false}) }}
                /></Col>
            </Col>
            <Col span={8}>
              <Col span={6}>
                <span>期望上架时间 :</span>
              </Col>
              <Col span={17}>
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
          <Row className='Wxd'>
            <Col span={12}>
              <Col span={6}>
                <span style={{visibility: 'hidden'}}>** 无无</span>
                <span>PC端界面截图 :</span>
              </Col>
              <Col span={8}>
                <Upload
                  getFileList={this.getFileListThree}
                  indexD={false}
                // update={this.state.update}
                // updateDone={() => { this.setState({update: false}) }}
                />
              </Col>
            </Col>
          </Row>
          <div style={{borderBottom: '2px dotted #ddd', height: '2px', width: '1200px', marginLeft: '2%', marginBottom: '2%', marginTop: '4%'}} />
        </Row>
        <Row>
          <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />开发相关</p></Row>
          <Row className='Wxd'>
            <Col span={12}>
              <Col span={6}>
                <span style={{visibility: 'hidden'}}>*PC无无无五五</span>
                <span style={{color: 'red'}}>* </span>姓名 :
              </Col>
              <Input placeholder='请输入名字' style={{ width: 280 }} onChange={this.name} value={this.state.name} />
            </Col>
            <Col span={8}>
              <Col span={5}>
                <span style={{color: 'red'}}>* </span>身份证号 :
              </Col>
              <Col span={17}>
                <Input placeholder='请输入身份证号' style={{ width: 200 }} onChange={this.idNumber} value={this.state.idNumber} /></Col>
            </Col>
          </Row>
          <Row className='Wxd'>
            <Col span={12}>
              <Col span={6}>
                <span style={{visibility: 'hidden'}}>*PC</span>
                <span style={{color: 'red'}}>* </span>手持身份证照片 :
              </Col>
              <Col span={8}>
                <Upload
                  getFileList={this.getFileListFour}
                  indexD={false}
                  // update={this.state.update}
                  // updateDone={() => { this.setState({update: false}) }}
                />
              </Col>
            </Col>
          </Row>
          <Row className='Wxd'>
            <Col span={12}>
              <Col span={6}>
                <span style={{visibility: 'hidden'}}>*PC无无</span>
                <span style={{color: 'red'}}>* </span>主要联系人 :
              </Col>
              <Input placeholder='请输入联系人' style={{ width: 280 }} onChange={this.conPeople} value={this.state.conPeople} /></Col>
            <Col span={8}>
              <Col span={6}>
                <span style={{color: 'red'}}>* </span>联系人电话 :
              </Col>
              <Col span={18}>
                <Input placeholder='请输入联系人电话' style={{ width: 200 }} onChange={this.conPeopleNum} value={this.state.conPeopleNum} /></Col>
            </Col>
          </Row>
          <div style={{borderBottom: '2px dotted #ddd', height: '2px', width: '1200px', marginLeft: '2%', marginBottom: '3%', marginTop: '4%'}} />
        </Row>
        <Row>
          <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />软件版权</p></Row>
          <Row className='Wxd'>
            <Col span={24}>
              <span style={{visibility: 'hidden'}}>*PC无无</span>
              <RadioGroup onChange={this.radio} value={this.state.radio}>
                <Radio value={1}>
                  <span >软件凭证 :</span>
                  <span style={{visibility: 'hidden'}}>无无无五五五五无</span>
                  <Upload
                    getFileList={this.getFileListFour}
                    indexD={false}
                    // update={this.state.update}
                    // updateDone={() => { this.setState({update: false}) }}
                  />
                </Radio>
                <span style={{visibility: 'hidden'}}>*PC无无5555555555555呜呜呜呜呜</span>
                <Radio value={2}>
                  <span >开发者权利声明 :</span>
                  <a href='javascript:;'>下载模版</a>
                  <span style={{visibility: 'hidden'}}>无</span>
                  <Upload
                    getFileList={this.getFileListFive}
                    indexD={false}
                  // update={this.state.update}
                  // updateDone={() => { this.setState({update: false}) }}
                  />
                </Radio>
              </RadioGroup>
            </Col>
            {/* <Col span={5}></Col> */}
          </Row>
          <div style={{borderBottom: '2px dotted #ddd', height: '2px', width: '1200px', marginLeft: '2%', marginBottom: '3%', marginTop: '4%'}} />
        </Row>
        <Row>
          <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />财务凭证</p></Row>
          <Row>
            <Col span={12}>
              <Col span={6}>
                <span style={{visibility: 'hidden'}}>*PC无无</span>
                <span>财务审核凭证 : </span><span style={{visibility: 'hidden'}}>无</span>
              </Col>
              <Col span={8}>
                <Upload
                  getFileList={this.getFileListSix}
                  indexD={false}
                  // update={this.state.update}
                  // updateDone={() => { this.setState({update: false}) }}
                /></Col>
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
