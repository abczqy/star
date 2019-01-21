/**
 * 市场分析-词云图
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import echarts from 'echarts'
import 'echarts-wordcloud'
import './MarketAnalysisWordCloud.scss'

class MarketAnalysisCiyuntu extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.wordCloudOption = this.getWordCloudOption(this.props.dataSource)
  }

  getWordCloudOption=(data) => {
    return {
      series: [{
        type: 'wordCloud',
        gridSize: 40,
        sizeRange: [12, 36],
        rotationRange: [0, 0],
        shape: 'circle',
        size: ['80%', '80%'],
        textRotation: [0, 45, 90, -45],
        textPadding: 0,
        autoSize: {
          enable: true,
          minSize: 14
        },
        textStyle: {
          normal: {
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')'
            }
          }
          // emphasis: {
          //   shadowBlur: 10,
          //   shadowColor: '#333'
          // }
        },
        data
      }]
    }
  }

  componentDidMount () {
    var myChart = echarts.init(document.getElementById('market-analysis-wordCloud'))
    // console.log(JSON.stringify(this.wordCloudOption))
    myChart.setOption(this.wordCloudOption)
  }

  render () {
    return (
      <div className='market-analysis-wordCloud' id='market-analysis-wordCloud' />
    )
  }
}

MarketAnalysisCiyuntu.propTypes = {
  dataSource: PropTypes.array
}

export default MarketAnalysisCiyuntu
