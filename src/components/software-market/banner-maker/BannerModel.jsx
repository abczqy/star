import React, { Component } from 'react'
import { Modal, Button, message } from 'antd'
import PropsTypes from 'prop-types'
import { HomepageAdd, BannerBox, BannerNewBox } from 'components/software-market'
import './BannerMaker.scss'
import { addGatewayBanner } from 'services/software-manage'

class BannerModel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bannerData: [],
      fileList: [],
      bannerNewData: []
    }
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
    this.getList()
  }

  // 保存新增banner图
  addBanner = () => {
    const formData = new FormData()
    this.state.fileList.forEach((file) => {
      formData.append('file_upload', file)
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
    const { bannerData } = this.props
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
            } id={item.banner_id} url={item.banner_url} type={item.banner_type} datas={datas} bannerData={bannerData} datab={item.banner_url} getList={this.getList} onDelete={this.onDelete} /></div>)
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
  bannerData: PropsTypes.array,
  header: PropsTypes.string
}

export default BannerModel
