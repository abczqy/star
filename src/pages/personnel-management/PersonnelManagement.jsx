/**
 * 人员管理
 */

import React, {Component} from 'react'
import { Layout, Button } from 'antd'
import './PersonnelManagement.scss'

const { Sider, Content } = Layout

class PersonnelManagement extends Component {
  render () {
    return (
      <Layout className='personnel-management center-view'>
        <Sider>
          <div className='sider-header'>
            <span className='title'>人员管理</span>
            <span className='sub-title'>Personnel Management</span>
          </div>
          <Button onClick={() => { this.typeSwitch('teacher') }} >教师管理</Button>
          <Button onClick={() => { this.typeSwitch('student') }} >学生管理</Button>

        </Sider>
        <Content>人员管理</Content>
      </Layout>
    )
  }
}

export default PersonnelManagement
