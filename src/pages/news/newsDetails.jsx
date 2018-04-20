/**
 * 无身份区分新闻列表详情
 */
import React from 'react'
import {Row, Col, Card} from 'antd'
import img from '../../assets/images/hear.jpg'
import './newsList.scss'
import ul from '../../assets/images/u1427.png'
import zui from '../../assets/images/u1417.png'
import fen from '../../assets/images/u1415.png'
import _ul from '../../assets/images/_ul.png'
import shareContent from '../../utils/shareContent'

class NewsDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        imgT: img,
        imgUl: ul,
        imgFen: fen,
        imgZui: zui,
        dataP: [
          '民办普通高校等学校的设立发123...',
          '民办高等学校办学地址变更发123...',
          '民办学校以捐赠者姓名或者名123...',
          '本市进一步推进高中阶段学校123...',
          '民办学校以捐赠者姓名或者名123...']
      },
      dataRight: {
        positionO: '教育新闻',
        positionT: '国内新闻',
        title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
        time: '2018-03-23',
        paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工作的通知》，明确2018年继续实施重点高校招收农村和贫困地区学生的国家专项计划、地方专项计划和高校专项计划，并对相关工作进行了全面部署。      《通知》要求，严格报考条件和资格审核。国家专项计划定向招收贫困地区学生，实施区域为集中连片特殊困难县、国家级扶贫开发重点县以及新疆南疆四地州，国家专项计划实施区域的贫困县脱贫后2018年仍可继续享受国家专项计划政策。地方专项计划定向招收各省（区、市）实施区域的农村学生，实施区域和具体报考条件由各省（区、市）根据本地实际情况确定，对本省（区、市）民族自治县实现全覆盖。高校专项计划定向招收边远、贫困、民族等地区县（含县级市）以下高中勤奋好学、成绩优良的农村学生，实施区域由有关省（区、市）确定。要求各地严格执行专项计划报考条件，完善资格审核办法，进一步健全省、市、县三级教育、公安等多部门联合审核工作机制，确保考生户籍、学籍真实准确。要求有关高校认真开展考生资格核查，逐人核查考生相关材料。《通知》强调，加大宣传服务和考生帮扶。要求各地和有关高校加大招生宣传力度，深入贫困地区和中学采取多种形式广泛开展专项计划政策宣传，提高宣传实效。创新考生服务举措，为考生提供更加便捷的报考服务。加大对贫困家庭学生的政策倾斜，达到有关高校投档要求的建档立卡贫困家庭考生，同等条件下优先录取。通过加大对家庭经济困难学生的经济资助等措施，帮助专项生顺利完成学业。《通知》要求，严格招生管理和违规查处。要求各地和有关高校完善专项计划招生办法，优化录取工作方案，提高考生录取机会。加强工作衔接，做好考生志愿填报、录取等工作。认真落实招生信息十公开要求，主动接受考生、学校和社会监督。加大违规查处力度，对专项计划招生过程中的违法违规行为，依法依规严肃查处。对提供虚假报名材料的考生，认定为在国家教育考试中作弊，取消其专项计划资格和当年高考报名资格。（摘自：教育部网站）'
      },
      newsData: {}
    }
  }

  getList=() => {
    console.log('获取数据')
    let a = window.location.href.split('?')
    let value = {
      news_id: a[a.length - 1]
    }
    console.log(value)
    // ajax.yidui(value,item=>{
    //   this.setState({
    //     newsData: item
    //   })
    // })
  }
  componentWillMount () {
    this.getList()
  }
  // 更多的点击事件
  more=() => {
    console.log('更多')
  }
  // 点击当前位置(教育新闻)
  position=() => {
    console.log('当前页面位置跳转')
  }
  render () {
    return <div>
      <div style={{marginLeft: '15%', marginBottom: '20px'}}>
        <Row>
          <div style={{width: '1900px'}}>
            <Col span={5}>
              <Row><div className='left-downer'>
                <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: 280 }}>
                  <ul className='ul-margin'>
                    {this.state.data.dataP.map((item, index) => {
                      return <li className='li-hover' key={index} ><img src={_ul} /><span className='span-color'>{item}</span></li>
                    })}
                  </ul>
                </Card></div>
              </Row>
              <Row><img src={this.state.data.imgT} style={{width: '280px'}} alt='' /></Row>
            </Col>
          </div>
          <div style={{width: '1400px'}}>
            <Col span={15}>
              <Row>
                <ul className='details-li-ul'>
                  <li className='details-li-hover'><span className='span-colors'>当前位置: <a onClick={this.position}>{this.state.dataRight.positionO}</a> / {this.state.dataRight.positionT}</span></li>
                </ul>
              </Row>
              <Row>
                <Col span={14}>
                  <div className='details-right-div'>
                    <p className='details-right-title'>{this.state.dataRight.title}</p>{/* this.state.newsData.news_title */}
                    <span className='details-right-time'>发布时间:{this.state.dataRight.time}</span>{/* this.state.newsData.news_time */}
                    <div className='details-right-div-div'>
                      {this.state.dataRight.paragraph}{/* this.state.newsData.news_desc */}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{marginBottom: '18px'}}>
                <Col span={24}>
                  <div style={{marginBottom: '18px'}}>
                    <span style={{float: 'left', height: '28px', lineHeight: '28px'}}>分享:</span>
                    <span title='分享到QQ空间' className='share-Qzone' onClick={(e) => { shareContent.shareToQzone(e) }} />
                    <span title='分享到微信朋友圈' className='share-WeChat' onClick={(e) => { shareContent.shareToWeChat(e) }} />
                    <span title='分享到新浪微博' className='share-SinaWB' onClick={(e) => { shareContent.shareToSinaWB(e) }} />
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
        </Row>
        <div style={{marginLeft: '6%'}}>
          <Row>
            <Col span={4} />
            <Col>
              <img src={this.state.data.imgZui} style={{width: '739px'}} alt='' />
            </Col>
          </Row>
          <Row>
            <Col span={4} />
            <Col span={12}>
              <ul className='details-li-ul-down'>
                {this.state.data.dataP.map((item, index) => {
                  return <li key={index} style={{lineHeight: '25px'}}><img src={this.state.data.imgUl} style={{width: '6px'}} alt='' /> {item}</li>
                })}
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  }
}

export default NewsDetails
