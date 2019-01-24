/**
 * 工作台-首页
 * 分层治之
 * 1- view层
 * 2- 逻辑层 -- 接收数据并去参与view活动需要的逻辑
 * 3- 数据适配层 -- 根据逻辑层需要的数据提供适配数据
 */
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import webStorage from 'webStorage'
import {
  Row,
  Col,
  Card,
  Avatar,
  Progress,
  Tabs,
  message
} from 'antd'
import {
  Page,
  LabelIcon,
  Grid,
  AppCard,
  Echarts
} from '../../components/common'
import { axios } from 'utils'
import config from '../../config'
import './Home.scss'
import More from '../../assets/images/work-plat/more.png'
import AvatarIcon from '../../assets/images/work-plat/avatar.png'
import WaitToDoPre from '../../assets/images/work-plat/wait-to-do-pre.png'
import WaitToDoSuffix from '../../assets/images/work-plat/wait-to-do-suffix.png'
import Book from '../../assets/images/work-plat/book.png'
import Member from '../../assets/images/work-plat/member.png'
import Org from '../../assets/images/work-plat/org.png'
import MsgIcon from '../../assets/images/work-plat/message.png'
import Location from '../../assets/images/work-plat/location.png'
import Compony from '../../assets/images/work-plat/compony.png'
import Job from '../../assets/images/work-plat/job.png'
import Call from '../../assets/images/work-plat/call.png'
import CLass from '../../assets/images/work-plat/class.png'
/* 一些子页面 */
import { DownHistory, UserManage } from './home/index'
/* mock数据 */
import mock from './mock-data'

const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_EDU_MARKET = config.SERVICE_EDU_MARKET
const SERVICE_AUTHENTICATION = config.SERVICE_AUTHENTICATION

const TabPane = Tabs.TabPane

/**
 * 排序的序号颜色
 * 1- 数组 - 下标就是序号
 */
const orderColor = ['#FF6D4A', '#4ECB73', '#fad337', '#666']

/**
 * 消息的主题颜色
 * 1- 这个可以后面如果公用 -- 可以抽出去
 */
const msgColor = {
  pass: '#4ECB73', // 成功-通过
  info: '#40B3F9', // 消息
  reject: '#f00' // 错误-拒绝
}

/**
 * APP-icon的style
 */
const iconStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  padding: '1px 5px 5px 5px'
}

/**
 * App-icon中的icon的style
 */
const imgStyle = {
  width: '30px',
  height: '30px'
}

/**
 * Card的头部的统一/共有样式
 */
const headStyle = {
  backgroundColor: '#f4f4f4',
  padding: '0',
  height: '32px',
  lineHeight: '32px'
}

/**
 * Card的body的统一/共有样式
 */
const bodyStyle = {
  border: 'none',
  padding: '20px'
}

/**
 * Card头部的Extra
 */
const Extra = () => (
  <span className='extra-font point'>
    <span>更多</span>
    <img src={More} className='extra-icon' />
  </span>
)

/**
 * 待办列表-Item
 */
const WaitToDoItem = (props) => (
  <div className='wait-to-do-item'>
    <img src={WaitToDoPre} className='wait-to-do-item-icon-pre' />
    <span>
      { props.message || '' }
    </span>
    <img src={WaitToDoSuffix} className='wait-to-do-item-icon-suffix' />
    <span className='wait-to-do-item-date'>[3-24]</span>
  </div>
)

/**
 * 应用使用统计 Item
 */
