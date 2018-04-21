import React, { Component } from 'react'
import { Col, Row, Input, Upload, Button, Icon } from 'antd'
import './NewsAddBar.scss'

class NewsAddBar extends Component {
  uploadParams = {

  }
  render () {
    return (
      <div className='edit-bar-wrap' >
        <Row gutter={16}>
          <Col span={12}>
            <span className='edit-bar-left-label'>通知标题: </span>
            <Input className='edit-bar-right-Input' placeholder='请输入通知标题' />
          </Col>
          <Col span={12}>
            <span className='edit-bar-left-label'>上传图片: </span>
            <Upload {...this.uploadParams} className='edit-bar-right-Input' >
              <Button className='upload-btn'><Icon type='upload' />上传文件</Button>
            </Upload>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={12}>
            <span className='marks-font-type left-span'>支持扩展名: .jpg .png (100px * 180px)</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NewsAddBar
