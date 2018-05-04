/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 游客的信息公开详情
 */
import React from 'react'
import {Row, Col, Card, Tooltip} from 'antd'
import img from '../../assets/images/WeChat.png'
import './NewsList.scss'
import ul from '../../assets/images/u1427.png'
import _ul from '../../assets/images/_ul.png'
import zui from '../../assets/images/u1417.png'
import fen from '../../assets/images/u1415.png'
import _ from 'lodash'
import shareContent from '../../utils/shareContent'
import webStorage from 'webStorage'
import moment from 'moment'
import ajaxUrl from 'config'
import {informationDet, newsList, information} from 'services/software-manage'

class InformationDet extends React.Component {
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
      infoData: null,
      dataRight: {
        positionO: '信息公开',
        positionT: '国内新闻',
        a: '政策法规新要求.doc'
      },
      newDatas: false,
      infoDatas: false
    }
  }
  getList=() => {
    console.log('获取数据')
    let a = window.location.href.split('?')
    let value = {
      info_id: Number(a[a.length - 1])
    }
    console.log('游客的信息公开详情传递参数', value)
    informationDet(value, (response) => {
      this.setState({
        infoData: response.data
      }, () => {
        console.log('this.state.infoData', this.state.infoData)
      })
    })

    let values = {
      pageNum: 1,
      pageSize: 10
    }
    newsList(values, (response) => {
      this.setState({
        newDatas: response.data
      })
    })

    let valuez = {
      pageNum: 1,
      pageSize: 100,
      province: '',
      city: '',
      county: ''
    }
    information(valuez, (response) => {
      this.setState({
        infoDatas: response.data
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
  // 更多的点击事件
  more=() => {
    console.log('更多')
  }
  // 点击当前位置(教育新闻)
  position (e) {
    this.props.history.push({
      pathname: '/unlogged/information'
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
        viewHeight: window.innerHeight - 223
      })
    } else {
      this.setState({
        viewHeight: window.innerHeight - 193
      })
    }
  }
  render () {
    return (
      <div className='news-list-container' style={{height: this.state.viewHeight}}>
        <div id='right-container' style={{height: this.state.viewHeight}}>
          <div style={{backgroundColor: '#fff', width: '100%'}}>
            <Row>
              <ul className='details-li-ul'>
                <li className='details-li-hover'><span className='span-colors'>当前位置: <a onClick={this.position.bind(this)}>{this.state.dataRight.positionO}</a> / {this.state.dataRight.positionT}</span></li>
              </ul>
            </Row>
            <Row>
              <Col span={24}>
                <div className='details-right-div'>
                  <p className='details-right-title'>{this.state.infoData ? this.state.infoData.info_title : '1'}</p>
                  <span className='details-right-time'>发布时间:{this.state.infoData ? moment(this.state.infoData.info_time).format('YYYY-MM-DD') : '时间'}</span>
                  <div className='details-right-div-div'>
                    {this.state.infoData ? this.state.infoData.info_desc : '文章'}
                  </div>
                  {this.state.infoData
                    ? <div style={{width: '700px', alignContent: 'right'}}>
                      <span>下载附件 :
                        <a src={this.state.infoData.info_attachment}>{this.state.dataRight.a}</a>
                      </span>
                    </div> : ''}
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
                    return index < 4 ? <li key={index} style={{lineHeight: '25px'}}><img src={this.state.imgUl} style={{width: '6px', marginRight: '8px'}} alt='' /> {item.news_title}</li> : null
                  })}
                </ul>
              </div>
            </Row></div>
        </div>
        <div id='left-container'>
          <div className='center-public-info'>
            <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '98%' }}>
              <ul className='ul-margin super'>
                {(!_.isEmpty(this.state.infoDatas)) && this.state.infoDatas.list.map((item, index) => {
                  return <li className='li-hover' key={index} ><img src={_ul} /><span className='span-color'>{item.info_title}</span></li>
                })}
              </ul>
            </Card>
          </div>
          <div className='bottom-img'>
            <img src={(!_.isEmpty(this.state.infoDatas)) && ajaxUrl.IMG_BASE_URL + this.state.infoDatas.list[0].info_picture} style={{width: '98%', marginTop: '10px', height: '120px'}} alt='' />
          </div>
        </div>
      </div>
    )
  }
}

export default InformationDet
