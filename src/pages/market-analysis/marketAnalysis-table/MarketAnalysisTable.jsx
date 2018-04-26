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
      dataIndex: 'id',
      render: (id) => {
        let serialNumber = id
        switch (id) {
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
            serialNumber = <span className='serial-num' >{id}</span>
            break
        }
        return serialNumber
      }
      // width: 150
    }, {
      title: 'APP名称',
      dataIndex: 'APPNAME',
      render: (text, record) => (
        <span className='app-title'>
          <img src={record.APPURL} alt='' />
          <span>{text}</span>
        </span>
      )
      // width: 150
    }, {
      title: 'APP类型',
      dataIndex: 'APPTYPE'
      // width: 150
    }, {
      title: '下载数量',
      dataIndex: 'DOWNLOADS',
      render: (downLoadCount, record) => (
        <Row className='download'>
          <Col span={8} className='down-number' >{downLoadCount}</Col>
          <Col span={16} >
            {
              <CountShow percent={record.PROGROSS} index={record.id} />
            }

          </Col>
        </Row>
      )
      // width: 150
    }, {
      title: '收藏数量',
      dataIndex: 'COLLNUM'
      // width: 150
    }, {
      title: '点击率',
      dataIndex: 'CLICKNUM'
      // width: 150
    }, {
      title: '上线时间',
      dataIndex: 'TIME',
      render: date => moment(date).format('YYYY-MM-DD')
      // width: 150
    }]
  }

  render () {
    return (
      <div className='marketAnalysis-table'>
        <Table
          className='data-table'
          rowKey='id'
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
