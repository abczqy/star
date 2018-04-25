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
  constructor (props) {
    super(props)
    this.state = {
      res: '这是内容'
    }
  }

  render () {
    const { getContainer, visible, footer, title, onCancel, resData } = this.props
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
            {resData ? resData.fa_name : null}
          </Col>
        </Row>
        <Row className='row-bottom-border row-top-padding'>
          <Col span={1}>
            <Icon type='check' className='icon-check' />
          </Col>
          <Col span={3}>
            厂商描述
          </Col>
          <Col span={19} className='col-border-left'>
            {resData ? resData.fa_desc : null}
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
            <span>
              {resData ? resData.fa_con_num : null}
            </span>
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
            <img src={resData ? resData.contract_path : null} alt={resData ? resData.contract_path : null} />
          </Col>
        </Row>
      </Modal>
    )
  }
}

FaDetailsModal.propTypes = {
  getContainer: PropsTypes.func,
  visible: PropsTypes.bool,
  resData: PropsTypes.any,
  footer: PropsTypes.array,
  title: PropsTypes.string,
  onCancel: PropsTypes.func
}

export default FaDetailsModal
