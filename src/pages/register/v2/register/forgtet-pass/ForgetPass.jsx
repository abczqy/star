/**
 * 找回密码
 */
import React, { Component } from 'react'
import { Input, Form, Button, message } from 'antd'
import './ForgetPass.scss'
import PropTypes from 'prop-types'
import { SMSVerificationv2, Verificationv2, updataPasswordv2 } from 'services/topbar-mation'
import {axios} from 'utils'
class ForgetPass extends Component {
  static propTypes = {
    form: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      checkpass: '最短8位，包含字母、数字或者英文符号至少两种',
      phoneCode: '', // 短信验证码
      count: 60, // 秒数初始化为60秒
      liked: true, // 文案默认为‘获取验证码‘
      phonereg: false,
      phoneNum: '',
      falg: true,
      disabled: false,
      safeCode: ''
    }
  }
  saveOrSubmit =(e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      /** 校验成功 */
      if (!err) {
        /** 比对验证码 */
        Verificationv2({
          phone: values.maf_phone,
          valid: values.maf_phone_con
        }, (response) => {
          if (response.status === 200) {
            // message.success('验证成功')
            // console.log(response.data.data)
            this.setState({
              safeCode: response.data.data
            })
            updataPasswordv2({
              phone: values.maf_phone,
              password: values.maf_pwd,
              code: this.state.safeCode
            }, (response) => {
              if (response.data.code === 200) {
                message.success('修改成功')
                /** 跳转至首页 */
                this.props.history.push({
                  pathname: '/login'
                })
              } else {
                message.success('修改失败')
              }
            })
          } else {
            message.success('手机验证码错误')
          }
        })
      }
    })
  }
  componentDidMount () {
  // console.log(webStorage)
  }
  getPhoneCode =(e) => {
  // console.log(this.state.phonereg)
    this.setState({
      disabled: true
    })
    if (!this.state.phonereg) {
      message.success('请输入手机号码')
      this.setState({
        disabled: false
      })
    } else {
      // liked is false 的时候，不允许再点击
      if (!this.state.liked) {
        return
      } else {
        let count = this.state.count
        const timer = setInterval(() => {
          this.setState({
            liked: false,
            count: (count--),
            disabled: true
          }, () => {
            if (count < 0) {
              clearInterval(timer)
              this.setState({
                liked: true,
                count: 60,
                disabled: false
              })
            }
          }
          )
        }, 1000)
      }
      // 发送验证码，成功后
      if (this.state.phonereg) {
        // 获取验证码
        SMSVerificationv2({
          phone: this.state.phoneNum
        }, (response) => {
          if (response.status === 200) {
            message.success('已发送验证码')
          } else {
            message.success('发送验证码')
          }
        })
      }
    }
  }
  // 获取验证码接口

  getRegisterAgreement (params, sucFn) {
    return axios.get('/accountSecurity/sendSecurityPhoneValid/', {...params})
      .then(function (res) {
        sucFn(res)
      })
  }
  // 校验手机号
    validatePhone = (rule, value, callback) => {
      if (!value) {
        this.setState({
          phonereg: false,
          phoneNum: value
        })
        callback()
      } else {
        const phonereg = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!phonereg.test(value)) {
          this.setState({
            phonereg: false,
            phoneNum: value
          })
          const res = '手机号格式不正确'
          callback(res)
        } else {
          this.setState({
            phonereg: true,
            phoneNum: value
          })
          callback()
        }
      }
    }
    // 校验密码
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value) {
      if (value.length >= 6 && value.length <= 16) {
        if (this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback()
      } else {
        const res = '请输入6-16位登录密码'
        callback(res)
      }
    } else {
      callback()
    }
  }

  // 验证码校验
  validatePhoneCode = (rule, value, callback) => {
    const form = this.props.form
    if (value) {
      if (value.length > 0) {
        if (this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback()
      } else {
        const res = '请输入验证码'
        callback(res)
      }
    } else {
      callback()
    }
  }
  render () {
    const {getFieldDecorator} = this.props.form
    return (
      <div className='forget-div'>
        <div className='forget-top'>
          <img src={require('../../../../../assets/images/login-home/log_2.png')} className='img-css' />
          <span className='font-head' >福建教育信息化公共服务平台</span>
        </div>
        <div className='forger-content'>
          <div className='forger-content-title'>
            <div className='titlefont'>找回账号密码</div>
          </div>
          <div className='forger-content-body'>
            <Form onSubmit={this.saveOrSubmit}>
              <Form.Item
                className='Form_Item'
              >
                {getFieldDecorator('maf_phone', {
                  rules: [{required: true, message: '请输入正确手机号码'}, {
                    validator: this.validatePhone
                  }]
                })(
                  <Input className='input' placeholder='请输入手机号' />
                )}
              </Form.Item>
              <Form.Item
                className='Form_Item'
              >
                {getFieldDecorator('maf_phone_con', {
                  rules: [{required: true, message: '请输入验证码'}, {
                    validator: this.validatePhoneCode
                  }]
                })(
                  <Input type='text' className='code_input' placeholder='请输入验证码' />
                ) }
                {
                  this.state.liked ? <a className='a-code' disabled={this.state.disabled} onClick={(e) => this.getPhoneCode(e)}>获取验证码</a> : <a className='a-code' >
                    {this.state.count + 's后获取'}
                  </a>
                }
              </Form.Item>
              <Form.Item
                className='Form_Item'
              >
                {getFieldDecorator('maf_pwd', {
                  rules: [{
                    required: true, message: '请输入密码 '}, {
                    validator: this.validateToNextPassword
                  }]
                })(
                  <Input placeholder='请输入密码' type='password' className='input' />
                )}
              </Form.Item>
              <Form.Item className='form-foot'>
                <Button key='save' className='rereg-btn' htmlType='submit'>立即验证</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
ForgetPass.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object
}
export default Form.create()(ForgetPass)
