/* eslint-disable no-useless-return,no-undef,standard/no-callback-literal */
/* 修改手机号 */
import React from 'react'
import {Modal, Button, Form, Input, message} from 'antd'
import PropTypes from 'prop-types'
import {updatePhoneNum, SMSVerification} from '../../services/topbar-mation/index'
import '../../views/Operateview.scss'
class ChangePhoneNumber extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    form: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      type: 'text',
      Countdown: true,
      countTime: 60,
      phoneCode: '' // 短信验证码
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.visible) {
      this.props.form.resetFields()
      this.setState({
        verifyCode: new GVerify('v_container')
      })
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        verifyCode: new GVerify('v_container')
      })
    }, 100)
  }
  // 点击表单后，改变type
  changeType = () => {
    this.setState({ type: 'password' })
  }
  hiddenModal=() => {
    this.props.hiddenModal()
    if (this.intervalcount) {
      window.clearInterval(this.intervalcount)
    }
  }
  saveOrSubmit =() => {
    let thiz = this
    thiz.props.form.validateFields((err, values) => {
      if (values.maf_phone_con !== thiz.state.phoneCode) {
        message.error('短信验证码不正确！')
        return
      }
      if (!err) {
        console.log('修改手机号', values)
        updatePhoneNum({
          phoneNum: values.maf_phone_number,
          password: values.maf_pass
        }, (response) => {
          this.props.hiddenModal()
        })
        window.clearInterval(this.intervalcount)
      }
    })
  }
  // 校验手机
  validatePhome = (rule, value, callback) => {
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (reg.test(value)) {
      this.setState({
        phoneNum: true
      })
      callback()
    } else if (value === '' || value === undefined) {
      this.setState({
        phoneNum: false
      })
      // eslint-disable-next-line standard/no-callback-literal
      callback('请输入手机号!')
    } else {
      // eslint-disable-next-line standard/no-callback-literal
      callback('你输入的手机号不正确!')
    }
  }
  // 获取验证码
  getPhoneNumber=() => {
    const form = this.props.form
    let phoneNum = form.getFieldValue('maf_phone_number')
    let phoneCon = form.getFieldValue('maf_phone_con')
    if (phoneCon === '' || phoneCon === undefined) {
      form.validateFields(['maf_phone_con'], { force: true })
      this.setState({
        phone_con_icon: false
      })
      return
    }
    if (phoneNum === '' || phoneNum === undefined) {
      form.validateFields(['maf_phone_number'], { force: true })
    }
    form.validateFields(['maf_phone_con'], { force: true }, (err) => {
      if (err) {
        this.setState({
          phone_con_icon: false
        })
      }
    })
    if (this.state.phoneNum && this.state.phone_con_icon) {
      this.Countdown()
      this.setState({
        nextgetCode: !this.state.nextgetCode
      }, () => {
        if (this.state.nextgetCode) {
          var parent = document.getElementById('v_container')
          var child = document.getElementById('verifyCanvas')
          parent.removeChild(child)
          this.setState({
            verifyCode: new GVerify('v_container')
          })
        }
      })
      // form.setFieldsValue({maf_phone_con: ''})
      console.log(11111111111, phoneNum)
      // 请求接口获取手机验证码
      this.getPhoneCode(phoneNum)
    }
    // const form = this.props.form
    // let phoneNum = form.getFieldValue('maf_phone_number')
  }
  // 获取短信验证码
  getPhoneCode=(phoneNum) => {
    SMSVerification({
      NUM: phoneNum
    }, (response) => {
      this.setState({
        phoneCode: response.data
      })
    })
  }
  // 倒计时
  Countdown=() => {
    this.intervalcount = setInterval(() => {
      this.setState({
        Countdown: false,
        countTime: this.state.countTime - 1
      }, () => {
        if (this.state.countTime === 0) {
          window.clearInterval(this.intervalcount)
          this.setState({
            Countdown: true,
            countTime: 60
          })
        }
      })
    }, 1000)
  }
  componentWillUnmount () {
    window.clearInterval(this.intervalcount)
  }
  // 验证码
  handlPhonecodeonblur=(rule, value, callback) => {
    let verifyCode = this.state.verifyCode
    if (value) {
      var res = verifyCode.validate(value)
      if (!res) {
        callback('验证码错误!')
        this.setState({
          phone_con_icon: false,
          phone_con: ''
        })
        return
      } else {
        callback()
        this.setState({
          phone_con_icon: true,
          phone_con: ''
        })
      }
    } else {
      callback()
      this.setState({
        phone_con_icon: false,
        phone_con: ''
      })
      return
    }
  }
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Modal
          title='修改手机号码'
          visible={this.props.visible}
          onCancel={this.hiddenModal}
          maskClosable={false}
          className='pass-change-modal change-phone-number'
          footer={[
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='cancle' onClick={this.hiddenModal}>取消</Button>,
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='save' type='primary' onClick={this.saveOrSubmit.bind(this)}>确认</Button>
          ]}
          width='35vw'
          height='30vw'
        >
          <div className='addbind-modal'>
            <Form>
              <Form.Item
                {...formItemLayout}
                label='请输入密码'
              >
                {getFieldDecorator('maf_pass', {rules: [{required: true, message: '请输入'}]})(
                  <Input type={this.state.type} onClick={this.changeType} placeholder='请输入' />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='验证码'
              >
                {getFieldDecorator('maf_phone_con', {rules: [{required: true, message: '请输入验证码'}, {validator: this.handlPhonecodeonblur}], validateTrigger: 'onBlur'})(
                  <Input type='text' id='code_input' placeholder='请输入验证码' />
                ) }
                <button id='my_button'style={{display: 'none'}} />
                <span className={this.state.phone_con_icon ? 'success succ' : 'fail false'}>{this.state.phone_con}</span>
                <div id='v_container' style={{width: 100, height: 40}} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='请输入手机号'
                className='new_pass_input'
              >
                {getFieldDecorator('maf_phone_number', {rules: [{required: true, message: ' '}, {
                  validator: this.validatePhome
                }],
                validateTrigger: 'onBlur'})(
                  <Input style={{width: '60%'}} onClick={this.changeType} />
                )}
                <Button type='primary'style={{marginLeft: '5%', width: '35%'}} disabled={!this.state.Countdown} onClick={this.getPhoneNumber}>获取验证码</Button>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='请输入手机验证码'
              >
                {getFieldDecorator('maf_con_code', {rules: [{required: true, message: '请输入验证码！'}]})(
                  <Input style={{width: '60%'}} />
                )}
                <Button type='primary' style={{marginLeft: '5%', width: '35%'}}>{this.state.countTime}</Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(ChangePhoneNumber)
