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
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'
import ajaxUrl from 'config'
import webStorage from 'webStorage'
import '../Operateview.scss'
class MessageSetting extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stuMation: [], // 家长权限下
      firmData: [], // 厂商
      unbindVisible: false,
      addbindVisible: false,
      changePassVisible: false,
      changePhoneVisible: false,
      changeFirmName: false, // 厂商名称
      changeFirmDescribe: false, // 厂商描述
      changeFirmContract: false, // 厂商合同号
      changeFirmLicense: false // 营业执照
    }
  }
  componentDidMount () {
    console.log(111111111111, webStorage.getItem('STAR_WEB_PERSON_INFO'))
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents') {
      this.getBindList()
    } else if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'vendor') {
      this.getFrimList()
    }
  }
  // 获取学生绑定数据接口 stuData 要在此接口返回
  getBindList=() => {
    axios.post(ajaxUrl.relationQueryStu, {
      maf_id: webStorage.getItem('STAR_WEB_PERSON_INFO').id
    }).then((response) => {
      console.log('返回学生绑定信息', response)
      this.setState({
        stuData: response.data,
        maf_id: webStorage.getItem('STAR_WEB_PERSON_INFO').id
      })
    })
  }
  // 厂商权限下，获取厂商基本信息模块
  getFrimList=() => {
    // axios.post(ajaxUrl.registerValitemail, {
    //   params: {stu: '123'}
    // }).then((response) => {
    //   console.log('返回厂商信息', response)
    //   this.setState({
    //     firmData: [{
    //       firmid: '1',
    //       firmName: '福州市第一实验小学',
    //       firmDiscribe: '这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述。',
    //       firmContract: 'HT217897438927189470',
    //       photo: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1713110334,402977652&fm=27&gp=0.jpg'
    //     }]
    //   })
    // })
  }

  handleTabChange (link) {
    if (link === this.props.location.pathname) {
      window.location.reload()
    }
    window.location.href = 'http://localhost:8080/#' + link
  }
  hiddenModal (type) {
    this.setState({
      [type]: false
    })
  }
  /* 解绑弹出框 */
  visibaleUnbindModel =(id) => {
    console.log('解除绑定，学生id', id)
    this.setState({
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
  render () {
    let phone = '18339966666'
    let mtel = phone.substr(0, 4) + '*****' + phone.substr(8)
    let name = '李小俊'
    let strname = '**' + name.substr(name.length - 1)
    let idcard = '135841235484123547'
    let strIdcard = idcard.substr(0, 2) + '**************' + idcard.substr(14)
    // let userType = this.props.roleCode
    let model
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents') {
      let stuData = this.state.stuData
      model = (
        <Card title='学生绑定' bordered={false} className='message-setting-card'>
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
                <Icon type='link' className='stulink-icon' onClick={() => { this.visibaleUnbindModel(item.stu_id) }} />
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
      let firmData = this.state.firmData[0]
      model = (<Card title='基本信息' bordered={false} className='message-setting-card'>
        <div className='setting-body'>
          <div className='safe_item'>
            <div className='list-img'>
              <i />
            </div>
            <div className='safe-name'>
              <span className='tit'>厂商名称</span>
              <span className='word f-color'>{firmData && firmData.firmName}</span>
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
                {firmData && firmData.firmDiscribe}
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
              <span className='word f-color'>{firmData && firmData.firmContract}</span>
              <a className='modify' onClick={this.changeFirmcontract}> 修改</a>
            </div>
          </div>
          <div className='safe_item'>
            <div className='list-img'>
              <i />
            </div>
            <div className='safe-name'>
              <span className='tit'>营业执照</span>
              <span className='word f-color'><img style={{height: '50px'}} src={firmData && firmData.photo} /></span>
              <a className='modify' onClick={this.changeFirmLicense}>重新上传</a>
            </div>
          </div>
        </div>
      </Card>)
    }
    return (
      <div className='center-view mb20'>
        <Card title='账号安全' bordered={false} className='message-setting-card'>
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
              <div className='list-img'>
                <i />
              </div>
              <div className='safe-name'>
                <span className='tit'>手机验证</span>
                <span className='word f-color'>您验证的手机：{mtel}若已丢失或停用，请立即更换，<span className='t-color'>避免账户被盗</span></span>
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
        <Unbind
          visible={this.state.unbindVisible}
          hiddenModal={this.hiddenModal.bind(this, 'unbindVisible')}
          stu_id={this.state.stu_id}
          maf_id={this.state.maf_id}
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
      </div>
    )
  }
}
MessageSetting.propTypes = {
  // roleCode: PropTypes.string
}
const mapStateToProps = state => ({
  roleCode: state.role.code
})
export default connect(
  mapStateToProps
)(MessageSetting)
