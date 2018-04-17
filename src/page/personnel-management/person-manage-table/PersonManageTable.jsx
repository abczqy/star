/**
 * 人员管理-表格
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import axios from 'axios'
import ajaxUrl from 'config'
import { Table } from 'antd'
import './PersonManageTable.scss'

class PersonManageTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {}
    }
    this.columns = [{
      title: '教师姓名',
      dataIndex: 'name'
      // width: 150
    }, {
      title: '账号',
      dataIndex: 'username'
      // width: 150
    }, {
      title: '性别',
      dataIndex: 'sex'
      // width: 150
    }, {
      title: '身份证号码',
      dataIndex: 'th_idcard'
      // width: 150
    }, {
      title: '教学年级',
      dataIndex: 'grad'
      // width: 150
    }, {
      title: '执教时间',
      dataIndex: 'date',
      render: date => moment(date).format('YYYY-MM-DD')
      // width: 150
    }, {
      title: '行政职务',
      dataIndex: 'duty'
      // width: 150
    }, {
      title: '联系方式',
      dataIndex: 'phone'
      // width: 150
    }, {
      title: '操作',
      dataIndex: 'id',
      render: id => (
        <div className='opt-box' >
          <span className='edit'>编辑</span>
          <span className='delete'>删除</span>
        </div>
      )
      // width: 150
    }]
  }

  // 获取人员列表数据
  getPeopleDatas = (params) => {
    axios.get(ajaxUrl.personnelManagement, {
      params: {
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        text: params.text
      }
    }).then(res => {
      let data = res.data
      this.setState({
        tableData: {
          data: data.data,
          total: data.total
        }
      })
    }).catch(e => { console.log(e) })
  }

  componentDidMount () {
    this.getPeopleDatas(this.props.tableParams)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.tableParams !== nextProps.tableParams) {
      this.getPeopleDatas(nextProps.tableParams)
    }
  }

  render () {
    const { tableData } = this.state
    return (
      <Table
        rowKey='id'
        className='data-table'
        dataSource={tableData.data}
        columns={this.columns}
        pagination={{
          total: tableData.total,
          showQuickJumper: true,
          showSizeChanger: true,
          onShowSizeChange: this.props.onShowSizeChange,
          onChange: this.props.pageNumChange,
          current: this.props.tableParams.pageNum
        }}
      />
    )
  }
}
PersonManageTable.propTypes = {
  onShowSizeChange: PropTypes.func,
  tableParams: PropTypes.object,
  pageNumChange: PropTypes.func
}
export default PersonManageTable
