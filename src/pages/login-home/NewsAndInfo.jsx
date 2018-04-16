/**
 * 游客登陆-信息公开
 */
import React from 'react'
import { Row, Col, List } from 'antd'

export default class NewsAndInfo extends React.Component {
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
      <div>
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
                    avatar={
                      <div className='avatar-title'>
                        <div>{item.day}</div>
                        <div>{item.month}</div>
                      </div>
                    }
                    title={<a href=''>{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={12}>
            <div className='title'>信息公开 <span>Information Disclosure</span></div>
            <List
              className='info-list'
              itemLayout='horizontal'
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className='avatar-title'>
                        <div>{item.day}</div>
                        <div>{item.month}</div>
                      </div>
                    }
                    title={<a href=''>{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
