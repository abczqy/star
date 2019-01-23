import React, {Fragment} from 'react'
import { Form, Modal, Input, Select } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const Option = Select.Option

class NewUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { form, visible, changeVisible, onOk, type } = this.props
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
    let title = `新增${type}`
    return (
      <Modal visible={visible}
        onCancel={() => changeVisible(false)}
        onOk={onOk}
        centered
        destroyOnClose
        title={title}
        width={600}
      >
        <Form>
          <FormItem label='姓名' {...formItemLayout}>
            {getFieldDecorator('userName', {
              rules: [{required: true, message: '请输入姓名'}]
            })(<Input />)}
          </FormItem>
          <FormItem label='性别' {...formItemLayout}>
            {getFieldDecorator('gender')(<Select>
              <Option value={'男'}>男</Option>
              <Option value={'女'}>女</Option>
            </Select>)}
          </FormItem>
          <FormItem label='电话号码' {...formItemLayout}>
            {getFieldDecorator('phoneNumber ', {
              rules: [{required: true, message: '请输入电话号码'}]
            })(<Input />)}
          </FormItem>
          <FormItem label='证件类型' {...formItemLayout}>
            {getFieldDecorator('certificateType')(<Select>
              <Option value={1}>身份证</Option>
              <Option value={2}>护照</Option>
              <Option value={3}>驾驶证</Option>
            </Select>)}
          </FormItem>
          <FormItem label='证件号' {...formItemLayout}>
            {getFieldDecorator('certificateNumber')(<Input />)}
          </FormItem>
          <FormItem label='邮箱' {...formItemLayout}>
            {getFieldDecorator('mailAddress')(<Input />)}
          </FormItem>
          <FormItem label='地址' {...formItemLayout}>
            {getFieldDecorator('address')(<Input />)}
          </FormItem>
          <FormItem label='学校ID' {...formItemLayout}>
            {getFieldDecorator('organizationId')(<Input />)}
          </FormItem>
          {this.props.type === '老师' && <Fragment>
            <FormItem label='职位' {...formItemLayout}>
              {getFieldDecorator('InfoTeacherModel.position')(<Input />)}
            </FormItem>
            <FormItem label='教龄' {...formItemLayout}>
              {getFieldDecorator('InfoTeacherModel.schoolAge')(<Input />)}
            </FormItem>
            <FormItem label='科目' {...formItemLayout}>
              {getFieldDecorator('InfoTeacherModel.subject')(<Input />)}
            </FormItem>
            <FormItem label='备注' {...formItemLayout}>
              {getFieldDecorator('InfoTeacherModel.remarks')(<Input />)}
            </FormItem>
          </Fragment>}
          {this.props.type === '学生' && <Fragment>
            <FormItem label='班号' {...formItemLayout}>
              {getFieldDecorator('infoStudentModel.classNumber')(<Input />)}
            </FormItem>
            <FormItem label='年级' {...formItemLayout}>
              {getFieldDecorator('infoStudentModel.grade')(<Input />)}
            </FormItem>
            <FormItem label='备注' {...formItemLayout}>
              {getFieldDecorator('InfoTeacherModel.remarks')(<Input />)}
            </FormItem>
          </Fragment>}
        </Form>
      </Modal>
    )
  }
}

NewUser.propTypes = {
  form: PropTypes.object,
  visible: PropTypes.bool,
  changeVisible: PropTypes.func,
  onOk: PropTypes.func,
  type: PropTypes.string
}

export default Form.create()(NewUser)
