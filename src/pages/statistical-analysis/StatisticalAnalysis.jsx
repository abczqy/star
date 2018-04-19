/**
 * 统计分析页面
 */

import React, {Component} from 'react'
import './StatisticalAnalysis.scss'
import { Row, Col, Card, Select, DatePicker, Button } from 'antd'
import Echarts from '../../components/common/Echarts'

class StatisticalAnalysis extends Component {
  getOption () {
    return {
      title: {
        text: '堆叠区域图'
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
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
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
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {}},
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
  }
  render () {
    return (
      <div className='statistical-analysis'>
        <Row>
          <Col span={24}>
            <Card title='统计分析'>
              <Row>
                <Select style={{width: '200px', marginRight: '15px'}} defaultValue='jack'>
                  <Select.Option value='jack'>Jack</Select.Option>
                  <Select.Option value='jack1'>Jack</Select.Option>
                </Select>
                <DatePicker style={{width: '200px', marginRight: '15px'}} />
                <Button type='primary'>搜索</Button>
              </Row>
              <Row>
                <div style={{border: '1px solid #E4E4E4', height: '300px', marginTop: '10px'}}>
                  <Echarts options={this.getOption()} />
                </div>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row style={{marginTop: '10px'}}>
          <Col span={24}>
            <Card title='统计分析'>
              <Row type='flex' justify='space-around' align='middle'>
                <Col span={11}>
                  <div style={{border: '1px solid #E4E4E4', height: '300px'}}>应用类型占比</div>
                </Col>
                <Col span={11}>
                  <div style={{border: '1px solid #E4E4E4', height: '300px'}}>当月应用下载型占比</div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default StatisticalAnalysis
