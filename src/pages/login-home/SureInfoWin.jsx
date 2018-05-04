/* eslint-disable react/jsx-no-bind,react/prop-types,one-var */
/**
 * 老师学生确认信息弹框
 */
import React from 'react'
import { Row, Col, Modal, Button, Input, Form, Select, message } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import {updateUserInfo, getUserInfoList} from 'services/portal'
import webStorage from 'webStorage'
import moment from 'moment'
import Birth from 'components/common/Birth'

class SureInfoWin extends React.Component {
  static propTypes = {
    // data: PropTypes.array,
    visible: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.state = {
      isEdit: false, // 是否处于编辑模式
      sexList: [{
        text: '男',
        value: '1'
      }, {
        text: '女',
        value: '0'
      }],
      dutyList: [], // 职务下拉列表的值
      gradeList: [], // 年级下拉列表的值
      schoolList: [], // 学校下拉列表
      allMonth: this.getAllMonth(),
      allDays: this.getAllDays()
    }
  }

  getAllDays () {
    let arr = []
    for (let i = 1; i <= 31; i++) {
      arr.push({
        text: i + '日',
        value: i
      })
    }
    return arr
  }

  getAllMonth () {
    let arr = []
    for (let i = 1; i <= 12; i++) {
      arr.push({
        text: i + '月',
        value: i
      })
    }
    return arr
  }

  renderItem (item, index) {
    const { getFieldDecorator } = this.props.form
    return (<Col key={index} span={12} className='sure-info-item'>
      <Form.Item label={item.text}>
        {getFieldDecorator(item.type, this.getEditCompParams(item))(
          this.state.isEdit ? this.getEditComp(item) : this.getCompValue(item)
        )}
      </Form.Item>
    </Col>)
  }

  getCompValue (item) {
    if (item.type === 'birth') { // 出生年月
      if (item.value) {
        return <span>{moment(item.value).format('YYYY年MM月DD日')}</span>
      } else {
        return <span />
      }
    } else {
      return <span>{item.value}</span>
    }
  }

  getEditCompParams (item) {
    let obj = {
      rules: [{
        required: !!this.state.isEdit,
        message: '不能为空!'
      }],
      initialValue: ''
    }
    if (item.type === 'sex') { // 性别
      if (item.value) {
        obj.initialValue = item.value
      }
    } else if (item.type === 'duty') { // 职务
      if (item.value) {
        obj.initialValue = item.value
      }
    } else if (item.type === 'level') { // 年级
      if (item.value) {
        obj.initialValue = item.value
      }
    } else if (item.type === 'birth') { // 出生年月
      if (item.value) {
        let tem = moment(item.value)
        obj.initialValue = {
          year: tem.year(),
          month: tem.month(),
          day: tem.date()
        }
      }
    } else if (item.type === 'school') { // 学校
      if (item.value) {
        obj.initialValue = item.value
      }
    } else { // 其他
      if (item.value) {
        obj.initialValue = item.value
      }
    }
    return obj
  }

  getEditComp (item) {
    if (item.type === 'sex') {
      return (
        <Select>
          {
            this.state.sexList.map((item, index, arr) => {
              return <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
            })
          }
        </Select>
      )
    } else if (item.type === 'duty') { // 职务
      return (
        <Select>
          {
            this.state.dutyList.map((item, index, arr) => {
              return <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
            })
          }
        </Select>
      )
    } else if (item.type === 'grade') { // 年级
      return (
        <Select>
          {
            this.state.gradeList.map((item, index, arr) => {
              return <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
            })
          }
        </Select>
      )
    } else if (item.type === 'birth') { // 出生年月
      return (
        <Birth />
      )
    } else if (item.type === 'school') { // 学校
      return (
        <Select>
          {
            this.state.schoolList.map((item, index, arr) => {
              return <Select.Option key={index} value={item.value}>{item.text}</Select.Option>
            })
          }
        </Select>
      )
    } else {
      return <Input placeholder={'请输入' + item.text} />
    }
  }

  /**
   * 处理信息有误
   */
  handleInfoErr () {
    this.setState({
      isEdit: true
    })
  }

