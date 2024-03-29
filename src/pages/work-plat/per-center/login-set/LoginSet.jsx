/**
 * 工作台-个人中心-账号设置
 */
import React, { Component } from 'react'
// import { Button } from 'antd'
import ChangePass from '../../../message-notice/ChangePass'
import ChangePhoneNumber from '../../../message-notice/ChangePhoneNumber'
import ChangeRileName from '../../../message-notice/ChangeRileName'
import webStorage from 'webStorage'
import {axios} from '../../../../utils'
import config from '../../../../config/index'
const {API_BASE_URL_V2, SERVICE_AUTHENTICATION} = config

class LoginSet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      changePassVisible: false,
      changePhoneVisible: false,
      changeRileNameVisible: false,
      userId: null,
      userName: '',
      phoneNumber: '',
      mailAddress: ''
      // userType: ''
    }
  }

  componentDidMount () {
    let id = webStorage.getItem('STAR_V2_USERID') || 1
    console.log(id)
    axios.get(`${API_BASE_URL_V2}${SERVICE_AUTHENTICATION}/users/${id}`).then((res) => {
      console.log(res)
      this.setState({
        userId: res.data.data.userId,
        userName: res.data.data.userName,
        // userType: res.data.data.userType,
        phoneNumber: '' + res.data.data.phoneNumber,
        mailAddress: res.data.data.mailAddress
      })
    })
  }

  hiddenModal = (type) => {
    this.setState({
      [type]: false
    })
  }
  /* 修改密码 */
  changepass =() => {
    this.setState({
      changePassVisible: true
    })
  }
  /* 修改手机 */
  changephone =() => {
    this.setState({
      changePhoneVisible: true
    })
  }
  /* 实名认证 */
  changeRileName =() => {
    this.setState({
      changeRileNameVisible: true
    })
  }
  render () {
    return (
      <div className='base-info'>
        <div className='base-info-top'>
          <div className='base-info-title'>账号安全</div>
          {/* <Button className='base-info-btn back-btn'>返回</Button> */}
        </div>
        <div className='setting-body'>
          <div className='safe_item'>
            <div className='list-img'>
              <i />
            </div>
            <div className='safe-name'>
              <span className='tit'>登录密码</span>
              <span className='word'>互联网账号存在被盗风险，建议您定期修改密码以保护账户安全</span>
              <a className='modify' onClick={this.changepass}> 修改</a>
            </div>
          </div>
          <div className='safe_item'>
            <div className={this.state.phoneNumber === '' ? 'list-img-err' : 'list-img'} >
              <i />
            </div>
            <div className='safe-name'>
              <span className='tit'>手机验证</span>
              <span className={this.state.phoneNumber === '' ? 'word f-color' : 'pbonehidden'}><span className='t-color'>您未绑定手机，请绑定！避免账户被盗</span></span>
              <span className={this.state.phoneNumber !== '' ? 'word f-color' : 'pbonehidden'}>您验证的手机：{this.state.phoneNumber.substr(0, 4) + '*****' + this.state.phoneNumber.substr(9)}若已丢失或停用，请立即更换，<span className='t-color'>避免账户被盗</span></span>
              <a className='modify' onClick={this.changephone}> 验证</a>
            </div>
          </div>
          <div className='safe_item'>
            <div className={this.state.userName === '' ? 'list-img-err' : 'list-img'}>
              <i />
            </div>
            <div className='safe-name'>
              <span className='tit'>实名认证</span>
              <span className='word f-color'>您认证的实名信息：{this.state.userName}</span>
              <a className='modify' onClick={this.changeRileName}> 修改</a>
            </div>
          </div>
          <div className='safe_item'>
            <div className='list-img'>
              <i />
            </div>
            <div className='safe-name'>
              <span className='tit'>邮箱验证</span>
              <span className='word f-color'>您验证的邮箱：{this.state.mailAddress}</span>
              <a className='modify'> 修改</a>
            </div>
          </div>
        </div>
        {this.state.changePassVisible ? <ChangePass
          visible={this.state.changePassVisible}
          hiddenModal={() => this.hiddenModal('changePassVisible')}
        /> : null}
        {this.state.changePhoneVisible ? <ChangePhoneNumber
          visible={this.state.changePhoneVisible}
          hiddenModal={() => this.hiddenModal('changePhoneVisible')}
          from={'基本信息'}
          phoneNumber={this.state.phoneNumber}
        /> : null}
        {this.state.changeRileNameVisible ? <ChangeRileName
          visible={this.state.changeRileNameVisible}
          hiddenModal={() => this.hiddenModal('changeRileNameVisible')}
        /> : null}
      </div>
    )
  }
}

export default LoginSet
