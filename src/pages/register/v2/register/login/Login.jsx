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
  message
} from 'antd'
import webStorage from 'webStorage'
import PropTypes from 'prop-types'
import './Login.scss'
import {getUserInfoV2, loginNew} from 'services/portal'
import {axios} from 'utils'
import config from '../../../../../config'
const FormItem = Form.Item
const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_AUTHENTICATION = config.SERVICE_AUTHENTICATION
const {
  Footer, Content
} = Layout

let start = 120
let count = 0
class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: {},
      btnClick: false,
      codeValue: '',
      codeMessage: ''
    }
  }
  componentWillMount () {
    this.getCode(false)
  }
  componentWillUnmount () {
    clearTimeout(count)
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
                        message.success('登录成功')
                        if (roleCode === 'operator') {
                          this.props.history.push({
                            pathname: '/software-market-home'
                          })
                        } else {
                          // 跳到首次登录
                          // if (!response.data.data.LoginCounts || response.data.data.LoginCounts === 0) {
                          //   this.props.history.push({
                          //     pathname: '/first-login'
                          //   })
                          // } else {
                          this.props.history.push({
                            pathname: '/home/index'
                          })
                          // }
                        }
                      } else {
                        /** 登录失败 */
<<<<<<< HEAD
                        message.error('登录失败')
=======
                        message.error(response.data.msg)
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
                      }
                    })
                  } else {
                    /** 登录失败 */
<<<<<<< HEAD
                    message.error('登录失败')
=======
                    message.error(response.data.msg)
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
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
      count = setInterval(this.countDown, 1000)
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
        console.log(res)
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
    start--
    if (start > 0) {
      document.getElementById('btnCode').innerHTML = `验证码(${start})`
      document.getElementById('btnCode').disabled = true
    } else {
      clearTimeout(count)
      document.getElementById('btnCode').innerHTML = '获取验证码'
      document.getElementById('btnCode').disabled = false
      return ''
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { code } = this.state
    return (
      <Layout className='log-content'>
        <Content>
          <div>
<<<<<<< HEAD
            <Row>
=======
            <Row style={{background: '#fff'}}>
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
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
                      <Button id='btnCode' type='primary' onClick={this.btnGetCdode}>获取验证码</Button>
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
<<<<<<< HEAD
        <Footer className='content'>
=======
        <Footer style={{background: '#fff'}} className='content'>
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
          <div className='div-foot-span'>
            <p>福建省教育厅主办 技术运营支持： 福建省星云大数据应用服务有限公司</p>
            <p>Copyright©2016 www.fjedu.cn All rights reserved     闽ICP备17018531号-2</p>
          </div>
        </Footer>
      </Layout>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object
}

export default Form.create()(Login)
