import React, { Component } from 'react'
import { Card, Icon, Button, Col, Row, Input, Upload } from 'antd'
import { Link } from 'react-router-dom'
import PropsTypes from 'prop-types'
import Editor from 'wangeditor'
import {
  getV2News,
  updateV2NewsList
} from 'services/software-manage'
import { BlankBar } from 'components/software-market'
import './NewsListEdit.scss'

class NewsListEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
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
   * 修改
   */
  subMit = () => {
    const content = this.getRichText()
    const contentTitle = this.state.newsTitle
    this.setState({
      data: {
        ...this.state.data,
        content: content,
        contentTitle: contentTitle
      }
    }, () => {
      updateV2NewsList(this.state.data, (res) => {
        if (res.data.code === 200) {
          this.props.history.push({
            pathname: '/software-market-home/platform-manage/news-list'
          })
        }
      })
    })
  }

  componentDidMount () {
    // 创建富文本编辑器
    const mountedElem = this.refs.mountedElem
    this.editor = new Editor(mountedElem)
    this.editor.create()
    // 获取原有的要编辑的数据
    const searchId = this.props.location.search.replace('?', '')
    getV2News(searchId, (res) => {
      const data = res.data
      if (data.code === 200) {
        this.setState({
          data: data.data,
          newsTitle: data.data.contentTitle
        }, () => {
          this.setRichText(data.data.content)
        })
      }
    })
  }

  render () {
    const { fileList } = this.state
    const uploadButton = (
      <Button className='upload-btn'><Icon type='upload' />上传文件</Button>
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
        <Card title='编辑新闻' extra={<Link to='/software-market-home/platform-manage/news-list'><Icon type='double-left' />返回列表页</Link>}>
          <div className='edit-head-wrap'>
            <div className='edit-bar-wrap' >
              <Row gutter={16}>
                <Col span={12}>
                  <span className='edit-bar-left-label'>通知标题: </span>
                  <Input
                    className='edit-bar-right-Input'
                    value={this.state.newsTitle}
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
            </div>
          </div>
          <BlankBar />
          <div className='rich-editor-wrap' >
            <div ref='mountedElem' />
          </div>
        </Card>
        <div className='foot-bar'>
          <span>
            <Link to='/software-market-home/platform-manage/news-list'>
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

NewsListEdit.propTypes = {
  location: PropsTypes.object
}

export default NewsListEdit
