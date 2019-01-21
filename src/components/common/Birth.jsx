/* eslint-disable react/jsx-no-bind,react/prop-types,one-var */
/**
 * 生日    年月日
 */
import React from 'react'
import { Row, Col, Input } from 'antd'

export default class Birth extends React.Component {
  constructor (props) {
    super(props)
    const value = props.value || {}
    this.state = {
      year: value.year || '',
      month: value.month || '',
      day: value.day || ''
    }
  }

  componentWillReceiveProps (nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value
      this.setState(value)
    }
  }

  handleChangeAttr (key, value) {
    if (!('value' in this.props)) {
      this.setState({ [key]: value })
    }
    this.triggerChange({ [key]: value })
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }

  render () {
    return (
      <Row>
        <Col span={6}>
          <Input value={this.state.year} onChange={(e) => { this.handleChangeAttr('year', e.target.value) }} style={{float: 'left'}} placeholder={'请输入年'} />
        </Col>
        <Col span={2}>
          <span>年</span>
        </Col>
        <Col span={6}>
          <Input value={this.state.month} onChange={(e) => { this.handleChangeAttr('month', e.target.value) }} style={{float: 'left'}} placeholder={'请输入月'} />
        </Col>
        <Col span={2}>
          <span>月</span>
        </Col>
        <Col span={6}>
          <Input value={this.state.day} onChange={(e) => { this.handleChangeAttr('day', e.target.value) }} style={{float: 'left'}} placeholder={'请输入日'} />
        </Col>
        <Col span={2}>
          <span>日</span>
        </Col>
      </Row>
    )
  }
}
