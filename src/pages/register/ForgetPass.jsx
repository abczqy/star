/* eslint-disable react/jsx-no-bind,no-useless-return,no-undef */
/* 忘记密码 */
import React from 'react'
import {Card, Layout, Form, Input, Button, message} from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import './register.scss'
import {forgetThePassword, SMSVerification} from '../../services/topbar-mation'
import BottomHeader from '../../components/common/BottomHeader'

class ForgetPass extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    form: PropTypes.object,
    history: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      checkpass: '最短8位，包含字母、数字或者英文符号至少两种',
      phonemsg: '请先输入验证码！',
      phoneCode: '' // 短信验证码
    }
  }
  componentDidMount () {
    this.setState({
      verifyCode: new GVerify('v_container')
    })
  }
  // 返回登录
  backHome (link) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    } else {
      this.props.history.push({
        pathname: link
      })
    }
  }
  // 账号
  accountNum=(value) => {
    if (value) {
      this.setState({
        checkemail_icon: true,
        checkemail: ''
      })
    } else {
      this.setState({
        checkemail_icon: false,
        checkemail: '账号不能为空！'
      })
    }
  }
  // 身份证
  handlStuIdonblur=(e) => {
    let value = e.target.value
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (reg.test(value)) {
      this.setState({
        stuidcard_icon: true,
        stuidcard: ''
      })
    } else {
      this.setState({
        stuidcard_icon: false,
        stuidcard: '身份证格式不正确！'
      })
    }
  }
  // 手机号
  handlPhoneonblur=(value) => {
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (reg.test(value)) {
      this.setState({
        phone_icon: true,
        phonemsg: ''
      })
      return true
    } else {
      this.setState({
        phone_icon: false,
        phonemsg: '手机号格式不正确！'
      })
      // eslint-disable-next-line no-trailing-spaces
      return
    }
  }
  // 获取手机验证码
  getPhoneCode=() => {
    const form = this.props.form
    let phoneNum = form.getFieldValue('maf_phone')
    // eslint-disable-next-line camelcase
    let maf_phone_con = form.getFieldValue('maf_phone_con')
    let account = form.getFieldValue('maf_loginid')
    this.handlPhonecodeonblur(maf_phone_con)
    if (account === '' || account === undefined) {
      this.setState({
        checkemail_icon: false,
        checkemail: '请先输入账号！'
      })
      return
    }
    if (this.handlPhoneonblur(phoneNum)) {
      console.log('获取验证码成功')
      this.getCode(account)
      this.setState({
        nextgetCode: !this.state.nextgetCode
      }, () => {
        if (this.state.nextgetCode) {
          var parent = document.getElementById('v_container')
          var child = document.getElementById('verifyCanvas')
          parent.removeChild(child)
          // form.setFieldsValue({maf_phone_con: ''})
          this.setState({
            verifyCode: new GVerify('v_container')
          })
        }
      })
      // form.setFieldsValue({maf_phone_con: ''})
    } else if (phoneNum === '' || phoneNum === undefined) {
      this.setState({
        phone_icon: false,
        phone_con_icon: false,
        phonemsg: '请输入手机号！'
      })
    }
  }
  // 获取验证码
  getCode=(account) => {
    SMSVerification({
      user_id: account
    }, (response) => {
      if (response.data === false) {
        message.error('账号不存在，或者手机未绑定！')
      } else {
        this.setState({
          phoneCode: response.data && response.data.toString()
        })
      }
    })
  }
  // 手机验证码
  handlPhonecheckonblur=(e) => {
    let value = e.target.value
    if (value !== '' && value !== undefined && value === this.state.phoneCode) {
      this.setState({
        phonecheck_icon: true,
        phonecheck: ''
      })
    } else {
      this.setState({
        phonecheck_icon: false,
        phonecheck: '请输入正确的短信验证码！'
      })
    }
  }
  // 验证码
  handlPhonecodeonblur=(value) => {
    let verifyCode = this.state.verifyCode
    if (value) {
      var res = verifyCode.validate(value)
      if (!res) {
        this.setState({
          phone_con_icon: false,
          phone_con: '验证码错误',
          phone_icon: false,
          getcode_btn: false,
          phonemsg: '请先输入验证码！'
        })
        return
      } else {
        this.setState({
          phone_con_icon: true,
          phone_con: '',
          getcode_btn: true,
          phonemsg: '',
          phone_icon: true
        })
      }
    } else {
      this.setState({
        phone_con_icon: false,
        phone_con: '请输入验证码'
      })
      return
    }
  }
  // 校验第二次密码
  validateToNextPassword = (e) => {
    let value = e.target.value
    const form = this.props.form
    let confirmvalue = form.getFieldValue('confirm')
    // eslint-disable-next-line
    let reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[~!@#$%^&*()_+`\-={}:";'<>?,.\/])|(?=.*?[A-Za-z])(?=.*?[~!@#$%^&*()_+`\-={}:";'<>?,.\/])).{8,16}$/
    if (value && value !== '' && value.trim() && reg.test(value)) {
      this.setState({
        checkpass_icon: true,
        checkpass: ''
      })
      if ((confirmvalue !== '' && confirmvalue !== undefined) && (value !== confirmvalue)) {
        this.setState({
          confirmpass_icon: false,
          checkconfirm: '你两次输入的密码不一致'
        })
      } else if ((confirmvalue !== '' && confirmvalue !== undefined) && (value === confirmvalue)) {
        this.setState({
          confirmpass_icon: true,
          checkconfirm: ''
        })
      }
    } else if ((value === '' || value === undefined || value) && (confirmvalue !== '' && confirmvalue !== undefined)) {
      this.setState({
        checkpass_icon: false,
        checkpass: '最短8位，包含字母、数字或者英文符号至少两种！',
        confirmpass_icon: false,
        checkconfirm: '你两次输入的密码不一致!'
      })
    } else if ((value === '' || value === undefined || value)) {
      this.setState({
        checkpass_icon: false,
        checkpass: '最短8位，包含字母、数字或者英文符号至少两种！'
      })
    }
    if (value && this.state.confirmDirty && !(confirmvalue !== '' && confirmvalue !== undefined) && (value !== confirmvalue)) {
      this.setState({
        confirmpass_icon: true,
        checkconfirm: ''
      })
    }
  }
  compareToFirstPassword = (e) => {
    let value = e.target.value
    const form = this.props.form
    let passvalue = form.getFieldValue('maf_pwd')
    if (value !== '' && value !== undefined && value.trim() === passvalue) {
      this.setState({
        confirmpass_icon: true,
        checkconfirm: ''
      })
    } else if (passvalue && (value === '' || value === undefined)) {
      this.setState({
        confirmpass_icon: false,
        checkconfirm: '你两次输入的密码不一致!'
      })
    } else {
      this.setState({
        confirmpass_icon: false,
        checkconfirm: '你两次输入的密码不一致!'
      })
    }
  }
  // 提交操作
  saveOrSubmit =() => {
    let thiz = this
    thiz.props.form.validateFields((err, values) => {
      if (values.maf_loginid === undefined) {
        this.setState({
          checkemail_icon: false,
          checkemail: '请输入账号'
        })
      }
      if (values.confirm === undefined) {
        this.setState({
          confirmpass_icon: false,
          checkconfirm: '你两次输入的密码不一致!'
        })
      }
      if (values.maf_sad_idcard === undefined) {
        this.setState({
          stuidcard_icon: false,
          stuidcard: '请输入身份证号！'
        })
      }
      if (values.maf_phone_con === undefined) {
        this.setState({
          phone_con_icon: false,
          phone_con: '请输入验证码!'
        })
      }
      if (values.maf_phone === undefined) {
        this.setState({
          phone_icon: false,
          phonemsg: '请输入手机号！'
        })
      }
      if (values.fog_phone_code === undefined) {
        this.setState({
          phonecheck_icon: false,
          phonecheck: '请输入短信验证码！'
        })
      }
      if (values.fog_phone_code !== '' && (values.fog_phone_code !== this.state.phoneCode)) {
        this.setState({
          phonecheck_icon: false,
          phonecheck: '短信验证码不正确！'
        })
      }
      if (!err) {
        forgetThePassword({
          user_id: values.maf_loginid,
          idcard: values.maf_sad_idcard,
          password: values.maf_pwd,
          phone: values.maf_phone
        }, (response) => {
          if (response.data === 'false') {
            message.error('没有此账号！')
          } else {
            this.backHome('/home')
          }
        })
      }
    })
  }
  render () {
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 18}
      }
    }
    const {getFieldDecorator} = this.props.form
    return (
      <div className='register_home'>
        <Layout>
          <div>
            <Layout.Header className='xingyun-header' style={{height: '92px', width: '100%', margin: 'auto'}}>
              <div className='xingyun-logo' style={{marginTop: '30px'}}
                onClick={this.backHome.bind(this, '/home')} />
            </Layout.Header>
          </div>
        </Layout>
        <div className='center-view'>
          <Card title='忘记密码' bordered={false} className='register-card'>
            <div>
              <Form>
                <Form.Item
                  {...formItemLayout}
                  label='账号'
                >
                  {getFieldDecorator('maf_loginid', {
                    rules: [{
                      required: true, message: ' '
                    }]
                  })(
                    <Input placeholder='请输账号' onBlur={(e) => { this.accountNum(e.target.value) }} />
                  )}
                  <span className={this.state.checkemail_icon ? 'success' : 'fail'}>{this.state.checkemail}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='身份证'
                >
                  {getFieldDecorator('maf_sad_idcard', {rules: [{required: true, message: ' '}]})(
                    <Input placeholder='请输入份证号' onBlur={this.handlStuIdonblur} />
                  )}
                  <span className={this.state.stuidcard_icon ? 'success' : 'fail'}>{this.state.stuidcard}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='验证码'
                >
                  {getFieldDecorator('maf_phone_con', {rules: [{required: true, message: ' '}]})(
                    <Input type='text' id='code_input' placeholder='请输入验证码' onBlur={(e) => { this.handlPhonecodeonblur(e.target.value) }} />
                  ) }
                  <button id='my_button'style={{display: 'none'}} />
                  <span className={this.state.phone_con_icon ? 'success succ' : 'fail false'}>{this.state.phone_con}</span>
                  <div id='v_container' style={{width: 100, height: 40}} />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='手机号'
                >
                  {getFieldDecorator('maf_phone', {rules: [{required: true, message: ' '}]})(
                    <Input placeholder='请输入手机号'onBlur={(e) => { this.handlPhoneonblur(e.target.value) }} />
                  )}
                  <Button className='maf_phone' onClick={this.getPhoneCode}>获取验证码</Button>
                  <span className={this.state.phone_icon ? '' : 'fail'}>{this.state.phonemsg}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='短信验证码'
                >
                  {getFieldDecorator('fog_phone_code', {rules: [{required: true, message: ' '}]})(
                    <Input onBlur={this.handlPhonecheckonblur} />
                  )}
                  <span className={this.state.phonecheck_icon ? 'success' : 'fail'}>{this.state.phonecheck}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='设置新密码'
                >
                  {getFieldDecorator('maf_pwd', {
                    rules: [{
                      required: true, message: ' '
                    }]
                  })(
                    <Input placeholder='请输入密码' onChange={this.validateToNextPassword} />
                  )}
                  <span className={this.state.checkpass_icon ? 'success' : 'fail'}>{this.state.checkpass}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='确认新密码'
                >
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: ' '
                    }]
                  })(
                    <Input onChange={this.compareToFirstPassword} />
                  )}
                  <span className={this.state.confirmpass_icon ? 'success' : 'fail'}>{this.state.checkconfirm}</span>
                </Form.Item>
              </Form>
              <div className='submitbtn'>
                <Button key='save' onClick={this.saveOrSubmit.bind(this)}>提交</Button>
              </div>
            </div>
          </Card>
        </div>
        <BottomHeader />
      </div>
    )
  }
}
export default withRouter(Form.create()(ForgetPass))
