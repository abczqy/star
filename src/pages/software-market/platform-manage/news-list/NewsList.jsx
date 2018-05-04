/**
 * 平台管理-新闻列表
 */
import React, { Component } from 'react'
import { Table, Divider } from 'antd'
import { Link } from 'react-router-dom'
// import PropsTypes from 'prop-types'
import {
  getNewsList,
  delNewsList,
  delBatchNewsList
} from 'services/software-manage'
import { addKey2TableData } from 'utils/utils-sw-manage'
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

class NewsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      reqParam: {
        pageNum: 1,
        pageSize: 15,
        startTime: '',
        endTime: '',
        keywords: ''
      },
      batchLeadParams: {
        idArrs: []
      }
    }
  }

  getColumns = () => {
    return (
      [{
        title: '新闻标题',
        dataIndex: 'news_title',
        key: 'news_title'
      }, {
        title: '新闻描述',
        width: 200,
        dataIndex: 'news_desc',
        key: 'news_desc'
      }, {
        title: '上传时间',
        dataIndex: 'news_time',
        key: 'news_time'
      }, {
        title: '新闻图片',
        dataIndex: 'news_picture',
        key: 'news_picture',
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
              <Link to='/software-market-home/platform-manage/news-list-edit'>编辑</Link>
              <Divider type='vertical' />
              <a href='javascript:void(0)' onClick={(e) => this.delNews(record)}>删除</a>
            </span>
          )
        }
      }]
    )
  }

  /**
   * 删除某条新闻
   */
  delNews = (record) => {
    // console.log(`record.news_id: ${record.news_id}`)
    delNewsList({news_id: record.news_id}, (res) => {
      const data = res.data
      console.log(`${data.info}`)
    })
  }

  /**
   * 构建请求参数
   */
  getParams = () => {
    const {
      pageNum,
      pageSize,
      startTime,
      endTime,
      keywords
    } = this.state.reqParam
    // 最后都要赋空
    return {
      pageNum: pageNum || 1,
      pageSize: pageSize || 15,
      start_time: startTime || '',
      end_time: endTime || '',
      keywords: keywords || ''
    }
  }

  /**
   * 获取新闻列表中的数据
   */
  getTableDatas = () => {
    getNewsList(this.getParams(), (res) => {
      const data = res.data
      // console.log(`data: ${JSON.stringify(data)}`)
      this.setState({
        tableData: {
          data: data.list && addKey2TableData(data.list, 'news_id'),
          total: data.total && data.total
        }
      })
    })
  }

  /**
   * 当点击'批量删除'按钮时的回调
   */
  onBatchDel = () => {
    // 从state中获取实时的th_id数组的值 作为请求参数传给后台
    const { idArrs } = this.state.batchLeadParams
    // console.log(`IdArrs: ${JSON.stringify(idArrs)}`)
    delBatchNewsList({news_id: idArrs}, (res) => {
      console.log(`${res.data.info}`)
      // 刷新下列表数据 -- 因为异步的关系 代码书写顺序并不是执行顺序
      this.getTableDatas()
    })
  }

  /**
   * 多选选项变化
   */
  rowSelectChange = (selectedRowKeys, selectedRows) => {
    // 从view中得到数据 并把th_id提取出来组合为一个新数组
    let idArr = []
    selectedRows.map((val, index) => {
      idArr.push(val.news_id)
    })
    // 将th_id得到的新数组映射到state中
    this.setState({
      batchLeadParams: {
        idArrs: idArr
      }
    })
  }

  componentDidMount () {
    this.getTableDatas()
  }
  render () {
    const { tableData } = this.state
    return (
      <div className='software-wrap list-wrap'>
        <NewsBar
          onBtn1Click={this.onBatchDel}
        />
        <BlankBar />
        <Table
          columns={this.getColumns()}
          dataSource={tableData.data}
          pagination={pagination}
          rowSelection={{
            fixed: true,
            onChange: this.rowSelectChange
          }}
        />
      </div>
    )
  }
}

// NewsList.propTypes = {
//   history: PropsTypes.array
// }

// export default withRouter(NewsList)
export default NewsList
