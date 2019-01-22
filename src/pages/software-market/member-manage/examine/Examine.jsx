/**
 * 审核用户
 */
import React from 'react'
import {Input, Button, Table} from 'antd'
import {axios} from '../../../../utils'
import config from '../../../../config/index'
import '../free-register/FreeRegister.scss'

const { API_BASE_URL_V2 } = config

class Examine extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 10
      },
      total: 0,
      searches: {}
    }
  }
  getTable = () => {
    axios.get(API_BASE_URL_V2 + '').then(res => {
      const data = res.data.data
      console.log(data)
    })
  }
  handleChange = (pagination) => {
    this.setState({
      pagination
    }, () => {
      this.getTable()
    })
  }
  /** 每页展示数量变化 */
  onShowSizeChange = (current, size) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageSize: size
      }
    }, () => {
      this.getTable()
    })
  }
  changeVisible = (visible) => {
    this.setState({visible})
  }
  /** 新增代理确认 */
  onOk = () => {}
  /** 修改搜索条件 */
  changeSearch = (name, value) => {
    const searches = {...this.state.searches}
    searches[name] = value
    this.setState({searches})
  }
  getColumns = () => {
    return [
      {
        title: '账号',
        dataIndex: 'account'
      },
      {
        title: '用户类型',
        dataIndex: ''
      },
      {
        title: '身份证',
        dataIndex: ''
      },
      {
        title: '联系方式',
        dataIndex: ''
      },
      {
        title: '申请用户',
        dataIndex: ''
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return <div className='operation-items'>
            <span>详情</span>
            <span>通过</span>
          </div>
        }
      }
    ]
  }
  handleToLogin = (record) => {}
  render () {
    const { data, total, pagination } = this.state
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows)
      }
    }
    return (
      <div className='free-register'>
        <div className='search-bar-wrap'>
          <div className='search-bar-item'>
            <span className='input-label'>
              账号
            </span>
            <Input className='input' onChange={(e) => this.changeSearch('name', e.target.value)} />
          </div>
          <div className='search-bar-item'>
            <span className='input-label'>
              用户类型
            </span>
            <Input className='input' onChange={(e) => this.changeSearch('field', e.target.value)} />
          </div>
          <div className='search-bar-item'>
            <span className='input-label'>
              联系方式
            </span>
            <Input className='input' onChange={(e) => this.changeSearch('connect', e.target.value)} />
          </div>
          <div className='search-bar-buttons'>
            <Button htmlType='button' className='search-bar-btn' type='primary' onClick={this.getTable}>搜索</Button>
          </div>
          <div style={{clear: 'both'}} />
        </div>
        <Table rowKey={(text, record, index) => index + (pagination.current - 1) * pagination.pageNum}
          dataSource={data}
          columns={this.getColumns()}
          pagination={{
            ...pagination,
            onChange: this.handleChange,
            defaultPageSize: 10,
            total,
            onShowSizeChange: this.onShowSizeChange
          }}
          rowSelection={rowSelection}
        />
      </div>
    )
  }
}

Examine.propTypes = {}

export default Examine
