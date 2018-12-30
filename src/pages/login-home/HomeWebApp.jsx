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
import imgApp from '../../assets/images/work-plat/app-more.png'
import './WebApp.scss'

class HomeWebApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillReceiveProps (nextProps) {
    // console.log('nextProps:  ', nextProps)
    if (nextProps.data !== this.props.data) {
      this.setState({
        data: nextProps.data
      })
      // return true
    }
  }

  componentDidMount () {
    // console.log('componentDidMount=======', this.state.data)
    this.setState({
      data: this.props.data
    })
  }

  handleAppClick (item) {
    let STAR_WEB_ROLE_CODE = webStorage.getItem('STAR_WEB_ROLE_CODE')
    if (STAR_WEB_ROLE_CODE=== '' || STAR_WEB_ROLE_CODE=== null) {
      message.warning('请先登录!')
      return
    }
    if (item.appSource && item.appSource === 'pt') {
      window.open(item.apppath)
    } else {
      this.props.history.push('/operate-manage-home/all-app-detail?'+item.appId)
    }
  }

  render () {
    // console.log('render=====', this.state.data)

    return (
      <Row type='flex' justify='start' style={{height: '100%'}}>
        {
          this.state.data && this.state.data.map((item, index) => {
            return (
              <Col span={8} key={index} onClick={() => { this.handleAppClick(item) }}>
                <div style={{width: '100%', textAlign: 'center'}}>
                  {
                    item.appIcon && item.appIcon
                      ? <img className='app-img' src={Config.IMG_BASE_URL_V2 + item.appIcon} />
                      : <img className='app-img' style={{backgroundColor: '#1890ff'}} src={imgApp} />
                    // <img className='app-img' src={imgApp} />
                  }
                  <div className='title'>{item.appName || ''}
                  </div>
                </div>
              </Col>
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
