import React, { Component } from 'react'
import { Row, Col, Input } from 'antd'
import PropsTypes from 'prop-types'
import ajaxUrl from 'config'
import './PublicInfoVerifyView.scss'

const { TextArea } = Input

const textAreaConfig = {
  disabled: true,
  autosize: true
}

class PublicInfoVerifyView extends Component {
  render () {
    const { title, desc, attach } = this.props
    return (
      <div className='pub-info-verify-view-wrap'>
        <Row gutter={16}>
          <Col span={12}>
            <span className='left-label'>通知标题:</span>
            <Input disabled value={title} className='right-input' />
          </Col>
          <Col span={12}>
            <span className='left-label'>附件:</span>
            <a target='_blank' href={ajaxUrl.IMG_BASE_URL + '/' + attach}>下载附件</a>
          </Col>
        </Row>
        <div>
          <span className='left-label'>通知内容:</span>
          <TextArea value={desc} {...textAreaConfig} />
        </div>
      </div>
    )
  }
}

PublicInfoVerifyView.propTypes = {
  title: PropsTypes.string,
  desc: PropsTypes.string,
  attach: PropsTypes.string
}

export default PublicInfoVerifyView
