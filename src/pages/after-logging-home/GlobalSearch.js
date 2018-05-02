/**
 * 市场分析
 */
import React, { Component } from 'react'
import { Select, Icon } from 'antd'
import './GlobalSearch.scss'
import {homeSearch} from 'services/software-home/'
const Option = Select.Option
let timeout
// let currentValue
class GlobalSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      value: ''
    }
  }
  handleChange = (value) => {
    this.setState({ value })
    this.fetch(value, data => this.setState({ data }))
  }
  fetch = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    let currentValue = value
    function fake () {
      homeSearch({
        keyword: value
      }, (res) => {
        console.log(111111111111111111, res.data)
        res.json()
        this.setState({
          teacherData: res.data.list
        })
      }, (d) => {
        if (currentValue === value) {
          const result = d.result
          const data = []
          result.forEach((r) => {
            data.push({
              value: r[0],
              text: r[0]
            })
          })
          callback(data)
        }
      }).catch((e) => { console.log(e) })
    }

    timeout = setTimeout(fake, 300)
  }
  render () {
    const options = this.state.data.map(d => {
      return (
        <Option key={d.value}>{d.text}</Option>
      )
    })
    return (
      <div className='globalSearch'>
        <Select
          mode='combobox'
          value={this.state.value}
          placeholder={'搜索应用名称'}
          style={{width: '200px', float: 'right', marginTop: '-26px', borderRadius: 10}}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onChange={this.handleChange}
        >
          {options}
        </Select>
        <Icon type='search' />
      </div>
    )
  }
}

export default GlobalSearch
