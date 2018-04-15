import React from 'react'
import Slider from 'react-slick'
import { Row, Form, Icon, Input, Button } from 'antd'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './MainHome.scss'

export default class MainBander extends React.Component {
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
                <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='请输入用户名' />
              </Form.Item>
              <Form.Item>
                <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='请输入密码' type='password' />
              </Form.Item>
              <Form.Item>
                <a style={{color: 'white', fontSize: '12px', float: 'right'}} href=''>忘记密码?</a>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' className='login-btn'>
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
