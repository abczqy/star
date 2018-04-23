/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Card} from 'antd'
import '../Operateview.scss'
import { renderRoutes } from 'react-router-config'
import apiConfig from '../../../config'
export default class MessageNotice extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleTabChange (link, id, title) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    if (link === 'adopt') {
      // 跳转到我的应用
      window.location.href = apiConfig.BASE_TAB + '/#' + 'operate-manage-home/all-app-detail-mine'
    } else if (link === 'detail') {
      this.props.history.push({pathname: link, search: '?id=' + id})
    } else if (link === 'pass') {
      // 跳转到上架申请
      window.location.href = apiConfig.BASE_TAB + '/#' + 'operate-manage-home/all-app-detail-mine'
    }
    // window.location.href = 'http://localhost:8080/#' + 'operate-manage-home/all-app-detail-mine'
  }
  componentDidMount () {
  }

  render () {
    let data = [{
      title: '审核通过',
      time: '2018-03-29 12：31',
      type: 'adopt',
      content: '在听取了福州市教育局、福建幼儿师范高等专科学校、福州市台江区教师进修学校、厦门第六中学、福州第三中学、厦门市同安区阳翟小学、泉州第九中学的典型经验交流后，黄红武厅长充分肯定了我省基础教育信息化取得的进展和成效，针对今后工作提出了三点意见，强调要把这次会议作为我省基础教育信息化工作新的出发点，推进我省.'
    }, {
      title: '申请驳回',
      time: '2018-03-29 12：32',
      type: 'pass',
      content: '在听取了福州市教育局、福建幼儿师范高等专科学校、福州市台江区教师进修学校、厦门第六中学、福州第三中学、厦门市同安区阳翟小学、泉州第九中学的典型经验交流后，黄红武厅长充分肯定了我省基础教育信息化取得的进展和成效，针对今后工作提出了三点意见，强调要把这次会议作为我省基础教育信息化工作新的出发点，推进我省.'
    }, {
      title: '消息通知',
      time: '2018-03-29 12：33',
      type: 'detail',
      content: '在听取了福州市教育局、福建幼儿师范高等专科学校、福州市台江区教师进修学校、厦门第六中学、福州第三中学、厦门市同安区阳翟小学、泉州第九中学的典型经验交流后，黄红武厅长充分肯定了我省基础教育信息化取得的进展和成效，针对今后工作提出了三点意见，强调要把这次会议作为我省基础教育信息化工作新的出发点，推进我省.'
    }, {
      title: '消息通知',
      time: '2018-03-29 12：34',
      type: 'detail',
      content: '在听取了福州市教育局、福建幼儿师范高等专科学校、福州市台江区教师进修学校、厦门第六中学、福州第三中学、厦门市同安区阳翟小学、泉州第九中学的典型经验交流后，黄红武厅长充分肯定了我省基础教育信息化取得的进展和成效，针对今后工作提出了三点意见，强调要把这次会议作为我省基础教育信息化工作新的出发点，推进我省.'
    }, {
      title: '消息通知',
      time: '2018-03-29 12：35',
      type: 'detail',
      content: '在听取了福州市教育局、福建幼儿师范高等专科学校、福州市台江区教师进修学校、厦门第六中学、福州第三中学、厦门市同安区阳翟小学、泉州第九中学的典型经验交流后，黄红武厅长充分肯定了我省基础教育信息化取得的进展和成效，针对今后工作提出了三点意见，强调要把这次会议作为我省基础教育信息化工作新的出发点，推进我省.'
    }]
    return (
      <div className='center-view mb20'>
        <Card title='消息通知' bordered={false} className='message-notice-card'>
          <div className='notice-body'>
            {data.map((item, index, arr) => {
              return <div className='list_itme' key={item.time}>
                <div className='list-img'>
                  <div className='list_icon list_icon_bg'>
                    <i />
                  </div>
                </div>
                <div className='notice-count' onClick={() => { this.handleTabChange(item.type, item.time, item.title) }}>
                  <div>
                    <h4>
                      {item.title}
                      <span>{item.time}</span>
                    </h4>
                    <p>{item.content}</p>
                  </div>
                </div>
              </div>
            })}
          </div>
          {renderRoutes(this.props.route.childRoutes)}
        </Card>
      </div>
    )
  }
}
