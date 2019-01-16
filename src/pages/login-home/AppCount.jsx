/**
 * 游客登录-首页-应用个数统计
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
          <span className='num'>{item.NUM}</span>
          <span className='more'>+</span>
          <div className='category'>{item.APP_TYPE_NAME}(个)</div>
        </div>
      </Col>
    )
  }

  render () {
    // console.log('AppCount！÷！！！！！！！！！！', this.props)
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
