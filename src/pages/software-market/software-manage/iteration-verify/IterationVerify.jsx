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
import { Table, Button, message } from 'antd'
import { BlankBar, SearchBar } from 'components/software-market'
import { IterationDetailModal } from 'pages/software-market'
import 'pages/software-market/SoftwareMarket.scss'
import { iterVerify, iterVeriDetail, waitVeriExam } from 'services/software-manage'

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

class IterationVerify extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [],
        total: 0
      },
      pagination,
      searchValue: '',
      detModalCon: {
        visible: false,
        swName: '',
        resData: {}
      },
      sw_type: '教辅类', // 软件类型
      sw_name: '',
      sw_time: '' // 期望上架时间
    }
  }

  /**
   * 获取运营中的应用列表数据
   */
  getTableDatas = () => {
    iterVerify({
      pageNum: 1,
      pageSize: 10,
      sw_type: this.state.sw_type, // 应用类型
      sw_name: this.state.sw_name// 应用名称
    }, (res) => {
      const data = res.data
      this.setState({
        tableData: {
          data: data.data,
          total: data.total
        }
      })
    })
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
      dataIndex: 'sw_name',
      key: 'sw_name'
    }, {
      title: '所属类型',
      dataIndex: 'sw_type',
      key: 'sw_type'
    }, {
      title: '供应商',
      dataIndex: 'fa_name',
      key: 'fa_name'
    }, {
      title: '类型',
      dataIndex: 'sw_path',
      key: 'sw_path'
    }, {
      title: '当前版本',
      dataIndex: 'version',
      key: 'version'
    }, {
      title: '迭代版本',
      dataIndex: 'iteration_version',
      key: 'iteration_version'
    }, {
      title: '提交时间',
      dataIndex: 'sw_update_time',
      key: 'sw_update_time '
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record, index) => {
        return (
          <span>
            <a href='javascript:void(0)' onClick={(e) => this.showDetModal(record)}>详情</a>
          </span>
        )
      }
    }]
  }

  // 显示‘详情’弹窗
  showDetModal = (record) => {
    // 指定回调中setState()的执行环境 bind(this)效果也一样 但是这里会有报错
    const thiz = this
    // 获取对应的后台数据
    const params = {
      sw_id: record.sw_id
    }
    iterVeriDetail(params, (res) => {
      const resData = res.data
      // 通过state将数据res传给子组件
      thiz.setState({
        detModalCon: {
          ...thiz.state.detModalCon,
          visible: true,
          swName: record.sw_name,
          resData: resData,
          sw_id: record.sw_id
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

  // 迭代审核详情弹窗同意驳回
  handleDetAgree = (state) => {
    const thiz = this
    const params = {
      sw_id: this.state.detModalCon.sw_id,
      se_state: state === 'agree' ? 1 : 0,
      sw_time: this.state.sw_time
    }
    waitVeriExam(params, (res) => {
      const data = res.data
      message.success(data.info)
      thiz.handleAppDetCancel()
      thiz.getTableDatas()
    })
  }

  // 获得期望上架时间,并设置到state中
  getOnShelfTime = (time) => {
    this.setState({
      sw_time: time
    })
  }

  /**
   * 当select的值变化时回调
   */
  onSelect = (val) => {
    console.log('val:' + val)
    // 需要以val为参数向后台请求表格数据并刷新
    this.setState({
      sw_type: val
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
      },
      inputValue: this.state.pagination.text
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
      },
      searchValue: this.state.pagination.text
    }, () => {
      this.getTableDatas()
    })
  }

  /**
   * 搜索输入框变化的回调
   */
  inputChange = (e) => {
    let value = e.target.value
    this.setState({
      sw_name: value
    })
  }

  /**
   * 根据搜索框的值进行搜索
   * 将搜索到的数据(向后台请求)反映到dataSource中
   * 搜索框按下回车/搜索时回调
   */
  getSearchData = () => {
    console.log('sw_name:', this.state.sw_name, 'sw_type:', this.state.sw_type)
    this.getTableDatas()
  }

  componentDidMount () {
    this.getTableDatas()
  }

  render () {
    const { tableData, pagination, detModalCon } = this.state
    return (
      <div className='software-wrap'>
        <SearchBar
          onSeachChange={this.inputChange}
          onSearch={this.getSearchData}
          onBtnClick={this.getSearchData}
          onSelectChange={this.onSelect}
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
        <div ref='IterDetailElem' className='Iter-detail-wrap' />
        <IterationDetailModal
          title={detModalCon.swName}
          getContainer={() => this.refs.IterDetailElem}
          visible={detModalCon.visible}
          onCancel={this.handleAppDetCancel}
          resData={detModalCon.resData}
          getOnShelfTime={this.getOnShelfTime}
          footer={[
            <Button key='agree' type='primary' onClick={() => this.handleDetAgree('agree')}>同意</Button>,
            <Button key='reject' className='warn-btn' onClick={() => this.handleDetAgree('reject')}>驳回</Button>,
            <Button key='back' onClick={this.handleAppDetCancel}>关闭</Button>
          ]}
        />
      </div>
    )
  }
}

export default IterationVerify
