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
      classList: [] // 年级下拉列表的值
    }
  }

  renderItem (item, index) {
    const { getFieldDecorator } = this.props.form
    return (<Col key={index} span={12} className='sure-info-item'>
      <Form.Item label={item.text}>
        {getFieldDecorator(item.type, this.getEditCompParams(item))(
          this.state.isEdit ? this.getEditComp(item) : <span>{item.value}</span>
        )}
      </Form.Item>
    </Col>)
  }

  handleChange () {

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
      } else if (this.state.sexList.length > 0) {
        obj.initialValue = this.state.sexList[0].value
      }
    } else if (item.type === 'duty') { // 职务
      if (item.value) {
        obj.initialValue = item.value
      } else if (this.state.dutyList.length > 0) {
        obj.initialValue = this.state.dutyList[0].value
      }
    } else if (item.type === 'level') { // 年级
      if (item.value) {
        obj.initialValue = item.value
      } else if (this.state.classList.length > 0) {
        obj.initialValue = this.state.classList[0].value
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
    } else if (item.type === 'class') { // 年级
      return (
        <Select>
          {
            this.state.classList.map((item, index, arr) => {
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
        updateUserInfo(values, (response) => {
          let result = response.data
          if (result.success) {
            message.success('更新成功!')
            this.setState({
              isEdit: false
            })
          } else {
            message.success('更新失败!')
          }
        })
      }
    })
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
        result.forEach((item, index, arr) => {
          item.text = item.CODE_DESC
          item.value = item.CODE
        })
        if (type === 'grade') {
          this.setState({
            classList: result || []
          })
        } else if (type === 'teacher_duty') {
          this.setState({
            dutyList: result || []
          })
        }
      })
    }
  }

  render () {
    let thiz = this
    return (
      <Modal
        width='560px'
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
