/* 退出 */
import React from 'react'
import {Modal, Button} from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'
import ajaxUrl from 'config'
import apiConfig from '../../config'
import {clearCookie} from 'utils/cookie'
export default class RegisterSuccModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func
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
    axios.post(ajaxUrl.sessionLogout).then((response) => {
      console.log('退出成功', response)
      this.props.hiddenModal()
      this.backHome()
    })
  }
  backHome=() => {
    window.location.href = apiConfig.BASE_TAB + '/#' + 'unlogged/home'
    clearCookie()
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
