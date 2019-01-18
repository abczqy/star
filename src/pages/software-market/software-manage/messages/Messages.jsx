import React from 'react'
import PagingTable from 'components/common/PagingTable'
import {Button, Modal, Select, Input} from 'antd'

const Option = Select.Option

class Messages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [
        {to: 'cj_0', content: '发送内容', title: '消息标题'}
      ],
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
      {title: '发送对象', dataIndex: 'to'},
      {title: '信息标题', dataIndex: 'title'},
      {title: '信息内容', dataIndex: 'content'}
    ]
  }
  onOk = () => {
    this.setState({
      visible: false,
      message: {
        title: '',
        user: '1',
        content: ''
      }
    })
  }
  render () {
    const { tableData, loading, visible } = this.state
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
        />
        <Modal visible={visible} centered width={500} onCancel={() => this.setState({visible: false})} onOk={this.onOk}>
          <div>
            发送对象：
            <Select defaultValue={'1'} onChange={(value) => this.setState({message: {...this.state.message, user: value}})}>
              <Option value={'1'}>学生</Option>
              <Option value={'2'}>老师</Option>
              <Option value={'3'}>家长</Option>
            </Select>
          </div>
          <div>
            信息标题
            <Input onChange={(value) => this.setState({message: {...this.state.message, title: value}})} />
          </div>
          <div>
            信息内容
            <Input type='textarea' rows={4} onChange={(value) => this.setState({message: {...this.state.message, content: value}})} />
          </div>
        </Modal>
      </div>
    )
  }
}

Messages.propTypes = {}

export default Messages
