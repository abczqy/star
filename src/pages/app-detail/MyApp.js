/**
 * 市场分析
 */
import React, { Component } from 'react'
import {Tabs, Badge, Button} from 'antd'
import MyAppOperationTable from './MyAppOperationTable'
import MyAppExamineTable from './MyAppExamineTable'
import MyAppIterationTable from './MyAppIterationTable'
import Reject from './reject/Reject'
import Remove from './remove/Remove'
import { AppDetailModal } from 'pages/software-market'
import { bussDetailv2 } from 'services/software-manage'
// import './MarketAnalysis.scss'

// const TabPane = Tabs.TabPane

class MyApp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableDatas: [],
      hotSearchDatas: [],
      currentType: 'teaching',
      changeState: 0,
      newNewsNum: {},
      detail: {
        visible: false
      },
      tabsType: 'rj'
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
  // 获取新消息数量
  getNewNewsNum = (num) => {
    this.setState({
      newNewsNum: num
    })
  }
  /**
   * 查看详情
   * */
  showDetail = (record) => {
    const thiz = this
    console.log(record)
    // 获取对应的后台数据
    const params = {
      appId: record.APP_ID,
      appVersion: record.APP_VERSION
    }

    bussDetailv2(params, (res) => {
      const resData = res.data ? res.data : {}
      thiz.setState({
        detail: {
          ...thiz.state.detModalCon,
          APP_NAME: record.APP_NAME,
          resData: resData,
          APP_ID: record.APP_ID,
          visible: true
        }
      })
    })
  }
  /**
   * 取消详情
   * */
  handleAppDetCancel = () => {
    this.setState({
      detail: {
        ...this.state.detail,
        visible: false
      }
    })
  }
  // 改变tabs的值
  changeTypeOfTabs = (value) => {
    this.setState({
      tabsType: value
    })
  }
  render () {
    const {detail, tabsType} = this.state
    return (
      <div style={{width: '80%', margin: 'auto', paddingTop: '20px', paddingLeft: '30px', backgroundColor: '#fff', paddingRight: '30px', minHeight: '900px'}}>
        <Tabs defaultActiveKey='rj' onChange={this.changeTypeOfTabs}>
          <Tabs.TabPane key='rj' tab={<strong>软件应用</strong>}>
            <Tabs defaultActiveKey='class' onChange={() => this.changeState()}>
              <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={this.state.newNewsNum && (this.state.newNewsNum.news1 || 0)}>运营中</Badge>} key='class' >
                <MyAppOperationTable tabsType={tabsType} getNewNewsNum={this.getNewNewsNum} {...this.props} state={this.state.changeState} dataSource={this.state.tableDatas} showDetail={this.showDetail} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={this.state.newNewsNum && (this.state.newNewsNum.news2 || 0)}>审核中</Badge>} key='text' >
                <MyAppExamineTable {...this.props} tabsType={tabsType} state={this.state.changeState} dataSource={this.state.tableDatas} showDetail={this.showDetail} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={this.state.newNewsNum && (this.state.newNewsNum.news3 || 0)}>迭代审核</Badge>} key='grade' >
                <MyAppIterationTable {...this.props} tabsType={tabsType} state={this.state.changeState} dataSource={this.state.tableDatas} showDetail={this.showDetail} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={this.state.newNewsNum && (this.state.newNewsNum.news4 || 0)}>未通过审核</Badge>} key='reject' >
                <Reject {...this.props} state={this.state.changeState} dataSource={this.state.tableDatas} showDetail={this.showDetail} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={this.state.newNewsNum && (this.state.newNewsNum.news5 || 0)}>应用下架</Badge>} key='remove' >
                <Remove {...this.props} state={this.state.changeState} dataSource={this.state.tableDatas} showDetail={this.showDetail} />
              </Tabs.TabPane>
            </Tabs>
          </Tabs.TabPane>
          <Tabs.TabPane key='pt' tab={<strong>平台应用</strong>}>
            {/* 平台相关的列表 */}
            <Tabs defaultActiveKey='running'>
              <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={this.state.newNewsNum && (this.state.newNewsNum.news1 || 0)}>运营中</Badge>} key='running'>
                <MyAppOperationTable tabsType={tabsType} getNewNewsNum={this.getNewNewsNum} {...this.props} state={this.state.changeState} dataSource={this.state.tableDatas} showDetail={this.showDetail} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={this.state.newNewsNum && (this.state.newNewsNum.news2 || 0)}>审核中</Badge>} key='waiting'>
                <MyAppExamineTable {...this.props} tabsType={tabsType} state={this.state.changeState} dataSource={this.state.tableDatas} showDetail={this.showDetail} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={this.state.newNewsNum && (this.state.newNewsNum.news3 || 0)}>迭代审核</Badge>} key='cycle'>
                <MyAppIterationTable {...this.props} tabsType={tabsType} state={this.state.changeState} dataSource={this.state.tableDatas} showDetail={this.showDetail} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={this.state.newNewsNum && (this.state.newNewsNum.news4 || 0)}>未通过审核</Badge>} key='reject'>
                <Reject {...this.props} state={this.state.changeState} dataSource={this.state.tableDatas} showDetail={this.showDetail} />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<Badge style={{top: '-18px', right: '-30px'}} count={this.state.newNewsNum && (this.state.newNewsNum.news5 || 0)}>应用下架</Badge>} key='remove'>
                <Remove {...this.props} state={this.state.changeState} dataSource={this.state.tableDatas} showDetail={this.showDetail} />
              </Tabs.TabPane>
            </Tabs>
          </Tabs.TabPane>
        </Tabs>
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
        <div className='app-detail-wrap' ref='appDetailElem' />
        <AppDetailModal
          title={detail.APP_NAME}
          getContainer={() => this.refs.appDetailElem}
          visible={detail.visible}
          onCancel={this.handleAppDetCancel}
          resData={detail.resData}
          footer={[
            <Button key='back' type='primary' onClick={this.handleAppDetCancel}>关闭</Button>
          ]}
        />
      </div>
    )
  }
}

export default MyApp
