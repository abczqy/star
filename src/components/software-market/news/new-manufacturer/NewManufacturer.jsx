import React from 'react'
import { Form, Modal, Input } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item

class NewManufacturer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { form, visible, changeVisible, onOk } = this.props
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
        onCancel={() => changeVisible(false)}
        onOk={onOk}
        centered
        destroyOnClose
        title='新增厂商'
      >
        <Form>
          <FormItem label='厂商名称' {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入厂商名称'}]
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

NewManufacturer.propTypes = {
  form: PropTypes.object,
  visible: PropTypes.bool,
  changeVisible: PropTypes.func,
  onOk: PropTypes.func
}

export default Form.create()(NewManufacturer)
