/**
 * 会员管理-厂商-续签
 */
import React from 'react'
import { Modal, Button, Row, Col, Radio, Upload, message, Icon } from 'antd'
import PropTypes from 'prop-types'

export default class MemRenewWin extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    handleClose: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  save () {
    this.props.handleClose()
  }

  cancle () {
    this.props.handleClose()
  }

  render () {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    }
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
          message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`)
        }
      }
    }
    return (
      <Modal
        title='续签'
        visible={this.props.visible}
        onCancel={this.props.handleClose}
        footer={[
          <Button key='yes' type='primary' onClick={() => { this.save() }}>确定</Button>,
          <Button key='no' type='primary' onClick={() => { this.cancle() }}>取消</Button>
        ]}
      >
        <Row>
          <Col span={24}>
            <span>软件名称：VVVV</span>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <span>合同起止日期:VVVV</span>
          </Col>
          <Col span={12}>
            <span>合同状态:VVVV</span>
          </Col>
        </Row>
        <Row>
          <Radio.Group onChange={this.onChange} value={this.state.value}>
            <Radio style={radioStyle} value={1}>临时开通：</Radio>
            <Radio style={radioStyle} value={2}>续费：</Radio>
          </Radio.Group>
        </Row>
        <Row>
          <span><a href='javascript:void(0)' style={{color: 'red'}}>*</a>财务审核凭证:
            <Upload {...props}>
              <Button>
                <Icon type='upload' /> 上传文件
              </Button>
            </Upload>
          </span>
          <span>支持扩展名：.png .jpg ...</span>
        </Row>
      </Modal>
    )
  }
}
