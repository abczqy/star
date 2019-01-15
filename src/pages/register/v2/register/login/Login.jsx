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
const FormItem = Form.Item
const {
  Footer, Content
} = Layout

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code: ''
    }
  }
  componentWillMount () {
    this.getCode()
  }
  /** 登录 */
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        let inputCode = values.code
        const { code } = this.state
        if (inputCode === code) {
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
                  message.error('登录失败')
                }
              })
            } else {
              /** 登录失败 */
              message.error('登录失败')
            }
          })
        } else {
          message.warn('请输入正确的验证码')
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
  /** 获取验证码的随机数 **/
  getCode = () => {
    let arr = []
    for (let i = 0; i < 4; i++) {
      let num = Math.floor(Math.random() * 10)
      arr.push(num)
    }
    this.setState({
      code: arr.join('')
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { code } = this.state
    return (
      <Layout className='log-content'>
        <Content>
          <div>
            <Row>
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
                  <Row>
                    <Col span={6}>
                      <FormItem>
                        {getFieldDecorator('code', {
                          rules: [{required: true, message: '请输入验证码'}]
                        })(
                          <Input placeholder='验证码' className='hei-40' />
                        )
                        }
                      </FormItem>
                    </Col>
                    <Col span={10}>
                      <span className='codeSpan'>{ code }</span>
                      <a onClick={this.getCode}>切换</a>
                    </Col>
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
                  <Row className='mar-top-10'>
                    <Col span={8} offset={4}>
                      <span>客服电话：</span>
                      <span className='span-style'>010-5232714</span>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer className='content'>
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
