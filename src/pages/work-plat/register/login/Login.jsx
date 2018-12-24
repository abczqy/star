/**
 * 登录
 */
import React, { Component } from 'react'
import {
  Icon,
  Layout,
  Form,
  Input,
  Button,
  Row, Col,
  message
} from 'antd'
import PropTypes from 'prop-types'
import './Login.scss'
const FormItem = Form.Item
const {
  Footer, Content
} = Layout

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  /** 登录 */
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('校验账户密码')
        /** 成功后执行 */
        message.success('登录成功')
        this.props.history.push({
          pathname: '/operate-manage-home/home'
        })
        /** 成功后执行 */
      }
    })
  }
  /** 跳转到找回密码 */
  toFindPassWord = (e) => {
    this.props.history.push({
      pathname: '/operate-manage-home/work-plat/forget-pass'
    })
  }
  /** 跳转到注册 */
  toRegister = (e) => {
    this.props.history.push({
      pathname: '/operate-manage-home/work-plat/register'
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout className='log-content'>
        <Content>
          <div>
            <Row>
              <Col span={14}>
                <img src={require('../../../../assets/images/login-home/log_1.jpg')} className='wid-100' />
              </Col>
              <Col span={9} offset={1}>
                <Row className='mar-top-25'>
                  <Col span={5}>
                    <img src={require('../../../../assets/images/login-home/log_2.png')} className='wid-70' />
                  </Col>
                  <Col span={19}>
                    <span className='font-head' >福建教育信息化公共服务平台</span>
                  </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                  <Row className='mar-top-19'>
                    <FormItem>
                      {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入账户' }]
                      })(
                        <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='账户' className='wid-50 hei-40' />
                      )}
                    </FormItem>
                  </Row>
                  <Row>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }]
                      })(
                        <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' className='wid-50 hei-40' />
                      )}
                    </FormItem>
                  </Row>
                  <Row className='mar-top--1'>
                    <a className='a-code ml36' onClick={this.toRegister}>注册</a>
                    <a className='a-code' onClick={this.toFindPassWord}>忘记密码</a>
                  </Row>
                  <Row className='mar-top-4'>
                    <Button type='primary' htmlType='submit' className='wid-50 hei-40'>
                      登录
                    </Button>
                  </Row>
                  <Row className='mar-top-10'>
                    <Col span={8} offset={4}>
                      <span>客服电话：</span>
                      <span className='span-style'>010-5232714</span>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer className='content'>
          <div className='div-foot-span'>
            <p>福建省教育厅主办 技术运营支持： 福建省星云大数据应用服务有限公司</p>
            <p>Copyright©2016 www.fjedu.cn All rights reserved     闽ICP备17018531号-2</p>
          </div>
        </Footer>
      </Layout>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object
}

export default Form.create()(Login)
