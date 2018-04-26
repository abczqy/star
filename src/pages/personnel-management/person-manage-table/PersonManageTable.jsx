/**
 * 人员管理-表格
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import axios from 'axios'
import _ from 'lodash'
import ajaxUrl from 'config/index'
import { Table, Modal, Input, Form, Button, DatePicker } from 'antd'
import './PersonManageTable.scss'

const FormItem = Form.Item
const teacherColumns = {
  th_name: '教师姓名',
  th_loginid: '账号',
  th_sex: '性别',
  th_idcard: '身份证号码',
  th_class: '教学年级',
  th_time: '执教时间',
  th_duty: '行政职务',
  th_phone: '联系方式'
}

const studentColumns = {
  name: '学生姓名',
  username: '账号',
  sex: '性别',
  grad: '年级',
  class: '班级',
  contact: '紧急联系人',
  relationship: '与本人关系',
  phone: '紧急联系人联系方式'
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
      axios.post(ajaxUrl.teacherUpdate, {
        'th_id': id
      }).then((response) => {
      })
    } else {
      axios.post(ajaxUrl.teacherUpdate, {
        'th_id': id
      }).then((response) => {
      })
    }
    console.log('删除', id, role)
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
            span: 5
          },
          wrapperCol: {
            span: 19
          }
        }
      } else if (this.role === 'student') {
        columns = studentColumns
        formItemLayout = {
          labelCol: {
            span: 7
          },
          wrapperCol: {
            span: 17
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
            {this.props.form.getFieldDecorator(item, {
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
          axios.post(ajaxUrl.teacherUpdate, {
            'th_name': values.th_name,
            'th_loginid': values.th_loginid,
            'th_sex': values.th_sex,
            'th_idcard': values.th_idcard,
            'th_class': values.th_class,
            'th_time': moment(values.th_time).format('YYYY-MM-DD'),
            'th_duty': values.th_duty,
            'th_phone': values.th_phone,
            'th_id': this.editRecord.th_id
          }).then((response) => {
            this.editCancel()
          })
        } else {
          axios.post(ajaxUrl.teacherUpdate, {
            'th_name': values.th_name,
            'th_loginid': values.th_loginid,
            'th_sex': values.th_sex,
            'th_idcard': values.th_idcard,
            'th_class': values.th_class,
            'th_time': values.th_time,
            'th_duty': values.th_duty,
            'th_phone': values.th_phone,
            'th_id': this.editRecord.th_id
          }).then((response) => {
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
  onCancel: PropTypes.func
}

const PersonManageForm = Form.create()(PersonManageTable)

export default PersonManageForm
