/* 修改营业执照 */
import React from 'react'
import {Modal, Button, Form, Input, Upload, Icon} from 'antd'
import PropTypes from 'prop-types'
import {updateFactoryContract} from '../../services/topbar-mation/index'
// import { addGatewayBanner } from 'services/software-manage'
import '../../views/Operateview.scss'
class ChangeFirmLicense extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    hiddenModal: PropTypes.func,
    form: PropTypes.object,
    getFirmList: PropTypes.func
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
  // 点击表单后，改变type
  changePasType = () => {
    this.setState({ type: 'password' })
  }
  saveOrSubmit =() => {
    let thiz = this
    thiz.props.form.validateFields((err, values) => {
      let params = this.getFormData()
      if (!err) {
        updateFactoryContract(params, (response) => {
          this.props.getFirmList()
          this.props.hiddenModal()
        })
      }
    })
  }
  /**
   * 返回附件的参数
   * @returns {*}
   */
  getFormData () {
    const { fileList } = this.state
    const formData = new FormData()
    // formData.append('sw_pss', '1')
    formData.append('fa_pwd', '1')
    fileList.forEach((file) => {
      formData.append('fa_license', file)
    })
    return formData
  }
  handlePreview = (file) => {
    this.setState({
      // previewImage: file.url || file.thumbUrl,
      // previewVisible: true
    })
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
    const props = {
      onRemove: (file) => {
        console.log('移除附件')
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
        console.log('上传之前')
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file]
        }))
        return false
      },
      fileList: this.state.fileList
    }
    const { getFieldDecorator } = this.props.form
    const { fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>上传</div>
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
                {getFieldDecorator('maf_pass', {rules: [{required: false, message: '请输入密码!'}]})(
                  <Input type={this.state.type} onClick={this.changePasType} />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label='请上传厂商营业执照'
              >
                <div style={{paddingLeft: '5px'}}>
                  <Upload
                    // action='//jsonplaceholder.typicode.com/posts/'
                    listType='picture-card'
                    {...props}
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
