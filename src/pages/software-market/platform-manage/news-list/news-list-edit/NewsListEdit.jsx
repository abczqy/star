import React, { Component } from 'react'
import { Card, Icon, Button, Col, Row, Input, Upload } from 'antd'
import { Link } from 'react-router-dom'
import PropsTypes from 'prop-types'
import Editor from 'wangeditor'
import {
  getNewsListForEdit
} from 'services/software-manage'
import { BlankBar } from 'components/software-market'
import './NewsListEdit.scss'

class NewsListEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {}
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

  componentDidMount () {
    // 创建富文本编辑器
    const mountedElem = this.refs.mountedElem
    this.editor = new Editor(mountedElem)
    this.editor.create()
    // 获取原有的要编辑的数据
    const searchId = this.props.location.search.replace('?', '')
    getNewsListForEdit({news_id: searchId}, (res) => {
      const data = res.data
      this.setState({
        data: data
      }, () => {
        console.log(`data: ${data.news_desc}`)
        // 设置富文本编辑器中的初始内容
        this.setRichText(data.news_desc)
      })
    })
  }

  render () {
    const { data } = this.state
    return (
      <div className='news-list-wrap' >
        <Card title='编辑新闻' extra={<Link to='/software-market-home/platform-manage/news-list'><Icon type='double-left' />返回列表页</Link>}>
          <div className='edit-head-wrap'>
            <div className='edit-bar-wrap' >
              <Row gutter={16}>
                <Col span={12}>
                  <span className='edit-bar-left-label'>通知标题: </span>
                  <Input className='edit-bar-right-Input' placeholder={'' + data.news_title} />
                </Col>
                <Col span={6}>
                  <span className='pic-card-label'>上传图片: </span>
                  <Upload listType='picture-card' {...this.uploadParams} className='pic-card' >
                    <Icon type='upload' />
                  </Upload>
                </Col>
                <Col span={6}>
                  <Upload {...this.uploadParams} >
                    <Button className='upload-btn'><Icon type='upload' />上传文件</Button>
                  </Upload>
                  <span className='marks-font-type'>支持扩展名: .jpg .png (100px * 180px)</span>
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
            <Link to='/software-market-home/platform-manage/news-list'>
              <Button type='primary'>添加</Button>
            </Link>
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
