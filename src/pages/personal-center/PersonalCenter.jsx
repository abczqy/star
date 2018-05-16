/**
 * 个人中心
 */

import React, { Component } from 'react'
import { Card, Row, Col, Divider, message } from 'antd'
import _ from 'lodash'
import ApplicationCard from './application-card/ApplicationCard'
import Empty from '../../components/common/Empty'
import webStorage from 'webStorage'
import './PersonalCenter.scss'
import { studentAppsDelete } from 'services/software-market'
import { personalApps, personalCollections, personalStudentApp, personalAppsDelete, personalCollectionsDelete } from '../../services/software-market/index'

class PersonalCenter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      myApps: [],
      myCollections: [],
      studentApps: [],
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
    this.role = webStorage.getItem('STAR_WEB_ROLE_CODE')
    console.log(this.role)
  }

  // 获取我的应用列表数据
  getMyApps = () => {
    personalApps({
      num: 0
    }, (res) => {
      let list = res.data
      this.setState({
        myApps: list
      })
    })
  }

  // 获取我的收藏列表数据
  getMyCollections = () => {
    personalCollections({
      num: 0
    }, (res) => {
      let list = res.data
      this.setState({
        myCollections: list
      })
    })
  }

  // 获取学生应用列表数据
  getStudentApps = () => {
    personalStudentApp({
      num: 0
    }, (res) => {
      let list = []
      if (res.data.list) {
        list = res.data.list
      }
      this.setState({
        studentApps: list
      })
    })
  }

  // 确认删除
  deleteConfirm = (type) => {
    // 获取选中的应用id
    let checks = document.getElementsByName(`${type}DeleteIds`)
    let checkIds = []
    for (var i in checks) {
      if (checks[i].checked) {
        checkIds.push(checks[i].value)
      }
    }
    if (checkIds.length > 0) { // 选择了至少一个应用
      if (type === 'studentApps') {
        this.deleteStudentApps(checkIds)
      } else if (type === 'myApps') {
        this.deletePersonalApps(checkIds)
      } else if (type === 'myCollections') {
        this.deletePersonalCollections(checkIds)
      }
    } else {
      message.info('请选择要删除的应用')
    }
    // console.log(checkIds)
  }

  // 我的应用删除
  deletePersonalApps = (checkIds) => {
    personalAppsDelete({ sw_List: checkIds }, (res) => {
      console.log(res.data)
      if (res.data.result === 'success') {
        message.success('成功删除应用')
        this.getMyApps()// 刷新当前类应用列表
        this.setState({
          deleteActive: {
            ...this.state.deleteActive,
            myApps: false
          }
        })
      }
    })
  }

    // 我的收藏删除
    deletePersonalCollections = (checkIds) => {
      personalCollectionsDelete({ sw_List: checkIds }, (res) => {
        console.log(res.data)
        if (res.data.result === 'success') {
          message.success('成功删除应用')
          this.getMyCollections()// 刷新当前类应用列表
          this.setState({
            deleteActive: {
              ...this.state.deleteActive,
              myCollections: false
            }
          })
        }
      })
    }

    // 学生应用删除
    deleteStudentApps = (checkIds) => {
      studentAppsDelete({ sw_List: checkIds }, (res) => {
        console.log(res.data)
        if (res.data.result === 'success') {
          message.success('成功删除应用')
          this.getStudentApps()// 刷新当前类应用列表
          this.setState({
            deleteActive: {
              ...this.state.deleteActive,
              studentApps: false
            }
          })
        }
      })
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
    }, () => {
      console.log(this.state.deleteActive)
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
  createAppList = (appList, type) => {
    console.log('type', type)
    console.log('appList', appList)
    let list = []
    if (appList.length !== 0) {
      appList.forEach((item, index) => {
        let download = false
        let open = false
        let collection = false
        let setUp = false
        if (type === 'myApps') { // 配饰按钮显示
          if (item.isSelfSupport) {
            open = true
          }
        } else if (type === 'myCollections') {
          if (item.isSelfSupport) {
            setUp = true
          } else {
            download = true
          }
        } else if (type === 'studentApps') {
          if (item.isSelfSupport) {
            if (item.isOpen) {
              open = true
            } else {
              setUp = true
            }
          } else {
            download = true
          }
          collection = true
        }
        // download open collection setUp
        let app = (
          <Col span={6} key={index}>
            <ApplicationCard
              type={type}
              content={item}
              share={this.role === 'teacher'}
              deleteCheck={this.state.deleteActive[type]}
              download={download}
              open={open}
              collection={collection}
              setUp={setUp}
              refresh={this.getApps}
            />
          </Col>
        )
        list.push(app)
      })
    }
    return list
  }

  // 判断应用列表数量
  getAppList = (openStatus, appList, type) => {
    if (appList) {
      if (appList.length === 0) {
        return <Empty />
      }
      if (openStatus) { // 展开状态
        return this.createAppList(appList, type)
      } else { // 收起状态 应用列表大于十个
        return this.createAppList(_.take(appList, 12), type)
      }
    }
  }

  init = () => {
    this.getMyApps()
    this.getMyCollections()
    if (this.role === 'parents') {
      this.getStudentApps()
    }
  }

  componentDidMount () {
    this.init()
  }

  render () {
    return (
      <div className='personal-center center-view mtb20'>
        <Card
          title='我的应用'
          bordered={false}
          extra={this.getOpts('myApps')}
        >
          <Row gutter={16} >
            {
              this.getAppList(this.state.openStatus['myApps'], this.state.myApps, 'myApps')
            }
          </Row>
        </Card>
        {
          this.role === 'parents' && (
            <Card
              title='学生应用'
              bordered={false}
              extra={this.getOpts('studentApps')}
            >
              <Row gutter={16} >
                {
                  this.getAppList(this.state.openStatus['studentApps'], this.state.studentApps, 'studentApps')
                }
              </Row>
            </Card>
          )
        }
        <Card
          title='我的收藏'
          bordered={false}
          extra={this.getOpts('myCollections')}
        >
          <Row gutter={16} >
            {
              this.getAppList(this.state.openStatus['myCollections'], this.state.myCollections, 'myCollections')
            }
          </Row>
        </Card>
      </div>
    )
  }
}

export default PersonalCenter
