import React, { Component } from 'react'
import { Card, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { NewsAddBar, BlankBar, RichEditor } from 'components/software-market'
import './NewsListEdit.scss'

class NewsListEdit extends Component {
  render () {
    return (
      <div className='news-list-wrap' >
        <Card title='编辑新闻' extra={<Link to='/software-market-home/platform-manage/news-list'><Icon type='double-left' />返回列表页</Link>}>
          <div className='edit-head-wrap'>
            <NewsAddBar />
          </div>
          <BlankBar />
          <div>
            <RichEditor />
          </div>
        </Card>
      </div>
    )
  }
}

export default NewsListEdit
