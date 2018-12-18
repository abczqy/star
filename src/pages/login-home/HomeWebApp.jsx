/* eslint-disable react/prop-types,space-infix-ops */
/**
 *
 */
import React from 'react'
import { Row, Col, message } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Config from 'config'
import webStorage from 'webStorage'
import './WebApp.scss'

class HomeWebApp extends React.Component {
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
    if (item.user_id) {
      window.open(item.sw_path)
    } else {
      this.props.history.push('/operate-manage-home/all-app-detail?'+item.sw_id)
    }
  }

  render () {
    return (
      <Row type='flex' justify='start' style={{height: '100%'}}>
        {
          this.props.data.map((item, index, arr) => {
            return (
              index<6
                ? <Col span={8} key={index} onClick={() => { this.handleAppClick(item) }}>
                  <div style={{width: '100%', textAlign: 'center'}}>
                    <img className='app-img' src={Config.IMG_BASE_URL + (item.sw_icon || item.SW_ICON)} />
                    <div className='title'>{item.sw_name || item.SW_NAME}</div>
                  </div>
                </Col> : ''
            )
          })
        }
      </Row>
    )
  }
}

HomeWebApp.propTypes = {
  data: PropTypes.array
}

export default withRouter(HomeWebApp)
