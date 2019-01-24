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
import { Table, Button, message, Modal, Input, Tabs } from 'antd'
import { BlankBar, SearchBar } from 'components/software-market'
import { IterationDetailModal } from 'pages/software-market'
import 'pages/software-market/SoftwareMarket.scss'
import { getAppListDatav2, bussDetailv2, iterVerifyv2, getApptype, waitVeriRejectv2 } from 'services/software-manage'
import webStorage from 'webStorage'

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
const { TextArea } = Input
const TabPane = Tabs.TabPane
class IterationVerify extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      pagination,
      pagination2,
      searchValue: '',
      detModalCon: {
        visible: false,
        APP_NAME: '',
        resData: {}
      },
      sw_type: '', // 软件类型
      sw_name: '',
      sw_time: '', // 期望上架时间
      options: ['全部', '教育类', '教辅类'], // 应用类型下拉框options数组
      pageNum: 1,
      pageSize: 10,
      auditStatus: 2, // 软件状态2迭代审核
      typeId: '', // 暂时101，后期接口改完可以空
      downloadCount: 'desc', // 下载量排行
      keyword: '',
      keyword2: '',
      showModal: false, // 审核不通过显示的弹窗
      reason: '',
      platTableData: {
        data: [],
        total: 0
      },
      tabsValue: 'rj'
    }
  }

  /**
   * 获取运营中的应用列表数据
   */
  getTableDatas = () => {
    const {tabsValue} = this.state
    let params
    if (tabsValue === 'rj') {
      params = {
        auditStatus: this.state.auditStatus, // 审核状态
        keyword: this.state.keyword || '', // 应用名称,
        pageNum: this.state.pagination.pageNum || 1,
        pageSize: this.state.pagination.pageSize || 10,
        typeId: this.state.typeId || 0,
        platformType: 'rj'
      }
    } else {
      params = {
        auditStatus: this.state.auditStatus, // 审核状态
        keyword: this.state.keyword2 || '', // 应用名称,
        pageNum: this.state.pagination2.pageNum || 1,
        pageSize: this.state.pagination2.pageSize || 10,
        typeId: this.state.typeId2 || 0,
        platformType: 'pt'
      }
    }
    getAppListDatav2(params, (res) => {
      const data = res.data.data
      // let jsonStr = JSON.stringify(data)
      // console.log(jsonStr)
      let dataList = res.data.data.data
      if (tabsValue === 'rj') {
        data.data &&
        this.setState({
          tableData: {
            data: this.getSwPath(dataList),
            total: data.total
          }
        })
      } else {
        data.data && this.setState({
          platTableData: {
            data: this.getSwPath(dataList),
            total: data.total
          }
        })
      }
    })
  }

  // 应用类型下拉框数据获取
  getSelectOptions () {
    const thiz = this
    getApptype({}, (res) => {
      const data = [{APP_TYPE_ID: '', APP_TYPE_NAME: '全部'}]
      const dataArray = data.concat(res.data.data)
      // const a = this.copyArray(data.type)
      // a.unshift('')
      thiz.setState({
        options: dataArray
      })
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
  /**
 * 表格的columns -- 后面用json文件配置出去 --参照bdq
 * 做到配置项与组件的分离
 * 组件要用时只需要引入即可
 * 这里的key值什么的 最后肯定是要和后台数据字典对对齐的
 * 这些函数都是测试阶段的，后面正式的函数 放在组件class内部
 */
  getColumns = () => {
    return [{
      title: '应用名称',
      dataIndex: 'APP_NAME',
      key: 'APP_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'APP_TYPE_NAME',
      key: 'APP_TYPE_NAME'
    }, {
      title: '供应商',
      dataIndex: 'fa_name',
      key: 'fa_name',
      render: (text, record, index) => {
        return (
          <span >{text && text ? text : 'baidu'}
          </span>
        )
      }
    }, {
      title: '类型',
      dataIndex: 'sw_path',
      key: 'sw_path',
      render: (text, record, index) => {
        return (
          <span >{text && text ? text : 'app'}
          </span>
        )
      }
    }, {
      title: '当前版本',
      dataIndex: 'CURRENT_VERSION',
      key: 'CURRENT_VERSION',
      render: (text, record, index) => {
        return (
          <span>{text && text ? text : ''}</span>
        )
      }
    }, {
      title: '迭代版本',
      dataIndex: 'APP_VERSION',
      key: 'APP_VERSION',
      render: (text, record, index) => {
        return (
          <span >{text && text ? text : 'v2.0'}
          </span>
        )
      }
    }, {
      title: '提交时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
      render: (text, record, index) => {
        return (
          <span >{this.dateToString(text)}</span>
        )
      }
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record, index) => {
        const roleCode = webStorage.getItem('STAR_WEB_ROLE_CODE')
        return (
          <span>
            <a href='javascript:void(0)' onClick={(e) => this.showDetModal(record)}>{roleCode === 'operator' ? '审核' : '详情'}</a>
          </span>
        )
      }
    }]
  }
  getPlatColumns = () => {
    return [{
      title: '应用名称',
      dataIndex: 'APP_NAME',
      key: 'APP_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'APP_TYPE_NAME',
      key: 'APP_TYPE_NAME'
    }, {
      title: '当前版本',
      dataIndex: 'CURRENT_VERSION',
      key: 'CURRENT_VERSION',
      render: (text, record, index) => {
        return (
          <span>{text && text ? text : ''}</span>
        )
      }
    }, {
      title: '迭代版本',
      dataIndex: 'APP_VERSION',
      key: 'APP_VERSION',
      render: (text, record, index) => {
        return (
          <span >{text && text ? text : 'v2.0'}
          </span>
        )
      }
    }, {
      title: '提交时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
      render: (text, record, index) => {
        return (
          <span >{this.dateToString(text)}</span>
        )
      }
    }, {
      title: '链接地址',
      dataIndex: 'APP_LINK',
      key: 'APP_LINK'
    }, {
      title: '操作',
      dataIndex: 'options',
      render: (text, record, index) => (
        <span>
          <a>审核</a>
        </span>
      )
    }]
  }
  dateToString = (date) => {
    var dateee = new Date(date).toJSON()
    var dateString = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return dateString
  }
  // 显示‘详情’弹窗
  showDetModal = (record) => {
    // 指定回调中setState()的执行环境 bind(this)效果也一样 但是这里会有报错
    const thiz = this
    // 获取对应的后台数据
    const params = {
      appId: record.APP_ID,
      appVersion: record.APP_VERSION
    }
    bussDetailv2(params, (res) => {
      const resData = res.data ? res.data : {}
      // 通过state将数据res传给子组件
      thiz.setState({
        detModalCon: {
          ...thiz.state.detModalCon,
          visible: true,
          APP_NAME: record.APP_NAME,
          CURRENT_VERSION: record.CURRENT_VERSION,
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
      detModalCon: {
        ...this.state.detModalCon,
        visible: false
      }
    })
  }

  // 迭代审核详情弹窗同意驳回
  handleDetAgree = (state) => {
    const thiz = this
    // let paramsList = []
    let paramsList = []
    const params = {
      'appId': this.state.detModalCon.APP_ID,
      'appVersion': this.state.detModalCon.APP_VERSION,
      'currentVersion': this.state.detModalCon.CURRENT_VERSION
    }
    paramsList.push(params)
    const params1 = {
      userID: 123,
      rejectReason: '1'
    }
    // paramsList.push(params)
    // const params1 = {
    //   userID: 123,
    //   rejectReason: '1'
    // }
    // let jsonStr = JSON.stringify(params)
    // console.log('params' + jsonStr)
    if (state === 'agree') {
      iterVerifyv2(paramsList, params1, (res) => {
        const data = res.data
        // let jsonStr = JSON.stringify(data)
        // console.log(jsonStr)
        if (data.code === 200) {
          message.success('审核成功')
        } else {
          message.success('审核失败')
        }
        thiz.handleAppDetCancel()
        thiz.getTableDatas()
      })
    } else {
      // message.success('驳回成功')
      this.showModals()
      // thiz.handleAppDetCancel()
      // thiz.getTableDatas()
    }
  }

  // 获得期望上架时间,并设置到state中
  getOnShelfTime = (time) => {
    this.setState({
      sw_time: time
    })
  }

  /**
   * 当select的值变化时回调
   */
  onSelect = (val) => {
    // console.log('val:' + val)
    // 需要以val为参数向后台请求表格数据并刷新
    this.setState({
      typeId: val
    })
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
   * 搜索输入框变化的回调
   */
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

  // 显示审核不通过输入原因的弹窗
  showModals = () => {
    this.setState({
      showModal: true
    })
  }
  // 隐藏弹窗
  cancle = () => {
    this.setState({
      showModal: false
    })
  }
  // 填写审核原因后确认提交
  onOk = () => {
    const thiz = this
    const { reason } = this.state
    if (reason === '') {
      message.warn('请填写不通过的理由')
    } else {
      let paramsList = []
      const params = {
        'appId': this.state.detModalCon.APP_ID,
        'appVersion': this.state.detModalCon.APP_VERSION
      }
      paramsList.push(params)
      const params1 = {
        // userID: 123,
        rejectReason: reason
      }
      waitVeriRejectv2(paramsList, params1, (res) => {
        const data = res.data
        if (data.code === 200) {
          message.success('驳回成功')
        } else {
          message.warn('驳回失败')
        }
        this.setState({
          reason: ''
        })
        thiz.handleAppDetCancel()
        thiz.getTableDatas()
      })
    }
    this.setState({
      showModal: false
    })
  }
  // 输入框change事件
  inputReason = (e) => {
    const { value } = e.target
    this.setState({
      reason: value
    })
  }
  componentDidMount () {
    this.getTableDatas()
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
    const { tableData, pagination, detModalCon, options } = this.state
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
              columns={this.getColumns()}
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
            <div ref='IterDetailElem' className='Iter-detail-wrap' />
            <IterationDetailModal
              title={detModalCon.APP_NAME}
              getContainer={() => this.refs.IterDetailElem}
              visible={detModalCon.visible}
              onCancel={this.handleAppDetCancel}
              resData={detModalCon.resData}
              getOnShelfTime={this.getOnShelfTime}
              footer={[
                <Button key='agree' type='primary' onClick={() => this.handleDetAgree('agree')}>同意</Button>,
                <Button key='reject' className='warn-btn' onClick={() => this.handleDetAgree('reject')}>驳回</Button>,
                <Button key='back' onClick={this.handleAppDetCancel}>关闭</Button>
              ]}
            />
            <Modal
              visible={this.state.showModal}
              onCancel={this.cancle}
              onOk={this.onOk}
              title='请输入审核不通过的原因'
            >
              <TextArea row={4} onChange={this.inputReason} />
            </Modal>
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
              columns={this.getPlatColumns()}
              dataSource={this.state.platTableData.data}
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
        </TabPane>
      </Tabs>
    )
  }
}

export default IterationVerify
