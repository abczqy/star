/**
 * 平台管理-新闻列表
 */
import React, { Component } from 'react'
import { Table, Divider, Icon, message, Modal } from 'antd'
import { Link, withRouter } from 'react-router-dom'
// import ajaxUrl from 'config'
import {
  getV2PubInfoList,
  delV2PubInfoList
} from 'services/software-manage'
import { BlankBar, PublicInfoBar } from 'components/software-market'
import config from '../../../../config/index'
const {DOC_BASE_URL_V2} = config
const confirm = Modal.confirm

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
      rowKeys: [],
      pagination,
      batchLeadParams: {
        idArrs: ''
      }
    }
  }

  getColumns = () => {
    return (
      [{
        title: '信息标题',
        dataIndex: 'contentTitle',
        key: 'contentTitle'
      }, {
        title: '发布者',
        dataIndex: 'userName',
        key: 'userName',
        render: (text, record, index) => {
          return (
            text ? <span>{text}</span> : '无'
          )
        }
      }, {
        title: '上传时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: (text, record, index) => {
          return (
            <span>{this.dateToString(text)}</span>
          )
        }
      }, {
        title: '附件',
        dataIndex: 'fileUrl',
        key: 'fileUrl',
        render: (text, record, index) => {
          return (
            <a href={DOC_BASE_URL_V2 + text} target='_blank'>
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
              <Link to={{pathname: '/software-market-home/platform-manage/public-info-edit', search: '?' + record.id}}>编辑</Link>
              <Divider type='vertical' />
              <a href='javascript:void(0)' onClick={(e) => this.showConfirm(record)}>删除</a>
            </span>
          )
        }
      }]
    )
  }
  /** 格式化时间 */
  dateToString = (date) => {
    var d = new Date(date)
    var times = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    return times
  }
  /** 转换为时间戳 */
  stringToDate = (val, type) => {
    let nowTime = ''
    if (type === 0) {
      nowTime = val + ' 00:00:00'
    } else if (type === 1) {
      nowTime = val + ' 23:59:59'
    }
    const thisTime = nowTime.replace(/-/g, '/')
    const time = new Date(thisTime)
    return time.getTime()
  }
  /**
   * 删除确认框
   */
  showConfirm (record) {
    let that = this
    confirm({
      title: '确认删除本条信息？',
      onOk () {
        delV2PubInfoList({list: record.id}, (res) => {
          // 刷新下列表数据 -- 因为异步的关系 代码书写顺序并不是执行顺序
          that.getTableDatas()
        })
      },
      onCancel () {
      }
    })
  }
  /**
   * 构建请求参数
   */
  getParams = () => {
    const {
      startTime,
      endTime,
      keywords
    } = this.state.reqParam
    return {
      pageNum: this.state.pagination.pageNum,
      pageSize: this.state.pagination.pageSize,
      startDate: startTime || null,
      endDate: endTime || null,
      content: keywords || null
    }
  }

  /**
   * 获取新闻列表中的数据
   */
  getTableDatas = () => {
    getV2PubInfoList(this.getParams(), (res) => {
      const data = res.data
      this.setState({
        tableData: {
          data: data.data.info,
          total: data.data.total
        }
      })
    })
  }

  /**
   * 批量删除确认框
   */
  onBatchDel = () => {
    const { idArrs } = this.state.batchLeadParams
    let that = this
    confirm({
      title: '确认删除选中的信息？',
      onOk () {
        if (idArrs) {
          delV2PubInfoList({list: idArrs}, (res) => {
            if (res.data.code === 200) {
              message.success('删除成功')
              that.setState({
                batchLeadParams: {idArrs: ''},
                rowKeys: []
              })
              that.getTableDatas()
            } else {
              message.warn(res.data.msg)
            }
          })
        } else {
          message.info('请选择数据')
        }
      },
      onCancel () {
      }
    })
  }

  /**
   * 多选选项变化
   */
  rowSelectChange = (selectedRowKeys, selectedRows) => {
    // 从view中得到数据 并把th_id提取出来组合为一个新数组
    let idArr = ''
    selectedRows.map((val, index) => {
      if (idArr === '') {
        idArr = val.id
      } else {
        idArr += ',' + val.id
      }
    })
    // 将th_id得到的新数组映射到state中
    this.setState({
      batchLeadParams: {
        idArrs: idArr
      },
      rowKeys: selectedRowKeys
    })
  }

  /**
  * 开始时间-选择器-点击回调
  */
 onStartChange = (val) => {
   this.setState({
     reqParam: {
       ...this.state.reqParam,
       startTime: val ? this.stringToDate(val.format('YYYY-MM-DD'), 0) : ''
     }
   })
 }

 /**
  * 结束时间-选择器-点击回调
  */
 onEndChange = (val) => {
   this.setState({
     reqParam: {
       ...this.state.reqParam,
       endTime: val ? this.stringToDate(val.format('YYYY-MM-DD'), 1) : ''
     }
   })
 }

  /**
   * 当Input的值变化时回调
   */
  onInputChange = (e) => {
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
            selectedRowKeys: this.state.rowKeys,
            onChange: this.rowSelectChange
          }}
        />
      </div>
    )
  }
}

export default withRouter(PublicInfo)
