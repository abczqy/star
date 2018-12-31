/**
 * 市场分析
 */
import React, { Component } from 'react'
import { Card, Menu } from 'antd'
// import PropTypes from 'prop-types'
import _ from 'lodash'
import MarketAnalysisTable from './marketAnalysis-table/MarketAnalysisTable'
import MarketAnalysisWordCloud from './market-analysis-wordCloud/MarketAnalysisWordCloud'
import Empty from '../../components/common/Empty'
import {marketAnalysis, wordCloud} from '../../services/market-analysis'
import './MarketAnalysis.scss'

// const TabPane = Tabs.TabPane

class MarketAnalysis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableDatas: [],
      // hotSearchDatas: [],
      hotSearchDatas: [
        {
          name: '教学',
          value: '999'
        }, {
          name: '英语口语',
          value: '888'
        }, {
          name: '辅助学习',
          value: '777'
        }, {
          name: '拓展思维',
          value: '688'
        }, {
          name: '拓展思维',
          value: '588'
        }, {
          name: '发散思维游戏',
          value: '516'
        }, {
          name: '看图猜字',
          value: '515'
        }, {
          name: '看图猜字',
          value: '415'
        }, {
          name: '发散思维游戏',
          value: '315'
        }, {
          name: '数学游戏',
          value: '215'
        }, {
          name: '数学游戏',
          value: '25'
        }, {
          name: '数学游戏',
          value: '95'
        }, {
          name: '数学游戏',
          value: '183'
        } ],
      currentType: '101'
    }
  }
  // static propTypes = {
  //   tableDatas: PropTypes.array,
  //   hotSearchDatas: PropTypes.array
  // }

  typeSwitching = (e) => {
    console.log(e.item.props.eventKey || '101')
    // this.type = e.item.props.children
    this.getTableData(e.item.props.eventKey)
    this.setState({
      currentType: e.item.props.eventKey
    })
  }

  // 获取表格数据
  getTableData = (type) => {
    marketAnalysis({
      appType: type,
      userId: '1'
    }, res => {
      if (res.data.code === 200) {
        // console.log('市场分析获取表格数据', res.data.data.data)
        let resDatas = res.data.data.data || []
        // console.log('获取表格数据', resDatas)
        this.setState({
          tableDatas: resDatas || []
        })
      } else {
        console.log(res.data.msg || '')
      }
    })
  }

  // 获取关键字热搜数据
  gethotSearch=() => {
    wordCloud({}, res => {
      this.setState({
        hotSearchDatas: res.data.list || []
      })
    })
  }

  componentDidMount () {
    this.getTableData('101')
    // this.gethotSearch()  // 没有词云接口，暂时注释
  }

  render () {
    return (
      <div className='market-analysis center-view mtb20'>
        <Card title='同类软件下载排行对比' bordered={false} >
          <Menu
            onClick={this.typeSwitching}
            selectedKeys={[this.state.currentType]}
            mode='horizontal'
          >
            <Menu.Item key='101'>
              教学类
            </Menu.Item>
            <Menu.Item key='102'>
              教辅类
            </Menu.Item>
            <Menu.Item key='103'>
              管理类
            </Menu.Item>
          </Menu>
          <MarketAnalysisTable dataSource={this.state.tableDatas} />
        </Card>
        <Card title='关键词搜索' bordered={false} className='word-cloud' >
          {
            _.isEmpty(this.state.hotSearchDatas)
              ? <Empty style={{'lineHeight': '300px'}} />
              : <MarketAnalysisWordCloud dataSource={this.state.hotSearchDatas} />
          }
        </Card>
      </div>
    )
  }
}

export default MarketAnalysis
