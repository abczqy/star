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
        startTime: '',
        endTime: '',
        infoPer: '',
        keywords: ''
      },
      pagination,
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
            <a href={ajaxUrl.IMG_BASE_URL + '/' + text} target='_blank'>
              <Icon type='link' />
            </a>
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
      startTime,
      endTime,
      infoPer,
      keywords
    } = this.state.reqParam
    // 最后都要赋空
    return {
      pageNum: this.state.pagination.pageNum,
      pageSize: this.state.pagination.pageSize,
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

  /**
   * 设置state中的时间属性
   */
  setDateState = (field, val) => {
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        [field]: val ? val.format('YYYY-MM-DD') : ''
      }
    })
  }

  /**
   * 开始时间-选择器-点击回调
   */
  onStartChange = (val) => {
    // console.log(`val: ${val.format('YYYY-MM-DD')}`)
    this.setDateState('startTime', val)
  }

  /**
   * 结束时间-选择器-点击回调
   */
  onEndChange = (val) => {
    this.setDateState('endTime', val)
  }

  /**
   * 当Input的值变化时回调
   */
  onInputChange = (e) => {
    console.log(`有 onchange函数 ${this.Obj2String(e.target.value)}`)
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        keywords: e.target.value
      }
    })
  }

  /**
   * 搜索-按钮-点击回调
   */
  onSearch = () => {
    // 需要对state.reqParam中的startTime和endTime进行校验-两个必须同时为空或者存在
    // 刷新表格
    this.getTableDatas()
  }

  /**
   * pageSize 变化时回调
   */
  onShowSizeChange = (current, size) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNum: current,
        pageSize: size
      }
    }, () => {
      this.getTableDatas()
    })
  }

  /**
   * 页码变化时回调
   */
  pageNumChange = (page, pageSize) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNum: page
      }
    }, () => {
      this.getTableDatas()
    })
  }

  componentDidMount () {
    this.getTableDatas()
  }

  render () {
    const { tableData, pagination } = this.state
    return (
      <div className='software-wrap'>
        <PublicInfoBar
          onBtn1Click={this.onBatchDel}
          onBtn2Click={this.onSearch}
          onStartChange={this.onStartChange}
          onEndChange={this.onEndChange}
          onInputChange={this.onInputChange}
        />
        <BlankBar />
        <Table
          columns={this.getColumns()}
          dataSource={tableData.data}
          pagination={{
            ...pagination,
            total: this.state.tableData.total,
            onShowSizeChange: this.onShowSizeChange,
            onChange: this.pageNumChange
          }}
          rowSelection={{
            onChange: this.rowSelectChange
          }}
        />
      </div>
    )
  }
}

export default withRouter(PublicInfo)