const StatItem = (props) => (
  <Row className='order-item-wrap'>
    <Col span={1}>
      <span className='order-num' style={{ backgroundColor: props.orderColor || '#666' }} >
        { props.orderNum || ''}
      </span>
    </Col>
    <Col span={4} className='order-title'>
      <span>{ props.title || '' }</span>
    </Col>
    <Col span={19}>
      <Progress percent={props.percent} />
    </Col>
  </Row>
)

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recomApps: [], // 系统（重点）推荐
      myApps: [], // 我的应用
      myCollect: [], // 我的收藏
      usrInfo: {}, // 用户信息,
      appUseTime: [] // 应用使用时长
    }
  }

  /**
   * 数据请求--系统（重点）推荐
   */
  getTopApps = (thiz) => {
    axios.get(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/top-app' + '/1/6')
      .then(function (res) {
        if (res.data.code === 200) {
          const data = res.data
          data.data.content &&
          thiz.setState({
            recomApps: thiz.topApps2LabelIconAdapter(data.data.content.slice())
          })
        } else {
          message.warning(res.data.msg || '请求出错')
        }
      })
  }
  /**
   * 数据请求--我的应用
   */
  getMyApps = (userId, thiz) => {
    // 需要全局用户id
    axios.get(API_BASE_URL_V2 + SERVICE_EDU_MARKET + `/app-open`)
      .then(function (res) {
        if (res.data.code === 200) {
          const data = res.data
          data.data &&
          thiz.setState({
            myApps: thiz.myApps2LabelIconAdapter(data.data.slice())
          })
        } else {
          message.warning(res.data.msg || '请求出错')
        }
      })
  }
  /**
   * 数据请求--我的收藏
   */
  getMyCollect = (userId, thiz) => {
    // 需要全局用户id
    axios.get(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/app-collect/list', { params: { userId: userId } })
      .then(function (res) {
        if (res.data.code === 200) {
          const data = res.data
          data.data &&
          thiz.setState({
            myCollect: thiz.cellect2AppCardsAdapter(data.data.slice())
          })
        } else {
          message.warning(res.data.msg || '请求出错')
        }
      })
  }

  /**
   * 数据请求-个人
   */
  getUserInfo = (userId, thiz) => {
    // 需要全局用户id - 测试默认值为1
    axios.get(API_BASE_URL_V2 + SERVICE_AUTHENTICATION + `/users/detailed/${userId}`)
      .then(function (res) {
        if (res.data.code === 200) {
          const data = res.data
          console.log('敏感信息', data.data)
          data.data &&
        thiz.setState({
          usrInfo: { ...data.data } // 引用类型浅拷贝一下
        })
        } else {
          message.warning(res.data.msg || '请求出错')
        }
      })
  }
  /** 数据请求--使用时长 **/
  getAppUseTimeRank = () => {
    axios.get(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/count/getAppUseTimeRank')
      .then((res) => {
        if (res.data.code === 200) {
          this.setState({
            appUseTime: res.data.data
          })
        }
        console.log(res.data.data)
      })
  }
  /**
   * 适配器 - 系统（重点）推荐数据适配 LabelIcon
   * @param { Array } data 输入的数据
   */
  topApps2LabelIconAdapter = (data) => {
    // 把从后台拿到的数据适配为view需要的数据格式
    let result = []
    data.map((v, i) => {
      result.push({
        id: v.appId,
        label: v.appName || null,
        icon: v.appIcon ? (config.IMG_BASE_URL_V2 + v.appIcon) : null
      })
    })
    return result
  }

  /**
   * 适配器 - 我的应用数据适配 LabelIcon
   * @param { Array } data 输入的数据
   */
  myApps2LabelIconAdapter = (data) => {
    // 把从后台拿到的数据适配为view需要的数据格式
    let result = []
    data.map((v, i) => {
      result.push({
        id: v.APP_ID,
        label: v.APP_NAME || null,
        icon: v.APP_ICON ? (config.IMG_BASE_URL_V2 + v.APP_ICON) : null
      })
    })
    return result
  }

  /**
   * 适配器 - 我的收藏数据适配 AppCard
   * @param { Array } data 输入的数据
   */
  cellect2AppCardsAdapter = (data) => {
    // 把从后台拿到的数据适配为view需要的数据格式
    let result = []
    data.map((v, i) => {
      result.push({
        id: v.APP_ID,
        title: v.APP_NAME || null,
        desc: v.APP_NOTES || null,
        icon: v.APP_ICON ? (config.IMG_BASE_URL_V2 + v.APP_ICON) : null
      })
    })
    return result
  }

  /**
   * 应用点击
   */
  onAppClick = (id, url) => {
    // 有一个默认的App_id
    url = url || `/operate-manage-home/all-app-detail-third?${id}`
    this.props.history.push(url)
  }

  /**
   * AppCard - 点击动作（下载/详情/开通）时的回调
   */
  onAppCardAction = (id, url) => {
    this.props.history.push(`/operate-manage-home/all-app-detail-third?${id}`)
  }

  /**
   * 管理-人员/订单/组织
   * @params {string} type 跳转到管理页面的类型
   */
  onManageClick = (type) => {
    switch (type) {
      case 'book':
        // 跳转到‘订单管理’
        break
      case 'people':
        // 跳转到人员管理
        this.props.history.push('/operate-manage-home/member')
        break
      case 'ins':
        // 跳转到‘组织管理’
        break
      case 'app':
        // 跳到应用管理
        this.props.history.push('/operate-manage-home/all-app-detail-mine')
        break
      default:
        // 其他
    }
  }
  /**
   * 获取Echarts的options -- 用户统计
   * 1- 接受参数来生成专门的options
   */
  getUserStatOptions = (data) => {
    return {
      title: {
        text: '数量占比',
        left: 'center',
        top: 'middle',
        textStyle: {
          color: '#474747',
          fontSize: 24,
          fontWeight: 400
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      color: ['#fad337', '#3aa0ff', '#4ecb73'],
      series: [
        {
          name: '数量占比',
          type: 'pie',
          radius: ['60%', '85%'],
          avoidLabelOverlap: false,
          data: [
            {value: 335, name: '学生'},
            {value: 310, name: '教师'},
            {value: 234, name: '家长'}
          ]
        }

      ]
    }
  }

  /**
   * 获取待办事项列表-厂商
   */
  getVndWaitToDoListRender = (data) => {
    // 容错-空值
    let d = data.slice() || []
    // 长度在5个以上时 需要截取前6个
    d.length > 2 && d.splice(3)
    return d.map((v, i) => (
      <Row className='wait-to-do-vend'>
        <Col span={2}>
          <span
            className='message-icon-wrap'
            style={{ backgroundColor: msgColor[v.type] }}
          >
            <img src={MsgIcon} />
          </span>
        </Col>
        <Col span={20} className='wtdv-col'>
          <Row>
            <Col span={6}>
              { v.title || '' }
            </Col>
            <Col span={8} style={{float: 'right', width: 'auto'}}>
              { v.date || '' }
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              { v.content || '' }
            </Col>
          </Row>
          { v.more &&
            <Row>
              <Col span={24}> { v.more } </Col>
            </Row>
          }
        </Col>
        <Col span={2} className='wtdv-col'>
          查看
        </Col>
      </Row>
    ))
  }

  /**
   * 获取应用使用统计列表的渲染
   */
  getStatListRender = (data) => {
    // 容错-空值
    data = data || []
    // 长度在5个以上时 需要截取前6个
    data.length > 4 && data.splice(5)
    return data.map((v, i) => (
      <StatItem
        key={i}
        orderNum={i + 1 + ''}
        orderColor={i > 2 ? orderColor[3] : orderColor[i]}
        title={v.title}
        percent={v.percent}
      />
    ))
  }

  getAppUseTimeListRender = (data) => {
    let datas = data.content || []
    if (datas.length > 6) {
      // 取前5条
      datas = datas.slice(0, 5)
    }
    return datas.map((v, i) => (
      <StatItem
        key={i}
        orderNum={i + 1 + ''}
        orderColor={i > 2 ? orderColor[3] : orderColor[i]}
        title={v.APP_NAME}
        percent={v.TIME}
      />
    ))
  }
  /**
   * 获取待办列表的渲染
   */
  getWaitToDoListRender = (data) => {
    // 容错-空值
    data = data || []
    // 长度在5个以上时 需要截取前6个
    data.length > 5 && data.splice(6)
    return data.map((v, i) => {
      return (
        <WaitToDoItem
          key={i}
          message={v.message}
        />
      )
    })
  }

  /**
   * 获得单个App的card
   */
  getAppCardRender = (v, thiz) => {
    return (
      <AppCard
        id={v.id}
        icon={v.icon || null}
        title={v.title || null}
        desc={v.desc || null}
        onAction={thiz.onAppCardAction}
      />
    )
  }

  /**
   * 获得单个的App - LabelIcon
   * @param { object } style 描述labelIcon的style
   * @param { object } params 参数
   * @param { object } thiz 回调函数的上下文
   * @returns 为了传递这个函数（并且可以携带参数） 我们返回值是返回一个函数（info和item传入的上下文不一样）
   */
  getAppRender = (style, params, thiz) => {
    // 返回函数 -- 可以模拟一下集成和多态
    style = style || {}
    // v 就是 传给LabelIcon的props数据
    return function (v, style) {
      return (
        <LabelIcon
          style={{ ...style }}
          id={v.id}
          label={v.label || '应用'}
          icon={v.icon}
          onClick={(id) => thiz.onAppClick(id, params.url)}
        />
      )
    }
  }

  /**
   * 获取格子的渲染
   * @param { array } data 用来渲染的数据 -- 可以在输入前加适配器
   * @param { num } gridCol 九宫格 -- 格子有几列 默认3列 这个值要参与后面渲染时的运算
   * @param { num } count 阈值 只渲染多少个
   * @param { func } itemRender 用来渲染格子的内容
   */
  getCellsRender = (data, gridCol, count, itemRender) => {
    // 上下文环境
    const thiz = this
    // 容错-空值
    data = data || []
    count = count || 6
    gridCol = gridCol || 3
    // 长度在5个以上时 需要截取前6个
    let d = data.slice()
    d.length > count && d.splice(count)
    const len = count
    return d.map((v, i) => {
      return <Grid
        key={i}
        gridCount={len}
        gridCol={gridCol}
      >
        {/* <LabelIcon
          label={v.label}
        /> */}
        { itemRender(v, thiz) }
      </Grid>
    }
    )
  }

  /**
   * 渲染-工作台（个人中心）部分
   * @param {string} role 当前角色
   */
  getPersonRender = (role) => {
    if (role === 'teacher') {
      // 教师-个人中心部分渲染
      return (
        <Row className='row-box row-box-tch'>
          <Col span={24}>
            <Row>
              <Col span={16}>
                <img src={Compony} className='mini-icon' />
                单位：
                <span>{ 'xxx小学' }</span>
              </Col>
              <Col span={8}>
                <img src={Job} className='mini-icon' />
                学科：
                <span>{ '数学' }</span>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <img src={Call} className='mini-icon' />
                电话：
                <span>{ this.state.usrInfo.phoneNumber || '无' }</span>
              </Col>
              <Col span={8}>
                <img src={Job} className='mini-icon' />
                职称：
                <span>小教一级</span>
              </Col>
            </Row>
          </Col>
        </Row>
      )
    } else if (role === 'parents') {
      // 家长-个人中心部分渲染
      return (
        <Row className='row-box row-box-tch'>
          <Col span={14}>
            <img src={Compony} className='mini-icon' />
                单位：
            <span>xxx小学</span>
          </Col>
          <Col span={10}>
            <img src={Call} className='mini-icon' />
                电话：
            <span>{ this.state.usrInfo.phoneNumber || '无' }</span>
          </Col>
        </Row>
      )
    } else if (role === 'students') {
      // 学生-个人中心部分渲染
      return (
        <Row className='row-box row-box-tch'>
          <Col span={14}>
            <img src={Compony} className='mini-icon' />
                单位：
            <span>xxx小学</span>
          </Col>
          <Col span={10}>
            <img src={CLass} className='mini-icon' />
                年级：
            <span>一年三班</span>
          </Col>
        </Row>
      )
    } else {
      return (
        <Row type='flex' justify='space-between' className='row-box'>
          <Col span={6}>
            <LabelIcon
              style={{ ...iconStyle, backgroundColor: '#40B3F9' }}
              imgStyle={{ ...imgStyle }}
              label='订单管理'
              icon={Book}
              onClick={() => this.onManageClick('book')}
            />
          </Col>
          {
            role === 'vendor'
              ? <Col span={6}>
                <LabelIcon
                  style={{ ...iconStyle, backgroundColor: '#4ECB73' }}
                  imgStyle={{ ...imgStyle }}
                  label='应用管理'
                  icon={Member}
                  onClick={() => this.onManageClick('app')}
                />
              </Col>
              : <Col span={6}>
                <LabelIcon
                  style={{ ...iconStyle, backgroundColor: '#4ECB73' }}
                  imgStyle={{ ...imgStyle }}
                  label='人员管理'
                  icon={Member}
<<<<<<< HEAD
                  // onClick={() => this.onManageClick('people')}
=======
                  onClick={() => this.onManageClick('people')}
>>>>>>> 2a7271f38e3feab7a955ff6c69b8ef830aae7e83
                />
              </Col>
          }
          <Col span={6}>
            <LabelIcon
              style={{ ...iconStyle, backgroundColor: '#FF6D4A' }}
              imgStyle={{ ...imgStyle }}
              label='组织管理'
              icon={Org}
              onClick={() => this.onManageClick('ins')}
            />
          </Col>
        </Row>
      )
    }
  }

  /**
   * 渲染非厂商部分的内容
   */
  getNoVendorRender = () => {
    const role = webStorage.getItem('STAR_WEB_ROLE_CODE')
    const {
      recomApps,
      myApps,
      myCollect
    } = this.state
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              bordered={false}
              title={'系统推荐'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle, height: '220px'}}
            >
              {
                this.getCellsRender(recomApps, 3, 6, this.getAppRender({ borderRadius: '4px' }, {}, this))
              }
            </Card>
          </Col>
          <Col span={16}>
            <Card
              bordered={false}
              title={'我的应用'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle, height: '220px'}}
              extra={<Extra />}
            >
              {
                this.getCellsRender(myApps, 9, 18, this.getAppRender({ borderRadius: '50%' }, {}, this))
              }
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Card
              bordered={false}
              title={'我的收藏'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle, height: '250px'}}
              extra={<Extra />}
            >
              {
                this.getCellsRender(myCollect, 5, 10, this.getAppCardRender)
              }
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              bordered={false}
              title={'用户统计'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle, height: '260px'}}
            >
              <div className='echarts-wrap'>
                <Echarts options={this.getUserStatOptions()} />
              </div>
            </Card>
          </Col>
          <Col span={16}>
            <Card
              bordered={false}
              title={'应用使用统计'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle, height: '260px'}}
            >
              <Tabs
                type='card'
              >
                <TabPane
                  key='stat-time'
                  tab='使用时长'
                >
                  {
                    this.getAppUseTimeListRender(this.state.appUseTime)
                  }
                </TabPane>
                <TabPane
                  key='stat-rate'
                  tab='使用频率'
                >
                  {
                    this.getStatListRender(mock.statRateList)
                  }
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
        {
          role === 'school' &&
          <Row gutter={16}>
            <Col span={24}>
              <Card
                bordered={false}
                title={'下载历史'}
                headStyle={{...headStyle}}
                bodyStyle={{...bodyStyle}}
                extra={<Extra />}
              >
                <DownHistory />
              </Card>
            </Col>
          </Row>
        }
      </div>
    )
  }

  componentDidMount () {
    // 从本地获取用户个人信息-id
    const userInfo = webStorage.getItem('STAR_WEB_PERSON_INFO')
    // 请求数据
    this.getTopApps(this)
    this.getMyApps(userInfo.userId, this)
    this.getMyCollect(userInfo.userId, this)
    this.getUserInfo(userInfo.userId, this)
    // 获取使用时长
    this.getAppUseTimeRank()
  }

  render () {
    return (
      <Page
        paddingLeft='10%'
        paddingRight='10%'
      >
        <Row gutter={16}>
          <Col span={8}>
            <Card
              bordered={false}
              title={'工作台'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle, height: '230px'}}
            >
              <Row
                type='flex'
                justify='space-around'
                align='middle'
                style={{whiteSpace: 'nowrap'}}
              >
                <Col span={6}>
                  <Avatar
                    // size={88}
                    style={{width: '100%', height: '100%'}}
                    src={AvatarIcon}
                  />
                </Col>
                <Col span={8}>
                  <Row
                    type='flex'
                    justify='left'
                  >
                    <Col span={14} style={{fontSize: '14px', fontWeight: '650'}}>
                      { this.state.usrInfo.userName || '贝贝小学' }
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} style={{fontSize: '12px'}}>
                    海纳百川 有容乃大
                    </Col>
                  </Row>
                </Col>
                <Col span={6}>
                  <Link
                    to='/operate-manage-home/work-plat/per-center'
                  >
                    个人中心
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col span={6} offset={18}>
                  <img src={Location} className='mini-icon' />
                  <span style={{fontSize: '12px'}}>{ this.state.usrInfo.briefAddress || '无' }</span>
                </Col>
              </Row>
              {
                this.getPersonRender(webStorage.getItem('STAR_WEB_ROLE_CODE'))
              }
            </Card>
          </Col>
          <Col span={16}>
            <Card
              bordered={false}
              title={<span>待办事项<span className='tip-red'>{'(23)'}</span></span>}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle, height: '230px'}}
              extra={<Extra />}
            >
              { webStorage.getItem('STAR_WEB_ROLE_CODE') === 'vendor'
                ? this.getVndWaitToDoListRender(mock.waitToDoVnd)
                : this.getWaitToDoListRender(mock.waitToDoData)
              }
            </Card>
          </Col>
        </Row>
        {
          webStorage.getItem('STAR_WEB_ROLE_CODE') === 'vendor'
            ? <Card
              bordered={false}
              title={'消费列表'}
              headStyle={{...headStyle}}
              bodyStyle={{...bodyStyle}}
              extra={<Extra />}
            >
              <UserManage />
            </Card>
            : this.getNoVendorRender()
        }
      </Page>
    )
  }
}

WaitToDoItem.propTypes = {
  message: PropTypes.string
}

StatItem.propTypes = {
  orderColor: PropTypes.string,
  orderNum: PropTypes.string,
  title: PropTypes.string,
  percent: PropTypes.number
}

Home.propTypes = {
  history: PropTypes.any
}

export default withRouter(Home)
