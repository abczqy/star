/**
 * 游客登陆-教育新闻
 */
import React from 'react'
import NewsList from '../news/newsList'

export default class News extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div >
        <NewsList />
      </div>
    )
  }
}
