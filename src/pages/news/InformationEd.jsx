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
import axios from 'axios'
import ajaxUrl from 'config'
import _ from 'lodash'
// import AJAX_HOST from '../../../static/Config'
import webStorage from 'webStorage'
import {processStr} from 'utils'
import CustomPagingTable from '../../components/common/PagingTable'
import {informationEdListDelete, informationEdList} from 'services/software-manage'

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
      select: '', // 这是状态筛选
      pageNum: 1,
      pageSize: 10,
      dataP: [], // 公告和分享的list
      img: '', // 公告图片
      tableData: [],
      record: {},
      webStorage: false
    }
    let thiz = this
    this.columns = [
      {
        title: '信息标题',
        dataIndex: 'info_title',
        key: 'info_title',
        render (text, record, index) {
          return processStr(text, 8)
        }
      }, {
        title: '详情',
        dataIndex: 'info_desc',
        key: 'info_desc',
        render (text, record, index) {
          return processStr(text, 12)
        }
      }, {
        title: '状态',
        dataIndex: 'info_state',
        key: 'info_state',
        render (text, record, index) {
          if (record.info_state === 0) {
            return '审核中'
          } else if (record.info_state === 1) {
            return '已驳回'
          } else if (record.info_state === 2) {
            return '已发布'
          }
        }
      }, {
        title: '发布时间',
        dataIndex: 'info_time',
        key: 'info_time'
      }, {
        title: '操作',
        dataIndex: 'do',
        key: 'do',
        render (text, record, index) {
          return (
            <div style={{width: '90px'}}>
              <span style={{width: '32px', display: 'inline-block'}}>
                <a href='javascript:;' onClick={() => thiz.edit(record, 'edit')}>
            编辑</a></span>
              <Popconfirm title='您确定要删除这条信息吗?' style={{width: '200px'}} onConfirm={() => thiz.confirmUp(record)} onCancel={thiz.cancelUp} okText='Yes' cancelText='No'>
                <span ><a href='javascript:;' >
            删除</a></span>
              </Popconfirm>

            </div>
          )
        }
      }
    ]
  }
  confirmUp =(record) => {
    console.log('点击删除')
    let value = record.info_id
    console.log('删除传送行传的id', value)
    informationEdListDelete('', value, (response) => {
      message.success(`信息删除成功!`)
      console.log(response)
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
      keyword: this.state.input || '',
      state: this.state.select || ''
    }
    console.log('教育局信息公开获取数据传送信息', value)
    informationEdList(value, (response) => {
      console.log(response)
      this.setState({
        tableData: response.data
      })
    })

    axios.get(ajaxUrl.detList).then(item => {
      this.setState({
        dataP: item.data.list,
        img: item.data.img
      }, () => {
        console.log('获取分享列表数据存在state', this.state.dataP)
      })
    }).catch(err => {
      console.log(err)
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
    console.log('更多')
  }
  // 点击搜索
  search=() => {
    this.getList()
  }
  // 状态选择
  stateValue = (value) => {
    this.setState({
      select: value
    }, () => {
      this.getList()
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
    })
  }
  // 获取高度
 getHeight=() => {
   if (this.state.webStorage) {
     this.setState({
       viewHeight: window.innerHeight - 248
     })
   } else {
     this.setState({
       viewHeight: window.innerHeight - 193
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
render () {
  console.log('返回数据', this.state.tableData)
  const dataT = [
    {'title': '审核中', value: '3'}, {'title': '已驳回', value: '0'}, {'title': '已发布', value: '1'}
  ]
  return <div style={{margin: 'auto', width: '100%', marginLeft: '6%', height: this.state.viewHeight}}>
    <div >
      <Row>
        <Col span={5} style={{width: '18%'}}>
          <Row><div className='left-downer'>
            <img src={this.state.imgO} style={{width: '95%', height: '120px'}} alt='' /></div>
          </Row>
          <Row><div className='left-downer'>
            <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '95%' }}>
              <ul className='ul-margin'>
                {(!_.isEmpty(this.state.dataP)) && this.state.dataP.map((item, index) => {
                  return <li className='li-hover' key={index} ><img src={_ul} /><span className='span-color'>{item}</span></li>
                })}
              </ul>
            </Card></div>
          </Row>
          <Row><img src={this.state.imgT} style={{width: '95%', marginTop: '10px', height: '120px'}} alt='' /></Row>
        </Col>
        <Col span={17} style={{backgroundColor: '#fff', marginTop: '10px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '20px', overflow: 'hidden'}}>
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
              dataSource={this.state.tableData.data}
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

export default InformationEd
