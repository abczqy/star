import React, { Component } from 'react'
import { Col, Row, Input, Upload, Button, Icon } from 'antd'
import './PublicInfoEditBar.scss'

class PublicInfoEditBar extends Component {
  uploadParams = {

  }
  render () {
    return (
      <div className='edit-add-bar-wrap' >
        <Row gutter={16}>
          <Col span={12}>
            <span className='edit-bar-left-label'>通知标题: </span>
            <Input className='edit-bar-right-Input' placeholder='请输入通知标题' />
          </Col>
          <Col span={12}>
            <span className='edit-bar-left-label'>附件: </span>
            <Upload {...this.uploadParams} className='edit-bar-right-Input' >
              <Button className='upload-btn'><Icon type='upload' />上传文件</Button>
            </Upload>
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={12}>
            <span className='marks-font-type left-span'>支持扩展名：.rar .zip .doc .docx .pdf .jpg...</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PublicInfoEditBar
