/**
 * 找回密码
 */
import React, { Component } from 'react'
import { Input, Form, Button, message } from 'antd'
import './ForgetPass.scss'
import PropTypes from 'prop-types'
import { BlankBar } from 'components/software-market'
import {axios} from '../../../../utils'
class ForgetPass extends Component {
  static propTypes = {
    form: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      checkpass: '最短8位，包含字母、数字或者英文符号至少两种',
      phoneCode: '', // 短信验证码
      count: 6, // 秒数初始化为60秒
      liked: true, // 文案默认为‘获取验证码‘
      phonereg: false,
      disabled: false,
      phoneNum: ''

    }
  }
  saveOrSubmit =(e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      /** 校验成功 */
      if (!err) {
        console.log('Received values of form: ', values)
        /** 比对验证码 */
        axios.get('/accountSecurity/ ')
          .then(function (res) {
            console.log(res)
          })
        /** 获取验证码比对 */
        if (values.maf_phone_con === '123456') {
          // 修改代码
          const params = {
            password: values.maf_pwd,
            phone: values.maf_phone
          }
          console.log(params)
          axios.post('/accountSecurity ', params, (response) => {
            this.setState({
              registerVisible: true,
              accountSucc: response.data.maf_id
            })
          })
          message.success('修改成功')
        } else {
          message.success('验证码错误')
        }
      }
    })
  }
  componentDidMount () {
  // console.log(webStorage)
  }
  getPhoneCode =(e) => {
  // console.log(this.state.phonereg)
    if (!this.state.phonereg) {
      message.success('请输入手机号码')
    } else {
      // liked is false 的时候，不允许再点击
      if (!this.state.liked) {
        return
      } else {
        let count = this.state.count
        console.log(count)
        this.setState({
          disabled: true
        })
        const timer = setInterval(() => {
          this.setState({
            liked: false,
            count: (count--)
          }, () => {
            if (count < 0) {
              clearInterval(timer)
              this.setState({
                liked: true,
                count: 6,
                disabled: false
              })
            }
          }
          )
        }, 1000)
      }
      // 发送验证码，成功后
      if (this.state.phonereg) {
        console.log('phoneNum' + this.state.phoneNum)
        // eslint-disable-next-line no-undef
        axios.get('/accountSecurity/sendSecurityPhoneValid/' + this.state.phoneNum)
          .then(function (res) {
            console.log(res)
          })
      }
      console.log(e)
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
    console.log(value.length)
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
      <div className='software-wrap'>
        <div className='search-bar-wrap'>
          <span className='titlefont'>找回账号密码</span>
          <BlankBar />
        </div>
        <div className='divbody'>
          <Form onSubmit={this.saveOrSubmit}>
            <Form.Item
              className='Form_Item'
              hasFeedback
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
              className='Formcode_Item'
              hasFeedback
            >
              {getFieldDecorator('maf_phone_con', {
                rules: [{required: true, message: '请输入验证码'}, {
                  validator: this.validatePhoneCode
                }]
              })(
                <Input type='text' className='code_input' placeholder='请输入验证码' />
              ) }
            </Form.Item>
            <Button className='buttonfont' onClick={(e) => this.getPhoneCode(e)} disabled={this.state.disabled}>
              {
                this.state.liked ? <span>获取验证码</span> : <span className='count_second'>
                  {this.state.count + 's'}
                </span>
              }
            </Button>

            <Form.Item
              className='Form_Item'
              hasFeedback
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
            <Form.Item>
              <Button key='save' className='rereg-btn' htmlType='submit'>确认</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(ForgetPass)
