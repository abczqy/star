import React from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter as Router } from 'react-router-dom'
import './App.scss'
import routes from 'routes'
import webStorage from 'webStorage'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  /**
   * 获取登录信息
   */
  initLogin () {
    // LoginServices.registerLogin(()=>{
    // this.props.login()
    // });
  }

  componentWillMount () {
    // this.initLogin()
    window.addEventListener('unload', this.handleUnload)
  }

  componentWillUnmount () {
    window.removeEventListener('unload', this.handleUnload)
  }

  handleUnload () {
    webStorage.clear()
  }

  render () {
    /* if (this.props.loginLoading) {
      return (
        <ReactLoading type={'bars'} color={'red'} className='bonc-mung-loadding' />
      )
    } */
    return (
      <div className='App'>
        <Router>
          {
            renderRoutes(routes)
          }
          {/* <div>
            <Route path='/unlogged' component={LoginHome} />
          </div> */}
        </Router>
      </div>
    )
  }
}

export default App
