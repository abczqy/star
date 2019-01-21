/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * 消息通知详情
 */
import React from 'react'
import {Card} from 'antd'
import {getSearchString} from 'utils/index'
import {getAllMessageList} from '../../services/topbar-mation/index'
import '../../views/Operateview.scss'
import { withRouter } from 'react-router'

class MessageDetail extends React.Component {
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
      console.log(this.state.msg_id)
      this.getListDetail()
    })
  }
  // 获取详情
  getListDetail=() => {
    // getMessageListDetail({
    //   MSG_ID: this.state.msg_id
    // }, (response) => {
    //   this.setState({
    //     detailData: response.data[0]
    //   })
    getAllMessageList({
      id: this.state.msg_id
    }, (response) => {
      console.log(response)
      this.setState({
        detailData: response.data.data
      })
      // this.setState({
      //   listData: response.data.data,
      //   total: response.data.total
      // })
    })
  }
  render () {
    return (
      <div className='center-view mb20'>
        <Card title='消息通知详情' bordered={false} className='message-notice-card'extra={<a onClick={() => { this.handleTabChange('notice') }}>{'<返回'}</a>}>
          <div className='notice-detail'>
            <h4>{(this.state.detailData && this.state.detailData.msg_title) || '通知消息'}</h4>
            <p>{this.state.detailData && this.state.detailData.message.content}</p>
          </div>
        </Card>
      </div>
    )
  }
}
export default withRouter(MessageDetail)
