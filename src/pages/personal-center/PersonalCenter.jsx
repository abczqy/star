/**
 * 个人中心
 */

import React, { Component } from 'react'
import { Card, Row, Col, Divider, message } from 'antd'
import axios from 'axios'
import ajaxUrl from 'config'
import _ from 'lodash'
import ApplicationCard from './application-card/ApplicationCard'
import Empty from '../../components/common/Empty'
import webStorage from 'webStorage'
import './PersonalCenter.scss'
import { studentAppsDelete } from 'services/software-market'

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

  // 获取应用数据
  getApps = (url, state) => {
    axios.post(url, {
      num: 0
    }).then(res => {
      // console.log(url, res.data.data)
      let list = res.data
      if (state === 'studentApps') {
        list = res.data.list
      }
      this.setState({
        [state]: list
      })
    }).catch(e => { console.log(e) })
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
      let deleteUrl = ''
      let getDataUrl = ''
      switch (type) { // 根据类型区分删除URL和刷新的URL
        case 'myApps':
          deleteUrl = ajaxUrl.personalAppsDelete
          getDataUrl = ajaxUrl.personalApps
          break
        case 'myCollections':
          deleteUrl = ajaxUrl.personalCollectionsDelete
          getDataUrl = ajaxUrl.personalCollections
          break
        case 'studentApps':
          deleteUrl = ajaxUrl.studentAppsDelete
          getDataUrl = ajaxUrl.studentApps
          break
        default:
          break
      }
      if (type === 'studentApps') {
        studentAppsDelete({sw_List: checkIds}, (res) => {
          console.log(res.data)
          if (res.data.result === 'success') {
            message.success('成功删除应用')
            this.getApps(getDataUrl, type)// 刷新当前类应用列表
            this.setState({
              deleteActive: {
                ...this.state.deleteActive,
                [type]: false
              }
            })
          }
        })
      } else {
        axios.post(deleteUrl, {// 发送删除请求
          sw_List: checkIds
        }).then(res => {
          console.log(res.data)
          if (res.data.result === 'success') {
            message.success('成功删除应用')
            this.getApps(getDataUrl, type)// 刷新当前类应用列表
            this.setState({
              deleteActive: {
                ...this.state.deleteActive,
                [type]: false
              }
            })
          }
        }).catch(e => { console.log(e) })
      }
    } else {
      message.info('请选择要删除的应用')
    }
    // console.log(checkIds)
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
  createAppList=(appList, type) => {
    console.log(type)
    let list = []
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
    this.getApps(ajaxUrl.personalApps, 'myApps')
    this.getApps(ajaxUrl.personalCollections, 'myCollections')
    if (this.role === 'parents') {
      this.getApps(ajaxUrl.studentApps, 'studentApps')
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
