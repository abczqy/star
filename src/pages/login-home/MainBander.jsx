/* eslint-disable react/prop-types,react/jsx-no-bind */
import React from 'react'
import Slider from 'react-slick'
import { Row, Form, Icon, Input, Button } from 'antd'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './MainHome.scss'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import axiosApi from '../../services'
import {setRole} from '../../redux/actions/role'
import PropTypes from 'prop-types'

class MainBander extends React.Component {
  static propTypes = {
    showSureWin: PropTypes.func,
    handleAfterLogged: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      userName: '', // 用户名密码
      passWord: '' // 密码
    }
  }
  handleLogin () {
    if (this.state.userName === '3') {
      axiosApi.login((response) => {
        // 如果是首次登陆
        if (response.isFirstLogged) {
          // this.props.setRole(response.roleCode)
          this.props.showSureWin(response.personInfo)
        } else {
          this.props.handleAfterLogged()
        }
      })
    }
  }

  /**
   *
   */
  handleValueChange (e, key) {
    this.setState({
      [key]: e.target.value
    })
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
                <a style={{color: 'red', fontSize: '12px', float: 'left'}} href=''>用户提示</a>
                <a style={{color: 'white', fontSize: '12px', float: 'right'}} href=''>忘记密码?</a>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' className='login-btn'
                  onClick={this.handleLogin.bind(this)}>
                  立即登录
                </Button>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' className='register-btn'>
                  注册账号
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
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
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainBander))
