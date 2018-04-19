/**
 * 人员管理-表格
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import axios from 'axios'
import ajaxUrl from 'config/index'
import { Table, Modal } from 'antd'
import './PersonManageTable.scss'

class PersonManageTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {},
      tableColumns: [],
      editModalVisible: false
    }
  }

  getColumns = (role) => {
    let columnsObj = {
      teacher: [{
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
        render: (id, record) => (
          <div className='opt-box' >
            <span className='edit' onClick={() => { this.openEditModal(record, 'teacher') }} >编辑</span>
            <span className='delete' onClick={() => { this.delete(id, 'teacher') }}>删除</span>
          </div>
        )
        // width: 150
      }],
      student: [{
        title: '学生姓名',
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
        title: '年级',
        dataIndex: 'grad'
        // width: 150
      }, {
        title: '班级',
        dataIndex: 'class'
        // width: 150
      }, {
        title: '紧急联系人',
        dataIndex: 'contact'
        // width: 150
      }, {
        title: '与本人关系',
        dataIndex: 'relationship '
        // width: 150
      }, {
        title: '紧急联系人联系方式',
        dataIndex: 'phone'
        // width: 150
      }, {
        title: '操作',
        dataIndex: 'id',
        render: (id, record) => (
          <div className='opt-box' >
            <span className='edit' onClick={() => { this.openEditModal(record, 'student') }} >编辑</span>
            <span className='delete' onClick={() => { this.delete(id, 'student') }}>删除</span>
          </div>
        )
        // width: 150
      }]
    }
    let columns = columnsObj[role]
    this.setState({
      tableColumns: columns
    })
  }

  // 获取人员列表数据
  getPeopleDatas = (params, role) => {
    let url = role === 'teacher' ? 'teacherManagement' : 'studentManagement'
    let reqUrl = ajaxUrl[url]
    // console.log(reqUrl)
    axios.get(reqUrl, {
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

  // 打开编辑弹窗
  openEditModal=(record, role) => {
    // console.log(record, role)
    this.setState({
      editModalVisible: true
    })
  }

  // 取消编辑
  editCancel=() => {
    this.setState({
      editModalVisible: false
    })
  }

  // 删除
  delete=(id, role) => {
    console.log('删除', id, role)
  }

  componentDidMount () {
    this.getPeopleDatas(this.props.tableParams, 'teacher')
    this.getColumns('teacher')
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.tableParams !== nextProps.tableParams) {
      this.getPeopleDatas(nextProps.tableParams, this.props.role)
    }
    if (this.props.role !== nextProps.role) {
      this.getColumns(nextProps.role)
      this.getPeopleDatas(this.props.tableParams, nextProps.role)
    }
  }

  render () {
    const { tableData } = this.state
    return (
      <div className='person-manage-table' >
        <Table
          rowKey='id'
          className='data-table'
          dataSource={tableData.data}
          columns={this.state.tableColumns}
          pagination={{
            total: tableData.total,
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.props.onShowSizeChange,
            onChange: this.props.pageNumChange,
            current: this.props.tableParams.pageNum
          }}
        />
        <Modal
          title='编辑'
          visible={this.state.editModalVisible}
          onOk={this.editOk}
          onCancel={this.editCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}
PersonManageTable.propTypes = {
  onShowSizeChange: PropTypes.func,
  tableParams: PropTypes.object,
  pageNumChange: PropTypes.func,
  role: PropTypes.string
}
export default PersonManageTable
