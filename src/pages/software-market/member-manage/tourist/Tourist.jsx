/**
 * 用户管理-游客
 */
import React, { Component } from 'react'
import PagingTable from 'components/common/PagingTable'
import 'pages/software-market/SoftwareMarket.scss'
import config from '../../../../config/index'
import {axios} from '../../../../utils'
<<<<<<< HEAD
=======
import { Modal, message } from 'antd'
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
const {API_BASE_URL_V2} = config

class Tourist extends Component {
  constructor (props) {
    super(props)
    this.state = {
<<<<<<< HEAD
      tableData: [
        {phone: '15326952341', name: 'test', parent: 512302199302032215}
      ],
      pagination: {
        pageSize: 10,
        pageNum: 1
=======
      tableData: [],
      pagination: {
        pageSize: 10,
        current: 1
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
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
<<<<<<< HEAD
    axios.get(API_BASE_URL_V2 + '/portal/parentsOperation/examine').then(res => {
      const data = res.data.data
      console.log('表格数据: ' + data)
=======
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
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
    })
  }
  getColumns = () => {
    return [
<<<<<<< HEAD
      {title: '账号', dataIndex: 'test'},
      {title: '家长姓名', dataIndex: 'name'},
      {title: '电话', dataIndex: 'phone'},
      {title: '家长身份证号', dataIndex: 'parent'},
      {title: '与学生关系', dataIndex: ''},
      {title: '学生账号', dataIndex: ''},
      {title: '主家长账号', dataIndex: ''},
      {title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return <span className='operation-click'>通过</span>
        }}
    ]
  }
=======
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
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83

  render () {
    const { tableData, loading } = this.state
    return (
      <div className='tourist-wrapper'>
        <PagingTable
          dataSource={tableData}
          pageVisible
          columns={this.getColumns()}
          loading={loading}
<<<<<<< HEAD
=======
          onChange={this.onChange}
          onShowSizeChange={this.onShowSizeChange}
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
        />
      </div>
    )
  }
}

Tourist.propTypes = {}

export default Tourist
