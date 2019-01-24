import React from 'react'
import {Input, Button, Table, Switch, Select} from 'antd'
import {axios} from '../../../../utils'
import config from '../../../../config/index'
import './FreeRegister.scss'

const { API_BASE_URL_V2, SERVICE_PORTAL } = config
const Option = Select.Option

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
      total: 0
    }
  }
  componentDidMount () {
    this.getTable()
  }
  getTable = () => {
    const {pagination, searches} = this.state
    axios.post(API_BASE_URL_V2 + SERVICE_PORTAL + `/user-list/role/8/${pagination.current}/${pagination.pageSize}`, searches).then(res => {
      const data = res.data.data
      console.log(data)
      if (res.data.msg === '操作成功') {
        this.setState({
          data: data.content,
          pagination: {
            ...this.state.pagination,
            total: data.totalElements
          }
        })
      }
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
        dataIndex: 'LOGIN_NAME'
      },
      {
        title: '姓名',
        dataIndex: 'USER_NAME'
      },
      {
        title: '性别',
        dataIndex: 'GENDER'
      },
      {
        title: '身份证号',
        dataIndex: 'CERTIFICATE_NUMBER'
      },
      {
        title: '手机号',
        dataIndex: 'PHONE_NUMBER'
      },
      {
        title: '允许登录',
        dataIndex: 'LOGIN_PERMISSION_STATUS',
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

  render () {
    const { data, total, pagination } = this.state
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
          <div className='search-bar-item'>
            <span className='select-label'>允许登录 </span>
            <Select defaultValue='all' className='select' onChange={(value) => this.changeSearch('login', value)} >
              <Option value='all'>全部</Option>
              <Option value='allow'>允许</Option>
              <Option value='refuse'>不允许</Option>
            </Select>
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
      </div>
    )
  }
}

FreeRegister.propTypes = {}

export default FreeRegister
