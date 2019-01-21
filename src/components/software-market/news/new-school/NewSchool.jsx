import React from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const Option = Select.Option

class NewSchool extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const { getFieldDecorator } = this.props.form
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
      <div className='new-school'>
        <Form>
          <FormItem label='学校名称' {...formItemLayout}>
            {getFieldDecorator('schoolName', {
              rules: [{required: true, message: '请填写学校名称'}]
            })(<Input placeHolder='请输入账号名' />)}
          </FormItem>
          <FormItem label='学校地址' {...formItemLayout}>
            {getFieldDecorator('address', {
              rules: [{required: true, message: '请输入学校地址'}]
            })(<Input placeHolder='请输入学校地址' />)}
          </FormItem>
          <FormItem label={'联系方式'} {...formItemLayout}>
            {getFieldDecorator('connect')(
              <Input placeHolder='请输入联系电话' />
            )}
          </FormItem>
          <FormItem label={'所属机构'} {...formItemLayout}>
            {getFieldDecorator('belong')(
              <Select placeHolder='请选择所属机构'>
                <Option value={'1'}>xx教育局</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </div>
    )
  }
}

NewSchool.propTypes = {
  form: PropTypes.object
}

export default Form.create()(NewSchool)
