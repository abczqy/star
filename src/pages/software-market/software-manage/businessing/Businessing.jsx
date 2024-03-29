/**
 * 上架(运营中)
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
import moment from 'moment'
import { Table, Divider, Button, message, Modal, Tabs } from 'antd'
import { axios } from 'utils'
import config from '../../../../config'
import { BlankBar, SearchBar } from 'components/software-market'
import {
  // AppStandOffModal,
  AppDetailModal
} from 'pages/software-market'
import PlatDetailModal from '../common-pages/plat-detail-modal/PlatDetailModal'
import 'pages/software-market/SoftwareMarket.scss'
import BusiRenewWin from './BusiRenewWin'
import webStorage from 'webStorage'
import { bussDetailv2, undercarriagev2, stick, getApptype, getRenewDetail } from 'services/software-manage'

const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_EDU_MARKET = config.SERVICE_EDU_MARKET
const TabPane = Tabs.TabPane
/**
   * 表格分页器设置-默认值
   */
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true
}
// 平台应用分页器
const pagination2 = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true
}
class Businessing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      platTableData: {
        data: [],
        total: 0
      },
      pagination,
      pagination2,
      searchValue: '', // 应用名称
      type: '', // 类型
      appOffModalCon: {
        visible: false,
        swName: '',
        swId: ''
      },
      platOffModalCon: {
        visible: false,
        APPName: '',
        APPId: ''
      },
      busiRenewWinVisible: false, // 续费弹窗
      busiRenewRecord: null, // 当前选择行的值
      appDetailModalCon: {
        visible: false,
        APP_NAME: ''
      },
      platDetailModalCon: {
        visible: false,
        APP_NAME: ''
      },
      veriCode: '', // 验证码
      auditStatus: 4, // 软件状态4上架
      typeId: '', // 暂时101，后期接口改完可以空
      typeId2: '', // 平台应用typeId
      downloadCount: 'desc', // 下载量排行
      keyword: '',
      keyword2: '',
      options: ['全部', '教育类', '教辅类'], // 应用类型下拉框options数组
      tabsValue: 'rj'
    }
    // 表格的列信息
    this.columns = [{
      title: '应用名称',
      dataIndex: 'APP_NAME',
      key: 'APP_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'APP_TYPE_NAME',
      key: 'APP_TYPE_NAME'
    }, {
      title: '版本',
      dataIndex: 'APP_VERSION',
      key: 'APP_VERSION'
      // width: 150
    }, {
      title: '上线时间',
      dataIndex: 'CREATE_TIME',
      render: date => moment(date).format('YYYY-MM-DD')
      // width: 150
    }, {
      title: '下载次数',
      dataIndex: 'DOWNLOAD_COUNT',
      key: 'DOWNLOAD_COUNT'
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record, index) => (
        <span>
          {/* <a href='javascript:void(0)' onClick={() => this.showBusiRenewWin(record)}>续费</a>
          <Divider type='vertical' /> */}
          <a href='javascript:void(0)' onClick={(e) => this.showAppDetailModal(record)}>详情</a>
          <Divider type='vertical' />
          <a href='javascript:void(0)' onClick={(e) => this.showAppOffStandModal(record)}>下架</a>
        </span>
      )
    }]
    this.platColunms = [{
      title: '应用名称',
      dataIndex: 'APP_NAME',
      key: 'APP_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'APP_TYPE_NAME',
      key: 'APP_TYPE_NAME'
    }, {
      title: '网址',
      dataIndex: 'APP_LINK',
      render: (text) => {
        return (
          <a href={text} target='_blank'>{text}</a>
        )
      }
    }, {
      title: '版本',
      dataIndex: 'APP_VERSION',
      key: 'APP_VERSION'
    }, {
      title: '上线时间',
      dataIndex: 'CREATE_TIME',
      render: date => moment(date).format('YYYY-MM-DD')
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record, index) => (
        <span>
          <a href='javascript:void(0)' onClick={() => this.showPlatDetailModal(record)}>详情</a>
          <Divider type='vertical' />
          <a href='javascript:void(0)' onClick={(e) => this.showPlatModal(record)}>下架</a>
        </span>
      )
    }
    ]
  }
  /**
   * 请求表格参数
   * @returns {{pageNum: number, pageSize: number, sw_type: string, sw_name: string}}
   */
  getParams () {
    return {
      pageNum: this.state.pagination.pageNum,
      pageSize: this.state.pagination.pageSize,
      sw_type: this.state.type || '',
      sw_name: this.state.searchValue || ''
    }
  }
  dateToString = (date) => {
    var dateee = new Date(date).toJSON()
    var dateString = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return dateString
  }
  /**
   * 获取运营中的应用列表数据
   */
  getTableDatas = (thiz) => {
    const {tabsValue} = this.state
    let params
    if (tabsValue === 'rj') {
      params = {
        auditStatus: '4', // 审核状态
        keyword: this.state.keyword || '', // 应用名称,
        pageNum: this.state.pagination.pageNum || 1,
        pageSize: this.state.pagination.pageSize || 10,
        typeId: this.state.typeId || 0,
        platformType: 'rj'
      }
    } else {
      params = {
        auditStatus: '4', // 审核状态
        keyword: this.state.keyword2 || '', // 应用名称,
        pageNum: this.state.pagination2.pageNum || 1,
        pageSize: this.state.pagination2.pageSize || 10,
        typeId: this.state.typeId2 || 0,
        platformType: 'pt'
      }
    }
    axios.get(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/manage-app/list-by-audit-status', {params: params})
      .then(function (res) {
        if (res.data.code === 200) {
          const data = res.data
          console.log(`data:`, data)
          if (tabsValue === 'rj') {
            data.data &&
            thiz.setState({
              tableData: {
                data: data.data.data.slice(),
                total: data.data.totalCount
              }
            })
          } else {
            data.data && thiz.setState({
              platTableData: {
                data: data.data.data.slice(),
                total: data.data.totalCount
              }
            })
          }
        } else {
          message.warning(res.data.msg || '请求出错')
        }
      })
  }

  // 获取只有系统名称的sw_path参数内容
  getSwPath = (data) => {
    data.map((item, index) => {
      let con = item.sw_path
      let version = ''
      let pathArray = []
      // 把sw_path字段内容用逗号分割,获得多个系统名称和下载路径混合的字符串
      pathArray = con ? con.split(',') : []
      pathArray.map((pathIt, pathIn) => {
        // 把系统名称和下载路径混合字符串再用冒号分割,以便只取到系统名称
        let pathVer = pathIt.split(':')
        // 遍历取出每个系统名称，并拼接在一起
        if (pathIn > 0) {
          version += (',' + pathVer[0])
        } else {
          version += pathVer[0]
        }
        // 把拼接后的多个系统重新赋值给sw_path字段
        item.sw_path = version
      })
    })
    return data
  }

  // 显示‘详情’弹窗
  showAppDetailModal = (record) => {
    // 指定回调中setState()的执行环境 bind(this)效果也一样 但是这里会有报错
    const thiz = this
    // 获取对应的后台数据
    const params = {
      appId: record.APP_ID,
      appVersion: record.APP_VERSION
    }

    bussDetailv2(params, (res) => {
      const resData = res.data ? res.data : {}
      thiz.setState({
        appDetailModalCon: {
          ...thiz.state.detModalCon,
          visible: true,
          APP_NAME: record.APP_NAME,
          APP_VERSION: record.APP_VERSION,
          resData: resData,
          APP_ID: record.APP_ID
        }
      })
    })
  }
  // 平台应用详情
  showPlatDetailModal = (record) => {
    const thiz = this
    const params = {
      appId: record.APP_ID,
      appVersion: record.APP_VERSION
    }
    bussDetailv2(params, (res) => {
      const resData = res.data ? res.data : {}
      thiz.setState({
        platDetailModalCon: {
          ...thiz.state.platDetailModalCon,
          visible: true,
          APP_NAME: record.APP_NAME,
          APP_VERSION: record.APP_VERSION,
          resData: resData,
          APP_ID: record.APP_ID
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
  handlePlatClose = () => {
    this.setState({
      platDetailModalCon: {
        ...this.state.platDetailModalCon,
        visible: false
      }
    })
  }
  // 显示下架弹窗
  showAppOffStandModal = (record) => {
    // 把记录的值映射到state上
    this.setState({
      appOffModalCon: {
        ...this.state.appOffModalCon,
        visible: true,
        APP_ID: record.APP_ID,
        APP_VERSION: record.APP_VERSION
      }
    })
  }
  // 显示平台应用弹窗
  showPlatModal = (record) => {
    this.setState({
      platOffModalCon: {
        ...this.state.platOffModalCon,
        visible: true,
        APPId: record.APP_ID,
        APP_VERSION: record.APP_VERSION
      }
    })
  }

  // 关闭弹窗
  closeModal = () => {
    this.setState({
      appOffModalCon: {
        ...this.state.appOffModalCon,
        visible: false
      }
    })
  }
  // 关闭平台弹窗
  closePlatModal = () => {
    this.setState({
      platOffModalCon: {
        ...this.state.platOffModalCon,
        visible: false
      }
    })
  }
  // 弹窗取消
  handleCancel = () => {
    this.closeModal()
  }
  // 置顶操作
  handleStick (record) {
    const thiz = this
    const params = {
      sw_id: record && record.sw_id,
      sw_stick: record.sw_stick ? 0 : 1
    }
    stick(params, (res) => {
      const data = res.data ? res.data : {}
      message.success(data.info)
      thiz.getTableDatas(this)
    })
  }

  /* handleOk = () => {
    if (this.state.veriCode === '') {
      message.info('请输入验证码!')
      return
    }

    if (!this.state.veriStatus) {
      message.warning('验证码输入错误!')
      return
    }
    // 当然 在关闭之前要提交表单
    let appIdList = []
    appIdList.push(this.state.appOffModalCon.APP_ID * 1)// 这里的list后端要int的
    const thiz = this
    const params = {
      applyType: 5, // applyType 5为下架
      userId: 1
    }
    const params1 = appIdList // 传应用ID格式后台需要[1,2]这种，这里传[i]
    undercarriagev2(params, params1, (res) => {
      // const data = res.data ? res.data : {}
      message.success('下架成功')
      thiz.closeModal()
      thiz.getTableDatas(thiz)
    })
  } */

  handleRemove = () => {
    // 当然 在关闭之前要提交表单
    let appIdList = []
    const {appOffModalCon} = this.state
    appIdList.push({
      appId: appOffModalCon.APP_ID,
      appVersion: appOffModalCon.APP_VERSION
    })
    const thiz = this
    const params = {
      applyType: 5, // applyType 5为下架
      userId: webStorage.getItem('STAR_V2_USERID')
    }
    const params1 = appIdList // 传应用ID格式后台需要[1,2]这种，这里传[i]
    undercarriagev2(params, params1, (res) => {
      // const data = res.data ? res.data : {}
      message.success('下架成功')
      thiz.closeModal()
      thiz.getTableDatas(thiz)
    })
  }
  // 下架平台应用
  handleRemovePlat = () => {
    // 下架申请
    // 当然 在关闭之前要提交表单
    let appIdList = []
    const {platOffModalCon} = this.state
    console.log(platOffModalCon)
    appIdList.push({
      appId: platOffModalCon.APPId,
      appVersion: platOffModalCon.APP_VERSION
    })
    const thiz = this
    const params = {
      applyType: 5, // applyType 5为下架
      userId: webStorage.getItem('STAR_V2_USERID')
    }
    const params1 = appIdList // 传应用ID格式后台需要[1,2]这种，这里传[i]
    undercarriagev2(params, params1, (res) => {
      // const data = res.data ? res.data : {}
      message.success('下架成功')
      thiz.closePlatModal()
      thiz.getTableDatas(thiz)
    })
  }
  /**
   * 当select的值变化时回调
   */
  onSelect = (val) => {
    const {tabsValue} = this.state
    if (tabsValue === 'rj') {
      // 需要以val为参数向后台请求表格数据并刷新
      this.setState({
        typeId: val
      })
    } else {
      this.setState({
        typeId2: val
      })
    }
  }

  /**
   * pageSize 变化时回调
   */
  onShowSizeChange = (current, size) => {
    const {tabsValue} = this.state
    if (tabsValue === 'rj') {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageNum: current,
          pageSize: size
        }
      }, () => {
        this.getTableDatas(this)
      })
    } else {
      this.setState({
        pagination2: {
          ...this.state.pagination2,
          pageNum: current,
          pageSize: size
        }
      }, () => {
        this.getTableDatas(this)
      })
    }
  }

  /**
   * 页码变化时回调
   */
  pageNumChange = (page, pageSize) => {
    const {tabsValue} = this.state
    if (tabsValue === 'rj') {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageNum: page
        }
      }, () => {
        this.getTableDatas(this)
      })
    } else {
      this.setState({
        pagination2: {
          ...this.state.pagination2,
          pageNum: page
        }
      }, () => {
        this.getTableDatas(this)
      })
    }
  }

  /**
   * 根据搜索框的值进行搜索
   * 将搜索到的数据(向后台请求)反映到dataSource中
   * 搜索框按下回车/搜索时回调
   */
  getSearchData = () => {
    const {tabsValue} = this.state
    if (tabsValue === 'rj') {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pageNum: 1
        }
      }, () => {
        this.getTableDatas(this)
      })
    } else {
      this.setState({
        pagination2: {
          ...this.state.pagination2,
          pageNum: 1
        }
      }, () => {
        this.getTableDatas(this)
      })
    }
  }

  inputChange = (e) => {
    const {tabsValue} = this.state
    let value = e.target.value
    if (tabsValue === 'rj') {
      this.setState({
        keyword: value
      })
    } else {
      this.setState({
        keyword2: value
      })
    }
  }

  // 应用类型下拉框数据获取
  getSelectOptions () {
    const thiz = this
    getApptype({}, (res) => {
      // const data = [{APP_TYPE_ID: '', APP_TYPE_NAME: '全部'}]
      // const dataArray = data.concat(res.data.data)
      const dataArray = res.data.data
      // const a = this.copyArray(data.type)
      // a.unshift('')
      thiz.setState({
        options: dataArray
      })
    })
  }

  handleCloseBusiRenewWin () {
    this.setState({
      busiRenewWinVisible: false
    })
  }

  showBusiRenewWin (record) {
    getRenewDetail({
      sw_id: record.sw_id
    }, (response) => {
      let result = response.data
      if (result.success) {
        this.setState({
          busiRenewWinVisible: true,
          busiRenewRecord: result.data
        })
      } else {
        message.error('请求软件详情失败!')
      }
    })
  }

  // 获取验证码并进行设置
  getVeriCode = (value) => {
    this.setState({
      veriCode: value
    })
  }

  // 获取验证码填写是否正确
  getVeriStatus = (status) => {
    this.setState({
      veriStatus: status
    })
  }

  componentDidMount () {
    this.getTableDatas(this)
    this.getSelectOptions()
  }
  // 改变tabs值
  changeTabs = (value) => {
    this.setState({
      tabsValue: value
    }, () => {
      this.getTableDatas(this)
    })
  }
  render () {
    const { tableData, pagination, appOffModalCon, platOffModalCon, appDetailModalCon, platDetailModalCon, options, platTableData } = this.state
    return (
      <Tabs defaultActiveKey='rj' onChange={this.changeTabs}>
        <TabPane key='rj' tab={<strong>软件应用</strong>}>
          <div className='software-wrap'>
            <SearchBar
              onSeachChange={this.inputChange}
              onSearch={this.getSearchData}
              onBtnClick={this.getSearchData}
              onSelectChange={this.onSelect}
              options={options}
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
              rowKey={(record, index) => {
                return index
              }}
            />
            {/* {appOffModalCon.visible ? <AppStandOffModal
          visible={appOffModalCon.visible}
          getVeriCode={this.getVeriCode}
          getVeriStatus={this.getVeriStatus}
          footer={[
            <Button key='submit' type='primary' onClick={this.handleOk}>
              确认
            </Button>,
            <Button key='back' onClick={this.handleCancel}>取消</Button>
          ]}
          swName={appOffModalCon.swName}
        /> : null} */}
            {/* 软件下架 */}
            <Modal
              title='确认框'
              visible={appOffModalCon.visible}
              onOk={this.handleRemove}
              onCancel={this.handleCancel}
            >
              <span>您是否确认下架软件，此操作不可逆转！</span>
            </Modal>
            <BusiRenewWin record={this.state.busiRenewRecord || {}} visible={this.state.busiRenewWinVisible} handleClose={() => { this.handleCloseBusiRenewWin() }} />
            <div ref='appDetailElem' className='app-detail-wrap' />
            <AppDetailModal
              title={appDetailModalCon.APP_NAME}
              getContainer={() => this.refs.appDetailElem}
              visible={appDetailModalCon.visible}
              onCancel={this.handleAppDetCancel}
              resData={appDetailModalCon.resData}
              footer={[
                <Button key='back' type='primary' onClick={this.handleAppDetCancel}>关闭</Button>
              ]}
            />
          </div>
        </TabPane>
        <TabPane key='pt' tab={<strong>平台应用</strong>}>
          <div className='software-wrap'>
            <SearchBar
              onSeachChange={this.inputChange}
              onSearch={this.getSearchData}
              onBtnClick={this.getSearchData}
              onSelectChange={this.onSelect}
              options={options}
            />
            <BlankBar />
            <Table
              columns={this.platColunms}
              dataSource={platTableData.data}
              pagination={{
                ...pagination2,
                total: this.state.platTableData.total,
                onShowSizeChange: this.onShowSizeChange,
                onChange: this.pageNumChange
              }}
              rowKey={(record, index) => {
                return index
              }} />
          </div>
          {/* 平台应用下架 */}
          <Modal
            title='下架平台应用'
            onOk={this.handleRemovePlat}
            visible={platOffModalCon.visible}
            onCancel={this.closePlatModal}
          >
            <span>您是否确认下架此平台应用，此操作不可逆转！</span>
          </Modal>
          <div ref='platDetailElem' className='app-detail-wrap'>
            <PlatDetailModal
              title={platDetailModalCon.APP_NAME}
              getContainer={() => this.refs.platDetailElem}
              visible={platDetailModalCon.visible}
              resData={platDetailModalCon.resData}
              onCancel={this.handlePlatClose}
              footer={[
                <Button key='back' type='primary' onClick={this.handlePlatClose}>关闭</Button>
              ]}
            />
          </div>
        </TabPane>
      </Tabs>
    )
  }
}

export default Businessing
