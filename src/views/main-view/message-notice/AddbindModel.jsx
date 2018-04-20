/* 添加绑定弹出框 */
import React from 'react'
import {Modal, Button, Form, Input, Select} from 'antd'
import PropTypes from 'prop-types'
import '../Operateview.scss'
class AddbindModel extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    form: PropTypes.object
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
  saveOrSubmit =() => {
    let thiz = this
    thiz.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('添加绑定', values)
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
                {getFieldDecorator('maf_sad_idcard', {rules: [{required: true, message: '请输入学生身份证号'}]})(
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
