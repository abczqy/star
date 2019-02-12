/**
 * 市场分析 的表格
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Form, Row, Col, Select, Input, message } from 'antd'
import {myAppIteration, myAppRevoke} from 'services/my-app/'
import { getApptype } from 'services/software-manage'
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
      appTypeData: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      currentPage: 1,
      sw_type: 0,
      sw_name: '',
      searchFilter: {
        sw_type: '',
        sw_name: ''
      }
    }
    this.columns = [{
      title: '应用名称',
      dataIndex: 'APP_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'APP_TYPE_NAME'
      // width: 150
    }, {
      title: '当前版本',
      dataIndex: 'APP_VERSION'
      // width: 150
    }, {
      title: '迭代版本',
      dataIndex: 'UPDATE_VERSION'
      // width: 150
    }, {
      title: '下载次数',
      dataIndex: 'DOWNLOAD_COUNT',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.sw_downloads - b.sw_downloads
      // width: 150
    }, {
      title: '变更时间',
      dataIndex: 'UPDATE_TIME',
      render: date => date ? moment(date).format('YYYY-MM-DD') : null
      // width: 150
    }, {
      title: '操作',
      dataIndex: 'sw_update_time',
      // width: 150
      render: (text, record, index) => {
        return (
          <div key={index}>
            {/* <span style={{marginRight: '10px'}}><Popconfirm placement='top' title='确定要撤销吗？' onConfirm={() => this.confirm(record)} okText='Yes' cancelText='No'><Button style={{color: '#1890ff', border: 0}}>撤销</Button></Popconfirm></span> */}
            <span style={{marginRight: '10px', color: '#1890ff', cursor: 'pointer'}} onClick={() => this.props.showDetail(record)}>
              查看详情
            </span>
          </div>
        )
      }
    }]
    this.platColumns = [
      {
        title: '应用名称',
        dataIndex: 'APP_NAME'
      }, {
        title: '所属类型',
        dataIndex: 'APP_TYPE_NAME'
        // width: 150
      }, {
        title: '当前版本',
        dataIndex: 'CURRENT_VERSION'
        // width: 150
      }, {
        title: '迭代版本',
        dataIndex: 'APP_VERSION'
        // width: 150
      }, {
        title: '测试链接',
        dataIndex: 'TEST_URL',
        key: 'TEST_URL'
        // width: 150
      }, {
        title: '地址',
        dataIndex: 'APP_LINK'
      }, {
        title: '变更时间',
        dataIndex: 'UPDATE_TIME',
        render: date => date ? moment(date).format('YYYY-MM-DD') : null
        // width: 150
      }, {
        title: '操作',
        dataIndex: 'sw_update_time',
        // width: 150
        render: (text, record, index) => {
          return (
            <div key={index}>
              {/* <span style={{marginRight: '10px'}}><Popconfirm placement='top' title='确定要撤销吗？' onConfirm={() => this.confirm(record)} okText='Yes' cancelText='No'><Button style={{color: '#1890ff', border: 0}}>撤销</Button></Popconfirm></span> */}
              <span style={{marginRight: '10px', color: '#1890ff', cursor: 'pointer'}} onClick={() => this.props.showDetail(record)}>
              查看详情
              </span>
            </div>
          )
        }
      }
    ]
  }
  componentDidMount () {
    this.props.form.validateFields()
    this.getMyAppInOperationData()
    this.getApplicationTypeData()
  }
  // 我的应用-迭代审核
  getMyAppInOperationData = () => {
    const {tabsType} = this.props
    let params
    console.log(tabsType)
    if (tabsType === 'rj') {
      params = {
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
        typeId: this.state.sw_type,
        auditStatus: 2,
        platformType: 'rj'
      }
    } else {
      params = {
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
        typeId: this.state.sw_type,
        auditStatus: 2,
        platformType: 'pt'
      }
    }
    if (this.state.sw_name !== '') {
      params.keyword = this.state.sw_name
    }
    myAppIteration(params, (res) => {
      console.log(res)
      if (res.data.code === 200) {
        this.setState({
          myAppInOperationData: res.data.data.data,
          total: res.data.data.totalCount
        })
      } else {
        message.warn(res.data.msg)
      }
    }).catch((e) => { console.log(e) })
  }
  // 获取应用类型下拉框数据
  getApplicationTypeData = () => {
    getApptype({}, (res) => {
      if (res.data.code === 200) {
        this.setState({
          appTypeData: res.data.data
        })
      } else {
        message.warn(res.data.msg)
      }
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
    this.setState({
      sw_type: value
    })
  }
  handleSearch = () => {
    this.setState({
      pageNum: 1
    }, () => {
      this.getMyAppInOperationData()
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
    myAppRevoke({
      sw_id: e.sw_id
    }, (res) => {
      this.getMyAppInOperationData()
    }).catch((e) => { console.log(e) })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const {tabsType} = this.props
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 15
      }
    }
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
                    { this.state.appTypeData && this.state.appTypeData.map((item, index) => {
                      return <Option key={index} value={item.APP_TYPE_ID}>{item.APP_TYPE_NAME}</Option>
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
          <CustomPagingTable
            dataSource={this.state.myAppInOperationData}
            columns={tabsType === 'rj' ? this.columns : this.platColumns}
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
  form: PropTypes.object,
  showDetail: PropTypes.func,
  tabsType: PropTypes.string
}

export default Form.create()(MyAppIterationTable)
