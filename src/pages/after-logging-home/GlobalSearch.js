/**
 * 市场分析
 */
import React, { Component } from 'react'
import { Select, Icon } from 'antd'
import './GlobalSearch.scss'
import {homeSearch} from 'services/software-home/'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
const Option = Select.Option
let timeout
// let currentValue
function fetch (value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  let currentValue = value
  function fake () {
    homeSearch({
      keyword: value
    }, (res) => {
      if (currentValue === value) {
        const result = res.data.list
        console.log(22222, result)
        const data = []
        result.forEach((r) => {
          data.push({
            value: r.SW_NAME,
            text: r.SW_NAME,
            id: r.SW_ID
          })
        })
        callback(data)
      }
    })
  }

  timeout = setTimeout(fake, 300)
}
class GlobalSearch extends Component {
  static propTypes = {
    // history: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      teacherData: [],
      data: [],
      value: ''
    }
  }
  handleChange = (value) => {
    this.setState({ value })
    fetch(value, data => this.setState({ data }))
  }
  handleOnselect = (d) => {
    console.log('099999999999999', d)
    // this.props.history.push({
    //   pathname: '/operate-manage-home/all-app-detail-third',
    //   search: d.SW_ID
    // })
  }
  render () {
    console.log(888888, this.state.data)
    const options = this.state.data.map((d, index, arr) => {
      return (
        <Option key={d.value}><Link to={{pathname: '/operate-manage-home/all-app-detail-third', search: d.id}}>{d.text}</Link></Option>
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

export default withRouter(GlobalSearch)
