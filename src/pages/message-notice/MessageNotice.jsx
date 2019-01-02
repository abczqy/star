/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Card, Pagination, message} from 'antd'
import '../../views/Operateview.scss'
import { renderRoutes } from 'react-router-config'
import {getAllMessageList, getMessageCount} from '../../services/topbar-mation'
import { withRouter } from 'react-router'
import webStorage from 'webStorage'
import moment from 'moment'
import {axios} from '../../utils'
import config from '../../config/index'
const {API_BASE_URL_V2, SERVICE_PORTAL} = config

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
    console.log(ready)
    if (ready === 0) {
      getMessageCount({}, (response) => {
        if (response.data.code === 200) {
          webStorage.setItem('Unread_Message', response.data.data)
          this.setState({
            messageCount: response.data.data
          })
        } else {
          message.warn(response.data.msg)
        }
      })
      axios.put(`${API_BASE_URL_V2}${SERVICE_PORTAL}/messages/${id}`).then((res) => {
        console.log(res)
      })
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
    getAllMessageList({
      page: this.state.pageNum,
      pageSize: 5
    }, (response) => {
      console.log(response)
      if (response.data.code === 200) {
        this.setState({
          listData: response.data.data,
          total: response.data.total
        })
      } else {
        message.warn(response.data.msg)
      }
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
            {this.state.listData && this.state.listData.info && this.state.listData.info.map((item, index, arr) => {
              return <div className='list_itme' key={item.id}>
                <div className='list-img'>
                  <div className={item.isRead === 1 ? 'list_icon list_icon_bg' : 'list_icon list_icon_rg'}>
                    <i />
                  </div>
                </div>
                <div className='notice-count' onClick={() => { this.handleTabChange('消息通知', item.id, item.isRead) }}>
                  <div>
                    <h4>
                      消息通知
                      <span>{moment(item.createTime).format('YYYY-MM-DD')}</span>
                    </h4>
                    <div>
                      {item.message.content}
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>
          <div className='pagition'>
            <Pagination defaultPageSize={5} defaultCurrent={1} total={this.state.total} onChange={this.pagitonChange} hideOnSinglePage />
          </div>
          {renderRoutes(this.props.childRoutes)}
        </Card>
      </div>
    )
  }
}
export default withRouter(MessageNotice)
