/**
 * 统计分析页面
 */

import React, { Component } from 'react'
import moment from 'moment'
import './StatisticalAnalysis.scss'
import { Row, Col, Card, DatePicker, Button, Select } from 'antd'
import _ from 'lodash'
import Empty from '../../components/common/Empty'
import Echarts from '../../components/common/Echarts'
import getEchartsOptions from '../../utils/getEchartsOptions'
import {softwareCollect, softwareDownload, softwareType, softwareDownloadConst, getAllAppCode} from '../../services/software-market/index'

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
    console.log('搜索', this.dateRange, this.appCode)
    // if(this.appCode)
    this.getDownloadLineData({
      // userId: '1',
      startTime: this.dateRange.startDate || '',
      endTime: this.dateRange.endDate || '',
      appId: this.appCode || ''
    })
  }

  // 软件下载量变化-折线图
  getDownloadLineData=(params) => {
    softwareDownload({
      ...params
    }, (res) => {
      if (res.data.code === 200) {
        // console.log('软件下载量变化-折线图', res.data.data)
        let dataDownload = res.data.data
        if (dataDownload && dataDownload.length > 0) {
          let targetData = {
            xAxis: [], // 横坐标
            data: [{
              name: '下载量',
              value: [] // 下载量
            }]
          }
          dataDownload.forEach((item, index) => {
            targetData.xAxis.push(item.MONTH)
            targetData.data[0].value.push(item.COUNT)
          })
          // console.log('seriesdata:', targetData)
          this.setState({
            downloadLineData: targetData
          })
        }
      } else {
        console.log('获取软件下载量变化出现异常', res.data.msg || '')
      }
    })

    softwareCollect({
      ...params
    }, (res) => {
      if (res.data.code === 200) {
        // console.log('软件收藏量变化-折线图', res.data.data)
        let dataCollect = res.data.data
        if (dataCollect && dataCollect.length > 0) {
          let targetData = this.state.downloadLineData
          if (targetData.data instanceof Array) {
            targetData.data.push({
              name: '收藏量',
              value: [] // 收藏量
            })
            dataCollect.forEach((item, index) => {
              targetData.data[1].value.push(item.COUNT)
            })
          }
          // console.log('seriesdata:', targetData)
          this.setState({
            downloadLineData: targetData
          })
        }
      } else {
        console.log('获取软件收藏量变化出现异常', res.data.msg || '')
      }
    })
  }

  // 应用类型占比-扇形图
  getAppTypeRadioData=() => {
    softwareType({
      // userId: '1'
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
    softwareDownloadConst({
      startTime: moment(new Date()).format('YYYY-MM')
      // userId: '1'
    }, (res) => {
      if (res.data.code === 200) {
        console.log('当月应用下载型占比', res.data.data)
        let data = res.data.data
        data.map((item) => {
          item.value = item.COUNT
          item.name = item.APP_TYPE_NAME
        })
        if (data && data.length > 0) {
          this.setState({
            downloadTypeRadioData: data
          })
        }
      } else {
        console.log('获取当月应用出现异常：', res.data.msg || '')
      }
    })
  }

  // 获取统计分析全部软件下拉列表
  getAllApps=() => {
    getAllAppCode({
      // userId: '1'
    }, (res) => {
      if (res.data.code === 200) {
        // console.log('全部软件下拉列表', res.data.data)
        let data = res.data.data
        if (data && data.length > 0) {
          this.setState({
            allAppCode: data
          })
        }
      } else {
        console.log('获取全部软件下载列表失败：', res.data.msg || '')
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
                allAppCode && allAppCode.map((item, index) => (
                  <Option key={index} value={item.APP_ID} >{item.APP_NAME}</Option>
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
                    : <Echarts options={getEchartsOptions(downloadTypeRadioData, 'pie-doughnut', '当月应用下载类型占比', {}, '下载总数')} />
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
