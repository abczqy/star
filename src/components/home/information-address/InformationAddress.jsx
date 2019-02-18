/* 地址选择弹窗 */
import React, { Fragment } from 'react'
import { Popover, Button, Select, Tabs } from 'antd'
import address from '../../../../static/document/address'
import PropTypes from 'prop-types'

const TabPane = Tabs.TabPane
const Option = Select.Option

class InformationAddress extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      grade: props.grade,
      visible: props.visible
    }
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      grade: nextProps.grade,
      visible: nextProps.visible
    })
  }
  render () {
    const { grade, visible } = this.state
    const { changeGrade } = this.props
    return (
      <Popover content={(
        <Fragment>
          <Tabs defaultActiveKey={'1'} tabPosition='left' style={{display: 'inline-block', verticalAlign: 'middle'}}>
            <TabPane tab='省级' key='1'>
              <Select value={grade.province} style={{width: 150, marginTop: 55}} onChange={(value) => changeGrade('province', value)}>
                {Object.keys(address).map((province, index) => {
                  return <Option value={province} key={index}>{province}</Option>
                })}
              </Select>
            </TabPane>
            <TabPane tab='市级' key='2'>
              <Select value={grade.city} style={{width: 150, marginTop: 55}} onChange={(value) => changeGrade('city', value)}>
                {grade.province && Object.keys(address[grade.province]).map((city, index) => {
                  return <Option value={city} key={index}>{city}</Option>
                })}
              </Select>
            </TabPane>
            <TabPane tab='区级' key='3'>
              <Select value={grade.region} style={{width: 150, marginTop: 55}} onChange={(value) => changeGrade('region', value)}>
                {grade.province && grade.city && address[grade.province][grade.city].map((region, index) => {
                  return <Option value={region} key={index}>{region}</Option>
                })}
              </Select>
            </TabPane>
          </Tabs>
          <div style={{display: 'inline-block', marginLeft: 10, verticalAlign: 'middle'}}>
            <Button htmlType='button' style={{marginBottom: 10}} onClick={() => this.setState({visible: false})}>取消</Button><br />
            <Button type='primary' htmlType='button' onClick={this.props.sureAddress}>确认</Button>
          </div>
        </Fragment>
      )} trigger='click' placement='bottomLeft' visible={visible}>
        {this.props.children}
      </Popover>
    )
  }
}

InformationAddress.propTypes = {
  grade: PropTypes.object,
  visible: PropTypes.bool,
  sureAddress: PropTypes.func,
  changeGrade: PropTypes.func,
  children: PropTypes.node
}

export default InformationAddress
