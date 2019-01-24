/**
 * 其实和SerchBar区别不大
 * 后期将默认数据和可定制化加进来-- 用数据驱动渲染后
 * 利用判断渲染 -- 将两个组件合二为一
 */
import React, { Component } from 'react'
<<<<<<< HEAD
import { Select, Button, Row, Col, Input } from 'antd'
=======
import { Select, Button, Input } from 'antd'
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
import PropsTypes from 'prop-types'
import './SearchBarMemberSch.scss'

const Option = Select.Option

class SearchBarMemberSch extends Component {
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
      // selectList,
      onBtnSearchClick,
<<<<<<< HEAD
      // onSelect1Change,
      onSelect2Change,
      // onSelect3Change,
      // onSelect4Change,
      onBtnBatchExport
    } = this.props
    return (
      <div className='search-bar-wrap'>
        <Row gutter={16}>
          {/* <Col span={3}>
            <span className='input-label'>账号</span>
            <Input
              className='input'
              placeholder='请输入'
              onChange={onSelect1Change} />
          </Col> */}
          <Col span={6}>
            <span className='input-label'>学校名称</span>
            <Input
              className='input'
              placeholder='请输入'
              // showSearch
              onChange={onSelect2Change} >
              {/* {selectList.schNameList && this.getOptions(selectList.schNameList)} */}
            </Input>
          </Col>
          {/* <Col span={5}>
            <span className='select-label'>所属教育机构</span>
            <Input
              className='select'
              placeholder='请输入'
              onChange={onSelect3Change} />
          </Col> */}
          {/* <Col span={4}>
            <span className='select-label'>允许登录</span>
            <Select defaultValue='all' className='select' onChange={onSelect4Change} >
              <Option value='all'>全部</Option>
              <Option value='allow'>允许</Option>
              <Option value='refuse'>不允许</Option>
            </Select>
          </Col> */}
          <Col span={3}>
            <Button type='primary' className='search-bar-btn' onClick={onBtnSearchClick}>搜索</Button>
          </Col>
          <Col span={2}>
            <Button type='primary' className='search-bar-btn' onClick={onBtnBatchExport}>批量导入</Button>
          </Col>
        </Row>
=======
      onSelect1Change,
      onSelect2Change,
      newSchool,
      onSelect3Change,
      onSelect4Change
      // onBtnBatchExport
    } = this.props
    return (
      <div className='search-bar-wrap'>
        <div className='search-bar-item'>
          <span className='input-label'>账号</span>
          <Input
            className='input'
            placeholder='请输入'
            onChange={onSelect1Change} />
        </div>
        <div className='search-bar-item'>
          <span className='input-label'>学校名称</span>
          <Input
            className='input'
            placeholder='请输入'
            // showSearch
            onChange={onSelect2Change} >
            {/* {selectList.schNameList && this.getOptions(selectList.schNameList)} */}
          </Input>
        </div>
        <div className='search-bar-item' style={{width: 270}}>
          <span className='select-label'>所属教育机构</span>
          <Input
            className='select'
            placeholder='请输入'
            onChange={onSelect3Change} />
        </div>
        <div className='search-bar-item'>
          <span className='select-label'>允许登录</span>
          <Select defaultValue='all' className='select' onChange={onSelect4Change} >
            <Option value='all'>全部</Option>
            <Option value='allow'>允许</Option>
            <Option value='refuse'>不允许</Option>
          </Select>
        </div>
        <div className='search-bar-buttons'>
          <Button htmlType='button' type='primary' className='search-bar-btn' onClick={onBtnSearchClick}>搜索</Button>
          <Button htmlType='button' className='search-bar-btn' type='primary' style={{background: '#4eb652'}} onClick={newSchool} icon='plus'>新增学校</Button>
          {/* <Button type='primary' className='search-bar-btn' onClick={onBtnBatchExport}>批量导入</Button> */}
        </div>
        <div style={{clear: 'both'}} />
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
      </div>
    )
  }
}

SearchBarMemberSch.propTypes = {
  // selectList: PropsTypes.object,
  onBtnSearchClick: PropsTypes.func,
<<<<<<< HEAD
  // onSelect1Change: PropsTypes.func,
  onSelect2Change: PropsTypes.func,
  // onSelect3Change: PropsTypes.func,
  // onSelect4Change: PropsTypes.func,
  onBtnBatchExport: PropsTypes.func
=======
  onSelect1Change: PropsTypes.func,
  onSelect2Change: PropsTypes.func,
  newSchool: PropsTypes.func,
  onSelect3Change: PropsTypes.func,
  onSelect4Change: PropsTypes.func
  // onBtnBatchExport: PropsTypes.func
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
}

export default SearchBarMemberSch
