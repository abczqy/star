/**
 * 运营管理入口
 */
import React from 'react'
import { Layout, Tabs } from 'antd'
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'

export default class OperateManage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <Layout>
          <div style={{height: '30px'}}>
            <div style={{height: '30px', float: 'left'}}>欢迎你，小姐姐</div>
            <div style={{height: '30px', float: 'right'}}>欢迎你，小姐姐</div>
          </div>
          <Layout.Header className='xingyun-header' style={{height: '92px'}}>
            <div className='xingyun-logo' style={{marginTop: '30px'}} />
          </Layout.Header>
          <Layout className='xingyun-top-bar'>
            <Tabs defaultActiveKey='home'>
              <Tabs.TabPane tab='首页' key='home'>Content of Tab Pane 1</Tabs.TabPane>
              <Tabs.TabPane tab='教育新闻' key='education-news'>Content of Tab Pane 2</Tabs.TabPane>
              <Tabs.TabPane tab='信息公开' key='info-public'>Content of Tab Pane 3</Tabs.TabPane>
            </Tabs>
          </Layout>
        </Layout>
      </div>
    )
  }
}
