/**
 * 工作台-个人中心-基本信息
 */
import React, { Component } from 'react'
import webStorage from 'webStorage'
<<<<<<< HEAD
import { Input, Row, Col } from 'antd'
=======
import { Input, Row, Col, Button, message } from 'antd'
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
import './BaseInfo.scss'
import ChangeFirmName from '../../../message-notice/ChangeFirmName'
import ChangeFirmDescribe from '../../../message-notice/ChangeFirmDescribe'
import ChangeFirmContract from '../../../message-notice/ChangeFirmContract'
import ChangeFirmLicense from '../../../message-notice/ChangeFirmLicense'
import LookFirmLicense from '../../../message-notice/LookFirmLicense'
import {axios} from '../../../../utils'
import config from '../../../../config/index'
import ChangePhoneNumber from '../../../message-notice/ChangePhoneNumber'
<<<<<<< HEAD
=======
import NewUserInfo from '../../../message-notice/NewUserInfo.jsx'
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
const {API_BASE_URL_V2, SERVICE_AUTHENTICATION} = config
const { TextArea } = Input

class BaseInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      changeFirmName: false, // 厂商名称
      changeFirmDescribe: false, // 厂商描述
      changeFirmContract: false, // 厂商合同号
      changeFirmLicense: false, // 营业执照
      lookFirmLicense: false, // 查看营业执照
      changeName: false,
      changeMobile: false,
      changeMail: false,
      userId: null,
      userName: '',
      phoneNumber: '',
      mailAddress: '',
