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
<<<<<<< HEAD

=======
import {axios} from '../../utils'
import ajaxUrl from 'config'

const { API_BASE_URL_V2 } = ajaxUrl
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
const { Meta } = Card

class Platdata extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      optionUserActivity: {},
<<<<<<< HEAD
      optionUserUtilization: {}
=======
      optionUserUtilization: {},
      userInfo: {
        teacher: 0,
        student: 0,
        parent: 0,
        activeProportion: 0,
        userCount: 0
      }
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
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

<<<<<<< HEAD
  componentDidMount () {
=======
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
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
    this.setState({
      optionUserActivity: this.getOption(80, '#4ECB73', '用户活跃度'),
      optionUserUtilization: this.getOption(100, '#3AA0FF', '用户使用率')
    })
  }

  render () {
<<<<<<< HEAD
=======
    const { userInfo } = this.state
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
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
<<<<<<< HEAD
              }>14131912</span>
=======
              }>{userInfo.userCount}</span>
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
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
<<<<<<< HEAD
                description='565758'
=======
                description={userInfo.teacher}
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
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
<<<<<<< HEAD
                description='4577949'
=======
                description={userInfo.student}
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
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
<<<<<<< HEAD
                description='8975185'
=======
                description={userInfo.parent}
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
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
<<<<<<< HEAD
                <Progress percent={80} status='active' />
=======
                <Progress percent={userInfo.activeProportion * 100} status='active' />
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
              </Col>
            </div>
          </div>
        </Row>
      </div>
    )
  }
}
export default withRouter(Platdata)
