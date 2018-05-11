import React, { Component } from 'react'
import { Modal, Button, message } from 'antd'
import PropsTypes from 'prop-types'
import { HomepageAdd, BannerNewBox, BannerBox } from 'components/software-market'
import './BannerMaker.scss'
import { addGatewayBanner, deleteGatewayBanner, getSchoolBannerList } from 'services/software-manage'

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
    let data = bannerUrl.split(',')
    let retData = []
    for (let i = 0; i < data.length; i++) {
      let item = {}
      item.banner_url = data[i]
      item.id = i
      retData.push(item)
    }
    console.log(retData)
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
    let a = value.toString()
    let params = { 'banner_id': a }
    deleteGatewayBanner(params, res => {
      console.log(res.data)
      if (res.data) {
        this.getList()
        message.success('删除成功')
      } else {
        message.error('删除失败')
      }
    })
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
    // let list = this.state.fileList
    // let a = list[0].uid
    // let b = list[0].name
    // let c = list[0].size
    // let d = list[0].type
    console.log(this.state.fileList)
    // let params = { 'uid': a, 'name': b, 'size': c, 'type': d }
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
        onCancel={this.props.handleClose}
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
