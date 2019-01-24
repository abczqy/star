import React from 'react'
import { Modal, Input, Form, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import './NewAgent.scss'

const FormItem = Form.Item

class NewAgent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
      // province: '',
      // city: '',
      // region: ''
    }
  }
  // changeProvince = (name, value) => {
  //   if (name === 'province') {
  //     this.setState({
  //       [name]: value,
  //       city: '',
  //       region: ''
  //     })
  //   } else if (name === 'city') {
  //     this.setState({
  //       city: value,
  //       region: ''
  //     })
  //   } else {
  //     this.setState({
  //       region: value
  //     })
  //   }
  // }
  render () {
    const { visible, changeVisible, form, onOk } = this.props
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
        destroyOnClose
        centered
        title='新增代理商'
        width={650}>
        {/* <div className='new-agent-item'>
          <span className='label'>代理商名称</span>
          <Input className='input' onChange={(e) => this.setState({name: e.target.value})} />
        </div>
        <div className='new-agent-item'>
          <span className='label'>所属区域</span>
          <RegionSelect ref='address' width={440} />
        </div> */}
        <Form>
          <FormItem label='代理商名称' {...formItemLayout}>
            {getFieldDecorator('agentName', {
              rules: [{required: true, message: '请填写代理商名称'}],
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='学段' {...formItemLayout}>
            {getFieldDecorator('grade', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='代理区域' {...formItemLayout}>
            {getFieldDecorator('agentArea', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='地址' {...formItemLayout}>
            {getFieldDecorator('agentAddress')(<Input />)}
          </FormItem>
          <FormItem label='税号' {...formItemLayout}>
            {getFieldDecorator('agentTaxNum', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='法人' {...formItemLayout}>
            {getFieldDecorator('juridicalPerson', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='代理网址' {...formItemLayout}>
            {getFieldDecorator('agentWebsite', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='注册ID' {...formItemLayout}>
            {getFieldDecorator('companyRegistationId', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='联系邮箱' {...formItemLayout}>
            {getFieldDecorator('agentRegistationId', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
          <FormItem label='创立时间' {...formItemLayout}>
            {getFieldDecorator('establishingTime', {
              initialValue: ''
            })(<DatePicker />)}
          </FormItem>
          <FormItem label='代理简介' {...formItemLayout}>
            {getFieldDecorator('agentIntroduction', {
              initialValue: ''
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

NewAgent.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  changeVisible: PropTypes.func,
  form: PropTypes.object
}

export default Form.create()(NewAgent)
