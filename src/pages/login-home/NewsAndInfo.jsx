/**
 * 游客登陆-信息公开
 */
import React from 'react'
import { Row, Col, List } from 'antd'
import PropTypes from 'prop-types'

export default class NewsAndInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <Row className='news-info-container'>
          <Col span={12}>
            <div className='title'>教育新闻 <span>Education News</span></div>
            <List
              className='info-list'
              itemLayout='horizontal'
              dataSource={this.props.data.newsData}
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
              dataSource={this.props.data.infoData}
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
NewsAndInfo.propTypes = {
  data: PropTypes.object
}
