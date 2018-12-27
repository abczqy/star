/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 教育局的信息公开详情
 */
import React from 'react'
import {Row, Col, Card, Tooltip, message} from 'antd'
import img from '../../assets/images/WeChat.png'
import './NewsList.scss'
import ul from '../../assets/images/u1427.png'
import _ul from '../../assets/images/_ul.png'
import zui from '../../assets/images/u1417.png'
import fen from '../../assets/images/u1415.png'
import _ from 'lodash'
import shareContent from '../../utils/shareContent'
import { withRouter } from 'react-router'
import webStorage from 'webStorage'
import moment from 'moment'
import {informationDet, newsList, information} from 'services/software-manage'
import ajaxUrl from 'config'

class InformationDetEd extends React.Component {
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
        a: '政策法规新要求.doc',
        positionO: '信息公开',
        positionT: '国内新闻',
        title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
        time: '2018-03-23',
        paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。      《通知》要求，严格报考条件和资格审核。国家专项计划定向招收贫困地区学生，实施区域为集中连片特殊困难县、国家级扶贫开发重点县以及新疆南疆四地州，国家专项计划实施区域的贫困县脱贫后2018年仍可继续享受国家专项计划政策。地方专项计划定向招收各省（区、市）实施区域的农村学生，实施区域和具体报考条件由各省（区、市）根据本地实际情况确定，对本省（区、市）民族自治县实现全覆盖。高校专项计划定向招收边远、贫困、民族等地区县（含县级市）以下高中勤奋好学、成绩优良的农村学生，实施区域由有关省（区、市）确定。要求各地严格执行专项计划报考条件，完善资格审核办法，进一步健全省、市、县三级教育、公安等多部门联合审核工作机制，确保考生户籍、学籍真实准确。要求有关高校认真开展考生资格核查，逐人核查考生相关材料。《通知》强调，加大宣传服务和考生帮扶。要求各地和有关高校加大招生宣传力度，深入贫困地区和中学采取多种形式广泛开展专项计划政策宣传，提高宣传实效。创新考生服务举措，为考生提供更加便捷的报考服务。加大对贫困家庭学生的政策倾斜，达到有关高校投档要求的建档立卡贫困家庭考生，同等条件下优先录取。通过加大对家庭经济困难学生的经济资助等措施，帮助专项生顺利完成学业。《通知》要求，严格招生管理和违规查处。要求各地和有关高校完善专项计划招生办法，优化录取工作方案，提高考生录取机会。加强工作衔接，做好考生志愿填报、录取等工作。认真落实招生信息十公开要求，主动接受考生、学校和社会监督。加大违规查处力度，对专项计划招生过程中的违法违规行为，依法依规严肃查处。对提供虚假报名材料的考生，认定为在国家教育考试中作弊，取消其专项计划资格和当年高考报名资格。（摘自：教育部网站）'
      },
      infoData: null,
      newDatas: []
    }
  }
  getList=() => {
    console.log('获取数据')
  }
  componentWillMount () {
    this.getHeight()
    this.getList()
    let a = window.location.href.split('?')
    console.log(a)
    let id = Number(a[a.length - 1])
    informationDet({}, id, (response) => {
      if (response.data.code === 200) {
        this.setState({
          infoData: response.data.data
        })
      } else {
        message.warn(response.data.msg)
      }
    })

    let values = {
      pageNum: 1,
      pageSize: 100
    }
    newsList(values, 1, (response) => {
      if (response.data.code === 200) {
        this.setState({
          newDatas: response.data.data
        })
      } else {
        message.warn(response.data.msg)
      }
    })

    let valuez = {
      pageNum: 1,
      pageSize: 100,
      type: 0
    }
    information(valuez, 1, (response) => {
      if (response.data.code === 200) {
        this.setState({
          infoDatas: response.data.data
        })
      } else {
        message.warn(response.data.msg)
      }
    })
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
      let id = Number(a[a.length - 1])
      informationDet({}, id, (response) => {
        if (response.data.code === 200) {
          this.setState({
            infoData: response.data.data
          })
        } else {
          message.warn(response.data.msg)
        }
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
      pathname: '/home/public'
    })
  }
  // 点击当前位置(教育新闻)
  position (e) {
    this.props.history.push({
      pathname: '/home/public'
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
       viewHeights: window.innerHeight - 240
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
   this.props.history.push({
     pathname: '/home/informationDetEd',
     search: e.target.text.split(' ')[0]
   })
 }
 // a标签的跳转方法哦~
 handleTabChangess (e) {
   this.props.history.push({
     pathname: '/home/NewDetailsEd',
     search: e.target.text.split(' ')[0]
   })
 }
 render () {
   return <div style={{margin: 'auto', width: '90%', marginLeft: '12%', minHeight: this.state.viewHeight}}>
     <div >
       <Col span={5} style={{width: '18%'}}>
         <div className='left-downer'>
           <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '95%' }}>
             <ul className='ul-margin super6'>
               {(!_.isEmpty(this.state.infoDatas)) && this.state.infoDatas.info.map((item, index) => {
                 return index < 12 ? <li className='li-hover' key={index} ><img src={_ul} /><a onClick={this.handleTabChanges.bind(this)} className='span-color'><span style={{display: 'none'}}>{item.info_id}</span> {item.contentTitle}</a></li> : ''
               })}
             </ul>
           </Card>
         </div>
         {/* <img src={this.state.infoDatas ? ajaxUrl.IMG_BASE_URL + this.state.infoDatas.list[0].info_picture : ''} style={{width: '95%', marginTop: '10px', height: '120px'}} alt='' /> */}
       </Col>
       <Col span={15} style={{width: '68%', marginTop: '10px'}}>
         <div style={{backgroundColor: '#fff', width: '100%', minHeight: this.state.viewHeights}}>
           <Row>
             <ul className='details-li-ul'>
               <li className='details-li-hover'>
                 <span className='span-colors'>当前位置: <a onClick={this.position.bind(this)}>{this.state.dataRight.positionO}</a> / {this.state.dataRight.positionT}</span>
               </li>
             </ul>
           </Row>
           <Row>
             <Col span={24}>
               <div className='details-right-div'>
                 <p className='details-right-title'>{this.state.infoData ? this.state.infoData.contentTitle : '1' }</p>
                 <span className='details-right-time'>发布时间:{this.state.infoData ? moment(this.state.infoData.updateTime).format('YYYY-MM-DD') : '1' }</span>
                 <div className='details-right-div-div'>
                   <div style={{marginBottom: '30px'}}>
                     {this.state.infoData ? this.state.infoData.content : '1' }
                   </div>
                   {this.state.infoData
                     ? <div style={{width: '700px', alignContent: 'right'}}>
                       <span>下载附件 :
                         <a href={ajaxUrl.IMG_BASE_URL + this.state.infoData.info_attachment}>{this.state.dataRight.a}</a>
                       </span>
                     </div> : ''}
                 </div>
               </div>
             </Col>
           </Row>
           <Row style={{marginBottom: '18px', marginLeft: '15%'}}>
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
             <div>
               <ul className='details-li-ul-down'>
                 {(!_.isEmpty(this.state.newDatas)) && this.state.newDatas.info.map((item, index) => {
                   return index < 4 ? <li key={index} style={{lineHeight: '25px'}}><img src={this.state.imgUl} style={{width: '6px', marginRight: '8px'}} alt='' /><a onClick={this.handleTabChangess.bind(this)} className='span-color'><span style={{display: 'none'}}>{item.id}</span> {item.contentTitle}</a></li> : null
                 })}
               </ul>
             </div>
           </Row>
         </div>
       </Col>
     </div>
   </div>
 }
}

export default withRouter(InformationDetEd)
