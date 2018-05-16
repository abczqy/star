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

  componentDidMount () {
    var userCount = document.getElementById('userCount')
    userCount.contentWindow.sessionId = webStorage.getItem('STAR_WEB_SESSION_ID')
  }

  render () {
    return <iframe style={{height: 'calc(100vh)', width: '100%'}} src={Config.USER_COUNT} frameBorder='0' id='userCount' />
  }
}
