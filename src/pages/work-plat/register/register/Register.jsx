/**
 * 用户注册
 */
import React, { Component } from 'react'
import {
  Form,
  Input,
  Button,
  message,
  Checkbox
} from 'antd'
import './Register.scss'
import PropTypes from 'prop-types'
const FormItem = Form.Item

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  /** 提交表单 */
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        /** 注册成功 */
        message.success('注册成功')
        this.props.history.push({
          pathname: '/operate-manage-home/work-plat/login'
        })
      }
    })
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
      callback()
    } else {
      const phonereg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!phonereg.test(value)) {
        const res = '手机号格式不正确'
        callback(res)
      } else {
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
  render () {
    const { getFieldDecorator } = this.props.form
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
          <span className='title'>家长注册</span>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label='账号'
              className='mar-top-3 err-css-in'
              hasFeedback
            >
              {getFieldDecorator('email', {
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
              label='家长姓名'
            >
              {getFieldDecorator('name')(
                <Input placeholder='请输入姓名' className='input-size' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='家长身份证号'
              className='err-css-in'
              hasFeedback
            >
              {getFieldDecorator('idcard', {
                rules: [{ required: true, message: '请输入家长身份证号' }, {
                  validator: this.validateCard
                }]
              })(
                <Input placeholder='请输入家长身份证号' className='input-size' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='学生账号'
              className='err-css-in'
              hasFeedback
            >
              {getFieldDecorator('stuname', {
                rules: [{ required: true, message: '请输入学生账号' }]
              })(
                <Input placeholder='请输入学生账号' className='input-size' />
              )}
            </FormItem>
            <Button className='get-btn'>获取邀请码</Button>
            <FormItem
              {...formItemLayout}
              label='主家长电话'
              className='err-css-small-in'
              hasFeedback
            >
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入主家长电话' }, {
                  validator: this.validatePhone
                }]
              })(
                <Input placeholder='请输入主家长电话' className='input-size-small' />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label='主家长邀请码'
              className='err-css-in'
              hasFeedback
            >
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入主家长邀请码' }]
              })(
                <Input placeholder='请输入主家长邀请码' className='input-size' />
              )}
            </FormItem>
            <FormItem className='ml21'>
              {getFieldDecorator('Checkbox', {
                rules: [{validator: this.validateCheck}]
              })(
                <Checkbox>我同意并遵守 <a href='www.baidu.com'>《星云教育平台服务协议》</a></Checkbox>
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
  form: PropTypes.object
}

export default Form.create()(Register)
