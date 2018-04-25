/* eslint-disable react/prop-types */
/**
 * 游客登陆-信息公开
 */
import React from 'react'
import { Row, Col, List } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import moment from 'moment'

class NewsAndInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // eslint-disable-next-line react/prop-types
  handleNewsTitleClick () {
    this.props.history.push('/unlogged/newsList')
  }

  // eslint-disable-next-line react/prop-types
  handleInfoTitleClick () {
    this.props.history.push('/unlogged/information')
  }

  processStr (str, n) {
    let l = str.length
    if (l <= n) return str
    return str.slice(0, n) + '...'
  }

  getMonth (str) {
    // .month()
    let s = moment(str).format('YYYY-MM-DD')
    return s
  }

  getDay (str) {
    let s = moment('2018-2-5').dayOfYear()
    return s
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
              dataSource={this.props.newsData}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className='avatar-title'>
                        <div>{this.getDay(item.news_time)}</div>
                        <div>{this.getMonth(item.news_time)}</div>
                      </div>
                    }
                    title={<a onClick={() => { this.handleNewsTitleClick() }}>{item.news_title}</a>}
                    description={this.processStr(item.news_desc, 50)}
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
              dataSource={this.props.infoData}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className='avatar-title'>
                        <div>{this.getDay(item.info_time)}</div>
                        <div>{this.getMonth(item.info_time)}</div>
                      </div>
                    }
                    title={<a onClick={() => { this.handleInfoTitleClick() }}>{item.info_title}</a>}
                    description={this.processStr(item.info_desc, 50)}
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
  newsData: PropTypes.array,
  infoData: PropTypes.array
}
export default withRouter(NewsAndInfo)
