/**
 * 平台管理-新闻列表
 */
import React, { Component } from 'react'
import { Table, Divider, message, Modal } from 'antd'
import { Link, withRouter } from 'react-router-dom'
// import PropsTypes from 'prop-types'
// import ajaxUrl from 'config'
import {
  getV2NewsList,
  delV2NewsList
} from 'services/software-manage'
import { BlankBar, NewsBar } from 'components/software-market'
import './NewsList.scss'
import config from '../../../../config/index'
const {IMG_BASE_URL_V2} = config
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

class NewsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      pagination,
      reqParam: {
        pageNum: 1,
        pageSize: 10,
        startTime: '',
        endTime: '',
        keywords: ''
      },
      rowKeys: [],
      batchLeadParams: {
        idArrs: ''
      },
      visible: false,
      showImg: ''
    }
  }

  escape2Html = (text) => {
    let arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'}
    return text.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t] })
  }

  getColumns = () => {
    return (
      [{
        title: '新闻标题',
        dataIndex: 'contentTitle',
        key: 'contentTitle',
        width: '20%',
        render: (text, record, index) => {
          return (
            <span className='desc-box'>{text}</span>
          )
        }
      }, {
        title: '新闻描述',
        width: 300,
        dataIndex: 'content',
        key: 'content',
        render: (text, record, index) => {
          return (
            <span className='desc-box'>{this.escape2Html(text)}</span>
          )
        }
      }, {
        title: '上传时间',
        width: 300,
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: (text, record, index) => {
          return (
            <span className='desc-box'>{this.dateToString(text)}</span>
          )
        }
      }, {
        title: '新闻图片',
        dataIndex: 'picUrl',
        key: 'picUrl',
        width: '10%',
        render: (text, record, index) =>
          text ? <img className='img-table-box' src={IMG_BASE_URL_V2 + text} style={{cursor: 'pointer'}} onClick={() => this.showImg(text)} /> : '无'
      }, {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        render: (text, record, index) => {
          return (
            <span>
              <Link to={{pathname: '/software-market-home/platform-manage/news-list-edit', search: '?' + record.id}}>编辑</Link>
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
      title: '确认删除本条新闻？',
      onOk () {
        delV2NewsList({list: record.id}, (res) => {
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
    // 这里需要一个函数-satrtTime和endTime不能有一个为空 - 在搜索这个动作下
    // 所以校验肯定不使加在这里的
    // 最后都要赋空
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
    getV2NewsList(this.getParams(), (res) => {
      const data = res.data
      // console.log(`data: ${JSON.stringify(data)}`)
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
      title: '确认删除选中的新闻？',
      onOk () {
        if (idArrs) {
          delV2NewsList({list: idArrs}, (res) => {
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
    console.log(selectedRowKeys)
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
  /** 查看图片大图 */
  showImg = (text) => {
    const url = IMG_BASE_URL_V2 + text
    Modal.info({
      content: <img src={url} style={{ width: 800, height: 'auto' }} />,
      width: 940,
      icon: ' ',
      okText: '确认'
    })
  }

  componentDidMount () {
    this.getTableDatas()
  }
  render () {
    const { tableData, pagination } = this.state
    return (
      <div className='software-wrap list-wrap'>
        <NewsBar
          onBtn2Click={this.onSearch}
          onBtn1Click={this.onBatchDel}
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
            onChange: this.pageNumChange,
            showTotal: () => `总共有  ${tableData.total} 条数据`
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

// NewsList.propTypes = {
//   history: PropsTypes.array
// }

// export default withRouter(NewsList)
export default withRouter(NewsList)
