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
  // getStudentDatas,
  // changeStuToLogin,
  // initStuPwd,
  // delStuLoginId,
  stBatchLeadout
} from 'services/software-manage'
import { BlankBar, SearchBarMemberStu } from 'components/software-market'
// import { addKey2TableData } from 'utils/utils-sw-manage'
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

class Student extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      total: 0,
      reqParam: {
        stuName: '',
        stuId: '',
        mafName: '',
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
      data: { fileType: 'document', userType: 1 },
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
      title: '学生姓名',
      dataIndex: 'USER_NAME',
      key: 'USER_NAME',
      width: 200
    }, {
      title: '账号',
      dataIndex: 'USER_ACCOUNT',
      key: 'USER_ACCOUNT',
      width: 200
    }, {
      title: '学校',
      dataIndex: 'AUTHORITY_NAME',
      key: 'AUTHORITY_NAME'
    }, {
      title: '家长',
      dataIndex: 'PARENT_NAME',
      key: 'PARENT_NAME'
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
    }]
    )
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
    if (this.state.AUTHORITY_NAME !== '') {
      // 后台要求，回传数据的时候字段为小写
      param.organization_name = this.state.AUTHORITY_NAME
    }
    if (this.state.toLogin !== 'all') {
      if (this.state.toLogin === 'allow') {
        param.login = 1
      } else {
        param.login = 0
      }
    }
    axios.post(`${API_BASE_URL_V2}${SERVICE_PORTAL}/user-list/role/1/${this.state.pagination.pageNum}/${this.state.pagination.pageSize}`, param).then((res) => {
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

  /**
   * 当搜索框‘账号’值改变时回调
   */
  onstuIdChange = (val) => {
    // console.log(`e: ${this.Obj2String(e.target.value)}`)
    let value = val.target.value
    this.setState({
      USER_ACCOUNT: value
    })
  }

  /**
   * 当搜索框‘学生名字’值改变时回调
   */
  onStuNameChange = (e) => {
    // console.log(`e: ${this.Obj2String(e.target.value)}`)
    // 修改state.reqParams中对应的值
    this.setState({
      USER_NAME: e.target.value
    })
  }

  /**
   * 当下拉选择框‘允许登录’值改变时回调
   */
  onToLogin = (val) => {
    this.setState({
      toLogin: val
    })
  }

  /**
   * 点击改变'改变登录状态'
   */
  changeLoginState = (checked, record) => {
    const params = {
      userId: record && record.USER_ID
    }
    record.LOGIN_PERMISSION_STATUS === 0 ? params.userInfo = {
      isLogin: 1
    } : params.userInfo = {isLogin: 0}
    this.changeState(params)
  }

  changeState = (params) => {
    axios.put(`${API_BASE_URL_V2}${SERVICE_PORTAL}/user-info/updateUserInfo?userId=${params.userId}`, params).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        message.success('操作成功')
        this.getTableDatas()
      } else {
        message.warn(res.data.msg)
      }
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
  // 学校名称改变
  onShNameChange = (e) => {
    this.setState({
      AUTHORITY_NAME: e.target.value
    })
  }

  // 家长名称改变
  onPaNameChange = (e) => {
    // console.log(`e: ${this.Obj2String(e.target.value)}`)
    let value = e.target.value
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        mafName: value
      }
    })
  }

  /**
   * 删除学生账号
   */
  delLoginId = (record) => {
    const params = {
      userId: record && record.USER_ID,
      userInfo: {
        isDelete: 0
      }
    }
    this.changeState(params)
  }

  /**
   * 初始化厂商密码
   */
  initPwd = (record) => {
    const params = {
      userId: record && record.USER_ID,
      userInfo: {
        isReset: 0
      }
    }
    this.changeState(params)
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
    // 从state中获取实时的stu_id数组的值 作为请求参数传给后台
    const { idArrs } = this.state.batchLeadParams
    console.log(`IdArrs: ${JSON.stringify(idArrs)}`)
    stBatchLeadout({stu_id: idArrs}, (res) => {
      window.open(ajaxUrl.IMG_BASE_URL + '/' + res.data.info)
      console.log(`${res.data.info}`)
    })
  }

  /**
   * 多选选项变化
   */
  rowSelectChange = (selectedRowKeys, selectedRows) => {
    // 从view中得到数据 并把stu_id提取出来组合为一个新数组
    let idArr = []
    selectedRows.map((val, index) => {
      idArr.push(val.stu_id)
    })
    // 将stu_id得到的新数组映射到state中
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
        <SearchBarMemberStu
          selectList={{ ...selectList }}
          onSelect1Change={this.onstuIdChange}
          onSelect2Change={this.onStuNameChange}
          onSelect3Change={this.onShNameChange}
          // onSelect4Change={this.onPaNameChange}
          onSelect5Change={this.onToLogin}
          onBtnSearchClick={this.search}
          onBtnBatchExport={this.onBatchLeadout}
          uploadProps={this.uploadProps}
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

export default Student
