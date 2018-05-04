/* eslint-disable react/jsx-no-bind,react/prop-types,standard/no-callback-literal,no-undef,no-useless-return */
/**
 * 应用下架的确认弹窗
 */
import React, { Component } from 'react'
import { Modal, Col, Row, Input, Icon, message } from 'antd'
import PropsTypes from 'prop-types'
import './AppStandOffModal.scss'

const modalConfig = {
  width: 400,
  closable: false
}

class AppStandOffModal extends Component {
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        verifyCode: new GVerify('v_container')
      })
    }, 100)
  }

  onChange = (e) => {
    this.props.getVeriCode(e.target.value)
  }
  onBlur = (e) => {
    let verifyCode = this.state.verifyCode
    var res = verifyCode.validate(e.target.value)
    if (res) {
      this.props.getVeriStatus(res)
    } else {
      this.props.getVeriStatus(res)
      message.warning('验证码输入错误!')
    }
  }
  refreshVeri = () => {
    let verifyCode = this.state.verifyCode
    verifyCode.refresh()
  }
  render () {
    const { getContainer, visible, footer, swName } = this.props
    return (
      <Modal
        {...modalConfig}
        visible={visible}
        getContainer={getContainer}
        footer={footer}
      >
        <Row gutter={16}>
          <Col span={2} offset={2}>
            <Icon type='exclamation-circle' />
          </Col>
          <Col span={20}>
            <span className='sw-off-stand-text'>您是否确认下架<span className='sw-name'>{swName}</span>软件，此操作不可逆转！</span>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col offset={4} span={10}>
            <Input placeholder='请输入验证码' onChange={this.onChange} onBlur={this.onBlur} />
          </Col>
          <Col span={6}>
            {/* <span className={this.state.phone_con_icon ? 'success succ' : 'fail false'}>{this.state.phone_con}</span> */}
            <div id='v_container' style={{ width: 65, height: 27 }} />
            {/* <img src='./test-data/test-check-code.png' alt='src由父传入' /> */}
            {/* <div className='check-code' /> */}
          </Col>
          <Col span={2}>
            <a href='javascript:;' onClick={this.refreshVeri} alt='刷新'><Icon type='reload' /></a>
          </Col>
        </Row>
      </Modal>
    )
  }
}

AppStandOffModal.propTypes = {
  getContainer: PropsTypes.any,
  visible: PropsTypes.bool,
  footer: PropsTypes.array,
  swName: PropsTypes.string,
  getVeriCode: PropsTypes.func,
  getVeriStatus: PropsTypes.func
}

export default AppStandOffModal
