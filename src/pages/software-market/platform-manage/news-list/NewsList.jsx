/**
 * 平台管理-新闻列表
 */
import React, { Component } from 'react'
import { Table, Divider } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ajaxUrl from 'config'
import { BlankBar, NewsBar } from 'components/software-market'

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
  title: '新闻标题',
  dataIndex: 'news_title',
  key: 'news_title'
}, {
  title: '新闻描述',
  dataIndex: 'news_desc',
  key: 'news_desc'
}, {
  title: '上传时间',
  dataIndex: 'news_time',
  key: 'news_time'
}, {
  title: '新闻图片',
  dataIndex: 'news_img',
  key: 'news_img',
  render: (text, record, index) => (
    <img src={text} />
  )
}, {
  title: '操作',
  dataIndex: 'options',
  key: 'options',
  render: (text, record, index) => {
    return (
      <span>
        <Link to='/software-market-home/platform-manage/news-list-edit' >编辑</Link>
        <Divider type='vertical' />
        <a href='javascript:void(0)' onClick={() => alert('详情')}>删除</a>
      </span>
    )
  }
}]

class NewsList extends Component {
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
    axios.post(ajaxUrl.newsList, {
      params: {
        pageNum: 1,
        pageSize: 10
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
      // 给每一条表格数据加上key
      // data.list.map((item, index) => {
      //   this.setState({
      //     tableData: {
      //       data[index].key: item.news_id
      //     }
      //   })
      // })
    }).catch((e) => { console.log(e) })
  }

  componentDidMount () {
    this.getTableDatas()
  }
  render () {
    const { tableData } = this.state
    return (
      <div className='software-wrap'>
        <NewsBar />
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

export default NewsList
