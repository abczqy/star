/**
 * 应用下架的确认弹窗
 */
import React, { Component } from 'react'
import { Modal, Col, Row, Input, Icon } from 'antd'
import PropsTypes from 'prop-types'
import './AppStandOffModal.scss'

const modalConfig = {
  width: 400,
  closable: false
}

class AppStandOffModal extends Component {
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
            <Input placeholder='请输入验证码' />
          </Col>
          <Col span={10}>
            <img src='./test-data/test-check-code.png' alt='src由父传入' />
            {/* <div className='check-code' /> */}
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
  swName: PropsTypes.string
}

export default AppStandOffModal
