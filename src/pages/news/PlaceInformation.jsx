/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 教育局的信息公开列表
 */
import React from 'react'
import {Row, Col, Card, Pagination, message} from 'antd'
import img from '../../assets/images/WeChat.png'
import release from '../../assets/images/u111111.png'
import hand from '../../assets/images/hand.png'
import people from '../../assets/images/u1632.png'
import './NewsList.scss'
import _ul from '../../assets/images/_ul.png'
import webStorage from 'webStorage'
import {processStr} from 'utils'
// import ajaxUrl from 'config'
import {information} from 'services/software-manage'
// import _ from 'lodash'
import { withRouter } from 'react-router'

class Information extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewHeight: 500,
      imgO: release,
      imgT: img,
      imgH: hand,
      imgP: people,
      pageNum: 1,
      pageSize: 5,
      dataP: false, // 公告和分享的list
      img: '', // 公告图片
      options: [
        {
          value: '省级',
          label: '省级'
        }, {
          value: '市级',
          label: '市级',
          children: [{
            value: '福州市',
            label: '福州市'
          }]
        }, {
          value: '区级',
          label: '区级',
          children: [{
            value: '福州市',
            label: '福州市',
            children: [{
              value: '县级',
              label: '县级'
            }]
          }]
        }
      ],
      infoData: false,
      height: '',
      infoDatas: false
    }
  }
  getList=() => {
    console.log('获取数据')
    let value = {
      pageNum: this.state.pageNum || 1,
      pageSize: this.state.pageSize || 10
    }
    console.log('教育局的信息公开列表获取数据传的参数', value)
    information(value, 1, (response) => {
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
      pageSize: 100,
      type: 0
    }
    information(values, 1, (response) => {
      if (response.data.code === 200) {
        this.setState({
          infoDatas: response.data.data
        })
      } else {
        message.warn(response.data.msg)
      }
    })
  }
  componentWillMount () {
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
  // 标题的点击事件
  title =() => {
    console.log('右边的标题')
  }
  // 更多的点击事件
  more=() => {
    if (this.props.location.pathname !== '/home/public') {
      this.props.history.push({
        pathname: '/home/public'
      })
    } else {
      window.location.reload()
    }
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
  // 跳到信息公开编辑
  handleTabChange (e) {
    this.props.history.push({
      pathname: '/home/informationEd'
      // search: e.target.text.split(' ')[0]
    }
    )
  }
  // 跳到（信息公开列表）// 政策发布
  handleTabChanges (e) {
    console.log(e.target.text)
    this.props.history.push({
      pathname: '/home/informationDetEd',
      search: e.target.text.split(' ')[0]
    }
    )
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
  // 获取高度
 getHeight=() => {
   this.setState({
     viewHeight: window.innerHeight - 214,
     viewHeights: window.innerHeight - 230
   })
 }
 render () {
   return <div style={{margin: 'auto', width: '90%', marginLeft: '12%', minHeight: this.state.viewHeight}}>
     <div >
       <Row>
         <Col span={5} style={{width: '18%'}}>
           <Row><div className='left-downer'><a onClick={this.handleTabChange.bind(this)}><img src={this.state.imgO} style={{width: '95%', height: '120px'}} alt='' /></a></div></Row>
           <Row><div className='left-downer'>
             <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '95%' }}>
               <ul className='ul-margin super4'>
                 {this.state.infoDatas && this.state.infoDatas.info.map((item, index) => {
                   return index < 12 ? <li className='li-hover' key={index} ><img src={_ul} /><a onClick={this.handleTabChanges.bind(this)} className='span-color'><span style={{display: 'none'}}>{item.id}</span> {item.contentTitle}</a></li> : ''
                 })}
               </ul>
             </Card></div>
           </Row>
           {/* <Row><img src={this.state.infoDatas ? ajaxUrl.IMG_BASE_URL + this.state.infoDatas.list[1].info_picture : ''} style={{width: '95%', marginTop: '10px', height: '120px'}} alt='' /></Row> */}
         </Col>
         <Col span={16} style={{width: '68%'}}>
           <ul className='ul-top' style={{width: '100%', marginTop: '10px', minHeight: this.state.viewHeights, backgroundColor: '#fff'}}>
             {this.state.infoData && this.state.infoData.info.map((item, index) => {
               return <li style={{listStyle: 'none', paddingTop: '16px', paddingLeft: '30px', width: '100%', height: '135px', backgroundColor: '#fff'}} key={index}>
                 <Col span={24}>
                   <Row>
                     <Col span={17}><p className='p'><a onClick={this.handleTabChanges.bind(this)}><span style={{display: 'none'}}>{item.id}</span> {item.contentTitle ? item.contentTitle : '预备' }</a></p></Col>
                   </Row>
                   <Row>
                     <Col span={23}>
                       <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{processStr(item.content, 150)}</p>
                     </Col>
                   </Row>
                   <Row>
                     <div className='place-line' />
                   </Row>
                 </Col>
               </li>
             })}
             <li style={{listStyle: 'none', paddingTop: '16px', paddingLeft: '30px', width: '100%', height: '135px', backgroundColor: '#fff'}}>
               <Row>
                 <Col span={12} />
                 <Col >
                   <Pagination
                     current={this.state.pageNum}
                     total={this.state.infoData.total}
                     showSizeChanger
                     defaultPageSize={5}
                     pageSizeOptions={['5']}
                     showQuickJumper
                     hideOnSinglePage
                     onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                     //  onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                   />
                 </Col>
               </Row>
             </li>
           </ul>
         </Col>
       </Row>
     </div>
   </div>
 }
}

export default withRouter(Information)
