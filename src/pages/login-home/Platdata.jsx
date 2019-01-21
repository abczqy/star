/* eslint-disable react/prop-types */
/**
 * 门户页教育新闻和信息公开
 */
import React from 'react'
import { withRouter } from 'react-router'
import { Row, Col, Card, Progress } from 'antd'
// import Echarts from 'components/common/Echarts'
import './Platdata.scss'
import imgTeacher from '../../assets/images/login-home/u888.png'
import imgStudent from '../../assets/images/login-home/u892.png'
import imgParent from '../../assets/images/login-home/u896.png'
import {axios} from '../../utils'
import ajaxUrl from 'config'

const { API_BASE_URL_V2 } = ajaxUrl
const { Meta } = Card

class Platdata extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      optionUserActivity: {},
      optionUserUtilization: {},
      userInfo: {
        teacher: 0,
        student: 0,
        parent: 0,
        activeProportion: 0,
        userCount: 0
      }
    }
  }

  getOption (value, color, title) {
    return {
      title: {
        text: title,
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          color: '#474747',
          fontSize: '12'
        }
      },
      legend: {
        show: false
      },
      series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: true,
        radius: ['32%', '39%'],
        center: ['50%', '20%'],
        data: [{
          value: value,
          label: {
            normal: {
              formatter: '{d}%',
              position: 'center',
              show: true,
              textStyle: {
                fontSize: '10',
                fontWeight: 'normal',
                color: color
              }
            }
          },
          itemStyle: {
            normal: {
              color: color
            }
          }
        }, {
          value: 100.0000001 - value,
          name: 'invisible',
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            normal: {
              color: 'grey', // 未完成的圆环的颜色
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              color: 'grey' // 未完成的圆环的颜色
            }
          }
        }]
      }]
    }
  }

  getData = () => {
    axios.get(API_BASE_URL_V2 + '/portal/user-list/number').then(res => {
      const data = res.data.data
      if (data) {
        let userInfo = {}
        data.roleCount.forEach((item) => {
          if (item.ROLE_ID === 1) {
            userInfo.student = item.COUNT || 0
          } else if (item.ROLE_ID === 2) {
            userInfo.teacher = item.COUNT || 0
          } else if (item.ROLE_ID === 5) {
            userInfo.parent = item.COUNT || 0
          }
        })
        userInfo.activeProportion = data.activeProportion || 0
        userInfo.userCount = data.userCount || 0
        this.setState({userInfo})
      }
    })
  }
  componentDidMount () {
    this.getData()
    this.setState({
      optionUserActivity: this.getOption(80, '#4ECB73', '用户活跃度'),
      optionUserUtilization: this.getOption(100, '#3AA0FF', '用户使用率')
    })
  }

  render () {
    const { userInfo } = this.state
    return (
      <div className='platdata-container'>
        <Row>
          <Col span={24}>
            <span>&nbsp;&nbsp;&nbsp;已开通的用户&nbsp;&nbsp;&nbsp;</span>
            <span
              style={
                {
                  fontSize: '22px',
                  color: '#3AA0FF'
                }
              }>{userInfo.userCount}</span>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Card
              style={{textAlign: 'center'}}
              hoverable
              cover={<img alt='' src={imgTeacher} />}
            >
              <Meta
                title='老师'
                description={userInfo.teacher}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{textAlign: 'center'}}
              hoverable
              cover={<img alt='' src={imgStudent} />}
            >
              <Meta
                title='学生'
                description={userInfo.student}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{textAlign: 'center'}}
              hoverable
              cover={<img alt='' src={imgParent} />}
            >
              <Meta
                title='家长'
                description={userInfo.parent}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <div className='echartsRow-bg'>
            <div className='echartsRow'>
              {/* <Col span={12}>
                <Echarts options={this.state.optionUserActivity} />
              </Col>
              <Col span={12}>
                <Echarts options={this.state.optionUserUtilization} />
              </Col> */}
              <Col span={2} />
              <Col span={20}>
                用户活跃度：<br />
                <Progress percent={userInfo.activeProportion * 100} status='active' />
              </Col>
            </div>
          </div>
        </Row>
      </div>
    )
  }
}
export default withRouter(Platdata)
