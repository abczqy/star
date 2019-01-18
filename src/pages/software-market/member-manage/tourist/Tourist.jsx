/**
 * 用户管理-游客
 */
import React, { Component } from 'react'
import PagingTable from 'components/common/PagingTable'
import 'pages/software-market/SoftwareMarket.scss'
import config from '../../../../config/index'
import {axios} from '../../../../utils'
import { Modal, message } from 'antd'
const {API_BASE_URL_V2} = config

class Tourist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [],
      pagination: {
        pageSize: 10,
        current: 1
      },
      loading: false
    }
  }
  componentDidMount () {
    this.getTable()
  }
  /**
   * 获取表格数据
   */
  getTable = () => {
    const {pagination} = this.state
    axios.get(API_BASE_URL_V2 + '/portal/parentsOperation/examine', {
      params: {
        pageNum: pagination.current,
        pageSize: pagination.pageSize
      }
    }).then(res => {
      const data = res.data.data
      this.setState({
        tableData: data.info || [],
        pagination: {
          total: data.total
        }
      })
    })
  }
  getColumns = () => {
    return [
      {title: '账号', dataIndex: 'LOGIN_NAME'},
      {title: '家长姓名', dataIndex: 'USER_NAME'},
      {title: '电话', dataIndex: 'PHONE_NUMBER'},
      {title: '家长身份证号', dataIndex: 'CERTIFICATE_NUMBER'},
      {title: '与学生关系', dataIndex: 'RELATION'},
      {title: '学生账号', dataIndex: 'STUDENT_LOGIN_NAME'},
      {title: '主家长账号', dataIndex: 'MAIN_PARENT_LOGIN_NAME'},
      {title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return <span className='operation-click' onClick={() => this.pass(record)}>通过</span>
        }}
    ]
  }
  onChange = (page) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        current: page
      }
    }, () => {
      this.getTable()
    })
  }
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
  /**
   * 家长审核通过
   */
  pass = (record) => {
    Modal.confirm({
      content: '确认该家长通过审核？',
      onOk: () => {
        axios.post(API_BASE_URL_V2 + '/portal/parentsOperation/examine', [record.USER_ID]).then(res => {
          const data = res.data.data
          if (data === 1) {
            message.success('游客审核成功！')
            this.getTable()
          } else {
            message.error('游客审核失败')
          }
        })
      }
    })
  }

  render () {
    const { tableData, loading } = this.state
    return (
      <div className='tourist-wrapper'>
        <PagingTable
          dataSource={tableData}
          pageVisible
          columns={this.getColumns()}
          loading={loading}
          onChange={this.onChange}
          onShowSizeChange={this.onShowSizeChange}
        />
      </div>
    )
  }
}

Tourist.propTypes = {}

export default Tourist
