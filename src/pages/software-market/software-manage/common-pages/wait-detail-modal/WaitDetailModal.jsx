/**
 * 应用详情的查看弹窗
 */
import React, { Component } from 'react'
import { Modal } from 'antd'
import PropsTypes from 'prop-types'
import { SWRelate, DevRelate, IterationInfo } from '../detail-content'
import { BlankBar } from 'components/software-market'
import './WaitDetailModal.scss'

const modalConfig = {
  width: 1000
}

class WaitDetailModal extends Component {
  render () {
    const { getContainer, visible, footer, title, onCancel, resData, isWaitItera } = this.props
    return (
      <Modal
        {...modalConfig}
        getContainer={getContainer}
        visible={visible}
        footer={footer}
        title={title}
        onCancel={onCancel}
      >
        <SWRelate resData={resData} />
        <BlankBar />
        {isWaitItera ? <IterationInfo /> : null}
        {isWaitItera ? <BlankBar /> : null}
        <DevRelate />
        <BlankBar />
      </Modal>
    )
  }
}

WaitDetailModal.propTypes = {
  getContainer: PropsTypes.func,
  visible: PropsTypes.bool,
  footer: PropsTypes.array,
  title: PropsTypes.string,
  onCancel: PropsTypes.func,
  resData: PropsTypes.any,
  isWaitItera: PropsTypes.bool
}

export default WaitDetailModal
