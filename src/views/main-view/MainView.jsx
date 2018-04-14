import React from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'

class MainView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (
      <div>
        {renderRoutes(this.props.route.childRoutes)}
      </div>
    )
  }
}
MainView.propTypes = {
  route: PropTypes.object
}

export default withRouter(MainView)
