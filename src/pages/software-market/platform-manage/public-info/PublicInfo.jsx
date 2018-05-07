/**
 * 平台管理-新闻列表
 */
import React, { Component } from 'react'
import { Table, Divider, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import ajaxUrl from 'config'
import {
  getPubInfoList,
  delPubInfoList,
  delBatchPubInfoList
} from 'services/software-manage'
import { addKey2TableData } from 'utils/utils-sw-manage'
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

class PublicInfo extends Component {
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
        infoPer: '',
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
        dataIndex: 'info_attachment',
        key: 'info_attachment',
        render: (text, record, index) => {
          return (
            <a href={ajaxUrl.IMG_BASE_URL + '/' + text} target='_blank'><Icon type='link' /></a>
          )
        }
      }, {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        render: (text, record, index) => {
          return (
            <span>
              <Link to={{pathname: '/software-market-home/platform-manage/public-info-edit', search: '?' + record.info_id}}>编辑</Link>
              <Divider type='vertical' />
              <a href='javascript:void(0)' onClick={(e) => this.delNews(record)}>删除</a>
            </span>
          )
        }
      }]
    )
  }

  /**
   * 删除某条
   */
  delNews = (record) => {
    // console.log(`record.info_id: ${record.info_id}`)
    delPubInfoList({info_id: record.info_id}, (res) => {
      // 刷新下列表数据 -- 因为异步的关系 代码书写顺序并不是执行顺序
      this.getTableDatas()
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
      infoPer,
      keywords
    } = this.state.reqParam
    // 最后都要赋空
    return {
      pageNum: pageNum || 1,
      pageSize: pageSize || 15,
      start_time: startTime || '',
      end_time: endTime || '',
      info_per: infoPer || '',
      keywords: keywords || ''
    }
  }

  /**
   * 获取新闻列表中的数据
   */
  getTableDatas = () => {
    getPubInfoList(this.getParams(), (res) => {
      const data = res.data
      // console.log(`data: ${JSON.stringify(data)}`)
      this.setState({
        tableData: {
          data: data.list && addKey2TableData(data.list, 'info_id'),
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
    delBatchPubInfoList({info_id: idArrs}, (res) => {
      // 刷新下列表数据
      this.getTableDatas()
      console.log(`${res.data.info}`)
    })
  }

  /**
   * 多选选项变化
   */
  rowSelectChange = (selectedRowKeys, selectedRows) => {
    // 从view中得到数据 并把th_id提取出来组合为一个新数组
    let idArr = []
    selectedRows.map((val, index) => {
      idArr.push(val.info_id)
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
      <div className='software-wrap'>
        <PublicInfoBar
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

export default withRouter(PublicInfo)
