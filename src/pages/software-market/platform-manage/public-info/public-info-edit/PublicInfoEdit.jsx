import React, { Component } from 'react'
import { Card, Icon, Button, Col, Row, Input, Upload, message } from 'antd'
import { Link } from 'react-router-dom'
import PropsTypes from 'prop-types'
import Editor from 'wangeditor'
import {
  getV2PubInfoForEdit,
  updateV2PubInfoList
} from 'services/software-manage'
import { BlankBar } from 'components/software-market'
import './PublicInfoEdit.scss'
// import _ from 'lodash'
import config from '../../../../../config/index'
const {API_BASE_URL_V2, SERVICE_PORTAL} = config

class PublicInfoEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
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
   * 修改
   */
  subMit = () => {
    const content = this.getRichText()
    const contentTitle = this.state.infoTitle
    this.setState({
      data: {
        ...this.state.data,
        content: content,
        contentTitle: contentTitle,
        fileId: this.state.fileId
      }
    }, () => {
      updateV2PubInfoList(this.state.data, (res) => {
        if (res.data.code === 200) {
          this.props.history.push({
            pathname: '/software-market-home/platform-manage/public-info'
          })
        } else {
          message.warn(res.data.msg)
        }
      })
    })
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

   componentDidMount () {
     // 创建富文本编辑器
     const mountedElem = this.refs.mountedElem
     this.editor = new Editor(mountedElem)
     this.editor.create()
     // 获取原有的要编辑的数据
     const searchId = this.props.location.search.replace('?', '')
     getV2PubInfoForEdit(searchId, (res) => {
       const data = res.data
       if (data.code === 200) {
         this.setState({
           data: data.data,
           infoTitle: data.data.contentTitle
         }, () => {
           this.setRichText(data.data.content)
         })
       }
     })
   }

   render () {
     const { fileList } = this.state
     const uploadButton = (
       <div>
         <Button className='upload-btn'><Icon type='upload' />上传文件</Button>
       </div>
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
         //    if (_.indexOf(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp'], file.type) === -1) {
         //      message.warn('不支持该附件类型上传!')
         //    } else if (file.size > 10 * 1024 * 1024) {
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
         <Card title='编辑通知' extra={<Link to='/software-market-home/platform-manage/public-info'><Icon type='double-left' />返回列表页</Link>}>
           <div className='edit-add-bar-wrap' >
             <Row gutter={16}>
               <Col span={12}>
                 <span className='edit-bar-left-label'>通知标题: </span>
                 <Input
                   className='edit-bar-right-Input'
                   value={this.state.infoTitle}
                   onChange={this.getTitle}
                 />
               </Col>
               <Col span={12}>
                 <span className='edit-bar-left-label'>附件: </span>
                 <Upload className='edit-bar-right-Input' {...upLoadProps}>
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
             <Button type='primary' onClick={this.subMit}>修改</Button>
           </span>
         </div>
       </div>
     )
   }
}

PublicInfoEdit.propTypes = {
  location: PropsTypes.object
}

export default PublicInfoEdit
