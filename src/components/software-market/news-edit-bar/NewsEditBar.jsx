import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Col, Row, Input, Upload, Button, Icon } from 'antd'
// import ajaxUrl from 'config'
import './NewsEditBar.scss'

class NewsEditBar extends Component {
  uploadParams = {

  }
  render () {
    const { title } = this.props
    return (
      <div className='edit-bar-wrap' >
        <Row gutter={16}>
          <Col span={12}>
            <span className='edit-bar-left-label'>通知标题: </span>
            <Input className='edit-bar-right-Input' placeholder='请输入通知标题' value={title} />
          </Col>
          <Col span={6}>
            <span className='pic-card-label'>上传图片: </span>
            <Upload listType='picture-card' {...this.uploadParams} className='pic-card' >
              <Icon type='upload' />
            </Upload>
          </Col>
          <Col span={6}>
            <Upload {...this.uploadParams} >
              <Button className='upload-btn'><Icon type='upload' />上传文件</Button>
            </Upload>
            <span className='marks-font-type'>支持扩展名: .jpg .png (100px * 180px)</span>
          </Col>
        </Row>
      </div>
    )
  }
}

NewsEditBar.propTypes = {
  title: PropsTypes.string
}

export default NewsEditBar
