/* 修改厂商名称 */
import React from 'react'
import {Modal, Button, Form, Input} from 'antd'
import PropTypes from 'prop-types'
import '../Operateview.scss'
class ChangeFirmName extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    form: PropTypes.object,
    getFirmList: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      type: 'text'
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.visible) {
      this.props.form.resetFields()
    }
  }
  // 获取焦点后修改input type=password
  changePasType=() => {
    this.setState({
      type: 'password'
    })
  }
  saveOrSubmit =() => {
    let thiz = this
    thiz.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('修改厂商名称', values)
        // 修改后调用刷新父页面
        this.props.getFirmList()
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
          title='修改厂商名称'
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
                label='请输入密码'
              >
                {getFieldDecorator('maf_pass', {rules: [{required: true, message: '请输入密码!'}]})(
                  <Input type={this.state.type} onClick={this.changePasType} />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='请输入厂商名称'
              >
                {getFieldDecorator('maf_firm_name', {rules: [{required: true, message: '请输入厂商名称!'}]})(
                  <Input />
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(ChangeFirmName)
