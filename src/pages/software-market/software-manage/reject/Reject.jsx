/**
 * 应用管理-未通过审核
 * 1- 内容自主添加
 */
import React, { Component } from 'react'
import { Table, Button } from 'antd'
import { BlankBar, SearchBar } from 'components/software-market'
import { IterationDetailModal } from 'pages/software-market'
import 'pages/software-market/SoftwareMarket.scss'
import { getAppListDatav2, getApptype } from 'services/software-manage'
// import webStorage from 'webStorage'
import './Reject.scss'

/**
   * 表格分页器设置-默认值
   */
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true
}

class Reject extends Component {
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
      sw_type: '', // 软件类型
      sw_name: '',
      sw_time: '', // 期望上架时间
      options: ['全部', '教育类', '教辅类'], // 应用类型下拉框options数组
      pageNum: 1,
      pageSize: 10,
      auditStatus: 3, // 软件状态3未通过审核
      typeId: '', // 暂时101，后期接口改完可以空
      downloadCount: 'desc', // 下载量排行
      keyword: ''
    }
  }
  dateToString = (date) => {
    var dateee = new Date(date).toJSON()
    var dateString = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return dateString
  }
  /**
   * 获取运营中的应用列表数据
   */
  getTableDatas = () => {
    getAppListDatav2({
      pageNum: this.state.pagination.pageNum,
      pageSize: this.state.pagination.pageSize,
      auditStatus: this.state.auditStatus,
      typeId: this.state.typeId,
      downloadCount: this.state.downloadCount,
      keyword: this.state.keyword
    }, (res) => {
      const data = res.data.data
      // let jsonStr = JSON.stringify(data)
      // console.log(jsonStr)
      let dataList = res.data.data.data
      this.setState({
        tableData: {
          data: this.getSwPath(dataList),
          total: data.total
        }
      })
    })
  }

  // 应用类型下拉框数据获取
  getSelectOptions () {
    const thiz = this
    getApptype({}, (res) => {
      // const data = [{APP_TYPE_ID: '', APP_TYPE_NAME: '全部'}]
      // const dataArray = data.concat(res.data.data)
      const dataArray = res.data.data
      // const a = this.copyArray(data.type)
      // a.unshift('')
      thiz.setState({
        options: dataArray
      })
    })
  }

  // 获取只有系统名称的sw_path参数内容
  getSwPath = (data) => {
    data.map((item, index) => {
      let con = item.sw_path
      let version = ''
      let pathArray = []
      // 把sw_path字段内容用逗号分割,获得多个系统名称和下载路径混合的字符串
      pathArray = con ? con.split(',') : []
      pathArray.map((pathIt, pathIn) => {
        // 把系统名称和下载路径混合字符串再用冒号分割,以便只取到系统名称
        let pathVer = pathIt.split(':')
        // 遍历取出每个系统名称，并拼接在一起
        if (pathIn > 0) {
          version += (',' + pathVer[0])
        } else {
          version += pathVer[0]
        }
        // 把拼接后的多个系统重新赋值给sw_path字段
        item.sw_path = version
      })
    })
    return data
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
      dataIndex: 'APP_NAME',
      key: 'APP_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'APP_TYPE_NAME',
      key: 'APP_TYPE_NAME'
    },
    // {
    //   title: '下载次数',
    //   dataIndex: 'DOWNLOAD_COUNT',
    //   key: 'DOWNLOAD_COUNT'
    // },
    {
      title: '供应商',
      dataIndex: 'version',
      key: 'version',
      render: (text, record, index) => {
        return (
          <span >{text && text ? text : 'baidu'}
          </span>
        )
      }
    }, {
      title: '类型',
      dataIndex: 'LX',
      key: 'LX',
      render: (text, record, index) => {
        return (
          <span >{text && text ? text : 'win32'}
          </span>
        )
      }
    }, {
      title: '当前版本',
      dataIndex: 'APP_VERSION',
      key: 'APP_VERSION'
    }, {
      title: '提交时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
      render: (text, record, index) => {
        return (
          <span >{this.dateToString(text)}</span>
        )
      }
    }]
    // }, {
    //   title: '操作',
    //   dataIndex: 'options',
    //   key: 'options',
    //   render: (text, record, index) => {
    //     const roleCode = webStorage.getItem('STAR_WEB_ROLE_CODE')
    //     return (
    //       <span>
    //         <a href='javascript:void(0)' onClick={(e) => this.showDetModal(record)}>撤销</a>
    //         <a href='javascript:void(0)' onClick={(e) => this.showDetModal(record)} className='margin-lef5'>{roleCode === 'operator' ? '审核' : '查看详情'}</a>
    //       </span>
    //     )
    //   }
    // }
  }

  // 显示‘详情’弹窗
  showDetModal = (record) => {
    // 指定回调中setState()的执行环境 bind(this)效果也一样 但是这里会有报错
    // const thiz = this
    // // 获取对应的后台数据
    // const params = {
    //   sw_id: record.sw_id
    // }
    // iterVeriDetail(params, (res) => {
    //   const resData = res.data ? res.data : {}
    //   // 通过state将数据res传给子组件
    //   thiz.setState({
    //     detModalCon: {
    //       ...thiz.state.detModalCon,
    //       visible: true,
    //       swName: record.sw_name,
    //       resData: resData,
    //       sw_id: record.sw_id
    //     }
    //   })
    // })
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
    // const thiz = this
    // const params = {
    //   sw_id: this.state.detModalCon.sw_id,
    //   se_state: state === 'agree' ? 1 : 0,
    //   sw_time: this.state.sw_time
    // }
    // waitVeriExam(params, (res) => {
    //   const data = res.data
    //   message.success(data.info)
    //   thiz.handleAppDetCancel()
    //   thiz.getTableDatas()
    // })
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
    // console.log('val:' + val)
    // 需要以val为参数向后台请求表格数据并刷新
    this.setState({
      typeId: val
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
   * 搜索输入框变化的回调
   */
  inputChange = (e) => {
    let value = e.target.value
    this.setState({
      keyword: value
    })
  }

  /**
   * 根据搜索框的值进行搜索
   * 将搜索到的数据(向后台请求)反映到dataSource中
   * 搜索框按下回车/搜索时回调
   */
  getSearchData = () => {
    this.getTableDatas()
  }

  componentDidMount () {
    this.getTableDatas()
    this.getSelectOptions()
  }

  render () {
    const { tableData, pagination, detModalCon, options } = this.state
    return (
      <div className='software-wrap'>
        <SearchBar
          onSeachChange={this.inputChange}
          onSearch={this.getSearchData}
          onBtnClick={this.getSearchData}
          onSelectChange={this.onSelect}
          options={options}
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
          rowKey={(record, index) => {
            return index
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

export default Reject
