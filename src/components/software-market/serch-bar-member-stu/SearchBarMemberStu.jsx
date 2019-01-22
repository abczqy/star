/**
 * 其实和SerchBar区别不大
 * 后期将默认数据和可定制化加进来-- 用数据驱动渲染后
 * 利用判断渲染 -- 将两个组件合二为一
 */
import React, { Component } from 'react'
import { Select, Button, Input, Upload } from 'antd'
import PropsTypes from 'prop-types'
import './SearchBarMemberStu.scss'

const Option = Select.Option

class SearchBarMemberStu extends Component {
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
      onSelect1Change,
      onSelect2Change,
      onSelect3Change,
      // onSelect4Change,
      onSelect5Change,
      // onBtnBatchExport,
      uploadProps,
      AUTHORITY_NAME
    } = this.props
    return (
      <div className='search-bar-wrap'>
        <div className='search-bar-item'>
          <span className='input-label'>账号</span>
          <Input
            className='select'
            placeholder='请输入'
            // showSearch
            onChange={onSelect1Change} >
            {/* {selectList.idList && this.getOptions(selectList.idList)} */}
          </Input>
        </div>
        <div className='search-bar-item'>
          <span className='input-label'>学生姓名</span>
          <Input
            className='select'
            placeholder='请输入'
            // showSearch
            onChange={onSelect2Change} >
            {/* {selectList.stuNameList && this.getOptions(selectList.stuNameList)} */}
          </Input>
        </div>
        <div className='search-bar-item'>
          <span className='input-label'>学校名称</span>
          <Input
            className='select'
            placeholder='请输入'
            // showSearch
            value={AUTHORITY_NAME}
            onChange={onSelect3Change} >
            {/* {selectList.schNameList && this.getOptions(selectList.schNameList)} */}
          </Input>
        </div>
        <div className='search-bar-item'>
          <span className='select-label'>允许登录</span>
          <Select defaultValue='all' className='select' onChange={onSelect5Change} >
            <Option value='all'>全部</Option>
            <Option value='allow'>允许</Option>
            <Option value='refuse'>不允许</Option>
          </Select>
        </div>
        <div className='search-bar-buttons'>
          <Button type='primary' className='search-bar-btn' onClick={onBtnSearchClick}>搜索</Button>
          <Button type='primary' className='search-bar-btn'>下载模板</Button>
          <Upload {...uploadProps} className='search-bar-btn' style={{display: 'inline-block'}}>
            <Button type='primary'>批量导入</Button>
          </Upload>
          <Button htmlType='button' className='search-bar-btn' type='primary' style={{background: '#4eb652'}} icon='plus'>新增学生</Button>
        </div>
        <div style={{clear: 'both'}} />
      </div>
    )
  }
}

SearchBarMemberStu.propTypes = {
  // selectList: PropsTypes.object,
  onBtnSearchClick: PropsTypes.func,
  onSelect1Change: PropsTypes.func,
  onSelect2Change: PropsTypes.func,
  onSelect3Change: PropsTypes.func,
  // onSelect4Change: PropsTypes.func,
  onSelect5Change: PropsTypes.func,
  onBtnBatchExport: PropsTypes.func,
  uploadProps: PropsTypes.object,
  AUTHORITY_NAME: PropsTypes.string
}

export default SearchBarMemberStu
