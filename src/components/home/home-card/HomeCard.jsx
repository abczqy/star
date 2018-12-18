/* eslint-disable react/jsx-no-bind,react/prop-types,one-var */
/**
 * 首页卡片组件
 */
import React from 'react'
import { Card } from 'antd'
import './HomeCard.scss'

export default class HomeCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Card
        title={this.props.title}
        extra={<a href={this.props.moreUrl} style={{color: this.props.titleColor, zIndex: 10}}>更多...</a>}
        style={{ width: this.props.cardWidth, height: 255 }}
        headStyle={{backgroundColor: this.props.cardBgColor, height: 33, minHeight: 33, color: this.props.titleColor, fontSize: '14px'}}
      >
        {this.props.children || '' }
      </Card>
    )
  }
}
