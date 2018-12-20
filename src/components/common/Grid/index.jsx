/**
 * Grid组件
 * 1- 是一个布局组件 - 类似于九宫格的格子
 * 2- 具有内容水平+垂直居中的默认样式
 * 3- 能根据格子总数 + 列数 => 动态计算在页面中铺展需要的百分比和行数
 * 4- 这个组件感觉是设计的方向比较好一些的，也是从页面代码中抽出来的
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Grid.scss'

class Grid extends Component {
  render () {
    const {
      gridCol = 3, // 列数（默认3列）
      gridCount // 需要渲染的格子数（一般就是数据（数组类型）的length）
    } = this.props
    return (
      <div
        className='grid'
        style={{
          width: (100 / gridCol + '%'),
          height: (100 / gridCount * gridCol + '%')
        }}>
        <div>
          { this.props.children || '' }
        </div>
      </div>
    )
  }
}

Grid.propTypes = {
  children: PropTypes.any,
  gridCol: PropTypes.number,
  gridCount: PropTypes.number.isRequired
}

export default Grid
