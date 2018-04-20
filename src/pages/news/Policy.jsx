/**
 * 政策发布页面
 *
 */
import React from 'react'
import {Card, Input, Row, Col, Upload, Button, Icon, message, Modal} from 'antd'
import i from '../../assets/images/u11837.png'
import PropTypes from 'prop-types'

const { TextArea } = Input
class Policy extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: '',
      context: '',
      visible: false
    }
  }
  componentWillMount () {
    if (this.props.ctrl === 'edit') {
      this.setState({
        input: this.props.record.title,
        context: this.props.record.information
      })
    } else if (this.props.ctrl === 'add') {
      this.setState({
        input: '',
        context: ''
      })
    }
  }
  // 获取通知标题
  onChangeI=(e) => {
    let {value} = e.target
    console.log('input', value)
    this.setState({
      input: value
    })
  }
  // 通知内容改变
  onChangeF=(e) => {
    let {value} = e.target
    console.log('context', value)
    this.setState({
      context: value
    })
  }
  // 点击取消按钮
  cancel=() => {
    console.log('取消发送')
  }
  // 发送通知按钮
  open=() => {
    this.setState({
      visible: true
    })
  }
  // 发送通知方法
  sendF=() => {
    let value = {
      input: this.state.input,
      context: this.state.context
    }
    console.log('要发送的内容', value)
  }
  // 确认按钮
  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false
    }, () => {
      this.sendF()
    })
    console.log('确认发送')
  }
  // 取消按钮
  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false
    })
  }
  render () {
    const props = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text'
      },
      onChange (info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`)
        }
      }
    }
    return <div>
      <div style={{marginLeft: '15%', marginBottom: '20px'}}>
        <Card title='政策发布' bordered={false} style={{ width: 1100, height: 600 }}>
          <Row>
            <div style={{marginBottom: '15px', height: '45px', marginTop: '8px'}}>
              <Col span={2}><span style={{color: 'red'}}>*</span>通知标题 : </Col>
              <Col span={8}><Input placeholder='请输入关键字' value={this.state.input} onChange={this.onChangeI} /></Col>
            </div>
          </Row>
          <Row>
            <div style={{marginBottom: '15px', height: '108px'}}>
              <Col span={2}><span style={{color: 'red'}}>*</span>通知内容 : </Col>
              <Col span={20}><TextArea rows={4} placeholder='请输入内容' value={this.state.context} onChange={this.onChangeF} /></Col>
            </div>
          </Row>
          <Row>
            <Col span={2}><span style={{visibility: 'hidden'}}>*</span>文件上传 : </Col>
            <Col span={5}>
              <Upload {...props}>
                <Button>
                  <Icon type='upload' /> 上传文件
                </Button>
              </Upload>
            </Col>
            <div style={{position: 'absolute', right: '10%', bottom: '-220px', width: '600px'}} >
              <Col span={16} />
              <Col span={4}>
                <Button onClick={this.cancel}>取消</Button>
              </Col>
              <Col span={4}>
                <Button type='primary' onClick={this.open}>发送</Button>
              </Col>
            </div>
          </Row>
        </Card>
      </div>
      <Modal
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        bodyStyle={{height: '220px'}}
        maskClosable={false}
      >
        <p style={{marginTop: '85px', marginLeft: '120px'}}><img src={i} style={{width: '30px'}} /> <span style={{fontSize: '15px'}}>是否确认要发布嘛？</span></p>
      </Modal>
    </div>
  }
}
Policy.propTypes = {
  ctrl: PropTypes.string,
  record: PropTypes.func
}

export default Policy
