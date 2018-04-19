/**
 * 游客登录页软件市场
 */
import React from 'react'
import { Row, Col, List, Avatar } from 'antd'
import PropTypes from 'prop-types'

export default class SoftMarket extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  renderItem (item, index) {
    return (
      <Col span={7} key={index}>
        <div className='item'>
          <List
            className='soft-market-list-container'
            dataSource={[item]}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar className='img' src={item.src} />}
                  title={<a className='title' href=''>{item.title}</a>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </Col>
    )
  }

  render () {
    return (
      <div className='soft-market-container'>
        <div className='soft-market-header'>
          <span>
            <div>软件市场</div>
            <div>Software Market</div>
          </span>
          <span><div>+</div></span>
        </div>
        <div className='soft-market-content'>
          <Row type='flex' justify='space-around'>
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

SoftMarket.propTypes = {
  data: PropTypes.array
}