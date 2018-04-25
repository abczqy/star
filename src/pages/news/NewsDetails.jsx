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
import axios from 'axios'
import ajaxUrl from 'config'
// import _ from 'lodash'

class NewsDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
      }
    }
  }
  componentDidMount () {
    this.getList()
  }
  getList=() => {
    console.log('获取数据')
    let a = window.location.href.split('?')
    let value = {
      news_id: a[a.length - 1]
    }
    console.log(value)
    axios.post(ajaxUrl.newsListDet, {
      value
    }).then(item => {
      this.setState({
        newData: item.data
      }, () => {
        console.log('获取数据存在state', this.state.newData)
      })
    }).catch(err => {
      console.log(err)
    })

    axios.get(ajaxUrl.detList).then(item => {
      console.log(item)
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
  // 更多的点击事件
  more=() => {
    console.log('更多')
  }
  // 点击当前位置(教育新闻)
  position (e) {
    this.props.history.push({
      pathname: '/unlogged/newsList'
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

  render () {
    return (
      <div className='news-list-container'>
        <div id='right-container'>
          <div style={{backgroundColor: '#fff', width: '100%', height: '730px'}}>
            <Row>
              <ul className='details-li-ul'>
                <li className='details-li-hover'><span className='span-colors'>当前位置: <a onClick={this.position.bind(this)}>{this.state.dataRight.positionO}</a> / {this.state.dataRight.positionT}</span></li>
              </ul>
            </Row>
            <Row>
              <Col span={24}>
                <div className='details-right-div'>
                  <p className='details-right-title'>{this.state.newData ? this.state.newData.news_title : '1'}</p>
                  <span className='details-right-time'>发布时间:{this.state.newData ? this.state.newData.news_time : '时间'}</span>
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
                  {(!_.isEmpty(this.state.dataP)) && this.state.dataP.map((item, index) => {
                    return index < 4 ? <li key={index} style={{lineHeight: '25px'}}><img src={this.state.imgUl} style={{width: '6px', marginRight: '8px'}} alt='' /> {item}</li> : null
                  })}
                </ul>
              </div>
            </Row></div>
        </div>
        <div id='left-container'>
          <div className='center-public-info'>
            <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '98%' }}>
              <ul>
                {(!_.isEmpty(this.state.dataP)) && this.state.dataP.map((item, index) => {
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

export default NewsDetails
