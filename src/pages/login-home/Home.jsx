/**
 * 游客登陆-首页
 */
import React from 'react'
import { Row, Col, List, Avatar } from 'antd'
import MainBander from './MainBander'
import WebApp from './WebApp'
import SoftMarket from './SoftMarket'
import BottomHeader from '../../components/common/BottomHeader'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    let data = [
      {
        title: '教育部部署做好国家"万人计划"教学名师培养支持工作',
        description: '教育部部署做好国家"万人计划"教学名师培养支持工作hjshfdkjvfdkvnkfbkf',
        month: '二月',
        day: '08'
      },
      {
        title: '教育部部署做好国家"万人计划"教学名师培养支持工作',
        description: '教育部部署做好国家"万人计划"教学名师培养支持工作hjshfdkjvfdkvnkfbkf',
        month: '四月',
        day: '08'
      },
      {
        title: '教育部部署做好国家"万人计划"教学名师培养支持工作',
        description: '教育部部署做好国家"万人计划"教学名师培养支持工作hjshfdkjvfdkvnkfbkf',
        month: '六月',
        day: '08'
      }
    ]
    return (
      <div className='login-home-container' style={{border: '1px solid red', width: '100%', height: '100%'}}>
        <Row>
          <Col span={24}>
            <MainBander />
          </Col>
        </Row>
        <Row>
          <WebApp />
        </Row>
        <Row>
          <SoftMarket />
        </Row>
        <Row>
          <Col span={24}>
            <div className='bottom-banner'>
              <div className='div-wapper'>
                <div className='edu'>
                  <p>50<span className='more'>+</span></p>
                  <div className='category'>教育类App(个)</div>
                </div>
                <div className='teach'>
                  <p>80<span className='more'>+</span></p>
                  <div className='category'>教辅类App(个)</div>
                </div>
                <div className='manage'>
                  <p>70</p>
                  <div className='category'>管理类App(个)</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row className='news-info-container'>
              <Col span={12}>
                <div className='title'>教育新闻 <span>Education News</span></div>
                <List
                  className='info-list'
                  itemLayout='horizontal'
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<div className='avatar-title'>
                          <p>{item.month}</p>
                          <p>{item.day}</p>
                        </div>}
                        title={<a href='https://ant.design'>{item.title}</a>}
                        description='Ant Design, a design language for background applications, is refined by Ant UED Team'
                      />
                    </List.Item>
                  )}
                />
              </Col>
              <Col span={12}>
                <div className='title'>信息公开 <span>Information Disclosure</span></div>
                <List
                  itemLayout='horizontal'
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                        title={<a href='https://ant.design'>{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <BottomHeader />
        </Row>
      </div>
    )
  }
}
