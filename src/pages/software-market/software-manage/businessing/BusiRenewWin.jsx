/* eslint-disable react/jsx-no-bind,no-mixed-operators */
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
      renewType: '1',
      renewValue: yearsOption.defaultYear,
      renewStartTime: '', // 临时开通的开始时间
      renewEndTime: '', // 临时开通的结束时间
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

  /**
   * 结束时间不可选日期
   * @param current
   * @returns {*|boolean}
   */
  disabledEndDate = (current) => {
    let start = moment().subtract(1, 'day')
    if (this.state.renewStartTime) {
      start = moment(this.state.renewStartTime, 'YYYY-MM-DD')
    }
    return current && current.valueOf() < start
  }
  /**
   * 开始时间不可选日期
   * @param current
   * @returns {*|boolean}
   */
  disabledStartDate = (current) => {
    let start = moment().subtract(1, 'day')
    let end
    if (this.state.renewEndTime) {
      end = moment(this.state.renewEndTime, 'YYYY-MM-DD')
    }
    if (end) {
      return current && current.valueOf() > end.add(1, 'day') || current.valueOf() < start
    } else {
      return current && current.valueOf() < start
    }
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
    formData.append('type', this.state.renewType)
    formData.append('fa_id', this.props.record.fa_id || '')
    // 临时开通
    if (this.state.renewType === '0') {
      formData.append('contract_start', this.state.renewStartTime)
      formData.append('contract_end', this.state.renewEndTime)
    } else { // 续费
      formData.append('contract_end', this.state.renewValue)
    }
    fileList.forEach((file) => {
      formData.append('contract_path', file)
    })
    return formData
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value ? value.format('YYYY-MM-DD') : ''
    })
  }

  onStartChange= (value) => {
    this.onChange('renewStartTime', value)
  }

  onEndChange = (value) => {
    this.onChange('renewEndTime', value)
  }

  handleRenewRangeChange (value) {
    this.setState({
      renewValue: value
    })
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
                <Radio style={radioStyle} value='0'>临时开通：
                  <DatePicker
                    style={{ width: 120 }}
                    disabledDate={this.disabledStartDate.bind(this)}
                    format='YYYY-MM-DD'
                    onChange={this.onStartChange}
                    placeholder='选择日期'
                  /><span style={{margin: '15px'}}>-</span>
                  <DatePicker
                    style={{ width: 120 }}
                    disabledDate={this.disabledEndDate.bind(this)}
                    format='YYYY-MM-DD'
                    onChange={this.onEndChange}
                    placeholder='选择日期'
                  /></Radio>
                <Radio style={radioStyle} value='1'>续费：
                  <Select onChange={this.handleRenewRangeChange.bind(thiz)} defaultValue={this.state.yearsOption.defaultYear} style={{ width: 275, marginLeft: '28px' }}>
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
