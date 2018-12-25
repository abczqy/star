/**
 * 人员管理-表格
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import { Table, Modal, Input, Form, Button, DatePicker, message, Popconfirm } from 'antd'
import './PersonManageTable.scss'
import {applicationteacherlist, teacherUpdate, teacherDelete, sutdentUpdate, sutdentDelete} from '../../../services/topbar-mation'
import config from '../../../config/index'
const {API_BASE_URL} = config
const FormItem = Form.Item
const teacherColumns = {
  th_name: '教师姓名',
  // th_id: '账号',
  th_sex: '性别',
  th_idcard: '身份证号码',
  th_grade: '教学年级',
  th_time: '执教时间',
  th_duty: '行政职务',
  th_phone: '联系方式'
}

const studentColumns = {
  stu_name: '学生姓名',
  // stu_id: '账号',
  stu_sex: '性别',
  stu_grade: '年级',
  stu_class: '班级',
  maf_name: '紧急联系人',
  maf_stu_sad: '与本人关系',
  maf_phone: '紧急联系人联系方式'
}

class PersonManageTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {},
      tableColumns: [],
      editModalVisible: false

    }
    this.editRecord = {}
    this.role = 'teacher'
  }

  getColumns = (role) => {
    let columnsObj = {
      teacher: [{
        title: '教师姓名',
        dataIndex: 'th_name',
        key: '1'
        // width: 150
      }, {
        title: '账号',
        dataIndex: 'th_id',
        key: '2'
        // width: 150
      }, {
        title: '性别',
        dataIndex: 'th_sex',
        key: '3'
        // width: 150
      }, {
        title: '身份证号码',
        dataIndex: 'th_idcard',
        key: '4'
        // width: 150
      }, {
        title: '教学年级',
        dataIndex: 'th_grade',
        key: '5'
        // width: 150
      }, {
        title: '执教时间',
        dataIndex: 'th_time',
        key: '6',
        render: date => moment(date).format('YYYY-MM-DD')
        // width: 150
      }, {
        title: '行政职务',
        dataIndex: 'th_duty',
        key: '7'
        // width: 150
      }, {
        title: '联系方式',
        dataIndex: 'th_phone',
        key: '8'
        // width: 150
      }, {
        title: '操作',
        dataIndex: 'id',
        key: 'op',
        render: (id, record) => (
          <div className='opt-box' >
            <span className='edit' onClick={() => { this.openEditModal(record, 'teacher') }} >编辑</span>
            <Popconfirm placement='top' title='确认删除？' onConfirm={() => { this.delete(record.th_id, 'teacher') }} okText='删除' cancelText='取消'>
              <span className='delete'>删除</span>
            </Popconfirm>
            <span onClick={this.props.onUpload}>模板下载</span>
          </div>
        )
        // width: 150
      }],
      student: [{
        title: '学生姓名',
        dataIndex: 'stu_name',
        key: 'stu_name'
        // width: 150
      }, {
        title: '账号',
        dataIndex: 'stu_id',
        key: 'stu_id'
        // width: 150
      }, {
        title: '性别',
        dataIndex: 'stu_sex',
        key: 'stu_sex'
        // width: 150
      }, {
        title: '年级',
        dataIndex: 'stu_grade',
        key: 'stu_grade'
        // width: 150
      }, {
        title: '班级',
        dataIndex: 'stu_class',
        key: 'stu_class'
        // width: 150
      }, {
        title: '紧急联系人',
        dataIndex: 'maf_name',
        key: 'maf_name'
        // width: 150
      }, {
        title: '与本人关系',
        dataIndex: 'maf_stu_sad ',
        key: 'maf_stu_sad'
        // width: 150
      }, {
        title: '紧急联系人联系方式',
        dataIndex: 'maf_phone',
        key: 'maf_phone'
        // width: 150
      }, {
        title: '操作',
        dataIndex: 'id',
        key: 'd',
        render: (id, record) => (
          <div className='opt-box' >
            <span className='edit' onClick={() => { this.openEditModal(record, 'student') }} >编辑</span>
            <Popconfirm placement='top' title='确认删除？' onConfirm={() => { this.delete(record.stu_id, 'student') }} okText='删除' cancelText='取消'>
              <span className='delete'>删除</span>
            </Popconfirm>
            <span onClick={this.props.onUpload}>模板下载</span>
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
    let url = role === 'teacher' ? API_BASE_URL + '/application/teacherlist' : API_BASE_URL + '/application/studentlist'
    // console.log(reqUrl)
    applicationteacherlist({
      pageNum: params.pageNum,
      pageSize: params.pageSize,
      th_info: params.text
    }, url, (response) => {
      let data = response.data
      this.setState({
        tableData: {
          data: data.list,
          total: data.total
        }
      })
    }
    )
  }

  // 打开编辑弹窗
  openEditModal = (record, role) => {
    // console.log(record, role)
    this.setState({
      editModalVisible: true
    })
    this.editRecord = record
    this.role = role
  }

  // 取消编辑
  editCancel = () => {
    this.setState({
      editModalVisible: false
    })
  }

  // 删除
  delete = (id, role) => {
    if (role === 'teacher') {
      teacherDelete({
        'th_id': id
      }, (response) => {
        message.success('删除成功！')
        this.getPeopleDatas(this.props.tableParams, 'teacher')
      })
    } else {
      sutdentDelete({
        'stu_id': id
      }, (response) => {
        message.success('删除成功！')
        this.getPeopleDatas(this.props.tableParams, 'student')
      })
    }
  }

  // 创建编辑表单
  createEditForm = () => {
    // console.log(studentColumns)
    if (_.isEmpty(this.editRecord)) {
      return ''
    } else {
      let columns = ''
      let formItemLayout = { }
      if (this.role === 'teacher') {
        columns = teacherColumns
        formItemLayout = {
          labelCol: {
            span: 7
          },
          wrapperCol: {
            span: 14
          }
        }
      } else if (this.role === 'student') {
        columns = studentColumns
        formItemLayout = {
          labelCol: {
            span: 7
          },
          wrapperCol: {
            span: 14
          }
        }
      }
      let rows = []
      for (var item in columns) {
        let row = (
          <FormItem
            {...formItemLayout}
            label={`${columns[item]}:`}
            key={item}
          >
            {this.props.form.getFieldDecorator(item, item === 'th_time' ? {
              initialValue: moment(this.editRecord[item], 'YYYY-MM-DD')
            } : {
              initialValue: this.editRecord[item]
            })(
              item === 'th_time' ? <DatePicker format='YYYY-MM-DD'
                style={{width: '100%'}}placeholder={`请输入${columns[item]}`} /> : <Input placeholder={`请输入${columns[item]}`} />
            )}
          </FormItem>
        )
        rows.push(row)
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          {rows}
          <FormItem
            className='submit-box'
          >
            <Button type='primary' htmlType='submit'>
            确定
            </Button>
          </FormItem>
        </Form>
      )
    }
  }

  // 确定修改
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.role === 'teacher') {
          teacherUpdate({
            'th_name': values.th_name,
            'th_loginid': values.th_loginid,
            'th_sex': values.th_sex,
            'th_idcard': values.th_idcard,
            'th_class': values.th_class,
            'th_time': moment(values.th_time).format('YYYY-MM-DD'),
            'th_duty': values.th_duty,
            'th_phone': values.th_phone,
            'th_id': this.editRecord.th_id
          }, (response) => {
            message.success('修改信息成功！')
            this.getPeopleDatas(this.props.tableParams, 'teacher')
            this.editCancel()
          })
        } else {
          sutdentUpdate({
            'maf_name': values.maf_name,
            'maf_phone': values.maf_phone,
            'maf_stu_sad': values.maf_stu_sad,
            'stu_class': values.stu_class,
            'stu_grade': values.stu_grade,
            'stu_id': this.editRecord.stu_id,
            'stu_name': values.stu_name,
            'stu_sex': values.stu_sex
          }, (response) => {
            message.success('修改信息成功！')
            this.getPeopleDatas(this.props.tableParams, 'student')
            this.editCancel()
          })
        }
      }
    })
  }

  componentDidMount () {
    this.getPeopleDatas(this.props.tableParams, 'teacher')
    this.getColumns('teacher')
  }

  componentWillReceiveProps (nextProps) {
    if ((this.props.role === nextProps.role) && (this.props.tableParams !== nextProps.tableParams)) {
      this.getPeopleDatas(nextProps.tableParams, this.props.role)
    }
    if (this.props.updateList !== nextProps.updateList) {
      this.getPeopleDatas(nextProps.tableParams, this.props.role)
    }
    if (this.props.role !== nextProps.role) {
      this.getColumns(nextProps.role)
      this.getPeopleDatas(nextProps.tableParams, nextProps.role)
    }
  }

  render () {
    const { tableData } = this.state
    return (
      <div className='person-manage-table' >
        <Table
          rowKey={(record, index) => {
            return index
          }}
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
          destroyOnClose
          className='edit-modal'
          footer={null}
        >
          {
            this.createEditForm()
          }
        </Modal>
      </div>
    )
  }
}

PersonManageTable.propTypes = {
  onShowSizeChange: PropTypes.func,
  tableParams: PropTypes.object,
  pageNumChange: PropTypes.func,
  role: PropTypes.string,
  form: PropTypes.object,
  onCancel: PropTypes.func,
  updateList: PropTypes.number,
  onUpload: PropTypes.func
}

const PersonManageForm = Form.create()(PersonManageTable)

export default PersonManageForm
