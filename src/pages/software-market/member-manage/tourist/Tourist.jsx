/**
 * 用户管理-游客
 */
import React, { Component } from 'react'
import PagingTable from 'components/common/PagingTable'
import 'pages/software-market/SoftwareMarket.scss'
import config from '../../../../config/index'
import {axios} from '../../../../utils'
const {API_BASE_URL_V2} = config

class Tourist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [
        {phone: '15326952341', name: 'test', parent: 512302199302032215}
      ],
      pagination: {
        pageSize: 10,
        pageNum: 1
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
    axios.get(API_BASE_URL_V2 + '/portal/parentsOperation/examine').then(res => {
      const data = res.data.data
      console.log('表格数据: ' + data)
    })
  }
  getColumns = () => {
    return [
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

  render () {
    const { tableData, loading } = this.state
    return (
      <div className='tourist-wrapper'>
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

Tourist.propTypes = {}

export default Tourist
