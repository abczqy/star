/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/*
教育局的教育新闻列表
*/
import React from 'react'
import {Row, Col, Card, Pagination} from 'antd'
import img from '../../assets/images/hear.jpg'
import './NewsList.scss'
import _ from 'lodash'
import _ul from '../../assets/images/_ul.png'
import axios from 'axios'
import ajaxUrl from 'config'
class News extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pageSize: 10,
      pages: 1,
      data: {
        imgO: img,
        imgT: img,
        dataP: [
          '民办普通高校等学校的设立发123...',
          '民办高等学校办学地址变更发123...',
          '民办学校以捐赠者姓名或者名123...',
          '本市进一步推进高中阶段学校123...',
          '民办学校以捐赠者姓名或者名123...']
      },
      dataRight: {
        total: 50,
        list: [{
          imgs: img,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '1111为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          imgs: img,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          imgs: img,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          imgs: img,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          imgs: img,
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        }]
      },
      newData: {}
    }
  }
  getList = () => {
    console.log('获取数据')
    let value = {
      pageNum: this.state.pages,
      pageSize: this.state.pageSize
    }
    axios.post(ajaxUrl.newsList, {
      value
    }).then(item => {
      this.setState({
        newData: item.data
      }, () => {
        console.log('获取数据存在state', this.state.newData)
        console.log('获取数据存在state', this.state.newData.list)
      })
    }).catch(err => {
      console.log(err)
    })
  }
  componentWillMount () {
    this.getList()
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
      console.log('获取分页存到state', this.state.pageNum)
    })
    this.getList()
  }
  // 每页展示数量改变
  stChange=(current, size) => {
    console.log('每页的数量改变', current, size)
    this.setState({
      pageSize: size
    }, () => {
      console.log('获取每页显示数量存到state', this.state.pageSize)
    })
    this.getList()
  }
  // a标签的跳转方法哦~
  handleTabChange= (e) => {
    // console.log('111111111111111', this.props.route)
    // if (link === this.props.location.pathname) {
    //   window.location.reload()
    // }
    this.props.history.push({
      pathname: '/operate-manage-home/NewDetailsEd',
      search: e.target.text.split(' ')[0]
    }
    )
  }
  render () {
    return <div>
      <div style={{marginLeft: '15%', marginBottom: '20px'}}>
        <Row>
          <div style={{width: '1400px'}}>
            <Col span={5}>
              <Row><div className='left-downer' ><img src={this.state.data.imgO} style={{width: '280px'}} alt='' /></div></Row>
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
            </Col>
          </div>
          <div style={{width: '1400px'}}>
            <Col span={15}>
              <ul className='ul-top'>
                {(!_.isEmpty(this.state.newData)) && this.state.newData.list.map((item, index) => {
                  return <li style={{listStyle: 'none', borderBottomColor: '#666', width: '880px', height: '160px'}} key={index}>
                    <Col span={5}><img src={item.news_img} style={{width: '135px'}} alt='' /></Col>{/* item.news_img */}
                    <Col span={16}>
                      <Row>{/*                                                               key={item.news_id}       item.new_title */}
                        <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.news_id}</span> {item.news_title}</a></p></Col>
                        <Col span={4}><span className='span-top'>{item.news_time}</span></Col>{/* {item.news_time} */}
                      </Row>
                      <Row>
                        <Col span={23}>{/* .....................................................{item.news_desc} */}
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{item.news_desc}</p>
                        </Col>
                      </Row>
                    </Col>
                  </li>
                })}
              </ul><Row>
                <Col span={10} />
                <Col >
                  <Pagination
                    size='small'
                    total={this.state.newData.total}
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

export default News
