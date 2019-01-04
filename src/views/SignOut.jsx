/* eslint-disable react/prop-types */
/* 退出 */
import React from 'react'
import {Modal, Button} from 'antd'
import PropTypes from 'prop-types'
// import {sessionLogout} from '../services/topbar-mation'
import { withRouter } from 'react-router'
import {clearCookie} from 'utils/cookie'
import webStorage from 'webStorage'
class SignOutModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    history: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  saveOrSubmit =(value) => {
    // sessionLogout({}, (response) => {
    //   this.backHome()
    //   // this.props.hiddenModal()
    //   webStorage.clear()
    // })
    this.backHome()
    // this.props.hiddenModal()
    webStorage.clear()
  }
  backHome=() => {
    clearCookie()
    if (this.props.location.pathname === '/') {
      window.location.reload()
    } else {
      this.props.history.push({
        pathname: '/'
      })
      window.location.reload()
    }
  }

  render () {
    return (
      <div>
        <Modal
          title='提示'
          visible={this.props.visible}
          onCancel={this.props.hiddenModal}
          // maskClosable={false}
          className='sign-out'
          width='20vw'
          footer={[ // eslint-disable-next-line react/jsx-no-bind
            <Button key='cancle' onClick={this.props.hiddenModal}>取消</Button>,
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='save' type='primary' onClick={this.saveOrSubmit.bind(this)}>确认</Button>]}
        >
          <div>
            <h4 className='sign_out'>确定退出系统？</h4>
          </div>
        </Modal>
      </div>
    )
  }
}
export default withRouter(SignOutModal)
