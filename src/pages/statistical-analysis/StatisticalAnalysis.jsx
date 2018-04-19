/**
 * 统计分析页面
 */

import React, {Component} from 'react'
import './StatisticalAnalysis.scss'
import { Row, Col, Card, Select, DatePicker, Button } from 'antd'
import Echarts from '../../components/common/Echarts'
import getEchartsOptions from 'utils/getEchartsOptions'

class StatisticalAnalysis extends Component {
  render () {
    return (
      <div className='statistical-analysis center-view mtb20'>
        <Card title='统计分析' bordered={false}>
          <div>
            <Select defaultValue='jack'>
              <Select.Option value='jack'>Jack</Select.Option>
              <Select.Option value='jack1'>Jack</Select.Option>
            </Select>
            <DatePicker />
            <Button type='primary'>搜索</Button>
          </div>
          {/* 软件下载量变化折线图 */}
          <div className='echart-box' >
            <Echarts options={getEchartsOptions({}, 'area-stack', '软件下载量变化')} />
          </div>
        </Card>
        <Card title='统计分析' bordered={false}>
          <Row gutter={24}>
            {/* 应用类型占比 */}
            <Col span={12}>
              <div className='echart-box' >
                <Echarts options={getEchartsOptions({}, 'pie-doughnut', '应用类型占比')} />
              </div>
            </Col>
            {/* 当月应用下载型占比 */}
            <Col span={12}>
              <div className='echart-box' >
                <Echarts options={getEchartsOptions({}, 'pie-doughnut', '当月应用下载型占比')} />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

export default StatisticalAnalysis
