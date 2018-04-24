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
import { Table, Switch, Divider, Button } from 'antd'
import ajaxUrl from 'config'
import axios from 'axios'
import { BlankBar, SearchBar } from 'components/software-market'
import { AppStandOffModal } from 'pages/software-market'
import 'pages/software-market/SoftwareMarket.scss'
import BusiRenewWin from './BusiRenewWin'

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

class Businessing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      pagination,
      searchValue: '',
      appOffModalCon: {
        visible: false,
        swName: ''
      },
      busiRenewWinVisible: false // 续费弹窗
    }
    // 表格的列信息
    this.columns = [{
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
      dataIndex: 'expire',
      key: 'expire',
      render: (text, record, index) => {
        // 这里的这个100 是临时量 其实应该用全局的标准 可以用redux管理起来 作为全局量使用 或 给出设置的界面
        // 鼠标悬浮在上面 会出现 还差多少天到期
        if (text > 100) {
          return <span className='normal-color' >正常</span>
        } else {
          return <span className='warn-color' >已过期</span>
        }
      }
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record, index) => (
        <span>
          <a href='javascript:void(0)' onClick={() => this.showBusiRenewWin()}>续费</a>
          <Divider type='vertical' />
          <a href='javascript:void(0)' onClick={() => alert('详情')}>详情</a>
          <Divider type='vertical' />
          <a href='javascript:void(0)' onClick={(e) => this.showAppOffStandModal(record)}>下架</a>
        </span>
      )
    }]
  }

  /**
   * 获取运营中的应用列表数据
   */
  getTableDatas = () => {
    axios.post(ajaxUrl.Business, {
      params: {
        pageNum: 1,
        pageSize: 2,
        sw_type: '娱乐类',
        sw_name: '斗地主'
      }
    }).then((res) => {
      const data = res.data
      // console.log(`data: ${JSON.stringify(data)}`)
      this.setState({
        tableData: {
          data: data.data,
          total: data.total
        }
      })
    }).catch((e) => { console.log(e) })
  }

  // 显示下架弹窗
  showAppOffStandModal = (record) => {
    // console.log(`record.sw_name: ${record.sw_name}`)
    // console.log(`record: ${Obj2String(record)}`)
    this.setState({
      appOffModalCon: {
        ...this.state.AppOffModalCon,
        visible: true,
        swName: record.sw_name
      }
    })
  }

  // 关闭弹窗
  closeModal = () => {
    this.setState({
      appOffModalCon: {
        ...this.state.AppOffModalCon,
        visible: false
      }
    })
  }

  // 弹窗取消
  handleCancel = () => {
    this.closeModal()
  }

  handleOk = () => {
    // 当然 在关闭之前要提交表单
    this.closeModal()
  }

  /**
   * 当select的值变化时回调
   */
  onSelect = (val) => {
    // console.log('val:' + val)
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
    // console.log('sudgfg::: ' + this.state.searchValue)
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

  handleCloseBusiRenewWin () {
    this.setState({
      busiRenewWinVisible: false
    })
  }

  showBusiRenewWin () {
    this.setState({
      busiRenewWinVisible: true
    })
  }

  render () {
    const { tableData, pagination, appOffModalCon } = this.state
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
          columns={this.columns}
          dataSource={tableData.data}
          pagination={{
            ...pagination,
            total: this.state.tableData.total,
            onShowSizeChange: this.onShowSizeChange,
            onChange: this.pageNumChange
          }}
        />
        <div ref='AppStandOffElem' className='app-stand-off-wrap' />
        <AppStandOffModal
          getContainer={() => this.refs.AppStandOffElem}
          visible={appOffModalCon.visible}
          footer={[
            <Button key='submit' type='primary' onClick={this.handleOk}>
              确认
            </Button>,
            <Button key='back' onClick={this.handleCancel}>取消</Button>
          ]}
          swName={appOffModalCon.swName}
        />
        <BusiRenewWin visible={this.state.busiRenewWinVisible} handleClose={() => { this.handleCloseBusiRenewWin() }} />
      </div>
    )
  }
}

export default Businessing
