/**
 * 老师学生确认信息弹框
 */
import React from 'react'
import { Form, Modal, Button, Input } from 'antd'
import PropTypes from 'prop-types'

export default class ChangeInfoWin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  handleOk () {
    this.props.handleChangeVisible('changeInfoWinVisible', false)
  }

  render () {
    let thiz = this
    return (
      <Modal
        title='确认信息'
        visible={this.props.visible}
        onCancel={thiz.props.handleClose}
        footer={[
          <Button key='infoError' onClick={thiz.props.handleBack}>返回</Button>,
          <Button key='infoOk' type='primary' onClick={thiz.props.handleChangeInfoOk}>确认</Button>
        ]}
      >
        <Form>
          <Form.Item>
            <div style={{
              textAlign: 'center',
              width: '100%',
              height: '100%'
            }}><span style={{
                fontFamily: "'PingFangSC-Regular', 'PingFang SC'",
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '14px',
                color: '#666666',
                textAlign: 'right',
                lineHeight: '18px'
              }}>请输入新密码</span></div></Form.Item>
          <Form.Item><Input placeholder='请输入新的6-16位登录密码' /></Form.Item>
          <Form.Item><Input placeholder='请确认一遍您的密码' /></Form.Item>
        </Form>
      </Modal>
    )
  }
}

ChangeInfoWin.propTypes = {
  visible: PropTypes.bool,
  handleChangeVisible: PropTypes.func
}
