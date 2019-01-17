/* eslint-disable react/prop-types,react/jsx-no-bind */
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './MainHome.scss'
import { withRouter } from 'react-router'
import {getPortalBannerImg} from 'services/portalnew'
import {login} from 'services/portal'
import PropTypes from 'prop-types'
import webStorage from 'webStorage'
import Config from 'config'
// import {clearCookie, setCookie, getCookie} from 'utils/cookie'
import imgBanner from '../../assets/images/login-home/u664.jpg'

class MainBander extends React.Component {
  static propTypes = {
    showSureWin: PropTypes.func,
    handleAfterLogged: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      userName: '', // 用户名密码
      passWord: '', // 密码
      msgTip: '', // 用户登录信息提示
      bannerImg: [],
      levelList: [], // 年级下拉列表值
      dutyList: []// 行政职务下拉列表值
    }
  }

  handleLogin () {
    if (this.state.userName === '' || this.state.passWord === '') {
      this.setState({
        msgTip: '用户名或密码不能为空!'
      })
      return
    }
    login({
      userName: this.state.userName || '',
      userPassword: this.state.passWord || ''
    }, (response) => {
      let data = response.data
      // 如果登录成功
      if (data.success) {
        // webStorage.setItem('STAR_WEB_SESSION_ID', data.sessionId)
        webStorage.setItem('STAR_WEB_ROLE_CODE', data.roleCode)
        webStorage.setItem('STAR_WEB_PERSON_INFO', data.personInfo)
        webStorage.setItem('STAR_WEB_IS_LOGGED', true)

        // clearCookie()
        // setCookie('id', webStorage.getItem('STAR_WEB_PERSON_INFO').id, 0)

        window.location.reload()
        // 清空提示信息
        this.setState({
          msgTip: ''
        })
        this.props.updatePage()
        // 如果该用户是首次登录
        if (data.isFirstLogged) {
          // 如果是教师和学生   先弹出信息
          if (data.roleCode === 'teacher' || data.roleCode === 'students') {
            this.props.showSureWin(this.getSureInfoData(data.personInfo || {}, data.roleCode))
          } else { // 其他的弹出修改密码窗口
            this.props.handleChangeVisible('changeInfoWinVisible', true)
          }
        } else {
          if (data.roleCode === 'operator') {
            this.props.history.push({
              pathname: '/software-market-home'
            })
          }
        }
      } else {
        this.setState({
          msgTip: data.msg
        })
      }
    })
  }

  getSureInfoData (personInfo, roleCode) {
    let data = []
    for (let i in personInfo) {
      if (i === 'name') {
        data.push({
          text: roleCode === 'students' ? '学生姓名' : '教师姓名',
          type: 'name',
          value: personInfo[i]
        })
      } else if (i === 'sex') {
        data.push({
          text: '性别',
          type: 'sex',
          value: personInfo[i]
        })
      } else if (i === 'birth') {
        data.push({
          text: '出生日期',
          type: 'birth',
          value: personInfo[i]
        })
      } else if (i === 'school') {
        data.push({
          text: '学校',
          type: 'school',
          value: personInfo[i]
        })
      } else if (i === 'iden') {
        data.push({
          text: '身份证号',
          type: 'iden',
          value: personInfo[i]
        })
      } else if (i === 'grade') {
        data.push({
          text: '年级',
          type: 'grade',
          value: personInfo[i]
        })
      } else if (i === 'duty') {
        data.push({
          text: '行政职务',
          type: 'duty',
          value: personInfo[i]
        })
      }
    }
    return data
  }

  /**
   *
   */
  handleValueChange (e, key) {
    this.setState({
      [key]: e.target.value
    })
  }
  /* 注册-忘记密码 */
  handregister=(link) => {
    // if (link === this.props.location.pathname) {
    //   window.location.reload()
    // } else {
    //   this.props.history.push({
    //     pathname: link
    //   })
    // }
    this.props.history.push({
      pathname: link
    })
  }

  componentDidMount () {
    this.getPortalBannerImg()
  }

  /**
   * 校验密码规则
   * @param rule
   * @param value
   * @param callback
   */
  validatorPas (rule, value, callback) {
    callback()
  }

  /**
   * 获取门户首页Banner图片
   */
  getPortalBannerImg = () => {
    getPortalBannerImg({
      bannerType: '1'
    }, (response) => {
      if (response.data.code === 200) {
        let result = response.data.data || []
        // console.log('顶部轮播', result)
        this.setState({
          bannerImg: result || []
        })
        this.addHoverButton()
      } else {
        // message.warning(response.data.msg || '出现异常')
      }
    })
  }
  /**
   * 给轮播图按钮添加hover暂停轮播事件
   */
  addHoverButton = () => {
    const thiz = this
    document.getElementsByClassName('slick-arrow')[0].onmouseover = () => {
      thiz.refs.slider.slickPause()
    }
    document.getElementsByClassName('slick-arrow')[1].onmouseover = () => {
      thiz.refs.slider.slickPause()
    }
    document.getElementsByClassName('slick-arrow')[0].onmouseout = () => {
      thiz.refs.slider.slickPlay()
    }
    document.getElementsByClassName('slick-arrow')[1].onmouseout = () => {
      thiz.refs.slider.slickPlay()
    }
  }

  render () {
    let settings = {
      dots: false, // 下侧省略号
      infinite: true,
      speed: 500,
      arrows: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    return (
      <div className='main-bander-container'>
        <div className='custom-slider'>
          <Slider {...settings} ref='slider'>
            {
              this.state.bannerImg.map((item, index, arr) => {
                return item.picUrl ? <div key={index} style={{height: '228px', width: '100%'}} >
                  <img src={Config.IMG_BASE_URL_V2 + item.picUrl || ''} style={{height: '100%', width: '100%'}} />
                </div>
                  : <div key={index} style={{height: '228px', width: '100%'}} >
                    <img src={imgBanner} style={{height: '100%', width: '100%'}} />
                  </div>
              })
            }
          </Slider>
        </div>
      </div>
    )
  }
}

export default withRouter(MainBander)
