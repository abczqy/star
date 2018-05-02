/**
 * 其实和SerchBar区别不大
 * 后期将默认数据和可定制化加进来-- 用数据驱动渲染后
 * 利用判断渲染 -- 将两个组件合二为一
 */
import React, { Component } from 'react'
import { Select, Button, Row, Col } from 'antd'
import PropsTypes from 'prop-types'
import './SearchBarMemberStu.scss'

const Option = Select.Option

class SearchBarMemberStu extends Component {
  render () {
    const {
      selectList,
      onBtnSearchClick,
      onSelect1Change,
      onSelect2Change,
      onSelect3Change,
      onSelect4Change,
      onSelect5Change,
      onBtnBatchExport
    } = this.props
    return (
      <div className='search-bar-wrap'>
        <Row gutter={16}>
          <Col span={3}>
            <span className='input-label'>账号</span>
            <Select
              className='input'
              placeholder='请输入'
              showSearch
              onChange={onSelect1Change} >
              {selectList.idList && this.getOptions(selectList.idList)}
            </Select>
          </Col>
          <Col span={5}>
            <span className='input-label'>学生姓名</span>
            <Select
              className='input'
              placeholder='请输入'
              showSearch
              onChange={onSelect2Change} >
              {selectList.stuNameList && this.getOptions(selectList.stuNameList)}
            </Select>
          </Col>
          <Col span={4}>
            <span className='select-label'>学校名称</span>
            <Select
              className='input'
              placeholder='请输入'
              showSearch
              onChange={onSelect3Change} >
              {selectList.schNameList && this.getOptions(selectList.schNameList)}
            </Select>
          </Col>
          <Col span={4}>
            <span className='select-label'>家长姓名</span>
            <Select
              className='input'
              placeholder='请输入'
              showSearch
              onChange={onSelect4Change} >
              {selectList.paNameList && this.getOptions(selectList.paNameList)}
            </Select>
          </Col>
          <Col span={4}>
            <span className='select-label'>允许登录</span>
            <Select defaultValue='all' className='select' onChange={onSelect5Change} >
              <Option value='all'>全部</Option>
              <Option value='allow'>允许</Option>
              <Option value='refuse'>不允许</Option>
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

SearchBarMemberStu.propTypes = {
  selectList: PropsTypes.object,
  onBtnSearchClick: PropsTypes.func,
  onSelect1Change: PropsTypes.func,
  onSelect2Change: PropsTypes.func,
  onSelect3Change: PropsTypes.func,
  onSelect4Change: PropsTypes.func,
  onSelect5Change: PropsTypes.func,
  onBtnBatchExport: PropsTypes.func
}

export default SearchBarMemberStu
