/**
 * 游客登陆首页
 */
import React from 'react'
import { Layout, Tabs } from 'antd'
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'

export default class LoginHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <Layout>
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
