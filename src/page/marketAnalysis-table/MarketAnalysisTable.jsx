/**
 * 市场分析 的表格
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
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
      dataIndex: 'downLoadCount'
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
      dataIndex: 'updateDate'
      // width: 150
    }]
  }
  render () {
    return (
      <div className='marketAnalysis-table'>
        <Table rowKey='index' columns={this.columns} dataSource={this.props.dataSource} pagination={false} />
      </div>
    )
  }
}

MarketAnalysisTable.propTypes = {
  dataSource: PropTypes.array
}

export default MarketAnalysisTable
