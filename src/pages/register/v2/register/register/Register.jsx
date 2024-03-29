/**
 * 用户注册
 */
import React, { Component, Fragment } from 'react'
import {
  Select,
  Form,
  Input,
  Button,
  message,
  Checkbox
} from 'antd'
import './Register.scss'
import PropTypes from 'prop-types'
import {setCookie, getCookie} from 'utils/cookie'
import {SMSVerificationv2, registerParent, registerFree} from 'services/topbar-mation'
import {axios} from '../../../../../utils'
import config from '../../../../../config'
const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_AUTHENTICATION = config.SERVICE_AUTHENTICATION
const FormItem = Form.Item
const Option = Select.Option

// let start = 120
// let count = 0
class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      parentCodeText: '获取验证码',
      captchaBtnText: '获取邀请码',
      validateCodeFlag: true,
      validateParentCodeFlag: true,
      validateParentPhoneFlag: false,
      validatePhoneFlag: false,
      code: {},
      codeValue: '',
      codeMessage: '',
      getImgCode: true,
      imgText: '',
      isParent: false
    }
  }
  componentDidMount () {
    const countdown = getCookie('secondsremained') ? getCookie('secondsremained') : 0 // 获取cookie值
    if (countdown !== undefined && countdown > 0) {
      this.settime()// 开始倒计时
    }
    const countdownss = getCookie('secondsremainedss') ? getCookie('secondsremainedss') : 0 // 获取cookie值
    if (countdownss !== undefined && countdownss > 0) {
      this.settimess()// 开始倒计时
    }
    this.getCodeFromBackground(false)
  }
  /** 提交表单 */
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const param = this.props.form.getFieldsValue()
        const { isParent } = this.state
        if (isParent) {
          registerParent(param, (response) => {
            if (response.data.code === 200) {
              message.success('家长注册成功，等待审核')
              this.props.history.push({
                pathname: '/login'
              })
            } else {
              message.error(response.data.msg)
            }
          })
          /** 注册成功
           message.success('注册成功')
           this.props.history.push({
          pathname: '/operate-manage-home/work-plat/login'
        }) */
        } else {
          registerFree(param, (res) => {
            if (res.data.code === 200) {
              message.success('用户注册成功')
              this.props.history.push({
                pathname: '/login'
              })
            } else {
              message.error(res.data.msg)
            }
          })
        }
      }
    })
  }
  /** 获取邀请码 */
  getCode = () => {
    if (this.state.captchaBtnText === '获取邀请码' && this.state.validateCodeFlag) {
      if (this.state.validatePhoneFlag) {
        this.setState({
          validateCodeFlag: false
        })
        setCookie('secondsremained', 60, 60)
        this.settime()
        SMSVerificationv2({
          'phone': this.props.form.getFieldValue('mainParentPhone')
        }, (response) => {
          if (response.status === 200) {
            message.success('获取邀请码成功')
          } else {
            message.error('获取邀请码失败')
          }
        })
      } else {
        this.props.form.validateFields(['mainParentPhone'])
      }
    }
  }
  /** 邀请码倒计时 */
  settime = () => {
    let countdown = 60
    // @ts-ignore
    countdown = getCookie('secondsremained')
    const timer = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(timer)
        this.setState({
          captchaBtnText: '获取邀请码',
          validateCodeFlag: true
        })
      } else {
        this.setState({
          captchaBtnText: `(${countdown}s)后获取`,
          validateCodeFlag: false
        })
        countdown--
      }
      setCookie('secondsremained', countdown, countdown + 1)
    }, 1000)
  }
  /** 获取验证码 */
  getParentCode = () => {
    const { codeValue, codeMessage } = this.state
    if (codeValue && codeMessage === '验证成功') {
      if (this.state.parentCodeText === '获取验证码' && this.state.validateParentCodeFlag) {
        if (this.state.validateParentPhoneFlag) {
          this.setState({
            validateParentCodeFlag: false
          })
          setCookie('secondsremainedss', 60, 60)
          this.settimess()
          SMSVerificationv2({
            'phone': this.props.form.getFieldValue('parentPhone')
          }, (response) => {
            if (response.status === 200) {
              message.success('获取验证码成功')
            } else {
              message.error('获取验证码失败')
            }
          })
        } else {
          this.props.form.validateFields(['parentPhone'])
        }
      }
    } else {
      message.warn('请先输入验证码再获取手机验证码！')
    }
  }
  /** 验证码倒计时 */
  settimess = () => {
    let countdown = 60
    // @ts-ignore
    countdown = getCookie('secondsremainedss')
    const timer = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(timer)
        this.setState({
          parentCodeText: '获取验证码',
          validateParentCodeFlag: true
        })
      } else {
        this.setState({
          parentCodeText: `(${countdown}s)后获取`,
          validateParentCodeFlag: false
        })
        countdown--
      }
      setCookie('secondsremainedss', countdown, countdown + 1)
    }, 1000)
  }
  /** 计时器 **/
  setTime = () => {
    let count = 120
    const timer = setInterval(() => {
      if (count <= 0) {
        clearInterval(timer)
        this.setState({
          getImgCode: true
        })
      } else {
        this.setState({
          imgText: '请' + count + '秒后再试'
        })
      }
      count--
    }, 1000)
  }
  /** 校验身份证 */
  validateCard = (rule, value, callback) => {
    if (!value) {
      callback()
    } else {
      const cardreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (!cardreg.test(value)) {
        const res = '身份证号格式不正确'
        callback(res)
      } else {
        callback()
      }
    }
  }
  /** 校验手机号 */
  validatePhone = (rule, value, callback) => {
    if (!value) {
      this.setState({
        validatePhoneFlag: false
      })
      callback()
    } else {
      const phonereg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!phonereg.test(value)) {
        this.setState({
          validatePhoneFlag: false
        })
        const res = '手机号格式不正确'
        callback(res)
      } else {
        this.setState({
          validatePhoneFlag: true
        })
        callback()
      }
    }
  }
  validateParentPhone = (rule, value, callback) => {
    if (!value) {
      this.setState({
        validateParentPhoneFlag: false
      })
      callback()
    } else {
      const phonereg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!phonereg.test(value)) {
        this.setState({
          validateParentPhoneFlag: false
        })
        const res = '手机号格式不正确'
        callback(res)
      } else {
        this.setState({
          validateParentPhoneFlag: true
        })
        callback()
      }
    }
  }
  /** 校验是否同意 */
  validateCheck = (rule, value, callback) => {
    if (value) {
      callback()
    } else {
      const res = '请同意'
      callback(res)
    }
  }
  /** 校验两次密码是否一致 */
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      const res = '两次密码输入不一致'
      callback(res)
    } else {
      callback()
    }
  }

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
  // 获取后台提供的验证码
  getCodeFromBackground (value) {
    if (value) {
      const {getImgCode} = this.state
      if (getImgCode) {
        axios.get(API_BASE_URL_V2 + SERVICE_AUTHENTICATION + '/authentication/generator')
          .then((res) => {
            this.setState({
              getImgCode: false
            })
            this.setTime()
            if (res.data.code === 200) {
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
    } else {
      axios.get(API_BASE_URL_V2 + SERVICE_AUTHENTICATION + '/authentication/generator')
        .then((res) => {
          if (res.data.code === 200) {
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
  }
  // 点击图片刷新验证码
  onClick = () => {
    const {getImgCode, imgText} = this.state
    if (getImgCode) {
      this.getCodeFromBackground(true)
    } else {
      message.warn(imgText)
    }
  }
  // input失去焦点事件
  inputOnblur = (e) => {
    const {code} = this.state
    console.log(code)
    const {value} = e.target
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
          message.warn('错误或验证码失效，请点击图片获取新的验证码')
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
  render () {
    const { getFieldDecorator } = this.props.form
    const { code } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
      }
    }
    return (
      <div className='reg-bg'>
        <div className='reg-content'>
          <span className='title'>用户注册</span>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label='账号'
              className='mar-top-3 err-css-in'
              hasFeedback
            >
              {getFieldDecorator('account', {
                rules: [{
                  type: 'email', message: '请输入有效的邮箱地址'
                }, {
                  required: true, message: '请输入邮箱地址'
                }]
              })(
                <Input className='input-size' placeholder='请输入邮箱地址' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='设置密码'
              className='err-css-in'
              hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入6-16位登录密码' }, {
                  validator: this.validateToNextPassword
                }]
              })(
                <Input placeholder='请输入6-16位登录密码' className='input-size' type='password' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='确认密码'
              className='err-css-in'
              hasFeedback
            >
              {getFieldDecorator('confirm', {
                rules: [{ required: true, message: '请再次输入您的密码' }, {
                  validator: this.compareToFirstPassword
                }]
              })(
                <Input placeholder='请再次输入您的密码' className='input-size' type='password' onBlur={this.handleConfirmBlur} />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='姓名'
            >
              {getFieldDecorator('parentName')(
                <Input placeholder='请输入姓名' className='input-size' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              className='err-css-small-in'
              label='验证码'
            >
              {
                getFieldDecorator('textCode', {
                  relues: [{
                    required: true, message: '请输入验证码'
                  }]
                })(
                  <Input onBlur={this.inputOnblur} placeholder='请输入验证码' className='input-size-code' />
                )
              }
              <img onClick={this.onClick} src={`data:image/jpeg;base64,${code.images}`} alt='验证码' />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='电话'
              className='err-css-small-in'
              hasFeedback
            >
              {getFieldDecorator('parentPhone', {
                rules: [ {
                  validator: this.validateParentPhone
                }, {
                  required: true, message: '请输入电话'
                }]
              })(
                <Input placeholder='请输入电话' className='input-size-small' />
              )}
              <Button className='get-btn' onClick={this.getParentCode}>{this.state.parentCodeText}</Button>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='短信验证码'
              className='err-css-in'
              hasFeedback
            >
              {getFieldDecorator('parentPhoneValid', {
                rules: [{ required: true, message: '请输入验证码' }]
              })(
                <Input placeholder='请输入验证码' className='input-size' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='身份证号'
              className='err-css-in'
              hasFeedback
            >
              {getFieldDecorator('parentNum', {
                rules: [{ required: true, message: '请输入家长身份证号' }, {
                  validator: this.validateCard
                }]
              })(
                <Input placeholder='请输入家长身份证号' className='input-size' />
              )}
            </FormItem>
            <div className='ant-row ant-form-item err-css-in'>
              <div className='form-change ant-col-xs-24 ant-col-sm-5'>
                <Checkbox onChange={(e) => this.setState({isParent: e.target.checked})} style={{paddingRight: 0}}>家长注册</Checkbox>
              </div>
            </div>
            {this.state.isParent ? <Fragment>
              <FormItem
                {...formItemLayout}
                label='与学生关系'
                className='err-css-in'
                hasFeedback
              >
                {getFieldDecorator('relationship', {
                  rules: [{ required: true, message: '请选择与学生关系' }]
                })(
                  <Select className='input-size' placeholder='请选择与学生关系'>
                    <Option value='1'>父亲</Option>
                    <Option value='2'>母亲</Option>
                    <Option value='3'>祖父母</Option>
                    <Option value='4'>外祖父母</Option>
                    <Option value='5'>亲属</Option>
                    <Option value='6'>其他</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='学生账号'
                className='err-css-in'
                hasFeedback
              >
                {getFieldDecorator('studentAccount', {
                  rules: [{ required: true, message: '请输入学生账号' }]
                })(
                  <Input placeholder='请输入学生账号' className='input-size' />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='主家长电话'
                className='err-css-small-in'
                hasFeedback
              >
                {getFieldDecorator('mainParentPhone', {
                  rules: [ {
                    validator: this.validatePhone
                  }, {
                    required: true, message: '请输入主家长电话'
                  }]
                })(
                  <Input placeholder='请输入主家长电话' className='input-size-small' />
                )}
                <Button className='get-btn' onClick={this.getCode}>{this.state.captchaBtnText}</Button>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label='主家长邀请码'
                className='err-css-in'
                hasFeedback
              >
                {getFieldDecorator('mainParentPhoneValid', {
                  rules: [{ required: true, message: '请输入主家长邀请码' }]
                })(
                  <Input placeholder='请输入主家长邀请码' className='input-size' />
                )}
              </FormItem>
            </Fragment> : null}
            <FormItem className='ml21'>
              {getFieldDecorator('Checkbox', {
                rules: [{validator: this.validateCheck}]
              })(
                <Checkbox>我同意并遵守 <a href='www.baidu.com'>《福建教育信息化公共服务平台服务协议》</a></Checkbox>
              )}
            </FormItem>
            <FormItem>
              <Button type='primary' htmlType='submit' className='reg-btn mar-top-3'>立即注册</Button>
            </FormItem>
          </Form>
        </div>
      </div >
    )
  }
}

Register.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object.isRequired
}

export default Form.create()(Register)
