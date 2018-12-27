/**
 *  这里要引入我们地小组件
 *  需要组件说明
 *  动态组件应该由函数式输出--函数式组件
 */
import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Collapse, message } from 'antd'
import { HomepageManageBar, HomepageAdd, HomepageBox, HomepageNewBox } from 'components/software-market'
import './HomepageMaker.scss'
import {getGatewayNavigationList, addGatewayNavigation} from 'services/software-manage'

const Panel = Collapse.Panel

class HomepageMaker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expand: false,
      count: 0,
      data: [],
      navigationTitle: '',
      navigationUrl: '',
      newData: []
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
  // onDelete = (value) => {
  //   let a = value.toString()
  //   axios.post(ajaxUrl.deleteGatewayNavigation, { "navigation_id": a }).then(
  //     res => {
  //       console.log(res.data)
  //       if (res.data) {
  //         this.props.getList()
  //         message.success('删除成功')
  //       } else {
  //         message.error('删除失败')
  //       }
  //     }
  //   ).catch(e => { console.log(e) })
  // }

  copyArray = (arr) => {
    let result = []
    arr.map((item, index) => {
      result[index] = item
    })
    return result
  }

  onAdd = () => {
    let a = 0
    a += this.state.newData.length + 1
    let b = this.copyArray(this.state.newData)
    b.push(a)
    if (b.length <= 1) {
      this.setState({
        newData: b
      })
    } else {
      message.warning('请保存后继续新增')
    }
  }

  getList = () => {
    getGatewayNavigationList({}, res => {
      if (res.data.code === 200) {
        this.setState({
          data: []
          // count: 0
        }, () => {
          this.setState({
            // count: res.data.pageCount,
            data: res.data.data
          })
        })
      } else {
        message.warn(res.data.msg)
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

  /**
   * 渲染小方块
   * @param { int } count 渲染多少个出来 默认是3个
   */
  getPanelBox = (num) => {
    return (<HomepageBox orderNum={num} />)
  }

  componentDidMount () {
    this.getList()
  }
  // 获取input输入值
  getInputValue = (e) => {
    let { value } = e.target
    this.setState({
      navigationTitle: value
    })
  }
  getInputValuet = (e) => {
    let { value } = e.target
    this.setState({
      navigationUrl: value
    })
  }
  // 撤销修改
  recerve = () => {
    this.setState({
      newData: []
    })
    this.getList()
  }
  // 保存新增
  addHomepage = () => {
    let params = {
      navigation_title: this.state.navigationTitle,
      navigation_url: this.state.navigationUrl
    }
    if (this.state.navigationTitle !== '' && this.state.navigationUrl !== '') {
      console.log(this.state.navigationUrl)
      addGatewayNavigation(params, res => {
        this.setState({
          newData: []
        })
        console.log(res.data)
        if (res.data) {
          message.success('保存成功!')
        } else {
          message.error('保存失败')
        }
        this.getList()
        console.log(this.state.data)
      })
    } else {
      message.warning('请完善内容')
    }
  }
  render () {
    const { expand, data, newData } = this.state
    const { header } = this.props
    const { title } = header
    return (
      <div className='hp-maker'>
        <Collapse onChange={this.onExpand}>
          <Panel showArrow={false} header={<HomepageManageBar getList={this.getList} title={title} expand={expand} addpage={this.addHomepage} click={this.recerve} />} key='1'>
            {data.map((item, index) => {
              return (<div className='float-box' key={index}><HomepageBox title={title} orderNum={index + 1
              } id={item.id} dataa={item.name} datab={item.url} getList={this.getList}onChange={this.getInputValue} onChanget={this.getInputValuet} /></div>)
            })}
            {newData.map((item, index) => {
              return (<div className='float-box' key={index}><HomepageNewBox title={title} orderNum={index + this.state.data.length + 1
              } getList={this.getList} onChange={this.getInputValue} onChanget={this.getInputValuet} /></div>)
            })}
            <div className='float-box'>{this.getPanelAdd()}</div>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

HomepageMaker.propTypes = {
  header: PropsTypes.object
}

export default HomepageMaker
