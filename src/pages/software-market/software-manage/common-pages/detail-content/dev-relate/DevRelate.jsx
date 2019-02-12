/**
 * 开发人员相关信息
 * 用于填充在详情弹框中
 */
import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { BlankBar } from 'components/software-market'
import PropsTypes from 'prop-types'
import ajaxUrl from 'config/index'

class DevRelate extends Component {
  render () {
    const { resData } = this.props
    const data = (resData.data && resData.data.data) ? resData.data.data[0] : {}
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
              <span className='relate-move-L-4'>{data.DEVELOPER_NAME ? data.DEVELOPER_NAME : ''}</span>
            </Col>
            <Col span={3} offset={5} className='relate-move-L-3'>
            身份证号:
            </Col>
            <Col span={4}>
              <span>{data.DEVELOPER_ID_NUMBER ? data.DEVELOPER_ID_NUMBER : ''}</span>
            </Col>
          </Row>
          <BlankBar height='20px' />
          <Row>
            <Col span={3} className='relate-move-L-3'>
              <span>联系人电话:</span>
            </Col>
            <Col span={7}>
              <span>{data.DEVELOPER_PHONE ? data.DEVELOPER_PHONE : ''}</span>
            </Col>
            <Col span={3} offset={5} className='relate-move-L-4'>
              主要联系人:
            </Col>
            <Col span={4} className='relate-move-L-2'>
              <span>{data.MAIN_CONTACT ? data.MAIN_CONTACT : ''}</span>
            </Col>
          </Row>
          <BlankBar height='20px' />
          <Row>
            <Col span={3}>
              <span>手持身份证照片:</span>
            </Col>
            <Col>
              {
                data.DEVELOPER_ID_PIC &&
                <img alt='身份证照片' src={data && ajaxUrl.IMG_BASE_URL_V2 + data.DEVELOPER_ID_PIC} style={{maxHeight: 100}}
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
