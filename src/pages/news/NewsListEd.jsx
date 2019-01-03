/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/*
教育局的教育新闻列表
*/
import React from 'react'
import {Row, Col, Pagination, message} from 'antd'
import img from '../../assets/images/hear.jpg'
import './NewsList.scss'
import _ from 'lodash'
// import _ul from '../../assets/images/_ul.png'
import moment from 'moment'
// import ajaxUrl from 'config'
import webStorage from 'webStorage'
import {processStr} from 'utils'
import {newsList} from 'services/software-manage'
import { withRouter } from 'react-router'
import pic from '../../assets/images/u18499.png'
import config from '../../../config/index'
const {IMG_BASE_URL_V2} = config

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
    newsList(value, 1, (response) => {
      if (response.data.code === 200) {
        this.setState({
          newData: response.data.data
        })
      } else {
        message.warn(response.data.msg)
      }
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
      pathname: '/home/public'
    })
  }
  // 分页页码改变
  ptChange=(page, pageSize) => {
    this.setState({
      pageNum: page
    }, () => this.getList())
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
  // a标签的跳转方法哦~
  handleTabChange= (e) => {
    this.props.history.push({
      pathname: '/home/NewDetailsEd',
      search: e.target.text.split(' ')[0]
    }
    )
  }
  // 获取高度
  getHeight=() => {
    if (this.state.webStorage) {
      this.setState({
        viewHeight: window.innerHeight - 214,
        viewHeights: window.innerHeight - 300
      })
    } else {
      this.setState({
        viewHeight: window.innerHeight - 193,
        viewHeights: window.innerHeight - 250
      })
    }
  }
  // a标签的跳转方法哦~
  handleTabChanges (e) {
    this.props.history.push({
      pathname: '/home/informationDetEd',
      search: e.target.text.split(' ')[0]
    })
  }
  render () {
    return <div style={{width: '100%', marginLeft: '12%', minHeight: this.state.viewHeight}}>
      <Row>
        <Col span={20} style={{width: '77.5%', minHeight: this.state.viewHeights, backgroundColor: '#fff'}}>
          <ul className='ul-top' style={{width: '100%', padding: '0', marginTop: '10px'}}>
            {(!_.isEmpty(this.state.newData)) && this.state.newData.info.map((item, index) => {
              return index === 0
                ? <li style={{listStyle: 'none', paddingTop: '25px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '35%'}} key={index}>
                  <Row>
                    <Col span={5}><img src={item.picUrl ? IMG_BASE_URL_V2 + item.picUrl : pic} width='80%' height='120' alt='' /></Col>
                    <Col span={19}>
                      <Row>
                        <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.id}</span> {item.contentTitle}</a></p></Col>
                        <Col span={4}><span className='span-top'>{moment(item.updateTime).format('YYYY-MM-DD')}</span></Col>
                      </Row>
                      <Row>
                        <Col span={23}>
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{processStr(item.content, 30)}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <div className='line' style={{width: '93.5%'}} />
                  </Row>
                </li> : <li style={{listStyle: 'none', paddingTop: '15px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '35%'}} key={index}>
                  <Row>
                    <Col span={5}><img src={item.picUrl ? IMG_BASE_URL_V2 + item.picUrl : pic} width='80%' height='120' alt='' /></Col>
                    <Col span={19}>
                      <Row>
                        <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.id}</span> {item.contentTitle}</a></p></Col>
                        <Col span={4}><span className='span-top'>{moment(item.updateTime).format('YYYY-MM-DD')}</span></Col>
                      </Row>
                      <Row>
                        <Col span={23}>
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{processStr(item.content, 30)}</p>
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
              <Row style={{float: 'right', marginRight: '4.5%', marginBottom: '5px'}}>
                {/* <Col span={12} />
                <Col > */}
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
                  /> : null}
                {/* </Col> */}
              </Row>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  }
}

export default withRouter(News)
