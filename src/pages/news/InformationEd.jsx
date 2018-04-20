/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 教育局的信息公开列表编辑
 */
import React from 'react'
import {Row, Col, Card, Pagination, Input, Select, Table, Button, Modal} from 'antd'
import Policy from './policyEd'
import img from '../../assets/images/hear.jpg'
import hand from '../../assets/images/hand.png'
import people from '../../assets/images/u1632.png'
import './newsList.scss'
import _ul from '../../assets/images/_ul.png'

const data = [
  {
    key: '1',
    title: '赞美太阳',
    information: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。..',
    time: '2018-12-12',
    state: '0'
  }, {
    key: '2',
    title: '赞美太阳公公',
    information: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。..',
    time: 20,
    state: '0'
  }, {
    key: '3',
    title: '赞美太阳婆婆',
    information: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。..',
    time: 20,
    state: '1'
  }, {
    key: '4',
    title: '赞美大树',
    information: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。..',
    time: 20,
    state: '2'
  }, {
    key: '5',
    title: '赞美大树',
    information: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。..',
    time: 20,
    state: '2'
  }, {
    key: '6',
    title: '赞美大树',
    information: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。..',
    time: 20,
    state: '2'
  }, {
    key: '7',
    title: '赞美大树',
    information: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。..',
    time: 20,
    state: '2'
  }, {
    key: '8',
    title: '赞美大树',
    information: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。..',
    time: 20,
    state: '2'
  }, {
    key: '9',
    title: '赞美大树',
    information: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。..',
    time: 20,
    state: '2'
  }]
class InformationEd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        title: '',
        record: '',
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
        dataP: [
          '民办普通高校等学校的设立发123...',
          '民办高等学校办学地址变更发123...',
          '民办学校以捐赠者姓名或者名123...',
          '本市进一步推进高中阶段学校123...',
          '民办学校以捐赠者姓名或者名123...']
      },
      dataRight: {
        total: 99,
        list: [{
          people: '教育机构',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '教育机构',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '运营者',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '教育机构',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '运营者',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '教育机构',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '教育机构',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        }]
      },
      options: [
        {
          value: '省级',
          label: '省级'
        }, {
          value: '市级',
          label: '市级',
          children: [{
            value: '福州市',
            label: '福州市'
          }]
        }, {
          value: '区级',
          label: '区级',
          children: [{
            value: '福州市',
            label: '福州市',
            children: [{
              value: '县级',
              label: '县级'
            }]
          }]
        }
      ]
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
        sorter: true,
        width: 120,
        render (text, record, index) {
        // if (record.state === '0') {
        //   return '审核中'
        // } else if (record.state === '1') {
        //   return '已驳回'
        // } else if (record.state === '2') {
        //   return '已发布'
        // }
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
              <span style={{width: '32px', display: 'inline-block'}}><a href='javascript:;' onClick={() => thiz.edit(record, 'edit')}>
            编辑</a></span>
              <span ><a href='javascript:;' onClick={() => thiz.delete(record)}>
            删除</a></span>
            </div>
          )
        }
      }]
  }
  getList=() => {
    console.log('获取数据')
    let a = {
      pageNum: this.state.pageNum || 1,
      pageSize: this.state.pageSize || 10,
      input: this.state.input || '',
      select: this.state.select || ''
    }
    console.log('教育局信息公开获取数据传送信息', a)
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
      record
    })
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
  // 点击删除
  delete=(record) => {
    console.log('点击删除')
    // let value = {
    //   info_id: record.info_id
    // }
    // console.log('删除传送行传的id', value)
  }
  // 确认按钮
  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false
    }, () => {
      this.sendF()
    })
    console.log('确认发送')
  }
  // 取消按钮
  handleCancel = (e) => {
    console.log(e)
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
      '审核中', '已驳回', '已发布'
    ]
    return <div>
      <div style={{marginLeft: '11%', marginBottom: '20px'}}>
        <Row>
          <div style={{width: '1400px'}}>
            <Col span={5}>
              <Row><div className='left-downer'><img src={this.state.data.imgO} style={{width: '280px'}} alt='' /></div></Row>
              <Row><div className='left-downer'>
                <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: 280 }}>
                  <ul className='ul-margin'>
                    {this.state.data.dataP.map((item, index) => {
                      return <li className='li-hover' key={index} ><img src={_ul} /><span className='span-color'>{item}</span></li>
                    })}
                  </ul>
                </Card></div>
              </Row>
              <Row><img src={this.state.data.imgT} style={{width: '280px'}} alt='' /></Row>
            </Col></div>
          <div style={{width: '1400px'}}>
            <Col span={17} >
              <div style={{marginTop: '15px'}}>
                <Row>
                  <div style={{height: '50px', borderBottom: '1px solid #ddd', width: '1050px'}}>
                    <Col span={7}><span style={{width: '40px', display: 'inline-block'}}> 状态 : </span><Select placeholder={'全部'} style={{width: 200}} allowClear onChange={(value) => this.stateValue(value)}>
                      {dataT.map((item, index) => {
                        return <Select.Option key={index}>{item}</Select.Option>
                      })}
                    </Select></Col>
                    <Col span={5}><Input placeholder='请输入关键字' onChange={(value) => this.inputChange(value)} /></Col>
                    <Col span={7}><Button type='primary' style={{marginLeft: '10px'}} onClick={this.search}>搜索</Button></Col>
                    <Col span={4}><Button type='danger' onClick={this.add.bind(this, 'add')}>+信息添加</Button></Col>
                  </div>
                </Row>
                <Row>
                  <div style={{marginBottom: '15px'}}>
                    <Table pagination={false} columns={this.columns} dataSource={data} onChange={this.handleChange} />
                  </div>
                </Row>
                <Row>
                  <Col span={12} />
                  <Col >
                    <Pagination
                      size='small'
                      total={this.state.dataRight.total}
                      showSizeChanger
                      showQuickJumper
                      onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                      onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                    // pageSizeOptions={5}
                    /></Col>
                </Row>
              </div>
            </Col></div>
        </Row>
      </div>
      <Modal
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
      </Modal>
    </div>
  }
}

export default InformationEd
