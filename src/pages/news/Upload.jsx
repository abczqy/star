import React, {Component} from 'react'
import {Upload, Button, Icon, Spin, message} from 'antd'
import PropTypes from 'prop-types'
import ajax from 'axios'
import './Upload.scss'
import AJAX_HOST from '../../../static/Config'

export default class CustomeUpload extends Component {
  constructor () {
    super()
    this.state = {
      fileList: [],
      spinning: false
    }
  }
  componentDidMount () {
    if (this.props.id && this.props.update) {
      this.setState({
        fileList: []
      }, () => {
        this.initFileList(this.props)
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.update && !this.props.update) {
      this.initFileList(nextProps)
    }
  }
  /**
   * 初始化文件列表
   * @param props
   */
  initFileList= (props) => {
    this.setState({fileList: []})
    let {id} = props
    let fileType = props.data.type
    if (id && fileType) {
      this.setState({spinning: true})
      ajax.upload.getUploadList({id, type: fileType}, res => {
        if (res.success) {
          let fileList = res.data.map(item => {
            item.fileId = item.id
            return item
          })
          this.props.getFileList(fileList)
          fileList = fileList.map((el, index) => {
            let response = {...res}
            response.data = res.data[index]
            let newEl = {
              uid: el.id,
              name: el.oldFileName,
              status: 'done',
              response
            }
            return newEl
          })
          this.setState({fileList, spinning: false})
          this.props.updateDone()
        } else {
          message.error(res.msg)
        }
      }, error => {
        console.log(error)
      })
    }
  }
  onChange = ({file, fileList}) => {
    fileList = fileList.map(file => {
      if (file.status === 'done' && file.response && !file.response.success) {
        file.status = 'error'
      }
      return file
    })
    this.setState({fileList})
    // 目前单文件上传处理,文件上传或remove操作
    if ((file.status === 'done' && file.response && file.response.success) || file.status === 'removed') {
      let files = fileList.map(file => {
        if (file.response.success) {
          return file.response.data
        }
      })
      if (this.props.indexD) {
        this.props.getFileList(files, this.props.index)
      } else {
        this.props.getFileList(files)
      }
    }
  }

  onPreview = (file) => {
    if (file.response && file.response.success && file.response.data.newFilePath) {
      // window.open(axios.defaults.fileBaseUrl + file.response.data.newFilePath)
    }
  }
  render () {
    const props = {
      name: 'file',
      // action: axios.defaults.baseURL + this.props.action,
      action: AJAX_HOST + this.props.action,
      accept: this.props.accept,
      // data: this.props.data,
      disabled: this.props.disabled,
      lisType: this.props.lisType,
      withCredentials: true,
      multiple: false,
      fileList: this.state.fileList,
      beforeUpload: (file, fileList) => {
        return true
      },
      onPreview: this.onPreview,
      onChange: this.onChange
    }
    return <Spin spinning={this.state.spinning}>
      <div className={this.props.disabled ? 'disabled' : ''}>
        <Upload {...props}>
          <Button size='small' style={{display: this.props.disabled ? 'none' : 'block'}}>
            <Icon type='upload' />{this.props.name}
          </Button>
        </Upload>
      </div>
    </Spin>
  }
}
CustomeUpload.propTypes = {
  disabled: PropTypes.bool,
  lisType: PropTypes.string,
  getFileList: PropTypes.func,
  name: PropTypes.string,
  accept: PropTypes.string,
  action: PropTypes.string,
  data: PropTypes.object,
  id: PropTypes.string,
  updateDone: PropTypes.func,
  update: PropTypes.bool,
  index: PropTypes.number,
  indexD: PropTypes.bool
}
CustomeUpload.defaultProps = {
  disabled: false,
  name: '上传',
  lisType: 'text',
  accept: 'doc,docx,xlsx,pdf',
  action: AJAX_HOST + '/upload',
  data: {type: '7'},
  id: null
}
