import React from 'react'
import { Tabs } from 'antd'
import { School, Teacher, Student, Parent, EducationalServices, Manufacturer, FreeRegister, Agent, Examine, Tourist } from 'pages/software-market'
import './HomeMember.scss'

const TabPane = Tabs.TabPane

class HomeMember extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schoolType: 1,
      searchSchool: null
    }
  }
  changeState = (type, record = {}) => {
    const thiz = this
    this.setState({
      searchSchool: record.schoolName || ''
    }, () => {
      console.log(this.state.searchSchool)
      thiz.setState({
        schoolType: type
      })
    })
  }
  onTabClick = (tabKey) => {
    if (tabKey === '2') {
      this.setState({
        schoolType: 1
      })
    }
  }

  render () {
    const { schoolType, searchSchool } = this.state
    const thiz = this
    const school = function () {
      switch (schoolType) {
        case 1:
          return <School changeState={thiz.changeState} />
        case 2:
          return <Teacher changeState={thiz.changeState} AUTHORITY_NAME={searchSchool} />
        case 3:
          return <Parent changeState={thiz.changeState} />
        case 4:
          return <Student changeState={thiz.changeState} AUTHORITY_NAME={searchSchool} />
        default:
          return null
      }
    }
    return (
      <div className='home-member'>
        <Tabs defaultActiveKey={'1'} type='card' onTabClick={this.onTabClick}>
          <TabPane tab='自注册用户' key='1'>
            <FreeRegister />
          </TabPane>
          <TabPane tab='学校' key='2'>
            <div className='inner-change'>
              所属类目：
              <span className={schoolType === 2 ? 'active' : null} onClick={() => this.changeState(2)}>老师</span>
              <span className={schoolType === 4 ? 'active' : null} onClick={() => this.changeState(4)}>学生</span>
              <span className={schoolType === 3 ? 'active' : null} onClick={() => this.changeState(3)}>家长</span>
            </div>
            {school()}
          </TabPane>
          <TabPane tab='教育机构' key='3'>
            <EducationalServices />
          </TabPane>
          <TabPane tab='厂商' key='4'>
            <Manufacturer />
          </TabPane>
          <TabPane tab='代理商' key='5'>
            <Agent />
          </TabPane>
          <TabPane tab='审核用户' key='6'>
            <Examine />
          </TabPane>
          <TabPane tab='家长审核' key='7'>
            <Tourist />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

HomeMember.propTypes = {}

export default HomeMember
