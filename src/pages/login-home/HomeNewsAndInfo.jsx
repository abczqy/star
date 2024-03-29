/* eslint-disable react/prop-types */
/**
 * 门户页教育新闻和信息公开
 */
import React from 'react'
import { withRouter } from 'react-router'
import moment from 'moment'
import { Row, Col } from 'antd'

class HomeNewsAndInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  // eslint-disable-next-line react/prop-types
  handleNewsTitleClick (item) {
    this.props.history.push('/home/newsDetails?' + item.id)
    this.props.changeActiveTab('newsList')
  }

  // eslint-disable-next-line react/prop-types
  handleInfoTitleClick (item) {
    this.props.history.push('/home/informationDet?' + item.id)
    this.props.changeActiveTab('information')
  }

  getMonth (str) {
    let s = ''
    if (str) {
      s = parseInt(moment(str).month()) + 1
    }
    return s
  }

  render () {
    let item = this.props.infoOrNewsData || ''
    let isNews = this.props.isNews || false
    let index = this.props.index || ''
    return (
      <div>
        <Row style={{lineHeight: '26px'}}>
          <Col span={1}>
            <span
              style={
                {
                  display: 'inline-block',
                  backgroundColor: index > 3 ? '#CCCCCC' : '#70BC00',
                  width: 12,
                  height: 12,
                  borderRadius: 12,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  lineHeight: 1,
                  margin: 'auto'
                }
              }>
              {index}
            </span>
          </Col>
          <Col span={20}>
            <a
              onClick={() => { isNews ? this.handleNewsTitleClick(item) : this.handleInfoTitleClick(item) }}
              style={{color: '#474747',
                fontSize: '12px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
                display: 'inline-block'
              }}
            >
              {item.contentTitle || '无'}
            </a>
          </Col>
          <Col span={3}>
            <span style={{float: 'right'}}>
              [{moment(item.updateTime).format('MM-DD')}]
              {/* [{this.getMonth(item.updateTime)}-{this.getDay(item.updateTime)}] */}
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default withRouter(HomeNewsAndInfo)
