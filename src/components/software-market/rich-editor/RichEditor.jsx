/**
 * 富文本编辑器
 * 封装自 wangeditor
 * 在wangeditor的编辑区域 实际上就是一个html+内容的区域
 * 所有的内容都是html标签包裹起来的
 * 例如
 * 文本就是<p>文本内容</p>
 * 图片就是<img src='' style='' />
 */
import React, { Component } from 'react'
import Editor from 'wangeditor'

/**
 * wangeditor的默认静态配置
 */
// const editorConfig = {
//   uploadImgShowBase64: true
// }

class RichEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contentText: ''
    }
    this.editor = {}
  }

  /**
   * 设置文本框中的内容 -- 作为回调的参数传给父组件使用
   */
  setText = (msg) => {
    // msg 要不要处理一下 正则什么的 加上<p>标签
    this.setState({
      contentText: msg
    })
    this.editor.text.html(this.state.contentText)
  }

  /**
   * 获取输入的内容(将值传给父组件 -- 父组件通过表单提交)
   * 返回值是当前state.contantText
   * 不过 这里用state存起来貌似没什么用
   */
  getText = () => {
    // console.log(`rich-editor中的文本：${this.editor.txt.text()}`)
    // console.log(`rich-editor中的html：${this.editor.txt.html()}`)
    const contentText = this.editor.txt.text()
    this.setState({
      contentText: contentText
    })
    return this.state.contentText
  }

  componentDidMount () {
    const mountedElem = this.refs.mountedElem
    this.editor = new Editor(mountedElem)
    this.editor.create()
    // 添加编辑器的静态设置
    // this.editor.customConfig = editorConfig
  }

  render () {
    return (
      <div className='rich-editor-wrap' >
        <div ref='mountedElem' />
      </div>
    )
  }
}

export default RichEditor
