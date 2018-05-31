/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 无身份区分新闻列表详情
 */
import React from 'react'
import {Row, Col, Card, Tooltip} from 'antd'
import img from '../../assets/images/WeChat.png'
import './NewsList.scss'
import ul from '../../assets/images/u1427.png'
import zui from '../../assets/images/u1417.png'
import fen from '../../assets/images/u1415.png'
import _ul from '../../assets/images/_ul.png'
import shareContent from '../../utils/shareContent'
import _ from 'lodash'
import webStorage from 'webStorage'
import {newsListDet, newsList, information} from 'services/software-manage'
import moment from 'moment'
import ajaxUrl from 'config'
// import _ from 'lodash'

class NewsDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewHeight: 500,
      imgT: img,
      imgUl: ul,
      imgFen: fen,
      imgZui: zui,
      dataP: [], // 公告和分享的list
      img: '', // 公告图片
      newData: null,
      dataRight: {
        positionO: '新闻列表',
        positionT: '国内新闻',
        a: '政策法规新要求.doc'
      },
      newDatas: null,
      infoData: false
    }
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
      console.log('获取数据')
      let a = window.location.href.split('?')
      let value = {
        news_id: Number(a[a.length - 1])
      }
      console.log(value)
      newsListDet(value, (response) => {
        this.setState({
          newData: response.data
        }, () => {
          console.log('获取数据存在state', this.state.newData)
          console.log('获取数据存在state', this.state.newData.list)
        })
      })
    }
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
  getList=() => {
    console.log('获取数据')
    let a = window.location.href.split('?')
    let value = {
      news_id: Number(a[a.length - 1])
    }
    newsListDet(value, (response) => {
      this.setState({
        newData: response.data
      })
    })

    let values = {
      pageNum: 1,
      pageSize: 100
    }
    newsList(values, (response) => {
      this.setState({
        newDatas: response.data
      })
    })

    let valuez = {
      pageNum: 1,
      pageSize: 100,
      info_class: ''
    }
    information(valuez, (response) => {
      this.setState({
        infoData: response.data
      })
    })
  }
  // 更多的点击事件
  more=() => {
    this.props.history.push({
      pathname: '/home/information'
    })
  }
  // 点击当前位置(教育新闻)
  position (e) {
    this.props.history.push({
      pathname: '/home/newsList'
    }
    )
  }

  getQRCode () {
    return (<div>
      <Row>
        <Col span={24}>
          <img width={120} height={120} src={shareContent.getQRCodeUrl()} />
        </Col>
      </Row>
      <Row>
        <div style={{textAlign: 'center'}}>用微信扫码二维码<br />分享至好友和朋友圈</div>
      </Row>
    </div>)
  }
// 获取高度
getHeight=() => {
  if (this.state.webStorage) {
    this.setState({
      viewHeight: window.innerHeight - 223,
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
    pathname: '/home/informationDet',
    search: e.target.text.split(' ')[0]
  })
}
// a标签的跳转方法哦~
handleTabChangess (e) {
  this.props.history.push({
    pathname: '/home/newsDetails',
    search: e.target.text.split(' ')[0]
  })
}
render () {
  return (
    <div className='news-list-container' style={{minHeight: this.state.viewHeight}}>
      <div id='right-container' style={{minHeight: this.state.viewHeight}}>
        <div style={{backgroundColor: '#fff', width: '100%', minHeight: this.state.viewHeights}}>
          <Row>
            <ul className='details-li-ul'>
              <li className='details-li-hover'><span className='span-colors'>当前位置: <a onClick={this.position.bind(this)}>{this.state.dataRight.positionO}</a> / {this.state.dataRight.positionT}</span></li>
            </ul>
          </Row>
          <Row>
            <Col span={24}>
              <div className='details-right-div'>
                <p className='details-right-title'>{this.state.newData ? this.state.newData.news_title : '1'}</p>
                <span className='details-right-time'>发布时间:{this.state.newData ? moment(this.state.newData.news_time).format('YYYY-MM-DD') : '时间'}</span>
                <div className='details-right-div-div'>
                  {this.state.newData ? this.state.newData.news_desc : '文章'}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div style={{marginBottom: '18px', marginLeft: '15%'}}>
              <div style={{width: '200px', height: '30px'}}>
                <span style={{float: 'left', height: '28px', lineHeight: '28px'}}>分享:</span>
                <span title='分享到QQ空间' className='share-Qzone' onClick={(e) => { shareContent.shareToQzone(e) }} />
                <Tooltip overlayClassName='custom-share-container' trigger='click' placement='top' title={this.getQRCode()} okText='' cancelText=''>
                  <span title='分享到微信朋友圈' className='share-WeChat jiathis_button_weixin' />
                </Tooltip>
                <span title='分享到新浪微博' className='share-SinaWB' onClick={(e) => { shareContent.shareToSinaWB(e) }} />
              </div>
              <div>
                <img src={this.state.imgZui} style={{width: '80%'}} alt='' />
              </div>
              <ul className='details-li-ul-down'>
                {(!_.isEmpty(this.state.newDatas)) && this.state.newDatas.list.map((item, index) => {
                  return index < 4 ? <li key={index} style={{lineHeight: '25px'}}><img src={this.state.imgUl} style={{width: '6px', marginRight: '8px'}} alt='' /><a onClick={this.handleTabChangess.bind(this)} className='span-color'><span style={{display: 'none'}}>{item.news_id}</span> {item.news_title}</a></li> : null
                })}
              </ul>
            </div>
          </Row></div>
      </div>
      <div id='left-container'>
        <div className='center-public-info'>
          <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '98%' }}>
            <ul className='ul-margin super'>
              {this.state.infoData && this.state.infoData.list.map((item, index) => {
                return index < 12 ? <li className='li-hover' key={index} ><img src={_ul} /><a onClick={this.handleTabChanges.bind(this)} className='span-color'><span style={{display: 'none'}}>{item.info_id}</span> {item.info_title}</a></li> : ''
              })}
            </ul>
          </Card>
        </div>
        <div className='bottom-img'>
          <img src={this.state.infoData ? ajaxUrl.IMG_BASE_URL + this.state.infoData.list[0].info_picture : ''} style={{width: '98%', marginTop: '10px', height: '120px'}} alt='' />
        </div>
      </div>

    </div>
  )
}
}

export default NewsDetails
