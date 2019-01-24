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
// import { Table, Switch, Divider, message } from 'antd'
import { Table, message, Modal, Divider, Switch } from 'antd'
// import { Link } from 'react-router-dom'
// import ajaxUrl from 'config'
import {
  // schGetData,
  // maDelId,
  maInitPwd,
  // schBatchLeadout,
  // getIdSelectList,
  // getNameSelectList,
  toLogin
} from 'services/software-manage'
import { SearchBarMemberSch, NewSchool } from 'components/software-market'
// import {
//   addKey2TableData
//   // getSelectList
// } from 'utils/utils-sw-manage'
import 'pages/software-market/SoftwareMarket.scss'
import config from '../../../../config/index'
import {axios} from '../../../../utils'
import PropTypes from 'prop-types'
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

class School extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      toLogin: 'all',
      reqParam: {
        shId: '',
        shName: '',
        eduServices: '',
        loginType: ''
      },
      pagination,
      batchLeadParams: {
        idArrs: []
      },
      dataSource: [],
      selectList: {},
      visible: false
    }
  }

  getColumns = () => {
    return ([
      {
        title: '学校名称',
        dataIndex: 'schoolName',
        key: 'schoolName',
        width: 200
      }, {
        title: '账号',
        dataIndex: 'sh_id',
        key: 'sh_id',
        width: 200
      }, {
        title: '所属教育机构',
        dataIndex: 'authorityName'
      }, {
        title: '状态',
        dataIndex: 'status'
      }, {
        title: '代理商',
        dataIndex: 'daili'
      }, {
        title: '联系方式',
        dataIndex: 'telephone'
      }, {
        title: '地址',
        dataIndex: 'schoolAddress'
      }, {
        title: '允许登录',
        dataIndex: 'to_login',
        render: (text, record, index) => {
          return (
            <Switch checked={record.to_login === 1} onChange={() => this.handleToLogin(record)} />
          )
        }
      }, {
        title: '操作',
        dataIndex: 'options',
        key: 'options',
        width: 260,
        render: (text, record, index) => {
          return (
            <span>
              {/* <Link to={{pathname: '/software-market-home/member-manage/teacher', search: record.sh_id}}>教师</Link>
              <Divider type='vertical' />
              <Link to={{pathname: '/software-market-home/member-manage/student', search: record.sh_id}}>学生</Link>
              <Divider type='vertical' /> */}
              <a href='javascript:void(0)' onClick={() => this.props.changeState(2, record)}>老师</a>
              <Divider type='vertical' />
              <a href='javascript:void(0)' onClick={() => this.props.changeState(4, record)}>学生</a>
              <Divider type='vertical' />
              <a href='javascript:void(0)'>重置密码</a>
              <Divider type='vertical' />
              <a href='javascript:void(0)'>删除</a>
            </span>
          )
        }
      }])
  }

  getParams = () => {
    let a = window.location.href.split('?')
    const {
      shId,
      shName,
      eduServices,
      loginType
    } = this.state.reqParam
    return {
      pageSize: this.state.pagination.pageSize,
      pageNum: this.state.pagination.pageNum,
      sh_id: shId || '',
      shName: shName || '',
      eduServices: eduServices || '',
      loginType: loginType || '',
      id: a[1] || ''
    }
  }

  /**
   * 获取运营中的应用列表数据
   * 问题：如何把fa_id 转换为数据dataSource中每条数据的key
   * 用一个程序-专门转换后台数据-给每一条记录加上key值--把自身的fa_id映射过去即可
   */
  getTableDatas = () => {
    let param = {
      pageNum: this.state.pagination.pageNum,
      pageSize: this.state.pagination.pageSize
    }
    // if (this.state.USER_ACCOUNT !== '') {
    //   // 后台要求，回传数据的时候字段为小写
    //   param.account = this.state.USER_ACCOUNT
    // }
    // if (this.state.USER_NAME !== '') {
    //   // 后台要求，回传数据的时候字段为小写
    //   param.name = this.state.USER_NAME
    // }
    // if (this.state.AUTHORITY_NAME !== '') {
    //   // 后台要求，回传数据的时候字段为小写
    //   param.organization_name = this.state.AUTHORITY_NAME
    // }
    if (this.state.toLogin !== 'all') {
      if (this.state.toLogin === 'allow') {
        param.login = 1
      } else {
        param.login = 0
      }
    }
    axios.get(`${API_BASE_URL_V2}${SERVICE_PORTAL}/schools`, {params: param}).then((res) => {
      if (res.data.code === 200) {
        console.log(res.data.data)
        // this.setState({
        //   dataSource: res.data.data.content,
        //   total: res.data.data.totalElements
        // })
        this.setState({
          dataSource: res.data.data.info,
          total: res.data.data.total
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
      id: record && record.sh_id,
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
    let value = val.target.value
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        shId: value
      }
    })
  }

  /**
   * 当搜索框‘学校名称’值改变时回调
   */
  onSchNameChange = (val) => {
    // 修改state.reqParams中对应的值
    let value = val.target.value
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        shName: value
      }
    })
  }

  /**
   * 当下拉选择框‘所属机构’值改变时回调
   * -- 所属机构的下拉框获取需要后台动态提供
   */
  onBelongChange = (val) => {
    console.log(`val: ${val}`)
    // 修改state.reqParams中对应的值
    let value = val.target.value
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        eduServices: value
      }
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
   * 删除学校的账号
   */
  delId = (record) => {
    // 还缺一个参数 后台未提供 "user_type": 1//用户类型
    // const params = {
    //   sh_id: record.sh_id
    // }
    // maDelId(params, (res) => {
    //   console.log(`res.data.result: ${res.data.result}`)
    // })
    // 最好有个确认的弹窗什么的
    // 后面再加上loading + 操作成功的提示
  }

  /**
 * 重置密码
 */
  initPwd = (record) => {
    // 后台参数不确定
    const params = {
      sh_id: record.sh_id
    }
    maInitPwd(params, (res) => {
      console.log(`res.data.result: ${res.data.result}`)
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
    console.log(`开始搜索: ${JSON.stringify(this.getParams())}`)
    // this.getTableDatas()
  }

  /**
   * 当点击'批量导出'按钮时的回调
   */
  // onBatchLeadout = () => {
  //   // 从state中获取实时的stu_id数组的值 作为请求参数传给后台
  //   const { idArrs } = this.state.batchLeadParams
  //   console.log(`IdArrs: ${JSON.stringify(idArrs)}`)
  //   schBatchLeadout({sh_id: idArrs}, (res) => {
  //     window.open(ajaxUrl.IMG_BASE_URL + '/' + res.data.info)
  //     console.log(`${res.data.info}`)
  //   })
  // }

  /**
   * 多选选项变化
   */
  rowSelectChange = (selectedRowKeys, selectedRows) => {
    // 从view中得到数据 并把stu_id提取出来组合为一个新数组
    let idArr = []
    selectedRows.map((val, index) => {
      idArr.push(val.sh_id)
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
   * 新增学校
   */
  newSchool = () => {
    this.setState({
      visible: true
    })
  }
  /** 确认新增学校 */
  onOk = () => {
    this.refs.formNew.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }
  /**
   *获取一系列参数
   */
  // 获取账号--考虑：该一步到位了-- 直接用redux管理状态 - 虽然用传入子组件函数的方法也可以获取到子组件中的值
  componentDidMount () {
    this.getTableDatas()
    // 请求下拉框的数据
    // getSelectList(getIdSelectList, 'school', 'idList', this)
    // getSelectList(getNameSelectList, 'school', 'schNameList', this)
    // getSelectList(getNameSelectList, 'edu', 'eduNameList', this)
  }

  render () {
    const { pagination, selectList, visible } = this.state
    return (
      <div className='software-wrap'>
        <SearchBarMemberSch
          selectList={{ ...selectList }}
          newSchool={this.newSchool}
          onSelect1Change={this.onIdChange}
          onSelect2Change={this.onSchNameChange}
          onSelect3Change={this.onBelongChange}
          onSelect4Change={this.onToLogin}
          onBtnSearchClick={this.search}
          onBtnBatchExport={this.onBatchLeadout}
        />
        <Table
          columns={this.getColumns()}
          rowKey={(record, index) => index}
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
        <Modal visible={visible}
          onOk={this.onOk}
          centered
          onCancel={() => this.setState({visible: false})}
          title='新增学校'>
          <NewSchool ref='formNew' />
        </Modal>
      </div>
    )
  }
}
School.propTypes = {
  changeState: PropTypes.func
}

export default School
