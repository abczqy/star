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
import {getAppType} from 'services/all-app/'
import './MarketAnalysis.scss'

// const TabPane = Tabs.TabPane
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true
}

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
      currentType: '0',
      pagination,
      total: 0,
      menuData: [] // 存全部应用的分类

    }
  }
  // static propTypes = {
  //   tableDatas: PropTypes.array,
  //   hotSearchDatas: PropTypes.array
  // }

  typeSwitching = (e) => {
    console.log(e.item.props.eventKey || '无')
    // this.type = e.item.props.children
    this.getTableData(e.item.props.eventKey)
    this.setState({
      currentType: e.item.props.eventKey
    })
  }

  // 获取表格数据
  getTableData = (type) => {
    const parmas = {
      pageSize: this.state.pagination.pageSize,
      pageNum: this.state.pagination.pageNum,
      appType: type
    }
    marketAnalysis(parmas, res => {
      if (res.data.code === 200) {
        // console.log('市场分析获取表格数据', res.data.data.data)
        let resDatas = res.data.data.data || []
        resDatas && resDatas instanceof Array && resDatas.map((item, index) => {
          item.Index = index + 1
        })
        // console.log('获取表格数据', resDatas)
        this.setState({
          tableDatas: resDatas || [],
          total: res.data.data.totalCount || 0
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

  /**
   * 页码变化时回调
   */
  pageNumChange = (page, pageSize) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNum: page
      }
    }, () => {
      this.getTableData(this.state.currentType)
    })
  }

  componentDidMount () {
    // 获取应用分类
    getAppType({}, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data
        // console.log('获取应用分类', result)
        this.setState({
          menuData: result || []
        })
      } else {
        // console.log('getAppType出现异常:', response.data.msg || '')
      }
    }).catch((e) => { console.log(e) })

    this.getTableData(this.state.currentType)
    // this.gethotSearch()  // 没有词云接口，暂时注释
  }

  render () {
    const { pagination } = this.state
    return (
      <div className='market-analysis center-view mtb20'>
        <Card title='同类软件下载排行对比' bordered={false} >
          <Menu
            onClick={this.typeSwitching}
            selectedKeys={[this.state.currentType]}
            mode='horizontal'
          >
            {this.state.menuData && this.state.menuData.map((item, index) => {
              return <Menu.Item key={item.APP_TYPE_ID || 0} >
                {item.APP_TYPE_NAME || '无'}
              </Menu.Item>
            })}
          </Menu>
          <MarketAnalysisTable dataSource={this.state.tableDatas}
            pagination={{
              ...pagination,
              onChange: this.pageNumChange,
              total: this.state.total
            }} />
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
