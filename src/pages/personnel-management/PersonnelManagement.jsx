/**
 * 人员管理
 */

import React, { Component } from 'react'
import { Menu, Input, Button, Row, Col, Table } from 'antd'
import moment from 'moment'
import axios from 'axios'
import ajaxUrl from 'config'
import './PersonnelManagement.scss'

const tableParams = {
  pageNum: 1,
  pageSize: 10,
  text: ''
}

class PersonnelManagement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      tableParams,
      inputValue: ''
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
  getPeopleDatas = () => {
    const params = this.state.tableParams
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

  // pageSize 变化的回调
  onShowSizeChange = (current, size) => {
    // console.log(current, size)
    this.setState({
      tableParams: {
        ...this.state.tableParams,
        pageNum: 1,
        pageSize: size
      },
      inputValue: this.state.tableParams.text
    }, () => {
      this.getPeopleDatas()
    })
  }

  // 页码变化的回调
  pageNumChange = (page, pageSize) => {
    this.setState({
      tableParams: {
        ...this.state.tableParams,
        pageNum: page
      },
      inputValue: this.state.tableParams.text
    }, () => {
      this.getPeopleDatas()
    })
  }

  // 搜索输入框变化的回调
  inputChange = (e) => {
    let value = e.target.value
    this.setState({
      inputValue: value
    })
  }

  // 搜索
  search = () => {
    this.setState({
      tableParams: {
        ...this.state.tableParams,
        text: this.state.inputValue,
        pageNum: 1
      }
    }, () => {
      this.getPeopleDatas()
    })
  }

  // 下载
  templateDownload=() => {
    this.refs.downloadForm.submit()
  }

  componentDidMount () {
    this.getPeopleDatas()
  }

  render () {
    const { tableData } = this.state
    return (
      <div className='personnel-management center-view'>
        {/* 侧边导航 */}
        <div className='sider'>
          <div className='sider-header'>
            <span className='title'>人员管理</span>
            <span className='sub-title'>Personnel Management</span>
          </div>
          <Menu
            defaultSelectedKeys={['teacher']}
            mode='inline'
            theme='dark'
          >
            <Menu.Item key='teacher'>
              <i className='icon' />
              <span>教师管理</span>
            </Menu.Item>
            <Menu.Item key='student'>
              <i className='icon' />
              <span>学生管理</span>
            </Menu.Item>
          </Menu>
        </div>
        {/* 右侧内容区域 */}
        <div className='content'>
          <Row className='per-header'>
            <Col span={8} className='search' >
              <Input
                placeholder='请输入员工账号或姓名'
                value={this.state.inputValue}
                onChange={this.inputChange}
              />
              <Button type='primary' onClick={this.search} >搜索</Button>
            </Col>
            <Col offset={10} span={6} className='opt-box' >
              <span className='link' onClick={this.templateDownload} >模板下载</span>
              <Button
                className='upload-btn'
                type='primary'
                icon='file-add'
                onClick={this.upload}
              >
                批量导入
              </Button>
            </Col>
          </Row>
          <Table
            rowKey='id'
            className='data-table'
            dataSource={tableData.data}
            columns={this.columns}
            pagination={{
              total: tableData.total,
              showQuickJumper: true,
              showSizeChanger: true,
              onShowSizeChange: this.onShowSizeChange,
              onChange: this.pageNumChange,
              current: this.state.tableParams.pageNum
            }}
          />
        </div>
        <iframe
          frameBorder='0'
          name='download-frame'
          style={{
            width: '0px',
            height: '0px'
          }}
        />
        <form ref='downloadForm' action={ajaxUrl.templateDownload} target='download-frame' style={{ visibility: 'none' }}>
          <input type='hidden' name='fileId' value='' />
        </form>
      </div>
    )
  }
}

export default PersonnelManagement
