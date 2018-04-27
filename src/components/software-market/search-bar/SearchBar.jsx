/**
 * 为software-market页面做一个有搜索框的bar -- 由于复用的关系，至少有三个页面用到这个组件
 * 可以先把view搞出来 后面结合redux可以留一些渲染的state来判断渲染
 * 这里应该需要布局的一些东西 -- Grid
 * 然后 响应式后面也加上
 * 当然 -- 表单是页面必须的   但是组件这里就不然了 先把view层搞出来 后期把form加上
 * 层层递进 层层进化 步步为营 确保每一个改变都可以运行通
 * 搜索的接口肯定也是要暴露给父组件的，让父组件拿到搜索框的内容
 */
import React, { Component } from 'react'
import { Input, Select, Button, Row, Col } from 'antd'
import PropsTypes from 'prop-types'

const Search = Input.Search
const Option = Select.Option

class SearchBar extends Component {
  render () {
    const { onSearch, onSeachChange, onBtnClick, onSelectChange } = this.props
    return (
      <div className='search-bar-wrap'>
        <Row gutter={16}>
          <Col span={8}>
            <span className='search-bar-label'>类型: </span>
            <Select
              defaultValue='全部'
              style={{ width: '75%' }}
              onChange={onSelectChange}
            >
              <Option value='all'>全部</Option>
              <Option value='edu'>教育类</Option>
              <Option value='teachAid'>教辅类</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Search
              onSearch={onSearch}
              onChange={onSeachChange}
            />
          </Col>
          <Col span={4}>
            <Button type='primary' onClick={onBtnClick}>搜索</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

SearchBar.propTypes = {
  onSearch: PropsTypes.func,
  onBtnClick: PropsTypes.func,
  onSeachChange: PropsTypes.func,
  onSelectChange: PropsTypes.func
}

export default SearchBar
