/**
 * 个人中心
 */

import React, { Component } from 'react'
import { Card, Row, Col, Divider, message } from 'antd'
import PropTypes from 'prop-types'
import axios from 'axios'
import ajaxUrl from 'config'
import ApplicationCard from './application-card/ApplicationCard'
import { connect } from 'react-redux'
import './PersonalCenter.scss'

class PersonalCenter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myApps: [],
      myCollections: [],
      openStatus: {// 卡片展开：true,卡片收起：false
        myApps: false,
        studentApps: false,
        myCollections: false
      },
      deleteActive: {// 删除按钮：false 确认/取消：true
        myApps: false,
        studentApps: false,
        myCollections: false
      },
      deleteIds: {// 要删除的应用Id
        myApps: [],
        studentApps: [],
        myCollections: []
      }
    }
  }

  // 获取我的应用
  getMyApps = () => {
    axios.post(ajaxUrl.personalApps, {}).then(res => {
      this.setState({
        myApps: res.data.data
      })
    }).catch(e => { console.log(e) })
  }

  // 获取我的收藏
  getMyCollections = () => {
    axios.post(ajaxUrl.personalCollections, {}).then(res => {
      this.setState({
        myCollections: res.data.data
      })
    }).catch(e => { console.log(e) })
  }

  // 确认删除
  deleteConfirm = (type) => {
    console.log('确认删除', type)
    this.setState({
      deleteActive: {
        ...this.state.deleteActive,
        [type]: false
      }
    })
    let checks = document.getElementsByName(`${type}DeleteIds`)
    let checkIds = []
    for (var i in checks) {
      if (checks[i].checked) {
        checkIds.push(checks[i].value)
      }
    }
    if (checkIds.length > 0) {
      let url = ''
      switch (type) {
        case 'myApps':
          url = ajaxUrl.personalAppsDelete
          break
        case 'myCollections':
          url = ajaxUrl.personalCollectionsDelete
          break
        case 'studentApps':
          /* 待修改 */
          url = ajaxUrl.personalCollectionsDelete
          break
        default:
          break
      }
      axios.post(url, {
        sw_List: checkIds
      }).then(res => {
        console.log(res.data)
        if (res.data.result === 'success') {
          message.success('成功删除应用')
        }
      }).catch(e => { console.log(e) })
    }
    console.log(checkIds)
  }

  // 取消删除
  deleteCancel = (type) => {
    console.log('取消删除', type)
    this.setState({
      deleteActive: {
        ...this.state.deleteActive,
        [type]: false
      }
    })
  }

  // 删除按钮
  setDeleteActivity = (type) => {
    console.log('删除点击', type)
    this.setState({
      deleteActive: {
        ...this.state.deleteActive,
        [type]: true
      }
    })
  }

  // 收起
  takeUp = (type) => {
    console.log('收起', type)
    this.setState({
      openStatus: {
        ...this.state.openStatus,
        [type]: false
      }
    })
  }

  // 展开
  open = (type) => {
    console.log('展开', type)
    this.setState({
      openStatus: {
        ...this.state.openStatus,
        [type]: true
      }
    })
  }

  // 卡片右上角删除和展开收起操作
  getOpts = (type) => {
    return (
      <span className='opt-box' >
        {
          this.state.deleteActive[type]
            ? (
              <span>
                <span className='link confirm' onClick={() => { this.deleteConfirm(type) }}>确认</span>
                <span className='link cancel' onClick={() => { this.deleteCancel(type) }}>取消</span>
              </span>
            )
            : <span className='link delete-btn' onClick={() => { this.setDeleteActivity(type) }}>删除</span>
        }
        <Divider type='vertical' />
        {
          this.state.openStatus[type]
            ? <span className='link take-up' onClick={() => { this.takeUp(type) }} >收起</span>
            : <span className='link open' onClick={() => { this.open(type) }} >展开</span>
        }
      </span>
    )
  }

  // 生成APP列表
  createAppList = (openStatus, appList) => {
    let list = []
    if (openStatus) { // 展开状态
      appList.forEach((item, index) => {
        let app = (
          <Col span={6} key={index}>
            <ApplicationCard
              type='myApps'
              content={item}
              share={this.props.role === 'teacher'}
              deleteCheck={this.state.deleteActive['myApps']}
            />
          </Col>
        )
        list.push(app)
      })
    } else { // 收起状态
      if (appList.length > 10) {
        appList.forEach((item, index) => {
          if (index < 10) {
            let app = (
              <Col span={6} key={index}>
                <ApplicationCard
                  type='myApps'
                  content={item}
                  share={this.props.role === 'teacher'}
                  deleteCheck={this.state.deleteActive['myApps']}
                />
              </Col>
            )
            list.push(app)
          }
        })
      } else {
        appList.forEach((item, index) => {
          let app = (
            <Col span={6} key={index}>
              <ApplicationCard
                type='myApps'
                content={item}
                share={this.props.role === 'teacher'}
                deleteCheck={this.state.deleteActive['myApps']}
              />
            </Col>
          )
          list.push(app)
        })
      }
    }
    return list
  }

  componentDidMount () {
    console.log(this.props.role)
    this.getMyApps()
    this.getMyCollections()
  }

  render () {
    return (
      <div className='personal-center center-view mtb20'>
        <Card
          title='我的应用'
          bordered={false}
          extra={this.getOpts('myApps')}
          className={this.state.openStatus['myApps'] ? 'open' : 'take-up'}
        >
          <Row gutter={16} >
            {
              this.createAppList(this.state.openStatus['myApps'], this.state.myApps)
            }
          </Row>
        </Card>
        {
          this.props.role === 'parents' && (
            <Card
              title='学生应用'
              bordered={false}
              extra={this.getOpts('studentApps')}
              className={this.state.openStatus['studentApps'] ? 'open' : 'take-up'}
            >
              <Row gutter={16} >
                {
                  this.createAppList(this.state.openStatus['studentApps'], this.state.studentApps)
                }
              </Row>
            </Card>
          )
        }
        <Card
          title='我的收藏'
          bordered={false}
          extra={this.getOpts('myCollections')}
          className={this.state.openStatus['myCollections'] ? 'open' : 'take-up'}
        >
          <Row gutter={16} >
            {
              this.createAppList(this.state.openStatus['myCollections'], this.state.myCollections)
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