<<<<<<< HEAD
      userType: ''
    }
  }
  componentDidMount () {
    let id = webStorage.getItem('STAR_V2_USERID') || 1
    axios.get(`${API_BASE_URL_V2}${SERVICE_AUTHENTICATION}/users/${id}`).then((res) => {
      console.log(res)
=======
      userType: '',
      userInfo: {},
      newInfoVisible: false
    }
  }
  componentDidMount () {
    this.getUserInfo()
  }
  getUserInfo = () => {
    let id = webStorage.getItem('STAR_V2_USERID') || 1
    axios.get(`${API_BASE_URL_V2}${SERVICE_AUTHENTICATION}/users/${id}`).then((res) => {
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
      this.setState({
        userId: res.data.data.userId,
        userName: res.data.data.userName,
        userType: res.data.data.userType,
        phoneNumber: res.data.data.phoneNumber,
        mailAddress: res.data.data.mailAddress,
        changePhoneVisible: false
<<<<<<< HEAD
=======
      }, () => {
        if (!this.state.phoneNumber && this.state.userType === 5) {
          this.setState({
            newInfoVisible: true
          })
        }
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
      })
    })
  }

  codePhone = () => {
    let str = '' + this.state.phoneNumber
    if (str !== '') {
      let strName = str.substr(0, 4) + '***' + str.substr(7, 4)
<<<<<<< HEAD
      console.log(strName)
=======
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
      return strName
    }
  }

  hiddenModal = (type) => {
    this.setState({
      [type]: false
    })
  }

   /* 修改厂商名称 */
   changefirmname =() => {
     this.setState({
       changeFirmName: true
     })
   }
  /* 修改描述 */
  changefirmdescribe =() => {
    this.setState({
      changeFirmDescribe: true
    })
  }
  /* 修改合同编号 */
  changeFirmcontract =() => {
    this.setState({
      changeFirmContract: true
    })
  }
  /* 营业执照 */
  changeFirmLicense =() => {
    this.setState({
      changeFirmLicense: true
    })
  }
  /* 查看营业执照 */
  lookFirmLicense =(va) => {
    if (va) {
      this.setState({
        lookFirmLicense: true,
        licensePhoto: va
      })
    }
  }

  // 根据用户角色显示对应的姓名字段
  showName = (role) => {
    switch (role) {
      case 'school': case 'eduBureau':
        return '运营者姓名'
      case 'teacher': case 'parents': case 'students':
        return '姓名'
      case 'agent':
        return '代理商姓名'
      default:
        break
    }
  }

  // 根据用户角色不同显示不同的手机字段
  showMobileName = (role) => {
    switch (role) {
      case 'school': case 'eduBureau':
        return '运营者手机号'
      case 'teacher': case 'parents': case 'students':
        return '手机号'
      case 'agent':
        return '代理商手机号'
      default:
        break
    }
  }

  changeState = (key) => {
    this.setState({
      [key]: !this.state[key]
    })
  }

  /* 修改手机 */
  changephone =() => {
    this.setState({
      changePhoneVisible: true
    })
  }
<<<<<<< HEAD
=======
  /** 修改用户信息 */
  newUserInfo = () => {
    this.refs.userForm.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post(API_BASE_URL_V2 + SERVICE_AUTHENTICATION + '/users/detailed', values).then(res => {
          const data = res.data.data
          if (res.data.code === 200) {
            console.log(data)
          }
        })
      }
    })
  }
  /** 用户信息修改成功 */
  onOk = (data) => {
    message.success('新增信息添加成功')
    this.setState({
      newInfoVisible: false
    }, () => {
      this.getUserInfo()
    })
  }
  getRoleType = () => {
    if (this.state.userType) {
      switch (this.state.userType) {
        case 1:
          return '学生'
        case 2:
          return '教师'
        case 3:
          return '学校'
        case 5:
          return '家长'
        case 7:
          return '教育机构'
        case 8:
          return '个人'
        default:
          return ''
      }
    } else {
      return ''
    }
  }
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83

  render () {
    let per = webStorage.getItem('STAR_WEB_ROLE_CODE')
    return (
      <div className='base-info'>
        <div className='base-info-top'>
          <div className='base-info-title'>基本信息</div>
          {/* <Button className='base-info-btn back-btn'>返回</Button>
          <Button type='primary' className='base-info-btn'>保存</Button> */}
        </div>
        {
          per === 'vendor'
            ? <div className='setting-body'>
              <div className='safe_item'>
                <div className='list-img'>
                  <i />
                </div>
                <div className='safe-name'>
                  <span className='tit'>厂商名称</span>
                  <span className='word f-color'>福州市第一实验小学</span>
                  {/* <a className='modify' onClick={this.changefirmname}> 修改</a> */}
                </div>
              </div>
              <div className='safe_item'>
                <div className='list-img'>
                  <i />
                </div>
                <div className='safe-name'>
                  <span className='tit'>厂商描述</span>
                  <div className='word f-color describe' >
                    <span style={{height: '1rem'}} />
                    这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述
                    这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述
                  </div>
                  {/* <a className='modify' onClick={this.changefirmdescribe}> 修改</a> */}
                </div>
              </div>
              <div className='safe_item'>
                <div className='list-img'>
                  <i />
                </div>
                <div className='safe-name'>
                  <span className='tit'>合同编号</span>
                  <span className='word f-color'>HT217897438927189470</span>
                  {/* <a className='modify' onClick={this.changeFirmcontract}> 修改</a> */}
                </div>
              </div>
              <div className='safe_item'>
                <div className='list-img'>
                  <i />
                </div>
                <div className='safe-name'>
                  <span className='tit'>营业执照</span>
                  <span className='word f-color'>
                    {/* <img style={{height: '50px'}} src={Config.IMG_BASE_URL + (firmData && firmData.fa_contract)} /> */}
                  </span>
                  {/* <a className='modify' onClick={this.changeFirmLicense}>重新上传</a> */}
                </div>
              </div>
            </div>
            : <div className='base-info-content'>
              <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>用户类型:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
<<<<<<< HEAD
                  {this.state.userType}
=======
                  {this.getRoleType()}
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
                </Col>
              </Row>
              {/* <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>名称:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  烽火
                </Col>
                <Col className='base-info-content-change'>
                  <Button className='base-info-content-btn'>修改</Button>
                </Col>
              </Row> */}
              <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>{this.showName(per)}:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  {
                    this.state.changeName
                      ? <Input defaultValue={this.state.userName} />
                      : this.state.userName
                  }
                </Col>
                <Col className='base-info-content-change'>
                  {/* <Button className='base-info-content-btn' onClick={() => this.changeState('changeName')}>{this.state.changeName ? '保存' : '修改'}</Button> */}
                  {/* <Button className='base-info-content-btn'>修改</Button> */}
                </Col>
              </Row>
              <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>{this.showMobileName(per)}:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  {
                    this.state.changeMobile
                      ? <Input defaultValue={this.state.phoneNumber} />
                      : <div>
                        <span className='info-tips'>您验证的手机:</span>
                        <span>{this.codePhone()}</span>
                        <span className='info-tips'>若已丢失或停用，请立即更换,</span>
                        <span className='info-warn'>避免账户被盗</span>
                      </div>
                  }
                </Col>
                <Col className='base-info-content-change'>
<<<<<<< HEAD
                  {/* <Button className='base-info-content-btn' onClick={this.changephone}>修改</Button> */}
                  {/* <Button className='base-info-content-btn'>修改</Button> */}
=======
                  <Button className='base-info-content-btn' onClick={this.changephone}>修改</Button>
                  <Button className='base-info-content-btn'>修改</Button>
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
                </Col>
              </Row>
              <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>邮箱验证:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  {
                    this.state.changeMail
                      ? <Input defaultValue={this.state.mailAddress} />
                      : <div>
                        <span className='info-tips'>您验证的邮箱:</span>
                        <span>{this.state.mailAddress}</span>
                        <span className='info-tips'>若已丢失或停用，请立即更换,</span>
                        <span className='info-warn'>避免账户被盗</span>
                      </div>
                  }
                </Col>
                <Col className='base-info-content-change'>
<<<<<<< HEAD
                  {/* <Button className='base-info-content-btn' onClick={() => this.changeState('changeMail')}>{this.state.changeMail ? '保存' : '修改'}</Button> */}
=======
                  <Button className='base-info-content-btn' onClick={() => this.changeState('changeMail')}>{this.state.changeMail ? '保存' : '修改'}</Button>
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
                  {/* <Button className='base-info-content-btn'>修改</Button> */}
                </Col>
              </Row>
              <Row className='base-info-content-top-row base-bottom'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>描述:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  <TextArea />
                </Col>
              </Row>
            </div>
        }
        {/* 修改厂商名称 */}
        {this.state.changeFirmName ? <ChangeFirmName
          visible={this.state.changeFirmName}
          hiddenModal={() => this.hiddenModal('changeFirmName')}
          getFirmList={this.getFrimList}
        /> : null}
        {/* 修改厂商描述 */}
        {this.state.changeFirmDescribe ? <ChangeFirmDescribe
          visible={this.state.changeFirmDescribe}
          hiddenModal={() => this.hiddenModal('changeFirmDescribe')}
          getFirmList={this.getFrimList}
        /> : null}
        {/* 修改厂商合同编号 */}
        {this.state.changeFirmContract ? <ChangeFirmContract
          visible={this.state.changeFirmContract}
          hiddenModal={() => this.hiddenModal('changeFirmContract')}
          getFirmList={this.getFrimList}
        /> : null}
        {/* 营业执照 */}
        {this.state.changeFirmLicense ? <ChangeFirmLicense
          visible={this.state.changeFirmLicense}
          hiddenModal={() => this.hiddenModal('changeFirmLicense')}
          getFirmList={this.getFrimList}
        /> : null}
        {/* 营业执照图片 */}
        {this.state.lookFirmLicense ? <LookFirmLicense
          visible={this.state.lookFirmLicense}
          hiddenModal={() => this.hiddenModal('lookFirmLicense')}
          licensePhoto={this.state.licensePhoto}
        /> : null}
        {this.state.changePhoneVisible ? <ChangePhoneNumber
          visible={this.state.changePhoneVisible}
          hiddenModal={() => this.hiddenModal('changePhoneVisible')}
        /> : null}
<<<<<<< HEAD
=======
        <NewUserInfo visible={this.state.newInfoVisible}
          onOk={this.onOk}
        />
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
      </div>
    )
  }
}
export default BaseInfo
