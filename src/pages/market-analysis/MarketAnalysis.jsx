/**
 * 市场分析
 */
import React, { Component } from 'react'
import { Card, Menu } from 'antd'
import axios from 'axios'
import _ from 'lodash'
import ajaxUrl from 'config'
import MarketAnalysisTable from '../../page/market-analysis/marketAnalysis-table/MarketAnalysisTable'
import MarketAnalysisWordCloud from '../../page/market-analysis/market-analysis-wordCloud/MarketAnalysisWordCloud'
import './MarketAnalysis.scss'

// const TabPane = Tabs.TabPane

class MarketAnalysis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableDatas: [],
      hotSearchDatas: [],
      currentType: 'teaching'
    }
  }

  typeSwitching = (e) => {
    this.setState({
      currentType: e.key
    })
  }

  // 获取表格数据
  getTableData = () => {
    axios.get(ajaxUrl.MarketAnalysis, {
      params: {}
    }).then(res => {
      let resDatas = _.cloneDeep(res.data.data)
      let datas = resDatas.map((item, index) => (
        {
          index: index + 1,
          ...item
        }
      ))
      this.setState({
        tableDatas: datas
      })
    }).catch(e => { console.log(e) })
  }

  // 获取关键字热搜数据
  gethotSearch=() => {
    axios.get(ajaxUrl.hotSearch, {params: {}}).then(res => {
      this.setState({
        hotSearchDatas: res.data.data
      })
    }).catch(e => { console.log(e) })
  }

  componentDidMount () {
    this.getTableData()
    this.gethotSearch()
  }

  render () {
    return (
      <div className='market-analysis center-view'>
        <Card title='同类软件下载排行对比' bordered={false} >
          <Menu
            onClick={this.typeSwitching}
            selectedKeys={[this.state.currentType]}
            mode='horizontal'
          >
            <Menu.Item key='teaching'>
              教学类
            </Menu.Item>
            <Menu.Item key='auxiliary'>
              教辅类
            </Menu.Item>
            <Menu.Item key='management'>
              管理类
            </Menu.Item>
          </Menu>
          <MarketAnalysisTable dataSource={this.state.tableDatas} />
        </Card>
        <Card title='关键词搜索' bordered={false} className='word-cloud' >
          {
            _.isEmpty(this.state.hotSearchDatas)
              ? '暂无数据'
              : <MarketAnalysisWordCloud dataSource={this.state.hotSearchDatas} />
          }
        </Card>
      </div>
    )
  }
}

export default MarketAnalysis
