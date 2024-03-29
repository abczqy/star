/**
 * 市场分析 的表格
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Card, Form, Row, Col, Select, Input, message} from 'antd'
import { getApptype } from 'services/software-manage'
import {myAppIteration, myAppRevoke} from 'services/my-app/'
import CustomPagingTable from '../../components/common/PagingTable'
import './MyAppOperationTable.scss'
const FormItem = Form.Item
const Option = Select.Option
const Search = Input.Search
class MyAppExamineTable extends Component {
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
      dataIndex: 'APP_NAME',
      key: 'APP_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'APP_TYPE_NAME',
      key: 'APP_TYPE_NAME'
      // width: 150
    }, {
      title: '提交时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
      render: date => date ? moment(date).format('YYYY-MM-DD') : null
      // width: 150
    }, {
      title: '支持系统',
      dataIndex: 'RUNNING_PLATFORM',
      key: 'RUNNING_PLATFORM'
      // width: 150
    }, {
      title: '操作',
      dataIndex: 'clickCount',
      key: 'clickCount',
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
    this.platColunms = [
      {
        title: '应用名称',
        dataIndex: 'APP_NAME',
        key: 'APP_NAME'
      }, {
        title: '所属类型',
        dataIndex: 'APP_TYPE_NAME',
        key: 'APP_TYPE_NAME'
        // width: 150
      }, {
        title: '测试链接',
        dataIndex: 'TEST_URL',
        key: 'TEST_URL'
        // width: 150
      }, {
        title: '提交时间',
        dataIndex: 'CREATE_TIME',
        key: 'CREATE_TIME',
        render: date => date ? moment(date).format('YYYY-MM-DD') : null
        // width: 150
      }, {
        title: '操作',
        dataIndex: 'clickCount',
        key: 'clickCount',
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
  // 我的应用-审核中
  getMyAppInOperationData = () => {
    const {tabsType} = this.props
    let params
    if (tabsType === 'rj') {
      params = {
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
        typeId: this.state.sw_type,
        auditStatus: 1
      }
    } else {
      params = {
        pageNum: this.state.pageNum,
        pageSize: this.state.pageSize,
        typeId: this.state.sw_type,
        auditStatus: 1,
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
                    { this.state.appTypeData && this.state.appTypeData.map((item, index, data) => {
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
            columns={tabsType === 'rj' ? this.columns : this.platColunms}
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
        <div className='app-detail-wrap' ref='appDetailElem' />
      </Card>
    )
  }
}

MyAppExamineTable.propTypes = {
  dataSource: PropTypes.array,
  form: PropTypes.object,
  showDetail: PropTypes.func,
  tabsType: PropTypes.string
}

export default Form.create()(MyAppExamineTable)
