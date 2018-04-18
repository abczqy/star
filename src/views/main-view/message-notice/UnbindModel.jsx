/* 解除绑定弹出框 */
import React from 'react'
import {Modal, Button} from 'antd'
import PropTypes from 'prop-types'
import '../Operateview.scss'
export default class UnbindModel extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  saveOrSubmit =(value) => {
    this.props.hiddenModal()
  }
  render () {
    return (
      <div>
        <Modal
          title='解除绑定'
          visible={this.props.visible}
          onCancel={this.props.hiddenModal}
          maskClosable={false}
          className='setting-unbind-modal'
          footer={[
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='cancle' onClick={this.props.hiddenModal}>取消</Button>,
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='save' type='primary' onClick={this.saveOrSubmit.bind(this, 0)}>解除绑定</Button>
          ]}
          width='35vw'
          height='30vw'
        >
          <div>
            <h4 className='unbind-icon'><span /></h4>
            <h4>确定解除您与孩子王洪亮的绑定吗？</h4>
          </div>
        </Modal>
      </div>
    )
  }
}
