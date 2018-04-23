/**
 *  这里要引入我们地小组件
 *  需要组件说明
 *  动态组件应该由函数式输出--函数式组件
 */
import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Collapse } from 'antd'
import { HomepageManageBar, HomepageAdd, HomepageBox } from 'components/software-market'
import './SWMaker.scss'

const Panel = Collapse.Panel

class SWMaker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expand: false,
      boxList: [1, 2, 3]
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

  onDelete = (orderNum) => {
    let b = this.copyArray(this.state.boxList)
    b.splice(orderNum - 1, 1)
    this.setState({
      boxList: b
    })
  }

  onAdd = () => {
    let a = 0
    a += this.state.boxList.length + 1
    let b = this.copyArray(this.state.boxList)
    b.push(a)
    this.setState({
      boxList: b
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

  render () {
    const { expand, boxList } = this.state
    const { header } = this.props
    const { title } = header
    return (
      <div className='hp-maker'>
        <Collapse onChange={this.onExpand}>
          <Panel showArrow={false} header={<HomepageManageBar title={title} expand={expand} />} key='1'>
            {boxList.map((item, index) => {
              return (<div className='float-box' key={index}><HomepageBox title={title} orderNum={item} onDelete={this.onDelete} /></div>)
            })}
            <div className='float-box'>{this.getPanelAdd()}</div>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

SWMaker.propTypes = {
  header: PropsTypes.object
}

export default SWMaker
