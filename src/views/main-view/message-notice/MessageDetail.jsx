/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * 消息通知详情
 */
import React from 'react'
import {Card} from 'antd'
import {getSearchString} from '../../../utils/index'
import '../Operateview.scss'
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
    console.log('消息通知详情', getSearchString(this.props.location.search, 'id'))
  }

  render () {
    return (
      <div className='center-view'>
        <Card title='消息通知详情' bordered={false} className='message-notice-card'extra={<a onClick={() => { this.handleTabChange('notice') }}>{'<返回'}</a>}>
          <div className='notice-detail'>
            <h4>这个是标题</h4>
            <p>这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容这个是内容</p>
          </div>
        </Card>
      </div>
    )
  }
}
