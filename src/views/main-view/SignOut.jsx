/* 退出 */
import React from 'react'
import {Modal, Button} from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'
import ajaxUrl from 'config'
import apiConfig from '../../config'
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
    document.cookie = 'name=' + '123456'
    document.cookie = 'll=' + '123456'
    axios.post(ajaxUrl.sessionLogout, {
      params: {
        'sessionId': '3IIK4IC4C9IL712'
      }
    }).then((response) => {
      console.log('退出成功', response)
      this.props.hiddenModal()
      this.backHome()
    })
  }
  backHome=() => {
    window.location.href = apiConfig.BASE_TAB + '/#' + 'unlogged/home'
    this.clearCookie()
  }
  // 清楚kookie
  clearCookie () {
    // eslint-disable-next-line
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    console.log(keys)
    if (keys) {
      for (var i = keys.length; i--;) { document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() }
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
