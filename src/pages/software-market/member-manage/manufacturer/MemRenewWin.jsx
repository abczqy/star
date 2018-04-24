/**
 * 会员管理-厂商-续签
 */
import React from 'react'
import { Modal, Button, Row, Col, Radio, Upload, Icon, DatePicker, Select } from 'antd'
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
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange ({ file, fileList }) {
        if (file.status !== 'uploading') {
          console.log(file, fileList)
        }
      },
      defaultFileList: [{
        uid: 1,
        name: 'xxx.png',
        status: 'done',
        reponse: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png'
      }, {
        uid: 2,
        name: 'yyy.png',
        status: 'done',
        url: 'http://www.baidu.com/yyy.png'
      }, {
        uid: 3,
        name: 'zzz.png',
        status: 'error',
        reponse: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/zzz.png'
      }]
    }
    return (
      <Modal
        title='续签'
        width='700px'
        visible={this.props.visible}
        onCancel={this.props.handleClose}
        footer={[
          <Button key='yes' type='primary' onClick={() => { this.save() }}>确定</Button>,
          <Button key='no' type='primary' onClick={() => { this.cancle() }}>取消</Button>
        ]}
      >
        <div className='busi-renew-container'>
          <Row>
            <Col span={24} className='soft-name' >
              厂商名称：VVVV
            </Col>
          </Row>
          <Row gutter={22}>
            <Col span={12}>
              <span className='contract-title'>合同起止日期:<span className='contract-value'>2017年4月10日 - 2018年4月10日</span></span>
            </Col>
            <Col span={12}>
              <span className='contract-title'>合同状态:<span className='contract-value' style={{color: '#FF6600'}}>余30天</span></span>
            </Col>
          </Row>
          <Row className='contract-status'>
            <Col span={12}>
              <Radio.Group onChange={this.onChange} value={this.state.value}>
                <Radio style={radioStyle} value={1}>临时开通：
                  <DatePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'
                    placeholder='选择日期'
                  /><span style={{margin: '15px'}}>-</span>
                  <DatePicker
                    showTime
                    format='YYYY-MM-DD HH:mm:ss'
                    placeholder='选择日期'
                  /></Radio>
                <Radio style={radioStyle} value={2}>续费：
                  <Select defaultValue='lucy' style={{ width: 120, marginLeft: '28px' }}>
                    <Select.Option value='jack'>Jack</Select.Option>
                    <Select.Option value='lucy'>Lucy</Select.Option>
                  </Select>
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row className='finance-voucher'>
            <span>
              <a href='javascript:void(0)' style={{color: 'red'}}>*</a>
              <span className='title'>财务审核凭证:</span>
              <Upload {...props}>
                <Button>
                  <Icon type='upload' /> 上传文件
                </Button>
                <span className='extend'>支持扩展名：.png .jpg ...</span>
              </Upload>
            </span>
          </Row>
        </div>
      </Modal>
    )
  }
}
