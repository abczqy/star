/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/*
无身份区分的教育新闻列表
*/
import React from 'react'
import {Row, Col, Card, Pagination} from 'antd'
import img from '../../assets/images/hear.jpg'
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

    axios.get(ajaxUrl.detList).then(item => {
      console.log('我到底做了个啥？？？', item.data)
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
    // if (link === this.props.location.pathname) {
    //   window.location.reload()
    // }
    this.props.history.push({
      pathname: '/unlogged/newsDetails',
      search: e.target.text.split(' ')[0]
    })
    // console.log('点击元素的key', e.target.text.split(' ')[0])
    // window.location.href = `localhost:8080/#/unlogged/newsDetails?${e.target.text.split(' ')[0]}`
  }
  render () {
    return <div>
      <div style={{marginLeft: '15%', marginBottom: '20px'}}>
        <Row>
          <div style={{width: '1400px'}}>
            <Col span={5}>
              <Row><div className='left-downer' ><img src={this.state.img} style={{width: '280px'}} alt='' /></div></Row>
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
            </Col>
          </div>
          <div style={{width: '1400px'}}>
            <Col span={15}>
              <ul className='ul-top'>
                {/* this.state.newData.list.map */}
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
                <Col span={14}>
                  <Pagination
                    size='small'
                    total={this.state.newData.total}// {this.state.newData.total}
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
