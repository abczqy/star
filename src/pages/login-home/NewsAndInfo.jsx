/* eslint-disable react/prop-types */
/**
 * 游客登录-信息公开
 */
import React from 'react'
import { Row, Col, List } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import moment from 'moment'
import {processStr} from 'utils'

class NewsAndInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // eslint-disable-next-line react/prop-types
  handleNewsTitleClick (item) {
    this.props.history.push('/home/newsDetails?' + item.news_id)
    this.props.changeActiveTab('newsList')
  }

  // eslint-disable-next-line react/prop-types
  handleInfoTitleClick (item) {
    this.props.history.push('/home/informationDet?' + item.info_id)
    this.props.changeActiveTab('information')
  }

  getMonth (str) {
    let s = ''
    if (str) {
      s = parseInt(moment(str).month()) + 1
    }
    switch (s) {
      case 1:
        s = '一'
        break
      case 2:
        s = '二'
        break
      case 3:
        s = '三'
        break
      case 4:
        s = '四'
        break
      case 5:
        s = '五'
        break
      case 6:
        s = '六'
        break
      case 7:
        s = '七'
        break
      case 8:
        s = '八'
        break
      case 9:
        s = '九'
        break
      case 10:
        s = '十'
        break
      case 11:
        s = '十一'
        break
      case 12:
        s = '十二'
        break
      default:
        s = '一'
    }
    return s
  }

  getDay (str) {
    let s = ''
    if (str) {
      s = moment(str).day()
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
                        <div>{this.getMonth(item.news_time) + '月'}</div>
                      </div>
                    }
                    title={<a onClick={() => { this.handleNewsTitleClick(item) }}>{item.news_title}</a>}
                    description={processStr(item.news_desc, 50)}
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
                        <div>{this.getMonth(item.info_time) + '月'}</div>
                      </div>
                    }
                    title={<a onClick={() => { this.handleInfoTitleClick(item) }}>{item.info_title}</a>}
                    description={processStr(item.info_desc, 50)}
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
