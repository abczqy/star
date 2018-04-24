/**
 * 应用详情的查看弹窗
 */
import React, { Component } from 'react'
import { Modal } from 'antd'
import PropsTypes from 'prop-types'
import { SWRelate, DevRelate, VoucherRelate } from '../detail-content'
import { BlankBar } from 'components/software-market'
import './IterationDetailModal.scss'

const modalConfig = {
  width: 1000
}

class IterationDetailModal extends Component {
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
        <SWRelate />
        <BlankBar />
        <DevRelate />
        <BlankBar />
        <VoucherRelate />
        <BlankBar />
      </Modal>
    )
  }
}

IterationDetailModal.propTypes = {
  getContainer: PropsTypes.func,
  visible: PropsTypes.bool,
  footer: PropsTypes.array,
  title: PropsTypes.string,
  onCancel: PropsTypes.func
}

export default IterationDetailModal
