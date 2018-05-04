/**
 * 平台管理-新闻列表-顶栏
 */
import React, { Component } from 'react'
import { Input, Button, Row, Col, DatePicker } from 'antd'
import { Link } from 'react-router-dom'
import PropsTypes from 'prop-types'
import './NewsBar.scss'

const Search = Input.Search

class NewsBar extends Component {
  render () {
    const { onBtn1Click } = this.props
    return (
      <div className='news-bar-wrap'>
        <Row gutter={16}>
          <Col span={4}>
            <span className='date-picker-label'>时间: </span>
            <DatePicker className='date-picker' />
          </Col>
          <Col span={1}>
            <span>—</span>
          </Col>
          <Col span={4}>
            <DatePicker className='date-picker' />
          </Col>
          <Col span={5}>
            <Search placeholder='请输入关键字' />
          </Col>
          <Col span={6}>
            <Button type='primary'>搜索</Button>
          </Col>
          <Col span={2}>
            <Button className='bar-btn del-btn' type='primary' onClick={onBtn1Click}>批量删除</Button>
          </Col>
          <Col span={2}>
            <Button className='bar-btn add-btn' type='primary'>
              <Link to='/software-market-home/platform-manage/news-list-add'>
                  +添加新闻
              </Link>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

NewsBar.propTypes = {
  onBtn1Click: PropsTypes.func
}

export default NewsBar
