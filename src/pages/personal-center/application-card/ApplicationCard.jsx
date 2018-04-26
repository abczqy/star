/**
 * 应用卡片
 */

import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import { Badge, Icon, Dropdown, Modal, Menu } from 'antd'
import axios from 'axios'
import ajaxUrl from 'config'
import './ApplicationCard.scss'
import warnPng from '../../../assets/images/personal/warn.png'

class ApplicationCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shareConfirmVisible: false // 分享确认弹窗
    }
    this.shareMenu = (
      <Menu className='share-list' onClick={this.share}>
        <Menu.Item key='all'>全部</Menu.Item>
        <Menu.Item key='parent'>仅家长</Menu.Item>
        <Menu.Item key='student'>仅学生</Menu.Item>
      </Menu>
    )
    this.shareObject = ''
  }

  // 选择分享对象
  share = (type) => {
    // console.log('share', type)
    this.shareObject = type
    this.setShareConfirmVisible(true)
  }

  // 确定分享
  shareEnsure = () => {
    // console.log('确定分享')
  }

  // 取消分享
  shareCancel = () => {
    // console.log('取消分享')
    this.setShareConfirmVisible(false)
  }

  // 控制分享确认弹窗的状态
  setShareConfirmVisible = (bool) => {
    this.setState({
      shareConfirmVisible: bool
    })
  }

  // 收藏/取消收藏 操作
  collectOption = (id, type) => {
    axios.post(ajaxUrl.studentAppsCollect, {
      sw_id: id,
      type
    }).then(res => {
      if (res.data.result === 'success') {
        // 收藏成功后刷新数据
        this.props.refresh(ajaxUrl.personalCollections, 'myCollections')
        this.props.refresh(ajaxUrl.studentApps, 'studentApps')
      }
    }).catch(e => { console.log(e) })
  }

  render () {
    // console.log(this.props.deleteCheck)
    return (
      <div className='application-card'>
        {/* 分享 */}
        {
          (this.props.share && !this.props.deleteCheck) && (
            <Dropdown
              placement='bottomLeft'
              overlay={this.shareMenu}
              trigger={['click']}
            >
              <span className='share'>
                <Icon type='export' />
              </span>
            </Dropdown>
          )
        }
        {/* 删除check */}
        {
          (this.props.deleteCheck) && (
            <span className='delete'>
              <input type='checkbox' name={`${this.props.type}DeleteIds`} value={this.props.content.sw_id} />
            </span>
          )
        }
        {/* 应用图标 */}
        <Badge dot={this.props.update} >
          <span className='appLogo'>
            <img src={this.props.content.sw_icon} alt='' />
          </span>
        </Badge>
        {/* 应用文字介绍 */}
        <div className='info'>
          <div className='name'>{this.props.content.sw_name}</div>
          <div className='description ellipsis'>{this.props.content.sw_desc}</div>
        </div>
        {/* 更新 */}
        {
          this.props.update && (
            <div className='update'>
              <button>更新</button>
            </div>
          )
        }
        {/* 下载 */}
        {
          this.props.download && (
            <div className='download opt-box'>
              {
                this.props.collection && (
                  this.props.content.collectionStatus
                    ? <span className='collection plr6' onClick={() => { this.collectOption(this.props.content.sw_id, 'cancel') }}>
                      <Icon type='star' />
                    </span>
                    : <span className='collection  plr6' onClick={() => { this.collectOption(this.props.content.sw_id, 'collect') }}>
                      <Icon type='star-o' />
                    </span>
                )
              }
              <Link to={{pathname: '/operate-manage-home/all-app-detail', search: this.props.content.sw_id}} >
                <Icon type='download' className='plr6' />
                <span className='plr6'>下载</span>
              </Link>
            </div>
          )
        }
        {/* 打开 */}
        {
          this.props.open && (
            <div className='open opt-box'>
              {
                this.props.collection && (
                  <span className='collection plr6'>
                    <Icon type='star-o' />
                  </span>
                )
              }
              <span className='plr6' >
                打开
              </span>
            </div>
          )
        }
        {/* 确认分享弹窗 */}
        <Modal
          className='share-confirm-modal'
          title='确认分享'
          visible={this.state.shareConfirmVisible}
          onOk={this.shareEnsure}
          onCancel={this.shareCancel}
        >
          <img className='warn-img' src={warnPng} />
          <div className='confirm-info'>
            {
              this.shareObject === 'parent'
                ? '确认将此软件分享给所有家长？'
                : this.shareObject === 'student'
                  ? '确认将此软件分享给所有学生？'
                  : '确认将此软件分享给所有学生和家长？'
            }
          </div>
        </Modal>
      </div>
    )
  }
}

ApplicationCard.propTypes = {
  content: PropTypes.object,
  share: PropTypes.bool,
  update: PropTypes.bool,
  download: PropTypes.bool,
  open: PropTypes.bool,
  collection: PropTypes.bool,
  deleteCheck: PropTypes.bool,
  type: PropTypes.string,
  refresh: PropTypes.func
}

export default ApplicationCard
