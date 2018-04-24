/**
 * 应用详情的查看弹窗
 */
import React, { Component } from 'react'
import { Modal, Row, Col, Icon } from 'antd'
import PropsTypes from 'prop-types'
import './FaDetailsModal.scss'

const modalConfig = {
  width: 750
}

class FaDetailsModal extends Component {
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
        <Row className='row-bottom-border row-top-padding'>
          <Col span={1}>
            <Icon type='check' className='icon-check' />
          </Col>
          <Col span={3}>
        厂商名称
          </Col>
          <Col span={19} className='col-border-left'>
        福州市第一小学
          </Col>
        </Row>
        <Row className='row-bottom-border row-top-padding'>
          <Col span={1}>
            <Icon type='check' className='icon-check' />
          </Col>
          <Col span={3}>
            厂商编号
          </Col>
          <Col span={19} className='col-border-left'>
            <span>
              这里是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述是软件描述
              是软件描述是软件描述是软件描述
            </span>
          </Col>
        </Row>
        <Row className='row-bottom-border row-top-padding'>
          <Col span={1}>
            <Icon type='check' className='icon-check' />
          </Col>
          <Col span={3}>
        合同编号
          </Col>
          <Col span={19} className='col-border-left'>
        福州市第一小学
          </Col>
        </Row>
        <Row className='row-top-padding'>
          <Col span={1}>
            <Icon type='check' className='icon-check' />
          </Col>
          <Col span={3}>
        营业执照
          </Col>
          <Col span={19} className='col-border-left'>
            <img alt='营业执照照片' />
          </Col>
        </Row>
      </Modal>
    )
  }
}

FaDetailsModal.propTypes = {
  getContainer: PropsTypes.func,
  visible: PropsTypes.bool,
  footer: PropsTypes.array,
  title: PropsTypes.string,
  onCancel: PropsTypes.func
}

export default FaDetailsModal
