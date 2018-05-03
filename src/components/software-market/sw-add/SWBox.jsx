import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import PropsTypes from 'prop-types'
import './SWBox.scss'

class SWBox extends Component {
  render () {
    const { list, boxList } = this.props
    return (
      <div className='sw-box-wrap'>
        <Row>
          {boxList.map((item, index) => {
            return (<Col span={2} key={index}><div className='sw-box-icon'>
              {list.length >= item ? <img src={list[index]} style={{width: '40px', height: '40px'}} /> : <Icon style={{fontSize: '40px', color: '#999'}} type='plus' />}
            </div></Col>)
          })}
          {/* <Col span={2}>
            <div className='sw-box-icon'>
              {list.length >= 1 ? <img src={list[0]} style={{width: '40px', height: '40px'}} /> : <Icon style={{fontSize: '40px', color: '#999'}} type='plus' />}
            </div>
          </Col>
          <Col span={2}>
            <div className='sw-box-icon'>
              {list.length >= 2 ? <img src={list[1]} style={{width: '40px', height: '40px'}} /> : <Icon style={{fontSize: '40px', color: '#999'}} type='plus' />}
            </div>
          </Col>
          <Col span={2}>
            <div className='sw-box-icon'>
              {list.length >= 3 ? <img src={list[2]} style={{width: '40px', height: '40px'}} /> : <Icon style={{fontSize: '40px', color: '#999'}} type='plus' />}
            </div>
          </Col>
          <Col span={2}>
            <div className='sw-box-icon'>
              {list.length >= 4 ? <img src={list[3]} style={{width: '40px', height: '40px'}} /> : <Icon style={{fontSize: '40px', color: '#999'}} type='plus' />}
            </div>
          </Col> */}
        </Row>
      </div>
    )
  }
}

SWBox.propTypes = {
  list: PropsTypes.array,
  boxList: PropsTypes.array
}

export default SWBox
