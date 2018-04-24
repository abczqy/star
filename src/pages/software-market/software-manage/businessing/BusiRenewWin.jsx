/* eslint-disable react/jsx-no-bind */
/**
 * 软件管理-运营中-续费
 */
import React from 'react'
import { Modal, Button, Row, Col, Radio, Upload, Icon, DatePicker, Select } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import {appRenew} from 'services/software-manage'

export default class BusiRenewWin extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    handleClose: PropTypes.func,
    record: PropTypes.object
  }
  constructor (props) {
    super(props)
    let yearsOption = this.getDefaultYears()
    this.state = {
      yearsOption,
      renewType: 'renew',
      renewValue: yearsOption.defaultYear,
      fileLoading: false,
      fileList: [] // 附件
    }
  }

  getDefaultYears () {
    let arr = []
    let defaultYear
    for (let i = 1; i < 6; i++) {
      let temYear = moment().add(i, 'years')
      let temValue = temYear.get('year') + '-' + (parseInt(temYear.get('month')) + 1) + '-' + temYear.get('date')
      arr.push({
        text: temYear.format('YYYY-MM-DD') + ' (' + i + '年)',
        value: temValue
      })
      if (i === 1) {
        defaultYear = temValue
      }
    }
    return {
      defaultYear,
      optionDatas: arr
    }
  }

  disabledStartDate (current) {
    return current && current < moment().subtract(1, 'days')
  }

  disabledEndDate (current) {
    return current && current < moment().subtract(1, 'days')
  }

  handleRenewTypeChange (e) {
    this.setState({
      renewType: e.target.value
    })
  }

  /**
   * 确定
   */
  handleSave () {
    appRenew(this.getFormData(), (response) => {

    })
  }

  /**
   * 返回附件的参数
   * @returns {*}
   */
  getFormData () {
    const { fileList } = this.state
    const formData = new FormData()
    formData.append('sw_id', '1')
    formData.append('renewType', this.state.renewType)
    formData.append('renewValue', this.state.renewValue)
    fileList.forEach((file) => {
      formData.append('files[]', file)
    })
    return formData
  }

  render () {
    let thiz = this
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px'
    }
    const props = {
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
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file]
        }))
        return false
      },
      fileList: this.state.fileList
    }
    return (
      <Modal
        title='续费'
        width='700px'
        visible={this.props.visible}
        onCancel={this.props.handleClose}
        footer={[
          <Button key='yes' type='primary' onClick={() => { this.handleSave() }}>确定</Button>,
          <Button key='no' type='primary' onClick={this.props.handleClose}>取消</Button>
        ]}
      >
        <div className='busi-renew-container'>
          <Row>
            <Col span={24} className='soft-name' >
              软件名称：{this.props.record.sw_name || ''}
            </Col>
          </Row>
          <Row gutter={22}>
            <Col span={12}>
              <span className='contract-title'>合同起止日期:<span className='contract-value'>2017年4月10日 - 2018年4月10日</span></span>
            </Col>
            <Col span={12}>
              <span className='contract-title'>合同状态:<span className='contract-value' style={{color: '#FF6600'}}>余{this.props.record.expire || 0}天</span></span>
            </Col>
          </Row>
          <Row className='contract-status'>
            <Col span={12}>
              <Radio.Group onChange={this.handleRenewTypeChange.bind(thiz)} value={this.state.renewType}>
                <Radio style={radioStyle} value='tem'>临时开通：
                  <DatePicker
                    style={{ width: 120 }}
                    disabledDate={this.disabledStartDate.bind(this)}
                    format='YYYY-MM-DD'
                    placeholder='选择日期'
                  /><span style={{margin: '15px'}}>-</span>
                  <DatePicker
                    style={{ width: 120 }}
                    disabledDate={this.disabledEndDate.bind(this)}
                    format='YYYY-MM-DD'
                    placeholder='选择日期'
                  /></Radio>
                <Radio style={radioStyle} value='renew'>续费：
                  <Select defaultValue={this.state.yearsOption.defaultYear} style={{ width: 275, marginLeft: '28px' }}>
                    {
                      this.state.yearsOption.optionDatas.map((item, index, arr) => {
                        return <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
                      })
                    }
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
