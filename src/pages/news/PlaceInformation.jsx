/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 教育局的信息公开列表
 */
import React from 'react'
import {Row, Col, Card, Pagination} from 'antd'
import img from '../../assets/images/WeChat.png'
import release from '../../assets/images/u111111.png'
import hand from '../../assets/images/hand.png'
import people from '../../assets/images/u1632.png'
import './NewsList.scss'
import _ul from '../../assets/images/_ul.png'
import webStorage from 'webStorage'
import {processStr} from 'utils'
import {information} from 'services/software-manage'

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
      pageSize: 10,
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
      pageSize: this.state.pageSize || 10,
      province: '',
      city: '',
      county: ''
    }
    console.log('教育局的信息公开列表获取数据传的参数', value)
    information(value, (response) => {
      this.setState({
        infoData: response.data
      }, () => {
        console.log('this.state.infoData', this.state.infoData)
        console.log('this.state.infoData.list', this.state.infoData.list)
      })
    })

    let values = {
      pageNum: 1,
      pageSize: 100,
      province: '',
      city: '',
      county: ''
    }
    information(values, (response) => {
      this.setState({
        infoDatas: response.data
      })
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
    console.log('更多')
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
    // if (link === this.props.location.pathname) {
    //   window.location.reload()
    // }
    this.props.history.push({
      pathname: '/operate-manage-home/informationEd'
      // search: e.target.text.split(' ')[0]
    }
    )
  }
  // 跳到（信息公开列表）// 政策发布
  handleTabChanges (e) {
    this.props.history.push({
      pathname: '/operate-manage-home/informationDetEd',
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
   if (this.state.webStorage) {
     this.setState({
       viewHeight: window.innerHeight - 230
     })
   } else {
     this.setState({
       viewHeight: window.innerHeight - 193
     })
   }
 }
 render () {
   return <div style={{margin: 'auto', width: '90%', marginLeft: '10%', height: this.state.viewHeight}}>
     <div >
       <Row>
         <Col span={5} style={{width: '18%'}}>
           <Row><div className='left-downer'><a onClick={this.handleTabChange.bind(this)}><img src={this.state.imgO} style={{width: '95%', height: '120px'}} alt='' /></a></div></Row>
           <Row><div className='left-downer'>
             <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '95%' }}>
               <ul>
                 {this.state.infoData && this.state.infoData.list.map((item, index) => {
                   return index < 12 ? <li className='li-hover' key={index} ><img src={_ul} /><span className='span-color'>{item.info_title}</span></li> : ''
                 })}
               </ul>
             </Card></div>
           </Row>
           <Row><img src={this.state.imgT} style={{width: '95%', marginTop: '10px', height: '120px'}} alt='' /></Row>
         </Col>
         <Col span={16} style={{width: '68%', minHeight: '820px'}}>
           <ul className='ul-top' style={{width: '100%', marginTop: '10px', height: `${this.state.heights}`, backgroundColor: '#fff'}}>
             {this.state.infoData && this.state.infoData.list.map((item, index) => {
               return <li style={{listStyle: 'none', paddingTop: '16px', paddingLeft: '30px', width: '100%', height: '135px', backgroundColor: '#fff'}} key={index}>
                 <Col span={24}>
                   <Row>
                     <Col span={17}><p className='p'><a onClick={this.handleTabChanges.bind(this)}><span style={{display: 'none'}}>{item.info_id}</span> {item.info_title ? item.info_title : '预备' }</a></p></Col>
                   </Row>
                   <Row>
                     <Col span={23}>
                       <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{processStr(item.info_desc, 150)}</p>
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
                     total={this.state.infoData.total}
                     showSizeChanger
                     showQuickJumper
                     onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                     onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                   /></Col>
               </Row>
             </li>
           </ul>
         </Col>
       </Row>
     </div>
   </div>
 }
}

export default Information
