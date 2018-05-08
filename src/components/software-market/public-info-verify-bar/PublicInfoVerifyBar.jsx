/**
 * 平台管理-新闻列表-顶栏
 */
import React, { Component } from 'react'
import { Input, Button, Row, Col, DatePicker } from 'antd'
import PropsTypes from 'prop-types'
import './PublicInfoVerifyBar.scss'

const Search = Input.Search

class PublicInfoVerifyBar extends Component {
  render () {
    const {
      onBtn1Click,
      onStartChange,
      onEndChange,
      onInputChange,
      onBtn2Click
    } = this.props
    return (
      <div className='news-bar-wrap'>
        <Row gutter={16}>
          <Col span={4}>
            <span className='date-picker-label'>时间: </span>
            <DatePicker
              className='date-picker'
              format='YYYY-MM-DD'
              onChange={onStartChange}
              placeholder='开始时间'
            />
          </Col>
          <Col span={1}>
            <span>—</span>
          </Col>
          <Col span={4}>
            <DatePicker
              className='date-picker'
              format='YYYY-MM-DD'
              onChange={onEndChange}
              placeholder='结束时间'
            />
          </Col>
          <Col span={4}>
            <Search placeholder='请输入关键字' onChange={onInputChange} />
          </Col>
          <Col span={9}>
            <Button type='primary' onClick={onBtn2Click}>搜索</Button>
          </Col>
          <Col span={2}>
            <Button className='bar-btn add-btn' type='primary' onClick={onBtn1Click}>批量通过</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

PublicInfoVerifyBar.propTypes = {
  onBtn1Click: PropsTypes.func,
  onStartChange: PropsTypes.func,
  onEndChange: PropsTypes.func,
  onInputChange: PropsTypes.func,
  onBtn2Click: PropsTypes.func
}

export default PublicInfoVerifyBar
