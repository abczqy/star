/**
 * 其实和SerchBar区别不大
 * 后期将默认数据和可定制化加进来-- 用数据驱动渲染后
 * 利用判断渲染 -- 将两个组件合二为一
 */
import React, { Component } from 'react'
import { Input, Select, Button, Row, Col } from 'antd'
import PropsTypes from 'prop-types'
import './SearchBarMemberTeac.scss'

const Option = Select.Option

class SearchBarMemberTeac extends Component {
  render () {
    const {
      onBtnSearchClick,
      onInput1Change,
      onInput2Change,
      onInput3Change,
      onSelect2Change,
      onBtnBatchExport
    } = this.props
    return (
      <div className='search-bar-wrap'>
        <Row gutter={16}>
          <Col span={3}>
            <span className='input-label'>账号</span>
            <Input className='input' placeholder='请输入' onChange={onInput1Change} />
          </Col>
          <Col span={5}>
            <span className='input-label'>教师姓名</span>
            <Input className='input' onChange={onInput2Change} />
          </Col>
          <Col span={5}>
            <span className='input-label'>学校名称</span>
            <Input className='input' onChange={onInput3Change} />
          </Col>
          <Col span={4}>
            <span className='select-label'>允许登录</span>
            <Select defaultValue='all' className='select' onChange={onSelect2Change} >
              <Option value='all'>全部</Option>
              <Option value='allow'>允许</Option>
              <Option value='refuse'>不允许</Option>
            </Select>
          </Col>
          <Col span={5}>
            <Button type='primary' className='search-bar-btn' onClick={onBtnSearchClick}>搜索</Button>
          </Col>
          <Col span={2}>
            <Button type='primary' className='search-bar-btn' onClick={onBtnBatchExport}>批量导出</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

SearchBarMemberTeac.propTypes = {
  onBtnSearchClick: PropsTypes.func,
  onInput1Change: PropsTypes.func,
  onInput2Change: PropsTypes.func,
  onInput3Change: PropsTypes.func,
  onSelect2Change: PropsTypes.func,
  onBtnBatchExport: PropsTypes.func
}

export default SearchBarMemberTeac