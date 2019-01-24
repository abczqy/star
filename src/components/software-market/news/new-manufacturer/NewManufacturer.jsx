import React from 'react'
import { Form, Modal, Input, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import RegionSelect from 'components/common/RegionSelect'

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
        width={600}
      >
        <Form>
          <FormItem label='厂商名称' {...formItemLayout}>
            {getFieldDecorator('companyName', {
              rules: [{required: true, message: '请输入厂商名称'}]
            })(<Input />)}
          </FormItem>
          <FormItem label='厂商地址' {...formItemLayout}>
            {getFieldDecorator('companyAddress', {
              initialValue: {province: '', city: '', region: ''}
            })(<RegionSelect />)}
          </FormItem>
          <FormItem label='厂商税号' {...formItemLayout}>
            {getFieldDecorator('companyTaxNum', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='厂商法人' {...formItemLayout}>
            {getFieldDecorator('juridicalPerson', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='厂商网址' {...formItemLayout}>
            {getFieldDecorator('companyWebsite', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='厂商注册号' {...formItemLayout}>
            {getFieldDecorator('companyRegistationId', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='厂商邮箱' {...formItemLayout}>
            {getFieldDecorator('companyEmail', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='厂商简介' {...formItemLayout}>
            {getFieldDecorator('companyIntroduction', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='创建时间' {...formItemLayout}>
            {getFieldDecorator('establishingTime', {
              initialValue: ''
            })(<DatePicker />)}
          </FormItem>
          <FormItem label='备注' {...formItemLayout}>
            {getFieldDecorator('remarks', {
              initialValue: ''
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
