/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 教育局的新闻列表详情
 */
import React from 'react'
import {Row, Col, Card, Tooltip} from 'antd'
import img from '../../assets/images/WeChat.png'
import './NewsList.scss'
import ul from '../../assets/images/u1427.png'
import zui from '../../assets/images/u1417.png'
import fen from '../../assets/images/u1415.png'
import _ul from '../../assets/images/_ul.png'
import _ from 'lodash'
import shareContent from '../../utils/shareContent'
import webStorage from 'webStorage'
import moment from 'moment'
import ajaxUrl from 'config'
import {newsListDet, newsList, information} from 'services/software-manage'
class NewsDetailsEd extends React.Component {
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
      dataRight: {
        positionO: '教育新闻',
        positionT: '国内新闻'
      },
      newData: null,
      newDatas: null,
      infoData: false
    }
  }
  getList=() => {
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
  // 更多的点击事件
  more=() => {
    this.props.history.push({
      pathname: '/unlogged/public'
    })
  }
  // 点击当前位置(教育新闻)
  position (e) {
    this.props.history.push({
      pathname: '/unlogged/edu'
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
        viewHeight: window.innerHeight - 214,
        viewHeights: window.innerHeight - 235
      })
    } else {
      this.setState({
        viewHeight: window.innerHeight - 193,
        viewHeights: window.innerHeight - 220
      })
    }
  }
  // a标签的跳转方法哦~
  handleTabChanges (e) {
    console.log('123123123123123213', e.target.text)
    this.props.history.push({
      pathname: '/unlogged/informationDetEd',
      search: e.target.text.split(' ')[0]
    })
  }
  // a标签的跳转方法哦~
  handleTabChangess (e) {
    this.props.history.push({
      pathname: '/unlogged/NewDetailsEd',
      search: e.target.text.split(' ')[0]
    })
  }
  render () {
    return <div style={{margin: 'auto', width: '90%', marginLeft: '12%', minHeight: this.state.viewHeight}}>
      <Row>
        <Col span={5} style={{width: '18%'}}>
          <div className='left-downer'>
            <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '95%' }}>
              <ul className='ul-margin super3'>
                {this.state.infoData && this.state.infoData.list.map((item, index) => {
                  return index < 12 ? <li className='li-hover' key={index} ><img src={_ul} /><a onClick={this.handleTabChanges.bind(this)} className='span-color'><span style={{display: 'none'}}>{item.info_id}</span> {item.info_title}</a></li> : ''
                })}
              </ul>
            </Card>
          </div>
          <img src={this.state.infoData ? ajaxUrl.IMG_BASE_URL + this.state.infoData.list[0].info_picture : ''} style={{width: '95%', marginTop: '10px', height: '120px'}} alt='' />
        </Col>
        <Col span={15} style={{width: '68%', marginTop: '10px', minHeight: this.state.viewHeights}}>
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
        </Col>
      </Row>
    </div>
  }
}

export default NewsDetailsEd
