/**
 * 首次登录
 */
import React, { Component } from 'react'
import {
  Layout,
  Form,
  Input,
  Button,
  Modal,
  Row, Col,
  message
} from 'antd'
import PropTypes from 'prop-types'
import './FirstLogin.scss'
// import { getIdentifying } from 'services/portal'
import {setCookie, getCookie} from '../../../../utils/cookie'
const FormItem = Form.Item
const {
  Footer, Content
} = Layout

class FirstLogin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      captchaBtnText: '获取验证码',
      visible: false,
      confirmDirty: false,
      validatePhoneFlag: false
    }
  }
  componentDidMount () {
    const countdown = getCookie('secondsremained') ? getCookie('secondsremained') : 0 // 获取cookie值
    if (countdown !== undefined && countdown > 0) {
      this.settime()// 开始倒计时
    }
  }
  /** 获取验证码 */
  getCode = () => {
    if (this.state.captchaBtnText === '获取验证码') {
      if (this.state.validatePhoneFlag) {
        console.log('获取验证码中')
        setCookie('secondsremained', 60, 60)
        this.settime()
        /** getIdentifying(this.props.form.getFieldValue('phone'), (res) => {
          const data = res.data
          console.log(data)
          if (data.code === '200') {
            message.success('获取验证码成功')
          } else {
            message.error('获取验证码失败')
          }
        }) */
      } else {
        this.props.form.validateFields(['phone'])
      }
    }
  }
  /** 验证码倒计时 */
  settime = () => {
    let countdown = 60
    // @ts-ignore
    countdown = getCookie('secondsremained')
    const timer = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(timer)
        this.setState({
          captchaBtnText: '获取验证码'
        })
      } else {
        this.setState({
          captchaBtnText: `获取验证码(${countdown}s)`
        })
        countdown--
      }
      setCookie('secondsremained', countdown, countdown + 1)
    }, 1000)
  }
  /** 提交手机号、验证码 */
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(['phone', 'code'], (err, values) => {
      if (!err) {
        console.log('校验手机号与验证码')
        /** 成功后执行 */
        message.success('操作成功')
        this.showModal()
        /** 成功后执行 */
      }
    })
  }
  /** 修改密码 */
  handlePwdSubmit= (e) => {
    e.preventDefault()
    this.props.form.validateFields(['password', 'confirm'], (err, values) => {
      if (!err) {
        console.log('后台执行修改密码')
        /** 成功后执行 */
        this.handleOk()
        message.success('修改成功')
        this.props.history.push({
          pathname: '/operate-manage-home/work-plat/login'
        })
        /** 成功后执行 */
      }
    })
  }
  /** 输入密码弹出 */
  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false
    })
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }
  /** 校验手机号 */
  validatePhone = (rule, value, callback) => {
    if (!value) {
      this.setState({
        validatePhoneFlag: false
      })
      const res = '请输入绑定的手机号'
      callback(res)
    } else {
      const phonereg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!phonereg.test(value)) {
        this.setState({
          validatePhoneFlag: false
        })
        const res = '手机号格式不正确'
        callback(res)
      } else {
        this.setState({
          validatePhoneFlag: true
        })
        callback()
      }
    }
  }
  /** 校验两次密码是否一致 */
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      const res = '两次密码输入不一致'
      callback(res)
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value) {
      if (value.length >= 6 && value.length <= 16) {
        if (this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback()
      } else {
        const res = '请输入6-16位登录密码'
        callback(res)
      }
    } else {
      const res = '请输入新的6-16位登录密码'
      callback(res)
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Layout className='content'>
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
                      {getFieldDecorator('phone', {
                        rules: [ {
                          validator: this.validatePhone
                        }]
                      })(
                        <Input placeholder='请输入绑定的手机号' className='wid-50 hei-40' />
                      )}
                    </FormItem>
                  </Row>
                  <Row>
                    <FormItem>
                      {getFieldDecorator('code', {
                        rules: [{ required: true, message: '请输入短信验证码' }]
                      })(
                        <Input placeholder='请输入短信验证码' className='wid-37 hei-40' />
                      )}
                      <a className='a-code' onClick={this.getCode}>{this.state.captchaBtnText}</a>
                    </FormItem>
                  </Row>
                  <Row className='mar-top-5'>
                    <Button type='primary' htmlType='submit' className='wid-50 hei-40'>
                      确认
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
          <Modal
            title='修改密码'
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button onClick={this.handlePwdSubmit}>
               确定
              </Button>
            ]}
          >
            <div className='pwd-model'>
              <Form>
                <Row>
                  <span className='ml25 redcol'>*</span><span className='span-model-titl ml1'>请输入新密码</span>
                </Row>
                <Row className='mar-top-2'>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{
                        validator: this.validateToNextPassword
                      }]
                    })(
                      <Input placeholder='请输入新的6-16位登录密码' className='wid-50 hei-40 ml25' type='password' />
                    )}
                  </FormItem>
                </Row>
                <Row>
                  <FormItem>
                    {getFieldDecorator('confirm', {
                      rules: [{ required: true, message: '请确认一遍您的密码' }, {
                        validator: this.compareToFirstPassword
                      }]
                    })(
                      <Input placeholder='请确认一遍您的密码' className='wid-50 hei-40 ml25' type='password' onBlur={this.handleConfirmBlur} />
                    )}
                  </FormItem>
                </Row>
              </Form>
            </div>
          </Modal>
        </Footer>
      </Layout>
    )
  }
}

FirstLogin.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object
}

export default Form.create()(FirstLogin)
