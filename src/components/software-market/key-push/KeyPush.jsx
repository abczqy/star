import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Collapse, Table, Checkbox, Button, message } from 'antd'
import { HomepageManageBar, SearchBar, BlankBar } from 'components/software-market'
import { AppDetailModal } from 'pages/software-market'
import './KeyPush.scss'
import {getSoftwareDetail, getSoftMarketList, getApptype} from 'services/software-manage'
// import ajaxUrl from 'config'
import {axios} from '../../../utils'
import config from '../../../config/index'
const {API_BASE_URL_V2, SERVICE_EDU_MARKET, IMG_BASE_URL_V2} = config

const Panel = Collapse.Panel

/**
   * 表格分页默认值
   */
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true,
  text: ''
}

class KeyPush extends Component {
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
      boxList: [1, 2, 3, 4],
      imgList: []
    }
    // 表格的列信息
    this.columns = [{
      title: '应用名称',
      dataIndex: 'APP_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'APP_TYPE_NAME'
    }, {
      title: '供应商',
      dataIndex: 'COMPANY_NAME'
    }, {
      title: '图片',
      dataIndex: 'APP_ICON',
      render: (text) => text ? <img style={{width: '50px', height: '40px'}} src={IMG_BASE_URL_V2 + text} /> : '无'
    }, {
      title: '选择',
      dataIndex: 'sw_key_push',
      render: (text, record, index) => {
        return (
          <Checkbox onClick={() => { this.checkClick(record) }} checked={record.IS_HOT_RECOMMEND === 1} />
        )
      }
    }, {
      title: '操作',
      dataIndex: 'options',
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
      appId: record.APP_ID
    }
    console.log(record.IS_HOT_RECOMMEND)
    if (record.IS_HOT_RECOMMEND === 1) {
      axios.post(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/hot-app/sub-one', param).then((res) => {
        if (res.data.code === 200) {
          message.success('取消推送成功')
          this.getList()
        } else {
          message.warn(res.data.msg)
        }
      })
    } else {
      axios.post(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/hot-app/one', param).then((res) => {
        if (res.data.code === 200) {
          message.success('推送成功')
          this.getList()
        } else {
          message.warn(res.data.msg)
        }
      })
    }
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
  // 获取数据列表
  getList = () => {
    let params = {
      // appType: this.state.type,
      appName: this.state.searchValue,
      pageNum: this.state.pagination.pageNum,
      pageSize: this.state.pagination.pageSize,
      orderType: 'download'
    }
    if (this.state.type && this.state.type !== '') {
      params.appType = this.state.type
    }
    getSoftMarketList(params, res => {
      if (res.data.code === 200) {
        // let b = []
        // res.data.data.map((item, index) => {
        //   if (item.IS_TOP_RECOMMEND === 1) {
        //     b.push(item.APP_ICON)
        //   }
        // })
        // this.setState({
        //   tableData: {
        //     data: []
        //   }
        // }, () => {
        //   this.setState({
        //     tableData: res.data.data,
        //     imgList: b
        //   })
        // })
        this.setState({
          tableData: res.data.data
        })
      }
    })
  }
  componentDidMount () {
    this.getList()
    this.getSelectOptions()
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
    }, () => this.getList())
  }
   // 显示‘详情’弹窗
   showAppDetailModal = (record) => {
     // 指定回调中setState()的执行环境 bind(this)效果也一样 但是这里会有报错
     const thiz = this
     // 获取对应的后台数据
     getSoftwareDetail(record.appId, (res) => {
       const resData = res.data
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
  render () {
    const { expand, tableData, pagination, appDetailModalCon, options } = this.state
    const { header } = this.props
    const { title } = header
    return (
      <div className='hp-maker'>
        <Collapse onChange={this.onExpand}>
          <Panel showArrow={false} header={<HomepageManageBar title={title} expand={expand} />} key='1' >
            <SearchBar
              onSeachChange={this.inputChange}
              onSearch={this.getSearchData}
              onBtnClick={this.getSearchData}
              onSelectChange={this.onSelect}
              options={options} />
            <BlankBar />
            {/* <SWBox list={this.state.imgList} boxList={this.state.boxList} /> */}
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
KeyPush.propTypes = {
  header: PropsTypes.object
}
export default KeyPush
