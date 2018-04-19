/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Card, Icon} from 'antd'
import Unbind from './UnbindModel'
import Addbind from './AddbindModel'
import '../Operateview.scss'
export default class MessageSetting extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unbindVisible: false,
      addbindVisible: false
    }
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
  visibaleUnbindModel =() => {
    this.setState({
      unbindVisible: true
    })
  }
  /* 添加绑定 */
  visibaleaddbindModel =() => {
    this.setState({
      addbindVisible: true
    })
  }
  render () {
    let phone = '18339966666'
    let mtel = phone.substr(0, 4) + '*****' + phone.substr(8)
    let name = '李小俊'
    let strname = '**' + name.substr(name.length - 1)
    let idcard = '135841235484123547'
    let strIdcard = idcard.substr(0, 2) + '**************' + idcard.substr(14)
    let mail = '914kj@163.com'
    let strmail = mail.match(/(\S*)@/)[1]
    let strmailaf = mail.match(/@(\S*)/)[1]
    let smail = strmail.substr(0, 3) + '*****' + strmail.substr(strmail.length - 2) + '@' + strmailaf
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
                <a className='modify'> 修改</a>
              </div>
            </div>
            <div className='safe_item'>
              <div className='list-img'>
                <i />
              </div>
              <div className='safe-name'>
                <span className='tit'>手机验证</span>
                <span className='word f-color'>您验证的手机：{mtel}若已丢失或停用，请立即更换，<span className='t-color'>避免账户被盗</span></span>
                <a className='modify'> 修改</a>
              </div>
            </div>
            <div className='safe_item'>
              <div className='list-img'>
                <i />
              </div>
              <div className='safe-name'>
                <span className='tit'>实名认证</span>
                <span className='word f-color'>您认证的实名信息：{strname}  {strIdcard}</span>
                <a className='modify'> 修改</a>
              </div>
            </div>
            <div className='safe_item'>
              <div className='list-img'>
                <i />
              </div>
              <div className='safe-name'>
                <span className='tit'>邮箱验证</span>
                <span className='word f-color'>您验证的邮箱：{smail}</span>
                <a className='modify'>修改</a>
              </div>
            </div>
          </div>
        </Card>
        {/* 厂商 */}
        <Card title='基本信息' bordered={false} className='message-setting-card'>
          <div className='setting-body'>
            <div className='safe_item'>
              <div className='list-img'>
                <i />
              </div>
              <div className='safe-name'>
                <span className='tit'>厂商名称</span>
                <span className='word f-color'>福州市第一实验小学</span>
                <a className='modify'> 修改</a>
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
                  这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述。
                </div>
                <a className='modify'> 修改</a>
              </div>
            </div>
            <div className='safe_item'>
              <div className='list-img'>
                <i />
              </div>
              <div className='safe-name'>
                <span className='tit'>合同编号</span>
                <span className='word f-color'>HT217897438927189470</span>
                <a className='modify'> 修改</a>
              </div>
            </div>
            <div className='safe_item'>
              <div className='list-img'>
                <i />
              </div>
              <div className='safe-name'>
                <span className='tit'>营业执照</span>
                <span className='word f-color'><img style={{height: '50px'}} src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1713110334,402977652&fm=27&gp=0.jpg' /></span>
                <a className='modify'>修改</a>
              </div>
            </div>
          </div>
        </Card>
        {/* 家长 */}
        <Card title='学生绑定' bordered={false} className='message-setting-card'>
          <div className='setting-body'>
            <div className='stu_list'>
              <div className='photo'>
                <img style={{height: '70px'}} src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1713110334,402977652&fm=27&gp=0.jpg' alt='' />
              </div>
              <div className='stumessage'>
                <h4>王洪亮</h4>
                <p>福州市鼓楼区中山小学</p>
                <p>3年2班</p>
              </div>
              <Icon type='link' className='stulink-icon' onClick={() => { this.visibaleUnbindModel() }} />
            </div>
            <div className='stu_list addbind' onClick={() => { this.visibaleaddbindModel() }}>
              <h4><Icon type='link' className='stulink-icon-add' />添加</h4>
            </div>
          </div>
          <Unbind
            visible={this.state.unbindVisible}
            hiddenModal={this.hiddenModal.bind(this, 'unbindVisible')}
          />
          <Addbind
            visible={this.state.addbindVisible}
            hiddenModal={this.hiddenModal.bind(this, 'addbindVisible')}
          />
        </Card>
      </div>
    )
  }
}
