/**
 * 代理商
 */
import React from 'react'
import {Button, Table, Switch, message} from 'antd'
import {axios} from '../../../../utils'
import config from '../../../../config/index'
import { NewAgent } from 'components/software-market'
import { updateUser } from 'services/software-market'
import '../free-register/FreeRegister.scss'

const { API_BASE_URL_V2, SERVICE_PORTAL } = config

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
    const {pagination} = this.state
    axios.get(API_BASE_URL_V2 + SERVICE_PORTAL + `/agent/all-user-info/${pagination.current}/${pagination.pageSize}`, {}).then(res => {
      const data = res.data.data
      this.setState({
        data: data.data,
        total: data.totalCount
      })
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
  onOk = () => {
    this.refs.newAgent.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.establishingTime = new Date(values.establishingTime)
        axios.post(API_BASE_URL_V2 + SERVICE_PORTAL + '/agent', values)
          .then(res => {
            if (res.data.code === 200) {
              message.success('新增代理成功')
              this.changeVisible(false)
              this.getTable()
            }
          })
      }
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
        title: '代理商ID',
        dataIndex: 'ID'
      },
      {
        title: '代理商名称',
        dataIndex: ''
      },
      {
        title: '状态',
        dataIndex: 'IS_FIRST_LOGIN'
      },
      {
        title: '账号',
        dataIndex: 'LOGIN_NAME'
      },
      {
        title: '代理学段',
        dataIndex: 'GRADE'
      },
      {
        title: '代理地区',
        dataIndex: 'AGENT_AREA'
      },
      {
        title: '允许登录',
        dataIndex: 'LOGIN_PERMISSION_STATUS',
        render: (text, record, index) => {
          return (
            <Switch checked={text === 1} onChange={() => this.handleToLogin(record)} />
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
  handleToLogin = (record) => {
    const thiz = this
    const id = record && record.USER_ID
    const params = {
      userId: id,
      isLogin: record.LOGIN_PERMISSION_STATUS ? 0 : 1
    }
    updateUser(id, params, (res) => {
      const data = res.data ? res.data : {}
      if (data.data > 0) {
        message.success(data.msg)
        thiz.getTable()
      }
    })
  }
  componentDidMount () {
    this.getTable()
  }
  render () {
    const { data, total, pagination, visible } = this.state
    return (
      <div className='free-register'>
        <div className='search-bar-wrap'>
          {/* <div className='search-bar-item'>
            <span className='input-label' style={{width: 80}}>
              代理商名称
            </span>
            <Input className='input' style={{width: 160}} onChange={(e) => this.changeSearch('name', e.target.value)} />
          </div>
          <div className='search-bar-item'>
            <span className='input-label'>
              代理学段
            </span>
            <Input className='input' onChange={(e) => this.changeSearch('field', e.target.value)} />
          </div> */}
          <div className='search-bar-buttons'>
            {/* <Button htmlType='button' className='search-bar-btn' type='primary' onClick={this.getTable}>搜索</Button> */}
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
          visible={visible}
          ref='newAgent' />
      </div>
    )
  }
}

Agent.propTypes = {}

export default Agent
