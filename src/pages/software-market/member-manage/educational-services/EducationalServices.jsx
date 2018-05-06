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
import { Link } from 'react-router-dom'
import ajaxUrl from 'config'
import {
  eduGetData,
  eduBatchLeadout,
  maDelId,
  maInitPwd,
  getIdSelectList,
  getNameSelectList,
  getEduUpperSelectList,
  getEduClassSelectList
} from 'services/software-manage'
import { BlankBar, SearchBarMemberEduSer } from 'components/software-market'
import { addKey2TableData, getSelectList } from 'utils/utils-sw-manage'
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

class EducationalServices extends Component {
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
        eduId: '',
        eduName: '',
        eduClass: '',
        eduUpper: '',
        loginType: ''
      },
      pagination,
      batchLeadParams: {
        idArrs: []
      },
      selectList: {}
    }
  }

  getColumns = () => {
    return ([{
      title: '机构名称',
      dataIndex: 'EDU_NAME',
      key: 'EDU_NAME',
      width: 200
    }, {
      title: '账号',
      dataIndex: 'EDU_ID',
      key: 'EDU_ID',
      width: 200
    }, {
      title: '所属级别',
      dataIndex: 'EDU_PWD',
      key: 'EDU_PWD'
    }, {
      title: '上级机构名称',
      dataIndex: 'EDU_UPPER',
      key: 'EDU_UPPER'
    }, {
      title: '允许登录',
      dataIndex: 'to_login',
      key: 'to_login',
      render: (text, record, index) => {
        return (
          <Switch />
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
            <Link to='/software-market-home/member-manage/school'>学校</Link>
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
    const {
      pageSize,
      pageNum,
      eduId,
      eduName,
      eduClass,
      eduUpper,
      loginType
    } = this.state.reqParam
    // 最后都要赋空
    return {
      pageSize: pageSize || 15,
      pageNum: pageNum || 1,
      EDU_ID: eduId || '',
      EDU_NAME: eduName || '',
      EDU_PWD: eduClass || '',
      EDU_UPPER: eduUpper || '',
      TO_LOGIN: loginType || ''
    }
  }

  /**
   * 获取运营中的应用列表数据
   * 问题：如何把fa_id 转换为数据dataSource中每条数据的key
   * 用一个程序-专门转换后台数据-给每一条记录加上key值--把自身的fa_id映射过去即可
   */
  getTableDatas = () => {
    eduGetData(this.getParams(), (res) => {
      const data = res.data
      console.log(`data: ${JSON.stringify(data)}`)
      this.setState({
        tableData: {
          data: addKey2TableData(data.list, 'EDU_ID'),
          total: data.total
        }
      })
    })
  }

  /**
   * 当搜索框‘账号’值改变时回调
   */
  onIdChange = (val) => {
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        eduId: val
      }
    })
  }

  /**
   * 当搜索框‘厂商名称’值改变时回调
   */
  onInstChange = (val) => {
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        eduName: val
      }
    })
  }

  /**
   * 当下拉选择框‘合同状态’值改变时回调
   */
  onHighInstChange = (val) => {
    console.log(`val: ${val}`)
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        eduUpper: val
      }
    })
  }

  /**
   * 当下拉框'所属级别'改变时
   */
  onClassChange = (val) => {
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        eduClass: val
      }
    })
  }

  /**
   * 当下拉选择框‘允许登录’值改变时回调
   */
  onToLogin = (val) => {
    console.log(`val: ${val}`)
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        loginType: val
      }
    })
  }

  /**
   * 删除学生账号
   */
  delLoginId = (record) => {
    const params = {
      eduId: record.eduId
    }
    maInitPwd(params, (res) => {
      console.log(`res.data.result: ${res.data.result}`)
    })
    // 最好有个确认的弹窗什么的
    // 后面再加上loading + 操作成功的提示
  }

  /**
   * 初始化厂商密码
   */
  initPwd = (record) => {
    const params = {
      eduId: record.eduId
    }
    maDelId(params, (res) => {
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
    this.getTableDatas()
  }

  /**
   * 当点击'批量导出'按钮时的回调
   */
  onBatchLeadout = () => {
    // 从state中获取实时的stu_id数组的值 作为请求参数传给后台
    const { idArrs } = this.state.batchLeadParams
    console.log(`IdArrs: ${JSON.stringify(idArrs)}`)
    eduBatchLeadout({EDU_ID: idArrs}, (res) => {
      window.open(ajaxUrl.IMG_BASE_URL + '/' + res.data.info)
      console.log(`${res.data.info}`)
    })
  }

  /**
   * 多选选项变化
   */
  rowSelectChange = (selectedRowKeys, selectedRows) => {
    // 从view中得到数据 并把EDU_ID提取出来组合为一个新数组
    let idArr = []
    selectedRows.map((val, index) => {
      idArr.push(val.EDU_ID)
    })
    // 将EDU_ID得到的新数组映射到state中
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
    // 请求下拉框的数据
    getSelectList(getIdSelectList, 'edu', 'idList', this)
    getSelectList(getNameSelectList, 'edu', 'eduNameList', this)
    getEduUpperSelectList(getNameSelectList, null, 'eduUpperList', this)
    getEduClassSelectList(getNameSelectList, null, 'eduClassList', this)
  }

  render () {
    const { pagination, tableData, selectList } = this.state
    return (
      <div className='software-wrap'>
        <SearchBarMemberEduSer
          selectList={{ ...selectList }}
          onSelect1Change={this.onIdChange}
          onSelect2Change={this.onInstChange}
          onSelect3Change={this.onHighInstChange}
          onSelect4Change={this.onClassChange}
          onSelect5Change={this.onToLogin}
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

export default EducationalServices
