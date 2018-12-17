/**
 * 工作台-个人中心-基本信息
 */
import React, { Component } from 'react'
import webStorage from 'webStorage'
import { Button, Input, Row, Col } from 'antd'
import './BaseInfo.scss'
const { TextArea } = Input

class BaseInfo extends Component {
  // 根据用户角色显示对应的姓名字段
  showName = (role) => {
    switch (role) {
      case 'school': case 'eduBureau':
        return '运营者姓名'
      case 'teacher': case 'parents': case 'students':
        return '姓名'
      case 'agent':
        return '代理商姓名'
      default:
        break
    }
  }

  // 根据用户角色不同显示不同的手机字段
  showMobileName = (role) => {
    switch (role) {
      case 'school': case 'eduBureau':
        return '运营者手机号'
      case 'teacher': case 'parents': case 'students':
        return '手机号'
      case 'agent':
        return '代理商手机号'
      default:
        break
    }
  }

  render () {
    let per = webStorage.getItem('STAR_WEB_ROLE_CODE')
    return (
      <div className='base-info'>
        <div className='base-info-top'>
          <div className='base-info-title'>基本信息</div>
          <Button className='base-info-btn back-btn'>返回</Button>
          <Button type='primary' className='base-info-btn'>保存</Button>
        </div>
        {
          per === 'vendor'
            ? <div className='setting-body'>
              <div className='safe_item'>
                <div className='list-img'>
                  <i />
                </div>
                <div className='safe-name'>
                  <span className='tit'>厂商名称</span>
                  <span className='word f-color'>福州市第一实验小学</span>
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
                    这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述
                    这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述这是一段厂商描述
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
                  <span className='word f-color'>HT217897438927189470</span>
                  <a className='modify' onClick={this.changeFirmcontract}> 修改</a>
                </div>
              </div>
              <div className='safe_item'>
                <div className='list-img'>
                  <i />
                </div>
                <div className='safe-name'>
                  <span className='tit'>营业执照</span>
                  <span className='word f-color'>
                    {/* <img style={{height: '50px'}} src={Config.IMG_BASE_URL + (firmData && firmData.fa_contract)} /> */}
                  </span>
                  <a className='modify' onClick={this.changeFirmLicense}>重新上传</a>
                </div>
              </div>
            </div>
            : <div className='base-info-content'>
              <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>用户类型:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  XXX市代理商
                </Col>
              </Row>
              <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>名称:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  烽火
                </Col>
                <Col className='base-info-content-change'>
                  <Button className='base-info-content-btn'>修改</Button>
                </Col>
              </Row>
              <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>{this.showName(per)}:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  张立冬
                </Col>
                <Col className='base-info-content-change'>
                  <Button className='base-info-content-btn'>修改</Button>
                </Col>
              </Row>
              <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>{this.showMobileName(per)}:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  <span className='info-tips'>您验证的手机:</span>
                  <span>180****9090</span>
                  <span className='info-tips'>若已丢失或停用，请立即更换,</span>
                  <span className='info-warn'>避免账户被盗</span>
                </Col>
                <Col className='base-info-content-change'>
                  <Button className='base-info-content-btn'>修改</Button>
                </Col>
              </Row>
              <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>邮箱验证:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  <span className='info-tips'>您验证的邮箱:</span>
                  <span>18901102890@163.com</span>
                  <span className='info-tips'>若已丢失或停用，请立即更换,</span>
                  <span className='info-warn'>避免账户被盗</span>
                </Col>
                <Col className='base-info-content-change'>
                  <Button className='base-info-content-btn'>修改</Button>
                </Col>
              </Row>
              <Row className='base-info-content-top-row base-bottom'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>描述:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                  <TextArea />
                </Col>
              </Row>
            </div>
        }
      </div>
    )
  }
}
export default BaseInfo
