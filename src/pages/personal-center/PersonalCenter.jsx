/**
 * 个人中心
 */

import React, { Component } from 'react'
import { Card, Row, Col } from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'
import ajaxUrl from 'config'
import ApplicationCard from '../../components/personal-center/application-card/ApplicationCard'
import { connect } from 'react-redux'
// import {getRole} from '../../redux/actions/role'
import './PersonalCenter.scss'

class PersonalCenter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myApps: [],
      myCollections: []
    }
  }

  // 获取我的应用
  getMyApps=() => {
    axios.post(ajaxUrl.personalApps, {}).then(res => {
      this.setState({
        myApps: res.data.data
      })
    }).catch(e => { console.log(e) })
  }

  // 获取我的收藏
  getMyCollections=() => {
    axios.post(ajaxUrl.personalCollections, {}).then(res => {
      this.setState({
        myCollections: res.data.data
      })
    }).catch(e => { console.log(e) })
  }

  componentDidMount () {
    console.log(this.props.role)
    this.getMyApps()
    this.getMyCollections()
  }

  render () {
    return (
      <div className='personal-center center-view mtb20'>
        <Card title='我的应用' bordered={false} >
          <Row gutter={16} >
            {
              this.state.myApps.map((item, index) => (
                <Col span={6} key={index}>
                  <ApplicationCard content={item} share={this.props.role === 'teacher'} />
                </Col>
              ))
            }
          </Row>
        </Card>
        {
          this.props.role === 'parents' && (
            <Card title='学生应用' bordered={false} >
              <Row gutter={16} >
                {
                  this.state.myCollections.map((item, index) => (
                    <Col span={6} key={index}>
                      <ApplicationCard content={item} collection />
                    </Col>
                  ))
                }
              </Row>
            </Card>
          )
        }
        <Card title='我的收藏' bordered={false} >
          <Row gutter={16} >
            {
              this.state.myCollections.map((item, index) => (
                <Col span={6} key={index}>
                  <ApplicationCard content={item} share={this.props.role === 'teacher'} />
                </Col>
              ))
            }
          </Row>
        </Card>
      </div>
    )
  }
}

PersonalCenter.propTypes = {
  role: PropTypes.string
}

const mapStateToProps = state => ({
  role: state.role.code
})

export default connect(
  mapStateToProps
)(PersonalCenter)
