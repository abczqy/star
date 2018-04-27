/* eslint-disable no-undef,standard/no-callback-literal */
/* 添加绑定弹出框 */
import React from 'react'
import {Modal, Button, Form, Input, Select} from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'
import ajaxUrl from 'config'
import '../Operateview.scss'
class AddbindModel extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    form: PropTypes.object,
    getBindList: PropTypes.func,
    maf_id: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.state = {
      relationshipData: [{code: '1', name: '父子'}, {code: '2', name: '师生'}]
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.visible) {
      this.props.form.resetFields()
    }
  }
  // 身份证
  handlStuIdonblur=(rule, value, callback) => {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (reg.test(value)) {
      callback()
    } else if (value !== '' && value !== undefined) {
      callback('身份证格式不正确!')
    } else {
      callback()
    }
  }
  saveOrSubmit =() => {
    let thiz = this
    thiz.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('添加绑定', values)
        axios.post(ajaxUrl.relationAdd, {
          maf_id: this.props.maf_id,
          maf_sad: values.maf_sad, // 与学生的关系
          maf_sad_name: values.maf_sad_name, // 学生姓名
          maf_sad_idcard: values.maf_sad_idcard, // 学生身份证
          maf_sad_account: values.maf_sad_account, // 学生账号
          maf_sad_pwd: values.maf_sad_pwd
        }).then((response) => {
          console.log('返回学生绑定信息', response)
          this.props.hiddenModal()
        })
        // 调用父页面的查询接口更新绑定列表
        this.props.getBindList()
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
          title='添加孩子'
          visible={this.props.visible}
          onCancel={this.props.hiddenModal}
          maskClosable={false}
          className='setting-unbind-modal'
          footer={[
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='cancle' onClick={this.props.hiddenModal}>取消</Button>,
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='save' type='primary' onClick={this.saveOrSubmit.bind(this)}>添加</Button>
          ]}
          width='35vw'
          height='30vw'
        >
          <div className='addbind-modal'>
            <Form>
              <Form.Item
                {...formItemLayout}
                label='与学生关系'
              >
                {getFieldDecorator('maf_sad', {rules: [{required: true, message: '请选择'}]})(
                  <Select style={{ width: 120 }} placeholder='请选择'>
                    {this.state.relationshipData.map((item, index, arr) => {
                      return <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>
                    })}
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='学生姓名'
              >
                {getFieldDecorator('maf_sad_name', {rules: [{required: true, message: '请输入学生姓名'}]})(
                  <Input placeholder='请输入学生姓名' />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='学生身份证号'
              >
                {getFieldDecorator('maf_sad_idcard', {rules: [{required: true, message: '请输入学生身份证号'}, {validator: this.handlStuIdonblur}], validateTrigger: 'onBlur'})(
                  <Input placeholder='请输入学生身份证号' />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='学生账号'
              >
                {getFieldDecorator('maf_sad_account', {rules: [{required: true, message: '请输入学生账号'}]})(
                  <Input placeholder='请输入学生账号' />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='学生账号密码'
              >
                {getFieldDecorator('maf_sad_pwd', {rules: [{required: true, message: '请输入学生账号密码'}]})(
                  <Input placeholder='请输入学生账号密码' />
                )}
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(AddbindModel)
