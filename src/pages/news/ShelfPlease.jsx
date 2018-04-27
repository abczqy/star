/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 上架流程
 */
import React from 'react'
import {Row, Col, Card, Input, Select, Button, DatePicker, Radio, Icon, Upload, message} from 'antd'
import title from '../../assets/images/title.png'
import './NewsList.scss'
// import Upload from './Upload'
// import axios from 'axios'
// import ajaxUrl from 'config'
import {shelf} from 'services/software-manage'

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
      fileListOneC: [], // 用来存软件版本的文件的系统版本
      fileListOneF: [], // 用来存软件版本的文件id
      fileListTwo: [], // 用来存软件图标的文件id
      fileListThree: [], // 用来存PC端界面截图的文件id
      fileListFour: [], // 用来存身份证照片文件id
      fileListFive: [], // 用来存软件版权的文件id
      fileListSix: [] // 用来存财务审核凭证的文件id
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
      const propsO = {
        onRemove: (file) => {
          this.setState(({ fileListOneF }) => {
            const index = fileListOneF.indexOf(file)
            const newFileList = fileListOneF.slice()
            newFileList.splice(index, 1)
            return {
              fileListOneF: newFileList
            }
          }, () => {
            console.log('this.state.fileListOneF', this.state.fileListOneF)
          })
        },
        beforeUpload: (file) => {
          this.setState(({ fileListOneF }) => ({
            fileListOneF: [...fileListOneF, file]
          }), () => {
            console.log('this.state.fileListOneF', this.state.fileListOneF)
          })
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
                      <span style={{visibility: 'hidden'}}>无无无无无无无无</span>支持扩展名：.png .jpg ...</span>
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
                      <span style={{visibility: 'hidden'}}>无无无无无无无无</span>支持扩展名：.png .jpg ...</span>
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
    formData.append('rname', this.state.rname)// 软件名称
    formData.append('rType', this.state.type)// 软件类型
    formData.append('rDescribe', this.state.rDescribe)// 软件描述
    formData.append('hopeTime', this.state.hopeTime === null ? '' : this.state.hopeTime.format('YYYY-MM-DD'))// 期望上架时间
    formData.append('name', this.state.name)// 开发相关名字
    formData.append('idNumber', this.state.idNumber)// 身份证号
    formData.append('conPeople', this.state.conPeople)// 主要联系人
    formData.append('conPeopleNum', this.state.conPeopleNum)// 主要联系人电话
    formData.append('sw_type', this.state.radio)// 软件版权类别
    formData.append('sw_icon', this.state.fileListTwo)// 软件图标
    formData.append('sw_computer_photo', this.state.fileListThree)// pc图片
    formData.append('idNumber_photo', this.state.fileListFour) // 手持身份证照片
    formData.append('sw_copyright', this.state.fileListFive)// 软件版权的文件
    formData.append('fin_audit', this.state.fileListSix)// 财务凭证
    formData.append('copTypes', this.zH())// 软件版本的文件id和系统类别
    formData.append('fa_id', 'fa_123456')// 厂商Id
    shelf(formData, (response) => {
      message.success(`上架申请成功!${response}`)
      console.log(response)
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
        this.setState(({ fileListFour }) => {
          const index = fileListFour.indexOf(file)
          const newFileList = fileListFour.slice()
          newFileList.splice(index, 1)
          return {
            fileListFour: newFileList
          }
        }, () => {
          console.log('fileListFour', this.state.fileListFour)
        })
      },
      beforeUpload: (file) => {
        this.setState(({ fileListFour }) => ({
          fileListFour: [...fileListFour, file]
        }), () => {
          console.log('fileListFour', this.state.fileListFour)
        })
        return false
      },
      fileListFour: this.state.fileListFour
    }
    const propsW = {
      onRemove: (file) => {
        this.setState(({ fileListFive }) => {
          const index = fileListFive.indexOf(file)
          const newFileList = fileListFive.slice()
          newFileList.splice(index, 1)
          return {
            fileListFive: newFileList
          }
        }, () => {
          console.log('fileListFive', this.state.fileListFive)
        })
      },
      beforeUpload: (file) => {
        this.setState(({ fileListFive }) => ({
          fileListFive: [...fileListFive, file]
        }), () => {
          console.log('fileListFive', this.state.fileListFive)
        })
        return false
      },
      fileListFive: this.state.fileListFive
    }
    const propsC = {
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
    const propsD = {
      onRemove: (file) => {
        this.setState(({ fileListSix }) => {
          const index = fileListSix.indexOf(file)
          const newFileList = fileListSix.slice()
          newFileList.splice(index, 1)
          return {
            fileListSix: newFileList
          }
        }, () => {
          console.log('this.state.fileListSix', this.state.fileListSix)
        })
      },
      beforeUpload: (file) => {
        this.setState(({ fileListSix }) => ({
          fileListSix: [...fileListSix, file]
        }), () => {
          console.log('this.state.fileListSix', this.state.fileListSix)
        })
        return false
      },
      fileListSix: this.state.fileListSix
    }
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
                    return <Select.Option value={item.key} key={index}>{item.value}</Select.Option>
                  })}
                </Select>
              </Col>
            </Col>
          </Row>
          <Row className='Wxd'>
            <Col span={23}>
              <span style={{visibility: 'hidden'}}>*PC无无无</span>
              <span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>软件描述 : </span>
              <span style={{visibility: 'hidden'}}>|无</span>
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
                <Upload {...propsT}>
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                  <span className='extend'>
                    <span style={{visibility: 'hidden'}}>无无无无无无</span>支持扩展名：.png .jpg ...</span>
                </Upload></Col>
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
                <Upload {...propsC}>
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                  <span className='extend'>
                    <span style={{visibility: 'hidden'}}>无无无无无无</span>支持扩展名：.png .jpg ...</span>
                </Upload>
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
                <Upload {...propsP}>
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                  <span className='extend'>
                    <span style={{visibility: 'hidden'}}>无无无无无无</span>支持扩展名：.png .jpg ...</span>
                </Upload>
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
              <Col span={1} />
              <RadioGroup onChange={this.radio} value={this.state.radio}>
                <Col span={1} />
                <Col span={8}>
                  <Radio value={1}>
                    <span >软件凭证 :</span>
                    <span style={{visibility: 'hidden'}}>无</span>
                    <Upload {...propsW}>
                      <Button>
                        <Icon type='upload' /> 上传文件
                      </Button>
                      <span className='extend'>
                        <span style={{visibility: 'hidden'}}>无</span>支持扩展名：.png .jpg ...</span>
                    </Upload>
                  </Radio>
                  <span style={{visibility: 'hidden'}}>*PC无无555555555555555555555555555555555555555555555555呜呜呜呜呜</span>
                </Col>
                <Col span={2} />
                <Col span={10}>
                  <span style={{visibility: 'hidden'}}>6</span>
                  <Radio value={2}>
                    <span >开发者权利声明 :</span>
                    <span style={{visibility: 'hidden'}}>无</span>
                    <Upload {...propsW}>
                      <Button>
                        <Icon type='upload' /> 上传文件
                      </Button>
                      <span className='extend'>
                        <span style={{visibility: 'hidden'}}>无</span>支持扩展名：.png .jpg ...</span><a href='javascript:;'>下载模版</a>
                    </Upload>
                  </Radio>
                </Col>
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
                <Upload {...propsD}>
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                  <span className='extend'>
                    <span style={{visibility: 'hidden'}}>无无无无无无</span>支持扩展名：.png .jpg ...</span>
                </Upload></Col>
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
