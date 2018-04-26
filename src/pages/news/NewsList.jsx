/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/*
无身份区分的教育新闻列表
*/
import React from 'react'
import {Row, Col, Card, Pagination} from 'antd'
import img from '../../assets/images/WeChat.png'
import './NewsList.scss'
import _ul from '../../assets/images/_ul.png'
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
      dataP: false, // 公告和分享的list
      img: '', // 公告图片
      newData: null,
      height: '',
      heights: ''
    }
  }
  getList = () => {
    console.log('获取数据')
    let value = {
      pageNum: this.state.pages,
      pageSize: this.state.pageSize
    }
    axios.post(ajaxUrl.newsList,
      value
    ).then(item => {
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
    this.getHeight()
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
  // 获取高度
  getHeight=() => {
    if (this.state.dataP) {
      this.setState({
        heights: 730
      })
    } else {
      this.setState({
        heights: 385
      })
    }
  }
  render () {
    return (
      <div className='news-list-container'>
        <div id='right-container' style={{height: `${this.state.height}px`}}>
          <ul className='ul-top' style={{width: '100%', backgroundColor: '#fff', padding: '0'}}>
            {this.state.newData ? this.state.newData.list.map((item, index) => {
              return index === 0
                ? <li style={{listStyle: 'none', paddingTop: '25px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '180px'}} key={index}>
                  <Row>
                    <Col span={5}><img src={this.state.imgO} style={{width: '135px'}} alt='' /></Col>
                    <Col span={16}>
                      <Row>
                        <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.news_id}</span> {item.news_title}</a></p></Col>
                        <Col span={4}><span className='span-top'>{item.news_time}</span></Col>
                      </Row>
                      <Row>
                        <Col span={23}>
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{this.processStr(item.news_desc, 100)}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <div className='line' />
                  </Row>
                </li> : <li style={{listStyle: 'none', paddingTop: '15px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '170px'}} key={index}>
                  <Row>
                    <Col span={5}><img src={this.state.imgO} style={{width: '135px'}} alt='' /></Col>
                    <Col span={16}>
                      <Row>
                        <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.news_id}</span> {item.news_title}</a></p></Col>
                        <Col span={4}><span className='span-top'>{item.news_time}</span></Col>
                      </Row>
                      <Row>
                        <Col span={23}>
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{this.processStr(item.news_desc, 100)}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <div className='line' />
                  </Row>
                </li>
            }) : ''}
            <li style={{listStyle: 'none', paddingTop: '15px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '170px'}}>
              <Row style={{marginBottom: '10px'}}>
                <Col span={12} />
                <Col >
                  {this.state.newData ? (this.state.newData.total >= 5
                    ? <Pagination
                      total={this.state.newData.total}// {this.state.newData.total}
                      showSizeChanger
                      showQuickJumper
                      onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                      onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                    /> : null) : <Pagination total={50} showSizeChanger showQuickJumper onChange={(page, pageSize) => { this.ptChange(page, pageSize) }} onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                  /> }
                </Col>
              </Row>
            </li>
          </ul>
        </div>
        <div id='left-container'>
          <div className='top-img' >
            <img src={this.state.imgO} style={{width: '98%', height: '120px'}} alt='' />
          </div>
          <div className='center-public-info'>
            <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '98%' }}>
              <ul>
                {this.state.dataP && this.state.dataP.map((item, index) => {
                  return <li className='li-hover' key={index} ><img src={_ul} /><span className='span-color'>{item}</span></li>
                })}
              </ul>
            </Card>
          </div>
          <div className='bottom-img'>
            <img src={this.state.imgT} style={{width: '98%', marginTop: '10px', height: '120px'}} alt='' />
          </div>
        </div>

      </div>
    )
  }
}

export default News
