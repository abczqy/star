/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * 消息通知详情
 */
import React from 'react'
import {Card} from 'antd'
import {getSearchString} from 'utils/index'
import {getMessageListDetail} from '../../services/topbar-mation/index'
import '../../views/Operateview.scss'
export default class MessageDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleTabChange (link, news) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    this.props.history.push({pathname: link})
    // window.location.href = 'http://localhost:8080/#' + link
  }
  componentDidMount () {
    this.setState({
      msg_id: getSearchString(this.props.location.search, 'id')
    }, () => {
      this.getListDetail()
    })
    console.log('消息通知详情', getSearchString(this.props.location.search, 'id'))
  }
  // 获取详情
  getListDetail=() => {
    getMessageListDetail({
      MSG_ID: this.state.msg_id
    }, (response) => {
      this.setState({
        detailData: response.data[0]
      })
    })
  }
  render () {
    return (
      <div className='center-view mb20'>
        <Card title='消息通知详情' bordered={false} className='message-notice-card'extra={<a onClick={() => { this.handleTabChange('notice') }}>{'<返回'}</a>}>
          <div className='notice-detail'>
            <h4>{this.state.detailData && this.state.detailData.msg_title}</h4>
            <p>{this.state.detailData && this.state.detailData.msg_desc}</p>
          </div>
        </Card>
      </div>
    )
  }
}
