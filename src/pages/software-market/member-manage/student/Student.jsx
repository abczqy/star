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
import { Table, Switch, Divider } from 'antd'
import {
  getStudentDatas,
  changeStuToLogin,
  initStuPwd,
  delStuLoginId,
  stBatchLeadout
} from 'services/software-manage'
import { BlankBar, SearchBarMemberStu } from 'components/software-market'
import { addKey2TableData } from 'utils/utils-sw-manage'
import 'pages/software-market/SoftwareMarket.scss'

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
      tableData: {
        data: [],
        total: 0
      },
      reqParam: {
        pageSize: 15,
        pageNum: 1,
        stuName: '',
        stuId: '',
        mafName: '',
        toLogin: '',
        shName: ''
      },
      pagination,
      batchLeadParams: {
        idArrs: []
      }
    }
  }

  getColumns = () => {
    return ([{
      title: '学生姓名',
      dataIndex: 'stu_name',
      key: 'stu_name',
      width: 200
    }, {
      title: '账号',
      dataIndex: 'stu_id',
      key: 'stu_id',
      width: 200
    }, {
      title: '学校',
      dataIndex: 'sh_name',
      key: 'sh_name'
    }, {
      title: '家长',
      dataIndex: 'maf_name',
      key: 'maf_name'
    }, {
      title: '允许登录',
      dataIndex: 'to_login',
      key: 'to_login',
      render: (text, record, index) => {
        let check = true
        if (text === '0') {
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
            <a href='javascript:void(0)' onClick={(e) => this.delLoginId(record)}>删除</a>
          </span>
        )
      }
    }]
    )
  }

  getParams = () => {
    const {
      pageSize,
      pageNum,
      stuName,
      stuId,
      mafName,
      toLogin,
      shName
    } = this.state.reqParam
    // 最后都要赋空
    return {
      pageSize: pageSize || 15,
      pageNum: pageNum || 1,
      stu_name: stuName || '',
      stu_id: stuId || '',
      maf_name: mafName || '',
      to_login: toLogin || '',
      sh_name: shName || ''
    }
  }

  /**
   * 获取运营中的应用列表数据
   * 问题：如何把stu_id 转换为数据dataSource中每条数据的key
   * 用一个程序-专门转换后台数据-给每一条记录加上key值--把自身的stu_id映射过去即可
   */
  getTableDatas = () => {
    getStudentDatas(this.getParams(), (res) => {
      const data = res.data
      // console.log(`data: ${JSON.stringify(data)}`)
      this.setState({
        tableData: {
          data: addKey2TableData(data.list, 'stu_id'),
          total: data.total
        }
      })
    })
  }

  /**
   * 当搜索框‘账号’值改变时回调
   */
  onstuIdChange = (e) => {
    console.log(`e: ${this.Obj2String(e.target.value)}`)
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        stuId: e.target.value
      }
    })
  }

  /**
   * 当搜索框‘厂商名称’值改变时回调
   */
  onStuNameChange = (e) => {
    console.log(`e: ${this.Obj2String(e.target.value)}`)
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        stuName: e.target.value
      }
    })
  }

  /**
   * 当下拉选择框‘合同状态’值改变时回调
   */
  onNumDayChange = (val) => {
    console.log(`val: ${val}`)
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        num_day: val
      }
    })
  }

  /**
   * 当下拉选择框‘允许登录’值改变时回调
   */
  onToLogin = (val) => {
    console.log(`val: ${val}`)
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
    })
  }

  /**
   * 点击改变'改变登录状态'
   */
  changeLoginState = (checked, record) => {
    const toLogin = checked ? '1' : '0'
    console.log(`toLogin: ${toLogin}`)
    // 调用‘改变登录状态的接口’更新后台数据
    const params = {
      stu_id: record.stu_id,
      to_login: toLogin
    }
    changeStuToLogin(params, (res) => {
      console.log(`res.data.msg: ${res.data.msg}`)
    })
    // 刷新表格数据
    this.getTableDatas()
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
  // 学校名称改变
  onShNameChange = (e) => {
    console.log(`e: ${this.Obj2String(e.target.value)}`)
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        shName: e.target.value
      }
    })
  }

  // 家长名称改变
  onPaNameChange = (e) => {
    console.log(`e: ${this.Obj2String(e.target.value)}`)
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        mafName: e.target.value
      }
    })
  }

  /**
   * 删除学生账号
   */
  delLoginId = (record) => {
    const params = {
      stu_id: record.stu_id
    }
    delStuLoginId(params, (res) => {
      console.log(`res.data.msg: ${res.data.msg}`)
    })
    // 最好有个确认的弹窗什么的
    // 后面再加上loading + 操作成功的提示
  }

  /**
   * 初始化厂商密码
   */
  initPwd = (record) => {
    const params = {
      stu_id: record.stu_id
    }
    initStuPwd(params, (res) => {
      console.log(`res.data.msg: ${res.data.msg}`)
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
    // 从state中获取实时的stu_id数组的值 作为请求参数传给后台
    const { idArrs } = this.state.batchLeadParams
    console.log(`IdArrs: ${JSON.stringify(idArrs)}`)
    stBatchLeadout({stu_id: idArrs}, (res) => {
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
    const { pagination, tableData } = this.state
    return (
      <div className='software-wrap'>
        <SearchBarMemberStu
          onInput1Change={this.onstuIdChange}
          onInput2Change={this.onStuNameChange}
          onInput3Change={this.onShNameChange}
          onInput4Change={this.onPaNameChange}
          onSelect2Change={this.onToLogin}
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
            fixed: true,
            onChange: this.rowSelectChange
          }}
        />
      </div>
    )
  }
}

export default Student
