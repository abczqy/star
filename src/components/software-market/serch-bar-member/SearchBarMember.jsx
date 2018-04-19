/**
 * 其实和SerchBar区别不大
 * 后期将默认数据和可定制化加进来-- 用数据驱动渲染后
 * 利用判断渲染 -- 将两个组件合二为一
 */
import React, { Component } from 'react'
import { Input, Select, Button, Row, Col } from 'antd'
import PropsTypes from 'prop-types'
import './SearchBarMember.scss'

const Option = Select.Option

class SearchBarMember extends Component {
  render () {
    const {
      onBtnSearchClick,
      inputText1,
      inputText2,
      selectText1,
      selectText2,
      onInput1Change,
      onInput2Change,
      onSelect1Change,
      onSelect2Change,
      onBtnBatchExport
    } = this.props
    return (
      <div className='search-bar-wrap'>
        <Row gutter={16}>
          <Col span={3}>
            <span className='input-label'>{inputText1}</span>
            <Input className='input' onChange={onInput1Change} />
          </Col>
          <Col span={5}>
            <span className='input-label'>{inputText2}</span>
            <Input className='input' onChange={onInput2Change} />
          </Col>
          <Col span={4}>
            <span className='select-label'>{selectText1}</span>
            <Select defaultValue='全部' className='select' onChange={onSelect1Change} >
              <Option value='全部'>全部</Option>
              <Option value='正常'>正常</Option>
              <Option value='已过期'>已过期</Option>
            </Select>
          </Col>
          <Col span={4}>
            <span className='select-label'>{selectText2}</span>
            <Select defaultValue='全部' className='select' onChange={onSelect2Change} >
              <Option value='全部'>全部</Option>
              <Option value='允许'>允许</Option>
              <Option value='不允许'>不允许</Option>
            </Select>
          </Col>
          <Col span={4}>
            <Button type='primary' className='search-bar-btn' onClick={onBtnSearchClick}>搜索</Button>
          </Col>
          <Col span={2}>
            <Button type='primary' className='search-bar-btn'>新增</Button>
          </Col>
          <Col span={2}>
            <Button type='primary' className='search-bar-btn' onClick={onBtnBatchExport}>批量导出</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

SearchBarMember.propTypes = {
  inputText1: PropsTypes.string,
  inputText2: PropsTypes.string,
  selectText1: PropsTypes.string,
  selectText2: PropsTypes.string,
  onBtnSearchClick: PropsTypes.func,
  onInput1Change: PropsTypes.func,
  onInput2Change: PropsTypes.func,
  onSelect1Change: PropsTypes.func,
  onSelect2Change: PropsTypes.func,
  onBtnBatchExport: PropsTypes.func
}

export default SearchBarMember
