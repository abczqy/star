/**
 * 运营统计-用户统计
 */
import React from 'react'
import Config from 'config'

export default class UserCount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return <iframe style={{height: 'calc(100vh)', width: '100%'}} src={Config.USER_COUNT} frameBorder='0' />
  }
}
