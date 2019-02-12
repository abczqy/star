/* eslint-disable react/jsx-no-bind,react/prop-types */
/* eslint-disable react/jsx-no-bind */
/**
 * 游客的信息公开
 */
import React, {Fragment} from 'react'
import {Row, Col, Card, Pagination, message, Popover, Tabs, Select, Button} from 'antd'
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
import img1 from '../../assets/images/u7229.png'
import address from '../../../static/document/address'

const TabPane = Tabs.TabPane
const Option = Select.Option

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
      selete: {
        province: '',
        city: '',
        region: ''
      }, // 选择地区
      dataP: false, // 公告和分享的list
      imgG: '', // 公告图片
      infoData: [],
      height: '',
      infoDatas: [],
      visible: false,
      addressInfo: '北京市'
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
    this.changeProvince('province', Object.keys(address)[0])
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

    let values = {
      pageNum: 1,
      pageSize: 100,
      type: 0
    }
    information(values, 1, (response) => {
      if (response.data.code === 200) {
        this.setState({
          infoDatas: response.data.data
        }, () => console.log(this.state.infoDatas))
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
  changeProvince = (name, value) => {
    if (name === 'province') {
      this.setState({
        selete: {
          province: value,
          city: '',
          region: ''
        }
      })
    } else if (name === 'city') {
      this.setState({
        selete: {
          ...this.state.selete,
          city: value,
          region: ''
        }
      })
    } else {
      this.setState({
        selete: {
          ...this.state.selete,
          region: value
        }
      })
    }
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
  /** 修改地址确认 */
  changeAddress = () => {
    const selete = this.state.selete
    this.setState({
      visible: false,
      addressInfo: [selete.province, selete.city, selete.region].join('')
    })
  }
  render () {
    // const topImg = '/image/infot.png'
    // const bottomImg = '/image/infob.png'
    const { selete, visible, addressInfo } = this.state
    return (
      <div className='news-list-container' style={{minHeight: this.state.viewHeight}}>
        <div id='right-container'>
          <ul className='ul-top' style={{width: '100%', padding: '0', backgroundColor: '#fff', minHeight: this.state.viewHeights}}>
            <li style={{listStyle: 'none', width: '100%', paddingTop: '20px', paddingLeft: '30px', backgroundColor: '#fff'}}>
              <Col span={18}>
                <span className='information-fabu'>
                  发布机构 :
                  <Popover placement='bottomLeft' trigger='click' visible={visible} content={(
                    <Fragment>
                      <Tabs type={'card'} defaultActiveKey={'1'} tabPosition={'left'}>
                        <TabPane key='1' tab='省级'>
                          <Select value={selete.province} style={{width: 150}} onChange={(value) => this.changeProvince('province', value)}>
                            {Object.keys(address).map((province) => {
                              return <Option value={province} key={province}>{province}</Option>
                            })}
                          </Select>
                        </TabPane>
                        <TabPane key='2' tab='市级'>
                          <Select style={{width: 150}} value={selete.city} onChange={(value) => this.changeProvince('city', value)}>
                            {selete.province && Object.keys(address[selete.province]).map((city) => {
                              return <Option value={city} key={city}>{city}</Option>
                            })}
                          </Select>
                        </TabPane>
                        <TabPane key='3' tab='区级'>
                          <Select style={{width: 150}} value={selete.region} onChange={(value) => this.changeProvince('region', value)}>
                            {selete.city && address[selete.province][selete.city].map((region) => {
                              return <Option value={region} key={region}>{region}</Option>
                            })}
                          </Select>
                        </TabPane>
                      </Tabs>
                      <div style={{textAlign: 'right'}}>
                        <Button htmlType='button' type='primary' onClick={this.changeAddress}>确认</Button>
                      </div>
                    </Fragment>
                  )}>
                    <div onClick={() => this.setState({visible: true})} style={{display: 'inline-block'}}>
                      <img style={{width: 20, verticalAlign: 'middle', margin: '0 10px'}} src={img1} alt='' />
                      <span style={{color: '#1890ff', verticalAlign: 'middle'}}>{addressInfo}</span>
                    </div>
                  </Popover>
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
