/* eslint-disable no-useless-constructor */
import React from 'react'
import webStorage from 'webStorage'
import { Redirect } from 'react-router'

export const Logged = (WrappedComponent, newProps) => {
  return class WrappingComponent extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        isLogged: false // 是否登录
      }
    }

    componentWillMount () {
      this.setState({
        isLogged: webStorage.getItem('STAR_WEB_IS_LOGGED') ? webStorage.getItem('STAR_WEB_IS_LOGGED') : false
      })
    }

    render () {
      return this.state.isLogged ? <WrappedComponent {...this.props} {...newProps} /> : <Redirect to='/' />
    }
  }
}
