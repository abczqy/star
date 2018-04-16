/**
 * 游客登陆-信息公开
 */
import React from 'react'
import Information from '../news/placeInformation'

export default class Info extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <Information />
      </div>
    )
  }
}
