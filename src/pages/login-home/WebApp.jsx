/**
 *
 */
import React from 'react'
import { Row, Col, Button, Icon } from 'antd'

export default class WebApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  renderItem (item, index) {
    return (
      <Col span={5} key={index}>
        <div className='item'>
          <div className='item-split'>
            <div className='split' />
          </div>
          <div className='item-content'>
            <div className='img' />
            <div className='title'>{item.title}</div>
            <div className='content'>{item.content}</div>
            <div>
              <Button>查看详情<Icon type='arrow-right' /></Button>
            </div>
          </div>
        </div>
      </Col>
    )
  }

  render () {
    let data = [{
      src: '',
      title: '每日英语听力',
      content: '最好用的离线听力软件'
    }, {
      src: '',
      title: '每日英语听力',
      content: '最好用的离线听力软件'
    }, {
      src: '',
      title: '每日英语听力',
      content: '最好用的离线听力软件'
    }, {
      src: '',
      title: '每日英语听力',
      content: '最好用的离线听力软件'
    }]
    return (
      <div className='web-app-container'>
        <Row type='flex' justify='space-around'>
          {
            data.map((item, index, arr) => {
              return this.renderItem(item, index)
            })
          }
        </Row>
      </div>
    )
  }
}
