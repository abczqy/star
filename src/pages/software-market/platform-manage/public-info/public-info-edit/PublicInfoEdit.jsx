import React, { Component } from 'react'
import { Card, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'
import { PublicInfoEditBar, BlankBar, RichEditor } from 'components/software-market'
import './PublicInfoEdit.scss'

class PublicInfoEdit extends Component {
  render () {
    return (
      <div className='news-list-wrap' >
        <Card title='编辑新闻' extra={<Link to='/software-market-home/platform-manage/public-info'><Icon type='double-left' />返回列表页</Link>}>
          <div className='edit-head-wrap'>
            <PublicInfoEditBar />
          </div>
          <BlankBar />
          <div>
            <RichEditor />
          </div>
        </Card>
        <div className='foot-bar'>
          <span>
            <Button>取消</Button>
            <span className='blank-bar-ver' />
            <Button type='primary'>添加</Button>
          </span>
        </div>
      </div>
    )
  }
}

export default PublicInfoEdit
