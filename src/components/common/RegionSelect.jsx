import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import address from '../../../static/document/address'

const Option = Select.Option

class RegionSelect extends React.Component {
  constructor (props) {
    super(props)
    const value = this.props.value
    this.state = {
      province: value.province || '',
      city: value.city || '',
      region: value.region || ''
    }
  }
  componentWillReceiveProps (nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value
      this.setState(value)
    }
  }
  changeProvince = (name, value) => {
    if (name === 'province') {
      this.setState({
        province: value,
        city: '',
        region: ''
      }, () => {
        this.triggerChange({})
      })
    } else if (name === 'city') {
      this.setState({
        city: value,
        region: ''
      }, () => {
        this.triggerChange({})
      })
    } else {
      this.setState({
        region: value
      }, () => {
        this.triggerChange({})
      })
    }
  }
  getAddress = () => {
    return this.state
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue))
    }
  }

  render () {
    const { province, city, region } = this.state
    const { width } = this.props
    return (
      <div style={{width: width || 320, display: 'inline-block'}}>
        <div style={{display: 'flex'}}>
          <Select style={{flex: 1, marginRight: 10}} showSearch onChange={(value) => { this.changeProvince('province', value) }}>
            {Object.keys(address).map((province) => {
              return <Option value={province} key={province}>{province}</Option>
            })}
          </Select>
          <Select style={{flex: 1, marginRight: 10}} showSearch value={city} onChange={(value) => { this.changeProvince('city', value) }}>
            {province && Object.keys(address[province]).map((city) => {
              return <Option value={city} key={city}>{city}</Option>
            })}
          </Select>
          <Select style={{flex: 1}} value={region} showSearch onChange={(value) => { this.changeProvince('region', value) }}>
            {city && address[province][city].map((region) => {
              return <Option value={region} key={region}>{region}</Option>
            })}
          </Select>
        </div>
      </div>
    )
  }
}

RegionSelect.propTypes = {
  width: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.object
}

export default RegionSelect
