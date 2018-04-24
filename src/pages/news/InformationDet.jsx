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
import axios from 'axios'
import ajaxUrl from 'config'
import shareContent from '../../utils/shareContent'
import BottomHeader from '../../components/common/BottomHeader'

class InformationDet extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
      }
    }
  }
  getList=() => {
    console.log('获取数据')
    let a = window.location.href.split('?')
    let value = {
      info_id: a[a.length - 1]
    }
    console.log('游客的信息公开详情传递参数', value)
    axios.get(ajaxUrl.informationDet, {
      value
    }).then(item => {
      this.setState({
        infoData: item.data
      }, () => {
        console.log('this.state.infoData', this.state.infoData)
      })
    }).catch(err => {
      console.log(err)
    })

    axios.get(ajaxUrl.detList).then(item => {
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
  render () {
    return <div>
      <div style={{marginLeft: '15%', marginBottom: '20px'}}>
        <Row>
          <Col span={5} style={{width: '450px'}}>
            <div className='left-downer'>
              <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: 280 }}>
                <ul className='ul-margin'>
                  {(!_.isEmpty(this.state.dataP)) && this.state.dataP.map((item, index) => {
                    return <li className='li-hover' key={index} ><img src={_ul} /><span className='span-color'>{item}</span></li>
                  })}
                </ul>
              </Card>
            </div>
            <img src={this.state.imgT} style={{width: '280px', marginTop: '10px'}} alt='' />
          </Col>
          <Col span={15}>
            <div style={{backgroundColor: '#fff', width: '940px'}}>
              <Row>
                <ul className='details-li-ul'>
                  <li className='details-li-hover'>
                    <span className='span-colors'>当前位置: <a onClick={this.position.bind(this)}>{this.state.dataRight.positionO}</a> / {this.state.dataRight.positionT}</span>
                  </li>
                </ul>
              </Row>
              <Row>
                <Col span={14}>
                  <div className='details-right-div'>
                    <p className='details-right-title'>{this.state.infoData ? this.state.infoData.info_title : '1' }</p>
                    <span className='details-right-time'>发布时间:{this.state.infoData ? this.state.infoData.info_time : '1' }</span>
                    <div className='details-right-div-div'>
                      <div style={{marginBottom: '30px'}}>
                        {this.state.infoData ? this.state.infoData.info_desc : '1' }
                      </div>
                      <div style={{width: '700px', alignContent: 'right'}}>
                        <span>下载附件 : <a src='javascript:0;'>{this.state.dataRight.a}</a></span>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{marginBottom: '18px', marginLeft: '110px'}}>
                <div style={{width: '200px', height: '30px'}}>
                  <span style={{float: 'left', height: '28px', lineHeight: '28px'}}>分享:</span>
                  <span title='分享到QQ空间' className='share-Qzone' onClick={(e) => { shareContent.shareToQzone(e) }} />
                  <Tooltip overlayClassName='custom-share-container' trigger='click' placement='top' title={this.getQRCode()} okText='' cancelText=''>
                    <span title='分享到微信朋友圈' className='share-WeChat jiathis_button_weixin' />
                  </Tooltip>
                  <span title='分享到新浪微博' className='share-SinaWB' onClick={(e) => { shareContent.shareToSinaWB(e) }} />
                </div>
                <div>
                  <img src={this.state.imgZui} style={{width: '739px'}} alt='' />
                </div>
                <div>
                  <ul className='details-li-ul-down'>
                    {(!_.isEmpty(this.state.dataP)) && this.state.dataP.map((item, index) => {
                      return <li key={index} style={{lineHeight: '25px'}}><img src={this.state.imgUl} style={{width: '6px'}} alt='' /> {item}</li>
                    })}
                  </ul>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <BottomHeader />
    </div>
  }
}

export default InformationDet
