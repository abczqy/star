/**
 * 代理商
 */
import React from 'react'
import {Input, Button, Table, Switch} from 'antd'
import {axios} from '../../../../utils'
import config from '../../../../config/index'
import { NewAgent } from 'components/software-market'
import '../free-register/FreeRegister.scss'

const { API_BASE_URL_V2 } = config

class Agent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      data: [],
      pagination: {
        current: 1,
        pageSize: 10
      },
      total: 0,
      searches: {}
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
  changeVisible = (visible) => {
    this.setState({visible})
  }
  /** 新增代理确认 */
  onOk = () => {}
  /** 修改搜索条件 */
  changeSearch = (name, value) => {
    const searches = {...this.state.searches}
    searches[name] = value
    this.setState({searches})
  }
  getColumns = () => {
    return [
      {
        title: '代理商ID',
        dataIndex: ''
      },
      {
        title: '代理商名称',
        dataIndex: ''
      },
      {
        title: '状态',
        dataIndex: ''
      },
      {
        title: '代理字段',
        dataIndex: ''
      },
      {
        title: '代理地区',
        dataIndex: ''
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
            <span>学校列表</span>
            <span>编辑</span>
            <span>重置密码</span>
            <span>删除</span>
          </div>
        }
      }
    ]
  }
  handleToLogin = (record) => {}
  render () {
    const { data, total, pagination, visible } = this.state
    return (
      <div className='free-register'>
        <div className='search-bar-wrap'>
          <div className='search-bar-item'>
            <span className='input-label' style={{width: 80}}>
              代理商名称
            </span>
            <Input className='input' style={{width: 160}} onChange={(e) => this.changeSearch('name', e.target.value)} />
          </div>
          <div className='search-bar-item'>
            <span className='input-label'>
              代理字段
            </span>
            <Input className='input' onChange={(e) => this.changeSearch('field', e.target.value)} />
          </div>
          <div className='search-bar-buttons'>
            <Button htmlType='button' className='search-bar-btn' type='primary' onClick={this.getTable}>搜索</Button>
            <Button htmlType='button'
              className='search-bar-btn'
              type='primary'
              style={{background: '#4eb652'}}
              icon='plus'
              onClick={() => this.changeVisible(true)}>新增代理商</Button>
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
        <NewAgent onOk={this.onOk}
          changeVisible={this.changeVisible}
          visible={visible} />
      </div>
    )
  }
}

Agent.propTypes = {}

export default Agent
