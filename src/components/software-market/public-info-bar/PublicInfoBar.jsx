/**
 * 平台管理-新闻列表-顶栏
 */
import React, { Component } from 'react'
import { Input, Button, Row, Col, DatePicker, Select } from 'antd'
import { Link } from 'react-router-dom'
import PropsTypes from 'prop-types'
import './PublicInfoBar.scss'

const Search = Input.Search
const Option = Select

class PublicInfoBar extends Component {
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
          <Col span={4}>
            <span className='select-label'>发布者: </span>
            <Select
              defaultValue='all'
              style={{ width: '70%' }}
            >
              <Option value='all'>全部</Option>
              <Option value='provinceEduDepart'>省教育厅</Option>
              <Option value='cityEduDepart'>市教育厅</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Search placeholder='请输入关键字' />
          </Col>
          <Col span={3}>
            <Button type='primary'>搜索</Button>
          </Col>
          <Col span={2}>
            <Button className='bar-btn del-btn' type='primary' onClick={onBtn1Click}>批量删除</Button>
          </Col>
          <Col span={2}>
            <Button className='bar-btn add-btn' type='primary'>
              <Link to='/software-market-home/platform-manage/public-info-add'>
                +添加信息
              </Link>
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

PublicInfoBar.propTypes = {
  onBtn1Click: PropsTypes.object
}

export default PublicInfoBar
