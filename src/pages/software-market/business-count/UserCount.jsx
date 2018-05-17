/**
 * 运营统计-用户统计
 */
import React from 'react'
import Config from 'config'
import webStorage from 'webStorage'

export default class UserCount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    let sessionId = webStorage.getItem('STAR_WEB_SESSION_ID')
    let iframeUrl = Config.USER_COUNT + '?' + 'sessioinId=' + sessionId
    return <iframe style={{height: 'calc(100vh)', width: '100%'}} src={iframeUrl} frameBorder='0' />
  }
}
