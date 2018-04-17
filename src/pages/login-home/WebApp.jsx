/**
 *
 */
import React from 'react'
import { Row, Col, Button, Icon } from 'antd'
import PropTypes from 'prop-types'

export default class WebApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  renderItem (item, index) {
    return (
      <Col span={5} key={index}>
        <div className='item'>
          <div className='item-split'>
            <div className='split' />
          </div>
          <div className='item-content'>
            <div className='img' />
            <div className='title'>{item.title}</div>
            <div className='content'>{item.content}</div>
            <div>
              <Button>查看详情<Icon type='arrow-right' /></Button>
            </div>
          </div>
        </div>
      </Col>
    )
  }

  render () {
    return (
      <div className='web-app-container'>
        <Row type='flex' justify='space-around'>
          {
            this.props.data.map((item, index, arr) => {
              return this.renderItem(item, index)
            })
          }
        </Row>
      </div>
    )
  }
}
WebApp.propTypes = {
  data: PropTypes.array
}
