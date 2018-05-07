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
import PropsTypes from 'prop-types'
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
    this.editor = {}
  }

  /**
   * 设置文本框中的内容 -- 作为回调的参数传给父组件使用
   */
  setText = (msg) => {
    // msg 要不要处理一下 正则什么的 加上<p>标签
    this.editor.txt.html(msg)
  }

  /**
   * 获取输入的内容
   */
  getText = () => {
    return this.editor.txt.text()
  }

  componentDidMount () {
    const mountedElem = this.refs.mountedElem
    this.editor = new Editor(mountedElem)
    this.editor.create()
    // 添加编辑器的静态设置
    // this.editor.customConfig = editorConfig
  }

  componentWillReceiveProps (nextProps) {
    const { content } = nextProps
    content && this.setText(content)
    if (nextProps.test) {
      this.props.func(this.editor.txt.text())
    }
  }

  componentWillUnmount () {
    // 这里我们对父组件传回来的操作量operType进行判断
    // const { operFunc, operType } = this.props
    // 当oper为true的时候 提交数据 操作函数也由父组件传进来
    // 当oper为false的时候 不操作
    console.log(`我已被更新1:富文本编辑器的内容是：\n${this.getText()}`)
  }

  render () {
    return (
      <div className='rich-editor-wrap' >
        <div ref='mountedElem' />
      </div>
    )
  }
}

RichEditor.propTypes = {
  content: PropsTypes.string,
  func: PropsTypes.func,
  test: PropsTypes.bool
  // operType: PropsTypes.bool,
  // operFunc: PropsTypes.func
}

export default RichEditor
