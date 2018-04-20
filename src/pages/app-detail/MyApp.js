/**
 * 市场分析
 */
import React, { Component } from 'react'
import { Tabs, Badge } from 'antd'
import axios from 'axios'
import _ from 'lodash'
import ajaxUrl from 'config'
import MyAppOperationTable from './MyAppOperationTable'
import MyAppExamineTable from './MyAppExamineTable'
import MyAppIterationTable from './MyAppIterationTable'
// import './MarketAnalysis.scss'

// const TabPane = Tabs.TabPane

class MyApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableDatas: [],
      hotSearchDatas: [],
      currentType: 'teaching',
      changeState: 0
    }
  }
  changeState () {
    let a = this.state.changeState + 1
    this.setState({changeState: a},
      () => {
        console.log('这是课程的状态', this.state.changeState)
      })
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
      <div style={{width: '80%', margin: 'auto', paddingTop: '20px', paddingLeft: '30px', backgroundColor: '#fff', paddingRight: '30px'}}>
        {/* <Card>
          <Menu
            onClick={this.typeSwitching}
            selectedKeys={[this.state.currentType]}
            mode='horizontal'
          >
            <Menu.Item key='teaching'>
              运营中
            </Menu.Item>
            <Menu.Item key='auxiliary'>
              审核中
            </Menu.Item>
            <Menu.Item key='management'>
              迭代审核
            </Menu.Item>
          </Menu>
          <MyAppOperationTable dataSource={this.state.tableDatas} />
        </Card> */}
        <Tabs defaultActiveKey='class' onChange={() => this.changeState()}>
          <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={5}>运营中</Badge>} key='class' >
            <MyAppOperationTable {...this.props} state={this.state.changeState} dataSource={this.state.tableDatas} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={7}>审核中</Badge>} key='text' >
            <MyAppExamineTable {...this.props} state={this.state.changeState} dataSource={this.state.tableDatas} />
          </Tabs.TabPane>
          <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={6}>迭代审核</Badge>} key='grade' >
            <MyAppIterationTable {...this.props} state={this.state.changeState} dataSource={this.state.tableDatas} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}

export default MyApp
