/**
 * 运营统计 - echarts部分
 */
import React, { Component } from 'react'
import StatEcharts from './stat-echarts'
import StatTable from './stat-table'

class Analysis extends Component {
  render () {
    return (
      <div style={{margin: '-20px'}}>
        <StatEcharts />
        <StatTable />
      </div>
    )
  }
}

export default Analysis
