/* eslint-disable react/prop-types,space-infix-ops */
/**
 *
 */
import React from 'react'
import { Row, Col, Button, Icon, message } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Config from 'config'
import webStorage from 'webStorage'
import {processStr} from 'utils'

class WebApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  handleAppClick (item) {
    let STAR_WEB_ROLE_CODE = webStorage.getItem('STAR_WEB_ROLE_CODE')
    if (STAR_WEB_ROLE_CODE=== '' || STAR_WEB_ROLE_CODE=== null) {
      message.warning('请先登录!')
      return
    }
    this.props.history.push('/operate-manage-home/all-app-detail-third?'+item.sw_id)
  }

  renderItem (item, index) {
    return (
      <Col span={5} key={index} style={{marginBottom: '15px'}}>
        <div className='item'>
          <div className='item-split'>
            <div className='split' />
          </div>
          <div className='item-content'>
            <img className='app-img' src={Config.IMG_BASE_URL + item.sw_icon} />
            <div className='title'>{item.sw_name}</div>
            <div className='content'>{processStr(item.sw_desc, 12)}</div>
            <div>
              <Button onClick={() => { this.handleAppClick(item) }}>查看详情<Icon type='arrow-right' /></Button>
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

export default withRouter(WebApp)
