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
import {Table, message, Divider, Switch} from 'antd'
// import { Table, Switch, Divider, message } from 'antd'
// import { Link } from 'react-router-dom'
import ajaxUrl from 'config'
import {
  eduGetData,
  eduBatchLeadout,
  newEdu
} from 'services/software-manage'
import { updateUser } from 'services/software-market'
import { SearchBarMemberEduSer, NewEdu } from 'components/software-market' // 目前只有查询的接口，先注释掉
import {
// addKey2TableData
// getSelectList,
// getSelectListWithNoParam
} from 'utils/utils-sw-manage'
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
      selectList: {},
      edu_id: '',
      newEduVisible: false
    }
  }
  // 允许登录状态切换
  handleToLogin = (record) => {
    const thiz = this
    const id = record && record.USER_ID
    const params = {
      isLogin: record.LOGIN_PERMISSION_STATUS ? 0 : 1,
      userId: id
    }
    updateUser(id, params, (res) => {
      const data = res.data ? res.data : {}
      if (data.data > 0) {
        message.success(data.msg)
        thiz.getTableDatas()
      }
    })
  }

  getColumns = () => {
    return ([{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 200
    }, {
      title: '机构名称',
      dataIndex: 'INSTITUTION_NAME',
      width: 200
    }, {
      title: '账号',
      dataIndex: 'LOGIN_NAME'
    }, {
      title: '组织编号',
      dataIndex: 'ID',
      width: 200
    }, {
      title: '状态',
      dataIndex: 'IS_FIRST_LOGIN',
      render: (text) => text === 1 ? '激活' : '未激活'
    }, {
      title: '关联代理商',
      dataIndex: ''
    }, {
      title: '允许登录',
      dataIndex: 'LOGIN_PERMISSION_STATUS',
      render: (text, record, index) => {
        return (
          <Switch checked={text === 1} onChange={() => this.handleToLogin(record)} />
        )
      }
    }, {
    //   title: '所属级别',
    //   dataIndex: 'edu_class',
    //   key: 'edu_class'
    // }, {
    //   title: '上级机构名称',
    //   dataIndex: 'edu_upper',
    //   key: 'edu_upper'
    // }, {
    //   title: '允许登录',
    //   dataIndex: 'to_login',
    //   key: 'to_login',
    //   render: (text, record, index) => {
    //     console.log('record', record)
    //     return (
    //       <Switch checked={record.isDelete !== 1} onChange={() => this.handleToLogin(record)} />
    //     )
    //   }
    // }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      width: 200,
      render: (text, record, index) => {
        return (
          <span>
            <a href='javascript:void(0)'>学校</a>
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
      eduId,
      eduName,
      eduClass,
      eduUpper,
      loginType
    } = this.state.reqParam
    // 最后都要赋空
    return {
      pageSize: this.state.pagination.pageSize,
      pageNum: this.state.pagination.pageNum,
      edu_id: eduId || '',
      edu_name: eduName || '',
      edu_class: eduClass || '',
      edu_upper: eduUpper || '',
      to_login: loginType || ''
    }
  }

  /**
   * 获取运营中的应用列表数据
   * 问题：如何把fa_id 转换为数据dataSource中每条数据的key
   * 用一个程序-专门转换后台数据-给每一条记录加上key值--把自身的fa_id映射过去即可
   */
  getTableDatas = () => {
    eduGetData(this.getParams(), (res) => {
      if (res.data.code === 200) {
        const data = res.data.data
        // console.log('教育机构：', data)
        data.info && data.info instanceof Array && data.info.map((item, index) => {
          item.index = index + 1
        })
        this.setState({
          // edu_id:,
          tableData: {
            data: data.info || [],
            total: data.total || 0
          }
        })
      } else {
        console.log('获取教育机构数据异常：', res.data.msg || '')
      }
    })
  }

  /**
   * 当搜索框‘账号’值改变时回调
   */
  onIdChange = (val) => {
    let value = val.target.value
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        eduId: value
      }
    })
  }

  /**
   * 当搜索框‘厂商名称’值改变时回调
   */
  onInstChange = (val) => {
    let value = val.target.value
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        eduName: value
      }
    })
  }

  /**
   * 当下拉选择框‘合同状态’值改变时回调
   */
  onHighInstChange = (val) => {
    // 修改state.reqParams中对应的值
    let value = val.target.value
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        eduUpper: value
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
    // 修改state.reqParams中对应的值
    let loginAllow = ''
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
        loginType: loginAllow
      }
    })
  }

  /**
   * 删除学生账号
   */
  delLoginId = (record) => {
    const id = record && record.USER_ID
    const thiz = this
    const params = {
      userId: id,
      isDelete: 0
    }
    updateUser(id, params, (res) => {
      const data = res.data ? res.data : {}
      if (data.data > 0) {
        message.success(data.msg)
        thiz.getTableDatas()
      }
    })
  }

  /**
   * 初始化厂商密码
   */
  initPwd = (record) => {
    const id = record && record.USER_ID
    const thiz = this
    const params = {
      userId: id,
      isReset: 1
    }
    updateUser(id, params, (res) => {
      const data = res.data ? res.data : {}
      if (data.data > 0) {
        message.success(data.msg)
        thiz.getTableDatas()
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
    eduBatchLeadout({ edu_id: idArrs }, (res) => {
      window.open(ajaxUrl.IMG_BASE_URL + '/' + res.data.info)
    })
  }

  /**
   * 多选选项变化
   */
  rowSelectChange = (selectedRowKeys, selectedRows) => {
    // 从view中得到数据 并把edu_id提取出来组合为一个新数组
    let idArr = []
    selectedRows.map((val, index) => {
      idArr.push(val.edu_id)
    })
    // 将edu_id得到的新数组映射到state中
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
  // 改变数据
  getChange = () => {
    let { selectList } = this.state
    selectList.eduClassList.push('全部')
  }
  /**
   *获取一系列参数
   */
  // 获取账号--考虑：该一步到位了-- 直接用redux管理状态 - 虽然用传入子组件函数的方法也可以获取到子组件中的值
  componentDidMount () {
    this.getTableDatas()

    // 请求下拉框的数据
    // getSelectList(getIdSelectList, 'edu', 'idList', this)
    // getSelectList(getNameSelectList, 'edu', 'eduNameList', this)
    // getSelectListWithNoParam(getEduUpperSelectList, 'eduUpperList', this)

    // getSelectListWithNoParam(getEduClassSelectList, 'eduClassList', this)
    // this.getChange()
  }
  changeVisible = (newEduVisible) => {
    this.setState({
      newEduVisible
    })
  }
  onOk = () => {
    this.refs.newEdu.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.province = values.region.province
        values.city = values.region.city
        values.district = values.region.region
        delete (values.region)
        console.log(values)
        newEdu(values, (res) => {
          if (res.data.code === 200) {
            this.changeVisible(false)
            message.success('新增机构成功')
            this.getTableDatas()
          } else {
            message.error('新增机构失败')
          }
        })
      }
    })
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
          changeVisible={this.changeVisible}
        />
        <Table
          columns={this.getColumns()}
          dataSource={tableData.data}
          pagination={{
            ...pagination,
            total: this.state.tableData.total,
            onShowSizeChange: this.onShowSizeChange,
            onChange: this.pageNumChange
          }}
          // rowSelection={{
          //   onChange: this.rowSelectChange
          // }}
        />
        <NewEdu ref='newEdu' onOk={this.onOk} visible={this.state.newEduVisible} changeVisible={this.changeVisible} />
      </div>
    )
  }
}

export default EducationalServices
