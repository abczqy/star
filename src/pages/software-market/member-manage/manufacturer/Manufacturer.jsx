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
import { Table, Switch, Divider, Icon, Popover, Button } from 'antd'
import axios from 'axios'
import ajaxUrl from 'config'
import { BlankBar, SearchBarMember } from 'components/software-market'
import { DelLoginIdModal, FaDetailsModal } from '../common-pages'
import 'pages/software-market/SoftwareMarket.scss'
import MemRenewWin from './MemRenewWin'
import {getFactoryDetail} from 'services/software-manage'

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

/**
   * 表格的columns -- 后面用json文件配置出去 --参照bdq
   * 做到配置项与组件的分离
   * 组件要用时只需要引入即可
   * 这里的key值什么的 最后肯定是要和后台数据字典对对齐的
   * 这些函数都是测试阶段的，后面正式的函数 放在组件class内部
   */

class Manufacturer extends Component {
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
        fa_name: '东方国信',
        fa_loginid: 'bonc',
        to_login: '1',
        num_day: '正常'
      },
      pagination,
      memRenewWinVisible: true,
      memRenewRecord: {},
      delModalCon: {
        visible: false
      },
      faDetModalCon: {
        visible: false
      }
    }
  }

  getColumns () {
    return [{
      title: '厂商名称',
      dataIndex: 'fa_name',
      key: 'fa_name',
      width: 200
    }, {
      title: '账号',
      dataIndex: 'fa_loginid',
      key: 'fa_loginid',
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
            <a href='javascript:void(0)' onClick={() => this.showMemRenewWin(record)}>续费</a>
            <Divider type='vertical' />
            <a href='javascript:void(0)' onClick={() => this.showFaDetModal()}>详情</a>
            <Divider type='vertical' />
            <Popover placement='rightTop' content={this.getPopContent(record)} trigger='click'>
              <a href='javascript:void(0)'>
                <Icon type='ellipsis' />
              </a>
            </Popover>
          </span>
        )
      }
    }]
  }

  getPopContent = (record) => {
    return (<div>
      <div><a href='javascript:void(0)'>初始密码</a></div>
      <Divider className='slim-divid' />
      <div><a href='javascript:void(0)' onClick={(e) => this.showDetModal(record)}>删除账号</a></div>
    </div>)
  }

  /**
   * 获取运营中的应用列表数据
   * 问题：如何把fa_id 转换为数据dataSource中每条数据的key
   * 用一个程序-专门转换后台数据-给每一条记录加上key值--把自身的fa_id映射过去即可
   */
  getTableDatas = () => {
    axios.post(ajaxUrl.getFactory, {
      params: {
        // 在初始渲染页面时 这里不给任何参数 请求所有数据
        pageSize: 15,
        pageNum: 1,
        fa_name: '东方国信',
        fa_loginid: 'bonc',
        to_login: '1',
        num_day: '正常'
      }
    }).then((res) => {
      const data = res.data
      console.log(`data: ${JSON.stringify(data)}`)
      this.setState({
        tableData: {
          data: data.list,
          total: data.total
        }
      })
      // 手动生成key值 把fa_id映射成key
    }).catch((e) => { console.log(e) })
  }

  // 显示‘详情’弹窗
  showFaDetModal = (record) => {
    this.setState({
      faDetModalCon: {
        ...this.state.faDetModalCon,
        visible: true
      }
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
    this.setState({
      delModalCon: {
        ...this.state.delModalCon,
        visible: true
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
    console.log(`e: ${this.Obj2String(e.target.value)}`)
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        fa_loginid: e.target.value
      }
    })
  }

  /**
   * 当搜索框‘厂商名称’值改变时回调
   */
  onFaNameChange = (e) => {
    console.log(`e: ${this.Obj2String(e.target.value)}`)
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        fa_name: e.target.value
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
    // 修改state.reqParams中对应的值
    this.setState({
      reqParam: {
        ...this.state.reqParam,
        to_login: val
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
    // 拿到state中的reqParam值去向后台请求数据
    // 请求接口后面根据请求的类别(厂商 学生...)封装下
  }

  /**
   * 当点击'批量导出'按钮时的回调
   */
  BatchExport = () => {}

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

  render () {
    const { pagination, tableData, delModalCon, faDetModalCon } = this.state
    return (
      <div className='software-wrap'>
        <SearchBarMember
          inputText1='账号 '
          inputText2='厂商名称 '
          selectText1='合同状态 '
          selectText2='允许登录 '
          onInput1Change={this.onFaLoginidChange}
          onInput2Change={this.onFaNameChange}
          onSelect1Change={this.onNumDayChange}
          onSelect2Change={this.onToLogin}
          onBtnSearchClick={this.search}
          onBtnBatchExport={this.BatchExport}
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
        />
        <MemRenewWin record={this.state.memRenewRecord} visible={this.state.memRenewWinVisible} handleClose={() => { this.handleCloseMemRenewWin() }} />
        <div ref='delLoginIdElem' />
        <DelLoginIdModal
          title='删除账号'
          visible={delModalCon.visible}
          getContainer={() => this.refs.delLoginIdElem}
          onCancel={this.handleDelLoginIdCancel}
          footer={[
            <Button key='ok' type='primary' onClick={this.handleDelLoginIdCancel} >确定</Button>,
            <Button key='cancel'onClick={this.handleDelLoginIdCancel} >取消</Button>
          ]}
        />
        <div ref='faDetElem' className='fa-det-wrap' />
        <FaDetailsModal
          title='删除账号'
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
