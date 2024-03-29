/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 教育局的信息公开列表编辑
 */
import React from 'react'
import {Row, Col, Card, Input, Select, Button, Modal, Popconfirm, message} from 'antd'
import Policy from './PolicyEd'
import img from '../../assets/images/WeChat.png'
import hand from '../../assets/images/hand.png'
import people from '../../assets/images/u1632.png'
import './NewsList.scss'
import _ul from '../../assets/images/_ul.png'
import _ from 'lodash'
// import AJAX_HOST from '../../../static/Config'
import webStorage from 'webStorage'
import {processStr} from 'utils'
import CustomPagingTable from '../../components/common/PagingTable'
import {informationEdListDelete, information} from 'services/software-manage'
// import ajaxUrl from 'config'
import { withRouter } from 'react-router'
import moment from 'moment'

const Search = Input.Search
class InformationEd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewHeight: 500,
      title: '',
      ctrl: '',
      visible: false,
      imgO: img,
      imgT: img,
      imgH: hand,
      imgP: people,
      input: '', // 这个是关键字搜索
      select: '3', // 这是状态筛选
      pageNum: 1,
      pageSize: 10,
      dataP: [], // 公告和分享的list
      img: '', // 公告图片
      tableData: [],
      record: {},
      webStorage: false,
      infoData: false
    }
    let thiz = this
    this.columns = [
      {
        title: '信息标题',
        dataIndex: 'contentTitle',
        key: 'contentTitle',
        render (text, record, index) {
          return processStr(text, 8)
        }
      }, {
        title: '详情',
        dataIndex: 'content',
        key: 'content',
        render (text, record, index) {
          return processStr(text, 12)
        }
      }, {
        title: '状态',
        dataIndex: 'contentStatus',
        key: 'contentStatus',
        render (text, record, index) {
          if (text === '0') {
            return <span style={{color: '#ff7947'}}>审核中</span>
          } else if (text === '2') {
            return <span style={{color: 'red'}}>已驳回</span>
          } else if (text === '1') {
            return <span style={{color: 'green'}}>已发布</span>
          }
        }
      }, {
        title: '发布时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        render: (text) => moment(text).format('YYYY-MM-DD')
      }, {
        title: '操作',
        dataIndex: 'do',
        key: 'do',
        render (text, record, index) {
          return (
            <div style={{width: '90px'}}>
              <span style={{width: '32px', display: 'inline-block'}}>
                <a href='javascript:0;' onClick={() => thiz.edit(record, 'edit')}>
            编辑</a></span>
              <Popconfirm title='您确定要删除这条信息吗?' style={{width: '200px'}} onConfirm={() => thiz.confirmUp(record)} onCancel={thiz.cancelUp} okText='Yes' cancelText='No'>
                <span ><a href='javascript:0;' >
            删除</a></span>
              </Popconfirm>
            </div>
          )
        }
      }
    ]
  }
  confirmUp =(record) => {
    let value = record.id
    informationEdListDelete('', {list: value}, (response) => {
      if (response.data.code === 200) {
        message.success(`信息删除成功!`)
        this.getList()
      } else {
        message.warn(response.data.msg)
      }
    })
  }

  cancelUp=(e) => {
    message.error('您打消了删除这一条消息的这个决定。')
  }

  getList=() => {
    console.log('获取数据')
    let value = {
      pageNum: this.state.pageNum || 1,
      pageSize: this.state.pageSize || 10,
      content: this.state.input || ''
    }
    information(value, this.state.select, (response) => {
      if (response.data.code === 200) {
        this.setState({
          dataSource: response.data.data.info,
          total: response.data.data.total
        })
      } else {
        message.warn(response.data.msg)
      }
    })

    let values = {
      pageNum: 1,
      pageSize: 100,
      type: 0
    }
    information(values, 1, (response) => {
      if (response.data.code === 200) {
        this.setState({
          infoData: response.data.data
        })
      } else {
        message.warn(response.data.msg)
      }
    })
  }
  componentWillMount () {
    this.getList()
    this.getHeight()
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === null) {
      this.setState({
        webStorage: false
      }, () => {
        this.getHeight()
      })
    } else {
      this.setState({
        webStorage: true
      }, () => {
        this.getHeight()
      })
    }
  }
  // 更多的点击事件
  more=() => {
    this.props.history.push({
      pathname: '/home/public'
    })
  }
  // 点击搜索
  search=() => {
    this.getList()
  }
  // 状态选择
  stateValue = (value) => {
    this.setState({
      select: value
    })
  }
  // 名称搜索
  handleSearchTextChange (e) {
    this.setState({
      input: e.target.value.trim()
    })
  }
  handBtnleFilter =() => {
    this.search()
  }
  // 点击编辑的跳转
  edit=(record, text) => {
    console.log('点击编辑')
    this.setState({
      title: '信息编辑',
      ctrl: text,
      visible: true,
      record: record
    })
    console.log('收到的数据', this.state.tableData)
  }
  // 点击信息添加
  add (text) {
    console.log('点击信息添加')
    this.setState({
      title: '信息新增',
      ctrl: text,
      visible: true
    })
  }

  // 确认按钮
  handleOk = (e) => {
    this.setState({
      visible: false
    }, () => {
      this.sendF()
    })
    console.log('确认发送')
  }
  // 取消按钮
  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }
  // 获取modal显示状态
  getModalV=(value) => {
    this.setState({
      visible: value
    }, () => this.getList())
  }
  // 获取高度
 getHeight=() => {
   if (this.state.webStorage) {
     this.setState({
       viewHeight: window.innerHeight - 214,
       viewHeights: window.innerHeight - 240
     })
   } else {
     this.setState({
       viewHeight: window.innerHeight - 193,
       viewHeights: window.innerHeight - 220
     })
   }
 }
 // 改变每页显示条数
 onShowSizeChange = (pageNum, pageSize) => {
   console.log(pageNum, pageSize)
   this.setState({pageNum, pageSize}, () => {
     this.getList()
   })
 }
