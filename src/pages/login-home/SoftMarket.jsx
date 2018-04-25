/* eslint-disable react/prop-types */
/**
 * 游客登录页软件市场
 */
import React from 'react'
import { Row, Col, List, Avatar } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class SoftMarket extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  processStr (str, n) {
    let l = str.length
    if (l <= n) return str
    return str.slice(0, n) + '...'
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
                  avatar={<Avatar className='img' src={item.SW_ICON} />}
                  title={<a className='title' href=''>{item.SW_NAME}</a>}
                  description={this.processStr(item.SW_DESC, 60)}
                />
              </List.Item>
            )}
          />
        </div>
      </Col>
    )
  }

  // eslint-disable-next-line react/prop-types
  goToSoftMarket () {
    this.props.history.push({
      pathname: '/operate-manage-home'
    })
  }

  render () {
    return (
      <div className='soft-market-container'>
        <Row>
          <Col span={24}>
            <div className='soft-market-header'>
              <span style={{cursor: 'pointer'}} onClick={() => { this.goToSoftMarket() }}>
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

          </Col>
        </Row>
      </div>
    )
  }
}

SoftMarket.propTypes = {
  data: PropTypes.array
}
export default withRouter(SoftMarket)
