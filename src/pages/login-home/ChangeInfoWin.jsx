/* eslint-disable react/prop-types,standard/no-callback-literal */
/**
 * 老师学生确认信息弹框
 */
import React from 'react'
import { Form, Modal, Button, Input, Row, Col, message } from 'antd'
import PropTypes from 'prop-types'
import {modifyPassword} from 'services/portal/'

class _LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount () {

  }

  validatorPas (rule, value, callback) {
    // eslint-disable-next-line
    let reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[~!@#$%^&*()_+`\-={}:";'<>?,.\/])|(?=.*?[A-Za-z])(?=.*?[~!@#$%^&*()_+`\-={}:";'<>?,.\/])).{6,16}$/
    if (value && !reg.test(value)) {
      callback('最短6位，包含字母、数字或者英文符号至少两种!')
    }
    callback()
  }

  compareToFirstPassword (rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('psw')) {
      callback('两次输入密码不一致!')
    } else {
      callback()
    }
  }

  hasErrors (fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveNewPsw(values)
      }
    })
  }

  /**
   * 保存新的密码
   */
  saveNewPsw (obj) {
    let thiz = this
    modifyPassword({password: obj.psw}, (response) => {
      let result = response.data
      if (result.success) {
        message.success('修改密码成功!')
        thiz.props.handleChangeInfoOk()
      } else {
        message.success('修改密码失败!')
      }
    })
  }

  render () {
    let thiz = this
    const { getFieldDecorator, getFieldsError } = this.props.form
    return (
      <Form onSubmit={thiz.handleSubmit}>
        <Form.Item>
          <div style={{ textAlign: 'center', width: '100%', height: '100%' }}>
            <span style={{fontFamily: "'PingFangSC-Regular', 'PingFang SC'",
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '14px',
              color: '#666666',
              textAlign: 'right',
              lineHeight: '18px'
            }}>请输入新密码</span>
          </div>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('psw', {
            rules: [{ required: true, message: '密码不能为空！' }, {
              validator: thiz.validatorPas.bind(thiz)
            }]
          })(
            <Input type='password' placeholder='请输入6-16位新的登录密码' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('surePsw', {
            rules: [{ required: true, message: '确认密码不能为空！' }, {
              validator: thiz.compareToFirstPassword.bind(thiz)
            }]
          })(
            <Input type='password' placeholder='请再次输入密码' />
          )}
        </Form.Item>
        <Form.Item style={{float: 'right'}}>
          <Button key='infoError' onClick={thiz.props.handleBack}>返回</Button>,
          <Button
            type='primary'
            htmlType='submit'
            disabled={thiz.hasErrors(getFieldsError())}
          >确定</Button>
        </Form.Item>
      </Form>
    )
  }
}
const LoginForm = Form.create()(_LoginForm)

export default class ChangeInfoWin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Modal
        title='确认信息'
        visible={this.props.visible}
        onCancel={this.props.handleClose}
        footer={null}
      >
        <Row>
          <Col span={4} />
          <Col span={16}>
            <LoginForm
              handleChangeInfoOk={this.props.handleChangeInfoOk}
              handleBack={this.props.handleBack}
              handleChangeVisible={this.props.handleChangeVisible} />
          </Col>
          <Col span={4} />
        </Row>
      </Modal>
    )
  }
}

ChangeInfoWin.propTypes = {
  visible: PropTypes.bool,
  handleChangeVisible: PropTypes.func
}
