/* eslint-disable react/prop-types,react/jsx-no-bind */
import React from 'react'
import Slider from 'react-slick'
import { Row, Form, Icon, Input, Button, message } from 'antd'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './MainHome.scss'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import axiosApi from '../../services'
import {setRole, setIsLogged, setUserInfo} from '../../redux/actions/role'
import PropTypes from 'prop-types'
import apiConfig from '../../config'
import webStorage from 'webStorage'

class MainBander extends React.Component {
  static propTypes = {
    showSureWin: PropTypes.func,
    handleAfterLogged: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      userName: '', // 用户名密码
      passWord: '', // 密码
      loginFormVisible: this.getDefaultLoginFormVisible(),
      msgTip: '' // 用户登陆信息提示
    }
  }

  getDefaultLoginFormVisible () {
    let flag = false
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === '' || webStorage.getItem('STAR_WEB_ROLE_CODE') === null) {
      flag = true
    }
    return flag
  }

  handleLogin () {
    if (this.state.userName === '' || this.state.passWord === '') {
      this.setState({
        msgTip: '用户名或密码不能为空!'
      })
      return
    }
    axiosApi.login({
      userName: this.state.userName || '',
      userPassword: this.state.passWord || ''
    }, (response) => {
      let data = response.data
      // 如果登陆成功
      if (data.success) {
        // this.props.setRole(data.roleCode)
        // this.props.setUserInfo(data.personInfo)
        // this.props.setIsLogged(true)
        webStorage.setItem('STAR_WEB_SESSION_ID', data.sessionId)
        webStorage.setItem('STAR_WEB_ROLE_CODE', data.roleCode)
        webStorage.setItem('STAR_WEB_PERSON_INFO', data.personInfo)
        webStorage.setItem('STAR_WEB_IS_LOGGED', true)
        // 如果该用户是首次登录
        if (data.isFirstLogged) {
          this.props.showSureWin(this.getSureInfoData(response.personInfo))
        } else {
          this.setState({
            loginFormVisible: false
          })
        }
      } else {
        message.error('请求数据失败!')
      }
    })
  }

  getSureInfoData (personInfo) {
    let data = []
    for (let i in personInfo) {
      if (i === 'name') {
        data.push({
          type: '姓名',
          value: personInfo[i]
        })
      } else if (i === 'sex') {
        data.push({
          type: '性别',
          value: personInfo[i]
        })
      } else if (i === 'birth') {
        data.push({
          type: '出生日期',
          value: personInfo[i]
        })
      } else if (i === 'school') {
        data.push({
          type: '学校',
          value: personInfo[i]
        })
      } else if (i === 'iden') {
        data.push({
          type: '身份证号',
          value: personInfo[i]
        })
      } else if (i === 'class') {
        data.push({
          type: '年级',
          value: personInfo[i]
        })
      } else if (i === 'duty') {
        data.push({
          type: '行政职务',
          value: personInfo[i]
        })
      }
    }
    return data
  }

  /**
   *
   */
  handleValueChange (e, key) {
    this.setState({
      [key]: e.target.value
    })
  }
  /* 注册 */
  handregister=(link) => {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    window.location.href = apiConfig.BASE_TAB + '/#' + link
  }

  /**
   * 校验密码规则
   * @param rule
   * @param value
   * @param callback
   */
  validatorPas (rule, value, callback) {
    callback()
  }

  render () {
    var settings = {
      dots: false, // 下侧省略号
      infinite: true,
      speed: 500,
      arrows: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    return (
      <div className='main-bander-container'>
        <div className='custom-slider'>
          <Slider {...settings} className='custom-slider'>
            <div>
              <div className='main-banner1' />
            </div>
            <div>
              <div className='main-banner2' />
            </div>
          </Slider>
        </div>
        {
          this.state.loginFormVisible ? (
            <div className='login-div-container' >
              <Row>
                <p style={{marginTop: '20px', textAlign: 'center', fontFamily: "'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC'", fontSize: '20px', color: '#FFFFFF', fontStyle: 'normal'}}>用户登录</p>
              </Row>
              <Row>
                <Form style={{marginLeft: '15px', marginRight: '15px'}}>
                  <Form.Item>
                    <Input onChange={(e) => { this.handleValueChange(e, 'userName') }} value={this.state.userName} className='custom-input' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder='请输入用户名' />
                  </Form.Item>
                  <Form.Item>
                    <Input onChange={(e) => { this.handleValueChange(e, 'passWord') }} value={this.state.passWord} className='custom-input' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder='请输入密码' type='password' />
                  </Form.Item>
                  <Form.Item>
                    <a style={{color: 'red', fontSize: '12px', float: 'left'}} href=''>{this.state.msgTip}</a>
                    <a style={{color: 'white', fontSize: '12px', float: 'right'}} onClick={this.handregister.bind(this, '/forget-home')}>忘记密码?</a>
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' className='login-btn'
                      onClick={this.handleLogin.bind(this)}>
                      立即登录
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit' className='register-btn' onClick={this.handregister.bind(this, '/register-home')}>
                      注册账号
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </div>
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  roleCode: state.role.code
})

const mapDispatchToProps = dispatch => ({
  setRole: (code) => {
    dispatch(setRole(code))
  },
  setUserInfo: (userInfo) => {
    dispatch(setUserInfo(userInfo))
  },
  setIsLogged: (flag) => {
    dispatch(setIsLogged(flag))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainBander))
