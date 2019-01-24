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
import { Table, Button, message, Modal, Input, Tabs, Row, Col } from 'antd'
import { BlankBar, SearchBar } from 'components/software-market'
import { WaitDetailModal } from 'pages/software-market'
import 'pages/software-market/SoftwareMarket.scss'
import { getAppListDatav2, bussDetailv2, waitVeriAgreev2, waitVeriRejectv2, getApptype } from 'services/software-manage'
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
const TabPane = Tabs.TabPane
const {TextArea} = Input
class WaitVerify extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      pagination,
      pagination2,
      detModalCon: {
        visible: false,
        swName: '',
        resData: {}
      },
      sw_type: '',
      sw_name: '',
      options: ['全部', '教育类', '教辅类'], // 应用类型下拉框options数组
      pageNum: 1,
      pageSize: 10,
      auditStatus: 1, // 软件状态1待审核
      typeId: '', // 暂时101，后期接口改完可以空
      downloadCount: 'desc', // 下载量排行
      keyword: '',
      keyword2: '',
      showModal: false,
      platModal: false,
      reason: '',
      tabsValue: 'rj',
      platTableData: {
        data: [],
        total: 0
      },
      record: {},
      ipValue: '',
      testResult: '',
      showResultMadol: false
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
  dateToString = (date) => {
    var dateee = new Date(date).toJSON()
    var dateString = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return dateString
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
          <span >{text && text ? text : 'win32'}
          </span>
        )
      }
    }, {
      title: '当前版本',
      dataIndex: 'APP_VERSION',
      key: 'APP_VERSION'
    }, {
      title: '提交时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
      render: (text, record, index) => {
        return (
          <span >{this.dateToString(text) ? this.dateToString(text) : ''} </span>
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
      dataIndex: 'APP_VERSION',
      key: 'APP_VERSION'
    }, {
      title: '提交时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
      render: (text, record, index) => {
        return (
          <span >{this.dateToString(text) ? this.dateToString(text) : ''} </span>
        )
      }
    }, {
      title: '测试路径',
      dataIndex: 'TEST_URL'
    }, {
      title: '操作',
      dataIndex: 'options',
      render: (text, record, index) => (
        <span>
          <a href='javascript:void(0)' onClick={(e) => { this.showplatModals(record) }}>审核</a>
        </span>
      )
    }]
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
      console.log(resData)
      // 通过state将数据res传给子组件
      let jsonStr = JSON.stringify(resData)
      console.log(jsonStr)
      thiz.setState({
        detModalCon: {
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

  // 关闭‘详情’弹窗
  handleAppDetCancel = () => {
    this.setState({
      detModalCon: {
        ...this.state.detModalCon,
        visible: false
      }
    })
  }

  // 同意详情弹窗
  handleDetAgree = (state) => {
    const thiz = this
    let paramsList = []
    const params = {
      'appId': this.state.detModalCon.APP_ID,
      'appVersion': this.state.detModalCon.APP_VERSION
    }
    paramsList.push(params)
    const params1 = {
      userID: 123,
      rejectReason: '1'
    }
    if (state === 'agree') {
      // console.log('111111111同意')
      waitVeriAgreev2(paramsList, params1, (res) => {
        const data = res.data
        if (data.code === 200) {
          message.success('审核成功')
        } else {
          message.success('审核失败')
        }
        thiz.handleAppDetCancel()
        thiz.getTableDatas()
      })
    } else {
      this.showModals()
    }
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
            <div ref='waitDetailElem' className='wait-detail-wrap' />
            <WaitDetailModal
              title={detModalCon.APP_NAME}
              getContainer={() => this.refs.waitDetailElem}
              visible={detModalCon.visible}
              resData={detModalCon.resData}
              onCancel={this.handleAppDetCancel}
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
          <Modal
            visible={this.state.platModal}
            onCancel={this.handleCancle}
            onOk={this.handleOk}
            title='请输入ip地址'
          >
            <Row>
              <Col span={8}><Input onChange={this.handleGetValue} value={this.state.ipValue} placeholder='请填写ip地址' /></Col>
              <Col span={6}>
                <span className='spanStype'>{this.state.record ? this.state.record.TEST_URL : ''}</span>
              </Col>
              <Col span={6}>
                <Button type='primary' onClick={this.handleTestResult}>测试</Button>
              </Col>
            </Row>
          </Modal>
          <Modal
            visible={this.state.showResultMadol}
            onOk={this.handleResultOk}
            onCancel={this.handleResultCancle}
            title='测试结果'
          >
            {
              this.state.testResult === true ? <span>{this.state.ipValue}{this.state.record.INDEX_URL}测试通过</span> : <span>测试失败</span>
            }
          </Modal>
        </TabPane>
      </Tabs>
    )
  }
  handleGetValue = (e) => {
    const {value} = e.target
    this.setState({
      ipValue: value
    })
  }
  handleResultOk = () => {
    const {testResult} = this.state
    if (testResult === true) {
      let paramsList = []
      const params = {
        'appId': this.state.record.APP_ID,
        'appVersion': this.state.record.APP_VERSION,
        'appLink': this.state.ipValue + this.state.record.INDEX_URL
      }
      paramsList.push(params)
      const params1 = {
        userId: webStorage.getItem('STAR_V2_USERID')
      }
      waitVeriAgreev2(paramsList, params1, (res) => {
        const data = res.data
        if (data.code === 200) {
          message.success('审核成功')
        } else {
          message.warn('审核失败')
        }
        this.setState({
          ipValue: ''
        })
        this.getTableDatas()
      })
    }
    this.setState({
      showResultMadol: false
    })
  }
  handleOk = () => {
    if (this.state.testResult !== true) {
      message.warn('请测试')
      return
    }
    this.setState({
      platModal: false,
      showResultMadol: true
    })
  }
  handleTestResult = () => {
    this.setState({
      platModal: false,
      showResultMadol: true,
      testResult: true
    })
  }
  handleResultCancle = () => {
    this.setState({
      showResultMadol: false
    })
  }
  handleCancle = () => {
    this.setState({
      platModal: false
    })
  }
  showplatModals = (record) => {
    this.setState({
      platModal: true,
      record: record
    })
  }
}

export default WaitVerify
