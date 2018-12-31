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
import { Table, Switch, Divider, message, Popconfirm } from 'antd'
import ajaxUrl from 'config'
import {
  paBatchLeadout,
  changePaToLogin,
  initPaPwd,
  delPaLoginId
} from 'services/software-manage'
import { BlankBar, SearchBarMemberPa } from 'components/software-market'
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

class Parent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      USER_ACCOUNT: '', // 家长账号
      STUDENT_NAME: '', // 学生姓名
      USER_NAME: '', // 家长姓名
      FAMILY_ROLE: '', // 角色
      pagination,
      batchLeadParams: {
        idArrs: []
      },
      selectList: {},
      dataSource: [],
      total: 0,
      toLogin: 'all'
    }
    // 与后台沟通，此处导入暂时不做
    this.uploadProps = {
      action: '',
      // action: `${API_BASE_URL_V2}${SERVICE_PORTAL}/file-upload/upload-user-info`,
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

  getColumns = () => {
    return ([{
      title: '家长姓名',
      dataIndex: 'STUDENT_NAME',
      key: 'STUDENT_NAME',
      width: 200
    }, {
      title: '账号',
      dataIndex: 'USER_ACCOUNT',
      key: 'USER_ACCOUNT',
      width: 200
    }, {
      title: '角色',
      dataIndex: 'FAMILY_ROLE',
      key: 'FAMILY_ROLE'
    }, {
      title: '学生',
      dataIndex: 'STUDENT_NAME',
      key: 'STUDENT_NAME'
    }, {
      title: '允许登录',
      dataIndex: 'LOGIN_PERMISSION_STATUS',
      key: 'LOGIN_PERMISSION_STATUS',
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
      width: 200,
      render: (text, record, index) => {
        return (
          <span>
            <a href='javascript:void(0)' onClick={(e) => this.initPwd(record)}>重置密码</a>
            <Divider type='vertical' />
            <Popconfirm title='您确定要删除这个用户吗?' style={{width: '200px'}} onConfirm={() => this.delLoginId(record)} onCancel={this.cancelUp} okText='确定' cancelText='取消'>
              <span ><a href='javascript:0;' >删除</a></span>
            </Popconfirm>
          </span>
        )
      }
    }])
  }

  cancelUp=(e) => {
    message.error('您打消了删除这一条消息的这个决定。')
  }

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
    if (this.state.toLogin !== 'all') {
      if (this.state.toLogin === 'allow') {
        param.login = 1
      } else {
        param.login = 0
      }
    }
    axios.post(`${API_BASE_URL_V2}${SERVICE_PORTAL}/user-list/role/5/${this.state.pagination.pageNum}/${this.state.pagination.pageSize}`, param).then((res) => {
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

  /*
   * 当搜索框‘账号’值改变时回调
   */
  onIdChange = (val) => {
    let value = val.target.value
    this.setState({
      USER_ACCOUNT: value
    })
  }

  /**
   * 当搜索框‘学生’值改变时回调
   */
  onStuNameChange = (val) => {
    let value = val.target.value
    this.setState({
      STUDENT_NAME: value
    })
  }

  onPaNameChange = (val) => {
    let value = val.target.value
    this.setState({
      USER_NAME: value
    })
  }

  /**
   * 当下拉选择框"选择角色"值改变时回调
   */
  onRoleChange = (val) => {
    let value = val.target.value
    this.setState({
      FAMILY_ROLE: value
    })
  }

  /**
   * 当下拉选择框‘允许登录’值改变时回调
   */
  onToLogin = (val) => {
    console.log(`val: ${val}`)
    this.setState({
      toLogin: val
    })
  }

  /**
   * 点击改变'改变登录状态'
   */
  changeLoginState = (checked, record) => {
    const toLogin = checked ? '1' : '0'
    // console.log(`toLogin: ${toLogin}`)
    // 调用‘改变登录状态的接口’更新后台数据
    const params = {
      maf_id: record.maf_id,
      to_login: toLogin
    }
    changePaToLogin(params, (res) => {
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
      maf_id: record.maf_id
    }
    initPaPwd(params, (res) => {
      console.log(`res.data.msg: ${res.data.msg}`)
    })
    // 最好有个确认的弹窗什么的
    // 后面再加上loading + 操作成功的提示
  }

  /**
   * 删除学生账号
   */
  delLoginId = (record) => {
    const params = {
      maf_id: record.maf_id
    }
    delPaLoginId(params, (res) => {
      console.log(`res.data.msg: ${res.data.msg}`)
    })
    // 最好有个确认的弹窗什么的
    // 后面再加上loading + 操作成功的提示
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
   * 当点击'搜索按钮时的回调'
   */
  search = () => {
    this.getTableDatas()
  }

  /**
   * 当点击'批量导出'按钮时的回调
   */
  onBatchLeadout = () => {
    // 从state中获取实时的fa_id数组的值 作为请求参数传给后台
    const { idArrs } = this.state.batchLeadParams
    console.log(`faIdArrs: ${JSON.stringify(idArrs)}`)
    paBatchLeadout({maf_id: idArrs}, (res) => {
      window.open(ajaxUrl.IMG_BASE_URL + '/' + res.data.info)
      console.log(`${res.data.info}`)
    })
  }

  /**
   * 多选选项变化
   */
  rowSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`)
    console.log(`selectedRows: ${JSON.stringify(selectedRows)}`)
    // 从view中得到数据 并把fa_id提取出来组合为一个新数组
    let idArr = []
    selectedRows.map((val, index) => {
      idArr.push(val.maf_id)
    })
    // 将fa_id得到的新数组映射到state中
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
        <SearchBarMemberPa
          selectList={{ ...selectList }}
          onSelect1Change={this.onIdChange}
          // onSelect2Change={this.onStuNameChange}
          onSelect3Change={this.onPaNameChange}
          // onSelect4Change={this.onRoleChange}
          onSelect5Change={this.onToLogin}
          onBtnSearchClick={this.search}
          onBtnBatchExport={this.onBatchLeadout}
          upload={this.upload}
        />
        <BlankBar />
        <Table
          columns={this.getColumns()}
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
        />
      </div>
    )
  }
}

export default Parent
