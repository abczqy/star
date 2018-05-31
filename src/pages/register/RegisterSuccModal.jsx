/* 注册成功弹出框 */
import React from 'react'
import {Modal} from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import './register.scss'
class RegisterSuccModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    account: PropTypes.string,
    history: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      clockTime: 60
    }
  }
  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({
        clockTime: this.state.clockTime - 1
      }, () => {
        if (this.state.clockTime === 0) {
          clearInterval(this.interval)
          this.props.history.push({
            pathname: '/home/index'
          })
        }
      })
    }, 1000)
  }
  saveOrSubmit =(value) => {
    this.props.hiddenModal()
  }
  backHome=() => {
    window.clearInterval(this.interval)
    this.props.history.push({
      pathname: '/home/index'
    })
  }
  render () {
    return (
      <div>
        <Modal
          title='提示'
          visible={this.props.visible}
          onCancel={this.backHome}
          maskClosable={false}
          className='registe-success'
          width='35vw'
          height='30vw'
          footer={[]}
        >
          <div>
            <h4 className='registesucc-icon'><span /></h4>
            <h4 className='register_tip'>恭喜您注册成功！</h4>
            <h4 className='account_nmum'>您注册的账号为:{this.props.account}</h4>
          </div>
          <div className='time'>{this.state.clockTime}秒后返回门户</div>
        </Modal>
      </div>
    )
  }
}
export default withRouter(RegisterSuccModal)
