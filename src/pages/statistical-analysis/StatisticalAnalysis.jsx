/**
 * 统计分析页面
 */

import React, { Component } from 'react'
import './StatisticalAnalysis.scss'
import { Row, Col, Card, DatePicker, Button, Select } from 'antd'
import axios from 'axios'
import _ from 'lodash'
import ajaxUrl from 'config'
import Echarts from '../../components/common/Echarts'
import getEchartsOptions from '../../utils/getEchartsOptions'

const Option = Select.Option

class StatisticalAnalysis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      downloadLineData: {}, // 软件下载量变化
      appTypeRadioData: [], // 应用类型占比
      downloadTypeRadioData: [], // 当月应用下载型占比
      allAppCode: []// 所有应用码表
    }
    // 记录两个搜索条件，日期范围和选择的应用id
    this.dateRange = {
      startDate: '',
      endDate: ''
    }
    this.appCode = ''
  }

  // 日期变动
  dateChange = (date, dateString) => {
    console.log(date, dateString)
    this.dateRange = {
      startDate: dateString[0],
      endDate: dateString[1]
    }
  }

  // 搜索
  search = () => {
    console.log('搜索', this.dateRange, this.appCode)
    this.getDownloadLineData({
      time1: this.dateRange.startDate,
      time2: this.dateRange.endDate,
      sw_id: this.appCode
    })
  }

  // 软件下载量变化-折线图
  getDownloadLineData=(params) => {
    axios.post(ajaxUrl.softwareDownload, {
      time1: '',
      time2: '',
      sw_id: '',
      ...params
    }).then(res => {
      console.log(res.data)
      let data = res.data.data
      let targetData = {
        xAxis: [], // 横坐标
        data: [{
          name: '下载量',
          value: [] // 下载量
        }]
      }
      if (data && data.length > 0) {
        data.forEach((item, index) => {
          targetData.xAxis.push(item.SHIJIAN)
          targetData.data[0].value.push(item.NUM)
        })
      }
      this.setState({
        downloadLineData: targetData
      })
    }).catch(e => { console.log(e) })
  }

  // 应用类型占比-扇形图
  getAppTypeRadioData=() => {
    axios.post(ajaxUrl.softwareType, {}).then(res => {
      console.log(res.data)
      this.setState({
        appTypeRadioData: res.data.data
      })
    }).catch(e => { console.log(e) })
  }

  // 当月应用下载型占比-扇形图
  getDownloadTypeRadioData=() => {
    axios.post(ajaxUrl.softwareDownloadConst, {}).then(res => {
      console.log(res.data)
      this.setState({
        downloadTypeRadioData: res.data.data
      })
    }).catch(e => { console.log(e) })
  }

  // 获取统计分析全部软件下拉列表
  getAllApps=() => {
    axios.post(ajaxUrl.getAllAppCode, {}).then(res => {
      console.log(res.data)
      this.setState({
        allAppCode: res.data.data
      })
    }).catch(e => { console.log(e) })
  }

  // 应用选择
  appChange = (value) => {
    console.log(`selected ${value}`)
    this.appCode = value
  }

  componentDidMount () {
    // 软件下载量变化
    this.getDownloadLineData()
    // 应用类型占比
    this.getAppTypeRadioData()
    // 当月应用下载型占比
    this.getDownloadTypeRadioData()
    // 获取统计分析全部软件下拉列表
    this.getAllApps()
  }

  render () {
    const { downloadLineData, appTypeRadioData, downloadTypeRadioData, allAppCode } = this.state
    return (
      <div className='statistical-analysis center-view mtb20'>
        <Card title='统计分析' bordered={false}>
          <div>
            <Select onChange={this.appChange} placeholder='请选择应用' >
              {
                allAppCode.map((item, index) => (
                  <Option key={item.sw_id} >{item.sw_name}</Option>
                ))
              }
            </Select>
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
