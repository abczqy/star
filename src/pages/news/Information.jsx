/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 游客的信息公开
 */
import React from 'react'
import {Row, Col, Card, Pagination, Cascader} from 'antd'
import img from '../../assets/images/hear.jpg'
import hand from '../../assets/images/hand.png'
import people from '../../assets/images/u1632.png'
import './NewsList.scss'
import _ul from '../../assets/images/_ul.png'
import _ from 'lodash'
import axios from 'axios'
import ajaxUrl from 'config'
class Information extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imgO: img,
      imgT: img,
      imgH: hand,
      imgP: people,
      pageNum: 1,
      pageSize: 10,
      selete: false, // 选择地区
      dataP: [], // 公告和分享的list
      imgG: '', // 公告图片
      dataRight: {
        total: 99,
        list: [{
          people: '教育机构',
          news_id: 1,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。......'
        },
        {
          people: '教育机构',
          news_id: 2,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。......'
        },
        {
          people: '运营者',
          news_id: 3,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。......'
        },
        {
          people: '教育机构',
          news_id: 4,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。......'
        },
        {
          people: '运营者',
          news_id: 5,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。......'
        },
        {
          people: '教育机构',
          news_id: 6,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222十九大精33333333333333333333333333333333333333333333333333333333333333333333333333333333神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。......'
        },
        {
          people: '教育机构',
          news_id: 7,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。......'
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
      ],
      infoData: {}
    }
  }

  componentWillMount () {
    this.getList()
  }
  getList=() => {
    let value = {
      pageNum: this.state.pageNum || 1,
      pageSize: this.state.pageSize || 10,
      province: this.state.selete ? '' : this.state.selete[0],
      city: this.state.selete ? '' : this.state.selete[1],
      county: this.state.selete ? '' : this.state.selete[2]
    }
    console.log('游客的信息公开获取数据传的参数', value)
    axios.get(ajaxUrl.information, {
      value
    }).then(item => {
      this.setState({
        infoData: item.data
      }, () => {
        console.log('this.state.infoData', this.state.infoData)
        console.log('this.state.infoData.list', this.state.infoData.list)
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
  // 标题的点击事件
  title =() => {
    console.log('右边的标题')
  }
  // 更多的点击事件
  more=() => {
    console.log('更多')
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
  // 下拉分级改变
  onChangeF =(value) => {
    console.log(value)
    this.setState({
      selete: value
    }, () => {
      this.getList()
    })
  }
  // a连接的页面跳转方法呦
  handleTabChange (e) {
    this.props.history.push({
      pathname: '/unlogged/informationDet',
      search: e.target.text.split(' ')[0]
    })
  }
  render () {
    console.log('要用的数据', this.state.infoData)
    return <div>
      <div style={{marginLeft: '15%', marginBottom: '20px'}}>
        <Row>
          <div style={{width: '1400px'}}>
            <Col span={5}>
              <Row><div className='left-downer'><img src={this.state.img} style={{width: '280px'}} alt='' /></div></Row>
              <Row><div className='left-downer'>
                <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: 280 }}>
                  <ul className='ul-margin'>
                    {(!_.isEmpty(this.state.dataP)) && this.state.dataP.map((item, index) => {
                      return <li className='li-hover' key={index} ><img src={_ul} /><span className='span-color'>{item}</span></li>
                    })}
                  </ul>
                </Card></div>
              </Row>
              <Row><img src={this.state.img} style={{width: '280px'}} alt='' /></Row>
            </Col></div>
          <div style={{width: '1400px'}}>
            <Col span={16}>
              <ul className='ul-top' style={{width: '800px'}}>
                <li style={{listStyle: 'none', width: '800px'}}>
                  <span>发布机构 : <Cascader placeholder='请选择' options={this.state.options} onChange={(value) => { this.onChangeF(value) }} /></span>
                  {/* <span className='ST'><a onClick={this.modal}><img src={this.state.imgP} style={{width: '18px'}} alt='' />省厅</a></span> */}
                  <span style={{fontSize: '12px', marginLeft: '45%'}}><img src={this.state.imgH} style={{width: '20px'}} alt='' />点击蓝色字段，可切换级别筛选</span></li>
                {(!_.isEmpty(this.state.infoData)) && this.state.infoData.list.map((item, index) => {
                  return <li style={{listStyle: 'none', borderBottom: '1px solid rgb(180,190,199)', width: '800px', height: '130px'}} key={index}>
                    <Col span={24}>
                      <Row>
                        <Col span={17}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.news_id}</span> {item.info_title ? item.info_title : '预备' }</a></p></Col>{/* this.state.infoData.info_title */}
                        <Col span={4}><span className='span-top'>发布者:{item.info_per}</span></Col>
                        <Col span={3}><span className='span-top'>{item.info_time}</span></Col>
                      </Row>
                      <Row>
                        <Col span={23}>
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{item.info_desc}</p>
                        </Col>
                      </Row>
                    </Col>
                  </li>
                })}
              </ul>
              <Row>
                <Col span={9} />
                <Col >
                  <Pagination
                    size='small'
                    total={this.state.infoData.total}
                    showSizeChanger
                    showQuickJumper
                    onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                    onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                  // pageSizeOptions={5}
                  /></Col>
              </Row>
            </Col>
          </div>
        </Row>
      </div>
    </div>
  }
}

export default Information
