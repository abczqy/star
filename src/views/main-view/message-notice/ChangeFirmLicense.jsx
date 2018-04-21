/* 修改营业执照 */
import React from 'react'
import {Modal, Button, Form, Input, Upload, Icon} from 'antd'
import PropTypes from 'prop-types'
import '../Operateview.scss'
class ChangeFirmLicense extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    form: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      confirmDirty: false,
      type: 'text',
      fileList: []
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.visible) {
      this.props.form.resetFields()
    }
  }
  saveOrSubmit =() => {
    let thiz = this
    thiz.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('修改营业执照', values)
        this.props.hiddenModal()
      }
    })
  }
  handlePreview = (file) => {
    this.setState({
      // previewImage: file.url || file.thumbUrl,
      // previewVisible: true
    })
  }
  handleChange = ({ file, fileList }) => {
    if (file.status === 'done' && file.response && file.response.success) {
      console.log(11111111111, file.response.data)
    }
    console.log(11111111111, fileList)
    this.setState({ fileList })
  }
  render () {
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
    const { getFieldDecorator } = this.props.form
    const { fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    return (
      <div>
        <Modal
          title='修改营业执照'
          visible={this.props.visible}
          onCancel={this.props.hiddenModal}
          maskClosable={false}
          className='pass-change-modal'
          footer={[
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='cancle' onClick={this.props.hiddenModal}>取消</Button>,
            // eslint-disable-next-line react/jsx-no-bind
            <Button key='save' type='primary' onClick={this.saveOrSubmit.bind(this)}>确认</Button>
          ]}
          width='35vw'
          height='30vw'
        >
          <div className='addbind-modal'>
            <Form>
              <Form.Item
                {...formItemLayout}
                label='请输入密码'
              >
                {getFieldDecorator('maf_pass', {rules: [{required: true, message: '请输入密码!'}]})(
                  <Input type={this.state.type} />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='请输入厂商名称'
              >
                <div>
                  <Upload
                    action='//jsonplaceholder.typicode.com/posts/'
                    listType='picture-card'
                    // onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(ChangeFirmLicense)
