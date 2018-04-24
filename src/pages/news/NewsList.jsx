/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/*
无身份区分的教育新闻列表
*/
import React from 'react'
import {Row, Col, Card, Pagination} from 'antd'
import img from '../../assets/images/WeChat.png'
import BottomHeader from '../../components/common/BottomHeader'
import './NewsList.scss'
import _ul from '../../assets/images/_ul.png'
import _ from 'lodash'
import axios from 'axios'
import ajaxUrl from 'config'

// import { renderRoutes } from 'react-router-config'
class News extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pageSize: 10,
      pages: 1,
      imgO: img,
      imgT: img,
      dataP: [], // 公告和分享的list
      img: '', // 公告图片
      newData: {},
      height: ''
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

    axios.get(ajaxUrl.detList).then(item => { // 分享数据列表
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
  componentDidMount () {
    this.getList()
    this.getClassName(document, 'ant-col-5 huoqu')
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
      this.getList()
    })
  }
  // 每页展示数量改变
  stChange=(current, size) => {
    console.log('每页的数量改变', current, size)
    this.setState({
      pageSize: size
    }, () => {
      console.log('获取每页显示数量存到state', this.state.pageSize)
      this.getList()
    })
  }
  // a标签的跳转方法哦~
  handleTabChange (e) {
    console.log('111111111111111', this.props)
    this.props.history.push({
      pathname: '/unlogged/newsDetails',
      search: e.target.text.split(' ')[0]
    })
  }
  // 获取页面元素
  getClassName=(parent, cls1) => {
    let res = [] // 存放匹配结果的数组
    let ele = parent.getElementsByTagName('*')
    for (let i = 0; i < ele.length; i++) {
      if (ele[i].className === cls1) {
        console.log('ant-col-5 huoqu', ele[i].offsetHeight)
        this.setState({
          height: ele[i].offsetHeight
        })
        console.log('对应的元素', ele[i])
        res.push(ele[i])
      }
    }
  }
  // 获取字符串
  processStr=(str, n) => {
    let l = str.length
    if (l <= n) { return str } else {
      return str.slice(0, n) + '...'
    }
  }
  render () {
    return <div>
      <div style={{marginLeft: '15%', marginBottom: '20px'}}>
        <Row>
          <Col span={5} style={{width: '450px'}}>
            <Row><div className='left-downer' ><div className='huoqu1'><img src={this.state.imgO} style={{width: '280px', height: '120px'}} alt='' /></div></div></Row>
            <Row><div className='left-downer' >
              <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: 280 }}>
                <div className='huoqu2'>
                  <ul className='ul-margin'>
                    {(!_.isEmpty(this.state.dataP)) && this.state.dataP.map((item, index) => {
                      return <li className='li-hover' key={index} ><img src={_ul} /><span className='span-color'>{item}</span></li>
                    })}
                  </ul>
                </div>
              </Card></div>
            </Row>
            <Row><div className='huoqu3'><img src={this.state.imgT} style={{width: '280px', marginTop: '10px', height: '120px'}} alt='' /></div></Row>
          </Col>
          <Col span={15} >
            <ul className='ul-top' style={{width: '850px', height: '679px', backgroundColor: '#fff'}}>
              {(!_.isEmpty(this.state.newData)) && this.state.newData.list.map((item, index) => {
                return index === 0
                  ? <li style={{listStyle: 'none', paddingTop: '25px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '880px', height: '180px'}} key={index}>
                    <Row>
                      <Col span={5}><img src={this.state.imgO} style={{width: '135px'}} alt='' /></Col>
                      <Col span={16}>
                        <Row>
                          <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.news_id}</span> {item.news_title}</a></p></Col>
                          <Col span={4}><span className='span-top'>{item.news_time}</span></Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{this.processStr(item.news_desc, 30)}</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <div className='line' />
                    </Row>
                  </li> : <li style={{listStyle: 'none', paddingTop: '15px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '880px', height: '170px'}} key={index}>
                    <Row>
                      <Col span={5}><img src={this.state.imgO} style={{width: '135px'}} alt='' /></Col>
                      <Col span={16}>
                        <Row>
                          <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.news_id}</span> {item.news_title}</a></p></Col>
                          <Col span={4}><span className='span-top'>{item.news_time}</span></Col>
                        </Row>
                        <Row>
                          <Col span={23}>
                            <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{this.processStr(item.news_desc, 30)}</p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <div className='line' />
                    </Row>
                  </li>
              })}
            </ul>
            <Row>
              <Col span={9} />
              <Col span={14}>
                {this.state.newData.total >= 5
                  ? <Pagination
                    total={this.state.newData.total}// {this.state.newData.total}
                    showSizeChanger
                    showQuickJumper
                    onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                    onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                    // pageSizeOptions={5}
                  /> : null}</Col>
            </Row>
          </Col>
        </Row>
      </div>
      <BottomHeader />
    </div>
  }
}

export default News
