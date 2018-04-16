/* eslint-disable react/jsx-no-bind */
/**
 * 游客登陆界面
 */
import React from 'react'
import { Layout, Tabs } from 'antd'
import Home from '../../pages/login-home/Home'
import News from '../../pages/login-home/News'
import Info from '../../pages/login-home/NewsAndInfo'
import PersonalCenter from '../../pages/personal-center/PersonalCenter'
import MarketAnalysis from '../../pages/market-analysis/MarketAnalysis'
import StatisticalAnalysis from '../../pages/statistical-analysis/StatisticalAnalysis'
import PersonnelManagement from '../../pages/personnel-management/PersonnelManagement'
// import { renderRoutes } from 'react-router-config'
// import { withRouter } from 'react-router-dom'

export default class LoginHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 'home'
    }
  }

  handleTabChange (key) {
    this.setState({
      activeTab: key
    })
  }

  render () {
    return (
      <div>
        <Layout>
          <Layout.Header className='xingyun-header' style={{height: '92px'}}>
            <div className='xingyun-logo' style={{marginTop: '30px'}} />
          </Layout.Header>
          <Layout className='xingyun-top-bar'>
            <Tabs defaultActiveKey={this.state.activeTab} onChange={this.handleTabChange.bind(this)}>
              <Tabs.TabPane tab='首页' key='home'>
                <Home />
              </Tabs.TabPane>
              <Tabs.TabPane tab='教育新闻' key='education-news'>
                <News />
              </Tabs.TabPane>
              <Tabs.TabPane tab='信息公开' key='info-public'>
                <Info />
              </Tabs.TabPane>
              <Tabs.TabPane tab='人员管理' key='personnel-management'>
                <PersonnelManagement />
              </Tabs.TabPane>
              <Tabs.TabPane tab='个人中心' key='personal-center'>
                <PersonalCenter />
              </Tabs.TabPane>
              <Tabs.TabPane tab='统计分析' key='statistical-analysis'>
                <StatisticalAnalysis />
              </Tabs.TabPane>
              <Tabs.TabPane tab='市场分析' key='market-analysis'>
                <MarketAnalysis />
              </Tabs.TabPane>

            </Tabs>
          </Layout>
        </Layout>
      </div>
    )
  }
}
