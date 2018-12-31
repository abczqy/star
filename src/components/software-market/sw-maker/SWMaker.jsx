import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Collapse, Table, Checkbox, Button, message } from 'antd'
import { HomepageManageBar, SearchBar, BlankBar, SWBox } from 'components/software-market'
import { AppDetailModal } from 'pages/software-market'
import './SWMaker.scss'
import {getSoftwareDetail, getSoftMarketList, getApptype} from 'services/software-manage'
// import ajaxUrl from 'config'
import {axios} from '../../../utils'
import config from '../../../config/index'
const {API_BASE_URL_V2, SERVICE_EDU_MARKET, IMG_BASE_URL_V2} = config

const Panel = Collapse.Panel

/**
   * 表格分页器设置-默认值
   */
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true
}

class SWMaker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: []
      },
      pagination,
      expand: false,
      searchValue: '',
      type: '',
      options: ['全部', '教育类', '教辅类'],
      appDetailModalCon: {
        visible: false,
        swName: ''
      },
      boxList: [1, 2, 3, 4, 5, 6],
      imgList: []
    }
    // 表格的列信息
    this.columns = [{
      title: '应用名称',
      dataIndex: 'appName',
      key: 'appName'
    }, {
      title: '所属类型',
      dataIndex: 'appTypes',
      key: 'appTypes',
      render: (text) => text[0].appTypeName
    }, {
      title: '供应商',
      dataIndex: 'companyInfo',
      key: 'companyInfo',
      render: (text) => text.companyName
    }, {
      title: '图片',
      dataIndex: 'APP_ICON',
      key: 'APP_ICON',
      render: (text) => text ? <img style={{width: '50px', height: '40px'}} src={IMG_BASE_URL_V2 + text} /> : '无'
    }, {
      title: '选择',
      dataIndex: 'SW_MARKET_SHOW',
      key: 'SW_MARKET_SHOW',
      render: (text, record, index) => {
        return (
          <Checkbox onClick={() => { this.checkClick(record) }} checked={record.isHotRecommend === 1} />
        )
      }
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record, index) => (
        <span>
          <a href='javascript:void(0)' onClick={() => this.showAppDetailModal(record)}>详情</a>
        </span>
      )
    }]
  }
  copyArray = (arr) => {
    let result = []
    arr.map((item, index) => {
      result[index] = item
    })
    return result
  }

  /**
   * 点击选择状态
   */
  checkClick = (record) => {
    let param = {
      appId: record.appId
    }
    if (this.state.imgList.length >= 6) {
      if (record.isHotRecommend === 0) {
        message.warning('已达推送上限')
      } else {
        axios.post(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/hot-app/sub-one', param).then((res) => {
          if (res.data.code === 200) {
            message.success('取消推送成功')
            this.getList()
          } else {
            message.warn(res.data.msg)
          }
        })
      }
    } else {
      if (record.isHotRecommend === 0) {
        axios.post(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/hot-app/one', param).then((res) => {
          if (res.data.code === 200) {
            message.success('推送成功')
            this.getList()
          } else {
            message.warn(res.data.msg)
          }
        })
      } else {
        axios.post(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/hot-app/sub-one', param).then((res) => {
          if (res.data.code === 200) {
            message.success('取消推送成功')
            this.getList()
          } else {
            message.warn(res.data.msg)
          }
        })
      }
    }
  }
  /**
   * 展开时修改相应的state
   */
  onExpand = () => {
    this.setState({
      expand: !this.state.expand
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
      this.getList()
    })
  }
  /**
   * 页码变化时回调
   */
  pageNumChange = (page, pageSize) => {
    console.log()
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNum: page
      }
    }, () => this.getList())
  }
  // 获取数据列表
  getList = () => {
    let params = {
      // appType: this.state.type,
      appName: this.state.searchValue,
      pageNum: this.state.pagination.pageNum,
      pageSize: this.state.pagination.pageSize,
      orderType: 'time'
    }
    if (this.state.type && this.state.type !== '') {
      params.appType = this.state.type
    }
    getSoftMarketList(params, res => {
      console.log(res)
      if (res.data.code === 200) {
        let b = []
        res.data.data.data.map((item, index) => {
          if (item.isHotRecommend === 1) {
            b.push(item.appIcon)
          }
        })
        this.setState({
          tableData: {
            data: []
          }
        }, () => {
          this.setState({
            tableData: res.data.data,
            imgList: b
          })
        })
      } else {
        message.warn(res.data.msg)
      }
    })
  }
   // 显示‘详情’弹窗
   showAppDetailModal = (record) => {
     // 指定回调中setState()的执行环境 bind(this)效果也一样 但是这里会有报错
     const thiz = this
     // 获取对应的后台数据
     getSoftwareDetail(record.appId, (res) => {
       console.log(res)
       const resData = res.data ? res.data : {}
       // 通过state将数据res传给子组件
       thiz.setState({
         appDetailModalCon: {
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
      appDetailModalCon: {
        ...this.state.appDetailModalCon,
        visible: false
      }
    })
  }
  /**
   * 当select的值变化时回调
   */
  onSelect = (val) => {
    this.setState({
      type: val
    })
  }
  getSearchData = () => {
    this.setState({
      tableData: {data: []}
    }, () => {
      this.getList()
    })
  }

  inputChange = (e) => {
    let value = e.target.value
    this.setState({
      searchValue: value
    })
  }
  // 应用类型下拉框数据获取
  getSelectOptions () {
    const thiz = this
    getApptype({}, (res) => {
      // const data = [{APP_TYPE_ID: '', APP_TYPE_NAME: '全部'}]
      // const dataArray = data.concat(res.data.data)
      // const a = this.copyArray(data.type)
      // a.unshift('')
      thiz.setState({
        options: res.data.data
      })
    })
  }
  addpage = () => {
    message.success('保存成功')
  }

  componentDidMount () {
    this.getList()
    this.getSelectOptions()
  }
  render () {
    const { expand, tableData, pagination, appDetailModalCon, options } = this.state
    const { header } = this.props
    const { title } = header
    return (
      <div className='hp-maker'>
        <Collapse onChange={this.onExpand}>
          <Panel showArrow={false} header={<HomepageManageBar title={title} expand={expand} addpage={this.addpage} />} key='1' >
            <SearchBar
              onSeachChange={this.inputChange}
              onSearch={this.getSearchData}
              onBtnClick={this.getSearchData}
              onSelectChange={this.onSelect}
              options={options} />
            <BlankBar />
            <SWBox list={this.state.imgList} boxList={this.state.boxList} />
            <BlankBar />
            <Table
              columns={this.columns}
              dataSource={tableData.data}
              pagination={{
                ...pagination,
                total: this.state.tableData.totalCount,
                onShowSizeChange: this.onShowSizeChange,
                onChange: this.pageNumChange
              }}
            />
            <div ref='appDetailElem' className='app-detail-wrap' />
            <AppDetailModal
              title={appDetailModalCon.swName}
              getContainer={() => this.refs.appDetailElem}
              visible={appDetailModalCon.visible}
              onCancel={this.handleAppDetCancel}
              resData={appDetailModalCon.resData}
              footer={[
                <Button key='back' type='primary' onClick={this.handleAppDetCancel}>关闭</Button>
              ]}
            />
          </Panel>
        </Collapse>
      </div>
    )
  }
}
SWMaker.propTypes = {
  header: PropsTypes.object
}
export default SWMaker
