/**
 * 应用卡片
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import { Badge, Icon, Dropdown, Modal, Menu, message } from 'antd'
import ajaxUrl from 'config'
import './ApplicationCard.scss'
import warnPng from '../../../assets/images/personal/warn.png'
import { teacShare, appCollect } from 'services/software-market'

class ApplicationCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shareConfirmVisible: false // 分享确认弹窗
    }
    this.shareMenu = (
      <Menu className='share-list' onClick={this.share}>
        <Menu.Item key='all'>全部</Menu.Item>
        <Menu.Item key='maf'>仅家长</Menu.Item>
        <Menu.Item key='stu'>仅学生</Menu.Item>
      </Menu>
    )
    this.shareObject = ''
  }

  // 选择分享对象
  share = (type) => {
    console.log('share', type.key)
    this.shareObject = type.key
    this.setShareConfirmVisible(true)
  }

  // 确定分享
  shareEnsure = () => {
    // console.log('确定分享')
    teacShare({
      sw_id: this.props.content.SW_ID,
      type: this.shareObject
    }, (res) => {
      const data = res.data
      message.success(data.info)
    })
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
    appCollect({
      SW_ID: id,
      type
    }, (res) => {
      if (res.data.result === 'success') {
        // 收藏成功后刷新数据
        this.props.refresh('myCollections')
        this.props.refresh('studentApps')
      }
    })
  }

  render () {
    // console.log('这是什么？', this.props.content.ISSELFSUPPORT)
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
              <input type='checkbox' name={`${this.props.type}DeleteIds`} value={this.props.content.SW_ID} />
            </span>
          )
        }
        {/* 应用图标 */}
        {this.props.type === 'myApps'
          ? <Link to={this.props.content.ISSELFSUPPORT && this.props.content.ISSELFSUPPORT === 'true' ? { pathname: '/operate-manage-home/all-app-detail', search: this.props.content.SW_ID } : { pathname: '/operate-manage-home/all-app-detail-third', search: this.props.content.SW_ID }} >
            <Badge dot={this.props.update} >
              <span className='appLogo'>
                <img src={ajaxUrl.IMG_BASE_URL + this.props.content.SW_ICON} alt='' />
              </span>
            </Badge>
            {/* 应用文字介绍 */}
            <div className='info'>
              <div className='name ellipsis' title={this.props.content.SW_NAME} >{this.props.content.SW_NAME}</div>
              <div className='description ellipsis'>{this.props.content.SW_DESC}</div>
            </div>
          </Link> : <div><Badge dot={this.props.update} >
            <span className='appLogo'>
              <img src={ajaxUrl.IMG_BASE_URL + this.props.content.SW_ICON} alt='' />
            </span>
          </Badge>{/* 应用文字介绍 */}<div className='info'>
            <div className='name ellipsis' title={this.props.content.SW_NAME} >{this.props.content.SW_NAME}</div>
            <div className='description ellipsis'>{this.props.content.SW_DESC}</div>
          </div></div>}
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
                  this.props.content.isCollected
                    ? <span className='collection plr6' onClick={() => { this.collectOption(this.props.content.SW_ID, 'cancel') }}>
                      <Icon type='star' />
                    </span>
                    : <span className='collection  plr6' onClick={() => { this.collectOption(this.props.content.SW_ID, 'collect') }}>
                      <Icon type='star-o' />
                    </span>
                )
              }
              {this.props.content.ISSELFSUPPORT
                ? <Link to={{ pathname: '/operate-manage-home/all-app-detail-third', search: this.props.content.SW_ID }} >
                  <Icon type='download' className='plr6' />
                  <span className='plr6'>下载</span>
                </Link> : <Link to={{ pathname: '/operate-manage-home/all-app-detail', search: this.props.content.SW_ID }} >
                  <Icon type='download' className='plr6' />
                  <span className='plr6'>下载</span>
                </Link>}
            </div>
          )
        }
        {/* 打开 */}
        {
          this.props.open && (
            <div className='open opt-box'>
              {
                this.props.collection && (
                  this.props.content.isCollected
                    ? <span className='collection plr6' onClick={() => { this.collectOption(this.props.content.SW_ID, 'cancel') }}>
                      <Icon type='star' />
                    </span>
                    : <span className='collection plr6' onClick={() => { this.collectOption(this.props.content.SW_ID, 'collect') }}>
                      <Icon type='star-o' />
                    </span>
                )
              }
              <a href={this.props.content.swUrl}> <span className='plr6'>打开</span></a>
            </div>
          )
        }
        {/* 开通 */}
        {
          this.props.setUp && (
            <div className='set-up opt-box'>
              {
                this.props.collection && (
                  this.props.content.isCollected
                    ? <span className='collection plr6' onClick={() => { this.collectOption(this.props.content.SW_ID, 'cancel') }}>
                      <Icon type='star' />
                    </span>
                    : <span className='collection plr6' onClick={() => { this.collectOption(this.props.content.SW_ID, 'collect') }}>
                      <Icon type='star-o' />
                    </span>
                )
              }
              {this.props.content.ISSELFSUPPORT
                ? <Link to={{ pathname: '/operate-manage-home/all-app-detail', search: this.props.content.SW_ID }} >
                  <span className='plr6'>开通</span>
                </Link> : <Link to={{ pathname: '/operate-manage-home/all-app-detail-third', search: this.props.content.SW_ID }} >
                  <span className='plr6'>开通</span>
                </Link>}

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
              this.shareObject === 'maf'
                ? '确认将此软件分享给所有家长？'
                : this.shareObject === 'stu'
                  ? '确认将此软件分享给所有学生？'
                  : '确认将此软件分享给所有学生和家长？'
            }
          </div>
        </Modal>
      </div>
    )
  }
}

// ApplicationCard.propTypes = {
//   content: {
//     'SW_ID': 'k!b',
//     'SW_NAME': '第五人格',
//     'sw_type': '娱乐',
//     'sw_icon': 'static/images/appLogo.png',
//     'sw_desc': '就是第五人格',
//     'isCollected': true
//   }, // 应用信息
//   share: false, // 是否显示分享按钮
//   update: false, // 是否显示更新提示
//   download: false, // 是否显示下载按钮
//   open: false, // 是否显示打开按钮
//   collection: false, // 是否显示收藏按钮
//   deleteCheck: false, // 是否显示多选框 用于选中删除
//   type: PropTypes.string, // 卡片类型 是我的应用还是···
//   refresh: PropTypes.func, // 刷新我的收藏和学生应用的数据
//   setUp: false// 是否显示开通按钮
// }

ApplicationCard.propTypes = {
  content: PropTypes.object, // 应用信息
  share: PropTypes.bool, // 是否显示分享按钮
  update: PropTypes.bool, // 是否显示更新提示
  download: PropTypes.bool, // 是否显示下载按钮
  open: PropTypes.bool, // 是否显示打开按钮
  collection: PropTypes.bool, // 是否显示收藏按钮
  deleteCheck: PropTypes.bool, // 是否显示多选框 用于选中删除
  type: PropTypes.string, // 卡片类型 是我的应用还是···
  refresh: PropTypes.func, // 刷新我的收藏和学生应用的数据
  setUp: PropTypes.bool// 是否显示开通按钮
}

export default ApplicationCard
