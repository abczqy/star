/* eslint-disable react/prop-types,space-infix-ops */
/**
 *
 */
import React from 'react'
import { Row, Col, Button, message } from 'antd'
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
    if (item.user_id) {
      window.open(item.sw_path)
    } else {
      this.props.history.push('/operate-manage-home/all-app-detail?'+item.sw_id)
    }
  }

  renderItem (item, index) {
    if (!item.isEmpty) {
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
                <Button onClick={() => { this.handleAppClick(item) }}>{item.user_id ? '打开':'开通'}</Button>
              </div>
            </div>
          </div>
        </Col>
      )
    } else {
      return (
        <Col span={5} key={index} style={{marginBottom: '15px'}}>
          <div className='item'>
            <div className='empty' />
          </div>
        </Col>
      )
    }
  }

  /**
   * 组装数据  xc（前两个） 和 wkm（后两个）
   */
  getData () {
    let arr= []
    for (let i=0; i<4; i++) {
      if (this.props.data[i]) {
        arr.push(this.props.data[i])
      }
    }
    let arr1 = []
    let arr2 = []
    let arr11 = []
    let arr22 = []
    for (let i=0; i<4; i++) {
      if (arr[i]) {
        if (arr[i].fa_name === 'xc') {
          arr1.push(arr[i])
        }
        if (arr[i].fa_name === 'wkm') {
          arr2.push(arr[i])
        }
      }
    }
    if (arr1.length < 2) {
      for (let j=0; j<2; j++) {
        if (arr1[j]) {
          arr11.push(arr1[j])
        } else {
          arr11.push({
            isEmpty: true
          })
        }
      }
    } else {
      arr11 = arr1
    }
    if (arr2.length < 2) {
      for (let k=0; k<2; k++) {
        if (arr2[k]) {
          arr22.push(arr2[k])
        } else {
          arr22.push({
            isEmpty: true
          })
        }
      }
    } else {
      arr22 = arr2
    }
    return [].concat(arr11, arr22)
  }

  render () {
    return (
      <div className='web-app-container'>
        <Row type='flex' justify='space-around'>
          {
            this.getData().map((item, index, arr) => {
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
