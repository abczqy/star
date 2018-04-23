/**
 * 全部应用
 */
// eslint-disable-next-line react/jsx-no-bind
import React from 'react'
import './MyAppDetail.css'
import { Icon, Carousel } from 'antd'
// import PropTypes from 'prop-types'
// import { renderRoutes } from 'react-router-config'
// import { Link } from 'react-router-dom'
// const { Sider, Content } = Layout

// import axiosApi from '../../../api'
export default class MyAppDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      mode: 'inline',
      theme: 'light',
      obj: {
        display: 'none'
      },
      addClassName: 'see-detail-itema'
    }
  }
  componentWillReceiveProps (nextProps) {
  }
  handleSeeDetail = () => {
    if (this.state.obj.display === 'none') {
      this.setState({
        obj: {
          display: 'block'
        }
      })
    } else {
      setTimeout(() => {
        this.setState({
          obj: {
            display: 'none'
          }
        })
      }, 450)
    }

    if (this.state.addClassName === 'see-detail-itema') {
      setTimeout(() => {
        this.setState({
          addClassName: 'see-detail-itemb'
        })
      }, 50)
    } else {
      this.setState({
        addClassName: 'see-detail-itema'
      })
    }
  }
  handleLeftClick = () => {
    this.refs['exhibition-inside-carousel'].prev()
  }
  handleRightClick = () => {
    this.refs['exhibition-inside-carousel'].next()
  }
  render () {
    console.log('00000000', this.props)
    return (
      <div className='app-detail'>
        <div className='app-detail-header'>
          <img src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2640553151,1248485598&fm=27&gp=0.jpg' />
          <div className='app-detail-header-right'>
            <p>
              <span className='header-titlea'>软件名称：超级教师</span>
              <span className='header-titlea'>当前版本：1.0</span>
            </p>
            <p>
              <span className='header-titlea'>软件类型：教辅类</span>
              <span className='header-titlea'>上架时间：2018年4月1日</span>
            </p>
            <p>
              <span className='header-titlea'>兼容系统：windows 64位   ios11.2.6   安卓10.2.3</span>
            </p>
          </div>
          <div className={this.state.addClassName} ref='see-detail-item' style={this.state.obj}>
            <div className='see-detail-item-top'>
              <div style={{float: 'left', marginRight: '300px'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>软件大小:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>28.71M</span></div>
              <div style={{float: 'left', marginRight: '300px'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>版本号:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>5.3.0</span></div>
              <div style={{float: 'left'}}><span style={{fontWeight: 500, color: '#474747', fontSize: 14}}>包名:</span>&nbsp;&nbsp;&nbsp;<span style={{fontWeight: 400, color: '#666', fontSize: 14}}>com.netease.vopen</span></div>
            </div>
            <div className='see-detail-item-jurisdiction'>
              <span className='jurisdiction-title'>权限详情:</span>
              <ul className='jurisdiction-list'>
                <li className='jurisdiction-list-detail'>（基于网络的）粗略位置</li>
                <li className='jurisdiction-list-detail'>精准的(GPS)位置</li>
                <li className='jurisdiction-list-detail'>查看网络状态</li>
                <li className='jurisdiction-list-detail'>查看 Wi-Fi 状态</li>
                <li className='jurisdiction-list-detail'>创建蓝牙连接</li>
                <li className='jurisdiction-list-detail'>蓝牙管理</li>
                <li className='jurisdiction-list-detail'>拍摄照片和视频</li>
                <li className='jurisdiction-list-detail'>更改网络连接性</li>
                <li className='jurisdiction-list-detail'>更改 Wi-Fi 状态</li>
                <li className='jurisdiction-list-detail'>完全的互联网访问权限</li>
                <li className='jurisdiction-list-detail'>装载和卸载文件系统</li>
                <li className='jurisdiction-list-detail'>开机时自动启动</li>
                <li className='jurisdiction-list-detail'>使用帐户的身份验证凭据</li>
                <li className='jurisdiction-list-detail'>修改全局系统设置</li>
              </ul>
            </div>
          </div>
          <div className='app-detail-exhibition'>
            <div className='exhibition-title'>
              <h3>软件展示</h3>
              <div>pc展示</div>
              <div>手机展示</div>
            </div>
            <div className='exhibition-outside'>
              <div className='exhibition-inside'>
                <Icon onClick={this.handleLeftClick} className='exhibition-inside-left' type='left' />
                <div style={{width: '80%', marginLeft: '160px'}}>
                  <Carousel ref='exhibition-inside-carousel'>
                    <div>
                      <div>
                        <div style={{width: 300, height: 448, backgroundColor: '#ccc', marginRight: '50px', float: 'left'}}>
                          <img style={{width: '100%', height: '100%'}} src='https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=5a0f156f57b5c9ea7df305e3e538b622/cf1b9d16fdfaaf519d4aa2db805494eef01f7a2c.jpg' />
                        </div>
                        <div style={{width: 300, height: 448, backgroundColor: '#ccc', marginRight: '50px', float: 'left'}}>
                          <img style={{width: '100%', height: '100%'}} src='https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=5a0f156f57b5c9ea7df305e3e538b622/cf1b9d16fdfaaf519d4aa2db805494eef01f7a2c.jpg' />
                        </div>
                        <div style={{width: 300, height: 448, backgroundColor: '#ccc', marginRight: '50px', float: 'left'}}>
                          <img style={{width: '100%', height: '100%'}} src='https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=5a0f156f57b5c9ea7df305e3e538b622/cf1b9d16fdfaaf519d4aa2db805494eef01f7a2c.jpg' />
                        </div>
                      </div>
                    </div>
                    <div><div>2</div></div>
                    <div><div>3</div></div>
                    <div><div>4</div></div>
                  </Carousel>
                </div>
                <Icon onClick={this.handleRightClick} className='exhibition-inside-right' type='right' />
              </div>
            </div>
          </div>
          <div className='app-detail-introducea'>
            <h3>开发相关</h3>
            <img src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1514772015,3464222502&fm=27&gp=0.jpg' />
            <div>
              <div className='introduce-detail'>姓名：张亮</div>
              <div className='introduce-detail'>身份证号：350101 198812102822</div>
              <div className='introduce-detail'>主要联系人：张三</div>
              <div className='introduce-detail'>联系人电话：18626372263</div>
            </div>
          </div>
          <div style={{width: '100%', height: '180px', float: 'left'}}>
            <div className='app-detail-characteristica'>
              <h3>软件版权</h3>
              <img src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4242567518,763252372&fm=27&gp=0.jpg' />
            </div>
            <div className='app-detail-characteristica'>
              <h3>审核凭证</h3>
              <img src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4242567518,763252372&fm=27&gp=0.jpg' />
            </div>
          </div>
          <div className='app-detail-relevanta'>
            <h3>相关应用</h3>
            <p>
              <p className='relevant-introduce'>
                <span>超级教师 3.0</span>
                <span>2018年3月1日</span>
              </p>
              <p className='relevant-introduce'>
                <span>超级教师 2.0</span>
                <span>2018年2月1日</span>
              </p>
              <p className='relevant-introduce'>
                <span>超级教师 1.0</span>
                <span>2018年1月1日</span>
              </p>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
