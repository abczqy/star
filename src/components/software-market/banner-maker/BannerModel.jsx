import React, { Component } from 'react'
import { Modal, Button, message } from 'antd'
import PropsTypes from 'prop-types'
import { HomepageAdd, BannerNewBox, BannerBox } from 'components/software-market'
import './BannerMaker.scss'
import { addGatewayBanner, getSchoolBannerList, deleteSchoolBannerList } from 'services/software-manage'

class BannerModel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bannerData: [],
      fileList: [],
      bannerNewData: [],
      sh_id: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('nextProps:', nextProps, 'state.sh_id:', this.state.sh_id)
    if (nextProps.visible && this.state.sh_id !== nextProps.sh_id) {
      this.setState({
        sh_id: nextProps.sh_id
      }, () => {
        this.getList()
      })
    }
  }

  getList = () => {
    getSchoolBannerList({sh_id: this.state.sh_id}, (res) => {
      this.setState({
        bannerData: []
      }, () => {
        this.setState({
          bannerData: this.splitBannerUrl(res.data.banner_url)
        })
      })
      console.log(this.state.bannerData)
    })
  }

  // 拆分获取到的banner_url
  splitBannerUrl = (bannerUrl) => {
    let data = bannerUrl && bannerUrl.split(',')
    let retData = []
    if (!data) {
      return retData
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i] !== 'null') {
        let item = {}
        item.banner_url = data[i]
        item.id = i
        retData.push(item)
      }
    }
    return retData
  }

  onAdd = () => {
    let a = 0
    a += this.state.bannerNewData.length + 1
    let b = this.copyArray(this.state.bannerNewData)
    b.push(a)
    if (b.length <= 1) {
      this.setState({
        bannerNewData: b
      })
    } else {
      message.warning('请保存后继续新增')
    }
  }

  copyArray = (arr) => {
    let result = []
    arr.map((item, index) => {
      result[index] = item
    })
    return result
  }

  onDelete = (value) => {
    let bannerUrl = this.getDelBanUrl(value)
    let params = {
      sh_id: this.state.sh_id,
      banner_url: bannerUrl
    }
    deleteSchoolBannerList(params, res => {
      console.log(res.data)
      if (res.data) {
        this.getList()
        message.success(res.data.info)
      } else {
        message.error('删除失败')
      }
    })
  }

  // 获得上传的删除参数
  getDelBanUrl = (id) => {
    let data = this.state.bannerData
    let retStr = ''
    for (let i = 0; i < data.length; i++) {
      if (i !== id) {
        retStr += (data[i].banner_url + ',')
      }
    }
    retStr = retStr.slice(0, -1)
    console.log(retStr)
    return retStr
  }

  /**
   * 渲染“添加小方块”
   * @param { int } count 渲染多少个出来 默认是3个
   */
  getPanelAdd = () => {
    return (<HomepageAdd onAdd={this.onAdd} />)
  }

  recerve = () => {
    this.setState({
      bannerNewData: [],
      fileList: []
    })
  }

  // 保存新增banner图
  addBanner = () => {
    const formData = new FormData()
    this.state.fileList.forEach((file) => {
      formData.append('file_upload', file)
      formData.append('sh_id', this.props.sh_id)
    })
    console.log(this.state.fileList)
    addGatewayBanner(formData, res => {
      this.setState({
        bannerNewData: [],
        fileList: []
      }, () => {
        this.props.handleClose()
      })
      if (res.data) {
        message.success('图片保存成功')
        this.getList()
      } else {
        message.success('图片保存失败')
      }
      console.log(res)
    })
  }

  // 点击关闭
  handleClose = () => {
    this.setState({
      sh_id: ''
    }, () => {
      this.props.handleClose()
    })
  }

  render () {
    const { bannerData } = this.state
    const { header } = this.props
    const { title } = header
    const datas = {
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
    const { bannerNewData } = this.state
    return (
      <Modal
        width='60%'
        title='编辑banner'
        visible={this.props.visible}
        onCancel={this.handleClose}
        footer={[
          <Button key='submit' type='primary' onClick={this.addBanner}>保存</Button>,
          <Button key='back' onClick={this.recerve}>撤销修改</Button>
        ]}
      >
        <div className='hp-maker'>
          {bannerData.map((item, index) => {
            return (<div className='float-box' key={index}><BannerBox title={title} orderNum={index + 1
            } id={item.id} url={item.banner_url} datas={datas} bannerData={bannerData} datab={item.banner_url} getList={this.getList} onDelete={this.onDelete} /></div>)
          })}
          {bannerNewData.map((item, index) => {
            return (<div className='float-box' key={index}><BannerNewBox title={title} orderNum={index + 1
            } datas={datas} getList={this.getList} /></div>)
          })}
          <div className='float-box'>{this.getPanelAdd()}</div>
        </div>
      </Modal>
    )
  }
}

BannerModel.propTypes = {
  visible: PropsTypes.bool,
  handleClose: PropsTypes.func,
  header: PropsTypes.string,
  sh_id: PropsTypes.string
}

export default BannerModel
