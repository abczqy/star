/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 教育局的信息公开列表编辑
 */
import React from 'react'
import {Row, Col, Card, Pagination, Input, Select, Table, Button, Modal, Popconfirm, message} from 'antd'
import Policy from './PolicyEd'
import img from '../../assets/images/WeChat.png'
import hand from '../../assets/images/hand.png'
import people from '../../assets/images/u1632.png'
import './NewsList.scss'
import _ul from '../../assets/images/_ul.png'
import axios from 'axios'
import ajaxUrl from 'config'
import _ from 'lodash'

class InformationEd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
      record: {}
    }
    let thiz = this
    this.columns = [
      {
        title: '信息标题',
        dataIndex: 'title',
        key: 'title',
        width: 120,
        render (text, record, index) {
          return <div style={{width: '160px', textOverflow: 'ellipsis', overflow: 'hidden'}}><i style={{overflow: 'hidden', width: '10000000000000000000000000000000000000000000000000000000px', fontStyle: 'normal', display: 'inline-block', textOverflow: 'ellipsis'}}>{text}</i></div>
        }
      }, {
        title: '详情',
        dataIndex: 'information',
        key: 'information',
        width: 400,
        render (text, record, index) {
          return <div style={{width: '500px', textOverflow: 'ellipsis', overflow: 'hidden'}}><i style={{overflow: 'hidden', width: '10000000000000000000000000000000000000000000000000000000px', fontStyle: 'normal', display: 'inline-block', textOverflow: 'ellipsis'}}>{text}</i></div>
        }
      }, {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        width: 120,
        render (text, record, index) {
          if (text === '0') {
            return <div style={{color: 'orange', width: '60px'}}>审核中</div>
          } else if (text === '1') {
            return <div style={{color: 'red', width: '60px'}}>已驳回</div>
          } else if (text === '2') {
            return <div style={{color: 'green', width: '60px'}}>已发布</div>
          }
        }
      }, {
        title: '发布时间',
        dataIndex: 'time',
        key: 'time',
        width: 120,
        render (text, record, index) {
          return (
            <div style={{width: '90px'}}>{text}</div>
          )
        }
      }, {
        title: '操作',
        dataIndex: 'do',
        key: 'do',
        width: 120,
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
    let value = {
      id: record.id
    }
    console.log('删除传送行传的id', value)
    axios.get(ajaxUrl.informationEdListDelete, {
      value
    }).then(item => {
      message.success('您已经做好了决定并删除了这一条消息！')
      console.log(item)
    }).catch(err => {
      console.log(err)
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
      input: this.state.input || '',
      select: this.state.select || ''
    }
    console.log('教育局信息公开获取数据传送信息', value)
    axios.get(ajaxUrl.informationEdList, {
      value
    }).then(item => {
      this.setState({
        tableData: item.data
      }, () => {
        console.log('this.state.tableData', this.state.tableData)
        // console.log('this.state.tableData.list', this.state.tableData.list)
      })
    }).catch(err => {
      console.log(err)
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
  }
  // 更多的点击事件
  more=() => {
    console.log('更多')
  }
  // 点击搜索
  search=() => {
    this.getList()
  }
  // 分页页码改变
  ptChange=(page, pageSize) => {
    console.log('页码改变', page, pageSize)
    this.setState({
      pageNum: page
    }, () => {
      this.getList()
    })
  }
  // 每页展示数量改变
  stChange=(current, size) => {
    console.log('每页的数量改变', current, size)
    this.setState({
      pageSize: size
    }, () => {
      this.getList()
    })
  }
  // 有关table的方法有问题
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }
  // 状态选择
  stateValue = (value) => {
    this.setState({
      select: value
    }, () => {
      this.getList()
    })
  }
  // 关键字搜索
  inputChange=(e) => {
    let {value} = e.target
    this.setState({
      input: value
    })
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
  render () {
    const dataT = [
      {'title': '审核中', value: '0'}, {'title': '已驳回', value: '1'}, {'title': '已发布', value: '2'}
    ]
    return <div style={{margin: 'auto', width: '100%', marginLeft: '6%'}}>
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
          <Col span={17} style={{backgroundColor: '#fff', marginTop: '10px', paddingLeft: '10px', paddingTop: '10px', paddingBottom: '20px', height: '730px'}}>
            <Row>
              <div style={{height: '50px', borderBottom: '1px solid #ddd', width: '98%'}}>
                <Col span={7}><span style={{width: '40px', display: 'inline-block'}}> 状态 : </span><Select placeholder={'全部'} style={{width: 200}} allowClear onChange={(value) => this.stateValue(value)}>
                  {dataT.map((item, index) => {
                    return <Select.Option value={item.value} key={index}>{item.title}</Select.Option>
                  })}
                </Select></Col>
                <Col span={3}><Input placeholder='请输入关键字' onChange={(value) => this.inputChange(value)} /></Col>
                <Col span={11}><Button type='primary' style={{marginLeft: '10px'}} onClick={this.search}>搜索</Button></Col>
                <Col span={2} style={{marginLeft: '3%'}}><Button type='danger' onClick={this.add.bind(this, 'add')}>+信息添加</Button></Col>
              </div>
            </Row>
            <Row>
              <div style={{marginBottom: '15px'}}>
                <Table pagination={false} columns={this.columns} dataSource={this.state.tableData.list} onChange={this.handleChange} />
              </div>
            </Row>
            <Row style={{marginBottom: '10px'}}>
              <Col span={11} />
              <Col >
                {this.state.tableData.total > 5
                  ? <Pagination
                    total={this.state.tableData.total}
                    showSizeChanger
                    showQuickJumper
                    onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                    onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                  /> : null}</Col>
            </Row>
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
