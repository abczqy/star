/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 游客的信息公开
 */
import React from 'react'
import {Row, Col, Card, Pagination, Cascader} from 'antd'
import img from '../../assets/images/WeChat.png'
import hand from '../../assets/images/hand.png'
import people from '../../assets/images/u1632.png'
import './NewsList.scss'
import _ul from '../../assets/images/_ul.png'
import _ from 'lodash'
import webStorage from 'webStorage'
import moment from 'moment'
import {processStr} from 'utils'
import ajaxUrl from 'config'
import {information} from 'services/software-manage'
class Information extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewHeight: 500,
      imgO: img,
      imgT: img,
      imgH: hand,
      imgP: people,
      pageNum: 1,
      pageSize: 5,
      selete: false, // 选择地区
      dataP: false, // 公告和分享的list
      imgG: '', // 公告图片
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
  getList=() => {
    let value = {
      pageNum: this.state.pageNum || 1,
      pageSize: this.state.pageSize || 10,
      province: this.state.selete ? '' : this.state.selete[0],
      city: this.state.selete ? '' : this.state.selete[1],
      county: this.state.selete ? '' : this.state.selete[2]
    }
    console.log('游客的信息公开获取数据传的参数', value)
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
  // 标题的点击事件
  title =() => {
    console.log('右边的标题')
  }

  // 分页页码改变
  ptChange=(page, pageSize) => {
    console.log('页码改变', page, pageSize)
    this.setState({
      pageNum: page
    }, () => {
      this.getList()
    })
  }
  // 每页展示数量改变
  stChange=(current, size) => {
    console.log('每页的数量改变', current, size)
    this.setState({
      pageSize: size
    }, () => {
      this.getList()
    })
  }
  // 下拉分级改变
  onChangeF =(value) => {
    console.log(value)
    this.setState({
      selete: value
    }, () => {
      this.getList()
    })
  }
  // a连接的页面跳转方法呦
  handleTabChange (e) {
    console.log('123123213123213213', e.target)
    this.props.history.push({
      pathname: '/unlogged/informationDet',
      search: e.target.text.split(' ')[0]
    })
  }
  // a标签的跳转方法哦~
  handleTabChanges (e) {
    console.log('123123123123123213', e.target.text)
    this.props.history.push({
      pathname: '/unlogged/informationDet',
      search: e.target.text.split(' ')[0]
    })
  }
  // 获取高度
  getHeight=() => {
    if (this.state.webStorage) {
      this.setState({
        viewHeight: window.innerHeight - 223,
        viewHeights: window.innerHeight - 240
      })
    } else {
      this.setState({
        viewHeight: window.innerHeight - 193,
        viewHeights: window.innerHeight - 220
      })
    }
  }
  // 更多的点击事件
  more=() => {
    this.props.history.push({
      pathname: '/unlogged/information'
    })
  }
  render () {
    return (
      <div className='news-list-container' style={{minHeight: this.state.viewHeight}}>
        <div id='right-container'>
          <ul className='ul-top' style={{width: '100%', padding: '0', backgroundColor: '#fff', minHeight: this.state.viewHeights}}>
            <li style={{listStyle: 'none', width: '100%', paddingTop: '20px', paddingLeft: '30px', backgroundColor: '#fff'}}>
              <Col span={18}>
                <span className='information-fabu'>
                  发布机构 : <Cascader placeholder='请选择' options={this.state.options} onChange={(value) => { this.onChangeF(value) }} />
                </span>
              </Col>
              <Col span={6} style={{marginTop: '8px'}}>
                <span className='information-dianji' style={{fontSize: '12px'}}>
                  <img src={this.state.imgH} style={{width: '20px'}} alt='' />点击蓝色字段，可切换级别筛选
                </span>
              </Col>
            </li>
            {(!_.isEmpty(this.state.infoData)) && this.state.infoData.list.map((item, index) => {
              return <li style={{listStyle: 'none', width: '100%', height: '140px', paddingTop: '0px', paddingLeft: '30px', backgroundColor: '#fff'}} key={index}>
                <Col span={24}>
                  <Row>
                    <Col span={17}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.info_id}</span> {item.info_title ? item.info_title : '预备' }</a></p></Col>{/* this.state.infoData.info_title */}
                    <Col span={4}><span className='span-top'>发布者 : {item.info_per}</span></Col>
                    <Col span={3}><span className='span-top'>{moment(item.info_time).format('YYYY-MM-DD')}</span></Col>
                  </Row>
                  <Row>
                    <Col span={23}>
                      <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{processStr(item.info_desc, 150)}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={23}>
                      <div className='information-line' />
                    </Col>
                  </Row>
                </Col>
              </li>
            })}
            <li style={{listStyle: 'none', width: '100%', height: '140px', paddingTop: '0px', paddingLeft: '30px', backgroundColor: '#fff'}}>
              <Row style={{marginBottom: '10px'}}>
                <Col span={12} />
                <Col >
                  {this.state.infoData.total >= 5
                    ? <Pagination
                      current={this.state.pageNum}
                      defaultPageSize={5}
                      pageSizeOptions={['5']}
                      total={this.state.infoData.total}// {this.state.newData.total}
                      showSizeChanger
                      showQuickJumper
                      onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                      // onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                      // pageSizeOptions={5}
                    /> : null}</Col>
              </Row>
            </li>
          </ul>
        </div>
        <div id='left-container'>
          <div className='top-img' >
            <img src={(!_.isEmpty(this.state.infoDatas)) && ajaxUrl.IMG_BASE_URL + this.state.infoDatas.list[0].info_picture} style={{width: '98%', height: '120px'}} alt='' />
          </div>
          <div className='center-public-info'>
            <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '98%' }}>
              <ul className='ul-margin super1'>
                {this.state.infoData && this.state.infoData.list.map((item, index) => {
                  return index < 12 ? <li className='li-hover' key={index} ><img src={_ul} /><a onClick={this.handleTabChanges.bind(this)} className='span-color'><span style={{display: 'none'}}>{item.info_id}</span> {item.info_title}</a></li> : ''
                })}
              </ul>
            </Card>
          </div>
          <div className='bottom-img'>
            <img src={(!_.isEmpty(this.state.infoDatas)) && ajaxUrl.IMG_BASE_URL + this.state.infoDatas.list[1].info_picture} style={{width: '98%', marginTop: '10px', height: '120px'}} alt='' />
          </div>
        </div>

      </div>
    )
  }
}

export default Information
