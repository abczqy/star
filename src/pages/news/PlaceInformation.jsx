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
import _ from 'lodash'
import axios from 'axios'
import ajaxUrl from 'config'

class Information extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imgO: release,
      imgT: img,
      imgH: hand,
      imgP: people,
      pageNum: 1,
      pageSize: 10,
      dataP: [], // 公告和分享的list
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
      infoData: false
    }
  }
  getList=() => {
    console.log('获取数据')
    // let value = {
    //   pageNum: this.state.pageNum || 1,
    //   pageSize: this.state.pageSize || 10
    // }
    // console.log('教育局的信息公开列表获取数据传的参数', value)
    axios.post(ajaxUrl.PlaceInformation
    ).then(item => {
      this.setState({
        infoData: item
      }, () => {
        console.log('this.state.infoData', this.state.infoData)
        console.log('this.state.infoData.list', this.state.infoData.list)
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
  // 获取字符串
  processStr=(str, n) => {
    let l = str.length
    if (l <= n) { return str } else {
      return str.slice(0, n) + '...'
    }
  }
  render () {
    const length = this.state.infoData ? this.state.infoData.data.length : 1
    console.log('total', length)
    return <div style={{margin: 'auto', width: '100%', marginLeft: '6%'}}>
      <div >
        <Row>
          <Col span={5} style={{width: '18%'}}>
            <Row><div className='left-downer'><a onClick={this.handleTabChange.bind(this)}><img src={this.state.imgO} style={{width: '95%'}} alt='' /></a></div></Row>
            <Row><div className='left-downer'>
              <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '95%' }}>
                <ul className='ul-margin'>
                  {(!_.isEmpty(this.state.dataP)) && this.state.dataP.map((item, index) => {
                    return <li className='li-hover' key={index} ><img src={_ul} /><span className='span-color'>{item}</span></li>
                  })}
                </ul>
              </Card></div>
            </Row>
            <Row><img src={this.state.imgT} style={{width: '95%', marginTop: '10px', height: '120px'}} alt='' /></Row>
          </Col>
          <Col span={16} style={{width: '68%'}}>
            <ul className='ul-top' style={{width: '100%', marginTop: '10px', height: '730px', backgroundColor: '#fff'}}>
              {(!_.isEmpty(this.state.infoData)) && this.state.infoData.data.map((item, index) => {
                return <li style={{listStyle: 'none', paddingTop: '16px', paddingLeft: '30px', width: '100%', height: '135px', backgroundColor: '#fff'}} key={index}>
                  <Col span={24}>
                    <Row>
                      <Col span={17}><p className='p'><a onClick={this.handleTabChanges.bind(this)}><span style={{display: 'none'}}>{item.info_id}</span> {item.info_title ? item.info_title : '预备' }</a></p></Col>
                    </Row>
                    <Row>
                      <Col span={23}>
                        <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{this.processStr(item.info_desc, 150)}</p>
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
                      total={length}
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
