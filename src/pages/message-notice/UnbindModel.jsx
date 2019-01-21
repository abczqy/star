/* 解除绑定弹出框 */
import React from 'react'
import {Modal, Button} from 'antd'
import PropTypes from 'prop-types'
import {relationdelete} from '../../services/topbar-mation/index'
import '../../views/Operateview.scss'
export default class UnbindModel extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    maf_id: PropTypes.string,
    stu_id: PropTypes.string,
    getBindList: PropTypes.func,
    stuName: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  saveOrSubmit =() => {
    relationdelete({
      maf_id: this.props.maf_id,
      maf_sad_account: this.props.stu_id
    }, (response) => {
      console.log('返回学生绑定信息', response)
      this.props.getBindList()
      this.props.hiddenModal()
    })
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
            <Button key='save' type='primary' onClick={this.saveOrSubmit.bind(this)}>解除绑定</Button>
          ]}
          width='35vw'
          height='30vw'
        >
          <div>
            <h4 className='unbind-icon'><span /></h4>
            <h4>确定解除您与孩子{this.props.stuName}的绑定吗？</h4>
          </div>
        </Modal>
      </div>
    )
  }
}
