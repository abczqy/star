/**
 * 工作台-个人中心-基本信息
 */
import React, { Component } from 'react'
import webStorage from 'webStorage'
import { Button, Input, Row, Col } from 'antd'
import './BaseInfo.scss'
const { TextArea } = Input

class BaseInfo extends Component {
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
          per === 'agent'
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
                <Col>
                  <Button className='base-info-content-btn'>修改</Button>
                </Col>
              </Row>
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
                  <span>用户类型:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                    XXX市代理商
                </Col>
              </Row>
              <Row className='base-info-content-top-row'>
                <Col span={4} className='base-info-content-top-label'>
                  <span>用户类型:</span>
                </Col>
                <Col span={12} className='base-info-content-top-info'>
                    XXX市代理商
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
