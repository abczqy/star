import React from 'react'
import {Form, Modal, Input, Button} from 'antd'
import PropTypes from 'prop-types'
import {SMSVerificationv2, updateUser} from '../../services/topbar-mation/index'

const FormItem = Form.Item

class NewUserInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      Countdown: true,
      countTime: 60
    }
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
  onCancel = () => {
    this.setState({
      visible: false
    })
  }
  validatePhome = (rule, value, callback) => {
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/
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
  getPhoneNumber=() => {
    const form = this.props.form
    let phoneNum = form.getFieldValue('phoneNumber')
    form.resetFields('maf_con_code')
    if (phoneNum === '' || phoneNum === undefined) {
      form.validateFields(['phoneNumber'], { force: true })
    }
    if (this.state.phoneNum) {
      this.Countdown()
      this.setState({
        nextgetCode: !this.state.nextgetCode
      })
      // 请求接口获取手机验证码
      this.getPhoneCode(phoneNum)
    }
    // const form = this.props.form
    // let phoneNum = form.getFieldValue('maf_phone_number')
  }
  // 获取短信验证码
  getPhoneCode=(phoneNum) => {
    SMSVerificationv2({'phone': phoneNum}, (response) => {
      this.setState({
        phoneCode: response.data && response.data.toString()
      })
    })
  }
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        updateUser(values, (res) => {
          const data = res.data.data
          if (res.data.code === 200) {
            console.log(data)
          }
        })
      }
    })
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
      <Modal visible={this.props.visible}
        title='完善用户信息'
        centered
        destroyOnClose
        onOk={this.onOk}
        onCancel={this.onCancel}
      >
        <FormItem label='用户姓名' {...formItemLayout}>
          {getFieldDecorator('userName', {
            rules: [{required: true, message: '请填写账号名称'}]
          })(<Input />)}
        </FormItem>
        <Form.Item
          {...formItemLayout}
          label='新手机号'
          className='new_pass_input'
        >
          {getFieldDecorator('phoneNumber', {rules: [{required: true, message: ' '},
            {validator: this.validatePhome}],
          validateTrigger: 'onBlur'})(
            <Input style={{width: '60%'}} />
          )}
          <Button type='primary' style={{marginLeft: '5%', width: '35%'}} disabled={!this.state.Countdown} onClick={this.getPhoneNumber}>获取验证码</Button>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label='手机验证码'
        >
          {getFieldDecorator('maf_con_code', {rules: [{required: true, message: '请输入验证码！'}]})(
            <Input style={{width: '60%'}} />
          )}
          <Button type='primary' style={{marginLeft: '5%', width: '35%'}}>{this.state.countTime}</Button>
        </Form.Item>
        <FormItem label='邮箱' {...formItemLayout}>
          {getFieldDecorator('mailAddress', {
            rules: [{required: true, message: '请填写邮箱地址'}]
          })(<Input />)}
        </FormItem>
      </Modal>
    )
  }
}

NewUserInfo.propTypes = {
  visible: PropTypes.bool,
  form: PropTypes.object,
  onOk: PropTypes.func
}

export default Form.create()(NewUserInfo)
