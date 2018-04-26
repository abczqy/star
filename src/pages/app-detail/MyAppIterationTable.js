/**
 * 市场分析 的表格
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Form, Row, Col, Select, Input, Popconfirm, Button } from 'antd'
import { Link } from 'react-router-dom'
import ajaxUrl from 'config'
import axios from 'axios'
import CustomPagingTable from '../../components/common/PagingTable'
import './MyAppOperationTable.scss'
const FormItem = Form.Item
const Option = Select.Option
const Search = Input.Search
class MyAppIterationTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myAppInOperationData: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      currentPage: 1,
      sw_type: '',
      sw_name: '',
      searchFilter: {
        sw_type: '',
        sw_name: ''
      }
    }
    this.columns = [{
      title: '应用名称',
      dataIndex: 'sw_name'
    }, {
      title: '所属类型',
      dataIndex: 'sw_type',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.sw_type - b.sw_type
      // width: 150
    }, {
      title: '当前版本',
      dataIndex: 'version'
      // width: 150
    }, {
      title: '迭代版本',
      dataIndex: 'iteration_version'
      // width: 150
    }, {
      title: '下载次数',
      dataIndex: 'sw_downloads',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.sw_downloads - b.sw_downloads
      // width: 150
    }, {
      title: '变更时间',
      dataIndex: 'updateDate',
      render: date => moment(date).format('YYYY-MM-DD')
      // width: 150
    }, {
      title: '操作',
      dataIndex: 'sw_update_time',
      // width: 150
      render: (text, record, index) => {
        return (
          <div key={index}>
            <span style={{marginRight: '10px'}}><Popconfirm placement='top' title='确定要撤销吗？' onConfirm={() => this.confirm(record)} okText='Yes' cancelText='No'><Button style={{color: '#1890ff', border: 0}}>撤销</Button></Popconfirm></span>
            <span style={{marginRight: '10px'}}><Link to={{pathname: '/operate-manage-home/all-app-detail-mineabc', search: '?' + record.sw_id}}>查看详情</Link></span>
          </div>
        )
      }
    }]
  }
  componentDidMount () {
    this.props.form.validateFields()
    this.getMyAppInOperationData()
  }
  // 我的应用-运营中
  getMyAppInOperationData = (searchParams) => {
    let params = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      fa_id: 'fa_123456', // 厂商id
      sw_type: this.state.sw_type, // 应用类型
      sw_name: this.state.sw_name // 应用名称
    }
    axios.post(ajaxUrl.myAppIteration, Object.assign(params, searchParams)).then((res) => {
      console.log(2222222, res.data)
      this.setState({
        myAppInOperationData: res.data.list,
        total: res.data.total
      }, () => {
        console.log(this.state.myAppInOperationData)
      })
    }).catch((e) => { console.log(e) })
  }
  // 改变每页显示条数
  onShowSizeChange = (pageNum, pageSize) => {
    console.log(pageNum, pageSize)
    this.setState({pageNum, pageSize}, () => {
      this.getMyAppInOperationData()
    })
  }
  // 页码
  onPageNumChange = (pageNum, pageSize) => {
    console.log(pageNum, pageSize)
    this.setState({pageNum, pageSize}, () => {
      this.getMyAppInOperationData()
    })
  }
  // 分类搜索
  onChangeState=(value) => {
    this.handleSearch({
      sw_type: value || ''
    })
    this.setState({
      sw_type: value
    })
  }
  handleSearch = (searchFilter) => {
    this.setState({
      pageNum: 1,
      searchFilter
    }, () => {
      this.getMyAppInOperationData(searchFilter)
    })
  }
  // 名称搜索
  handleSearchTextChange (e) {
    this.setState({
      sw_name: e.target.value.trim()
    })
  }
  handBtnleFilter =() => {
    this.handleSearch()
  }
  // 撤销操作确认
  confirm = (e) => {
    axios.post(ajaxUrl.myAppRevoke, {
      sw_id: e.sw_id
    }).then((res) => {
      this.getMyAppInOperationData()
    }).catch((e) => { console.log(e) })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 15
      }
    }
    const aaaaaaaa = ['全部', '教育', '辅助', '管理', '其他']
    return (
      <Card>
        <Form>
          <Row>
            <Col span={1} style={{paddingTop: 9}}>
              <span>类型 :</span>
            </Col>
            <Col span={4} >
              <FormItem
                {...formItemLayout}
              >
                {getFieldDecorator('progressState')(
                  <Select placeholder='全部' style={{ width: '150%' }} onChange={this.onChangeState} allowClear>
                    { aaaaaaaa.map((item, index, data) => {
                      return <Option key={index} value={item}>{item}</Option>
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{paddingTop: 3}}>
              <div style={{marginBottom: '0px'}} onKeyDown={this.handleKeyDown}>
                <Search
                  mode='combobox'
                  placeholder='搜索应用名称'
                  style={{ width: '83%', marginRight: '10px' }}
                  enterButton
                  onChange={e => { return this.handleSearchTextChange(e) }}
                  onSearch={() => { this.handBtnleFilter() }}
                />
              </div>
            </Col>
          </Row>
        </Form>
        <div className='marketAnalysis-table'>
          {/* <Table
          className='data-table'
          rowKey='index'
          columns={this.columns}
          dataSource={this.props.dataSource}
          pagination={false}
        /> */}

          <CustomPagingTable
            dataSource={this.state.myAppInOperationData}
            columns={this.columns}
            pageVisible
            //   loading={this.state.loading}
            total={this.state.total}
            // customCls='ant-table-body'
            pageSize={this.state.pageSize}
            pageNum={this.state.pageNum}
            currentPage={this.state.currentPage}
            onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
            onChange={(current, pageSize) => this.onPageNumChange(current, pageSize)}
          />
        </div>
      </Card>
    )
  }
}

MyAppIterationTable.propTypes = {
  dataSource: PropTypes.array,
  form: PropTypes.object
}

export default Form.create()(MyAppIterationTable)
