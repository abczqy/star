import React, {Fragment} from 'react'
import { Form, Modal, Input, Select, message } from 'antd'
import PropTypes from 'prop-types'
import {axios} from '../../../../utils'
import Config from 'config'

const { API_BASE_URL_V2, SERVICE_PORTAL } = Config
const FormItem = Form.Item
const Option = Select.Option

class NewUser extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  getRoleType = (type) => {
    switch (type) {
      case 1:
        return '学生'
      case 2:
        return '教师'
      case 3:
        return '学校'
      case 4:
        return '厂家'
      case 5:
        return '家长'
      case 6:
        return '代理商'
      case 7:
        return '教育机构'
      case 8:
        return '个人'
      default:
        return ''
    }
  }
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.userType = this.props.type
        axios.post(API_BASE_URL_V2 + SERVICE_PORTAL + '/user-info/insert', values).then(res => {
          if (res.data.code > 250) {
            message.success(res.data.msg)
            this.props.changeVisible(false)
          } else {
            message.error('添加失败')
          }
        })
      }
    })
  }
  render () {
    const { form, visible, changeVisible, type } = this.props
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
    let title = `新增${this.getRoleType(type)}`
    return (
      <Modal visible={visible}
        onCancel={() => changeVisible(false)}
        onOk={this.onOk}
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
            {getFieldDecorator('phoneNumber', {
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
          {this.props.type === 2 && <Fragment>
            <FormItem label='职位' {...formItemLayout}>
              {getFieldDecorator('infoTeacherModel.position')(<Input />)}
            </FormItem>
            <FormItem label='教龄' {...formItemLayout}>
              {getFieldDecorator('infoTeacherModel.schoolAge')(<Input />)}
            </FormItem>
            <FormItem label='科目' {...formItemLayout}>
              {getFieldDecorator('infoTeacherModel.subject')(<Input />)}
            </FormItem>
            <FormItem label='备注' {...formItemLayout}>
              {getFieldDecorator('infoTeacherModel.remarks')(<Input />)}
            </FormItem>
          </Fragment>}
          {this.props.type === 1 && <Fragment>
            <FormItem label='班号' {...formItemLayout}>
              {getFieldDecorator('infoStudentModel.classNumber')(<Input />)}
            </FormItem>
            <FormItem label='年级' {...formItemLayout}>
              {getFieldDecorator('infoStudentModel.grade')(<Input />)}
            </FormItem>
            <FormItem label='备注' {...formItemLayout}>
              {getFieldDecorator('infoStudentModel.remarks')(<Input />)}
            </FormItem>
          </Fragment>}
          {this.props.type === 5 && <Fragment>
            <FormItem label='家庭角色' {...formItemLayout}>
              {getFieldDecorator('infoParentModel.familyRole')(<Select>
                <Option value='1'>父亲</Option>
                <Option value='2'>母亲</Option>
                <Option value='3'>祖父母</Option>
                <Option value='4'>外祖父母</Option>
                <Option value='5'>亲属</Option>
                <Option value='6'>其他</Option>
              </Select>)}
            </FormItem>
            <FormItem label='备注' {...formItemLayout}>
              {getFieldDecorator('infoParentModel.remarks')(<Input />)}
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
  type: PropTypes.number
}

export default Form.create()(NewUser)
