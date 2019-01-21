/**
 * 设计：
 * 1- 文件上传--优先图片上传和回显
 * 2- 分为'上传'和'回显'两个组件
 * 3- 上传组件 - 有hook函数 在其中可以获得base64的值 通过回调函数可以传出去
 * 4- 回显组件 - 用于展示base64的图片 样式以本次业务的样式为默认样式
 * 4- 利用overflow:hidden会过滤掉脱离文档流的元素 -- 去掉原有的input-file的样式
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './UploadFile.scss'

class UploadFile extends Component {
  getImgUrl = (e) => {
    // console.log('this.refs', e.target.files[0])
    let fileAvatar = e.target.files[0]
    // let fileAvatar = this.refs.avatar1.files[0]
    const reader = new FileReader()
    if (this.props.callbackAvatar) {
      reader.addEventListener('load', () => this.props.callbackAvatar(reader.result))
      reader.readAsDataURL(fileAvatar)
    }

    // console.log('reader.result', reader.result)
  }
  render () {
    return (
      <div className='upload-wrap'>
        <input type='file' onChange={(e) => this.getImgUrl(e)} />
        { this.props.label || <span>上传</span> }
      </div>
    )
  }
}

UploadFile.propTypes = {
  label: PropTypes.any, // 上传按钮所显示的文字/图标或者其他组件
  callbackAvatar: PropTypes.func
}

export default UploadFile
