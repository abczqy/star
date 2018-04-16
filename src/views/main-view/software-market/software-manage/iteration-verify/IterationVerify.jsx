/**
 * 还需：
 * 状态有redux管理
 * form的加入
 * 加载状态时的loading状态
 * 公共函数迁徙到组件class内
 * 可选择/多选
 */
import React, { Component } from 'react'
import { Table, Switch, Divider } from 'antd'
import {
  SearchBar,
  BlankBar
} from 'components/software-market'
import 'views/main-view/software-market/software-manage/SoftwareManage.scss'

/**
 * 表格的columns -- 后面用json文件配置出去 --参照bdq
 * 做到配置项与组件的分离
 * 组件要用时只需要引入即可
 * 这里的key值什么的 最后肯定是要和后台数据字典对对齐的
 * 这些函数都是测试阶段的，后面正式的函数 放在组件class内部 父组件也可以调用
 */
const columns = [{
  title: '应用名称',
  dataIndex: 'appName',
  key: 'appName'
}, {
  title: '所属类型',
  dataIndex: 'apptype',
  key: 'apptype'
}, {
  title: '供应商名字',
  dataIndex: 'supplierName',
  key: 'supplierName'
}, {
  title: '类型',
  dataIndex: 'platType',
  key: 'platType'
}, {
  title: '下载次数',
  dataIndex: 'downloadTimes',
  key: 'downloadTimes'
}, {
  title: '变更时间',
  dataIndex: 'changeDate',
  key: 'changeDate'
}, {
  title: '置顶',
  dataIndex: 'stickTop',
  key: 'stickTop',
  render: (text, record, index) => {
    console.log(`
      text: ${text} \n
      record: ${record} \n
      index: ${index}
      `)
    return (
      <Switch />
    )
  }
}, {
  title: '缴费状态',
  dataIndex: 'payState',
  key: 'payState'
}, {
  title: '操作',
  dataIndex: 'options',
  key: 'options',
  render: (text, record, index) => {
    console.log(`
      text: ${text} \n
      record: ${record} \n
      index: ${index}
      `)
    return (
      <span>
        <a href='javascript:void(0)' onClick={() => alert('续费')}>续费</a>
        <Divider type='vertical' />
        <a href='javascript:void(0)' onClick={() => alert('详情')}>详情</a>
        <Divider type='vertical' />
        <a href='javascript:void(0)' onClick={() => alert('下架')}>下架</a>
      </span>
    )
  }
}]

/**
 * getTime 获得当天时间
 * 测试用的函数
 */
const getTime = () => {
  const day = new Date()
  return `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
}

/**
 * dataSource -- 可以先用假数据 后期肯定是要用设计专门的函数组合去从数据库导入
 * 这里呢，我们用一个假数据生成器-利用函数的循环能力造出一个datasource来 -- 当然这个是做测试用的
 * 后面也可以抽象到测试用的工具中-utils/testUtils
 * @param {int} length dataSource中数据的条数 默认值是25
 */
const getDataSourceForTest = (length) => {
  const count = length || 25
  let dataSource = []
  for (let i = 0; i < count; i++) {
    dataSource.push({
      key: i,
      appName: '今日笔记',
      apptype: '教育类',
      supplierName: '杭州迅龙科技',
      platType: 'windows32',
      downloadTimes: Math.ceil(Math.random() * 1000),
      changeDate: getTime(),
      payState: <span style={{ color: '#0f0' }}>正常</span>
    })
  }
  return dataSource
}

class IterationVerify extends Component {
  /**
   * 表格分页器设置-默认值
   */
  pagination = {
    defaultCurrent: 1,
    showQuickJumper: true,
    showSizeChanger: true
  }

  render () {
    return (
      <div className='software-manage-wrap'>
        <SearchBar />
        <BlankBar />
        <Table
          columns={columns}
          dataSource={getDataSourceForTest()}
          pagination={{ ...this.pagination }}
        />
      </div>
    )
  }
}

export default IterationVerify
