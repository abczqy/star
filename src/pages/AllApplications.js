/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import { Menu } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AllApplicationsDetail from './AllApplicationsDetail'
// import axiosApi from '../../../api'
class AllApplications extends React.Component {
  constructor (props) {
    super(props)
    this.form =
      this.state = {
        mode: 'inline',
        theme: 'light'
      }
  }
  static propTypes = {
    visible: PropTypes.bool
  }
  changeMode = (value) => {
    this.setState({
      mode: value ? 'vertical' : 'inline'
    })
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light'
    })
  }
  componentWillReceiveProps (nextProps) {
    if ((nextProps.visible !== this.props.visible) && nextProps.visible) {
    }
  }
  render () {
    return (
      <div>
        <Menu
          style={{ width: 256, height: 500, textAlign: 'center', position: 'fixed', left: 0, border: 0, boxShadow: '2px 2px 5px #999' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode={this.state.mode}
          theme={this.state.theme}
        >
          <Menu.Item key='1'>
            <Link to='/all-applications-detail'>全部应用</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            教学类
          </Menu.Item>
          <Menu.Item key='3'>
            教辅类
          </Menu.Item>
          <Menu.Item key='4'>
            管理类
          </Menu.Item>
          <Menu.Item key='5'>
            其他
          </Menu.Item>
        </Menu>
        <AllApplicationsDetail />
      </div>
    )
  }
}
export default AllApplications
