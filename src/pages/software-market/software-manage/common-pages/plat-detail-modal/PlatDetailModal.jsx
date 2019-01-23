import React, {Component} from 'react'
import {Modal} from 'antd'
import PropsTypes from 'prop-types'
import { BlankBar } from 'components/software-market'
import { VoucherRelate } from '../detail-content'
import './AppDetailModal.scss'
import Relate from './Relate'
const modalConfig = {
  width: 1000
}
class PlatDetailModal extends Component {
  render () {
    const { visible, footer, title, onCancel, getContainer, resData } = this.props
    console.log(visible)
    return (
      <div>
        <Modal
          {...modalConfig}
          getContainer={getContainer}
          visible={visible}
          footer={footer}
          title={title}
          onCancel={onCancel}
        >
          <Relate data={resData} isBusiDeta />
          <BlankBar />
          <VoucherRelate resData={resData} />
        </Modal>
      </div>
    )
  }
}

PlatDetailModal.propTypes = {
  visible: PropsTypes.bool,
  footer: PropsTypes.array,
  onCancel: PropsTypes.func,
  getContainer: PropsTypes.func,
  resData: PropsTypes.object,
  title: PropsTypes.string
}

export default PlatDetailModal
