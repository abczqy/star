/**
 * 统计分析页面
 */

import React, { Component } from 'react'
import './StatisticalAnalysis.scss'
import { Row, Col, Card, DatePicker, Button, Select } from 'antd'
import _ from 'lodash'
import Empty from '../../components/common/Empty'
import Echarts from '../../components/common/Echarts'
import getEchartsOptions from '../../utils/getEchartsOptions'
import {softwareDownload, softwareType, softwareDownloadConst, getAllAppCode} from '../../services/software-market/index'

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
    // console.log(date, dateString)
    this.dateRange = {
      startDate: dateString[0],
      endDate: dateString[1]
    }
  }

  // 搜索
  search = () => {
    // console.log('搜索', this.dateRange, this.appCode)
    this.getDownloadLineData({
      startTime: this.dateRange.startDate,
      endTime: this.dateRange.endDate,
      userId: this.appCode || '1'
    })
  }

  // 软件下载量变化-折线图
  getDownloadLineData=(params) => {
    softwareDownload({
      startTime: '',
      endTime: '',
      userId: '',
      ...params
    }, (res) => {
      if (res.data.code === 200) {
        // console.log('软件下载量变化-折线图', res.data.data)
        let data = res.data.data
        if (data && data.length > 0) {
          let targetData = {
            xAxis: [], // 横坐标
            data: [{
              name: '下载量',
              value: [] // 下载量
            }]
          }
          data.forEach((item, index) => {
            targetData.xAxis.push(item.MONTH)
            targetData.data[0].value.push(item.COUNT)
          })
          this.setState({
            downloadLineData: targetData
          })
        }
      } else {
        console.log('获取软件下载量变化出现异常', res.data.msg || '')
      }
    })
  }

  // 应用类型占比-扇形图
  getAppTypeRadioData=() => {
    softwareType({
      userId: '1'
    }, (res) => {
      if (res.data.code === 200) {
        // console.log('应用类型占比', res.data.data)
        let data = res.data.data.slice()
        if (data && data.length > 0) {
          data.map((item, index) => {
            item.name = item.APP_TYPE_NAME
            item.value = item.COUNT
          })
          this.setState({
            appTypeRadioData: data
          })
        }
      } else {
        console.log('应用类型占比出现异常', res.data.msg || '')
      }
    })
  }

  // 当月应用下载型占比-扇形图
  getDownloadTypeRadioData=() => {
    softwareDownloadConst({}, (res) => {
      // console.log(res.data)
      let data = res.data
      if (data && data.length > 0) {
        this.setState({
          downloadTypeRadioData: res.data
        })
      }
    })
  }

  // 获取统计分析全部软件下拉列表
  getAllApps=() => {
    getAllAppCode({}, (res) => {
      // console.log('全部软件下拉列表', res.data)
      let data = res.data
      if (data && data.length > 0) {
        this.setState({
          allAppCode: res.data
        })
      }
    })
  }

  // 应用选择
  appChange = (value) => {
    this.appCode = value
  }

  componentDidMount () {
    this.search()
    // 软件下载量变化
    // this.getDownloadLineData()
    // 应用类型占比
    this.getAppTypeRadioData()
    // 当月应用下载型占比
    this.getDownloadTypeRadioData()
    // 获取统计分析全部软件下拉列表
    this.getAllApps()
  }

  render () {
    const { downloadLineData, appTypeRadioData, downloadTypeRadioData, allAppCode } = this.state
    // console.log(appTypeRadioData, downloadTypeRadioData)
    return (
      <div className='statistical-analysis center-view mtb20'>
        <Card title='统计分析' bordered={false}>
          <div>
            <Select onChange={this.appChange} placeholder='请选择应用' >
              {
                allAppCode.map((item, index) => (
                  <Option key={index} value={item.sw_id} >{item.sw_name}</Option>
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
                ? <Empty style={{'lineHeight': '300px'}} />
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
                    ? <Empty style={{'lineHeight': '300px'}} />
                    : <Echarts options={getEchartsOptions(appTypeRadioData, 'pie-doughnut', '应用类型占比', {}, '应用总数')} />
                }

              </div>
            </Col>
            {/* 当月应用下载型占比 */}
            <Col span={12}>
              <div className='echart-box' >
                {
                  _.isEmpty(downloadTypeRadioData)
                    ? <Empty style={{'lineHeight': '300px'}} />
                    : <Echarts options={getEchartsOptions(downloadTypeRadioData, 'pie-doughnut', '当月应用下载型占比', {}, '下载总数')} />
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
