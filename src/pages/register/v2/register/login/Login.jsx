/**
 * 登录
 */
import React, { Component } from 'react'
import {
  Icon,
  Layout,
  Form,
  Input,
  Button,
  Row, Col,
  message,
  Modal
} from 'antd'
import webStorage from 'webStorage'
import PropTypes from 'prop-types'
import './Login.scss'
import {getUserInfoV2, loginNew} from 'services/portal'
import {axios} from 'utils'
import config from '../../../../../config'
import Buffer from 'buffer'
const FormItem = Form.Item
const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_AUTHENTICATION = config.SERVICE_AUTHENTICATION
const {
  Footer, Content
} = Layout

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: {},
      btnClick: false,
      codeValue: '',
      codeMessage: '',
      showModal: false,
      ruleCode: '',
      isFirstLogin: '',
      passModal: false,
      pwd1: '',
      pwd2: '',
      studentInfo: {}
    }
  }
  componentWillMount () {
    this.getCode(false)
  }
  componentWillUnmount () {
  }

  // base64解码
  b64EncodeUnicode (str) {
    let arr = str.split('.')
    let buf = Buffer.Buffer.alloc(300)
    let len = buf.write(arr[1], 'base64')
    let decryptedTicket = buf.toString('utf8').trim().substring(0, len)
    let data = JSON.parse(decryptedTicket)
    console.log(data)
    let rule = data.userType
    let isFirstLogin = data.isFirstLogin
    this.setState({
      ruleCode: rule
    })
    let result = {
      rule: rule,
      isFistLogin: isFirstLogin
    }
    return result
    // let string = buf.toString(str)
    // console.log(string)
  }
  /** 登录 */
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 检测验证码
        if (values.code) {
          const {code} = this.state
          axios.get(API_BASE_URL_V2 + SERVICE_AUTHENTICATION + '/authentication/verify', {
            params: {
              input_code: values.code,
              verify_code: code.verify_code,
              generator_date: code.generator_date
            }
          })
            .then((res) => {
              if (res.data.code === 500) {
                message.warn(res.data.data)
              } else if (res.data.code === 200) {
                const identifier = this.props.form.getFieldValue('username')
                const password = this.props.form.getFieldValue('password')
                loginNew({
                  'authType': 0,
                  'identifier': identifier,
                  'password': password,
                  'ticketReceiveUrl': 'http://www.mysite.com/authentication/ticket',
                  'extraInfo': ''
                }, (response) => {
                  let data1 = response.data
                  console.log(data1)
                  if (data1.code === 200) {
                    /** ticket userId */
                    let userId
                    let roleCode
                    if (data1.data.ticket) {
                      webStorage.setItem('STAR_V2_TICKET', data1.data.ticket)
                      const arr = data1.data.ticket.split('.')
                      if (arr.length > 1) {
                        userId = JSON.parse(window.atob(arr[1])).userId
                        webStorage.setItem('STAR_V2_USERID', userId)
                        roleCode = JSON.parse(window.atob(arr[1])).ruleCode
                        webStorage.setItem('STAR_WEB_ROLE_CODE', roleCode)
                      }
                    }
                    getUserInfoV2(userId, (response) => {
                      if (response.data.code === 200) {
                        webStorage.setItem('STAR_WEB_PERSON_INFO', response.data.data)
                        webStorage.setItem('STAR_WEB_IS_LOGGED', true)
                        let isFristLogin = this.b64EncodeUnicode(data1.data.ticket)
                        console.log(isFristLogin)
                        if (isFristLogin.isFistLogin === 0 && isFristLogin.rule === 1) {
                          // 请求详细数据
                          axios.get(API_BASE_URL_V2 + SERVICE_AUTHENTICATION + '/users/detailed/' + response.data.data.userId)
                            .then((res) => {
                              console.log(res.data.data)
                              this.setState({
                                studentInfo: res.data.data
                              })
                            })
                          this.showTheModal()
                        } else if (isFristLogin.isFistLogin === 0 && (isFristLogin.rule === 2 || isFristLogin.rule === 5)) {
                          this.showPassModal()
                        } else {
                          message.success('登录成功')
                          // let first = response.data.data
                          if (roleCode === 'operator') {
                            this.props.history.push({
                              pathname: '/software-market-home'
                            })
                          } else {
                            this.props.history.push({
                              pathname: '/home/index'
                            })
                          }
                        }
                      } else {
                        /** 登录失败 */
                        message.error(response.data.msg)
                      }
                    })
                  } else {
                    /** 登录失败 */
                    message.error(response.data.msg)
                  }
                })
              }
            })
        }
      }
    })
  }
  /** 跳转到找回密码 */
  toFindPassWord = (e) => {
    this.props.history.push({
      pathname: '/forget-home'
    })
  }
  /** 跳转到注册 */
  toRegister = (e) => {
    this.props.history.push({
      pathname: '/register-home'
    })
  }
  /** 获取验证码 **/
  getCode = (isClick) => {
    if (isClick === true) {
      this.countDown()
    }
    axios.get(API_BASE_URL_V2 + SERVICE_AUTHENTICATION + '/authentication/generator', {})
      .then((res) => {
        if (res.data.data.status === 'success') {
          let response = {
            generator_date: res.data.data.generator_date,
            images: res.data.data.images,
            verify_code: res.data.data.verify_code
          }
          this.setState({
            code: response
          })
        }
      })
  }
  // 点击获取验证码
  btnGetCdode = () => {
    this.getCode(true)
  }
  // input失去焦点事件
  inputOnblur = (e) => {
    const {value} = e.target
    this.checkOut(value)
  }
  // 检测验证码事件
  checkOut (value) {
    const {code} = this.state
    axios.get(API_BASE_URL_V2 + SERVICE_AUTHENTICATION + '/authentication/verify', {
      params: {
        input_code: value,
        verify_code: code.verify_code,
        generator_date: code.generator_date
      }
    })
      .then((res) => {
        if (res.data.code === 500) {
          message.warn(res.data.data)
        }
        if (res.data.code === 200) {
          this.setState({
            codeValue: value,
            codeMessage: res.data.data
          })
          message.success(res.data.data)
        }
      })
  }
  countDown () {
    let count = 60
    const timer = setInterval(() => {
      if (count > 0) {
        document.getElementById('btnCode').innerHTML = `等待刷新 (${count})`
        document.getElementById('btnCode').disabled = true
      } else {
        clearTimeout(timer)
        document.getElementById('btnCode').innerHTML = '刷新'
        document.getElementById('btnCode').disabled = false
        return ''
      }
      count--
    }, 1000)
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { code } = this.state
    return (
      <Layout className='log-content'>
        <Content>
          <div>
            <Row style={{background: '#fff'}}>
              <Col span={14}>
                <img src={require('../../../../../assets/images/login-home/log_1.jpg')} className='wid-100' />
              </Col>
              <Col span={9} offset={1}>
                <Row className='mar-top-25'>
                  <Col span={5}>
                    <img src={require('../../../../../assets/images/login-home/log_2.png')} className='wid-70' />
                  </Col>
                  <Col span={19}>
                    <span className='font-head' >福建教育信息化公共服务平台</span>
                  </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                  <Row className='mar-top-19'>
                    <FormItem>
                      {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入账户' }]
                      })(
                        <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='账户' className='wid-50 hei-40' />
                      )}
                    </FormItem>
                  </Row>
                  <Row>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }]
                      })(
                        <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' className='wid-50 hei-40' />
                      )}
                    </FormItem>
                  </Row>
                  <Row style={{marginBottom: '5px'}}>
                    <Col span={6}>
                      <img src={`data:image/jpeg;base64,${code.images}`} alt='二维码' />
                    </Col>
                    <Col span={5} offset={1}>
                      <Button id='btnCode' type='primary' onClick={this.btnGetCdode}>刷新</Button>
                    </Col>
                  </Row>
                  <Row>
                    <FormItem>
                      {getFieldDecorator('code', {
                        rules: [{required: true, message: '请输入验证码'}]
                      })(
                        <Input placeholder='验证码' className='wid-50 hei-40' />
                      )
                      }
                    </FormItem>
                  </Row>
                  <Row >
                    <a className='a-code ml36' onClick={this.toRegister}>注册</a>
                    <a className='a-code' onClick={this.toFindPassWord}>忘记密码</a>
                  </Row>
                  <Row className='mar-top-4'>
                    <Button type='primary' htmlType='submit' className='wid-50 hei-40'>
                      登录
                    </Button>
                  </Row>
                  {/* <Row className='mar-top-10'> */}
                  {/* < Col span={8} offset={4}> */}
                  {/* <span>客服电话：</span> */}
                  {/* <span className='span-style'>010-5232714</span> */}
                  {/* </Col> */}
                  {/* </Row> */}
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
        <Modal
          title='确认信息'
          visible={this.state.showModal}
          onOk={this.onOk}
          // onCancel={this.onCancle}
          footer={[
            <Button key='error' type='primary' style={{background: 'red', border: 'none'}} onClick={this.onError}>信息有误</Button>,
            <Button key='makesure' type='primary' onClick={this.onOk}>确定</Button>
          ]}
        >
          <div>
            <Row className='rowStyle'>
              <Col span={4}>学生姓名：</Col>
              <Col span={8}>{this.state.studentInfo.userName || '无'}</Col>
              <Col span={3}>性别：</Col>
              <Col span={8}>{this.state.studentInfo.gender === '1' ? '男' : '女'}</Col>
            </Row>
            <Row className='rowStyle'>
              <Col span={4}>身份证号：</Col>
              <Col span={8}>{this.state.studentInfo.certificateNumber || '无'}</Col>
              {/* <Col span={4}>出生日期：</Col> */}
              {/* <Col span={8}>无</Col> */}
              <Col span={3}>学校：</Col>
              <Col span={8}>无</Col>
            </Row>
            {/* <Row className='rowStyle'> */}
            {/* <Col span={3}>年级：</Col> */}
            {/* <Col span={8}>无</Col> */}
            {/* </Row> */}
          </div>
        </Modal>
        <Modal
          visible={this.state.passModal}
          onOk={this.changePass}
          footer={[
            <Button type='primary' onClick={this.changePass}>确认</Button>
          ]}
        >
          <div>
            <Row className='rowStyle'><span style={{color: 'red'}}>*</span>请输入新密码:</Row>
            <Row className='rowStyle'>
              <Input onChange={this.changePwd1} key='pwd1' value={this.state.pwd1} type='password' placeholder='请输入新的6-16位登录密码' />
            </Row>
            <Row className='rowStyle'>
              <Input onChange={this.changePwd2} key='pwd2' value={this.state.pwd2} type='password' placeholder='请确认一遍您的密码' />
            </Row>
          </div>
        </Modal>
        <Footer style={{background: '#fff'}} className='content'>
          <div className='div-foot-span'>
            <p>技术运营支持： 福建省星云大数据应用服务有限公司</p>
            <p>Copyright©2016 www.fjedu.cn All rights reserved     闽ICP备17018531号-2</p>
          </div>
        </Footer>
      </Layout>
    )
  }
  changePwd1 = (e) => {
    const {value} = e.target
    this.setState({
      pwd1: value
    })
  }
  changePwd2 = (e) => {
    const {value} = e.target
    this.setState({
      pwd2: value
    })
  }
  onOk = () => {
    this.setState({
      showModal: false
    })
    axios({
      method: 'PATCH',
      url: API_BASE_URL_V2 + SERVICE_AUTHENTICATION + '/users/info/correction',
      headers: {
        'Content-Type': 'application/json'
      },
      data: true
    }).then((res) => {
      console.log(res)
      if (res.data && res.data.code !== 200) {
        webStorage.clear()
        this.props.history.goBack()
      } else {
        this.props.history.push({
          pathname: '/home/index'
        })
      }
    })
  }
  onError = () => {
    this.setState({
      showModal: false
    })
    webStorage.removeItem('STAR_V2_TICKET')
    webStorage.removeItem('STAR_V2_USERID')
    webStorage.removeItem('STAR_WEB_IS_LOGGED')
    webStorage.removeItem('STAR_WEB_PERSON_INFO')
    webStorage.removeItem('STAR_WEB_ROLE_CODE')
    this.props.history.push({
      pathname: '/login'
    })
  }
  onCancle = () => {
    this.setState({
      showModal: false
    })
  }
  showTheModal = () => {
    this.setState({
      showModal: true
    })
  }
  showPassModal = () => {
    this.setState({
      passModal: true
    })
  }
  changePass = () => {
    const {pwd1, pwd2} = this.state
    if (pwd1 === '' || pwd2 === '') {
      message.warn('请重置您的密码')
      return
    } else if (pwd1 !== pwd2) {
      message.warn('两次输入的密码不正确！')
      return
    } else if (pwd1.length < 6 || pwd1.length > 12) {
      message.warn('密码必须长于6位！')
    }
    // let userId = webStorage.getItem('STAR_V2_USERID')
    axios({
      method: 'put',
      url: API_BASE_URL_V2 + SERVICE_AUTHENTICATION + '/users/password?password=' + pwd1
    })
      .then((res) => {
        if (res.data && res.data.code === 200) {
          axios({
            method: 'PATCH',
            url: API_BASE_URL_V2 + SERVICE_AUTHENTICATION + '/users/info/correction',
            headers: {
              'Content-Type': 'application/json'
            },
            data: true
          }).then((res) => {
            console.log(res)
            if (res.data && res.data.code !== 200) {
              webStorage.clear()
            }
          })
          this.props.history.push({
            pathname: '/home/index'
          })
        } else {
          message.warn('修改失败！')
        }
      })
    // this.props.history.push({
    //   pathname: '/home/index'
    // })
    // this.setState({
    //   passModal: false
    // })
  }
  cancle = () => {
    this.setState({
      passModal: false
    })
  }
}

Login.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object
}

export default Form.create()(Login)
