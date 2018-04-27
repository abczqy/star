/**
 * 其实和SerchBar区别不大
 * 后期将默认数据和可定制化加进来-- 用数据驱动渲染后
 * 利用判断渲染 -- 将两个组件合二为一
 */
import React, { Component } from 'react'
import { Input, Select, Button, Row, Col } from 'antd'
import PropsTypes from 'prop-types'
import './SearchBarMemberPa.scss'

const Option = Select.Option

class SearchBarMemberPa extends Component {
  render () {
    const {
      onBtnSearchClick,
      onInput1Change,
      onInput2Change,
      onInput3Change,
      onSelect1Change,
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
            <span className='input-label'>学生姓名</span>
            <Input className='input' placeholder='请输入' onChange={onInput2Change} />
          </Col>
          <Col span={4}>
            <span className='select-label'>家长姓名</span>
            <Input className='select' placeholder='请输入' onChange={onInput3Change} />
          </Col>
          <Col span={4}>
            <span className='select-label'>选择角色</span>
            <Select defaultValue='all' className='select' onChange={onSelect1Change} >
              <Option value='all'>全部</Option>
              <Option value='father'>父亲</Option>
              <Option value='mother'>母亲</Option>
            </Select>
          </Col>
          <Col span={4}>
            <span className='select-label'>允许登录</span>
            <Select defaultValue='all' className='select' onChange={onSelect2Change} >
              <Option value='all'>全部</Option>
              <Option value='allow'>允许</Option>
              <Option value='defuse'>不允许</Option>
            </Select>
          </Col>
          <Col span={2}>
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

SearchBarMemberPa.propTypes = {
  onBtnSearchClick: PropsTypes.func,
  onInput1Change: PropsTypes.func,
  onInput2Change: PropsTypes.func,
  onInput3Change: PropsTypes.func,
  onSelect1Change: PropsTypes.func,
  onSelect2Change: PropsTypes.func,
  onBtnBatchExport: PropsTypes.func
}

export default SearchBarMemberPa
