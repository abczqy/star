/**
 * 密码修改成功提示框
 */
import React from 'react'
import { Modal, Button } from 'antd'
import PropTypes from 'prop-types'

export default class ChangeInfoOkWin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    let thiz = this
    return (
      <Modal
        title='提示'
        visible={this.props.visible}
        onCancel={thiz.props.handleClose}
        footer={[
          <Button key='infoOk' type='primary' onClick={thiz.props.handleClose}>关闭</Button>
        ]}
      >
        <div style={{textAlign: 'center',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center'}}>
          <div className='change-ok-tip' />
        </div>
        <div style={{textAlign: 'center'}}><span style={{
          fontFamily: "'PingFangSC-Regular', 'PingFang SC'",
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: '20px'
        }}>恭喜您，修改成功</span></div>
      </Modal>
    )
  }
}

ChangeInfoOkWin.propTypes = {
  visible: PropTypes.bool
  // handleChangeVisible: PropTypes.func
}
