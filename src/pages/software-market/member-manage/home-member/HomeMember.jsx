import React from 'react'
import { Tabs } from 'antd'
import { School, Teacher, Student, Parent, EducationalServices, Manufacturer, FreeRegister } from 'pages/software-market'

const TabPane = Tabs.TabPane

class HomeMember extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schoolType: 1
    }
  }
  componentDidMount () {
    // console.log(window.location.split('/'))
  }
  changeState = (type, record = {}) => {
    console.log(record)
    this.setState({
      schoolType: type
    })
  }

  render () {
    const { schoolType } = this.state
    const thiz = this
    const school = function () {
      switch (schoolType) {
        case 1:
          return <School changeState={thiz.changeState} />
        case 2:
          return <Teacher changeState={thiz.changeState} />
        case 3:
          return <Parent changeState={thiz.changeState} />
        case 4:
          return <Student changeState={thiz.changeState} />
        default:
          return null
      }
    }
    return (
      <div>
        <Tabs defaultActiveKey={'1'} type='card'>
          <TabPane tab='自注册用户' key='1'>
            <FreeRegister />
          </TabPane>
          <TabPane tab='学校' key='2'>
            {school()}
          </TabPane>
          <TabPane tab='教育机构' key='3'>
            <EducationalServices />
          </TabPane>
          <TabPane tab='厂商' key='4'>
            <Manufacturer />
          </TabPane>
          <TabPane tab='代理商' key='5'>
            代理商
          </TabPane>
          <TabPane tab='审核用户' key='6'>
            审核用户
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

HomeMember.propTypes = {}

export default HomeMember
