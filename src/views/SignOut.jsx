/* 退出 */
import React from 'react'
import {Modal, Button} from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'
import ajaxUrl from 'config'
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
  componentDidMount () {
  }
  componentWillUnmount () {

  }
  saveOrSubmit =(value) => {
    axios.put(ajaxUrl.sessionLogout, {}).then((response) => {
      console.log('退出成功', response)
      this.backHome()
      webStorage.removeItem('STAR_WEB_SESSION_ID')
      webStorage.removeItem('STAR_WEB_ROLE_CODE')
      webStorage.removeItem('STAR_WEB_PERSON_INFO')
      webStorage.removeItem('STAR_WEB_IS_LOGGED')
      this.props.hiddenModal()
    })
  }
  backHome=() => {
    clearCookie()
    this.props.history.push({
      pathname: 'unlogged/home'
    })
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
