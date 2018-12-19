/* eslint-disable no-useless-return,no-undef,standard/no-callback-literal */
/* 修改手机号 */
import React from 'react'
import {Modal, Button, Form, Input, Select, Icon, Upload} from 'antd'
import PropTypes from 'prop-types'
import webStorage from 'webStorage'
import {SMSVerification} from '../../services/topbar-mation/index'
import './ChangeRileName.scss'
import pic from '../../assets/images/u28667.png'
// import {updatePhoneNum, SMSVerification} from '../../services/topbar-mation/index'
import '../../views/Operateview.scss'
const Options = ['身份证', '工作证', '军官证', '学生证', '其他']

class ChangeRileName extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    form: PropTypes.object,
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done'
      // url: ajaxUrl.IMG_BASE_URL + '/' + data.news_picture
    }]
  }
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      type: 'text',
      Countdown: true,
      countTime: 60,
      phoneCode: '', // 短信验证码
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done'
        // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }]
    }
  }

  roleTitle = (role) => {
    switch (role) {
      case 'school':
        return '学校运营者实名认证'
      case 'eduBureau':
        return '运营者实名认证'
      case 'teacher': case 'parents': case 'students': case 'agent': case 'vendor':
        return '实名认证'
      default:
        break
    }
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  componentWillReceiveProps (nextProps) {
    if (!nextProps.visible) {
      this.props.form.resetFields()
      this.setState({
        verifyCode: new GVerify('v_container')
      })
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        verifyCode: new GVerify('v_container')
      })
    }, 100)
  }
  // 点击表单后，改变type
  changeType = () => {
    this.setState({ type: 'password' })
  }
  hiddenModal=() => {
    this.props.hiddenModal()
    if (this.intervalcount) {
      window.clearInterval(this.intervalcount)
    }
  }
  // saveOrSubmit =() => {
  //   let thiz = this
  //   thiz.props.form.validateFields((err, values) => {
  //     if (values.maf_con_code !== undefined && (values.maf_con_code !== thiz.state.phoneCode)) {
  //       message.error('短信验证码不正确！')
  //       return
  //     }
  //     if (!err) {
  //       console.log('修改手机号', values)
  //       updatePhoneNum({
  //         phoneNum: values.maf_phone_number,
  //         password: values.maf_pass
  //       }, (response) => {
  //         if (response.data === true) {
  //           message.success('修改手机成功！')
  //           this.props.hiddenModal()
  //         } else {
  //           message.error(response.data.msg)
  //         }
  //       })
  //       window.clearInterval(this.intervalcount)
  //     }
  //   })
  // }
  // 校验手机
  validatePhome = (rule, value, callback) => {
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (reg.test(value)) {
      this.setState({
        phoneNum: true
      })
      callback()
    } else if (value === '' || value === undefined) {
      this.setState({
        phoneNum: false
      })
      // eslint-disable-next-line standard/no-callback-literal
      callback('请输入手机号!')
    } else {
      // eslint-disable-next-line standard/no-callback-literal
      callback('你输入的手机号不正确!')
    }
  }
  // 获取验证码
  getPhoneNumber=() => {
    const form = this.props.form
    let phoneNum = form.getFieldValue('maf_phone_number')
    let phoneCon = form.getFieldValue('maf_phone_con')
    if (phoneCon === '' || phoneCon === undefined) {
      form.validateFields(['maf_phone_con'], { force: true })
      this.setState({
        phone_con_icon: false
      })
      return
    }
    if (phoneNum === '' || phoneNum === undefined) {
      form.validateFields(['maf_phone_number'], { force: true })
    }
    form.validateFields(['maf_phone_con'], { force: true }, (err) => {
      if (err) {
        this.setState({
          phone_con_icon: false
        })
      }
    })
    if (this.state.phoneNum && this.state.phone_con_icon) {
      this.Countdown()
      this.setState({
        nextgetCode: !this.state.nextgetCode
      }, () => {
        if (this.state.nextgetCode) {
          var parent = document.getElementById('v_container')
          var child = document.getElementById('verifyCanvas')
          parent.removeChild(child)
          this.setState({
            verifyCode: new GVerify('v_container')
          })
        }
      })
      // form.setFieldsValue({maf_phone_con: ''})
      console.log(11111111111, phoneNum)
      // 请求接口获取手机验证码
      this.getPhoneCode(phoneNum)
    }
    // const form = this.props.form
    // let phoneNum = form.getFieldValue('maf_phone_number')
  }
  // 获取短信验证码
  getPhoneCode=(phoneNum) => {
    SMSVerification({'phone': phoneNum}, (response) => {
      this.setState({
        phoneCode: response.data && response.data.toString()
      })
    })
  }
  // 倒计时
  Countdown=() => {
    this.intervalcount = setInterval(() => {
      this.setState({
        Countdown: false,
        countTime: this.state.countTime - 1
      }, () => {
        if (this.state.countTime === 0) {
          window.clearInterval(this.intervalcount)
          this.setState({
            Countdown: true,
            countTime: 60
          })
        }
      })
    }, 1000)
  }
  componentWillUnmount () {
    window.clearInterval(this.intervalcount)
  }
  // 验证码
  handlPhonecodeonblur=(rule, value, callback) => {
    let verifyCode = this.state.verifyCode
    if (value) {
      var res = verifyCode.validate(value)
      if (!res) {
        callback('验证码错误!')
        this.setState({
          phone_con_icon: false,
          phone_con: ''
        })
        return
      } else {
        callback()
        this.setState({
          phone_con_icon: true,
          phone_con: ''
        })
      }
    } else {
      callback()
      this.setState({
        phone_con_icon: false,
        phone_con: ''
      })
      return
    }
  }
  render () {
    // const { fileList } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    const { getFieldDecorator } = this.props.form
    let per = webStorage.getItem('STAR_WEB_ROLE_CODE')
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    return (
      <div>
        <Modal
          title={this.roleTitle(per)}
          visible={this.props.visible}
          onCancel={this.hiddenModal}
          maskClosable={false}
          className='pass-change-modal change-phone-number'
          footer={[
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='cancle' onClick={this.hiddenModal}>取消</Button>,
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='save' type='primary' onClick={this.saveOrSubmit}>
              { per !== 'vendor' ? '确认' : '提交实名认证'}
            </Button>
          ]}
          width='40vw'
          height='30vw'
        >
          {
            per !== 'vendor'
              ? <div className='addbind-modal'>
                <Form>
                  <Form.Item
                    {...formItemLayout}
                    label='证件类型'
                    key='type'
                  >
                    {getFieldDecorator('type')(
                      <Select>
                        {
                          Options.map((item, index) => {
                            return <Select.Option key={index} value={item}>{item}</Select.Option>
                          })
                        }
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label='证件照片'
                    key='picture'
                  >
                    {getFieldDecorator('picture')(
                      <div>
                        <div className='real-name-div'>
                          <Upload
                            // action='//jsonplaceholder.typicode.com/posts/'
                            listType='picture-card'
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            className='upload-real-name'
                          >
                            {fileList.length >= 2 ? null : uploadButton}
                          </Upload>
                          <div>身份证正面照片</div>
                        </div>
                        <div className='real-name-div'>
                          <Upload
                          // action='//jsonplaceholder.typicode.com/posts/'
                            listType='picture-card'
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            className='upload-real-name'
                          >
                            {fileList.length >= 1 ? null : uploadButton}
                          </Upload>
                          <div>身份证反面照片</div>
                        </div>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                          <img alt='example' style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                      </div>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label='姓名'
                    key='name'
                  >
                    {getFieldDecorator('name')(
                      <Input />
                    )}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label='证件号码'
                    key='icard'
                  >
                    {getFieldDecorator('icard')(
                      <Input />
                    )}
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label='手机号码'
                    key='phone'
                    className='new_pass_input'
                  >
                    {getFieldDecorator('maf_phone_number', {rules: [{required: true, message: ' '}, {
                      validator: this.validatePhome
                    }],
                    validateTrigger: 'onBlur'})(
                      <Input style={{width: '60%'}} onClick={this.changeType} />
                    )}
                    <Button type='primary'style={{marginLeft: '5%', width: '35%'}} disabled={!this.state.Countdown} onClick={this.getPhoneNumber}>获取验证码</Button>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label='验证码'
                  >
                    {getFieldDecorator('maf_con_code', {rules: [{required: true, message: '请输入验证码！'}]})(
                      <Input style={{width: '60%'}} />
                    )}
                    {/* <Button type='primary' style={{marginLeft: '5%', width: '35%'}}>{this.state.countTime}</Button> */}
                  </Form.Item>
                </Form>
              </div>
              : <div>
                <div className='real-name-title'>
                  <span className='real-name'>
                    <img className='real-name-img' src={pic} />
                  </span>
                  <span className='real-name-label'>企业实名认证</span>
                  <span>平台目前已有个人用户: <span className='red-color'>2456314</span>人 是时候改变世界了~</span>
                </div>
                <div className='addbind-modal'>
                  <Form>
                    <div className='real-name-data-title'>法人身份信息</div>
                    <Form.Item
                      {...formItemLayout}
                      label='证件类型'
                      key='type'
                    >
                      {getFieldDecorator('type')(
                        <Select>
                          {
                            Options.map((item, index) => {
                              return <Select.Option key={index} value={item}>{item}</Select.Option>
                            })
                          }
                        </Select>
                      )}
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout}
                      label='证件照片'
                      key='picture'
                    >
                      {getFieldDecorator('picture')(
                        <div>
                          <div className='real-name-div'>
                            <Upload
                            // action='//jsonplaceholder.typicode.com/posts/'
                              listType='picture-card'
                              fileList={fileList}
                              onPreview={this.handlePreview}
                              onChange={this.handleChange}
                              className='upload-real-name'
                            >
                              {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <div>身份证正面照片</div>
                          </div>
                          <div className='real-name-div'>
                            <Upload
                            // action='//jsonplaceholder.typicode.com/posts/'
                              listType='picture-card'
                              fileList={fileList}
                              onPreview={this.handlePreview}
                              onChange={this.handleChange}
                              className='upload-real-name'
                            >
                              {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <div>身份证反面照片</div>
                          </div>
                          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt='example' style={{ width: '100%' }} src={previewImage} />
                          </Modal>
                        </div>
                      )}
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout}
                      label='姓名'
                      key='name'
                    >
                      {getFieldDecorator('name')(
                        <Input />
                      )}
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout}
                      label='证件号码'
                      key='icard'
                    >
                      {getFieldDecorator('icard')(
                        <Input />
                      )}
                    </Form.Item>
                    <div className='real-name-data-title'>企业证件照</div>
                    <Form.Item
                      {...formItemLayout}
                      label='社会统一信用代码'
                      key='shehuiCode'
                      className='new_pass_input'
                    >
                      {getFieldDecorator('shehuiCode')(
                        <Input />
                      )}
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout}
                      label='证件照片'
                    >
                      {getFieldDecorator('maf_con_code')(
                        <div>
                          <div className='real-name-div'>
                            <Upload
                              // action='//jsonplaceholder.typicode.com/posts/'
                              listType='picture-card'
                              fileList={fileList}
                              onPreview={this.handlePreview}
                              onChange={this.handleChange}
                              className='upload-real-name'
                            >
                              {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <div>三合一正面照</div>
                          </div>
                          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt='example' style={{ width: '100%' }} src={previewImage} />
                          </Modal>
                        </div>
                      )}
                    </Form.Item>
                    <div className='real-name-data-title'>委托书证件</div>
                    <Form.Item
                      {...formItemLayout}
                      label='证件照片'
                    >
                      {getFieldDecorator('maf_con_code')(
                        <div>
                          <div className='real-name-div'>
                            <Upload
                              // action='//jsonplaceholder.typicode.com/posts/'
                              listType='picture-card'
                              fileList={fileList}
                              onPreview={this.handlePreview}
                              onChange={this.handleChange}
                              className='upload-real-name'
                            >
                              {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <div>委托书扫描件</div>
                          </div>
                          <div className='real-name-div'>
                            <Upload
                              // action='//jsonplaceholder.typicode.com/posts/'
                              listType='picture-card'
                              fileList={fileList}
                              onPreview={this.handlePreview}
                              onChange={this.handleChange}
                              className='upload-real-name'
                            >
                              {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <div>委托书扫描件</div>
                          </div>
                          <div className='real-name-div'>
                            <Upload
                              // action='//jsonplaceholder.typicode.com/posts/'
                              listType='picture-card'
                              fileList={fileList}
                              onPreview={this.handlePreview}
                              onChange={this.handleChange}
                              className='upload-real-name'
                            >
                              {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <div>委托书扫描件</div>
                          </div>
                          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt='example' style={{ width: '100%' }} src={previewImage} />
                          </Modal>
                        </div>
                      )}
                    </Form.Item>
                  </Form>
                </div>
              </div>
          }
        </Modal>
      </div>
    )
  }
}
export default Form.create()(ChangeRileName)
