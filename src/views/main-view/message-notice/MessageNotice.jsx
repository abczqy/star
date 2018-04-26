/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Card, Pagination} from 'antd'
import '../Operateview.scss'
import { renderRoutes } from 'react-router-config'
import apiConfig from '../../../config'
import axios from 'axios'
import ajaxUrl from 'config'
export default class MessageNotice extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pageNum: 1,
      listData: [] // 消息列表数据
    }
  }

  handleTabChange (link, id) {
    if (link === '审核通过') {
      // 审核通过跳转到我的应用
      window.location.href = apiConfig.BASE_TAB + '/#' + 'operate-manage-home/all-app-detail-mine'
    } else if (link === '') {
      this.props.history.push({pathname: 'detail', search: '?id=' + id})
    } else if (link === '申请驳回') {
      // 审核驳回跳转到上架申请
      window.location.href = apiConfig.BASE_TAB + '/#' + 'operate-manage-home/please'
    }
    // window.location.href = 'http://localhost:8080/#' + 'operate-manage-home/all-app-detail-mine'
  }
  componentDidMount () {
    this.getPageList()
  }
  getPageList =() => {
    axios.post(ajaxUrl.getMessageList, {
      params: {
        page: this.state.pageNum,
        pageSize: 5
      }
    }).then((response) => {
      console.log('返回学生绑定信息', response)
      this.setState({
        listData: response.data.data,
        total: response.data.count
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
              return <div className='list_itme' key={item.msg_id}>
                <div className='list-img'>
                  <div className={item.hasRead === '1' ? 'list_icon list_icon_bg' : 'list_icon list_icon_rg'}>
                    <i />
                  </div>
                </div>
                <div className='notice-count' onClick={() => { this.handleTabChange(item.msg_state, item.msg_id) }}>
                  <div>
                    <h4>
                      {item.msg_title}
                      <span>{item.msg_date}</span>
                    </h4>
                    <p>{item.msg_desc}<a style={{display: item.msg_state ? '' : 'none'}}>{item.msg_state === '审核通过' ? '点击查看' : '点击修改'}</a></p>
                  </div>
                </div>
              </div>
            })}
          </div>
          <div className='pagition'>
            <Pagination defaultPageSize={5} defaultCurrent={1} total={this.state.total} onChange={this.pagitonChange} />
          </div>
          {renderRoutes(this.props.route.childRoutes)}
        </Card>
      </div>
    )
  }
}
