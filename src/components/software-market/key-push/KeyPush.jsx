import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Collapse, Table, Checkbox, Button, message } from 'antd'
import { HomepageManageBar, SearchBar, BlankBar, SWBox } from 'components/software-market'
import { AppDetailModal } from 'pages/software-market'
import './KeyPush.scss'
import {verifyDetail} from 'services/software-manage'
import ajaxUrl from 'config'

const Panel = Collapse.Panel

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

const dataa = [{sw_id: '11', sw_name: '知乎1', sw_type: '管理类', sw_check: 0, sw_path: '/image/1.jpg', fa_name: '北京东方国信1'}, {sw_id: '11', sw_name: '知乎2', sw_type: '管理类', sw_path: '/image/22.jpg', sw_check: 0, fa_name: '北京东方国信2'}, {sw_id: '11', sw_path: '/3.jpg', sw_name: '知乎3', sw_type: '管理类', sw_check: 0, fa_name: '北京东方国信3'}, {sw_id: '11', sw_name: '知乎2', sw_type: '管理类', sw_path: '/image/23.jpg', sw_check: 0, fa_name: '北京东方国信2'}, {sw_id: '11', sw_path: '/image/33.jpg', sw_name: '知乎3', sw_type: '管理类', sw_check: 0, fa_name: '北京东方国信3'}, {sw_id: '11', sw_name: '知乎2', sw_type: '管理类', sw_path: '/image/24.jpg', sw_check: 0, fa_name: '北京东方国信2'}, {sw_id: '11', sw_path: '/image/12.jpg', sw_name: '知乎3', sw_type: '管理类', sw_check: 0, fa_name: '北京东方国信3'}]

class KeyPush extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: dataa
      },
      pagination,
      expand: false,
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
      title: '图片',
      dataIndex: 'sw_path',
      key: 'sw_path',
      render: (text) => <img style={{width: '50px', height: '40px'}} src={ajaxUrl.IMG_BASE_URL + text} />
    }, {
      title: '选择',
      dataIndex: 'sw_check',
      key: 'sw_check',
      render: (text, record, index) => {
        return (
          <Checkbox onClick={() => { this.checkClick(record) }} checked={record.sw_check === 1} />
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
    const a = record.sw_check ? 0 : 1
    record.sw_check = a
    if (record.sw_check) {
      console.log(record.sw_check)
      let b = this.copyArray(this.state.imgList)
      if (b.length < 4) {
        let c = ajaxUrl.IMG_BASE_URL + record.sw_path
        b.push(c)
        this.setState({
          imgList: b
        })
      } else {
        record.sw_check = 0
        message.warning('已达推送上限')
      }
    } else if (record.sw_check === 0) {
      let bb = this.copyArray(this.state.imgList)
      console.log(record.sw_check + '11111111111111' + bb)
      let cc = ajaxUrl.IMG_BASE_URL + record.sw_path
      for (var i = 0; i < bb.length; i++) {
        if (bb[i] === cc) {
          bb.splice(i, 1)
        }
      }
      console.log(bb)
      this.setState({
        imgList: bb
      })
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
      },
      inputValue: this.state.pagination.text
    }, () => {

    })
  }
   // 显示‘详情’弹窗
   showAppDetailModal = (record) => {
     // 指定回调中setState()的执行环境 bind(this)效果也一样 但是这里会有报错
     const thiz = this
     // 获取对应的后台数据
     const params = {
       sw_id: record.sw_id
     }

     verifyDetail(params, (res) => {
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
    const { expand, tableData, pagination, appDetailModalCon } = this.state
    const { header } = this.props
    const { title } = header
    return (
      <div className='hp-maker'>
        <Collapse onChange={this.onExpand}>
          <Panel showArrow={false} header={<HomepageManageBar title={title} expand={expand} />} key='1' >
            <SearchBar list={this.state.imgList} />
            <BlankBar />
            <SWBox list={this.state.imgList} boxList={this.state.boxList} />
            <BlankBar />
            <Table
              columns={this.columns}
              dataSource={tableData.data}
              pagination={{
                ...pagination,
                total: this.state.tableData.total,
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
