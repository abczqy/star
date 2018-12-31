/**
 * 运营统计 - table部分
 */
import React, { Component } from 'react'
import { Table, DatePicker, Row, Col, Button } from 'antd'
import moment from 'moment'
import './StatTable.scss'
const RangePicker = DatePicker.RangePicker

class StatTable extends Component {
  constructor (props) {
    super(props)
    this.columns = [{
      title: '日期',
      dataIndex: 'date'
    }, {
      title: '新增学生数量',
      dataIndex: 'newStuNum',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.newStuNum - b.newStuNum
    }, {
      title: '登陆学生数量',
      dataIndex: 'loginStuNum',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.loginStuNum - b.loginStuNum
    }]

    this.data = []
    for (let i = 0; i < 10; i++) {
      this.data.push({
        key: i,
        date: '2018-12-' + (10 + i),
        newStuNum: 32 + i,
        // loginStuNum: `London, Park Lane no. ${i}`
        loginStuNum: 1677 + i
      })
    }
  }

  dateChange = (dates, dateStrings) => {
    console.log('From: ', dates[0], ', to: ', dates[1])
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
  }

  showTotal = (total) => (`总共 ${total} 个项目`)

  render () {
    return (
      <div style={{padding: '20px', background: '#fff', border: '1px solid #f00'}}>
        <Row align='middle' style={{marginBottom: '1%'}}>
          <Col span={1}>
          日期：
          </Col>
          <Col span={8}>
            <RangePicker
              ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
              onChange={this.dateChange}
            />
          </Col>
          <Col span={2}>
            <Button type='primary'>查询</Button>
          </Col>
          <Col span={2}>
            <Button>重置</Button>
          </Col>
          <Col span={11} >
            <Button style={{float: 'right', backgroundColor: '#4ECB73', color: 'white'}}>导出Excel</Button>
          </Col>
        </Row>
        <Table
          columns={this.columns}
          dataSource={this.data}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: '5',
            total: this.data.length,
            showTotal: this.showTotal
          }}
          // pagination={{
          //   ...pagination,
          //   total: this.state.total,
          //   onShowSizeChange: this.onShowSizeChange,
          //   onChange: this.pageNumChange
          // }}
        />
      </div>
    )
  }
}

export default StatTable
