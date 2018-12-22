import React, { Component } from 'react'
import PropTypes from 'prop-types'
// 引入 ECharts 主模块
import echarts from 'echarts'

/**
 * echarts的react组件
 * 可以传入options来渲染echarts
 * 默认宽高均为100%
 *
 * 宽度可以响应式缩放
 * 如需更新echarts数据，可以更新data或者options即可
 *
 */

class Echarts extends Component {
  constructor (props) {
    super(props)
    // 宽度响应式缩放 -- 真的需要这一句吗
    this.onResize = this.onResize.bind(this)
  }

  /**
   * 窗口宽度响应式缩放
   */
  onResize () {
    let chartBox = this.refs.chart
    var width = chartBox.clientWidth
    // var height = chartBox.clientHeight
    if (width) {
      this.myChart.resize()
    }
  }
  initChart (echarts, options) {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(this.refs.chart)
    // 绘制图表
    this.options = options
    this.myChart.setOption(options)
    this.myChart.on('click', this.props.onClick)
    window.addEventListener('resize', this.onResize)
  }
  componentDidMount () {
    let options = this.props.options
    this.initChart(echarts, options)
  }
  shouldComponentUpdate (nextProps, nextState) {
    // 只开通以下情况的渲染 -- 避免过多无谓地渲染 提高性能表现
    // 当data发生变化时 渲染
    if ((nextProps.data !== this.props.data) && this.myChart) {
      const data = nextProps.data
      // 根据data生成新的options
      let newOptions = Object.assign({}, this.options)
      if (newOptions.series) {
        newOptions.series[0].data = data
      } else {
        newOptions.series = [{}]
        newOptions.series[0].data = data
      }
      this.options = newOptions
      // 触发echarts渲染
      this.myChart.setOption(newOptions)
    }
    // 当options变化时 渲染
    if ((nextProps.options !== this.props.options) && this.myChart) {
      let newOptions = nextProps.options
      // 触发echarts渲染
      this.myChart.setOption(newOptions)
    }
    return false
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }
  render () {
    return (
      <div
        ref='chart'
        style={{ width: this.props.width, height: this.props.height }}
      />
    )
  }
}
Echarts.defaultProps = {
  width: '100%',
  height: '100%',
  data: [],
  onClick: (param) => { console.log(param) }
}

Echarts.propTypes = {
  // echart的options
  options: PropTypes.object,
  // dom的宽高，默认为100%
  width: PropTypes.string,
  height: PropTypes.string,
  data: PropTypes.array,
  onClick: PropTypes.func
}

export default Echarts
