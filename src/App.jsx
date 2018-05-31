/* eslint-disable standard/object-curly-even-spacing */
import React from 'react'
import { renderRoutes } from 'react-router-config'
import { HashRouter as Router } from 'react-router-dom'
import './App.scss'
import routes from 'routes'

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
  }

  render () {
    return (
      <div className='App'>
        <Router>
          {
            renderRoutes(routes)
          }
        </Router>
      </div>
    )
  }
}

export default App
