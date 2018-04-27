/**
 * 其实和SerchBar区别不大
 * 后期将默认数据和可定制化加进来-- 用数据驱动渲染后
 * 利用判断渲染 -- 将两个组件合二为一
 */
import React, { Component } from 'react'
import { Input, Select, Button, Row, Col } from 'antd'
import PropsTypes from 'prop-types'
import './SearchBarMemberEduSer.scss'

const Option = Select.Option

class SearchBarMemberEduSer extends Component {
  render () {
    const {
      onBtnSearchClick,
      onInput1Change,
      onInput2Change,
      onInput3Change,
      onSelect2Change,
      onSelect1Change,
      onBtnBatchExport
    } = this.props
    return (
      <div className='search-bar-wrap'>
        <Row gutter={16}>
          <Col span={3}>
            <span className='input-label'>账号 </span>
            <Input className='input' placeholder='请输入' onChange={onInput1Change} />
          </Col>
          <Col span={5}>
            <span className='input-label-1'>机构名称 </span>
            <Input className='input-1' placeholder='请输入' onChange={onInput2Change} />
          </Col>
          <Col span={5}>
            <span className='input-label-2'>上级机构名称 </span>
            <Input className='input-2' placeholder='请输入' onChange={onInput3Change} />
          </Col>
          <Col span={3}>
            <span className='select-label-1'>所属级别 </span>
            <Select defaultValue='all' className='select-1' onChange={onSelect1Change} >
              <Option value='all'>全部</Option>
              <Option value='province'>省</Option>
              <Option value='city'>市</Option>
              <Option value='county'>县</Option>
            </Select>
          </Col>
          <Col span={4}>
            <span className='select-label'>允许登录 </span>
            <Select defaultValue='all' className='select' onChange={onSelect2Change} >
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

SearchBarMemberEduSer.propTypes = {
  onBtnSearchClick: PropsTypes.func,
  onInput1Change: PropsTypes.func,
  onInput2Change: PropsTypes.func,
  onInput3Change: PropsTypes.func,
  onSelect1Change: PropsTypes.func,
  onSelect2Change: PropsTypes.func,
  onBtnBatchExport: PropsTypes.func
}

export default SearchBarMemberEduSer
