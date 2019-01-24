/**
 * 其实和SerchBar区别不大
 * 后期将默认数据和可定制化加进来-- 用数据驱动渲染后
 * 利用判断渲染 -- 将两个组件合二为一
 */
import React, { Component } from 'react'
import { Select, Button, Input } from 'antd'
import PropsTypes from 'prop-types'
import './SearchBarMemberEduSer.scss'

const Option = Select.Option

class SearchBarMemberEduSer extends Component {
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
      if (Item === '全部') {
        return <Option value={''}>{Item}</Option>
      } else {
        return <Option value={Item}>{Item}</Option>
      }
    })
  }

  render () {
    const {
      // selectList,
      onBtnSearchClick,
      onSelect1Change,
      onSelect2Change,
      // onSelect3Change,
      // onSelect4Change,
      onSelect5Change,
      onBtnBatchExport
    } = this.props
    return (
      <div className='search-bar-wrap'>
        <div className='search-bar-item'>
          <span className='input-label'>组织编号</span>
          <Input
            className='input'
            placeholder='请输入'
            // showSearch
            onChange={onSelect1Change} >
            {/* {selectList.idList && this.getOptions(selectList.idList)} */}
          </Input>
        </div>
        <div className='search-bar-item'>
          <span className='input-label'>机构名称</span>
          <Input
            className='input'
            placeholder='请输入'
            // showSearch
            onChange={onSelect2Change} >
            {/* {selectList.eduNameList && this.getOptions(selectList.eduNameList)} */}
          </Input>
        </div>
        {/* <div className='search-bar-item' style={{width: 270}}>
          <span className='select-label'>上级机构名称</span>
          <Input
            className='select'
            placeholder='请输入'
            // showSearch
            onChange={onSelect3Change} >
             {selectList.eduUpperList && this.getOptions(selectList.eduUpperList)}
          </Input>
        </div>
        <div className='search-bar-item'>
          <span className='select-label-2'>所属级别 </span>
          <Select
            className='select-2'
            placeholder='请输入'
            // showSearch
            onChange={onSelect4Change} >
            {selectList.eduClassList && this.getOptions(selectList.eduClassList)}
          </Select>
        </div> */}
        <div className='search-bar-item'>
          <span className='select-label'>允许登录 </span>
          <Select defaultValue='all' className='select' onChange={onSelect5Change} >
            <Option value='all'>全部</Option>
            <Option value='allow'>允许</Option>
            <Option value='refuse'>不允许</Option>
          </Select>
        </div>
        <div className='search-bar-buttons'>
          <Button type='primary' className='search-bar-btn' onClick={onBtnSearchClick}>搜索</Button>
          <Button type='primary' className='search-bar-btn' onClick={onBtnBatchExport}>批量导出</Button>
        </div>
        <div style={{clear: 'both'}} />
      </div>
    )
  }
}

SearchBarMemberEduSer.propTypes = {
  // selectList: PropsTypes.object,
  onBtnSearchClick: PropsTypes.func,
  onSelect1Change: PropsTypes.func,
  onSelect2Change: PropsTypes.func,
  // onSelect3Change: PropsTypes.func,
  // onSelect4Change: PropsTypes.func,
  onSelect5Change: PropsTypes.func,
  onBtnBatchExport: PropsTypes.func
}

export default SearchBarMemberEduSer
