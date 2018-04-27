/**
 * 根据传入的数据，生产不同的echarts options配置对象
 * data 数据           数据
 * type echart的类型   增加类型
 * config 配置项       自行添加配置
 */

const getEchartsOptions = (data, type, title, config) => {
  let options = {}

  switch (type) {
    case 'pie-doughnut':
      let legendDatas = []
      let sum = 0
      data.forEach((item, index) => {
        legendDatas.push(item.name + 'ddd')
        sum += item.value
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
          // formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'middle',
          'icon': 'circle'
        },
        color: ['#f0647e', '#58acfb', '#fad352'], // 配置颜色
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
                '{title|应用总数}',
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
              show: false
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

        // [
        //   {
        //     name: '邮件营销',
        //     type: 'line',
        //     stack: '总量',
        //     areaStyle: {
        //       color: 'rgba(45,183,245,0.5)'
        //     },
        //     smooth: true,
        //     data: [120, 132, 101, 134, 90, 230, 210]
        //   },
        //   {
        //     name: '联盟广告',
        //     type: 'line',
        //     stack: '总量',
        //     areaStyle: { color: 'rgba(178,198,230,0.5)' },
        //     smooth: true,
        //     data: [220, 182, 191, 234, 290, 330, 310]
        //   }
        // ]
      }
      break
    default:
      break
  }
  return options
}

export default getEchartsOptions
