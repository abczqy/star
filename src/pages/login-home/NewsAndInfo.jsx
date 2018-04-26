/* eslint-disable react/prop-types */
/**
 * 游客登陆-信息公开
 */
import React from 'react'
import { Row, Col, List, message } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import moment from 'moment'
import webStorage from 'webStorage'

class NewsAndInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // eslint-disable-next-line react/prop-types
  handleNewsTitleClick (item) {
    let STAR_WEB_ROLE_CODE = webStorage.getItem('STAR_WEB_ROLE_CODE')
    if (STAR_WEB_ROLE_CODE === '' || STAR_WEB_ROLE_CODE === null) {
      message.warning('请先登录!')
      return
    }
    this.props.history.push('/unlogged/newsDetails?' + item.news_id)
  }

  // eslint-disable-next-line react/prop-types
  handleInfoTitleClick (item) {
    let STAR_WEB_ROLE_CODE = webStorage.getItem('STAR_WEB_ROLE_CODE')
    if (STAR_WEB_ROLE_CODE === '' || STAR_WEB_ROLE_CODE === null) {
      message.warning('请先登录!')
      return
    }
    this.props.history.push('/unlogged/informationDet?' + item.info_id)
  }

  processStr (str, n) {
    let l = str.length
    if (l <= n) return str
    return str.slice(0, n) + '...'
  }

  getMonth (str) {
    let s = ''
    if (str) {
      s = parseInt(moment('str').month()) + 1
    }
    return s
  }

  getDay (str) {
    let s = ''
    if (str) {
      s = moment('str').day()
    }
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
                    title={<a onClick={() => { this.handleNewsTitleClick(item) }}>{item.news_title}</a>}
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
                    title={<a onClick={() => { this.handleInfoTitleClick(item) }}>{item.info_title}</a>}
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
