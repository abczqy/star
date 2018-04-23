import React, { Component } from 'react'
import { Card, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { PublicInfoVerifyView } from 'components/software-market'

class PublicInfoVerifyDetail extends Component {
  render () {
    return (
      <div className='news-list-wrap' >
        <Card title='审核信息' extra={<Link to='/software-market-home/platform-manage/public-info-verify'><Icon type='double-left' />返回列表页</Link>}>
          <div className='edit-head-wrap'>
            <PublicInfoVerifyView />
          </div>
        </Card>
      </div>
    )
  }
}

export default PublicInfoVerifyDetail
