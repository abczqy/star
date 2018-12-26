/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/*
无身份区分的教育新闻列表
*/
import React from 'react'
import {Row, Col, Pagination} from 'antd'
import img from '../../assets/images/WeChat.png'
import './NewsList.scss'
// import _ul from '../../assets/images/_ul.png'
import moment from 'moment'
// import ajaxUrl from 'config'
import webStorage from 'webStorage'
import {processStr} from 'utils'
import { withRouter } from 'react-router'
import {newsList, information} from 'services/software-manage'
import pic from '../../assets/images/u18499.png'

// import { renderRoutes } from 'react-router-config'
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
      newData: null,
      height: '',
      heights: '',
      webStorage: false,
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
      console.log(response.data.data.info)
      this.setState({
        newData: response.data.data
      })
    })

    let values = {
      pageNum: 1,
      pageSize: 100
    }
    information(values, 2, 1, (response) => {
      console.log(response)
      this.setState({
        infoData: response.data.data
      }, () => {
        console.log('图片', this.state.infoData)
      })
    })
  }
  componentDidMount () {
    this.getH()
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
      pathname: '/home/information'
    })
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
    this.props.history.push({
      pathname: '/home/newsDetails',
      search: e.target.text.split(' ')[0]
    })
  }
  // a标签的跳转方法哦~
  handleTabChanges (e) {
    this.props.history.push({
      pathname: '/home/informationDet',
      search: e.target.text.split(' ')[0]
    })
  }
  // 获取高度
  getH=() => {
    // let a = document.getElementById('ulul').offsetHeight
    // console.log('公告的高度', a)
  }
  // 获取高度
  getHeight=() => {
    if (this.state.webStorage) {
      this.setState({
        viewHeight: window.innerHeight - 237,
        viewHeights: window.innerHeight - 260
      })
    } else {
      this.setState({
        viewHeight: window.innerHeight - 193,
        viewHeights: window.innerHeight - 240
      })
    }
  }
  render () {
    // const topImg = '/image/infot.png'
    // const bottomImg = '/image/infob.png'
    return (
      <div className='news-list-container' style={{minHeight: this.state.viewHeight}}>
        <div id='right-container' style={{width: '100%'}}>
          <ul className='ul-top' style={{width: '100%', backgroundColor: '#fff', padding: '0', minHeight: this.state.viewHeights}}>
            {this.state.newData ? this.state.newData.info.map((item, index) => {
              return index === 0
                ? <li style={{listStyle: 'none', paddingTop: '25px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '19.5%'}} key={index}>
                  <Row>
                    <Col span={5}><img src={pic} width='80%' height='110' alt='' /></Col>
                    <Col span={19}>
                      <Row>
                        <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.id}</span> {item.contentTitle}</a></p></Col>
                        <Col span={4}><span className='span-top'>{moment(item.updateTime).format('YYYY-MM-DD')}</span></Col>
                      </Row>
                      <Row>
                        <Col span={23}>
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{processStr(item.content, 100)}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <div className='line' style={{width: '93.5%'}} />
                  </Row>
                </li> : <li style={{listStyle: 'none', paddingTop: '15px', paddingBottom: '0px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '19%'}} key={index}>
                  <Row>
                    <Col span={5}><img src={pic} width='80%' height='120' alt='' /></Col>
                    <Col span={19}>
                      <Row>
                        <Col span={20}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.id}</span> {item.contentTitle}</a></p></Col>
                        <Col span={4}><span className='span-top'>{moment(item.updateTime).format('YYYY-MM-DD')}</span></Col>
                      </Row>
                      <Row>
                        <Col span={23}>
                          <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{processStr(item.content, 100)}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <div className='line' />
                  </Row>
                </li>
            }) : ''}
            <li style={{listStyle: 'none', paddingTop: '15px', paddingBottom: '10px', paddingLeft: '30px', backgroundColor: '#fff', width: '100%', height: '19%'}}>
              <Row >
                <Col span={15} />
                <Col >
                  {this.state.newData ? (this.state.newData.total >= 5
                    ? <Pagination
                      current={this.state.pageNum}
                      defaultPageSize={5}
                      pageSizeOptions={['5']}
                      total={this.state.newData.total}// {this.state.newData.total}
                      showSizeChanger
                      showQuickJumper
                      onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                      // onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                    /> : null) : ''
                  }
                </Col>
              </Row>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(News)
