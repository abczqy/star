/* eslint-disable standard/object-curly-even-spacing,react/jsx-no-undef */
import React from 'react'
// import { renderRoutes } from 'react-router-config'
import { Route, Redirect, Switch } from 'react-router'
import { HashRouter as Router } from 'react-router-dom'
import './App.scss'
import routes from 'routes'
import {Logged} from 'components/common/hoc/Logged'
import LoginHome from 'views/LoginHome'
import Register from 'pages/register/Register'
import ForgetPass from 'pages/register/ForgetPass'
import MessageTopBar from 'pages/message-notice/MessageTopBar'
import SoftwareMarket from 'views/SoftwareMarket'
import OperateManage from 'views/OperateManage'

let LOperateManage = Logged(OperateManage)
let LSoftwareMarket = Logged(SoftwareMarket)
let LMessageTopBar = Logged(MessageTopBar)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Redirect from='/' exact to='/home/index' />
            <Route path='/home' render={() => {
              return <LoginHome />
            }} />
            <Route path='/operate-manage-home'
              render={() => {
                return <LOperateManage />
              }} />
            <Route path='/software-market-home' render={() => {
              return <LSoftwareMarket childRoutes={routes.softwareMarketChildRoutes} />
            }} />
            <Route path='/topbar-manage' render={() => {
              return <LMessageTopBar />
            }} />
            <Route path='/register-home' component={Register} />
            <Route path='/forget-home' component={ForgetPass} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
