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
// import axios from 'axios'
import ajaxUrl from 'config'
import { BlankBar, SearchBarMember } from 'components/software-market'
import { DelLoginIdModal, FaDetailsModal } from '../common-pages'
import MemRenewWin from './MemRenewWin'
import {
  firmRenewList,
  delFaId,
  changeFaLoginState,
  initFaPwd,
  getFaDetails,
  getFactoryDetail,
  faBatchLeadout,
  getIdSelectList,
  getNameSelectList,
  getContractSelectList
} from 'services/software-manage'
import { addKey2TableData, getSelectList, getSelectListWithNoParam } from 'utils/utils-sw-manage'
import 'pages/software-market/SoftwareMarket.scss'

/**
   * 表格分页器设置-默认值
   */
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true
}

class Manufacturer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      reqParam: {
        faName: '', // 临时值 后面赋空
        faId: '',
        toLogin: '',
        numDay: ''
      },
      pagination,
      memRenewWinVisible: false,
      memRenewRecord: {},
      delModalCon: {
        visible: false,
        faId: null
      },
      faDetModalCon: {
        visible: false,
        resData: null
      },
      batchLeadParams: {
        faIdArrs: []
      },
      selectList: {}
    }
  }

  /**
   * 表格分页器设置-默认值
  //  */
  // getPagination = () => {
  //   const { pageSize, pageNum } = this.state.pagination
  //   return {
  //     pageNum: pageNum,
  //     pageSize: pageSize,
  //     showQuickJumper: true,
  //     showSizeChanger: true,
  //     text: '' // 用来赋空翻页后的search框--需要这样吗
  //   }
  // }

  getColumns () {
    return [
      {
        title: '厂商名称',
        dataIndex: 'fa_name',
        key: 'fa_name',
        width: 200
      }, {
        title: '账号',
        dataIndex: 'fa_id',
        key: 'fa_id',
        width: 200
      }, {
        title: '在运营软件数',
        dataIndex: 'num',
        key: 'num'
      }, {
        title: '合同状态',
        dataIndex: 'num_day',
        key: 'num_day'
      }, {
        title: '允许登录',
        dataIndex: 'to_login',
        key: 'to_login',
        render: (text, record, index) => {
          let check = true
          if (text === 0) {
            check = false
          }
          return (
            <Switch defaultChecked={check} onChange={(checked) => this.changeLoginState(checked, record)} />
          )
        }
      }, {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        width: 280,
        render: (text, record, index) => {
          return (
            <span>
              <a href='javascript:void(0)' onClick={(e) => this.showMemRenewWin(record)}>续签</a>
              <Divider type='vertical' />
              <a href='javascript:void(0)' onClick={(e) => this.showFaDetModal(record)}>详情</a>
              <Divider type='vertical' />
              <a href='javascript:void(0)' onClick={(e) => this.initPwd(record)}>初始密码</a>
              <Divider type='vertical' />
              <a href='javascript:void(0)' onClick={(e) => this.showDetModal(record)}>删除账号</a>
            </span>
          )
        }
      }]
  }

  // getPopContent = (record) => {
  //   return (<div>
  //     <div><a href='javascript:void(0)' onClick={(e) => this.initPwd(record)}>初始密码</a></div>
  //     <Divider className='slim-divid' />
  //     <div><a href='javascript:void(0)' onClick={(e) => this.showDetModal(record)}>删除账号</a></div>
  //   </div>)
  // }

  getParams = () => {
    const { faName, faId, toLogin, numDay } = this.state.reqParam
    // 最后都要赋空
    return {
      pageSize: this.state.pagination.pageSize,
      pageNum: this.state.pagination.pageNum,
      fa_name: faName || '',
      fa_id: faId || '',
      to_login: toLogin || '',
      num_day: numDay || ''
    }
  }

  /**
   * 获取运营中的应用列表数据
   * 问题：如何把fa_id 转换为数据dataSource中每条数据的key
   * 用一个程序-专门转换后台数据-给每一条记录加上key值--把自身的fa_id映射过去即可
   */
  getTableDatas = () => {
    firmRenewList(this.getParams(), (res) => {
      const resData = res.data
      // console.log(`resData: ${JSON.stringify(resData)}`)
      this.setState({
        tableData: {
          data: addKey2TableData(resData.list, 'fa_id'),
          total: resData.total
        }
      })
    })
  }

  // 显示‘详情’弹窗
  showFaDetModal = (record) => {
    // 指定回调中setState()的执行环境 bind(this)效果也一样 但是这里会有报错
    const thiz = this
    // 获取对应的后台数据
    const params = {
      fa_id: record.fa_id
    }
    getFaDetails(params, (res) => {
      const resData = res.data
      // 通过state将数据res传给子组件
      thiz.setState({
        faDetModalCon: {
          ...this.state.faDetModalCon,
          visible: true,
          resData: resData
        }
      })
    })
  }
  // 关闭‘详情’弹窗
  handleFaDetCancel = () => {
    this.setState({
      faDetModalCon: {
        ...this.state.faDetModalCon,
        visible: false
      }
    })
  }

  // 显示‘删除账号’弹窗
  showDetModal = (record) => {
    // console.log(`record.fa_id : ${record.fa_id}`)
    this.setState({
      delModalCon: {
        ...this.state.delModalCon,
        visible: true,
        faId: record.fa_id // 还要对齐 后台用的哪个参数
      }
    })
  }
  // 关闭‘删除账号’弹窗
  handleDelLoginIdCancel = () => {
    this.setState({
      delModalCon: {
        ...this.state.delModalCon,
        visible: false
      }
    })
  }

  /**
   * 当搜索框‘账号’值改变时回调
   */
  onFaLoginidChange = (e) => {
    // console.log(`e: ${this.Obj2String(e.target.value)}`)
    // 修改state.reqParams中对应的值
    let value = e.target.value
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        faId: value
      }
    })
  }

  /**
   * 当搜索框‘厂商名称’值改变时回调
   */
  onFaNameChange = (val) => {
    // console.log(`e: ${this.Obj2String(e.target.value)}`)
    // 修改state.reqParams中对应的值
    let value = val.target.value
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        faName: value
      }
    })
  }

  /**
   * 当下拉选择框‘合同状态’值改变时回调
   */
  onNumDayChange = (val) => {
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        numDay: val
      }
    })
  }

  /**
   * 当下拉选择框‘允许登录’值改变时回调
   */
  onToLogin = (val) => {
    // console.log(`val: ${val}`)
    // 修改state.reqParams中对应的值
    let loginAllow = 0
    if (val === 'allow') {
      loginAllow = '1'
    } else if (val === 'refuse') {
      loginAllow = '0'
    } else if (val === 'all') {
      loginAllow = ''
    }
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        toLogin: loginAllow
      }
    })
  }

  /**
   * 当点击'搜索按钮时的回调'
   */
  search = () => {
    // 参数已在state中更新 直接请求最新的列表数据
    this.getTableDatas()
  }

  /**
   * 删除某个厂商的账号
   */
  handleDelLoginId = () => {
    const params = {
      fa_id: this.state.delModalCon.faId
    }
    delFaId(params, (res) => {
      // 这里其实应改通过state映射到一个view上 有个'删除成功'的提示
      console.log(`res.data.msg: ${res.data.msg}`)
    })
    // 关闭弹窗
    this.handleDelLoginIdCancel()
    // 重新刷新数据dataSource
    this.getTableDatas()
  }

  /**
   * 点击改变'改变登录状态'
   */
  changeLoginState = (checked, record) => {
    const toLogin = checked ? 1 : 0
    // console.log(`toLogin: ${toLogin}`)
    // 调用‘改变登录状态的接口’更新后台数据
    const params = {
      fa_id: record.fa_id,
      to_login: toLogin
    }
    changeFaLoginState(params, (res) => {
      console.log(`res.data.msg: ${res.data.msg}`)
    })
    // 刷新表格数据
    this.getTableDatas()
    // 后面再加上loading + 操作成功的提示
  }

  /**
   * 初始化厂商密码
   */
  initPwd = (record) => {
    const params = {
      fa_id: record.fa_id
    }
    initFaPwd(params, (res) => {
      console.log(`res.data.msg: ${res.data.msg}`)
    })
    // 最好有个确认的弹窗什么的
    // 后面再加上loading + 操作成功的提示
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

  handleCloseMemRenewWin () {
    this.setState({
      memRenewWinVisible: false
    })
  }

  /**
   * 获取当前选中行的信息
   * @param fa_id
   */
  showMemRenewWin (record) {
    getFactoryDetail({
      fa_id: record.fa_id
    }, (response) => {
      let result = response.data
      this.setState({
        memRenewRecord: result.data || {},
        memRenewWinVisible: true
      })
    })
  }

  /**
   * 多选选项变化
   */
  rowSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`)
    // console.log(`selectedRows: ${JSON.stringify(selectedRows)}`)
    // 从view中得到数据 并把fa_id提取出来组合为一个新数组
    let faIdArr = []
    selectedRows.map((val, index) => {
      faIdArr.push(val.fa_id)
    })
    // 将fa_id得到的新数组映射到state中
    this.setState({
      batchLeadParams: {
        faIdArrs: faIdArr
      }
    })
  }

  /**
   * 批量导出
   */
  onBatchLeadout = () => {
    // 从state中获取实时的fa_id数组的值 作为请求参数传给后台
    const { faIdArrs } = this.state.batchLeadParams
    console.log(`faIdArrs: ${JSON.stringify(faIdArrs)}`)
    faBatchLeadout({fa_id: faIdArrs}, (res) => {
      window.open(ajaxUrl.IMG_BASE_URL + '/' + res.data.info)
      console.log(`${res.data.info}`)
    })
  }

  /**
   *获取一系列参数
   */
  // 获取账号--考虑：该一步到位了-- 直接用redux管理状态 - 虽然用传入子组件函数的方法也可以获取到子组件中的值
  componentDidMount () {
    this.getTableDatas()
    // 请求下拉框的数据
    getSelectList(getIdSelectList, 'firm', 'idList', this)
    getSelectList(getNameSelectList, 'firm', 'faNameList', this)
    getSelectListWithNoParam(getContractSelectList, 'contractList', this)
  }

  render () {
    const { pagination, tableData, delModalCon, faDetModalCon, selectList } = this.state
    return (
      <div className='software-wrap'>
        <SearchBarMember
          inputText1='账号 '
          inputText2='厂商名称 '
          inputText3='合同状态 '
          inputText4='允许登录 '
          selectList={{...selectList}}
          onSelect1Change={this.onFaLoginidChange}
          onSelect2Change={this.onFaNameChange}
          onSelect3Change={this.onNumDayChange}
          onSelect4Change={this.onToLogin}
          onBtnSearchClick={this.search}
          onBtnBatchExport={this.onBatchLeadout}
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
        <MemRenewWin record={this.state.memRenewRecord} visible={this.state.memRenewWinVisible} handleClose={() => { this.handleCloseMemRenewWin() }} />
        <div ref='delLoginIdElem' />
        <DelLoginIdModal
          title='删除账号'
          visible={delModalCon.visible}
          getContainer={() => this.refs.delLoginIdElem}
          onCancel={this.handleDelLoginIdCancel}
          footer={[
            <Button key='ok' type='primary' onClick={this.handleDelLoginId} >确定</Button>,
            <Button key='cancel'onClick={this.handleDelLoginIdCancel} >取消</Button>
          ]}
        />
        <div ref='faDetElem' className='fa-det-wrap' />
        <FaDetailsModal
          title='厂商详情'
          resData={faDetModalCon.resData}
          visible={faDetModalCon.visible}
          getContainer={() => this.refs.faDetElem}
          onCancel={this.handleFaDetCancel}
          footer={[
            <Button key='back' type='primary' onClick={this.handleFaDetCancel} >关闭</Button>
          ]}
        />
      </div>
    )
  }
}

export default Manufacturer
