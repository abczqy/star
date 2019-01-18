import React from 'react'
import PagingTable from 'components/common/PagingTable'
import {Button} from 'antd'

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
      loading: false
    }
  }
  getColumns = () => {
    return [
      {title: '发送对象', dataIndex: 'to'},
      {title: '信息标题', dataIndex: 'title'},
      {title: '信息内容', dataIndex: 'content'}
    ]
  }
  render () {
    const { tableData, loading } = this.state
    return (
      <div className='tourist-wrapper'>
        <div>
          <Button>新增消息</Button>
        </div>
        <PagingTable
          dataSource={tableData}
          pageVisible
          columns={this.getColumns()}
          loading={loading}
        />
      </div>
    )
  }
}

Messages.propTypes = {}

export default Messages
