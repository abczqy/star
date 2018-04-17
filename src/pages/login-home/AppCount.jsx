/**
 * 游客登陆-首页-应用个数统计
 */
import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
export default class AppCount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  renderItem (item, index) {
    return (
      <Col span={8} key={index}>
        <div className='item'>
          <span className='num'>{item.count}</span>
          <span className='more'>+</span>
          <div className='category'>{item.name}(个)</div>
        </div>
      </Col>
    )
  }

  render () {
    return (
      <div className='bottom-banner'>
        <div className='div-wapper'>
          <Row>
            {
              this.props.data.map((item, index, arr) => {
                return this.renderItem(item, index)
              })
            }
          </Row>
        </div>
      </div>
    )
  }
}
AppCount.propTypes = {
  data: PropTypes.array
}
