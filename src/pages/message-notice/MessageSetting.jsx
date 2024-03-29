/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Card, Icon} from 'antd'
import Unbind from './UnbindModel'
import Addbind from './AddbindModel'
import ChangePass from './ChangePass'
import ChangePhoneNumber from './ChangePhoneNumber'
import ChangeFirmName from './ChangeFirmName'
import ChangeFirmDescribe from './ChangeFirmDescribe'
import ChangeFirmContract from './ChangeFirmContract'
import ChangeFirmLicense from './ChangeFirmLicense'
import LookFirmLicense from './LookFirmLicense'
// import PropTypes from 'prop-types'
import Config from 'config'
import {relationQueryStu, whetherOrNotToVerify, queryFactoryMsg} from '../../services/topbar-mation/index'
import webStorage from 'webStorage'
import { withRouter } from 'react-router'
import '../../views/Operateview.scss'
class MessageSetting extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stuMation: [], // 家长权限下
      firmData: {}, // 厂商
      unbindVisible: false,
      addbindVisible: false,
      changePassVisible: false,
      changePhoneVisible: false,
      changeFirmName: false, // 厂商名称
      changeFirmDescribe: false, // 厂商描述
      changeFirmContract: false, // 厂商合同号
      changeFirmLicense: false, // 营业执照
      lookFirmLicense: false, // 查看营业执照
      phoneCheck: false,
      userSafeDate: [],
      licensePhoto: '' // 查看营业执照地址
    }
  }
  componentDidMount () {
    this.getUsermation()
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents') {
      this.getBindList()
    } else if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'vendor') {
      this.getFrimList()
    }
  }
  handleTabChange (link) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    } else {
      this.props.history.push({
        pathname: link
      })
    }
  }
  getUsermation=() => {
    whetherOrNotToVerify({}, (response) => {
      console.log(response.data)
      this.setState({
        userSafeDate: response.data
      })
    })
  }
  // 获取学生绑定数据接口 stuData 要在此接口返回
  getBindList=() => {
    relationQueryStu({
      maf_id: webStorage.getItem('STAR_WEB_PERSON_INFO').id
    }, (response) => {
      console.log('返回学生绑定信息', response)
      this.setState({
        stuData: response.data,
        maf_id: webStorage.getItem('STAR_WEB_PERSON_INFO').id
      })
    })
  }
  // 厂商权限下，获取厂商基本信息模块
  getFrimList=() => {
    queryFactoryMsg({}, (response) => {
      this.setState({
        firmData: response.data,
        fa_name: response.data.fa_name,
        fa_desc: response.data.fa_desc,
        fa_con_num: response.data.fa_con_num,
        fa_contract: response.data.fa_contract
      })
    })
  }
  hiddenModal (type) {
    this.setState({
      [type]: false
    })
  }
  /* 解绑弹出框 */
  visibaleUnbindModel =(id, name) => {
    console.log('解除绑定，学生id', id)
    this.setState({
      stuName: name,
      unbindVisible: true,
      stu_id: id,
      maf_id: this.state.maf_id
    })
  }
  /* 添加绑定 */
  visibaleaddbindModel =() => {
    this.setState({
      addbindVisible: true,
      maf_id: this.state.maf_id
    })
  }
  /* 修改密码 */
  changepass =() => {
    this.setState({
      changePassVisible: true
    })
  }
  /* 修改手机 */
  changephone =() => {
    this.setState({
      changePhoneVisible: true
    })
  }
  /* 修改厂商名称 */
  changefirmname =() => {
    this.setState({
      changeFirmName: true
    })
  }
  /* 修改描述 */
  changefirmdescribe =() => {
    this.setState({
      changeFirmDescribe: true
    })
  }
  /* 修改合同编号 */
  changeFirmcontract =() => {
    this.setState({
      changeFirmContract: true
    })
  }
  /* 营业执照 */
  changeFirmLicense =() => {
    this.setState({
      changeFirmLicense: true
    })
  }
  /* 查看营业执照 */
  lookFirmLicense =(va) => {
    if (va) {
      this.setState({
        lookFirmLicense: true,
        licensePhoto: va
      })
    }
  }
  render () {
    let phone = ''
    let mtel = ''
    let idcard = ''
    let strIdcard = ''
    let name = ''
    let strname = ''
    if (this.state.userSafeDate.length > 0) {
      let userData = this.state.userSafeDate[0]
      phone = userData.NUM
      mtel = phone.substr(0, 4) + '*****' + phone.substr(8)
      idcard = userData.IDCARD
      strIdcard = idcard.substr(0, 2) + '**************' + idcard.substr(14)
      name = userData.NAME
      strname = '**' + name.substr(name.length - 1)
    }
    let model
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents') {
      let stuData = this.state.stuData
      model = (
        <Card title='学生绑定' className='message-setting-card'>
          <div className='setting-body'>
            {stuData && stuData.map((item, index) => {
              return (<div key={index} className='stu_list'>
                <div className='photo'>
                  {/* <img style={{height: '70px', width: '55px'}} src={item.stu_photo} alt='' /> */}
                </div>
                <div className='stumessage'>
                  <h4>{item.stu_name}</h4>
                  <p>{item.sh_id}</p>
                  <p>{item.stu_class}</p>
                </div>
                <Icon type='link' title='解绑' className='stulink-icon' onClick={() => { this.visibaleUnbindModel(item.stu_id, item.stu_name) }} />
              </div>)
            })
            }
            <div className='stu_list addbind' onClick={() => { this.visibaleaddbindModel() }}>
              <h4><Icon type='link' className='stulink-icon-add' />添加</h4>
            </div>
          </div>
        </Card>
      )
    } else if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'vendor') {
      let firmData = this.state.firmData
      model = (<Card title='基本信息' className='message-setting-card'>
        <div className='setting-body'>
          <div className='safe_item'>
            <div className='list-img'>
              <i />
            </div>
            <div className='safe-name'>
              <span className='tit'>厂商名称</span>
              <span className='word f-color'>{firmData && firmData.fa_name}</span>
              <a className='modify' onClick={this.changefirmname}> 修改</a>
            </div>
          </div>
          <div className='safe_item'>
            <div className='list-img'>
              <i />
            </div>
            <div className='safe-name'>
              <span className='tit'>厂商描述</span>
              <div className='word f-color describe' >
                <span style={{height: '1rem'}} />
                {firmData && firmData.fa_desc}
              </div>
              <a className='modify' onClick={this.changefirmdescribe}> 修改</a>
            </div>
          </div>
          <div className='safe_item'>
            <div className='list-img'>
              <i />
            </div>
            <div className='safe-name'>
              <span className='tit'>合同编号</span>
              <span className='word f-color'>{firmData && firmData.fa_con_num}</span>
              <a className='modify' onClick={this.changeFirmcontract}> 修改</a>
            </div>
          </div>
          <div className='safe_item'>
            <div className='list-img'>
              <i />
            </div>
            <div className='safe-name'>
              <span className='tit'>营业执照</span>
              <span className='word f-color' onClick={() => { this.lookFirmLicense(firmData && firmData.fa_contract) }}>
                <img style={{height: '50px'}} src={Config.IMG_BASE_URL + (firmData && firmData.fa_contract)} />
              </span>
              <a className='modify' onClick={this.changeFirmLicense}>重新上传</a>
            </div>
          </div>
        </div>
      </Card>)
    }
    return (
      <div className='center-view mb20'>
        <Card title='账号安全' className='message-setting-card'>
          <div className='setting-body'>
            <div className='safe_item'>
              <div className='list-img'>
                <i />
              </div>
              <div className='safe-name'>
                <span className='tit'>登录密码</span>
                <span className='word'>互联网账号存在被盗风险，建议您定期修改密码以保护账户安全</span>
                <a className='modify' onClick={this.changepass}> 修改</a>
              </div>
            </div>
            <div className='safe_item'>
              <div className={phone !== '' ? 'list-img' : 'list-img-err'} >
                <i />
              </div>
              <div className='safe-name'>
                <span className='tit'>手机验证</span>
                <span className={phone === '' ? 'word f-color' : 'pbonehidden'}><span className='t-color'>您未绑定手机，请绑定！避免账户被盗</span></span>
                <span className={phone !== '' ? 'word f-color' : 'pbonehidden'}>您验证的手机：{mtel}若已丢失或停用，请立即更换，<span className='t-color'>避免账户被盗</span></span>
                <a className='modify' onClick={this.changephone}> 修改</a>
              </div>
            </div>
            <div className='safe_item'>
              <div className='list-img'>
                <i />
              </div>
              <div className='safe-name'>
                <span className='tit'>实名认证</span>
                <span className='word f-color'>您认证的实名信息：{strname}  {strIdcard}</span>
              </div>
            </div>
          </div>
        </Card>
        {/* 家长 ,厂商 */}
        { model}
        {/* <div style={{textAlign: 'center', marginTop: '20px'}}>
          <Button type='primary'onClick={this.handleTabChange.bind(this, '/home')}>返回门户首页</Button>
        </div> */}
        <Unbind
          visible={this.state.unbindVisible}
          hiddenModal={this.hiddenModal.bind(this, 'unbindVisible')}
          stu_id={this.state.stu_id}
          maf_id={this.state.maf_id}
          stuName={this.state.stuName}
          getBindList={this.getBindList}
        />
        <Addbind
          visible={this.state.addbindVisible}
          hiddenModal={this.hiddenModal.bind(this, 'addbindVisible')}
          getBindList={this.getBindList}
          maf_id={this.state.maf_id}
        />
        {this.state.changePassVisible ? <ChangePass
          visible={this.state.changePassVisible}
          hiddenModal={this.hiddenModal.bind(this, 'changePassVisible')}
        /> : null}
        {this.state.changePhoneVisible ? <ChangePhoneNumber
          visible={this.state.changePhoneVisible}
          hiddenModal={this.hiddenModal.bind(this, 'changePhoneVisible')}
        /> : null}
        {/* 修改厂商名称 */}
        {this.state.changeFirmName ? <ChangeFirmName
          visible={this.state.changeFirmName}
          hiddenModal={this.hiddenModal.bind(this, 'changeFirmName')}
          getFirmList={this.getFrimList}
        /> : null}
        {/* 修改厂商描述 */}
        {this.state.changeFirmDescribe ? <ChangeFirmDescribe
          visible={this.state.changeFirmDescribe}
          hiddenModal={this.hiddenModal.bind(this, 'changeFirmDescribe')}
          getFirmList={this.getFrimList}
        /> : null}
        {/* 修改厂商合同编号 */}
        {this.state.changeFirmContract ? <ChangeFirmContract
          visible={this.state.changeFirmContract}
          hiddenModal={this.hiddenModal.bind(this, 'changeFirmContract')}
          getFirmList={this.getFrimList}
        /> : null}
        {/* 营业执照 */}
        {this.state.changeFirmLicense ? <ChangeFirmLicense
          visible={this.state.changeFirmLicense}
          hiddenModal={this.hiddenModal.bind(this, 'changeFirmLicense')}
          getFirmList={this.getFrimList}
        /> : null}
        {/* 营业执照图片 */}
        {this.state.lookFirmLicense ? <LookFirmLicense
          visible={this.state.lookFirmLicense}
          hiddenModal={this.hiddenModal.bind(this, 'lookFirmLicense')}
          licensePhoto={this.state.licensePhoto}
        /> : null}
      </div>
    )
  }
}
export default withRouter(MessageSetting)
