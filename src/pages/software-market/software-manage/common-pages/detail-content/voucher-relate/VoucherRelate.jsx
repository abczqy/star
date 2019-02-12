/**
 * 相关凭证
 * 用于填充在详情弹框中
 */
import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { BlankBar } from 'components/software-market'
import PropsTypes from 'prop-types'
import ajaxUrl from 'config'

class VoucherRelate extends Component {
  render () {
    const { resData } = this.props
    return (
      <div className='ralate-wrap'>
        <Row>
          <Col span={4}>
            相关凭证
          </Col>
        </Row>
        <BlankBar height='20px' />
        <div className='relate-content'>
          <Row className='relate-move-L-4'>
            <Col span={2}>
              <span>软著凭证:</span>
            </Col>
            <Col span={6}>
              {
                resData.APP_COPYRIGHT && <img alt='软著凭证图片' style={{width: 81, height: 55}} src={resData && ajaxUrl.IMG_BASE_URL + resData.APP_COPYRIGHT} />
              }
            </Col>
            <Col span={2} offset={8}>
              <span>财务凭证:</span>
            </Col>
            <Col span={6}>
              {
                resData.AUDIT_VOUCHER && <img alt='财务凭证图片' style={{width: 81, height: 55}} src={resData && ajaxUrl.IMG_BASE_URL + resData.AUDIT_VOUCHER} />
              }
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

VoucherRelate.propTypes = {
  resData: PropsTypes.object
}
export default VoucherRelate
