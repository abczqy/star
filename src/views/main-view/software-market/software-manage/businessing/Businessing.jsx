/**
 * 还需：
 * 状态有redux管理
 * form的加入
 * 加载状态时的loading状态
 * 公共函数迁徙到组件class内
 * 可选择/多选
 * 为了使代码便于移植 尽量使用绝对路径
 * -- 还缺少--search的get数据接口
 */
import React, { Component } from 'react'
import { Table, Switch, Divider } from 'antd'
import { BlankBar, SearchBar } from 'components/software-market'
import ajaxUrl from 'config'
import axios from 'axios'
import 'views/main-view/software-market/SoftwareMarket.scss'

/**
   * 表格分页器设置-默认值
   */
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true,
  text: '' // 用来赋空翻页后的search框--需要这样吗
}

/**
 * 表格的columns -- 后面用json文件配置出去 --参照bdq
 * 做到配置项与组件的分离
 * 组件要用时只需要引入即可
 * 这里的key值什么的 最后肯定是要和后台数据字典对对齐的
 * 这些函数都是测试阶段的，后面正式的函数 放在组件class内部
 */
const columns = [{
  title: '应用名称',
  dataIndex: 'sw_name',
  key: 'sw_name'
}, {
  title: '所属类型',
  dataIndex: 'sw_type',
  key: 'sw_type'
}, {
  title: '供应商',
  dataIndex: 'fa_name',
  key: 'fa_name'
}, {
  title: '类型',
  dataIndex: 'sw_path',
  key: 'sw_path'
}, {
  title: '下载次数',
  dataIndex: 'downloads',
  key: 'downloads'
}, {
  title: '变更时间',
  dataIndex: 'sw_update_time',
  key: 'sw_update_time '
}, {
  title: '置顶',
  dataIndex: 'stickTop',
  key: 'stickTop',
  render: (text, record, index) => {
    return (
      <Switch />
    )
  }
}, {
  title: '缴费状态',
  dataIndex: 'pay_state',
  key: 'pay_state',
  render: (text, record, index) => <span className='normal-color' >{text}</span>
}, {
  title: '操作',
  dataIndex: 'options',
  key: 'options',
  render: (text, record, index) => {
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

class Businessing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      pagination,
      searchValue: ''
    }
  }

  /**
   * 获取运营中的应用列表数据
   */
  getTableDatas = () => {
    axios.post(ajaxUrl.Business, {
      params: {
        per_info: '10',
        person_id: '1'
      }
    }).then((res) => {
      const data = res.data
      this.setState({
        tableData: {
          data: data.datasource,
          total: data.pageCount.pageNumbers
        }
      })
    }).catch((e) => { console.log(e) })
  }

  /**
   * 当select的值变化时回调
   */
  onSelect = (val) => {
    console.log('val:' + val)
    // 需要以val为参数向后台请求表格数据并刷新
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
      },
      inputValue: this.state.pagination.text
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
      },
      searchValue: this.state.pagination.text
    }, () => {
      this.getTableDatas()
    })
  }

  /**
   * 搜索输入框变化的回调
   */
  inputChange = () => {}

  /**
   * 根据搜索框的值进行搜索
   * 将搜索到的数据(向后台请求)反映到dataSource中
   * 搜索框按下回车/搜索时回调
   */
  getSearchData = () => {
    console.log('sudgfg::: ' + this.state.searchValue)
  }

  inputChange = (e) => {
    let value = e.target.value
    this.setState({
      searchValue: value
    })
  }

  componentDidMount () {
    this.getTableDatas()
  }

  render () {
    const { tableData, pagination } = this.state
    return (
      <div className='software-wrap'>
        <SearchBar
          onSeachChange={this.inputChange}
          onSearch={this.getSearchData}
          onBtnClick={this.getSearchData}
          onSelectChange={this.onSelect}
        />
        <BlankBar />
        <Table
          columns={columns}
          dataSource={tableData.data}
          pagination={{
            ...pagination,
            total: this.state.tableData.total,
            onShowSizeChange: this.onShowSizeChange,
            onChange: this.pageNumChange
          }}
        />
      </div>
    )
  }
}

export default Businessing
