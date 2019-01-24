import React from 'react'
import { Modal, Form, Input } from 'antd'
import PropTypes from 'prop-types'
import RegionSelect from 'components/common/RegionSelect'

const FormItem = Form.Item

class NewEdu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { visible, form, onOk, changeVisible } = this.props
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
        title='新增教育机构'
        destroyOnClose
        centered
        width={600}
      >
        <Form>
          <FormItem {...formItemLayout} label='机构名称'>
            {getFieldDecorator('institutionName', {
              rules: [{required: true, message: '请输入机构名称'}]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label='区域'>
            {getFieldDecorator('region', {
              rules: [{required: true, message: '请输入机构名称'}],
              initialValue: { province: '', city: '', region: '' }
            })(<RegionSelect />)}
          </FormItem>
          <FormItem {...formItemLayout} label='地址'>
            {getFieldDecorator('address', {
              rules: [{required: true, message: '请输入机构名称'}]
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

NewEdu.propTypes = {
  form: PropTypes.object,
  onOk: PropTypes.func,
  changeVisible: PropTypes.func,
  visible: PropTypes.bool
}

export default Form.create()(NewEdu)
