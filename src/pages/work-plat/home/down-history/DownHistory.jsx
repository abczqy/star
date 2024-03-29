
/**
 * 工作台-首页-下载历史
 * 1- 数据接口需要更换
 * 2- 列表的字段名之类的也需要配置
 */
import React, { Component } from 'react'
import { Table } from 'antd'
// import { IterationDetailModal } from 'pages/software-market'
import './DownHistory.scss'
import { downloadv2 } from 'services/software-manage'
// import webStorage from 'webStorage'

/**
   * 表格分页器设置-默认值
   */
const pagination = {
  pageNumber: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true
}

class DownHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: [
          {'sw_id': '1', 'sw_name': 'baidu1'},
          {'sw_id': '2', 'sw_name': 'baidu2'},
          {'sw_id': '3', 'sw_name': 'baidu3'},
          {'sw_id': '4', 'sw_name': 'baidu4'},
          {'sw_id': '5', 'sw_name': 'baidu5'}
        ],
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
      pageNumber: 1,
      pageSize: 10
    }
  }
  /**
   * 获取运营中的应用列表数据
   */
  getTableDatas = () => {
    downloadv2({
      pageNumber: this.state.pagination.pageNumber,
      pageSize: this.state.pagination.pageSize
    }, (res) => {
      const data = res.data.data
      let jsonStr = JSON.stringify(data)
      console.log(jsonStr)
      this.setState({
        tableData: {
          data: this.getSwPath(data.content),
          total: data.totalElements
        }
      })
    })
  }

  // 获取只有系统名称的sw_path参数内容
  getSwPath = (data) => {
    let d = data || []
    d.map((item, index) => {
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
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => {
        const id = (this.state.pagination.pageNumber - 1) * this.state.pagination.pageSize + index + 1
        return (
          <div className={id === 1 ? 'first' : 'other' && id === 2 ? 'second' : 'other' && id === 3 ? 'third' : 'other'}>
            {id}
          </div>
        )
      }
    }, {
      title: 'APP名称',
      dataIndex: 'APP_NAME',
      key: 'APP_NAME'
    }, {
      title: 'APP类型',
      dataIndex: 'sw_type',
      key: 'sw_type',
      render: (text, record, index) => {
        return (
          <span >{text && text ? text : '教育类'} </span>
        )
      }
    }, {
      title: '文件类型',
      dataIndex: 'fa_name',
      key: 'fa_name',
      render: (text, record, index) => {
        return (
          <span >{text && text ? text : 'app'}
          </span>
        )
      }
    }, {
      title: '文件大小',
      dataIndex: 'version',
      key: 'version',
      render: (text, record, index) => {
        return (
          <span >{text && text ? text : '180MB'} </span>
        )
      }
    }, {
      title: '下载次数',
      dataIndex: 'DOWNLOAD',
      key: 'DOWNLOAD'
    }]
  }

  /**
   * pageSize 变化时回调
   */
  onShowSizeChange = (current, size) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNumber: current,
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
    console.log(page)
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNumber: page
      }
    }, () => {
      this.getTableDatas()
    })
  }

  componentDidMount () {
    this.getTableDatas()
    // console.log(webStorage)
  }

  render () {
    const { tableData, pagination } = this.state
    return (
      <div className='down-div'>
        <div className='div-content'>
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
        </div>
      </div>
    )
  }
}
export default DownHistory
