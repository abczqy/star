/* 修改密码 */
import React from 'react'
import {Modal, Button, Form, Input} from 'antd'
import PropTypes from 'prop-types'
import '../Operateview.scss'
class ChangePass extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    form: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      type: 'text',
      lower: false,
      medium: false,
      weak: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.visible) {
      this.props.form.resetFields()
    }
  }
  // 点击表单后，改变type
  changeType = () => {
    this.setState({ type: 'password' })
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['maf_con_pass'], { force: true })
    }
    callback()
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('maf_new_pass')) {
      // eslint-disable-next-line standard/no-callback-literal
      callback('你两次输入的密码不一致!')
    } else {
      callback()
    }
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  // 密码强度
  checkPassStroung =(e) => {
    let value = e.target.value
    var strongRegex = new RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g')
    var mediumRegex = new RegExp('^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g')
    var enoughRegex = new RegExp('(?=.{6,}).*', 'g')
    if (strongRegex.test(value)) {
      this.setState({
        lower: true,
        medium: true,
        weak: true
      })
    } else if (mediumRegex.test(value)) {
      this.setState({
        lower: true,
        medium: true,
        weak: false
      })
    } else if (enoughRegex.test(value)) {
      this.setState({
        lower: true,
        medium: false,
        weak: false
      })
    }
  }
  saveOrSubmit =() => {
    let thiz = this
    thiz.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('添加绑定', values)
        this.props.hiddenModal()
      }
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
        sm: { span: 14 }
      }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Modal
          title='修改密码'
          visible={this.props.visible}
          onCancel={this.props.hiddenModal}
          maskClosable={false}
          className='pass-change-modal'
          footer={[
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='cancle' onClick={this.props.hiddenModal}>取消</Button>,
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='save' type='primary' onClick={this.saveOrSubmit.bind(this)}>确认</Button>
          ]}
          width='35vw'
          height='30vw'
        >
          <div className='addbind-modal'>
            <Form>
              <Form.Item
                {...formItemLayout}
                label='旧密码'
              >
                {getFieldDecorator('maf_old_pass', {rules: [{required: true, message: '请输入'}]})(
                  <Input type={this.state.type} placeholder='请输入' />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='新密码'
                className='new_pass_input'
              >
                {getFieldDecorator('maf_new_pass', {rules: [{required: true, message: '请输入新密码'}, {
                  validator: this.validateToNextPassword
                }],
                validateTrigger: 'onBlur'})(
                  <Input placeholder='请输入新密码'type={this.state.type} onClick={this.changeType} onChange={this.checkPassStroung} />
                )}
                <div className='passStrong'>
                  <span className={this.state.lower ? 'lower' : ''} style={{marginRight: '5%'}} />
                  <span className={this.state.medium ? 'medium' : ''} style={{marginRight: '5%'}} />
                  <span className={this.state.weak ? 'weak' : ''} /></div>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='确认新密码'
              >
                {getFieldDecorator('maf_con_pass', {rules: [{required: true, message: '请再次输入新密码'}, {
                  validator: this.compareToFirstPassword
                }],
                validateTrigger: 'onBlur'})(
                  <Input placeholder='请再次输入新密码！' onBlur={this.handleConfirmBlur} />
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(ChangePass)
