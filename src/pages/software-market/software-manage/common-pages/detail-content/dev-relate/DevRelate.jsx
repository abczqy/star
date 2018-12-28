/**
 * 开发人员相关信息
 * 用于填充在详情弹框中
 */
import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { BlankBar } from 'components/software-market'
import PropsTypes from 'prop-types'
import ajaxUrl from 'config'

class DevRelate extends Component {
  render () {
    const { resData } = this.props
    return (
      <div className='ralate-wrap'>
        <Row>
          <Col span={4}>
            开发人员相关信息
          </Col>
        </Row>
        <BlankBar height='20px' />
        <div className='relate-content'>
          <Row className='relate-move-L-7'>
            <Col span={1}>
            姓名:
            </Col>
            <Col span={9}>
              <span className='relate-move-L-4'>{resData && resData.developers ? resData.developers : '邹子墨'}</span>
            </Col>
            <Col span={3} offset={5} className='relate-move-L-3'>
            身份证号:
            </Col>
            <Col span={4}>
              <span>{resData && resData.dev_idcard ? resData.dev_idcard : '110101199409090248'}</span>
            </Col>
          </Row>
          <BlankBar height='20px' />
          <Row>
            <Col span={3} className='relate-move-L-3'>
              <span>联系人电话:</span>
            </Col>
            <Col span={7}>
              <span>{resData && resData.dev_contact_phone ? resData.dev_idcard : '15573767637'}</span>
            </Col>
            <Col span={3} offset={5} className='relate-move-L-4'>
              主要联系人:
            </Col>
            <Col span={4} className='relate-move-L-2'>
              <span>{resData && resData.dev_contact ? resData.dev_contact : '徐子陵'}</span>
            </Col>
          </Row>
          <BlankBar height='20px' />
          <Row>
            <Col span={3}>
              <span>手持身份证照片:</span>
            </Col>
            <Col>
              {
                resData.dev_photo &&
                <img alt='身份证照片' src={resData && ajaxUrl.IMG_BASE_URL + resData.dev_photo}
                />}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

DevRelate.propTypes = {
  resData: PropsTypes.object
}

export default DevRelate
