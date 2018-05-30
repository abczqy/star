/* eslint-disable react/jsx-no-bind,react/prop-types,standard/no-callback-literal,no-undef,no-useless-return */
/**
 * 家长注册
 */
import React from 'react'
import {Card, Layout, Form, Input, Select, Button, Checkbox} from 'antd'
import './register.scss'
import BottomHeader from '../../components/common/BottomHeader'
import RegisterModal from './RegisterSuccModal'
import { withRouter } from 'react-router'
// import apiConfig from '../../config'
import {register, SMSVerification} from '../../services/topbar-mation'
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      relationshipData: [
        {code: '父亲', name: '父亲'},
        {code: '母亲', name: '母亲'},
        {code: '祖父', name: '祖父'},
        {code: '祖母', name: '祖母'},
        {code: '外祖父', name: '外祖父'},
        {code: '外祖母', name: '外祖母'},
        {code: '其他', name: '其他'}
      ],
      confirmDirty: false,
      checkemail_icon: false,
      checkpass: '最短8位，包含字母、数字或者英文符号至少两种',
      relation_icon: false,
      phonemsg: '请先输入验证码！',
      getcode_btn: false,
      phone_icon: false,
      checked: false,
      nextgetCode: true, // 第二次获取验证码
      submitbtn: false, // 注册按钮
      registerVisible: false,
      type: 'text',
      codeBtnText: '获取验证码',
      countTime: 60
    }
  }
  componentDidMount () {
    this.setState({
      verifyCode: new GVerify('v_container')
    })
  }
  handleTabChange (link) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    this.props.history.push({pathname: link})
  }
  // // 校验邮箱
  // handlemialonblur =(e) => {
  //   const value = e.target.value
  //   // eslint-disable-next-line
  //   let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  //   if (value && reg.test(value)) {
  //     this.setState({
  //       checkemail_icon: true,
  //       checkemail: ''
  //     })
  //     return true
  //   } else {
  //     this.setState({
  //       checkemail_icon: false,
  //       checkemail: '请输入有效的邮箱地址'
  //     })
  //     return false
  //   }
  // }

  // 校验第二次密码
  validateToNextPassword = (e) => {
    let value = e.target.value
    const form = this.props.form
    let confirmvalue = form.getFieldValue('confirm')
    // eslint-disable-next-line
    let reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[~!@#$%^&*()_+`\-={}:";'<>?,.\/])|(?=.*?[A-Za-z])(?=.*?[~!@#$%^&*()_+`\-={}:";'<>?,.\/])).{8,16}$/
    if (value && value !== '' && value.trim() && reg.test(value)) {
      this.setState({
        checkpass_icon: true,
        checkpass: ''
      })
      if ((confirmvalue !== '' && confirmvalue !== undefined) && (value !== confirmvalue)) {
        this.setState({
          confirmpass_icon: false,
          checkconfirm: '你两次输入的密码不一致'
        })
      } else if ((confirmvalue !== '' && confirmvalue !== undefined) && (value === confirmvalue)) {
        this.setState({
          confirmpass_icon: true,
          checkconfirm: ''
        })
      }
    } else if ((value === '' || value === undefined || value) && (confirmvalue !== '' && confirmvalue !== undefined)) {
      this.setState({
        checkpass_icon: false,
        checkpass: '最短8位，包含字母、数字或者英文符号至少两种！',
        confirmpass_icon: false,
        checkconfirm: '你两次输入的密码不一致!'
      })
    } else if ((value === '' || value === undefined || value)) {
      this.setState({
        checkpass_icon: false,
        checkpass: '最短8位，包含字母、数字或者英文符号至少两种！'
      })
    }
    if (value && this.state.confirmDirty && !(confirmvalue !== '' && confirmvalue !== undefined) && (value !== confirmvalue)) {
      this.setState({
        confirmpass_icon: true,
        checkconfirm: ''
      })
    }
  }
  compareToFirstPassword = (e) => {
    let value = e.target.value
    const form = this.props.form
    let passvalue = form.getFieldValue('maf_pwd')
    if (value !== '' && value !== undefined && value.trim() === passvalue) {
      this.setState({
        confirmpass_icon: true,
        checkconfirm: ''
      })
    } else if (passvalue && (value === '' || value === undefined)) {
      this.setState({
        confirmpass_icon: false,
        checkconfirm: '你两次输入的密码不一致!'
      })
    } else {
      this.setState({
        confirmpass_icon: false,
        checkconfirm: '你两次输入的密码不一致!'
      })
    }
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  // 校验身份证
  handlidcardonblur=(e) => {
    const value = e.target.value
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (reg.test(value)) {
      this.setState({
        idcard_icon: true,
        idcard: ''
      })
    } else {
      this.setState({
        idcard_icon: false,
        idcard: '身份证格式不正确！'
      })
    }
  }
  // 关系
  relationShip=(value) => {
    if (value) {
      this.setState({
        relation_icon: true,
        relation: ''
      })
    }
  }
  // 学生姓名
  handstudeonblur=(e) => {
    let value = e.target.value
    if (value !== '' && value !== undefined) {
      this.setState({
        stuname_icon: true,
        stuname: ''
      })
    } else {
      this.setState({
        stuname_icon: false,
        stuname: '请输入学生姓名！'
      })
    }
  }
  // 学生身份证
  handlStuIdonblur=(e) => {
    let value = e.target.value
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (reg.test(value)) {
      this.setState({
        stuidcard_icon: true,
        stuidcard: ''
      })
    } else {
      this.setState({
        stuidcard_icon: false,
        stuidcard: '身份证格式不正确！'
      })
    }
  }
  // 学生账号
  handlStuaccountonblur=(e) => {
    let value = e.target.value
    if (value !== '' && value !== undefined) {
      this.setState({
        stuaccount_icon: true,
        stuaccount: ''
      })
    } else {
      this.setState({
        stuaccount_icon: false,
        stuaccount: '请输入学生账号！'
      })
    }
  }
  // 学生密码
  handlStuPassonblur=(e) => {
    let value = e.target.value
    if (value !== '' && value !== undefined) {
      this.setState({
        stupass_icon: true,
        stupass: ''
      })
    } else {
      this.setState({
        stupass_icon: false,
        stupass: '请输入学生账号密码！'
      })
    }
  }
  // 验证码
  handlPhonecodeonblur=(value) => {
    let verifyCode = this.state.verifyCode
    var res = verifyCode.validate(value)
    if (res) {
      this.setState({
        phone_con_icon: true,
        phone_con: '',
        getcode_btn: true,
        phonemsg: '',
        phone_icon: true
      })
      return true
    } else {
      this.setState({
        phone_con_icon: false,
        phone_con: '验证码错误',
        phone_icon: false,
        getcode_btn: false,
        phonemsg: '请先输入验证码！'
      })
      return
    }
  }
  // 手机号
  handlPhoneonblur=(value) => {
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (reg.test(value)) {
      this.setState({
        phone_icon: true,
        phonemsg: ''
      })
      return true
    } else {
      this.setState({
        phone_icon: false,
        phonemsg: '手机号格式不正确！'
      })
      // eslint-disable-next-line no-trailing-spaces
      return 
    }
  }
  // 获取手机验证码
  getPhoneCode=() => {
    const form = this.props.form
    let phoneNum = form.getFieldValue('maf_phone')
    // eslint-disable-next-line camelcase
    let maf_phone_con = form.getFieldValue('maf_phone_con')
    if (this.handlPhoneonblur(phoneNum) && this.handlPhonecodeonblur(maf_phone_con)) {
      this.getCode(phoneNum)
      this.Countdown()
      this.state.verifyCode.refresh()
      console.log('获取验证码成功')
      this.setState({
        nextgetCode: !this.state.nextgetCode
      }, () => {
        if (this.state.nextgetCode) {
          // var parent = document.getElementById('v_container')
          // var child = document.getElementById('verifyCanvas')
          // parent.removeChild(child)
          // form.setFieldsValue({maf_phone_con: ''})
          this.setState({
            // verifyCode: new GVerify('v_container')
          }, () => {
            // this.handlPhonecodeonblur(maf_phone_con)
          })
        }
      })
    } else if (phoneNum === '' || phoneNum === undefined) {
      this.setState({
        phone_icon: false,
        phone_con_icon: false,
        phonemsg: '请输入手机号！'
      })
    }
  }
  // 获取验证码
  getCode=(phoneNum) => {
    console.log('是手机号？', phoneNum)
    SMSVerification({
      phone: phoneNum
    }, (response) => {
      this.setState({
        phoneCode: response.data && response.data.toString()
      })
    })
  }
  // 倒计时
  Countdown=() => {
    this.intervalcode = setInterval(() => {
      this.setState({
        Countdown: false,
        countTime: this.state.countTime - 1,
        codeBtnText: this.state.countTime - 1 + 's',
        getcode_btn: false
      }, () => {
        if (this.state.countTime === 0) {
          window.clearInterval(this.intervalcode)
          this.setState({
            Countdown: true,
            countTime: 60,
            codeBtnText: '获取验证码',
            getcode_btn: true
          })
        }
      })
    }, 1000)
  }
  componentWillUnmount () {
    window.clearInterval(this.intervalcode)
  }
  // 手机验证码
  handlPhonecheckonblur=(e) => {
    let value = e.target.value
    if (value !== '' && value !== undefined) {
      this.setState({
        phonecheck_icon: true,
        phonecheck: ''
      })
    } else {
      this.setState({
        phonecheck_icon: false,
        phonecheck: '请输入正确的短信验证码！'
      })
    }
  }
  // 用户协议
  onChangeCheck=() => {
    this.setState({
      checked: !this.state.checked,
      agree: !this.state.checked,
      submitbtn: !this.state.checked
    }, () => {
    })
  }
  // 查看用户协议
  userAgreement = () => {

  }
  // 注册成功弹出框
  hiddenModal () {
    this.setState({
      registerVisible: false
    })
  }
  // 点击表单后，改变type
  changeType = () => {
    this.setState({ type: 'password' })
  }
  saveOrSubmit =() => {
    let thiz = this
    let agree = thiz.state.agree
    thiz.props.form.validateFields((err, values) => {
      // if (values.maf_loginid === undefined) {
      //   this.setState({
      //     checkemail_icon: false,
      //     checkemail: '请输入有效的邮箱地址'
      //   })
      // }
      if (values.confirm === undefined) {
        this.setState({
          confirmpass_icon: false,
          checkconfirm: '你两次输入的密码不一致!'
        })
      }
      if (values.maf_idcard === undefined) {
        this.setState({
          idcard_icon: false,
          idcard: '请输入身份证！'
        })
      }
      if (values.maf_sad_name === undefined) {
        this.setState({
          stuname_icon: false,
          stuname: '请输入学生姓名！'
        })
      }
      if (values.maf_sad_idcard === undefined) {
        this.setState({
          stuidcard_icon: false,
          stuidcard: '请输入学生身份证！'
        })
      }
      if (values.maf_sad_account === undefined) {
        this.setState({
          stuaccount_icon: false,
          stuaccount: '请输入学生账号！'
        })
      }
      if (values.maf_sad_pwd === undefined) {
        this.setState({
          stupass_icon: false,
          stupass: '请输入学生账号密码！'
        })
      }
      if (values.maf_phone_con === undefined) {
        this.setState({
          phone_con_icon: false,
          phone_con: '请输入验证码'
        })
      }
      if (values.maf_phone === undefined) {
        this.setState({
          phone_icon: false,
          phonemsg: '请输入手机号！'
        })
      }
      if (values.maf_phone_code === undefined) {
        this.setState({
          phonecheck_icon: false,
          phonecheck: '请输入正确的验证码！'
        })
      }
      if (values.maf_phone_code !== '' && (values.maf_phone_code !== this.state.phoneCode)) {
        this.setState({
          phonecheck_icon: false,
          phonecheck: '短信验证码不正确！'
        })
        return
      }
      if (!err && agree) {
        this.registermaf(values)
        console.log('注册', values)
      }
    })
  }
  registermaf = (values) => {
    register({
      'maf_pwd': values.maf_pwd, // 注册密码
      'maf_name': values.maf_name, // 家长姓名
      'maf_idcard': values.maf_idcard, // 身份证
      'maf_sad': values.maf_sad, // 与学生关系
      'maf_sad_name': values.maf_sad_name, // 学生姓名
      'maf_sad_idcard': values.maf_sad_idcard, // 学生身份证号
      'maf_sad_account': values.maf_sad_account, // 学生账号
      'maf_sad_pwd': values.maf_sad_pwd, // 学生账号密码
      'maf_phone': values.maf_phone, // 家长电话
      // 'maf_email': values.maf_loginid, // 家长邮箱（家长邮箱和登录账号是同一个）
      'maf_phone_code': values.maf_phone_code // 手机验证码

    }, (response) => {
      this.setState({
        registerVisible: true,
        accountSucc: response.data.maf_id
      })
    })
  }
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div className='register_home'>
        <Layout>
          <div>
            <Layout.Header className='xingyun-header' style={{height: '92px', width: '100%', margin: 'auto'}}>
              <div className='xingyun-logo' style={{marginTop: '30px'}} onClick={this.handleTabChange.bind(this, '/home')} />
            </Layout.Header>
          </div>
        </Layout>
        <div className='center-view'>
          <Card title='家长注册' bordered={false} className='register-card'>
            <div>
              <Form>
                {/* <Form.Item
                  {...formItemLayout}
                  label='电子邮箱'
                >
                  {getFieldDecorator('maf_loginid', {
                    rules: [{
                      required: true, message: ' '
                    }]
                  })(
                    <Input placeholder='请输邮箱地址' onBlur={this.handlemialonblur} onChange={this.onLoginidChange} />
                  )}
                  <span className={this.state.checkemail_icon ? 'success' : 'fail'}>{this.state.checkemail}</span>
                </Form.Item> */}
                <Form.Item
                  {...formItemLayout}
                  label='密码'
                >
                  {getFieldDecorator('maf_pwd', {
                    rules: [{
                      required: true, message: ' '
                    }]
                  })(
                    <Input placeholder='请输入密码' type={this.state.type} onClick={this.changeType} onChange={this.validateToNextPassword} />
                  )}
                  <span className={this.state.checkpass_icon ? 'success' : 'fail'}>{this.state.checkpass}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='确认密码'
                >
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: ' '
                    }]
                  })(
                    <Input onBlur={this.handleConfirmBlur} type={this.state.type} onClick={this.changeType} onChange={this.compareToFirstPassword} />
                  )}
                  <span className={this.state.confirmpass_icon ? 'success' : 'fail'}>{this.state.checkconfirm}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='家长姓名'
                >
                  {getFieldDecorator('maf_name')(
                    <Input placeholder='请输入姓名' />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='家长身份证号'
                >
                  {getFieldDecorator('maf_idcard', {rules: [{required: true, message: ' '}]})(
                    <Input placeholder='请输入身份证号' onBlur={this.handlidcardonblur} />
                  )}
                  <span className={this.state.idcard_icon ? 'success' : 'fail'}>{this.state.idcard}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='与学生关系'
                >
                  {getFieldDecorator('maf_sad', {rules: [{required: true, message: '请选择'}]})(
                    <Select style={{ width: 120 }} placeholder='请选择' onChange={this.relationShip}>
                      {this.state.relationshipData.map((item, index, arr) => {
                        return <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                      })}
                    </Select>
                  )}
                  <span className={this.state.relation_icon ? 'success' : 'fail'}>{this.state.relation}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='学生姓名'
                >
                  {getFieldDecorator('maf_sad_name', {rules: [{required: true, message: ' '}]})(
                    <Input placeholder='请输入学生姓名' onBlur={this.handstudeonblur} />
                  )}
                  <span className={this.state.stuname_icon ? 'success' : 'fail'}>{this.state.stuname}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='学生身份证号'
                >
                  {getFieldDecorator('maf_sad_idcard', {rules: [{required: true, message: ' '}]})(
                    <Input placeholder='请输入学生身份证号' onBlur={this.handlStuIdonblur} />
                  )}
                  <span className={this.state.stuidcard_icon ? 'success' : 'fail'}>{this.state.stuidcard}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='学生账号'
                >
                  {getFieldDecorator('maf_sad_account', {rules: [{required: true, message: ' '}]})(
                    <Input placeholder='请输入学生账号' onBlur={this.handlStuaccountonblur} />
                  )}
                  <span className={this.state.stuaccount_icon ? 'success' : 'fail'}>{this.state.stuaccount}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='学生账号密码'
                >
                  {getFieldDecorator('maf_sad_pwd', {rules: [{required: true, message: ' '}]})(
                    <Input placeholder='请输入学生账号密码' onBlur={this.handlStuPassonblur} />
                  )}
                  <span className={this.state.stupass_icon ? 'success' : 'fail'}>{this.state.stupass}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='验证码'
                >
                  {getFieldDecorator('maf_phone_con', {rules: [{required: false, message: ' '}]})(
                    <Input type='text' id='code_input' placeholder='请输入验证码' onBlur={(e) => { this.handlPhonecodeonblur(e.target.value) }} />
                  ) }
                  <button id='my_button'style={{display: 'none'}} />
                  <span className={this.state.phone_con_icon ? 'success succ' : 'fail false'}>{this.state.phone_con}</span>
                  <div id='v_container' style={{width: 100, height: 40}} />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='手机号'
                >
                  {getFieldDecorator('maf_phone', {rules: [{required: true, message: ' '}]})(
                    <Input placeholder='请输入手机号'onBlur={(e) => { this.handlPhoneonblur(e.target.value) }} />
                  )}
                  <Button className='maf_phone' style={{width: 92}} disabled={!this.state.getcode_btn} onClick={this.getPhoneCode}>{this.state.codeBtnText}</Button>
                  <span className={this.state.phone_icon ? '' : 'fail'}>{this.state.phonemsg}</span>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label='短信验证码'
                >
                  {getFieldDecorator('maf_phone_code', {rules: [{required: true, message: ' '}]})(
                    <Input onBlur={this.handlPhonecheckonblur} />
                  )}
                  <span className={this.state.phonecheck_icon ? '' : 'fail'}>{this.state.phonecheck}</span>
                </Form.Item>
              </Form>
              <Checkbox
                checked={this.state.checked}
                onChange={this.onChangeCheck}
                className='check-box'
              />
              <div className='agree'>我同意并遵守<a onClick={this.userAgreement}>《星云教育平台服务协议》</a></div>
              <div className='submitbtn'>
                <Button key='save' disabled={!this.state.submitbtn} className={this.state.submitbtn ? '' : 'subdis'} onClick={this.saveOrSubmit.bind(this)}>立即注册</Button>
              </div>
            </div>
          </Card>
        </div>
        <BottomHeader />
        {
          this.state.registerVisible
            ? <RegisterModal
              visible={this.state.registerVisible}
              hiddenModal={this.hiddenModal.bind(this)}
              account={this.state.accountSucc}
            /> : ''
        }
      </div>
    )
  }
}
export default withRouter(Form.create()(Register))
