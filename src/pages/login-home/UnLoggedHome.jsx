/* eslint-disable react/jsx-no-bind */
/**
 * 游客登陆界面
 */
import React from 'react'
import createHistory from 'history/createHashHistory'
const history = createHistory()

export default class UnLoggedHome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: 'home'
    }
  }

  handleTabChange (link) {
    history.push(link)
  }

  render () {
    console.log('lllllllllllllllllllllll')
    console.log(this.props)
    return (
      <div>
        未登录的首页
      </div>
    )
  }
}
