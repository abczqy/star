/**
 * 市场分析
 */
import React, { Component } from 'react'
import { Card, Tabs } from 'antd'
import './MarketAnalysis.scss'

const TabPane = Tabs.TabPane

class MarketAnalysis extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  typeSwitching = (key) => {
    console.log(key)
  }

  render () {
    return (
      <div className='market-analysis center-view'>
        <Card title='同类软件下载排行对比' bordered={false} >
          <Tabs defaultActiveKey='1' onChange={this.typeSwitching}>
            <TabPane tab='教学类' key='1'>教学类</TabPane>
            <TabPane tab='教辅类' key='2'>教辅类</TabPane>
            <TabPane tab='管理类' key='3'>管理类</TabPane>
          </Tabs>
        </Card>
        <Card title='关键词搜索' bordered={false} className='ciyuntu' >
          关键词搜索词云图
        </Card>
      </div>
    )
  }
}

export default MarketAnalysis
