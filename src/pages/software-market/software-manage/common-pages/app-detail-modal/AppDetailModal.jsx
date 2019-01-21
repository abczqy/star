/**
 * 应用详情的查看弹窗
 */
import React, { Component } from 'react'
import { Modal } from 'antd'
import PropsTypes from 'prop-types'
import { SWRelate, DevRelate, VoucherRelate } from '../detail-content'
import { BlankBar } from 'components/software-market'
import './AppDetailModal.scss'

const modalConfig = {
  width: 1000
}

class AppDetailModal extends Component {
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
        <SWRelate resData={resData} isBusiDeta />
        <BlankBar />
        <DevRelate resData={resData} />
        <BlankBar />
        <VoucherRelate resData={resData} />
        <BlankBar />
      </Modal>
    )
  }
}

AppDetailModal.propTypes = {
  getContainer: PropsTypes.func,
  visible: PropsTypes.bool,
  footer: PropsTypes.array,
  title: PropsTypes.string,
  onCancel: PropsTypes.func,
  resData: PropsTypes.object
}

export default AppDetailModal
