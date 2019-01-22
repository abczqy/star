import React from 'react'
import { Modal, Form, Input } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item

class NewFree extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { visible, onOk, changeVisible, form } = this.props
    const { getFieldDecorator } = form
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
    return (
      <Modal visible={visible}
        onOk={onOk}
        onCancel={() => changeVisible(false)}
        centered
        title='新增用户'
        destroyOnClose>
        <Form>
          <FormItem label='账号' {...formItemLayout}>
            {getFieldDecorator('account', {
              rules: [{required: true, message: '请输入账号'}]
            })(
              <Input placeHolder='请输入账号' />
            )}
          </FormItem>
          <FormItem label='姓名' {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入姓名'}]
            })(
              <Input placeHolder='请输入姓名' />
            )}
          </FormItem>
          <FormItem label='电话' {...formItemLayout}>
            {getFieldDecorator('telephone', {
              rules: [{required: true, message: '请输入电话'}]
            })(
              <Input placeHolder='请输入电话' />
            )}
          </FormItem>
          <FormItem label='身份证号' {...formItemLayout}>
            {getFieldDecorator('identify', {
              rules: [{required: true, message: '请输入身份证号'}]
            })(
              <Input placeHolder='请输入身份证号' />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

NewFree.propTypes = {
  visible: PropTypes.bool,
  changeVisible: PropTypes.func,
  onOk: PropTypes.func,
  form: PropTypes.object
}

export default Form.create()(NewFree)
