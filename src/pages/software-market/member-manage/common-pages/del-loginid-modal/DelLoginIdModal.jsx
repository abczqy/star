/**
 * 应用详情的查看弹窗
 */
import React, { Component } from 'react'
import { Modal, Icon, Col, Row } from 'antd'
import PropsTypes from 'prop-types'
import './DelLoginIdModal.scss'

const modalConfig = {
  width: 400
}

class DelLoginIdModal extends Component {
  render () {
    const { getContainer, visible, footer, title, onCancel } = this.props
    return (
      <Modal
        {...modalConfig}
        getContainer={getContainer}
        visible={visible}
        footer={footer}
        title={title}
        onCancel={onCancel}
      >
        <div>
          <Row>
            <Col span={2}>
              <Icon type='exclamation-circle' />
            </Col>
            <Col span={20}>
              <span>您确定要删除当前账号吗？此操作不可逆。</span>
            </Col>
          </Row>
        </div>
      </Modal>
    )
  }
}

DelLoginIdModal.propTypes = {
  getContainer: PropsTypes.func,
  visible: PropsTypes.bool,
  footer: PropsTypes.array,
  title: PropsTypes.string,
  onCancel: PropsTypes.func
}

export default DelLoginIdModal
