/**
 * 人员管理-新增
 */

import React, { Component } from 'react'
import { Form, Input, Row, Col, Button } from 'antd'
import PropTypes from 'prop-types'
import './PersonManageAdd.scss'
const FormItem = Form.Item

class PersonManageAdd extends Component {
  // constructor (props) {
  //   super(props)
  // }

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
            ? <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='teacherName'
                    label='教师姓名'
                  >
                    {getFieldDecorator('teacherName', {
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
                    key='sex'
                    label='性别'
                  >
                    {getFieldDecorator('sex', {
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
                    key='IdCard'
                    label='身份证号'
                  >
                    {getFieldDecorator('IdCard', {
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
                    key='grade'
                    label='教学年级'
                  >
                    {getFieldDecorator('grade', {
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
                    key='teachYears'
                    label='执教时间'
                  >
                    {getFieldDecorator('teachYears', {
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
                    key='mobile'
                    label='联系方式'
                  >
                    {getFieldDecorator('mobile', {
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
                    key='job'
                    label='行政职务'
                  >
                    {getFieldDecorator('job', {
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
                    key='userId'
                    label='账号ID'
                  >
                    {getFieldDecorator('userId', {
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
                    key='conformCode'
                    label='确认密码'
                  >
                    {getFieldDecorator('conformCode', {
                      rules: [{
                        required: true, message: '请输入账号ID!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <FormItem className='add-button'>
                <Button onClick={() => this.props.close()}>取消</Button>
                <Button type='primary' htmlType='submit'>确认</Button>
              </FormItem>
            </Form>
            : <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col span={12}>
                  <FormItem
                    {...formItemLayout}
                    key='studentName'
                    label='学生姓名'
                  >
                    {getFieldDecorator('studentName', {
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
                    key='sex'
                    label='性别'
                  >
                    {getFieldDecorator('sex', {
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
                    key='IdCard'
                    label='身份证号'
                  >
                    {getFieldDecorator('IdCard', {
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
                    key='parentName'
                    label='家长姓名'
                  >
                    {getFieldDecorator('parentName', {
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
                    key='phone'
                    label='手机号'
                  >
                    {getFieldDecorator('phone', {
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
                    key='userId'
                    label='账号ID'
                  >
                    {getFieldDecorator('userId', {
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
                    key='conformCode'
                    label='确认密码'
                  >
                    {getFieldDecorator('conformCode', {
                      rules: [{
                        required: true, message: '请输入账号ID!'
                      }]
                    })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <FormItem>
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
