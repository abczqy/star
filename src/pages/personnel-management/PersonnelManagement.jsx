/**
 * 人员管理
 */

import React, { Component } from 'react'
import { Menu, Input, Button, Row, Col, Upload, message, Icon, Modal } from 'antd'
// import axios from 'axios'
import ajaxUrl from 'config'
// import webStorage from 'webStorage'
import PersonManageTable from './person-manage-table/PersonManageTable'
import './PersonnelManagement.scss'
import PersonManageAdd from './person-manage-table/PersonManageAdd'
import config from '../../config/index'
const {API_BASE_URL_V2, SERVICE_PORTAL} = config
const Search = Input.Search

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
      role: 'teacher',
      updateList: 0,
      filepath: '/image/attach/2.xls',
      newListVisibility: false
    }
    this.uploadProps = {
      // name: 'teachers',
      action: `${API_BASE_URL_V2}${SERVICE_PORTAL}/file-upload/upload-user-info`,
      data: { fileType: 'document', userType: 3 },
      onChange: this.onChange
    }
  }
  onChange=(info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 导入成功`)
      this.setState({
        updateList: this.state.updateList + 1
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 导入失败`)
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

  // 新增
  newPerson = () => {
    this.setState({
      newListVisibility: true
    })
  }

  // 关闭弹窗
  closeModal = () => {
    this.setState({
      newListVisibility: false
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
        role: obj.key,
        inputValue: '',
        tableParams: {
          ...this.state.tableParams,
          text: ''
        }
      })
      if (obj.key === 'student') {
        this.uploadProps = {
          // name: 'student',
          action: `${API_BASE_URL_V2}${SERVICE_PORTAL}/file-upload/upload-user-info`,
          data: { fileType: 'document', userType: 4 },
          onChange: this.onChange
        }
        this.setState({
          filepath: '/image/attach/1.xls'
        })
      } else {
        this.uploadProps = {
          // name: 'teachers',
          action: `${API_BASE_URL_V2}${SERVICE_PORTAL}/file-upload/upload-user-info`,
          data: { fileType: 'document', userType: 3 },
          onChange: this.onChange
        }
        this.setState({
          filepath: '/image/attach/2.xls'
        })
      }
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
              <span>
                搜索 :&nbsp;&nbsp;
              </span>
              <Search
                placeholder='请输入姓名'
                value={this.state.inputValue}
                onChange={this.inputChange}
                onPressEnter={this.search}
                onSearch={this.search}
                style={{width: 200}}
              />
            </Col>
            <Col offset={6} span={10} className='opt-box' >
              <span className='link' onClick={this.templateDownload} >模板下载</span>
              <Button
                className='btn-style add-btn'
                onClick={this.newPerson}
              >
                <span><Icon type='plus' /></span>
                <span style={{marginLeft: '5px'}}>新增</span>
              </Button>
              <Upload {...this.uploadProps}>
                <Button
                  className='upload-btn btn-style'
                  type='primary'
                >
                  批量导入
                </Button>
              </Upload>
              <Button
                type='primary'
                className='back-btn btn-style'
              >
                返回
              </Button>
            </Col>
          </Row>
          <PersonManageTable
            tableParams={this.state.tableParams}
            onShowSizeChange={this.onShowSizeChange}
            pageNumChange={this.pageNumChange}
            role={this.state.role}
            updateList={this.state.updateList}
            // onUpload={this.templateDownload}
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
        <form ref='downloadForm' action={ajaxUrl.IMG_BASE_URL + this.state.filepath} target='download-frame' style={{ visibility: 'none' }}>
          <input type='hidden' name='fileId' value='' />
        </form>
        <Modal
          visible={this.state.newListVisibility}
          onCancel={this.closeModal}
          title='新增'
          footer={null}
          width={'596px'}
          destroyOnClose
        >
          <PersonManageAdd
            role={this.state.role}
            close={this.closeModal}
          />
        </Modal>
      </div>
    )
  }
}

export default PersonnelManagement
