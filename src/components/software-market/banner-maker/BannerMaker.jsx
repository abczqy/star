/**
 *  这里要引入我们地小组件
 *  需要组件说明
 *  动态组件应该由函数式输出--函数式组件
 */
import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Collapse, message } from 'antd'
import { HomepageManageBar, HomepageAdd, BannerBox, BannerNewBox } from 'components/software-market'
import './BannerMaker.scss'
import axios from 'axios'
import ajaxUrl from 'config'

const Panel = Collapse.Panel

class BannerMaker extends Component {
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
    let a = this.state.fileList.toString()
    axios.post(ajaxUrl.addGatewayBanner, { 'file': a }).then(

    ).catch(err => {
      console.log(err)
    })
  }
  recerve = () => {
    this.setState({
      bannerNewData: [],
      fileList: []
    })
    this.getList()
  }
  getList = () => {
    axios.get(ajaxUrl.getGatewayBannerList, { params: {} }).then(res => {
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
    }).catch(e => { console.log(e) })
  }
  open = () => {
    this.setState({
      visible: true
    })
    console.log('此时visible值为', this.state.visible)
  }

  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false
    }, () => {
      this.addBanner()
      console.log('确认发送')
    })
  }
  change = () => {
    if (this.props.ctrl && this.props.ctrl === 'edit') {
      return '确定要修改内容吗'
    } else if (this.props.ctrl && this.props.ctrl === 'add') {
      return '确定要发布内容吗'
    }
  }
  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false
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
          <Panel showArrow={false} header={<HomepageManageBar title={title} expand={expand} addpage={this.handleOk} click={this.recerve} />} key='1'>
            {bannerData.map((item, index) => {
              return (<div className='float-box' key={index}><BannerBox title={title} orderNum={index + 1
              } id={item.banner_id} datas={datas} dataa={item.banner_title} datab={item.banner_url} getList={this.getList} /></div>)
            })}
            {bannerNewData.map((item, index) => {
              return (<div className='float-box' key={index}><BannerNewBox title={title} orderNum={index + 1
              } id={item.banner_id} datas={datas} dataa={item.banner_title} datab={item.banner_url} getList={this.getList} visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} change={this.change} handleOk={this.open} /></div>)
            })}
            <div className='float-box'>{this.getPanelAdd()}</div>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

BannerMaker.propTypes = {
  header: PropsTypes.object,
  ctrl: PropsTypes.object
}

export default BannerMaker
