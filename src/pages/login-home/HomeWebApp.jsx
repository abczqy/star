/* eslint-disable react/prop-types,space-infix-ops */
/**
 *
 */
import React from 'react'
import {Row, Col, message} from 'antd'
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
    let type = item.APP_SOURCE || item.appSource
    if (type && type === 'pt') {
      window.open(item.appLink || item.APP_LINK)
    } else {
      this.props.history.push('/operate-manage-home/all-app-detail-third?' + (item.appId || item.APP_ID))
    }
  }

  render () {
    // console.log('render=====', this.state.data)

    return (
      <Row type='flex' justify='start' style={{height: '100%'}} className='home-one-card'>
        {
          this.state.data && this.state.data.map((item, index) => {
            return (
              <Col span={8} key={index} onClick={() => { this.handleAppClick(item) }}>
                <div style={{width: '100%', textAlign: 'center'}}>
                  {
                    item.appIcon || item.APP_ICON
                      ? <img className='app-img' src={Config.IMG_BASE_URL_V2 + (item.appIcon || item.APP_ICON)} style={{cursor: 'pointer', width: 56, height: 56}} />
                      : <img className='app-img' style={{backgroundColor: '#1890ff', cursor: 'pointer'}} src={imgApp} />
                    // <img className='app-img' src={imgApp} />
                  }
                  <div className='title'>{item.appName || item.APP_NAME || ''}
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
