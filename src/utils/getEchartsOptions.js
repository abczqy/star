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
          x: 'right',
          y: 'middle',
          data: ['直接访问', '邮件营销', '联盟广告']
        },
        color: ['#f0647e', '#58acfb', '#fad352'],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' }
            ]
          }
        ]
      }
      break
    case 'area-stack':
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
          data: ['邮件营销', '联盟广告'],
          x: 'right',
          selectedMode: false
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        color: ['#2db7f5', '#808bc6'],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {
              color: 'rgba(45,183,245,0.5)'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: { color: 'rgba(178,198,230,0.5)' },
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      }
      break
    default:
      break
  }
  return options
}

export default getEchartsOptions
