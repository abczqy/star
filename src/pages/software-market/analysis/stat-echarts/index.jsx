/**
 * 运营统计 - echarts部分
 */
import React, { Component } from 'react'
import { Row, Col, Avatar, Icon, Progress } from 'antd'
// import img1 from '../../../../assets/images/work-plat/user-icon.png'
// import img2 from '../../../../assets/images/work-plat/app-icon.png'
// import img3 from '../../../../assets/images/work-plat/book-icon.png'
// import img4 from '../../../../assets/images/work-plat/sales-icon.png'
// import img5 from '../../../../assets/images/work-plat/revenue-icon.png'
import imgline from '../../../../assets/images/work-plat/yytj-line.png'
import './StatEcharts.scss'

class StatEcharts extends Component {
  render () {
    return (
      <div style={{backgroundColor: '#F0F2F5', marginBottom: '20px'}}>
        <div style={{padding: '20px', backgroundColor: 'white', marginBottom: '20px'}}>
          <Row type='flex' justify='space-between'
            style={{
              fontWeight: '400',
              fontStyle: 'normal',
              fontSize: '20px',
              backgroundColor: 'white',
              color: 'rgba(0, 0, 0, 0.847058823529412)'
            }}>
            <Col span={4}>
              <Avatar
                style={{backgroundColor: '#2FB7F5'}}
                size='large' icon='user' />
            &nbsp;&nbsp;用户统计
            </Col>
            <Col span={4}>
              <Avatar
                style={{backgroundColor: '#808BC6'}}
                size='large' icon='appstore' />
            &nbsp;&nbsp;应用统计
            </Col>
            <Col span={4}>
              <Avatar
                style={{backgroundColor: '#7CC856'}}
                size='large' icon='profile' />
            &nbsp;&nbsp;订单统计
            </Col>
            <Col span={4}>
              <Avatar
                style={{backgroundColor: '#FABF02'}}
                size='large' icon='line-chart' />
            &nbsp;&nbsp;销售统计
            </Col>
            <Col span={4}>
              <Avatar
                style={{backgroundColor: '#5D6977'}}
                size='large' icon='money-collect' />
            &nbsp;&nbsp;营收状况统计
            </Col>
          </Row>
        </div>
        <div style={{padding: '20px', backgroundColor: 'white', marginBottom: '20px'}}>
          <Row type='flex' justify='space-between' >
            <Col span={7}>
              <Row>
                <Col span={12}>
                  今日流入
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                  <Icon type='arrow-up' />10%&nbsp;&nbsp;&nbsp;&nbsp;同比上周
                </Col>
              </Row>
              <Row>
                <Col style={{
                  fontWeight: '400',
                  fontStyle: 'normal',
                  fontSize: '24px',
                  color: 'rgba(0, 0, 0, 0.847058823529412)'
                }}>
                  123,381
                </Col>
              </Row>
              <Row>
                <Col>
                  <img src={imgline} />
                </Col>
              </Row>
            </Col>
            <Col span={1} style={{backgroundColor: '#F0F2F5', marginTop: '-20px', marginBottom: '-20px'}} />
            <Col span={7}>
              <Row>
                <Col span={12}>
                支付成功率
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                  <Icon type='arrow-up' />10%&nbsp;&nbsp;&nbsp;&nbsp;同比上周
                </Col>
              </Row>
              <Row>
                <Col style={{
                  fontWeight: '400',
                  fontStyle: 'normal',
                  fontSize: '24px',
                  color: 'rgba(0, 0, 0, 0.847058823529412)'
                }}>
                  80%
                </Col>
              </Row>
              <Row>
                <Col>
                  <Progress percent={80} showInfo={false} strokeColor='#00B9FB' />
                </Col>
              </Row>
            </Col>
            <Col span={1} style={{backgroundColor: '#F0F2F5', marginTop: '-20px', marginBottom: '-20px'}} />
            <Col span={7}>
              <Row>
                <Col span={12}>
                自助服务占比
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                  <Icon type='arrow-up' />10%&nbsp;&nbsp;&nbsp;&nbsp;同比上周
                </Col>
              </Row>
              <Row>
                <Col style={{
                  fontWeight: '400',
                  fontStyle: 'normal',
                  fontSize: '24px',
                  color: 'rgba(0, 0, 0, 0.847058823529412)'
                }}>
                  66%
                </Col>
              </Row>
              <Row>
                <Col>
                  <Progress percent={66} showInfo={false} strokeColor='#40D73A' />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div style={{padding: '20px', backgroundColor: 'white', marginBottom: '20px'}}>
          <Row type='flex' justify='space-between' style={{
            fontWeight: '400',
            fontStyle: 'normal',
            fontSize: '12px',
            color: 'rgba(0, 0, 0, 0.847058823529412)',
            lineHeight: '22px'
          }}>
            <Col span={7}>
              <Row>
                <Col style={{textAlign: 'center'}}>
                  <Avatar
                    style={{backgroundColor: '#2FB7F5'}}
                    size='large' icon='user' />
                </Col>
              </Row>
              <Row style={{borderBottom: '1px solid #F0F2F5', marginTop: '10px', marginBottom: '10px'}}>
                <Col span={12}>
                  新增用户
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                  4200
                </Col>
              </Row>
              <Row style={{borderBottom: '1px solid #F0F2F5', marginTop: '10px', marginBottom: '10px'}}>
                <Col span={12}>
                访问用户
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                1231420
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                用户总数
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                8892220
                </Col>
              </Row>
            </Col>
            <Col span={1} style={{backgroundColor: '#F0F2F5', marginTop: '-20px', marginBottom: '-20px'}} />
            <Col span={7}>
              <Row>
                <Col style={{textAlign: 'center'}}>
                  <Avatar
                    style={{backgroundColor: '#1572FA'}}
                    size='large' icon='money-collect' />
                </Col>
              </Row>
              <Row style={{borderBottom: '1px solid #F0F2F5', marginTop: '10px', marginBottom: '10px'}}>
                <Col span={12}>
                支付卖家数
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                420
                </Col>
              </Row>
              <Row style={{borderBottom: '1px solid #F0F2F5', marginTop: '10px', marginBottom: '10px'}}>
                <Col span={12}>
                支付订单
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                420
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                支付金额
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                92220
                </Col>
              </Row>
            </Col>
            <Col span={1} style={{backgroundColor: '#F0F2F5', marginTop: '-20px', marginBottom: '-20px'}} />
            <Col span={7}>
              <Row>
                <Col style={{textAlign: 'center'}}>
                  <Avatar
                    style={{backgroundColor: '#808BC6'}}
                    size='large' icon='appstore' />
                </Col>
              </Row>
              <Row style={{borderBottom: '1px solid #F0F2F5', marginTop: '10px', marginBottom: '10px'}}>
                <Col span={12}>
                新增用户
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                  20
                </Col>
              </Row>
              <Row style={{borderBottom: '1px solid #F0F2F5', marginTop: '10px', marginBottom: '10px'}}>
                <Col span={12}>
                下架应用数
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                4
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                应用总数
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                4209
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div style={{padding: '20px', backgroundColor: 'white', marginBottom: '20px'}}>
          <Row type='flex' justify='space-between'>
            <Col span={8} style={{borderRight: '1px solid #F0F2F5'}}>
              <Row style={{textAlign: 'center'}}>
                <Col>学生总数</Col>
                <Col style={
                  {
                    fontWeight: '400',
                    fontStyle: 'normal',
                    fontSize: '32px',
                    lineHeight: '42px'
                  }
                }>78331人</Col>
              </Row>
            </Col>
            <Col span={8} style={{borderRight: '1px solid #F0F2F5'}}>
              <Row style={{textAlign: 'center'}}>
                <Col>最近一周新增学生数</Col>
                <Col style={
                  {
                    fontWeight: '400',
                    fontStyle: 'normal',
                    fontSize: '32px',
                    lineHeight: '42px'
                  }
                }>4234人</Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row style={{textAlign: 'center'}}>
                <Col>最近一月新增学生数</Col>
                <Col style={
                  {
                    fontWeight: '400',
                    fontStyle: 'normal',
                    fontSize: '32px',
                    lineHeight: '42px'
                  }
                }>24331人</Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default StatEcharts