// 页码
onPageNumChange = (pageNum, pageSize) => {
  console.log(pageNum, pageSize)
  this.setState({pageNum, pageSize}, () => {
    this.getList()
  })
}
// a标签的跳转方法哦~
handleTabChanges (e) {
  this.props.history.push({
    pathname: '/home/informationDetEd',
    search: e.target.text.split(' ')[0]
  })
}
render () {
  const dataT = [
    {'title': '全部', value: '3'}, {'title': '审核中', value: '0'}, {'title': '已驳回', value: '2'}, {'title': '已发布', value: '1'}
  ]
  return <div style={{margin: 'auto', width: '90%', marginLeft: '10%', minHeight: this.state.viewHeight}}>
    <div >
      <Row>
        <Col span={5} style={{width: '18%'}}>
          {/* <Row><div className='left-downer'>
            <img src={this.state.infoData ? ajaxUrl.IMG_BASE_URL + this.state.infoData.list[0].info_picture : ''} style={{width: '95%', height: '120px'}} alt='' /></div>
          </Row> */}
          <Row><div className='left-downer'>
            <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '95%' }}>
              <ul className='ul-margin super5'>
                {(!_.isEmpty(this.state.infoData)) && this.state.infoData.info.map((item, index) => {
                  return index < 12 ? <li className='li-hover' key={index} ><img src={_ul} /><a onClick={this.handleTabChanges.bind(this)} className='span-color'><span style={{display: 'none'}}>{item.id}</span> {item.contentTitle}</a></li> : ''
                })}
              </ul>
            </Card></div>
          </Row>
          {/* <Row><img src={this.state.infoData ? ajaxUrl.IMG_BASE_URL + this.state.infoData.list[1].info_picture : ''} style={{width: '95%', marginTop: '10px', height: '120px'}} alt='' /></Row> */}
        </Col>
        <Col span={17} style={{backgroundColor: '#fff', marginTop: '10px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '20px', overflow: 'hidden', minHeight: this.state.viewHeights}}>
          <Row>
            <div style={{height: '50px', borderBottom: '1px solid #ddd', width: '98%'}}>
              <Col span={7}><span style={{width: '40px', display: 'inline-block'}}> 状态 : </span><Select placeholder='请查询状态' style={{ width: '60%' }} allowClear onChange={(value) => this.stateValue(value)}>
                {dataT.map((item, index) => {
                  return <Select.Option value={item.value} key={index}>{item.title}</Select.Option>
                })}
              </Select></Col>
              <Col span={1} />
              <Col span={12}>
                <Search
                  mode='combobox'
                  placeholder='搜索应用名称'
                  style={{ width: '69%', marginRight: '10px' }}
                  enterButton
                  onChange={e => { return this.handleSearchTextChange(e) }}
                  onSearch={() => { this.handBtnleFilter() }}
                /></Col>
              <Col span={2} style={{marginLeft: '3%'}}><Button type='danger' onClick={this.add.bind(this, 'add')}>+信息添加</Button></Col>
            </div>
          </Row>
          <div className='marketAnalysis-table'>
            <CustomPagingTable
              dataSource={this.state.dataSource}
              columns={this.columns}
              pageVisible
              //   loading={this.state.loading}
              total={this.state.total}
              // customCls='ant-table-body'
              pageSize={this.state.pageSize}
              pageNum={this.state.pageNum}
              currentPage={this.state.currentPage}
              onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
              onChange={(current, pageSize) => this.onPageNumChange(current, pageSize)}
            />
          </div>
        </Col>
      </Row>
    </div>
    {this.state.visible
      ? <Modal
        title={this.state.title}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width={'50%'}
        height={'600px'}
        maskClosable={false}
        footer=''
      >
        <Policy ctrl={this.state.ctrl} record={this.state.record} getModalV={this.getModalV} />
      </Modal> : null}
  </div>
}
}

export default withRouter(InformationEd)
