/**
 * 运营统计-应用统计
 */
import React from 'react'
import Config from 'config'
import webStorage from 'webStorage'

export default class AppCount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    let sessionId = webStorage.getItem('STAR_WEB_SESSION_ID')
    let iframeUrl = Config.APP_COUNT + '?' + 'sessioinId=' + sessionId
    return <iframe style={{height: 'calc(100vh)', width: '100%'}} src={iframeUrl} frameBorder='0' />
  }
}
