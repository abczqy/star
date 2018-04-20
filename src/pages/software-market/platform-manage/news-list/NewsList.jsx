/**
 * 平台管理-新闻列表
 */
import React, { Component } from 'react'
import { Table, Divider } from 'antd'
import { BlankBar, NewsBar } from 'components/software-market'

/**
   * 表格分页器设置-默认值
   */
// const pagination = {
//   pageNum: 1,
//   pageSize: 10,
//   showQuickJumper: true,
//   showSizeChanger: true,
//   text: '' // 用来赋空翻页后的search框--需要这样吗
// }

/**
 * 表格的columns -- 后面用json文件配置出去 --参照bdq
 * 做到配置项与组件的分离
 * 组件要用时只需要引入即可
 * 这里的key值什么的 最后肯定是要和后台数据字典对对齐的
 * 这些函数都是测试阶段的，后面正式的函数 放在组件class内部
 */
const columns = [{
  title: '新闻标题',
  dataIndex: 'sw_name',
  key: 'sw_name'
}, {
  title: '新闻描述',
  dataIndex: 'sw_type',
  key: 'sw_type'
}, {
  title: '上传时间',
  dataIndex: 'fa_name',
  key: 'fa_name'
}, {
  title: '新闻图片',
  dataIndex: 'sw_path',
  key: 'sw_path'
}, {
  title: '操作',
  dataIndex: 'options',
  key: 'options',
  render: (text, record, index) => {
    return (
      <span>
        <a href='javascript:void(0)' onClick={() => alert('续费')}>编辑</a>
        <Divider type='vertical' />
        <a href='javascript:void(0)' onClick={() => alert('详情')}>删除</a>
      </span>
    )
  }
}]

class NewsList extends Component {
  render () {
    return (
      <div className='software-wrap'>
        <NewsBar />
        <BlankBar />
        <Table
          columns={columns}
        />
      </div>
    )
  }
}

export default NewsList
