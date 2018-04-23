/**
 * 市场分析 的表格
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Table, Row, Col } from 'antd'
import CountShow from '../count-show/CountShow'
import './MarketAnalysisTable.scss'

class MarketAnalysisTable extends Component {
  constructor (props) {
    super(props)
    this.columns = [{
      title: '序号',
      dataIndex: 'index',
      render: (index) => {
        let serialNumber = index
        switch (index) {
          case 1:
            serialNumber = <span className='serial-num first' >1</span>
            break
          case 2:
            serialNumber = <span className='serial-num second' >2</span>
            break
          case 3:
            serialNumber = <span className='serial-num third' >3</span>
            break
          default:
            serialNumber = <span className='serial-num' >{index}</span>
            break
        }
        return serialNumber
      }
      // width: 150
    }, {
      title: 'APP名称',
      dataIndex: 'name',
      render: (text, record) => (
        <span className='app-title'>
          <img src={record.appLogo} alt='' />
          <span>{text}</span>
        </span>
      )
      // width: 150
    }, {
      title: 'APP类型',
      dataIndex: 'appType'
      // width: 150
    }, {
      title: '下载数量',
      dataIndex: 'downLoadCount',
      render: (downLoadCount, record) => (
        <Row className='download'>
          <Col span={8} className='down-number' >{downLoadCount}</Col>
          <Col span={16} >
            {
              <CountShow percent={record.downPercent} index={record.index} />
            }

          </Col>
        </Row>
      )
      // width: 150
    }, {
      title: '收藏数量',
      dataIndex: 'collectCount'
      // width: 150
    }, {
      title: '点击率',
      dataIndex: 'clickCount'
      // width: 150
    }, {
      title: '上线时间',
      dataIndex: 'updateDate',
      render: date => moment(date).format('YYYY-MM-DD')
      // width: 150
    }]
  }

  render () {
    return (
      <div className='marketAnalysis-table'>
        <Table
          className='data-table'
          rowKey='index'
          columns={this.columns}
          dataSource={this.props.dataSource}
          pagination={false}
        />
      </div>
    )
  }
}

MarketAnalysisTable.propTypes = {
  dataSource: PropTypes.array
}

export default MarketAnalysisTable
