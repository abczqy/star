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
    this.props.history.push({
      pathname: '/operate-manage-home/NewDetailsEd',
      search: e.target.text.split(' ')[0]
    }
    )
  }
  // 获取字符串
  processStr=(str, n) => {
    let l = str.length
    if (l <= n) { return str } else {
      return str.slice(0, n) + '...'
    }
  }
  render () {
    return <div style={{margin: 'auto', width: '100%', marginLeft: '6%'}}>
      <Row>
        <Col span={5} style={{width: '18%'}}>
          <Row><div className='left-downer' ><img src={this.state.imgO} style={{width: '95%', height: '120px'}} alt='' /></div></Row>
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
        <Col span={15} style={{width: '68%'}}>
          <ul className='ul-top' style={{width: '100%', marginTop: '10px', height: '730px', backgroundColor: '#fff'}}>
            {(!_.isEmpty(this.state.newData)) && this.state.newData.list.map((item, index) => {
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
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{this.processStr(item.news_desc, 30)}</p>
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
            <li style={{listStyle: 'none', paddingTop: '15px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '170px'}}>
              <Row style={{marginBottom: '10px'}}>
                <Col span={9} />
                <Col >
                  {this.state.newData.total >= 5
                    ? <Pagination
                      total={this.state.newData.total}
                      showSizeChanger
                      showQuickJumper
                      onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                      onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                    /> : null}</Col>
              </Row>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  }
}

export default News
