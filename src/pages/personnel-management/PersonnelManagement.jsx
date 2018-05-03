/**
 * 人员管理
 */

import React, { Component } from 'react'
import { Menu, Input, Button, Row, Col, Upload, message } from 'antd'
// import axios from 'axios'
import ajaxUrl from 'config'
import PersonManageTable from './person-manage-table/PersonManageTable'
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
      tableParams,
      inputValue: '',
      role: 'teacher'
    }
    this.uploadProps = {
      name: 'file',
      data: {name: 'teachers'}, // 参数
      action: ajaxUrl.batchImport,
      onChange (info) {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`)
        }
      }
    }
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
    })
  }

  // 下载
  templateDownload = () => {
    this.refs.downloadForm.submit()
  }

  // 切换学生和教师管理
  roleChange = (obj) => {
    if (obj.key !== this.state.role) {
      this.setState({
        role: obj.key
      })
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <div className='personnel-management center-view mtb20'>
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
            onClick={this.roleChange}
          >
            <Menu.Item key='teacher'>
              <i className='icon teacher' />
              <span>教师管理</span>
            </Menu.Item>
            <Menu.Item key='student'>
              <i className='icon student' />
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
                onPressEnter={this.search}
              />
              <Button type='primary' onClick={this.search} >搜索</Button>
            </Col>
            <Col offset={10} span={6} className='opt-box' >
              <span className='link' onClick={this.templateDownload} >模板下载</span>
              <Upload {...this.uploadProps}>
                <Button
                  className='upload-btn'
                  type='primary'
                  icon='file-add'
                >
                  批量导入
                </Button>
              </Upload>
            </Col>
          </Row>
          <PersonManageTable
            tableParams={this.state.tableParams}
            onShowSizeChange={this.onShowSizeChange}
            pageNumChange={this.pageNumChange}
            role={this.state.role}
          />
        </div>
        {/* 下载 */}
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
