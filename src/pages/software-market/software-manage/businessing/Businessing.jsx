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
import { Table, Switch, Divider, Button, message } from 'antd'
// import ajaxUrl from 'config'
// import axios from 'axios'
import { BlankBar, SearchBar } from 'components/software-market'
import { AppStandOffModal, AppDetailModal } from 'pages/software-market'
import 'pages/software-market/SoftwareMarket.scss'
import BusiRenewWin from './BusiRenewWin'
import {getAppListData, verifyDetail, undercarriage} from 'services/software-manage'

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
      searchValue: '', // 应用名称
      type: '', // 类型
      appOffModalCon: {
        visible: false,
        swName: '',
        swId: ''
      },
      pageNum: 1,
      pageSize: 10,
      busiRenewWinVisible: false, // 续费弹窗
      busiRenewRecord: null, // 当前选择行的值
      appDetailModalCon: {
        visible: false,
        swName: ''
      },
      veriCode: '' // 验证码
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
          <a href='javascript:void(0)' onClick={() => this.showBusiRenewWin(record)}>续费</a>
          <Divider type='vertical' />
          <a href='javascript:void(0)' onClick={(e) => this.showAppDetailModal(record)}>详情</a>
          <Divider type='vertical' />
          <a href='javascript:void(0)' onClick={(e) => this.showAppOffStandModal(record)}>下架</a>
        </span>
      )
    }]
  }

  /**
   * 请求表格参数
   * @returns {{pageNum: number, pageSize: number, sw_type: string, sw_name: string}}
   */
  getParams () {
    return {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      sw_type: this.state.type || '',
      sw_name: this.state.searchValue || ''
    }
  }

  /**
   * 获取运营中的应用列表数据
   */
  getTableDatas = () => {
    getAppListData(this.getParams(), (response) => {
      let result = response.data
      this.setState({
        tableData: {
          data: result.data,
          total: result.total
        }
      })
    })
  }

  // 显示‘详情’弹窗
  showAppDetailModal = (record) => {
    // 指定回调中setState()的执行环境 bind(this)效果也一样 但是这里会有报错
    const thiz = this
    // 获取对应的后台数据
    const params = {
      sw_id: record.sw_id
    }

    verifyDetail(params, (res) => {
      const resData = res.data
      // 通过state将数据res传给子组件
      thiz.setState({
        appDetailModalCon: {
          ...thiz.state.detModalCon,
          visible: true,
          swName: record.sw_name,
          resData: resData,
          sw_id: record.sw_id
        }
      })
    })
  }

  // 关闭‘详情’弹窗
  handleAppDetCancel = () => {
    this.setState({
      appDetailModalCon: {
        ...this.state.appDetailModalCon,
        visible: false
      }
    })
  }
  // 显示下架弹窗
  showAppOffStandModal = (record) => {
    // console.log(`record.sw_name: ${record.sw_name}`)
    // console.log(`record: ${Obj2String(record)}`)
    this.setState({
      appOffModalCon: {
        ...this.state.AppOffModalCon,
        visible: true,
        swName: record.sw_name,
        swId: record.sw_id
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
    const thiz = this
    const params = {
      sw_id: this.state.appOffModalCon.swId
    }
    undercarriage(params, (res) => {
      const data = res.data ? res.data : {}
      message.success(data.info)
      thiz.closeModal()
      thiz.getTableDatas()
    })
  }

  /**
   * 当select的值变化时回调
   */
  onSelect = (val) => {
    this.setState({
      type: val
    })
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
  inputChange = (val) => {
    this.setState({
      searchValue: val
    })
  }

  /**
   * 根据搜索框的值进行搜索
   * 将搜索到的数据(向后台请求)反映到dataSource中
   * 搜索框按下回车/搜索时回调
   */
  getSearchData = () => {
    this.getTableDatas()
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

  showBusiRenewWin (record) {
    this.setState({
      busiRenewWinVisible: true,
      busiRenewRecord: record
    })
  }

  // 获取验证码并进行设置
  getVeriCode = (value) => {
    this.setState({
      veriCode: value
    })
  }

  render () {
    const { tableData, pagination, appOffModalCon, appDetailModalCon } = this.state
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
          getVeriCode={this.getVeriCode}
          footer={[
            <Button key='submit' type='primary' onClick={this.handleOk}>
              确认
            </Button>,
            <Button key='back' onClick={this.handleCancel}>取消</Button>
          ]}
          swName={appOffModalCon.swName}
        />
        <BusiRenewWin record={this.state.busiRenewRecord || {}} visible={this.state.busiRenewWinVisible} handleClose={() => { this.handleCloseBusiRenewWin() }} />
        <div ref='appDetailElem' className='app-detail-wrap' />
        <AppDetailModal
          title={appDetailModalCon.swName}
          getContainer={() => this.refs.appDetailElem}
          visible={appDetailModalCon.visible}
          onCancel={this.handleAppDetCancel}
          resData={appDetailModalCon.resData}
          footer={[
            <Button key='back' type='primary' onClick={this.handleAppDetCancel}>关闭</Button>
          ]}
        />
      </div>
    )
  }
}

export default Businessing
