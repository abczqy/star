/**
 *  这里要引入我们地小组件
 *  需要组件说明
 *  动态组件应该由函数式输出--函数式组件
 */
import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Collapse, message } from 'antd'
import { HomepageManageBar, HomepageAdd, BannerBox, BannerNewBox } from 'components/software-market'
import './PlatformBanner.scss'
import { addPlatformBanner, getPlatformBannerList, deletePlatformBanner } from 'services/software-manage'

const Panel = Collapse.Panel

class PlatformBanner extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boxList: [1, 2, 3],
      count: 0,
      fileList: [],
      visible: false,
      bannerData: [],
      bannerNewData: []
    }
  }
  /**
   * 展开时修改相应的state
   */
  onExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
  }

  copyArray = (arr) => {
    let result = []
    arr.map((item, index) => {
      result[index] = item
    })
    return result
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

  /**
   * 渲染“添加小方块”
   * @param { int } count 渲染多少个出来 默认是3个
   */
  getPanelAdd = () => {
    return (<HomepageAdd onAdd={this.onAdd} />)
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
    addPlatformBanner(formData, res => {
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

  recerve = () => {
    this.setState({
      bannerNewData: [],
      fileList: []
    })
    this.getList()
  }
  onDelete = (value) => {
    let a = value.toString()
    let params = { 'banner_id': a }
    deletePlatformBanner(params, res => {
      console.log(res.data)
      if (res.data) {
        this.getList()
        message.success('删除成功')
      } else {
        message.error('删除失败')
      }
    })
  }
  getList = () => {
    getPlatformBannerList({}, res => {
      let f = []
      this.setState({
        bannerData: [],
        count: 0
      }, () => {
        this.setState({
          count: res.data.pageCount,
          bannerData: res.data.data
        })
      })
      for (var i = 1; i < this.state.count + 1; i++) {
        f.push(i)
      }
      this.setState({
        boxList: f
      })
      console.log(this.state.bannerData, f)
    })
  }
  componentDidMount () {
    this.getList()
  }
  /**
   * 渲染小方块
   * @param { int } count 渲染多少个出来 默认是3个
   */
  // getPanelBox = (num) => {
  //   return (<BannerBox orderNum={num} />)
  // }

  render () {
    const { expand, bannerData, bannerNewData } = this.state
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
    return (
      <div className='hp-maker'>
        <Collapse onChange={this.onExpand}>
          <Panel showArrow={false} header={<HomepageManageBar title={title} expand={expand} addpage={this.addBanner} click={this.recerve} />} key='1'>
            {bannerData.map((item, index) => {
              return (<div className='float-box' key={index}><BannerBox title={title} orderNum={index + 1
              } id={item.banner_id} url={item.banner_url} type={item.banner_type} datas={datas} onDelete={this.onDelete} bannerData={bannerData} datab={item.banner_url} getList={this.getList} /></div>)
            })}
            {bannerNewData.map((item, index) => {
              return (<div className='float-box' key={index}><BannerNewBox title={title} orderNum={index + 1
              } datas={datas} getList={this.getList} /></div>)
            })}
            <div className='float-box'>{this.getPanelAdd()}</div>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

PlatformBanner.propTypes = {
  header: PropsTypes.object
}

export default PlatformBanner