  /**
   * 保存编辑的信息
   */
  handleSave () {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let obj = {}
        for (let i in values) {
          if (i === 'birth') {
            obj['birth'] = moment(values[i].year + '-' + values[i].month + '-' + values[i].day).format('YYYY-MM-DD')
          } else if (i === 'grade' || i === 'school') {
            obj[i + 'Id'] = values[i]
          } else {
            obj[i] = values[i]
          }
        }
        updateUserInfo({
          type: webStorage.getItem('STAR_WEB_ROLE_CODE') === 'students' ? 'students' : 'teacher',
          params: obj
        }, (response) => {
          let result = response.data
          if (result.success) {
            message.success('更新成功!')
            this.setState({
              isEdit: false
            }, () => {
              this.props.updateSureWinData(this.getSureInfoData(obj), webStorage.getItem('STAR_WEB_ROLE_CODE'))
            })
          } else {
            message.success('更新失败!')
          }
        })
      }
    })
  }

  getSureInfoData (personInfo, roleCode) {
    let data = []
    for (let i in personInfo) {
      if (i === 'name') {
        data.push({
          text: roleCode === 'students' ? '学生姓名' : '教师姓名',
          type: 'name',
          value: personInfo[i]
        })
      } else if (i === 'sex') {
        data.push({
          text: '性别',
          type: 'sex',
          value: personInfo[i]
        })
      } else if (i === 'birth') {
        data.push({
          text: '出生日期',
          type: 'birth',
          value: personInfo[i]
        })
      } else if (i === 'school') {
        data.push({
          text: '学校',
          type: 'school',
          value: personInfo[i]
        })
      } else if (i === 'iden') {
        data.push({
          text: '身份证号',
          type: 'iden',
          value: personInfo[i]
        })
      } else if (i === 'grade') {
        data.push({
          text: '年级',
          type: 'grade',
          value: personInfo[i]
        })
      } else if (i === 'duty') {
        data.push({
          text: '行政职务',
          type: 'duty',
          value: personInfo[i]
        })
      }
    }
    return data
  }

  /**
   * 取消编辑信息
   */
  handleCancle () {
    this.setState({
      isEdit: false
    })
  }

  componentDidMount () {
    this.getUserInfoList()
    this.getUserSchool()
  }

  getUserSchool () {
    getUserInfoList({
      type: 'school'
    }, (response) => {
      let result = response.data
      if (result.success) {
        result.data.forEach((item, index, arr) => {
          item.text = item.CODE_DESC
          item.value = item.CODE
        })
        this.setState({
          schoolList: result.data || []
        })
      }
    })
  }

  getUserInfoList () {
    let type, roleCode = webStorage.getItem('STAR_WEB_ROLE_CODE')
    if (roleCode === 'students') {
      type = 'grade'
    } else if (roleCode === 'teacher') {
      type = 'teacher_duty'
    }
    if (type) {
      getUserInfoList({
        type
      }, (response) => {
        let result = response.data
        if (result.success) {
          result.data.forEach((item, index, arr) => {
            item.text = item.CODE_DESC
            item.value = item.CODE
          })
          if (type === 'grade') {
            this.setState({
              gradeList: result.data || []
            })
          } else if (type === 'teacher_duty') {
            this.setState({
              dutyList: result.data || []
            })
          }
        }
      })
    }
  }

  render () {
    let thiz = this
    return (
      <Modal
        width='720px'
        title='确认信息'
        visible={this.props.visible}
        onCancel={thiz.props.handleClose}
        footer={this.state.isEdit
          ? [<Button type='primary' key='infoError' onClick={thiz.handleSave.bind(thiz)}>保存</Button>,
            <Button key='cancleBtn' onClick={thiz.handleCancle.bind(thiz)}>取消</Button>]
          : [<Button style={{background: '#CC0000', color: 'white'}} key='infoError' onClick={thiz.handleInfoErr.bind(thiz)}>信息有误</Button>,
            <Button key='infoOk' type='primary' onClick={thiz.props.handleInfoOk}>确认</Button>]}
      >
        <Form className='ant-advanced-search-form'>
          <Row gutter={24}>
            {
              thiz.props.data.map((item, index, arr) => {
                return this.renderItem(item, index)
              })
            }
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default withRouter(Form.create()(SureInfoWin))
