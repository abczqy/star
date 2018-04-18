/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Card} from 'antd'
import '../Operateview.scss'
import { renderRoutes } from 'react-router-config'
export default class MessageNotice extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  handleTabChange (link, id) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    this.props.history.push({pathname: link, search: '?id=' + id})
    // window.location.href = 'http://localhost:8080/#' + link
  }
  componentDidMount () {
  }

  render () {
    let data = [{
      title: '消息通知',
      time: '2018-03-29 12：31',
      content: '在听取了福州市教育局、福建幼儿师范高等专科学校、福州市台江区教师进修学校、厦门第六中学、福州第三中学、厦门市同安区阳翟小学、泉州第九中学的典型经验交流后，黄红武厅长充分肯定了我省基础教育信息化取得的进展和成效，针对今后工作提出了三点意见，强调要把这次会议作为我省基础教育信息化工作新的出发点，推进我省.'
    }, {
      title: '消息通知',
      time: '2018-03-29 12：32',
      content: '在听取了福州市教育局、福建幼儿师范高等专科学校、福州市台江区教师进修学校、厦门第六中学、福州第三中学、厦门市同安区阳翟小学、泉州第九中学的典型经验交流后，黄红武厅长充分肯定了我省基础教育信息化取得的进展和成效，针对今后工作提出了三点意见，强调要把这次会议作为我省基础教育信息化工作新的出发点，推进我省.'
    }, {
      title: '消息通知',
      time: '2018-03-29 12：33',
      content: '在听取了福州市教育局、福建幼儿师范高等专科学校、福州市台江区教师进修学校、厦门第六中学、福州第三中学、厦门市同安区阳翟小学、泉州第九中学的典型经验交流后，黄红武厅长充分肯定了我省基础教育信息化取得的进展和成效，针对今后工作提出了三点意见，强调要把这次会议作为我省基础教育信息化工作新的出发点，推进我省.'
    }, {
      title: '消息通知',
      time: '2018-03-29 12：34',
      content: '在听取了福州市教育局、福建幼儿师范高等专科学校、福州市台江区教师进修学校、厦门第六中学、福州第三中学、厦门市同安区阳翟小学、泉州第九中学的典型经验交流后，黄红武厅长充分肯定了我省基础教育信息化取得的进展和成效，针对今后工作提出了三点意见，强调要把这次会议作为我省基础教育信息化工作新的出发点，推进我省.'
    }, {
      title: '消息通知',
      time: '2018-03-29 12：35',
      content: '在听取了福州市教育局、福建幼儿师范高等专科学校、福州市台江区教师进修学校、厦门第六中学、福州第三中学、厦门市同安区阳翟小学、泉州第九中学的典型经验交流后，黄红武厅长充分肯定了我省基础教育信息化取得的进展和成效，针对今后工作提出了三点意见，强调要把这次会议作为我省基础教育信息化工作新的出发点，推进我省.'
    }]
    return (
      <div className='center-view'>
        <Card title='消息通知' bordered={false} className='message-notice-card'>
          <div className='notice-body'>
            {data.map((item, index, arr) => {
              return <div className='list_itme' key={item.time}>
                <div className='list-img'>
                  <i />
                </div>
                <div className='notice-count' onClick={() => { this.handleTabChange('detail', item.time) }}>
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
