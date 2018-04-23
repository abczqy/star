/**
 * 平台管理-新闻列表
 */
import React, { Component } from 'react'
import { Table, Divider, Icon } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ajaxUrl from 'config'
import { BlankBar, PublicInfoBar } from 'components/software-market'

/**
   * 表格分页器设置-默认值
   */
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true
  // text: '' // 用来赋空翻页后的search框--需要这样吗
}

/**
 * 表格的columns -- 后面用json文件配置出去 --参照bdq
 * 做到配置项与组件的分离
 * 组件要用时只需要引入即可
 * 这里的key值什么的 最后肯定是要和后台数据字典对对齐的
 * 这些函数都是测试阶段的，后面正式的函数 放在组件class内部
 */
const columns = [{
  title: '信息标题',
  dataIndex: 'info_title',
  key: 'info_title'
}, {
  title: '发布者',
  dataIndex: 'info_per',
  key: 'info_per'
}, {
  title: '上传时间',
  dataIndex: 'info_time',
  key: 'info_time'
}, {
  title: '附件',
  dataIndex: 'info_id',
  key: 'info_id',
  render: (text, record, index) => {
    return (
      <Icon type='link' />
    )
  }
}, {
  title: '操作',
  dataIndex: 'options',
  key: 'options',
  render: (text, record, index) => {
    return (
      <span>
        <Link to='/software-market-home/platform-manage/public-info-edit'>编辑</Link>
        <Divider type='vertical' />
        <a href='javascript:void(0)' onClick={() => alert('详情')}>删除</a>
      </span>
    )
  }
}]

class PublicInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      }
    }
  }

  /**
   * 获取新闻列表中的数据
   */
  getTableDatas = () => {
    axios.get(ajaxUrl.information, {
      params: {
        pageNum: 1,
        pageSize: 10,
        province: '四川省',
        city: '成都市',
        county: '青羊区'
      }
    }).then((res) => {
      const data = res.data
      // console.log(`data: ${JSON.stringify(data)}`)
      this.setState({
        tableData: {
          data: data.list,
          total: data.total
        }
      })
      // 给每一条记录加上key值
    }).catch((e) => { console.log(e) })
  }

  componentDidMount () {
    this.getTableDatas()
  }
  render () {
    const { tableData } = this.state
    return (
      <div className='software-wrap'>
        <PublicInfoBar />
        <BlankBar />
        <Table
          columns={columns}
          dataSource={tableData.data}
          pagination={pagination}
        />
      </div>
    )
  }
}

export default PublicInfo
