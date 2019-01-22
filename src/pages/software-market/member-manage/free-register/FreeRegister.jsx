import React from 'react'
import {Input, Button, Table, Switch} from 'antd'
import {axios} from '../../../../utils'
import config from '../../../../config/index'
import { NewFree } from 'components/software-market'
import './FreeRegister.scss'

const { API_BASE_URL_V2 } = config

class FreeRegister extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searches: {},
      pagination: {
        current: 1,
        pageSize: 10
      },
      data: [],
      total: 0,
      visible: false
    }
  }
  getTable = () => {
    axios.get(API_BASE_URL_V2 + '').then(res => {
      const data = res.data.data
      console.log(data)
    })
  }
  handleChange = (pagination) => {
    this.setState({
      pagination
    }, () => {
      this.getTable()
    })
  }
  /** 每页展示数量变化 */
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
  /** 修改搜索条件 */
  changeSearch = (name, value) => {
    const searches = {...this.state.searches}
    searches[name] = value
    this.setState({searches})
  }
  getColumns = () => {
    return [
      {
        title: '账号',
        dataIndex: 'account'
      },
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '身份证号',
        dataIndex: 'identify'
      },
      {
        title: '手机号',
        dataIndex: 'telephone'
      },
      {
        title: '允许登录',
        dataIndex: 'login',
        render: (text, record, index) => {
          return (
            <Switch checked={record.LOGIN_PERMISSION_STATUS === 1} onChange={() => this.handleToLogin(record)} />
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          return <div className='operation-items'>
            <span>重置密码</span>
            <span>删除</span>
          </div>
        }
      }
    ]
  }
  handleToLogin = (record) => {}
  onOk = () => {
    this.refs.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }
  changeVisible = (visible) => {
    this.setState({
      visible
    })
  }

  render () {
    const { data, total, pagination, visible } = this.state
    return (
      <div className='free-register'>
        <div className='search-bar-wrap'>
          <div className='search-bar-item'>
            <span className='input-label'>
              账号
            </span>
            <Input className='input' onChange={(e) => this.changeSearch('account', e.target.value)} />
          </div>
          <div className='search-bar-item'>
            <span className='input-label'>
              姓名
            </span>
            <Input className='input' onChange={(e) => this.changeSearch('name', e.target.value)} />
          </div>
          <div className='search-bar-buttons'>
            <Button htmlType='button' className='search-bar-btn' type='primary' onClick={this.getTable}>搜索</Button>
            <Button htmlType='button' className='search-bar-btn' type='primary'
              style={{background: '#4eb652'}}
              icon='plus'
              onClick={() => this.changeVisible(true)}>新增用户</Button>
          </div>
          <div style={{clear: 'both'}} />
        </div>
        <Table rowKey={(text, record, index) => index}
          dataSource={data}
          columns={this.getColumns()}
          pagination={{
            ...pagination,
            onChange: this.handleChange,
            defaultPageSize: 10,
            total,
            onShowSizeChange: this.onShowSizeChange
          }}
        />
        <NewFree visible={visible}
          onOk={this.onOk}
          changeVisible={this.changeVisible}
          ref='form' />
      </div>
    )
  }
}

FreeRegister.propTypes = {}

export default FreeRegister
