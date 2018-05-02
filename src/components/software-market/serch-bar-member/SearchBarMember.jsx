/**
 * 其实和SerchBar区别不大
 * 后期将默认数据和可定制化加进来-- 用数据驱动渲染后
 * 利用判断渲染 -- 将两个组件合二为一
 */
import React, { Component } from 'react'
import { Select, Button, Row, Col } from 'antd'
import PropsTypes from 'prop-types'
import './SearchBarMember.scss'

const Option = Select.Option

class SearchBarMember extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  /**
   * 如果用动态从后台获取下拉菜单的方法
   * 这里写个demo
   * 接口留好 到时候 这样改造就行了
   * 当然 后台请求到的数据 以props传给这里
   * @param {array} optArrs 分组建传进来的arrays
   */
  getOptions = (optArrs) => {
    return optArrs.map((Item, index) => {
      // 这里需要加一个key 不然会有告警
      return <Option key={index} value={Item}>{Item}</Option>
    })
  }

  render () {
    const {
      selectList,
      onBtnSearchClick,
      inputText1,
      inputText2,
      selectText1,
      selectText2,
      onSelect1Change,
      onSelect2Change,
      onSelect3Change,
      onSelect4Change,
      onBtnBatchExport
    } = this.props
    return (
      <div className='search-bar-wrap'>
        <Row gutter={16}>
          <Col span={3}>
            <span className='input-label'>{inputText1}</span>
            <Select
              className='input'
              placeholder='请输入'
              showSearch
              onChange={onSelect1Change} >
              {selectList.idList && this.getOptions(selectList.idList)}
            </Select>
          </Col>
          <Col span={5}>
            <span className='input-label'>{inputText2}</span>
            <Select
              className='input'
              placeholder='请输入'
              showSearch
              onChange={onSelect2Change} >
              {selectList.faNameList && this.getOptions(selectList.faNameList)}
            </Select>
          </Col>
          <Col span={4}>
            <span className='select-label'>{selectText1}</span>
            <Select
              className='input'
              placeholder='请输入'
              showSearch
              onChange={onSelect3Change} >
              {selectList.contractList && this.getOptions(selectList.contractList)}
            </Select>
          </Col>
          <Col span={4}>
            <span className='select-label'>{selectText2}</span>
            <Select defaultValue='all' className='select' onChange={onSelect4Change} >
              <Option value='all'>全部</Option>
              <Option value='allow'>允许</Option>
              <Option value='refuse'>不允许</Option>
            </Select>
          </Col>
          <Col span={6}>
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

SearchBarMember.propTypes = {
  selectList: PropsTypes.object,
  inputText1: PropsTypes.string,
  inputText2: PropsTypes.string,
  selectText1: PropsTypes.string,
  selectText2: PropsTypes.string,
  onBtnSearchClick: PropsTypes.func,
  onSelect1Change: PropsTypes.func,
  onSelect2Change: PropsTypes.func,
  onSelect3Change: PropsTypes.func,
  onSelect4Change: PropsTypes.func,
  onBtnBatchExport: PropsTypes.func
}

export default SearchBarMember
