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
import { Table, Switch, Divider, message } from 'antd'
import { Link } from 'react-router-dom'
import ajaxUrl from 'config'
import {
  // thGetData,
  maDelId,
  maInitPwd,
  thBatchLeadout,
  // getIdSelectList,
  // getNameSelectList
  toLogin
} from 'services/software-manage'
import { BlankBar, SearchBarMemberTeac } from 'components/software-market'
import 'pages/software-market/SoftwareMarket.scss'
import config from '../../../../config/index'
import {axios} from '../../../../utils'
const {API_BASE_URL_V2, SERVICE_PORTAL} = config

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

class Teacher extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      total: 0,
      reqParam: {
        thId: '',
        thName: '',
        toLogin: '',
        shName: ''
      },
      pagination,
      batchLeadParams: {
        idArrs: []
      },
      selectList: {}
    }

    this.uploadProps = {
      action: `${API_BASE_URL_V2}${SERVICE_PORTAL}/file-upload/upload-user-info`,
      data: { fileType: 'document', userType: 2 },
      onChange: this.onChange
    }
  }

  onChange=(info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 导入成功`)
      this.setState({
        updateList: this.state.updateList + 1
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 导入失败`)
    }
  }

  getClomus = () => {
    return ([
      {
        title: '教师姓名',
        dataIndex: 'USER_NAME',
        key: 'USER_NAME',
        width: 200
      }, {
        title: '账号',
        dataIndex: 'USER_ACCOUNT',
        key: 'USER_ACCOUNT',
        width: 200
      }, {
        title: '所属机构',
        dataIndex: 'AUTHORITY_NAME',
        key: 'AUTHORITY_NAME'
      }, {
        title: '允许登录',
        dataIndex: 'LOGIN_PERMISSION_STATUS',
        key: 'LOGIN_PERMISSION_STATUS',
        render: (text, record, index) => {
          return (
            <Switch checked={record.to_login === 1} onChange={() => this.handleToLogin(record)} />
          )
        }
      }, {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        width: 200,
        render: (text, record, index) => {
          return (
            <span>
              <Link to={{pathname: '/software-market-home/member-manage/student', search: record.th_id}}>学生</Link>
              <Divider type='vertical' />
              <a href='javascript:void(0)' onClick={(e) => this.initPwd(record)}>重置密码</a>
              <Divider type='vertical' />
              <a href='javascript:void(0)' onClick={(e) => this.delLoginId(record)}>删除</a>
            </span>
          )
        }
      }])
  }

  getParams = () => {
    let a = window.location.href.split('?')
    const {
      thId,
      thName,
      toLogin,
      shName
    } = this.state.reqParam
    // 最后都要赋空
    return {
      pageSize: this.state.pagination.pageSize,
      pageNum: this.state.pagination.pageNum,
      th_id: thId || '',
      th_name: thName || '',
      to_login: toLogin || '',
      sh_name: shName || '',
      id: a[1] || ''
    }
  }

  /**
   * 获取运营中的应用列表数据
   * 问题：如何把fa_id 转换为数据dataSource中每条数据的key
   * 用一个程序-专门转换后台数据-给每一条记录加上key值--把自身的fa_id映射过去即可
   */
  getTableDatas = () => {
    let param = {}
    if (this.state.USER_ACCOUNT !== '') {
      // 后台要求，回传数据的时候字段为小写
      param.account = this.state.USER_ACCOUNT
    }
    if (this.state.USER_NAME !== '') {
      // 后台要求，回传数据的时候字段为小写
      param.name = this.state.USER_NAME
    }
    if (this.state.AUTHORITY_NAME !== '') {
      // 后台要求，回传数据的时候字段为小写
      param.organization_name = this.state.AUTHORITY_NAME
    }
    axios.post(`${API_BASE_URL_V2}${SERVICE_PORTAL}/user-list/role/2/${this.state.pagination.pageNum}/${this.state.pagination.pageSize}`, param).then((res) => {
      if (res.data.code === 200) {
        this.setState({
          dataSource: res.data.data.content,
          total: res.data.data.totalElements
        })
      } else {
        message.warn(res.data.msg)
      }
    })
  }

  // 允许登录状态切换
  handleToLogin = (record) => {
    const thiz = this
    const params = {
      id: record && record.th_id,
      to_login: record.to_login ? 0 : 1
    }
    toLogin(params, (res) => {
      const data = res.data ? res.data : {}
      console.log(data)
      if (data.SUCCESS) {
        message.success(data.msg)
        thiz.getTableDatas()
      }
    })
  }

  /**
   * 当搜索框‘账号’值改变时回调
   */
  onIdChange = (val) => {
    // 修改state.reqParams中对应的值
    // 暂时val和显示的值是一个 看后台传入的数据结构
    let value = val.target.value
    this.setState({
      USER_ACCOUNT: value
    })
  }

  /**
   * 当搜索框‘教师姓名’值改变时回调
   */
  onthNameChange = (val) => {
    // 修改state.reqParams中对应的值
    let value = val.target.value
    this.setState({
      USER_NAME: value
    })
  }

  /**
   * 当下拉选择框‘学校名称’值改变时回调
   */
  onSchNameChange = (val) => {
    let value = val.target.value
    this.setState({
      AUTHORITY_NAME: value
    })
  }

  /**
   * 当下拉选择框‘允许登录’值改变时回调
   */
  onToLogin = (val) => {
    console.log('允许筛选选的值', val)
    let loginAllow = ''
    if (val === 'allow') {
      loginAllow = '1'
    } else if (val === 'refuse') {
      loginAllow = '0'
    } else if (val === 'all') {
      loginAllow = ''
    }
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        toLogin: loginAllow
      }
    }, () => {
      console.log('111111', this.state.reqParam)
    })
  }

  /**
   * 临时用来字符串化对象 -- 测试结束后删除
   */
  Obj2String = (obj) => {
    let str = ''
    for (let item in obj) {
      str += `${item}: ${obj[item]} \n`
    }
    return str
  }

  /**
   * 删除账号
   */
  delLoginId = (record) => {
    const params = {
      th_id: record.th_id
    }
    maDelId(params, (res) => {
      console.log(`res.data.result: ${res.data.result}`)
    })
    // 最好有个确认的弹窗什么的
    // 后面再加上loading + 操作成功的提示
  }

  /**
   * 初始化密码
   */
  initPwd = (record) => {
    const params = {
      th_id: record.th_id
    }
    maInitPwd(params, (res) => {
      console.log(`res.data.result: ${res.data.result}`)
    })
    // 最好有个确认的弹窗什么的
    // 后面再加上loading + 操作成功的提示
  }

  /**
   * 当点击'搜索按钮时的回调'
   */
  search = () => {
    this.getTableDatas()
  }

  /**
   * 当点击'批量导出'按钮时的回调
   */
  onBatchLeadout = () => {
    // 从state中获取实时的th_id数组的值 作为请求参数传给后台
    const { idArrs } = this.state.batchLeadParams
    // console.log(`IdArrs: ${JSON.stringify(idArrs)}`)
    thBatchLeadout({th_id: idArrs}, (res) => {
      window.open(ajaxUrl.IMG_BASE_URL + '/' + res.data.info)
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
      idArr.push(val.th_id)
    })
    // 将th_id得到的新数组映射到state中
    this.setState({
      batchLeadParams: {
        idArrs: idArr
      }
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

  /**
   *获取一系列参数
   */
  // 获取账号--考虑：该一步到位了-- 直接用redux管理状态 - 虽然用传入子组件函数的方法也可以获取到子组件中的值
  componentDidMount () {
    this.getTableDatas()
  }

  render () {
    const { pagination, selectList } = this.state
    return (
      <div className='software-wrap'>
        <SearchBarMemberTeac
          selectList={{ ...selectList }}
          onSelect1Change={this.onIdChange}
          onSelect2Change={this.onthNameChange}
          onSelect3Change={this.onSchNameChange}
          onSelect4Change={this.onToLogin}
          onBtnSearchClick={this.search}
          onBtnBatchExport={this.onBatchLeadout}
          uploadProps={this.uploadProps}
        />
        <BlankBar />
        <Table
          columns={this.getClomus()}
          dataSource={this.state.dataSource}
          pagination={{
            ...pagination,
            total: this.state.total,
            onShowSizeChange: this.onShowSizeChange,
            onChange: this.pageNumChange
          }}
          // rowSelection={{
          //   onChange: this.rowSelectChange
          // }}
          rowKey={(record, index) => {
            return index
          }}
        />
      </div>
    )
  }
}

export default Teacher
