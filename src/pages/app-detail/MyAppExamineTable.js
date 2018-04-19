/**
 * 市场分析 的表格
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Form, Row, Col, Select, Input } from 'antd'
import { Link } from 'react-router-dom'
import CustomPagingTable from '../../components/common/PagingTable'
// import './MarketAnalysisTable.scss'
const FormItem = Form.Item
const Option = Select.Option
const Search = Input.Search
class MyAppExamineTable extends Component {
  constructor (props) {
    super(props)
    this.columns = [{
      title: '应用名称',
      dataIndex: 'name'
    }, {
      title: '所属类型',
      dataIndex: 'appType',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.appType - b.appType
      // width: 150
    }, {
      title: '提交时间',
      dataIndex: 'updateDate',
      render: date => moment(date).format('YYYY-MM-DD')
      // width: 150
    }, {
      title: '支持系统',
      dataIndex: 'collectCount'
      // width: 150
    }, {
      title: '操作',
      dataIndex: 'clickCount',
      // width: 150
      render: (text, record, index) => {
        return (
          <div>
            <span style={{marginRight: '10px'}}><Link to='#'>撤销</Link></span>
            <span style={{marginRight: '10px'}}><Link to='/operate-manage-home/all-app-detail-mineabc'>查看详情</Link></span>
          </div>
        )
      }
    }]
  }
  componentDidMount () {
    this.props.form.validateFields()
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
    const aaaaaaaa = ['教育', '辅助']
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
                  <Select placeholder='全部' style={{ width: '150%' }} allowClear>
                    { aaaaaaaa.map((item, index, data) => {
                      return <Option key={index}>{item}</Option>
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
                  // onChange={e => { return this.handleSearchTextChange(e) }}
                  // onSearch={() => { this.handBtnleFilter() }}
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
            dataSource={this.props.dataSource}
            columns={this.columns}
            pageVisible
            //   loading={this.state.loading}
            total={100}
            // customCls='ant-table-body'
            pageSize={10}
            pageNum={20}
            currentPage={1}
            //   onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
            //   onChange={(current, pageSize) => this.onChange(current, pageSize)}
          />
        </div>
      </Card>
    )
  }
}

MyAppExamineTable.propTypes = {
  dataSource: PropTypes.array,
  form: PropTypes.object
}

export default Form.create()(MyAppExamineTable)
