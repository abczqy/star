/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 上架流程
 */
import React from 'react'
import { withRouter } from 'react-router-dom'
import {Tabs, Row, Col, Card, Input, Select, Button, DatePicker, Radio, Icon, Upload, message, Checkbox} from 'antd'
import title from '../../assets/images/title.png'
import './NewsList.scss'
// import Upload from './Upload'
// import axios from 'axios'
// import ajaxUrl from 'config'
import {shelf} from 'services/software-manage'
import PropTypes from 'prop-types'
import SelfPleasePreview from 'pages/app-detail/SelfPleasePreview'
import {AppPurCombination} from 'components/software-market'

const { TextArea } = Input
const RadioGroup = Radio.Group

class ShelfPlease extends React.Component {
  static propTypes = {
    history: PropTypes.any
  }
  constructor (props) {
    super(props)
    this.state = {
      previewApp: false, // 是否显示预览弹窗
      imgTitle: title,
      rname: '',
      type: null,
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
      // current: 0, // 进度条当前位置
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
      rFeatures: '', // 新版特性
      fileListDetailType: [], // 用来存软件版本类型的文件id
      fileListDetailSize: [], // 用来存软件版本包大小的文件id
      fileListDetailVersionNum: [], // 用来存软件版本版本号的文件id
      fileListDetailPackName: [], // 用来存软件版本包名的文件id
      fileListDetailAuth: [], // 用来存软件版本权限
      fileListSoftwareEdt: [], // 用来存软件版本的文件id
      fileListIcon: [], // 用来存软件图标的文件id
      fileListIconUrl: [], // 用来存软件图标地址的文件id
      fileListPC: [], // 用来存PC端界面截图的文件id
      fileListPCUrl: [], // 用来存PC端界面截图地址的文件id
      fileListPhone: [], // 用来存手机端界面截图的文件id
      fileListPhoneUrl: [], // 用来存手机端界面截图地址的文件id
      fileListFour: [], // 用来存身份证照片文件id
      fileListFive: [], // 用来存软件版权的文件id
      fileListFinVour: [], // 用来存财务审核凭证的文件id
      fileListContract: [], // 用来存财务审核凭证的文件id
      conPeopleNumBlur: false,
      idNumberBlur: false,
      formDataPre1: '' // 预览数据
    }
  }
  componentWillMount () {
    this.renderEdition()
  }
  hiddenModal () {
    this.setState({
      previewApp: false
    })
  }
  // 软件名称
  rnameChange=(e) => {
    let {value} = e.target
    this.setState({
      rname: value
    })
  }
  // 新版特性
  rFeaturesChange=(e) => {
    let {value} = e.target
    this.setState({
      rFeatures: value
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

  // 用来存软件版本类型
  SDetailTypeChange =(value, index) => {
    let a = this.state.fileListDetailType
    a[index] = value
    this.setState({
      fileListDetailType: a
    }, () => {
      console.log('用来存软件版本类型', this.state.fileListDetailType)
    })
  }
  // 用来存软件版本包大小
  SDetailSizeChange =(e, index) => {
    let a = this.state.fileListDetailSize
    a[index] = e.target.value
    this.setState({
      fileListDetailSize: a
    }, () => {
      console.log('软件版本包大小', this.state.fileListDetailSize)
    })
    this.renderEdition()
  }
  // 用来存软件版本版本号
  SDetailVersionNumChange =(e, index) => {
    let a = this.state.fileListDetailVersionNum
    a[index] = e.target.value
    this.setState({
      fileListDetailVersionNum: a
    }, () => {
      console.log('用来存软件版本版本号', this.state.fileListDetailVersionNum)
    })
    this.renderEdition()
  }
  // 用来存软件版本包名
  SDetailPackNameChange =(e, index) => {
    let a = this.state.fileListDetailPackName
    a[index] = e.target.value
    this.setState({
      fileListDetailPackName: a
    }, () => {
      console.log('用来存软件版本包名', this.state.fileListDetailPackName)
    })
    this.renderEdition()
  }
  // 用来存软件版本权限详情
  SDetailAuthChange =(checkedValues, index) => {
    // let a = this.state.fileListDetailAuth
    // a[index] = checkedValues
    this.setState({
      fileListDetailAuth: checkedValues
    }, () => {
      console.log('用来存软件版本权限详情', this.state.fileListDetailAuth)
    })
  }
  // 渲染软件版本列表
  renderEdition=() => {
    let value = []
    const propsSoftEdt = {
      onRemove: (file) => {
        this.setState(({fileListSoftwareEdt}) => {
          const index = fileListSoftwareEdt.indexOf(file)
          const newFileList = fileListSoftwareEdt.slice()
          newFileList.splice(index, 1)
          return {
            fileListSoftwareEdt: newFileList
          }
        }, () => {
          console.log('this.state.fileListSoftwareEdt', this.state.fileListSoftwareEdt)
        })
      },
      beforeUpload: (file) => {
        console.log('接受的文件格式？？？？？', file)
        this.setState(({fileListSoftwareEdt}) => ({
          fileListSoftwareEdt: [...fileListSoftwareEdt, file]
        }), () => {
          console.log('this.state.fileListSoftwareEdt', this.state.fileListSoftwareEdt)
        })
        return false
      },
      fileListSoftwareEdt: this.state.fileListSoftwareEdt
    }
    for (let i = 0; i < this.state.Edition; i++) {
      value.push(
        <div key={i} style={{marginBottom: '10px'}}>
          <Row className='Wxd' type='flex' align='top'>
            <Col span={2} offset={1}><span style={{color: 'red'}}>* </span>软件版本 :</Col>
            <Col span={3}>
              <Select placeholder='请选择安装包版本' style={{ width: 150 }} onChange={(value) => this.SDetailTypeChange(value, i)}>
                {this.state.dataL.map((item, index) => {
                  return <Select.Option value={item.key} key={index}>{item.value}</Select.Option>
                })}
              </Select>
            </Col>
            <Col span={3}>
              <Upload {...propsSoftEdt}>
                <Button>
                  <Icon type='upload' /> 上传文件
                </Button>
                <br />
                <span className='extend'>支持扩展名：.exe..</span>
              </Upload>
            </Col>
            <Col span={3}>
              <span style={{color: 'red'}}>* </span>软件大小 :&nbsp;
              <Input placeholder='' style={{ width: 60 }} onChange={(e) => this.SDetailSizeChange(e, i)} value={this.state.fileListDetailSize[i]} />
            </Col>
            <Col span={4}>
              <span style={{color: 'red'}}>* </span>版本号 :&nbsp;
              <Input placeholder='' style={{ width: 130 }} onChange={(e) => this.SDetailVersionNumChange(e, i)} value={this.state.fileListDetailVersionNum[i]} />
            </Col>
            <Col span={7}>
              <span style={{color: 'red'}}>* </span>包名 :&nbsp;
              <Input placeholder='' style={{ width: 160 }} onChange={(e) => this.SDetailPackNameChange(e, i)} value={this.state.fileListDetailPackName[i]} />
            </Col>
          </Row>
        </div>)
    }
    this.setState({
      renderEdition: value
    }, () => {
      // console.log(this.state.renderEdition)
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
  // 身份证校验
  idNumberBlur=(e) => {
    console.log('aaaaaaaaaaaa')
    let {value} = e.target
    var regu = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    var re = new RegExp(regu)
    if (re.test(value)) {
      this.setState({
        idNumberBlur: true
      })
    } else {
      message.error('请输入身份证号格式不正确')
      this.setState({
        idNumberBlur: false
      })
    }
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
  // 手机校验
  conPeopleNumBlur = (e) => {
    console.log('aaaaaaaaaaaa')
    let {value} = e.target
    var regu = /^1[34578]\d{9}$/
    var re = new RegExp(regu)
    if (re.test(value)) {
      this.setState({
        conPeopleNumBlur: true
      })
    } else {
      message.error('请输入手机号格式不正确')
      this.setState({
        conPeopleNumBlur: false
      })
    }
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
      let c = this.state.fileListSoftwareEdt[i] // 用来存软件版本的文件id
      a.push(c)
    }
    return a
  }
  // 整合软件版本数据
  zHs=() => {
    let a = []
    for (let i = 0; i < this.state.Edition; i++) {
      let c = []
      let w = this.state.fileListDetailType[i]
      c.push(w)
      c.push(this.state.fileListSoftwareEdt[i] ? this.state.fileListSoftwareEdt[i].name : '')
      // c[w] = this.state.fileListSoftwareEdt[i].name // 用来存软件版本的文件的系统版本
      a.push(c)
    }
    return a
  }

  handleChangePC=() => {
    console.log('handleChangePC')
  }

  getBase64=(img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  // 预览表单
  handlePreview () {
    const thiz = this
    let formDataPre = new FormData()
    formDataPre.append('rname', this.state.rname || '')// 软件名称*
    formDataPre.append('rType', this.state.type || '')// 软件类型*
    formDataPre.append('sw_icon', this.state.fileListIcon || '')// 软件图标*
    // 查看详情
    formDataPre.append('detailType', this.state.fileListDetailType || [])// 版本分类*
    formDataPre.append('detailSize', this.state.fileListDetailSize || [])// 软件大小*
    formDataPre.append('detailVersionNum', this.state.fileListDetailVersionNum || [])// 版本号*
    formDataPre.append('detailPackName', this.state.fileListDetailPackName || [])// 包名*

    formDataPre.append('detailAuth', this.state.fileListDetailAuth || [])// 权限详情*
    this.state.fileListPhone.forEach((file) => { // 手机展示
      formDataPre.append('phonePhoto', file)
    })
    formDataPre.append('rDescribe', this.state.rDescribe || '')// 应用介绍*
    formDataPre.append('rFeatures', this.state.rFeatures || '')// 新版特性*

    // this.getPicUrl(function (state) {
    //   // console.log(' 图片； ', thiz.state.fileListIconUrl)
    //   thiz.setState({
    //     formDataPre1: formDataPre,
    //     previewApp: true
    //   })
    // })
    thiz.setState({
      formDataPre1: formDataPre,
      previewApp: true
    })
    // this.props.history.push({pathname: '/operate-manage-home/all-app-selfplsprv', state: {data: formDataPre}})
  }

  /**
   * 取消
   */
  onCancel = () => {
    this.props.history.goBack()
  }

  // 提交表单啦
  submit=() => {
    if (!(this.state.conPeopleNumBlur && this.state.idNumberBlur)) {
      message.error('身份证号或者手机号填写有误')
    } else if (this.state.rname && this.state.type && this.state.rDescribe && this.state.name && this.state.idNumber && this.state.conPeople && this.state.fileListIcon.length !== 0 && this.state.fileListFour.length !== 0 && this.state.fileListDetailType.length !== 0 && this.state.fileListSoftwareEdt.length !== 0) {
      console.log('全填完了')
      const formData = new FormData()
      formData.append('rname', encodeURI(this.state.rname))// 软件名称*
      formData.append('rType', encodeURI(this.state.type))// 软件类型*
      formData.append('rDescribe', encodeURI(this.state.rDescribe))// 软件描述*
      formData.append('hopeTime', this.state.hopeTime === null ? '' : this.state.hopeTime.format('YYYY-MM-DD'))// 期望上架时间
      formData.append('name', encodeURI(this.state.name))// 开发相关名字*
      formData.append('idNumber', this.state.idNumber)// 身份证号*
      formData.append('conPeople', encodeURI(this.state.conPeople))// 主要联系人*
      formData.append('conPeopleNum', this.state.conPeopleNum)// 主要联系人电话*
      formData.append('sw_type', this.state.radio)// 软件版权类别
      this.state.fileListIcon.forEach((file) => {
        formData.append('sw_icon', file)
      })
      // formData.append('sw_icon', this.state.fileListIcon)// 软件图标*
      this.state.fileListPC.forEach((file) => {
        formData.append('sw_computer_photo', file)
      })
      this.state.fileListPhone.forEach((file) => {
        formData.append('sw_phone_photo', file)
      })
      // formData.append('sw_computer_photo', this.state.fileListPC)// pc图片
      this.state.fileListFour.forEach((file) => {
        formData.append('idNumber_photo', file)
      })
      // formData.append('idNumber_photo', this.state.fileListFour) // 手持身份证照片*
      this.state.fileListFive.forEach((file) => {
        formData.append('sw_copyright', file)
      })
      // formData.append('sw_copyright', this.state.fileListFive)// 软件版权的文件
      this.state.fileListFinVour.forEach((file) => {
        formData.append('fin_audit', file)
      })
      // formData.append('fin_audit', this.state.fileListFinVour)// 财务凭证
      this.zH().forEach((file) => {
        formData.append('copType', file)
      })
      // formData.append('copType', this.zH())// 软件版本的文件*
      this.zHs().forEach((a) => {
        formData.append('type', a)
      })
      // formData.append('type', this.zHs())// 软件版本的文件和系统类别*
      formData.append('fa_id', 'fa_123456')// 厂商Id
      // console.log('看看那是什么', this.zHs())
      shelf(formData, (response) => {
        message.success(`上架申请成功!`)
        console.log(response)
      })
    } else {
      message.error('请填写完带有*号的填写项')
    }
  }

  render () {
    const data = [
      {
        key: '教学类',
        value: '教学类'
      },
      {
        key: '教辅类',
        value: '教辅类'
      },
      {
        key: '管理类',
        value: '管理类'
      },
      {
        key: '其他',
        value: '其他'
      }
    ]
    const propsIcon = {
      listType: 'picture',
      onRemove: (file) => {
        this.setState(({ fileListIcon, fileListIconUrl }) => {
          const index = fileListIcon.indexOf(file)
          const newFileList = fileListIcon.slice()
          const newFileListIconUrl = fileListIconUrl.slice()
          newFileList.splice(index, 1)
          newFileListIconUrl.splice(index, 1)
          return {
            fileListIcon: newFileList,
            fileListIconUrl: newFileListIconUrl
          }
        })
      },
      beforeUpload: (file) => {
        this.getBase64(file, (imageUrl) => {
          this.setState(({ fileListIcon, fileListIconUrl }) => ({
            fileListIcon: [...fileListIcon, file],
            fileListIconUrl: [...fileListIconUrl, imageUrl]
          }), () => {
            console.log('this.state.fileListIcon', this.state.fileListIcon)
          })
        })
        return false
      },
      fileListIconUrl: this.state.fileListIconUrl,
      fileListIcon: this.state.fileListIcon
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
    const propsPC = {
      // action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      // defaultFileList: [...fileList11],
      // className: 'upload-list-inline',
      onRemove: (file) => {
        this.setState(({ fileListPC, fileListPCUrl }) => {
          const index = fileListPC.indexOf(file)
          const newFileList = fileListPC.slice()
          const newFileListPCUrl = fileListPCUrl.slice()
          newFileList.splice(index, 1)
          newFileListPCUrl.splice(index, 1)
          return {
            fileListPC: newFileList,
            fileListPCUrl: newFileListPCUrl
          }
        })
      },
      beforeUpload: (file) => {
        this.getBase64(file, (imageUrl) => {
          this.setState(({ fileListPC, fileListPCUrl }) => ({
            fileListPC: [...fileListPC, file],
            fileListPCUrl: [...fileListPCUrl, imageUrl]
          }), () => {
            console.log('fileListPC', this.state.fileListPC)
          })
        })
        return false
      },
      fileListPC: this.state.fileListPC,
      fileListPCUrl: this.state.fileListPCUrl
    }
    const propsPhone = {
      listType: 'picture',
      onRemove: (file) => {
        this.setState(({ fileListPhone, fileListPhoneUrl }) => {
          const index = fileListPhone.indexOf(file)
          const newFileList = fileListPhone.slice()
          const newFileListPhoneUrl = fileListPhoneUrl.slice()
          newFileList.splice(index, 1)
          newFileListPhoneUrl.splice(index, 1)
          return {
            fileListPhone: newFileList,
            fileListPhoneUrl: newFileListPhoneUrl
          }
        })
      },
      beforeUpload: (file) => {
        this.getBase64(file, (imageUrl) => {
          this.setState(({ fileListPhone, fileListPhoneUrl }) => ({
            fileListPhone: [...fileListPhone, file],
            fileListPhoneUrl: [...fileListPhoneUrl, imageUrl]
          }), () => {
            console.log('fileListPhone', this.state.fileListPhone)
          })
        })
        return false
      },
      fileListPhone: this.state.fileListPhone,
      fileListPhoneUrl: this.state.fileListPhoneUrl
    }
    const propsFinVour = {
      onRemove: (file) => {
        this.setState(({ fileListFinVour }) => {
          const index = fileListFinVour.indexOf(file)
          const newFileList = fileListFinVour.slice()
          newFileList.splice(index, 1)
          return {
            fileListFinVour: newFileList
          }
        })
      },
      beforeUpload: (file) => {
        this.setState(({ fileListFinVour }) => ({
          fileListFinVour: [...fileListFinVour, file]
        }), () => {
          console.log('this.state.fileListFinVour', this.state.fileListFinVour)
        })
        return false
      },
      fileListFinVour: this.state.fileListFinVour
    }
    const propsContract = {
      onRemove: (file) => {
        this.setState(({ fileListContract }) => {
          const index = fileListContract.indexOf(file)
          const newFileList = fileListContract.slice()
          newFileList.splice(index, 1)
          return {
            fileListContract: newFileList
          }
        })
      },
      beforeUpload: (file) => {
        this.setState(({ fileListContract }) => ({
          fileListContract: [...fileListContract, file]
        }), () => {
          console.log('this.state.fileListContract', this.state.fileListContract)
        })
        return false
      },
      fileListContract: this.state.fileListContract
    }

    // const { current } = this.state

    // 软件相关
    const aboutSoftware = <Row>
      {/* <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />软件相关</p></Row> */}
      <Row className='Wxd' type='flex' align='middle'>
        <Col span={2} offset={1}><span style={{color: 'red'}}>* </span>软件名称 :</Col>
        <Col span={7}><Input placeholder='请输入关键字' style={{ width: 280 }} onChange={this.rnameChange} value={this.state.rname} /></Col>
        <Col span={2} offset={3}><span style={{color: 'red'}}>* </span>类型 :</Col>
        <Col span={7}>
          <Select placeholder='教育类' allowClear style={{ width: 260 }} onChange={(value) => this.type(value)} value={this.state.type} >
            {data.map((item, index) => {
              return <Select.Option value={item.value} key={index}>{item.value}</Select.Option>
            })}
          </Select>
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='middle'>
        <Col span={2} offset={1}><span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>软件描述 : </span></Col>
        <Col span={20}>
          <TextArea placeholder='请输入关键字' style={{ width: 880 }} onChange={this.rDescribe} value={this.state.rDescribe} />
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='middle'>
        <Col span={2} offset={1}><span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>新版特性 : </span></Col>
        <Col span={20}>
          <TextArea placeholder='请输入关键字' style={{ width: 880 }} onChange={this.rFeaturesChange} value={this.state.rFeatures} />
        </Col>
      </Row>
      <Row className='Wxds'>
        {this.state.renderEdition.map((item, index) => {
          return item
        })}
      </Row>
      <Row className='Wxd'>
        <Col span={21} offset={3}>
          <Button type='danger' onClick={this.addBtn}>+添加提供版本</Button>
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='middle'>
        <Col span={2} offset={1}><span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>权限详情 : </span></Col>
        <Col span={20}>
          <Checkbox.Group style={{ width: '100%' }} onChange={this.SDetailAuthChange}>
            <Row>
              <Col span={6}><Checkbox value='1'>（基于网络的）粗略位置</Checkbox></Col>
              <Col span={6}><Checkbox value='2'>查看网络状态</Checkbox></Col>
              <Col span={6}><Checkbox value='3'>查看 Wi-Fi 状态</Checkbox></Col>
              <Col span={6}><Checkbox value='4'>创建蓝牙连接</Checkbox></Col>
              <Col span={6}><Checkbox value='5'>拍摄照片和视频</Checkbox></Col>
              <Col span={6}><Checkbox value='6'>更改 Wi-Fi 状态</Checkbox></Col>
              <Col span={6}><Checkbox value='7'>完全的互联网访问权限</Checkbox></Col>
              <Col span={6}><Checkbox value='8'>开机时自动启动</Checkbox></Col>
            </Row>
          </Checkbox.Group>
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='top'>
        <Col span={2} offset={1}><span style={{color: 'red'}}>* </span>软件图标 :</Col>
        <Col span={9} id='iconDiv'>
          <Upload {...propsIcon}>
            <Button>
              <Icon type='upload' /> 上传文件
            </Button>
            <span className='extend'>支持扩展名：.png .jpg ... （200px*200px）</span>
          </Upload>
        </Col>
        <Col span={3}><span style={{color: 'red'}}>* </span>期望上架时间 :</Col>
        <Col span={7}>
          <DatePicker
            style={{width: '260px'}}
            showTime
            format='YYYY-MM-DD HH:mm:ss'
            placeholder='Select Time'
            onChange={this.onChange}
            onOk={this.onOk}
          />
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='top'>
        <Col span={3} align='middle'><span style={{color: 'red'}}>* </span>PC端界面截图 :&nbsp;&nbsp;</Col>
        <Col span={9}>
          <Upload {...propsPC}>
            <Button>
              <Icon type='upload' /> 上传文件
            </Button>
            <span className='extend'>支持扩展名：.png .jpg ... （400px*400px）</span>
          </Upload>
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='top'>
        <Col span={3} align='middle'><span style={{color: 'red'}}>* </span>手机端界面截图 :&nbsp;&nbsp;</Col>
        <Col span={9}>
          <Upload {...propsPhone}>
            <Button>
              <Icon type='upload' /> 上传文件
            </Button>
            <span className='extend'>支持扩展名：.png .jpg ... （400px*400px）</span>
          </Upload>
        </Col>
      </Row>
      <div style={{borderBottom: '2px dotted #ddd', height: '2px', width: '1200px', marginLeft: '2%', marginBottom: '2%', marginTop: '4%'}} />
    </Row>
    // 开发相关
    const aboutDev = <Row>
      {/* <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />开发相关</p></Row> */}
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
            <Input placeholder='请输入身份证号' style={{ width: 200 }} onBlur={this.idNumberBlur} onChange={this.idNumber} value={this.state.idNumber} /></Col>
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
            <Input placeholder='请输入联系人电话' style={{ width: 200 }} onBlur={this.conPeopleNumBlur} onChange={this.conPeopleNum} value={this.state.conPeopleNum} /></Col>
        </Col>
      </Row>
      <div style={{borderBottom: '2px dotted #ddd', height: '2px', width: '1200px', marginLeft: '2%', marginBottom: '3%', marginTop: '4%'}} />
    </Row>
    // 软件版权
    const aboutPatent = <Row>
      {/* <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />软件版权</p></Row> */}
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
                    <span style={{visibility: 'hidden'}} />支持扩展名：.png .jpg ...</span>
                </Upload>
              </Radio>
              <span style={{visibility: 'hidden'}}>*PC无无555555555555555555555555555555555555555555555555呜呜呜呜呜</span>
            </Col>
            <Col span={1} />
            <Col span={14}>
              <span style={{visibility: 'hidden'}}>6</span>
              <Radio value={2}>
                <span >开发者权利声明 :</span>
                <span style={{visibility: 'hidden'}}>无</span>
                <Upload {...propsW}>
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                  <span className='extend'>
                    <span style={{visibility: 'hidden'}} />请下载模板打印盖章后，以jpg、png格式扫描上传</span><a href='javascript:0;'>下载模版</a>
                </Upload>
              </Radio>
            </Col>
          </RadioGroup>
        </Col>
        {/* <Col span={5}></Col> */}
      </Row>
      <div style={{borderBottom: '2px dotted #ddd', height: '2px', width: '1200px', marginLeft: '2%', marginBottom: '3%', marginTop: '4%'}} />
    </Row>
    // 计费模式选择
    const aboutFee = <Row>
      <Row>
        {/* <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />计费模式选择</p></Row> */}
        <Row>
          <Col span={24} style={{textAlign: 'center'}}>
            <AppPurCombination />
          </Col>
        </Row>
      </Row>
    </Row>
    // 财务凭证
    const aboutVoucher = <Row>
      {/* <Row><p styke={{fontSize: '14px'}}><img src={this.state.imgTitle} />软件版权</p></Row> */}
      <Row className='Wxd' type='flex' align='top'>
        <Col span={3} align='middle'>财务审核凭证 :&nbsp;&nbsp;</Col>
        <Col span={9}>
          <Upload {...propsFinVour}>
            <Button>
              <Icon type='upload' />上传文件
            </Button>
            <span className='extend'>支持扩展名：.png .jpg ...</span>
          </Upload>
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='top'>
        <Col span={3} align='middle'>合同文件上传 :&nbsp;&nbsp;</Col>
        <Col span={9}>
          <Upload {...propsContract}>
            <Button>
              <Icon type='upload' />上传文件
            </Button>
            <span className='extend'>支持扩展名：.word .pdf .jpg ...</span>
          </Upload>
        </Col>
      </Row>
      <div style={{borderBottom: '2px dotted #ddd', height: '2px', width: '1200px', marginLeft: '2%', marginBottom: '3%', marginTop: '4%'}} />
    </Row>

    const tabs = [{
      title: '软件相关',
      content: aboutSoftware
    }, {
      title: '开发相关',
      content: aboutDev
    }, {
      title: '软件版权',
      content: aboutPatent
    }, {
      title: '计费模式选择',
      content: aboutFee
    }, {
      title: '财务凭证',
      content: aboutVoucher
    }]
    const TabPane = Tabs.TabPane

    return <Card title='上架申请' className='main-card' style={{marginLeft: '5%', width: '1300px', minHeight: '540px'}}
      extra={
        <div>
          <Button type='primary' onClick={() => { this.handlePreview() }}>预览</Button>
          <Button type='primary' style={{marginLeft: '5%'}} onClick={this.submit}>提交申请</Button>
          <Button style={{marginLeft: '5%'}} onClick={this.onCancel}>取消</Button>
        </div>
      }>
      <div >
        {/* 修改厂商合同编号 */}
        {this.state.previewApp ? <SelfPleasePreview
          visible={this.state.previewApp}
          hiddenModal={this.hiddenModal.bind(this, 'previewApp')}
          dataPre={this.state.formDataPre1}
          dataPc={this.state.fileListPCUrl}
          dataPhone={this.state.fileListPhoneUrl}
          dataIcon={this.state.fileListIconUrl}
        /> : null}
        <div>
          <Tabs defaultActiveKey='软件相关'>
            {tabs.map((item, index) => <TabPane key={item.title} tab={item.title}>{tabs[index].content}</TabPane>)}
          </Tabs>
        </div>
      </div>
    </Card>
  }
}

export default withRouter(ShelfPlease)
