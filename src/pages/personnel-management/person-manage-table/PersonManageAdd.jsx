/**
 * 人员管理-新增
 */

import React, { Component } from 'react'
import { Form, Input, Row, Col, Button, message } from 'antd'
import { userInfoAdd } from 'services/topbar-mation'
import PropTypes from 'prop-types'
import './PersonManageAdd.scss'
const FormItem = Form.Item

class PersonManageAdd extends Component {
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false
    }
  }

  // 教师表单上传
  handleSubmitTeacher = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('教师表单数据: ', values)
        userInfoAdd('1', {map: values}, (res) => {
          if (res.data.code === 200) {
            this.props.close()
            message.success('添加成功')
          } else {
            message.warn('添加失败')
          }
        })
      }
    })
  }
  // 学生表单上传
  handleSubmitStudent = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('学生表单数据: ', values)
        userInfoAdd('2', {map: values}, (res) => {
          if (res.data.code === 200) {
            this.props.close()
            message.success('添加成功')
          } else {
            message.warn('添加失败')
          }
        })
      }
    })
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('beginCode')) {
      // eslint-disable-next-line standard/no-callback-literal
      callback('两次输入的密码不一致!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['PASSWORD'], { force: true })
    }
    callback()
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }
    return (
      <div className='add-person'>
        {
          this.props.role === 'teacher'
            ? <Form onSubmit={this.handleSubmitTeacher}>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='USER_NAME'
                    label='教师姓名'
                  >
                    {getFieldDecorator('USER_NAME', {
                      rules: [{
                        required: true, message: '请输入教师姓名!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='GENDER'
                    label='性别'
                  >
                    {getFieldDecorator('GENDER', {
                      rules: [{
                        required: true, message: '请输入性别!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='CERTIFICATE_NUMBER'
                    label='身份证号'
                  >
                    {getFieldDecorator('CERTIFICATE_NUMBER', {
                      rules: [{
                        required: true, message: '请输入身份证号!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='grade'
                    label='教学年级'
                  >
                    {getFieldDecorator('grade', {
                      rules: [{
                        required: true, message: '请输入教学年级!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='teachYears'
                    label='执教时间'
                  >
                    {getFieldDecorator('teachYears', {
                      rules: [{
                        required: true, message: '请输入执教时间!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='PHONE_NUMBER'
                    label='联系方式'
                  >
                    {getFieldDecorator('PHONE_NUMBER', {
                      rules: [{
                        required: true, message: '请输入联系方式!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='job'
                    label='行政职务'
                  >
                    {getFieldDecorator('job', {
                      rules: [{
                        required: true, message: '请输入行政职务!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='LOGIN_NAME'
                    label='账号ID'
                  >
                    {getFieldDecorator('LOGIN_NAME', {
                      rules: [{
                        required: true, message: '请输入账号ID!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='beginCode'
                    label='初始密码'
                  >
                    {getFieldDecorator('beginCode', {
                      rules: [{
                        required: true, message: '请输入初始密码!'
                      }, {
                        validator: this.validateToNextPassword
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='PASSWORD'
                    label='确认密码'
                  >
                    {getFieldDecorator('PASSWORD', {
                      rules: [{
                        required: true, message: '请再次输入密码!'
                      }, {
                        validator: this.compareToFirstPassword
                      }]
                    })(
                      <Input type='password' onBlur={this.handleConfirmBlur} />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <FormItem className='add-button'>
                <Button onClick={() => this.props.close()}>取消</Button>
                <Button type='primary' htmlType='submit'>确认</Button>
              </FormItem>
            </Form>
            : <Form onSubmit={this.handleSubmitStudent}>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='USER_NAME'
                    label='学生姓名'
                  >
                    {getFieldDecorator('USER_NAME', {
                      rules: [{
                        required: true, message: '请输入学生姓名!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='GENDER'
                    label='性别'
                  >
                    {getFieldDecorator('GENDER', {
                      rules: [{
                        required: true, message: '请输入性别!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='CERTIFICATE_NUMBER'
                    label='身份证号'
                  >
                    {getFieldDecorator('CERTIFICATE_NUMBER', {
                      rules: [{
                        required: true, message: '请输入身份证号!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='parentName'
                    label='家长姓名'
                  >
                    {getFieldDecorator('parentName', {
                      rules: [{
                        required: true, message: '请输入家长姓名!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='PHONE_NUMBER'
                    label='手机号'
                  >
                    {getFieldDecorator('PHONE_NUMBER', {
                      rules: [{
                        required: true, message: '请输入手机号!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='school'
                    label='学校'
                  >
                    {getFieldDecorator('school', {
                      rules: [{
                        required: true, message: '请输入账号ID!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='LOGIN_NAME'
                    label='账号ID'
                  >
                    {getFieldDecorator('LOGIN_NAME', {
                      rules: [{
                        required: true, message: '请输入账号ID!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='beginCode'
                    label='初始密码'
                  >
                    {getFieldDecorator('beginCode', {
                      rules: [{
                        required: true, message: '请输入初始密码!'
                      }, {
                        validator: this.validateToNextPassword
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='PASSWORD'
                    label='确认密码'
                  >
                    {getFieldDecorator('PASSWORD', {
                      rules: [{
                        required: true, message: '请再次输入密码!'
                      }, {
                        validator: this.compareToFirstPassword
                      }]
                    })(
                      <Input type='password' onBlur={this.handleConfirmBlur} />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <FormItem className='add-button'>
                <Button onClick={() => this.props.close()}>取消</Button>
                <Button type='primary' htmlType='submit'>确认</Button>
              </FormItem>
            </Form>
        }
      </div>
    )
  }
}
PersonManageAdd.propTypes = {
  form: PropTypes.object,
  role: PropTypes.string,
  close: PropTypes.func
}
export default Form.create()(PersonManageAdd)
