/**
 * 统计分析页面
 */

import React, { Component } from 'react'
import './StatisticalAnalysis.scss'
import { Row, Col, Card, DatePicker, Button } from 'antd'
import axios from 'axios'
import _ from 'lodash'
import ajaxUrl from 'config'
import Echarts from '../../components/common/Echarts'
import getEchartsOptions from '../../utils/getEchartsOptions'

class StatisticalAnalysis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      downloadLineData: {},
      appTypeRadioData: [],
      downloadTypeRadioData: []
    }
    this.dateRange = {
      startDate: '',
      endDate: ''
    }
  }

  dateChange = (date, dateString) => {
    console.log(date, dateString)
    this.dateRange = {
      starDate: dateString[0],
      endDate: dateString[1]
    }
  }

  // 搜索
  search = () => {
    console.log('搜索', this.dateRange)
  }

  // 软件下载量变化
  getDownloadLineData=() => {
    axios.post(ajaxUrl.softwareDownload, {}).then(res => {
      console.log(res.data)
      this.setState({
        downloadLineData: res.data
      })
    }).catch(e => { console.log(e) })
  }

  // 应用类型占比
  getAppTypeRadioData=() => {
    axios.post(ajaxUrl.softwareType, {}).then(res => {
      console.log(res.data)
      this.setState({
        appTypeRadioData: res.data.data
      })
    }).catch(e => { console.log(e) })
  }

  // 当月应用下载型占比
  getDownloadTypeRadioData=() => {
    axios.post(ajaxUrl.softwareDownloadConst, {}).then(res => {
      console.log(res.data)
      this.setState({
        downloadTypeRadioData: res.data.data
      })
    }).catch(e => { console.log(e) })
  }

  componentDidMount () {
    // 软件下载量变化
    this.getDownloadLineData()
    // 应用类型占比
    this.getAppTypeRadioData()
    // 当月应用下载型占比
    this.getDownloadTypeRadioData()
  }

  render () {
    const { downloadLineData, appTypeRadioData, downloadTypeRadioData } = this.state
    return (
      <div className='statistical-analysis center-view mtb20'>
        <Card title='统计分析' bordered={false}>
          <div>
            <DatePicker.RangePicker onChange={this.dateChange} />
            <Button type='primary' onClick={this.search} >搜索</Button>
          </div>
          {/* 软件下载量变化折线图 */}
          <div className='echart-box' >
            {
              _.isEmpty(downloadLineData)
                ? ''
                : <Echarts options={getEchartsOptions(downloadLineData, 'area-stack', '软件下载量变化')} />
            }

          </div>
        </Card>
        <Card title='统计分析' bordered={false}>
          <Row gutter={24}>
            {/* 应用类型占比 */}
            <Col span={12}>
              <div className='echart-box' >
                {
                  _.isEmpty(appTypeRadioData)
                    ? ''
                    : <Echarts options={getEchartsOptions(appTypeRadioData, 'pie-doughnut', '应用类型占比')} />
                }

              </div>
            </Col>
            {/* 当月应用下载型占比 */}
            <Col span={12}>
              <div className='echart-box' >
                {
                  _.isEmpty(downloadTypeRadioData)
                    ? ''
                    : <Echarts options={getEchartsOptions(downloadTypeRadioData, 'pie-doughnut', '当月应用下载型占比')} />
                }
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

export default StatisticalAnalysis
