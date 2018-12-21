/**
 * 应用管理-未通过审核
 * 1- 内容自主添加
 */
import React, { Component } from 'react'
import {Table, Tabs, Input} from 'antd'
import './UserManage.scss'
const TabPane = Tabs.TabPane
const Search = Input.Search
/**
   * 表格分页器设置-默认值
   */
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true
}

class UserManage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tabKey: '1',
      tableData: {
        data: [],
        total: 0
      },
      pagination,
      searchValue: '',
      pageNum: 1,
      pageSize: 10
    }
  }
  /** 改变搜索值 */
  changeSearch = (e) => {
    this.setState({
      searchValue: e.target.value
    })
  }
  /** 搜索 */
  searchList = (value) => {
    this.setState({
      searchValue: value
    }, function () {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageNum: 1,
          pageSize: 10
        }
      }, function () {
        this.getTableDatas()
      })
    })
  }
  /** 切换tab */
  changeTabkey = (activeKey) => {
    this.setState({
      tabKey: activeKey,
      searchValue: ''
    }, function () {
      this.getTableDatas()
    })
  }
  /**
   * 获取运营中的应用列表数据
   */
  getTableDatas = () => {
    const searchValue = this.state.searchValue
    if (this.state.tabKey === '1') {
      if (searchValue) {
        console.log(searchValue)
      }
      this.setState({
        tableData: {
          data: [{'id': '1', 'name': '孙二老师', 'username': 'sss12466', 'phone': '13312322223', 'ordercount': '10个', 'history': '1010元'},
            {'id': '2', 'name': '张三老师', 'username': 'asdaasd', 'phone': '15649234338', 'ordercount': '20个', 'history': '1500元'},
            {'id': '3', 'name': '李四老师', 'username': '1234455', 'phone': '13343554448', 'ordercount': '30个', 'history': '1200元'},
            {'id': '4', 'name': '王五老师', 'username': 'aerwwww', 'phone': '13666778888', 'ordercount': '40个', 'history': '1230元'},
            {'id': '5', 'name': '赵六老师', 'username': 'avfgggg', 'phone': '13309729908', 'ordercount': '50个', 'history': '1700元'}],
          total: 5
        }
      })
    } else if (this.state.tabKey === '2') {
      if (searchValue) {
        console.log(searchValue)
      }
      this.setState({
        tableData: {
          data: [{'id': '1', 'name': '孙二学生', 'username': 'sss12466', 'phone': '13312322223', 'ordercount': '10个', 'history': '1010元'},
            {'id': '2', 'name': '张三学生', 'username': 'asdaasd', 'phone': '15649234338', 'ordercount': '20个', 'history': '1500元'},
            {'id': '3', 'name': '李四学生', 'username': '1234455', 'phone': '13343554448', 'ordercount': '30个', 'history': '1200元'},
            {'id': '4', 'name': '王五学生', 'username': 'aerwwww', 'phone': '13666778888', 'ordercount': '40个', 'history': '1230元'},
            {'id': '5', 'name': '赵六学生', 'username': 'avfgggg', 'phone': '13309729908', 'ordercount': '50个', 'history': '1700元'}],
          total: 5
        }
      })
    } else if (this.state.tabKey === '3') {
      if (searchValue) {
        console.log(searchValue)
      }
      this.setState({
        tableData: {
          data: [{'id': '1', 'name': '孙二家长', 'username': 'sss12466', 'phone': '13312322223', 'ordercount': '10个', 'history': '1010元'},
            {'id': '2', 'name': '张三家长', 'username': 'asdaasd', 'phone': '15649234338', 'ordercount': '20个', 'history': '1500元'},
            {'id': '3', 'name': '李四家长', 'username': '1234455', 'phone': '13343554448', 'ordercount': '30个', 'history': '1200元'},
            {'id': '4', 'name': '王五家长', 'username': 'aerwwww', 'phone': '13666778888', 'ordercount': '40个', 'history': '1230元'},
            {'id': '5', 'name': '赵六家长', 'username': 'avfgggg', 'phone': '13309729908', 'ordercount': '50个', 'history': '1700元'}],
          total: 5
        }
      })
    } else if (this.state.tabKey === '4') {
      if (searchValue) {
        console.log(searchValue)
      }
      this.setState({
        tableData: {
          data: [{'id': '1', 'name': '孙二其他', 'username': 'sss12466', 'phone': '13312322223', 'ordercount': '10个', 'history': '1010元'},
            {'id': '2', 'name': '张三其他', 'username': 'asdaasd', 'phone': '15649234338', 'ordercount': '20个', 'history': '1500元'},
            {'id': '3', 'name': '李四其他', 'username': '1234455', 'phone': '13343554448', 'ordercount': '30个', 'history': '1200元'},
            {'id': '4', 'name': '王五其他', 'username': 'aerwwww', 'phone': '13666778888', 'ordercount': '40个', 'history': '1230元'},
            {'id': '5', 'name': '赵六其他', 'username': 'avfgggg', 'phone': '13309729908', 'ordercount': '50个', 'history': '1700元'}],
          total: 5
        }
      })
    }
  }

  /**
   * 表格的columns -- 后面用json文件配置出去 --参照bdq
   */
  getColumns = () => {
    return [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '账号',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone'
    }, {
      title: '订单量',
      dataIndex: 'ordercount',
      key: 'ordercount'
    }, {
      title: '支付记录',
      dataIndex: 'history',
      key: 'history',
      render: (text, record, index) => {
        return (
          <span>
            <a href='javascript:void(0)'>{text}</a>
            <a href='javascript:void(0)' onClick={(e) => this.toDetail(record.id)} className='margin-lef5'>查看详情</a>
          </span>
        )
      }
    }]
  }

  /**
   * pageSize 变化时回调
   */
  onShowSizeChange = (current, size) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNum: current,
        pageSize: size
      }
    }, () => {
      this.getTableDatas()
    })
  }

  /**
   * 页码变化时回调
   */
  pageNumChange = (page, pageSize) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNum: page
      }
    }, () => {
      this.getTableDatas()
    })
  }

  componentDidMount () {
    this.getTableDatas()
  }

  render () {
    const { tableData, pagination } = this.state
    return (
      <div className='userManage'>
        <Tabs defaultActiveKey='1' onChange={this.changeTabkey} className='ml1'>
          <TabPane tab='教师' key='1'>
            <span>搜索：</span>
            <Search
              value={this.state.searchValue}
              className='search-input'
              placeholder='请输入账号/姓名'
              onSearch={value => this.searchList(value)}
              onChange={this.changeSearch}
              style={{ width: 250 }}
            />
            <Table
              columns={this.getColumns()}
              dataSource={tableData.data}
              pagination={{
                ...pagination,
                total: this.state.tableData.total,
                onShowSizeChange: this.onShowSizeChange,
                onChange: this.pageNumChange
              }}
              rowKey={(record, index) => {
                return index
              }}
            />
          </TabPane>
          <TabPane tab='学生' key='2'>
            <span>搜索：</span>
            <Search
              value={this.state.searchValue}
              className='search-input'
              placeholder='请输入账号/姓名'
              onSearch={value => this.searchList(value)}
              onChange={this.changeSearch}
              style={{ width: 250 }}
            />
            <Table
              columns={this.getColumns()}
              dataSource={tableData.data}
              pagination={{
                ...pagination,
                total: this.state.tableData.total,
                onShowSizeChange: this.onShowSizeChange,
                onChange: this.pageNumChange
              }}
              rowKey={(record, index) => {
                return index
              }}
            />
          </TabPane>
          <TabPane tab='家长' key='3'>
            <span>搜索：</span>
            <Search
              value={this.state.searchValue}
              className='search-input'
              placeholder='请输入账号/姓名'
              onSearch={value => this.searchList(value)}
              onChange={this.changeSearch}
              style={{ width: 250 }}
            />
            <Table
              columns={this.getColumns()}
              dataSource={tableData.data}
              pagination={{
                ...pagination,
                total: this.state.tableData.total,
                onShowSizeChange: this.onShowSizeChange,
                onChange: this.pageNumChange
              }}
              rowKey={(record, index) => {
                return index
              }}
            />
          </TabPane>
          <TabPane tab='其他' key='4'>
            <span>搜索：</span>
            <Search
              value={this.state.searchValue}
              className='search-input'
              placeholder='请输入账号/姓名'
              onSearch={value => this.searchList(value)}
              onChange={this.changeSearch}
              style={{ width: 250 }}
            />
            <Table
              columns={this.getColumns()}
              dataSource={tableData.data}
              pagination={{
                ...pagination,
                total: this.state.tableData.total,
                onShowSizeChange: this.onShowSizeChange,
                onChange: this.pageNumChange
              }}
              rowKey={(record, index) => {
                return index
              }}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default UserManage
