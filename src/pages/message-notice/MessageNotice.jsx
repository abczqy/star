/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Card, Pagination} from 'antd'
import '../../views/Operateview.scss'
import { renderRoutes } from 'react-router-config'
import {getAllMessageList} from '../../services/topbar-mation'
import { withRouter } from 'react-router'
import webStorage from 'webStorage'
class MessageNotice extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pageNum: 1,
      listData: [], // 消息列表数据
      total: 0
    }
  }

  handleTabChange (link, id, ready) {
    if (ready === '0') {
      // getMessageCount({msg_id: id}, (response) => {
      //   webStorage.setItem('Unread_Message', response.data.count)
      //   this.props.updateMessageCount(response.data.count)
      // })
    }
    if (link === '审核通过') {
      // 审核通过跳转到我的应用
      this.props.history.push({
        pathname: '/operate-manage-home/all-app-detail-mine'
      })
    } else if (link === '消息通知') {
      this.props.history.push({pathname: 'detail', search: '?id=' + id})
    } else if (link === '申请驳回') {
      // 审核驳回跳转到上架申请
      this.props.history.push({
        pathname: '/operate-manage-home/please'
      })
    }
  }
  componentDidMount () {
    this.getPageList()
  }
  getPageList =() => {
    let id = webStorage.getItem('STAR_V2_USERID') || 'string'
    getAllMessageList({
      page: this.state.pageNum,
      pageSize: 5
    }, id, (response) => {
      console.log(response)
      this.setState({
        listData: response.data.data,
        total: response.data.total
      })
    })
  }
  // 分页
  pagitonChange=(pageNumber) => {
    this.setState({
      pageNum: pageNumber
    }, () => {
      this.getPageList()
    })
  }
  render () {
    return (
      <div className='center-view mb20'>
        <Card title='消息通知' bordered={false} className='message-notice-card'>
          <div className='notice-body'>
            {this.state.listData && this.state.listData.map((item, index, arr) => {
              return <div className='list_itme' key={item.id}>
                <div className='list-img'>
                  <div className={item.isRead === '1' ? 'list_icon list_icon_bg' : 'list_icon list_icon_rg'}>
                    <i />
                  </div>
                </div>
                <div className='notice-count' onClick={() => { this.handleTabChange(item.MSG_STATE, item.MSG_ID, item.hasRead) }}>
                  <div>
                    <h4>
                      {item.MSG_STATE}
                      <span>{item.MSG_DATE}</span>
                    </h4>
                    <p>{item.MSG_TITLE.replace(/(.{80}).*/, '$1....')}<a style={{display: item.MSG_STATE === '消息通知' ? 'none' : ''}}>{item.MSG_STATE === '审核通过' ? '点击查看' : '点击修改'}</a></p>
                  </div>
                </div>
              </div>
            })}
          </div>
          <div className='pagition'>
            {this.state.total > 0 ? <Pagination defaultPageSize={5} defaultCurrent={1} total={this.state.total} onChange={this.pagitonChange} /> : null}
          </div>
          {renderRoutes(this.props.childRoutes)}
        </Card>
      </div>
    )
  }
}
export default withRouter(MessageNotice)
