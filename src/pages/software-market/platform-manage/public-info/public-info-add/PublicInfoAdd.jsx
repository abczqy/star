import React, { Component } from 'react'
import { Card, Icon, Button, Col, Row, Input, Upload, message } from 'antd'
import { Link } from 'react-router-dom'
import Editor from 'wangeditor'
import {
  insertV2PubInfoList
} from 'services/software-manage'
import { BlankBar } from 'components/software-market'
import './PublicInfoAdd.scss'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import config from '../../../../../config/index'
const {API_BASE_URL_V2, SERVICE_PORTAL} = config

class PublicInfoAdd extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fileList: [],
      infoTitle: null
    }
  }

  /**
   * 设置“富文本编辑器”中的内容 -- 作为回调的参数传给父组件使用
   */
  setRichText = (msg) => {
    // msg 要不要处理一下 正则什么的 加上<p>标签
    this.editor.txt.html(msg)
  }

  /**
   * 获取“富文本编辑器”输入的内容
   */
  getRichText = () => {
    return this.editor.txt.text()
  }

  /**
   * 获取标题的并写入state中
   */
  getTitle = (e) => {
    this.setState({
      infoTitle: e.target.value
    })
  }

  /**
   * 返回附件的参数
   * @returns {*}
   */
  getFormData () {
    const { infoTitle, fileId } = this.state
    return {
      contentTitle: infoTitle,
      content: this.getRichText(),
      fileId: fileId
    }
  }

  /**
   * 添加
   */
  subMit = () => {
    const param = this.getFormData()
    insertV2PubInfoList(param, (res) => {
      if (res.data.code === 200) {
        this.props.history.push({
          pathname: '/software-market-home/platform-manage/public-info'
        })
      } else {
        message.warn(res.data.msg)
      }
    })
  }

  componentDidMount () {
    // 创建富文本编辑器
    const mountedElem = this.refs.mountedElem
    this.editor = new Editor(mountedElem)
    this.editor.create()
  }

   // 上传文件
   onUploadChange = (e) => {
     if (e.fileList[0].status === 'done') {
       if (e.fileList[0].response.code === 200) {
         this.setState({fileId: e.fileList[0].response.data})
       } else {
         message.warn(e.fileList[0].response.msg)
       }
     }
   }
   render () {
     const { fileList } = this.state
     const uploadButton = (
       <Button className='upload-btn'><Icon type='upload' />上传文件</Button>
     )
     const upLoadProps = {
       action: `${API_BASE_URL_V2}${SERVICE_PORTAL}/file-upload`,
       data: {fileType: 'pic'},
       onChange: this.onUploadChange,
       onRemove: (file) => {
         this.setState(({ fileList }) => {
           const index = fileList.indexOf(file)
           const newFileList = fileList.slice()
           newFileList.splice(index, 1)
           return {
             fileList: newFileList
           }
         })
       },
       beforeUpload: (file) => {
         if (file.size > 10 * 1024 * 1024) {
           message.warn('文件大小不能超过10M')
         } else if (this.state.fileList.length >= 1) {
           message.warn('只能上传一个文件')
         } else {
           this.setState(({ fileList }) => ({
             fileList: [...fileList, file]
           }))
         }
       },
       fileList: this.state.fileList
     }
     return (
       <div className='news-list-wrap' >
         <Card title='新增通知' extra={<Link to='/software-market-home/platform-manage/public-info'><Icon type='double-left' />返回列表页</Link>}>
           <div className='edit-add-bar-wrap' >
             <Row gutter={16}>
               <Col span={12}>
                 <span className='edit-bar-left-label'>通知标题: </span>
                 <Input
                   className='edit-bar-right-Input'
                   placeholder='请输入通知标题'
                   onChange={this.getTitle}
                 />
               </Col>
               <Col span={12}>
                 <span className='edit-bar-left-label'>附件: </span>
                 <Upload {...upLoadProps} className='edit-bar-right-Input' >
                   {fileList.length >= 1 ? null : uploadButton}
                 </Upload>
               </Col>
             </Row>
             <Row>
               <Col span={12} offset={12}>
                 <span className='marks-font-type left-span'>支持扩展名：.rar .zip .doc .docx .pdf .jpg...</span>
               </Col>
             </Row>
           </div>
           <BlankBar />
           <div className='rich-editor-wrap' >
             <div ref='mountedElem' />
           </div>
         </Card>
         <div className='foot-bar'>
           <span>
             <Link to='/software-market-home/platform-manage/public-info'>
               <Button>取消</Button>
             </Link>
             <span className='blank-bar-ver' />
             <Button type='primary' onClick={this.subMit}>添加</Button>
           </span>
         </div>
       </div>
     )
   }
}

PublicInfoAdd.propTypes = {
  history: PropTypes.object
}

export default PublicInfoAdd
