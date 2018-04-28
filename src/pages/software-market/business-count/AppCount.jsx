/**
 * 运营统计-应用统计
 */
import React from 'react'
import Config from 'config'

export default class AppCount extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return <iframe style={{height: 'calc(100vh)', width: '100%'}} src={Config.APP_COUNT} frameBorder='0' />
  }
}
