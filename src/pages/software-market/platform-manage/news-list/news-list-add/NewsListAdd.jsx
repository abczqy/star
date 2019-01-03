import React, { Component } from 'react'
import { Card, Icon, Button, Col, Row, Input, Upload, message } from 'antd'
import { Link } from 'react-router-dom'
import Editor from 'wangeditor'
import {
  insertV2NewsList
} from 'services/software-manage'
import { BlankBar } from 'components/software-market'
import _ from 'lodash'
import './NewsListAdd.scss'
import config from '../../../../../config/index'
const {API_BASE_URL_V2, SERVICE_PORTAL} = config

class NewsListAdd extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fileList: [],
      newsTitle: null
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
      newsTitle: e.target.value
    })
  }

  /**
   * 返回附件的参数
   * @returns {*}
   */
  getFormData () {
    const { newsTitle, picId } = this.state
    return {
      contentTitle: newsTitle,
      content: this.getRichText(),
      picId: picId
    }
  }

  /**
   * 添加
   */
  subMit = () => {
    const param = this.getFormData()
    insertV2NewsList(param, (res) => {
      if (res.data.code === 200) {
        this.props.history.push({
          pathname: '/software-market-home/platform-manage/news-list'
        })
      } else {
        message.warn(res.data.msg)
      }
    })
  }

  // 上传文件
  onUploadChange = (e) => {
    if (e.fileList[0].status === 'done') {
      if (e.fileList[0].response.code === 200) {
        this.setState({picId: e.fileList[0].response.data})
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
        if (_.indexOf(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp'], file.type) === -1) {
          message.warn('不支持该附件类型上传!')
        } else if (file.size > 10 * 1024 * 1024) {
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
        <Card title='编辑新闻' extra={<Link to='/software-market-home/platform-manage/news-list'><Icon type='double-left' />返回列表页</Link>}>
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
                <span className='edit-bar-left-label'>上传图片: </span>
                <Upload {...upLoadProps} className='edit-bar-right-Input' >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span={12} offset={12}>
                <span className='marks-font-type left-span'>支持扩展名: .jpg .png (100px * 180px)</span>
              </Col>
            </Row>
          </div>
          <BlankBar />
          <div className='rich-editor-wrap' >
            <div ref='mountedElem' />
          </div>
          <BlankBar />
        </Card>
        <div className='foot-bar'>
          <span>
            <Link to='/software-market-home/platform-manage/news-list'>
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

export default NewsListAdd
