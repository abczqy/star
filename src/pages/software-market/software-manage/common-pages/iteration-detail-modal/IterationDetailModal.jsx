/**
 * 应用详情的查看弹窗
 */
import React, { Component } from 'react'
import { Modal } from 'antd'
import PropsTypes from 'prop-types'
import { SWRelate, // DevRelate,
  IterationInfo
} from '../detail-content'
import { BlankBar } from 'components/software-market'
import './IterationDetailModal.scss'

const modalConfig = {
  width: 1000
}

class IterationDetailModal extends Component {
  getOnShelfTime = (time) => {
    this.props.getOnShelfTime(time)
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
        <SWRelate resData={resData} />
        <BlankBar />
        <IterationInfo resData={resData} getOnShelfTime={this.getOnShelfTime} />
        <BlankBar />
        {/* <DevRelate resData={resData} /> */}
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
  onCancel: PropsTypes.func,
  resData: PropsTypes.object,
  getOnShelfTime: PropsTypes.func
}

export default IterationDetailModal
