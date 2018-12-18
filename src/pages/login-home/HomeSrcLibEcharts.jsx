/* eslint-disable react/prop-types */
/**
 * 门户页资源库echarts
 */
import React from 'react'
import { withRouter } from 'react-router'
import Echarts from 'components/common/Echarts'

class HomeSrcLibEcharts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      option: {}
    }
  }

  componentDidMount () {
    let echartsLabel = ['微课类', '教案类', '试题类', '课件类', '素材类', '其他']
    let echartsCount = [36, 20, 16, 10, 9, 9]
    let sum = 0
    echartsCount.forEach(function (value, i) {
      sum += value
    })
    let echartData = [
      {
        value: 36,
        name: '微课类'
      }, {
        value: 20,
        name: '教案类'
      }, {
        value: 16,
        name: '试题类'
      }, {
        value: 10,
        name: '课件类'
      }, {
        value: 9,
        name: '素材类'
      }, {
        value: 9,
        name: '其他'
      }
    ]
    this.setState({
      option: {
        color: ['#1890FF', '#2FC25B', '#F04864', '#FACC14', '#8543E0', '#13C2C2'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          align: 'left',
          left: '55%',
          itemWidth: 8,
          y: 'center',
          textStyle: {
            fontSize: '80%',
            color: '#474747'
          },
          style: {
            textAlign: 'left'
          },
          data: echartsLabel,
          formatter: function (name) {
            var index = 0
            echartsLabel.forEach(function (value, i) {
              if (value === name) {
                index = i
              }
            })
            return name + ' | ' + (echartsCount[index] / sum * 100).toFixed(2) + '%'
          }
        },
        calculable: true,
        series: [
          {
            name: '资源库',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['25%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                borderWidth: 1, // 置border的宽度有多大
                borderColor: 'white'
              }
            },
            data: echartData
          },
          {// 总计
            name: '',
            type: 'pie',
            radius: ['45%', '45%'],
            center: ['25%', '50%'],
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [{
              value: 0,
              label: {
                formatter: [
                  '{a|下载总数}\n\n' + '{b|' + 70000 + '}'
                ].join('\n'),
                rich: {
                  a: {
                    color: '#999999',
                    fontSize: '100%'
                  },
                  b: {
                    fontSize: '120%',
                    color: '#474747',
                    fontWeight: 'bold'
                  }
                }
              },
              tooltip: {
                show: false
              }
            }]
          }
        ]
      }
    })
  }
  render () {
    return (
      <Echarts options={this.state.option} />
    )
  }
}
export default withRouter(HomeSrcLibEcharts)
