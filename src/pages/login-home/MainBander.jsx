/* eslint-disable react/prop-types,react/jsx-no-bind */
import React from 'react'
import Slider from 'react-slick'
import { Row, Form, Icon, Input, Button } from 'antd'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './MainHome.scss'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class MainBander extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  handleLogin () {
    // 如果是运营商
    if (this.props.roleCode === 'operator') {
      this.props.history.push({
        pathname: '/software-market-home'
      })
    } else {
      this.props.history.push({
        pathname: '/operate-manage-home'
      })
    }
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
                <Input className='custom-input' prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='请输入用户名' />
              </Form.Item>
              <Form.Item>
                <Input className='custom-input' prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='请输入密码' type='password' />
              </Form.Item>
              <Form.Item>
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
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MainBander))
