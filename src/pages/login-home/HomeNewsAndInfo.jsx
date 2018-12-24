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
    // switch (s) {
    //   case 1:
    //     s = '01'
    //     break
    //   case 2:
    //     s = '02'
    //     break
    //   case 3:
    //     s = '03'
    //     break
    //   case 4:
    //     s = '04'
    //     break
    //   case 5:
    //     s = '05'
    //     break
    //   case 6:
    //     s = '06'
    //     break
    //   case 7:
    //     s = '07'
    //     break
    //   case 8:
    //     s = '08'
    //     break
    //   case 9:
    //     s = '09'
    //     break
    //   case 10:
    //     s = '10'
    //     break
    //   case 11:
    //     s = '11'
    //     break
    //   case 12:
    //     s = '12'
    //     break
    //   default:
    //     s = ''
    // }
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
              {isNews ? (item.news_title || '无') : (item.info_title || '无')}
            </a>
          </Col>
          <Col span={3}>
            <span style={{float: 'right'}}>
              [{this.getMonth(item.news_time || item.info_time)}-{this.getDay(item.news_time || item.info_time)}]
            </span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default withRouter(HomeNewsAndInfo)
