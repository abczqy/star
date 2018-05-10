import React, { Component } from 'react'
import { Card, Icon, Button, Col, Row, Input, Upload, message } from 'antd'
import { Link } from 'react-router-dom'
import PropsTypes from 'prop-types'
import Editor from 'wangeditor'
import ajaxUrl from 'config'
import {
  getPubInfoForEdit,
  updatePubInfoList
} from 'services/software-manage'
import { BlankBar } from 'components/software-market'
import './PublicInfoEdit.scss'

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
    console.log(`e.target.value: ${e.target.value}`)
    this.setState({
      infoTitle: e.target.value
    })
  }

  /**
   * 返回附件的参数
   * @returns {*}
   */
  getFormData () {
    const { fileList, data, infoTitle } = this.state
    console.log(`postParam.infoTitle: ${infoTitle}`)
    const title = encodeURI(infoTitle)
    const desc = encodeURI(this.getRichText())
    const formData = new FormData()
    formData.append('info_id', data.info_id)
    formData.append('info_title', title)
    formData.append('info_desc', desc)
    fileList.forEach((file) => {
      formData.append('info_attach', file)
    })
    return formData
  }

  /**
   * 添加
   */
  subMit = () => {
    const param = this.getFormData()
    updatePubInfoList(param, (res) => {
      message.success(`${res.data.info}`)
    })
  }

  componentDidMount () {
    // 创建富文本编辑器
    const mountedElem = this.refs.mountedElem
    this.editor = new Editor(mountedElem)
    this.editor.create()
    // 获取原有的要编辑的数据
    const searchId = this.props.location.search.replace('?', '')
    getPubInfoForEdit({info_id: searchId}, (res) => {
      const data = res.data
      this.setState({
        data: data,
        infoTitle: data.info_title,
        fileList: [{
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: ajaxUrl.IMG_BASE_URL + '/' + data.info_attach
        }]
      }, () => {
        console.log(`data: ${data.info_desc}`)
        // 设置富文本编辑器中的初始内容
        this.setRichText(data.info_desc)
      })
    })
  }

  render () {
    const { data, fileList } = this.state
    const uploadButton = (
      <div>
        <Button className='upload-btn'><Icon type='upload' />上传文件</Button>
      </div>
    )
    const upLoadProps = {
      onRemove: (file) => {
        console.log('移除附件')
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
        console.log('上传之前')
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file]
        }))
        return false
      },
      fileList: fileList
    }
    return (
      <div className='news-list-wrap' >
        <Card title='编辑新闻' extra={<Link to='/software-market-home/platform-manage/public-info'><Icon type='double-left' />返回列表页</Link>}>
          <div className='edit-add-bar-wrap' >
            <Row gutter={16}>
              <Col span={12}>
                <span className='edit-bar-left-label'>通知标题: </span>
                <Input
                  className='edit-bar-right-Input'
                  placeholder={data.info_title}
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
            <Link to='/software-market-home/platform-manage/public-info'>
              <Button type='primary' onClick={this.subMit}>添加</Button>
            </Link>
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
