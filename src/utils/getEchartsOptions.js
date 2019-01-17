/**
 * 根据传入的数据，生产不同的echarts options配置对象
 * data 数据           数据
 * type echart的类型   增加类型
 * config 配置项       自行添加配置
 * totalName 环形图需要在中间显示总数信息时，要显示的标题(如果有需要) 例如下载占比图，totalName为“下载总数”
 */

import _ from 'lodash'

const getEchartsOptions = (data, type, title, config, totalName) => {
  let options = {}

  switch (type) {
    case 'pie-doughnut':
      // 自定义图例数据 计算各项百分比
      let legendDatas = _.cloneDeep(data)
      let sum = 0
      data.forEach((item, index) => {
        sum += item.value
      })
      data.forEach((item, index) => {
        legendDatas[index].value = `${item.name} ${((item.value / sum) * 100).toFixed(0)}%`
      })
      options = {
        title: {
          text: title,
          textStyle: {
            fontWeight: 'normal',
            fontSize: '16',
            fontFamily: '微软雅黑'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'middle',
          right: 20,
          'icon': 'circle',
          formatter: (name) => { // 自定义图例 显示各项占比
            let leng = ''
            legendDatas.forEach((item, i) => {
              if (name === item.name) {
                leng = item.value
              }
            })
            return leng
          }
        },
        color: ['#f0647e', '#58acfb', '#fad352', '#38dd48', '#ac3cdd', '#ffa54b', '#ff48a3', '#dd251a'], // 配置颜色
        series: [{
          name: title,
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          hoverOffset: 0,
          hoverAnimation: false,
          label: {
            normal: {
              show: true,
              position: 'center',
              color: '#666',
              formatter: [
                `{title|${totalName}}`,
                `{num|${sum}}`
              ].join('\n'),
              rich: {
                title: {
                  color: '#999',
                  fontSize: 12
                },
                num: {
                  color: '#333',
                  fontSize: 20,
                  lineHeight: 36
                }
              }
            },
            emphasis: {
              show: true
              // textStyle: {
              //   fontSize: '20',
              //   fontWeight: 'bold'
              // }
            }
          },
          itemStyle: {
            normal: { // 设置环形图断开 其实是背景色的border
              borderWidth: 6,
              borderColor: '#ffffff'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data
        }]
      }
      break
    case 'area-stack':
      let legendDatasLine = []
      let seriesData = []
      data.data.forEach((item, index) => {
        legendDatasLine.push(item.name)
        seriesData.push({
          name: item.name,
          type: 'line',
          stack: '总量',
          areaStyle: {
            color: 'rgba(45,183,245,0.5)'
          },
          smooth: true,
          data: item.value
        })
      })
      options = {
        title: {
          text: title,
          textStyle: {
            fontWeight: 'normal',
            fontSize: '16',
            fontFamily: '微软雅黑'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: legendDatasLine,
          x: 'right',
          icon: 'circle',
          selectedMode: false
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: data.xAxis
        }],
        yAxis: [{
          type: 'value'
        }],
        color: ['#2db7f5', '#808bc6'],
        series: seriesData
      }
      break
    default:
      break
  }
  return options
}

export default getEchartsOptions
