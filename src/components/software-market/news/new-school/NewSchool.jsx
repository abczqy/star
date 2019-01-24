import React from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import {eduGetData} from 'services/software-manage'
import RegionSelect from 'components/common/RegionSelect'

const FormItem = Form.Item
const Option = Select.Option

class NewSchool extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authorities: []
    }
  }
  getAuthority = () => {
    eduGetData({}, (res) => {
      if (res.data.data) {
        this.setState({
          authorities: res.data.data.info
        })
      }
    })
  }
  componentDidMount () {
    this.getAuthority()
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { authorities } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    }
    return (
      <div className='new-school'>
        <Form>
          <FormItem label='学校名称' {...formItemLayout}>
            {getFieldDecorator('schoolName', {
              rules: [{required: true, message: '请填写学校名称'}]
            })(<Input />)}
          </FormItem>
          <FormItem label='所属教育局' {...formItemLayout}>
            {getFieldDecorator('authorityName', {
              rules: [{required: true, message: '请选择所属教育局'}]
            })(<Select labelInValue>
              {authorities.length && authorities.map((authority, index) => {
                return <Option value={authority.id}>{authority.authorityName}</Option>
              })}
            </Select>)}
          </FormItem>
          <FormItem label='学校地址' {...formItemLayout}>
            {getFieldDecorator('schoolAddress', {
              rules: [{required: true, message: '请输入学校地址'}],
              initialValue: { province: '', city: '', region: '' }
            })(<RegionSelect />)}
          </FormItem>
          <FormItem label={'联系方式'} {...formItemLayout}>
            {getFieldDecorator('telephone', {
              initialValue: ''
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label={'年级'} {...formItemLayout}>
            {getFieldDecorator('grade', {
              initialValue: ''
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </div>
    )
  }
}

NewSchool.propTypes = {
  form: PropTypes.object
}

export default Form.create()(NewSchool)
