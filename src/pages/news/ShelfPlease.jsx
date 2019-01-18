/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 上架流程
 */
import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Tabs,
  Row,
  Col,
  Card,
  Input,
  Select,
  Button,
  DatePicker,
  Radio,
  Icon,
  Upload,
  message,
  Checkbox
} from 'antd'
import { axios } from 'utils'
import config from '../../config'
import { getUpload, getMultiUpload, deleteFiles } from '../../services/upload'
import title from '../../assets/images/title.png'
import './NewsList.scss'
import SelfPleasePreview from 'pages/app-detail/SelfPleasePreview'
import {AppPurCombination} from 'components/software-market'

const { TextArea } = Input
const RadioGroup = Radio.Group

const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_EDU_MARKET = config.SERVICE_EDU_MARKET

/**
 * 文件内组件-版本编辑器
 * 1- 对应state中的一组数据
 * 1- 内部的按钮有对应的函数 -- 把自身的id -- index传出去
 * 3- 删除函数 -- 组件对应的id + 对应的state数据 -》 操作数据
 */

class ShelfPlease extends React.Component {
  static propTypes = {
    history: PropTypes.any
  }
  constructor (props) {
    super(props)
    this.state = {
      previewApp: false, // 是否显示预览弹窗
      imgTitle: title,
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
      fileListDetailType: [], // 用来存软件版本类型的文件id
      fileListDetailSize: [], // 用来存软件版本包大小的文件id
      fileListDetailVersionNum: [], // 用来存软件版本版本号的文件id
      fileListDetailPackName: [], // 用来存软件版本包名的文件id
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
      relationNumBlur: false,
      idNumBlur: false,
      formDataPre1: '', // 预览数据
      appName: '', // 软件名称 -- v2
      appType: '', // 软件类型
      appTypeName: '', // 软件类型名称
      appDesc: '', // 软件描述
      feature: '', // 新版特性
      rights: [], // 权限详情
      shelfTime: null, // 期望上架时间
      authName: '', // 开发相关-姓名
      idNum: '', // 身份证号
      relation: '', // 主要联系人
      relationNum: '', // 联系人电话
      appIcon: null, // 软件图标-文件/上传后用来存储后台返回的id
      pcPics: [], // pc图片-图片/上传后用来存储后台返回的id的数组
      phonePics: [], // pc图片-图片/上传后用来存储后台返回的id的数组
      versions: [{
        address: '', // 上传文件
        appVersion: '', // 软件平台版本
        packageName: '', // 包名
        runningPlatform: '', // 版本号
        versionSize: '' // 软件大小
      }], // 渲染用state-用来映射软件版本编辑器/同时也是表单数据中的pc字段
      imgUrl: '',
      platform: {
        name: '', // 应用名称
        typeId: '', // 类型
        typeName: '', // 类型名称
        description: '', // 应用描述
        special: '', // 新版特性
        urlAddress: '', // 链接地址
        urlTest: '' // 链接测试结果
      }
    }
  }
  hiddenModal () {
    this.setState({
      previewApp: false
    })
  }
  // 软件名称
  onAppNameChange=(e) => {
    let {value} = e.target
    this.setState({
      appName: value
    })
  }
  // 新版特性
  onFeatureChange=(e) => {
    let {value} = e.target
    this.setState({
      feature: value
    })
  }
  // 类型
  onTypeChange = (value) => {
    // console.log(value)
    this.setState({
      appType: value.key,
      appTypeName: value.label
    })
  }
  // 软件描述
  onDescChange=(e) => {
    let {value} = e.target
    this.setState({
      appDesc: value
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
  onRightChange = (checkedValues, index) => {
    this.setState({
      rights: checkedValues
    }, () => {
      console.log('用来存软件版本权限详情', this.state.rights)
    })
  }

  // 日期变化
  onShelfDateChange=(value, dateString) => {
    this.setState({
      shelfTime: value
    })
  }
  // 日期点击确定
  onOk=(value) => {
    this.setState({
      shelfTime: value
    })
  }
  // 日期取消
  onBlur =(value) => {
    if (value) {
      this.setState({
        shelfTime: value
      })
    }
  }
  // 存开发相关的name
  onAuthNameChange = (e) => {
    let {value} = e.target
    this.setState({
      authName: value
    })
  }
  // 存身份证号
  onIdNumChange=(e) => {
    let {value} = e.target

    this.setState({
      idNum: value
    })
  }
  // 身份证校验
  idNumBlur=(e) => {
    let {value} = e.target
    var regu = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    var re = new RegExp(regu)
    if (re.test(value)) {
      this.setState({
        idNumBlur: true
      })
    } else {
      message.error('请输入身份证号格式不正确')
      this.setState({
        idNumBlur: false
      })
    }
  }
  // 存联系人
  onRelationChange=(e) => {
    let {value} = e.target
    this.setState({
      relation: value
    })
  }
  // 存联系人电话
  relationNum=(e) => {
    let {value} = e.target
    this.setState({
      relationNum: value
    })
  }
  // 手机校验
  relationNumBlur = (e) => {
    let {value} = e.target
    var regu = /^1[34578]\d{9}$/
    var re = new RegExp(regu)
    if (re.test(value)) {
      this.setState({
        relationNumBlur: true
      })
    } else {
      message.error('请输入手机号格式不正确')
      this.setState({
        relationNumBlur: false
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

  getBase64=(img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  // 预览表单
  handlePreview () {
    const thiz = this
    console.log(this.state)
    let formDataPre = new FormData()
    formDataPre.append('appName', this.state.appName || '')// 软件名称*
    formDataPre.append('appType', this.state.appTypeName || '')// 软件类型*
    formDataPre.append('sw_icon', this.state.imgUrl.thumbUrl || '')// 软件图标*
    // 查看详情
    formDataPre.append('appInfo', JSON.stringify(this.state.versions))
    // formDataPre.append('detailType', this.state.fileListDetailType || [])// 版本分类*
    // formDataPre.append('detailSize', this.state.fileListDetailSize || [])// 软件大小*
    // formDataPre.append('detailVersionNum', this.state.fileListDetailVersionNum || [])// 版本号*
    // formDataPre.append('detailPackName', this.state.fileListDetailPackName || [])// 包名*
    formDataPre.append('detailAuth', this.state.rights || [])// 权限详情*
    this.state.fileListPhone.forEach((file) => { // 手机展示
      formDataPre.append('phonePhoto', file)
    })
    formDataPre.append('appDesc', this.state.appDesc || '')// 应用介绍*
    formDataPre.append('feature', this.state.feature || '')// 新版特性*

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
   * --------------------------v2方法--------------------------------
   */
  /**
   * 事件-版本编辑器-软件版本（运行环境）
   */
  onappVersionChange = (v, index) => {
    let arr = this.state.versions.slice()
    arr[index].runningPlatform = v
    this.setState({
      versions: arr
    })
  }
  /**
   * 事件-版本编辑器-包名
   */
  onVerPackName = (e, index) => {
    let arr = this.state.versions.slice()
    // console.log(arr)
    arr[index].packageName = e.target.value
    this.setState({
      versions: arr
    })
  }
  /**
   * 事件-版本编辑器-版本号
   */
  onVerNumChange = (e, index) => {
    let arr = this.state.versions.slice()
    arr[index].appVersion = e.target.value
    this.setState({
      versions: arr
    })
  }
  /**
   * 事件-版本编辑器-软件大小
   */
  /* onVerSizeChange = (e, index) => {
    let arr = this.state.versions.slice()
    arr[index].versionSize = e.target.value
    this.setState({
      versions: arr
    })
  } */

  /**
   * 事件-删除一个版本编辑器
   * 1- 利用版本编辑器的id（就是state.versions中的对应的index）
   */
  onVerEditorRemove = (id) => {
    let arr = this.state.versions.slice()
    // 删除数据中对应index的元素
    arr.splice(id, 1)
    // 把删除后的数据映射到state中 驱动view渲染
    this.setState({
      versions: arr
    })
  }
  /**
   * 事件-增加一个版本编辑器
   */
  onAddVerEditor = () => {
    // 直接操作view映射过去的state
    this.setState({
      versions: [...this.state.versions, {
        address: '', // 上传文件
        appVersion: '', // 软件平台版本
        packageName: '', // 包名
        runningPlatform: '', // 版本号
        versionSize: '' // 软件大小
      }]
    })
  }

  /**
   * 渲染List-版本编辑器
   */
  getVerEditorListRender = (list) => {
    let arr = list || []
    return arr.map((v, i) => {
      return this.getVerEditorRender(i)
    })
  }
  /**
   * 渲染Item-版本编辑器
   */
  getVerEditorRender = (index) => {
    const thiz = this
    const propsVer = {
      onRemove: (file) => {
        // 里面的部分如果多个地方使用 就抽象出去
        // 拿到要删除的state.versions中的文件id(address)
        let idList = [parseInt(this.state.versions[index].address)]
        // 调用后台接口 删除id对应的文件
        deleteFiles(idList, function (res) {
        // 设置对应的文件id
          if (res.data && res.data.code === 200) {
          // appIcon上传完之后 我们就用它来存后台返回的id
          // 删除state.versions映射中的id
            let arr = thiz.state.versions.slice()
            arr[index].address = ''
            arr[index].versionSize = ''
            // 映射到state中
            thiz.setState({
              versions: arr
            }, function () {
              message.success('删除成功')
            })
          } else {
            message.warn('删除失败')
            return false
          }
        })
      },
      onChange: (info) => {
        if (info.fileList.length > 1) {
          info.fileList.splice(1)
        }
      },
      beforeUpload: (file) => {
        let hide = message.loading(`${file.name} 上传中`, 0)
        // 把文件上传上去
        getUpload('soft', file, (res) => {
        // 设置对应的文件id
          if (res.data && res.data.code === 200) {
            hide()
            // 构造一个versions的数组arr 把后台返回的id映射到arr
            let arr = this.state.versions.slice()
            arr[index].address = res.data.data
            arr[index].versionSize = (file.size / 1024 / 1024).toFixed(2) + 'MB'
            // 把arr复制给state.versions
            thiz.setState({
              versions: arr
            })
            message.success(`${file.name} 上传成功！`)
          } else {
            message.warn(`${file.name} 上传失败！`)
          }
        })
        return false
      },
      accept: '.exe'
      // fileListSoftwareEdt: this.state.fileListSoftwareEdt
    }
    return (
      <Row key={index}>
        <Col span={2} offset={1}>
          <span style={{color: 'red'}}>* </span>
          软件版本：
        </Col>
        <Col span={3}>
          <Select
            style={{ width: 150 }}
            placeholder='请选择安装包版本'
            onChange={(value) => this.onappVersionChange(value, index)}>
            {
              this.state.dataL.map((item, index) => {
                return (
                  <Select.Option
                    key={index}
                    value={item.key}
                  >
                    {item.value}
                  </Select.Option>
                )
              })}
          </Select>
        </Col>
        <Col span={3}>
          <Upload {...propsVer}>
            <Button>
              <Icon type='upload' /> 上传文件
            </Button>
            <div className='extend'>支持扩展名：.exe..</div>
          </Upload>
        </Col>
        <Col span={2} style={{width: '6%', lineHeight: '32px'}}>
          {this.state.versions[index].versionSize}
        </Col>
        <Col span={4}>
          <span style={{color: 'red'}}>* </span>版本号 :
          <Input
            style={{ width: 130 }}
            value={this.state.versions[index].appVersion}
            onChange={(e) => this.onVerNumChange(e, index)} />
        </Col>
        <Col span={4}>
          <span style={{color: 'red'}}>* </span>包名 :
          <Input
            style={{ width: 160 }}
            value={this.state.versions[index].packageName}
            onChange={(e) => this.onVerPackName(e, index)} />
        </Col>
        <Col span={3}>
          <Button
            onClick={() => this.onVerEditorRemove(index)}
          >
              删除
          </Button>
        </Col>
      </Row>
    )
  }

  /**
   * 上传App的icon
   */
  uploadAppIcon = (thiz, callBack) => {
    if (thiz.state.appIcon) {
      getUpload('pic', this.state.appIcon, (res) => {
        // 设置对应的文件id
        if (res.data && res.data.code === 200) {
          // appIcon上传完之后 我们就用它来存后台返回的id
          thiz.setState({
            appIcon: res.data.data
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
    if (thiz.state.pcPics) {
      getMultiUpload('pic', this.state.pcPics, (res) => {
        // 设置对应的文件id
        if (res.data && res.data.code === 200) {
          thiz.setState({
            pcPics: res.data.data.slice()
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
   * 上传App的phone截图
   */
  uploadPhonePics = (thiz, callBack) => {
    if (thiz.state.phonePics) {
      getMultiUpload('pic', this.state.phonePics, (res) => {
        // 设置对应的文件id
        if (res.data && res.data.code === 200) {
          thiz.setState({
            phonePics: res.data.data.slice()
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
   * 取消
   */
  onCancel = () => {
    this.props.history.goBack()
  }

  /**
   * 专门的一个参数生成器
   * 1- 因为有的用户添加版本编辑器 -- 有问题
   */
  versions2Params = (versions) => {
    let arr = versions ? versions.slice() : []
    let result = []
    arr.forEach((v, i) => {
      if (v.address !== '' || v.appVersion !== '') {
        // 将有有效值的参数传递出来
        result.push(v)
      }
    })
    return result
  }

  /**
   * params组织 - 获取迭代接口需要的params
   */
  getParams = (thiz) => {
    const {
      appName,
      appDesc,
      appType,
      feature,
      appIcon,
      pcPics,
      phonePics,
      rights,
      versions
    } = this.state

    // let result = {}
    // userId部分
    // result.userId = webStorage.getItem('STAR_WEB_PERSON_INFO').userId
    // appInfo 部分
    let result = {
      appIcon: appIcon, // 软件图标
      appName: appName, // app名称
      appNotes: appDesc, // app描述
      appPcPic: pcPics, // app的pc端截图
      appPhonePic: phonePics, // app的手机端截图
      appTypeId: appType, // app的类型
      authDetail: rights, // 权限详情
      newFeatures: feature // app的新版特性
    }

    // result.pc部分 -- 这里需要一个函数从state.version中生成
    result.pc = this.versions2Params(versions)

    return result
  }

  /**
   * 接口调用 - 提交数据
   */
  getSubmit = (thiz) => {
    // const appId = thiz.state.appId
    // const userId = webStorage.getItem('STAR_WEB_PERSON_INFO').userId
    axios.post(API_BASE_URL_V2 + SERVICE_EDU_MARKET + `/manage-app`, {...thiz.getParams()})
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
   * 提交数据
   */
  onSubmit = (thiz) => {
    // appIcon上传
    thiz.uploadAppIcon(thiz, () => {
      // pcIcons上传结束
      thiz.uploadPcPics(thiz, () => {
        // PhonePics上传
        this.uploadPhonePics(thiz, () => {
          // 提交整个表单
          thiz.getSubmit(thiz)
        })
      })
    })
  }
  /** 平台名称 **/
  changePlatformName = (e) => {
    const {value} = e.target
    const {platform} = this.state
    platform.name = value
    this.setState({
      ...platform
    })
  }
  /** 平台应用描述**/
  changePlatformDescription = (e) => {
    const {value} = e.target
    const {platform} = this.state
    platform.description = value
    this.setState({
      ...platform
    })
  }
  /** 平台应用新特性 */
  changePlatfromSpecial = (e) => {
    const {value} = e.target
    const {platform} = this.state
    platform.special = value
    this.setState({
      ...platform
    })
  }
  render () {
    const {platform} = this.state
    // 需要改
    const data = [
      {
        name: '教学类',
        value: '101'
      }, {
        name: '教辅类',
        value: '102'
      }, {
        name: '管理类',
        value: '103'
      }, {
        name: '评价类',
        value: '105'
      }, {
        name: '学习类',
        value: '106'
      }, {
        name: '亲子互动类',
        value: '37'
      }, {
        name: '其他',
        value: '107'
      }
    ]
    // 上传软件图标
    const appIconProps = {
      listType: 'picture',
      onRemove: (file) => {
        this.setState({
          appIcon: null
        })
      },
      beforeUpload: (file) => {
        // console.log(file)
        this.setState({
          appIcon: file
        })
        // 开启手动上传
        return false
      },
      onChange: ({fileList}) => {
        this.setState({
          imgUrl: fileList[0]
        })
      },
      fileListIconUrl: this.state.fileListIconUrl,
      fileListIcon: this.state.fileListIcon,
      accept: '.png,.jpeg,.jpg'
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
          // console.log('fileListFour', this.state.fileListFour)
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
          // console.log('fileListFive', this.state.fileListFive)
        })
        return false
      },
      fileListFive: this.state.fileListFive
    }
    const pcPicsProps = {
      listType: 'picture',
      onRemove: (file) => {
        // 从state中拷贝一个文件数组 删除一个文件对应的元素 返回一个删除后的新数组
        let newFileList = this.state.pcPics.slice()
        const index = newFileList.indexOf(file)
        newFileList.splice(index, 1)
        this.setState({
          pcPics: newFileList
        })
      },
      beforeUpload: (file) => {
        // 把新文件添加到state原来的数组中
        this.setState({
          pcPics: [...this.state.pcPics, file]
        })
        // 采用手动上传
        return false
      },
      onChange: ({fileList}) => {
        // console.log(fileList)
        this.setState({
          fileListPCURL: fileList
        })
      }
    }
    const propsPhone = {
      listType: 'picture',
      onRemove: (file) => {
        // 从state中拷贝一个文件数组 删除一个文件对应的元素 返回一个删除后的新数组
        let newFileList = this.state.phonePics.slice()
        const index = newFileList.indexOf(file)
        newFileList.splice(index, 1)
        this.setState({
          phonePics: newFileList
        })
      },
      beforeUpload: (file) => {
        // 把新文件添加到state原来的数组中
        this.setState({
          phonePics: [...this.state.phonePics, file]
        })
        // 采用手动上传
        return false
      },
      onChange: ({fileList}) => {
        this.setState({
          fileListPhoneUrl: fileList
        })
      }
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
          // console.log('this.state.fileListFinVour', this.state.fileListFinVour)
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
        <Col span={7}><Input placeholder='请输入软件名称' style={{ width: 280 }} onChange={this.onAppNameChange} value={this.state.appName} /></Col>
        <Col span={2} offset={3}><span style={{color: 'red'}}>* </span>类型 :</Col>
        <Col span={7}>
          <Select labelInValue defaultValue={{key: '101'}} allowClear style={{ width: 260 }} onChange={this.onTypeChange} >
            {data.map((item, index) => {
              return <Select.Option value={item.value} key={index}>{item.name}</Select.Option>
            })}
          </Select>
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='middle'>
        <Col span={2} offset={1}><span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>软件描述 : </span></Col>
        <Col span={20}>
          <TextArea placeholder='请输入软件描述' style={{ width: 880 }} onChange={this.onDescChange} value={this.state.appDesc} />
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='middle'>
        <Col span={2} offset={1}><span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>新版特性 : </span></Col>
        <Col span={20}>
          <TextArea placeholder='请输入新版特性' style={{ width: 880 }} onChange={this.onFeatureChange} value={this.state.feature} />
        </Col>
      </Row>
      {
        this.getVerEditorListRender(this.state.versions)
      }
      <Row className='Wxd'>
        <Col span={21} offset={3}>
          <Button type='danger' onClick={this.onAddVerEditor}>+添加提供版本</Button>
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='middle'>
        <Col span={2} offset={1}><span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>权限详情 : </span></Col>
        <Col span={20}>
          <Checkbox.Group style={{ width: '100%' }} onChange={this.onRightChange}>
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
        <Col span={2} offset={1}>软件图标 :</Col>
        <Col span={9} id='iconDiv'>
          <Upload {...appIconProps}>
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
            onChange={this.onShelfDateChange}
            onOk={this.onOk}
          />
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='top'>
        <Col span={3} align='middle'>PC端界面截图 :&nbsp;&nbsp;</Col>
        <Col span={9}>
          <Upload {...pcPicsProps}>
            <Button>
              <Icon type='upload' /> 上传文件
            </Button>
            <span className='extend'>支持扩展名：.png .jpg ... （400px*400px）</span>
          </Upload>
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='top'>
        <Col span={3} align='middle'>手机端界面截图 :&nbsp;&nbsp;</Col>
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
          <Input placeholder='请输入名字' style={{ width: 280 }} onChange={this.onAuthNameChange} value={this.state.authName} />
        </Col>
        <Col span={8}>
          <Col span={5}>
            <span style={{color: 'red'}}>* </span>身份证号 :
          </Col>
          <Col span={17}>
            <Input placeholder='请输入身份证号' style={{ width: 200 }} onBlur={this.idNumBlur} onChange={this.onIdNumChange} value={this.state.idNum} /></Col>
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
          <Input placeholder='请输入联系人' style={{ width: 280 }} onChange={this.onRelationChange} value={this.state.relation} /></Col>
        <Col span={8}>
          <Col span={6}>
            <span style={{color: 'red'}}>* </span>联系人电话 :
          </Col>
          <Col span={18}>
            <Input placeholder='请输入联系人电话' style={{ width: 200 }} onBlur={this.relationNumBlur} onChange={this.relationNum} value={this.state.relationNum} /></Col>
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
    // 应用相关
    const aboutPlatform = <Row>
      <Row className='Wxd' type='flex' align='middle'>
        <Col span={2} offset={1}><span style={{color: 'red'}}>* </span>应用名称 :</Col>
        <Col span={7}><Input placeholder='请输入应用名称' style={{ width: 280 }} onChange={this.changePlatformName} value={platform.name} /></Col>
        <Col span={2} offset={3}><span style={{color: 'red'}}>* </span>类型 :</Col>
        <Col span={7}>
          <Select labelInValue defaultValue={{key: '101'}} allowClear style={{ width: 260 }} >
            {data.map((item, index) => {
              return <Select.Option value={item.value} key={index}>{item.name}</Select.Option>
            })}
          </Select>
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='middle'>
        <Col span={2} offset={1}><span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>应用描述 : </span></Col>
        <Col span={20}>
          <TextArea placeholder='请输入软件描述' style={{ width: 880 }} onChange={this.changePlatformDescription} value={platform.description} />
        </Col>
      </Row>
      <Row className='Wxd' type='flex' align='middle'>
        <Col span={2} offset={1}><span style={{display: 'inline-block', height: '50px'}}><span style={{color: 'red'}}>* </span>新版特性 : </span></Col>
        <Col span={20}>
          <TextArea placeholder='请输入新版特性' style={{ width: 880 }} onChange={this.changePlatfromSpecial} value={platform.special} />
        </Col>
      </Row>
      <Row className='Wxd' type='felx' algin='middle'>
        <Col span={3} offset={1}><span style={{color: 'red'}}>*</span>平台应用链接地址：</Col>
        <Col span={7}>
          <Input placeholder='请输入链接' value={platform.urlAddress} />
        </Col>
        <Col span={4} offset={1}>
          <Button type='primary'>测试链接</Button>
        </Col>
        <Col span={4}>
          <span>{platform.urlTest}</span>
        </Col>
      </Row>
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
    let softTabs = [{
      title: '应用相关',
      content: aboutPlatform
    }, {
      title: '计费模式',
      content: aboutFee
    }, {
      title: '财务凭证',
      content: aboutVoucher
    }]
    const TabPane = Tabs.TabPane
    let extraBtn = (
      <div style={{width: '300px'}}>
        <Button type='primary' onClick={() => { this.handlePreview() }}>预览</Button>
        <Button type='primary' style={{marginLeft: '5%'}} onClick={() => this.onSubmit(this)}>提交申请</Button>
        <Button style={{marginLeft: '5%'}} onClick={this.onCancel}>取消</Button>
      </div>
    )
    return (
      <Row className='tab-wrapper'>
        <div style={{margin: '20px'}}><strong>上架申请</strong></div>
        <Tabs tabBarStyle={{border: 'none', background: '#fff'}} defaultActiveKey='01'>
          <TabPane key='01' tab={<strong>软件应用</strong>}>
            <Card className='main-card' style={{margin: '0 auto', width: '100%', minHeight: '540px', border: 'none'}}>
              <div >
                {/* 修改厂商合同编号 */}
                {this.state.previewApp ? <SelfPleasePreview
                  visible={this.state.previewApp}
                  hiddenModal={this.hiddenModal.bind(this, 'previewApp')}
                  dataPre={this.state.formDataPre1}
                  dataPc={this.state.fileListPCURL}
                  dataPhone={this.state.fileListPhoneUrl}
                  dataIcon={this.state.fileListIconUrl}
                /> : null}
                <div>
                  <Tabs defaultActiveKey='软件相关' tabBarExtraContent={extraBtn} >
                    {tabs.map((item, index) => <TabPane className='shelf-tab-panel' key={item.title} tab={item.title}>{tabs[index].content}</TabPane>)}
                  </Tabs>
                </div>
              </div>
            </Card>
          </TabPane>
          <TabPane key='02' tab={<strong>平台应用</strong>}>
            <div>
              <Tabs defaultActiveKey='应用相关' tabBarExtraContent={extraBtn}>
                {
                  softTabs.map((item, index) => {
                    return <TabPane className='shelf-tab-panel' key={item.title} tab={item.title}>{item.content}</TabPane>
                  })
                }
              </Tabs>
            </div>
          </TabPane>
        </Tabs>
      </Row>
    )
  }
}

export default withRouter(ShelfPlease)
