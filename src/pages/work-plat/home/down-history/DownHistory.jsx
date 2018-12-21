/**
 * 工作台-首页-下载历史
 */
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
import { Table } from 'antd'
import { BlankBar } from 'components/software-market'
// import { IterationDetailModal } from 'pages/software-market'
import './DownHistory.scss'
import { iterVerify } from 'services/software-manage'
import webStorage from 'webStorage'

/**
   * 表格分页器设置-默认值
   */
const pagination = {
  pageNum: 1,
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
      pageNum: 1,
      pageSize: 10
    }
  }
  /**
   * 获取运营中的应用列表数据
   */
  getTableDatas = () => {
    iterVerify({
      pageNum: this.state.pagination.pageNum,
      pageSize: this.state.pagination.pageSize,
      sw_type: this.state.sw_type, // 应用类型
      sw_name: this.state.sw_name// 应用名称
    }, (res) => {
      const data = res.data
      this.setState({
        tableData: {
          data: this.getSwPath(data.list),
          total: data.total
        }
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
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => {
        const id = (this.state.pageNum - 1) * this.state.pageSize + index + 1
        return (
          <span className={id === 1 ? 'first' : 'other' && id === 2 ? 'second' : 'other' && id === 3 ? 'third' : 'other'}>
            {id}
          </span>
        )
      }
    }, {
      title: 'APP名称',
      dataIndex: 'sw_name',
      key: 'sw_name'
    }, {
      title: 'APP类型',
      dataIndex: 'sw_type',
      key: 'sw_type'
    }, {
      title: '文件类型',
      dataIndex: 'fa_name',
      key: 'fa_name'
    }, {
      title: '下载时间',
      dataIndex: 'sw_path',
      key: 'sw_path'
    }]
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

  componentDidMount () {
    this.getTableDatas()
    console.log(webStorage)
  }

  render () {
    const { tableData, pagination } = this.state
    return (
      <div className='software-wrap'>
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
      </div>
    )
  }
}
export default DownHistory
