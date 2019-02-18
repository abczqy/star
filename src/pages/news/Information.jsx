/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 游客的信息公开
 */
import React from 'react'
import {Row, Col, Card, Pagination, message, Icon} from 'antd'
import img from '../../assets/images/WeChat.png'
import hand from '../../assets/images/hand.png'
import people from '../../assets/images/u1632.png'
import './NewsList.scss'
import _ul from '../../assets/images/_ul.png'
import _ from 'lodash'
import webStorage from 'webStorage'
import moment from 'moment'
import {processStr} from 'utils'
// import ajaxUrl from 'config'
import { withRouter } from 'react-router'
import {information} from 'services/software-manage'
import InformationAddress from '../../components/home/information-address/InformationAddress'

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
      grade: {
        province: '福建省',
        city: '福州市',
        region: '鼓楼区'
      },
      infoData: [],
      height: '',
      infoDatas: [],
      visible: false
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
    this.sureAddress()
  }
  componentWillReceiveProps (nextProps) {
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
      pageSize: this.state.pageSize || 10
    }
    information(value, 1, (response) => {
      if (response.data.code === 200) {
        this.setState({
          infoData: response.data.data
        })
      } else {
        message.warn(response.data.msg)
      }
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
      selete: String(value)
    }, () => {
      this.getList()
    })
  }
  // a连接的页面跳转方法呦
  handleTabChange (e) {
    this.props.history.push({
      pathname: '/home/informationDet',
      search: e.target.text.split(' ')[0]
    })
  }
  // a标签的跳转方法哦~
  handleTabChanges (e) {
    this.props.history.push({
      pathname: '/home/informationDet',
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
    if (this.props.location.pathname !== '/home/information') {
      this.props.history.push({
        pathname: '/home/information'
      })
    } else {
      window.location.reload()
    }
  }
  // 地址改变
  changeGrade = (name, value) => {
    if (name === 'province') {
      this.setState({
        grade: {
          province: value
        }
      })
    } else if (name === 'city') {
      this.setState({
        grade: {
          province: this.state.grade.province,
          city: value
        }
      })
    } else {
      this.setState({
        grade: {
          ...this.state.grade,
          [name]: value
        }
      })
    }
  }
  // 确认地址
  sureAddress = () => {
    const { grade } = this.state
    this.setState({
      addressEnd: [grade.province, grade.city, grade.region].join('/'),
      visible: false
    })
  }
  render () {
    // const topImg = '/image/infot.png'
    // const bottomImg = '/image/infob.png'
    const { grade, addressEnd, visible } = this.state
    return (
      <div className='news-list-container' style={{minHeight: this.state.viewHeight}}>
        <div id='right-container'>
          <ul className='ul-top' style={{width: '100%', padding: '0', backgroundColor: '#fff', minHeight: this.state.viewHeights}}>
            <li style={{listStyle: 'none', width: '100%', paddingTop: '20px', paddingLeft: '30px', backgroundColor: '#fff'}}>
              <Col span={18}>
                <span className='information-fabu'>
                  发布机构 : {/* <Cascader placeholder='请选择' options={this.state.options} onChange={(value) => { this.onChangeF(value) }} /> */}
                  <InformationAddress visible={visible} grade={grade} sureAddress={this.sureAddress} changeGrade={this.changeGrade}>
                    <span onClick={() => this.setState({visible: true})} className='information-fabu-address' style={{color: '#1890ff'}}><Icon type='user-delete' /> {addressEnd || ''}</span>
                  </InformationAddress>
                </span>
              </Col>
              <Col span={6} style={{marginTop: '8px'}}>
                <span className='information-dianji' style={{fontSize: '12px'}}>
                  <img src={this.state.imgH} style={{width: '20px'}} alt='' />点击蓝色字段，可切换级别筛选
                </span>
              </Col>
            </li>
            {(!_.isEmpty(this.state.infoData)) && this.state.infoData.info.map((item, index) => {
              return <li style={{listStyle: 'none', width: '100%', height: '140px', paddingTop: '0px', paddingLeft: '30px', backgroundColor: '#fff'}} key={index}>
                <Col span={24}>
                  <Row>
                    <Col span={17}><p className='p'><a onClick={this.handleTabChange.bind(this)}><span style={{display: 'none'}}>{item.id}</span> {item.contentTitle ? item.contentTitle : '预备' }</a></p></Col>{/* this.state.infoData.info_title */}
                    <Col span={4}><span className='span-top'>发布者 : {item.userName}</span></Col>
                    <Col span={3}><span className='span-top'>{moment(item.updateTime).format('YYYY-MM-DD')}</span></Col>
                  </Row>
                  <Row>
                    <Col span={23}>
                      <p className='paragraph' style={{height: '55px', fontSize: '12px'}}>{processStr(item.content, 150)}</p>
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
              <Row style={{marginRight: '4.5%', marginBottom: '10px'}}>
                {/* <Col span={12} />
                <Col > */}
                <div style={{float: 'left'}}>总共有 {this.state.infoData && this.state.infoData.total} 条数据</div>
                {this.state.infoData.total >= 5
                  ? <Pagination
                    style={{float: 'right'}}
                    current={this.state.pageNum}
                    defaultPageSize={5}
                    pageSizeOptions={['5', '10', '15', '20']}
                    total={this.state.infoData.total}// {this.state.newData.total}
                    showSizeChanger
                    showQuickJumper
                    onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
                    onShowSizeChange={(current, size) => { this.stChange(current, size) }}
                    // pageSizeOptions={5}
                  /> : null}
                {/* </Col> */}
              </Row>
            </li>
          </ul>
        </div>
        <div id='left-container'>
          {/* <div className='top-img' >
            <img src={ajaxUrl.IMG_BASE_URL + topImg} style={{width: '98%', height: '120px'}} alt='' />
          </div> */}
          <div className='center-public-info'>
            <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: '98%' }}>
              <ul className='ul-margin super1'>
                {this.state.infoDatas && this.state.infoDatas.info && this.state.infoDatas.info.length !== 0 && this.state.infoDatas.info.map((item, index) => {
                  return index < 12 ? <li className='li-hover' key={index} ><img src={_ul} /><a onClick={this.handleTabChanges.bind(this)} className='span-color'><span style={{display: 'none'}}>{item.id}</span> {item.contentTitle}</a></li> : ''
                })}
              </ul>
            </Card>
          </div>
          {/* <div className='bottom-img'>
            <img src={ajaxUrl.IMG_BASE_URL + bottomImg} style={{width: '98%', marginTop: '10px', height: '120px'}} alt='' />
          </div> */}
        </div>

      </div>
    )
  }
}

export default withRouter(Information)
