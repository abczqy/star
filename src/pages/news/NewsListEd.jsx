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
import ajaxUrl from 'config'
import webStorage from 'webStorage'
import {processStr} from 'utils'
import {newsList, information} from 'services/software-manage'
class News extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewHeight: 500,
      pageSize: 5,
      pageNum: 1,
      imgO: img,
      imgT: img,
      dataP: false, // 公告和分享的list
      img: '', // 公告图片
      newData: {},
      height: '',
      infoData: false
    }
  }
  getList = () => {
    console.log('获取数据')
    let value = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }
    newsList(value, (response) => {
      this.setState({
        newData: response.data
      }, () => {
        console.log('获取数据存在state', this.state.newData)
        console.log('获取数据存在state', this.state.newData.list)
      })
    })

    let values = {
      pageNum: 1,
      pageSize: 100,
      province: '',
      city: '',
      county: ''
    }
    information(values, (response) => {
      this.setState({
        infoData: response.data
      })
    })
  }
  componentDidMount () {
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
  componentWillReceiveProps (nextProps) {
    console.log('判断用户登录')
    if (nextProps !== this.props) {
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
  }
  // 标题的点击事件
  title =() => {
    console.log('右边的标题')
  }
  // 更多的点击事件
  more=() => {
    this.props.history.push({
      pathname: '/unlogged/public'
    })
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
      pathname: '/unlogged/NewDetailsEd',
      search: e.target.text.split(' ')[0]
    }
    )
  }
  // 获取高度
  getHeight=() => {
    if (this.state.webStorage) {
      this.setState({
        viewHeight: window.innerHeight - 214
      })
    } else {
      this.setState({
        viewHeight: window.innerHeight - 193
      })
    }
  }
  // a标签的跳转方法哦~
  handleTabChanges (e) {
    this.props.history.push({
      pathname: '/unlogged/informationDetEd',
      search: e.target.text.split(' ')[0]
    })
  }
  render () {
    return <div style={{margin: 'auto', width: '90%', marginLeft: '10%', height: this.state.viewHeight}}>
      <Row>
        <Col span={5} style={{width: '18%'}}>
          <Row><div className='left-downer' >
            <img src={(!_.isEmpty(this.state.infoData)) && ajaxUrl.IMG_BASE_URL + this.state.infoData.list[0].info_picture} style={{width: '95%', height: '120px'}} alt='' /></div></Row>
          <Row><div className='left-downer'>
            <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '95%' }}>
              <ul className='ul-margin super2'>
                {(!_.isEmpty(this.state.infoData)) && this.state.infoData.list.map((item, index) => {
                  return index < 12 ? <li className='li-hover' key={index} ><img src={_ul} /><a onClick={this.handleTabChanges.bind(this)} className='span-color'><span style={{display: 'none'}}>{item.info_id}</span> {item.info_title}</a></li> : ''
                })}
              </ul>
            </Card></div>
          </Row>
          <Row><img src={(!_.isEmpty(this.state.infoData)) && ajaxUrl.IMG_BASE_URL + this.state.infoData.list[1].info_picture} style={{width: '95%', marginTop: '10px', height: '120px'}} alt='' /></Row>
        </Col>
        <Col span={15} style={{width: '68%', minHeight: '790px', backgroundColor: '#fff'}}>
          <ul className='ul-top' style={{width: '100%', padding: '0', marginTop: '10px'}}>
            {(!_.isEmpty(this.state.newData)) && this.state.newData.list.map((item, index) => {
              return index === 0
                ? <li style={{listStyle: 'none', paddingTop: '25px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '35%'}} key={index}>
                  <Row>
                    <Col span={5}><img src={ajaxUrl.IMG_BASE_URL + item.news_picture} width='80%' height='120' alt='' /></Col>
                    <Col span={19}>
                      <Row>
                        <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.news_id}</span> {item.news_title}</a></p></Col>
                        <Col span={4}><span className='span-top'>{item.news_time}</span></Col>
                      </Row>
                      <Row>
                        <Col span={23}>
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{processStr(item.news_desc, 30)}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <div className='line' />
                  </Row>
                </li> : <li style={{listStyle: 'none', paddingTop: '15px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '35%'}} key={index}>
                  <Row>
                    <Col span={5}><img src={ajaxUrl.IMG_BASE_URL + item.news_picture} width='80%' height='120' alt='' /></Col>
                    <Col span={19}>
                      <Row>
                        <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.news_id}</span> {item.news_title}</a></p></Col>
                        <Col span={4}><span className='span-top'>{item.news_time}</span></Col>
                      </Row>
                      <Row>
                        <Col span={23}>
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{processStr(item.news_desc, 30)}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <div className='line' />
                  </Row>
                </li>
            })}
            <li style={{listStyle: 'none', paddingTop: '15px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '15%'}}>
              <Row style={{marginTop: '10px'}}>
                <Col span={9} />
                <Col >
                  {this.state.newData.total >= 5
                    ? <Pagination
                      current={this.state.pageNum}
                      total={this.state.newData.total}
                      defaultPageSize={5}
                      pageSizeOptions={['5']}
                      showSizeChanger
                      showQuickJumper
                      onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                      // onShowSizeChange={(current, size) => { this.stChange(current, size) }}
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
