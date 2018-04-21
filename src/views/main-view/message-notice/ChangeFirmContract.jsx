/* 修改厂商合同编号 */
import React from 'react'
import {Modal, Button, Form, Input} from 'antd'
import PropTypes from 'prop-types'
import '../Operateview.scss'
class ChangeFirmContract extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    form: PropTypes.object
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
  saveOrSubmit =() => {
    let thiz = this
    thiz.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('修改厂商描述', values)
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
                label='请输入密码'
              >
                {getFieldDecorator('maf_pass', {rules: [{required: true, message: '请输入密码!'}]})(
                  <Input type={this.state.type} />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='请输入合同编号'
              >
                {getFieldDecorator('maf_contract_number', {rules: [{required: true, message: '请输入合同编号!'}]})(
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
export default Form.create()(ChangeFirmContract)
