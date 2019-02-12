import React from 'react'
import PagingTable from 'components/common/PagingTable'
import {Button, Modal, Select, Input, Form, message} from 'antd'
import {axios} from '../../../../utils'
import Config from '../../../../config/index'
import PropTypes from 'prop-types'

const Option = Select.Option
const FormItem = Form.Item
const { API_BASE_URL_V2, SERVICE_PORTAL } = Config

class Messages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [],
      pagination: {
        pageSize: 10,
        pageNum: 1
      },
      loading: false,
      visible: false,
      message: {
        title: '',
        user: '1',
        content: ''
      }
    }
  }
  getColumns = () => {
    return [
      {title: '发送对象', dataIndex: 'message.targetId'},
      {title: '信息内容', dataIndex: 'message.content'}
    ]
  }
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post(`${API_BASE_URL_V2}${SERVICE_PORTAL}/messages`, values).then(res => {
          if (res.data.data) {
            message.success('消息发送成功！')
            this.setState({
              visible: false
            }, () => {
              this.getData()
            })
          } else {
            message.error('消息发送失败')
          }
        })
      }
    })
  }
  getData = () => {
    const {pagination} = this.state
    axios.get(`${API_BASE_URL_V2}${SERVICE_PORTAL}/messages`, {
      params: {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize
      }
    }).then(res => {
      const data = res.data
      if (data.code === 200) {
        this.setState({
          tableData: data.data.info
        })
      }
    })
  }
  componentDidMount () {
    this.getData()
  }
  onChange = (page) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNum: page
      }
    }, () => {
      this.getData()
    })
  }
  onShowSizeChange = (current, size) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageSize: size
      }
    }, () => {
      this.getData()
    })
  }
  render () {
    const { tableData, loading, visible } = this.state
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
      <div className='tourist-wrapper'>
        <div>
          <Button htmlType='button' onClick={() => this.setState({visible: true})}>新增消息</Button>
        </div>
        <PagingTable
          dataSource={tableData}
          pageVisible
          columns={this.getColumns()}
          loading={loading}
          onChange={this.onChange}
          onShowSizeChange={this.onShowSizeChange}
        />
        <Modal visible={visible} centered width={500} onCancel={() => this.setState({visible: false})} onOk={this.onOk}>
          <Form>
            <FormItem label={'发送对象'} {...formItemLayout}>
              {getFieldDecorator('type', {
                rules: [{required: true, message: '请选择发送对象'}]
              })(<Select>
                <Option value={0}>公告</Option>
                <Option value={1}>学生</Option>
                <Option value={2}>老师</Option>
                <Option value={5}>家长</Option>
              </Select>)}
            </FormItem>
            <FormItem label={'消息内容'} {...formItemLayout}>
              {getFieldDecorator('content', {
                rules: [{required: true, message: '请输入消息内容'}]
              })(<Input type='textArea' />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

Messages.propTypes = {
  form: PropTypes.object
}

export default Form.create()(Messages)
