import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Row, Col} from 'antd'
import { BlankBar } from 'components/software-market'
import moment from 'moment'
import ajaxUrl from 'config'
class Relate extends Component {
  render () {
    const {data, isBusiDeta} = this.props
    let info = isBusiDeta ? data.data.data[0] : []
    let img = []
    if (info && info.APP_PC_PIC !== null) {
      if (info.APP_PC_PIC.indexOf(',') > -1) {
        img = info.APP_PC_PIC.split(',')
      } else {
        img = [info.APP_PC_PIC]
      }
    }
    console.log(info)
    return (
      <div className='relate-content'>
        <Row>
          <Col span={4}>
            <strong>应用相关</strong>
          </Col>
        </Row>
        <BlankBar height='20px' />
        <Row>
          <Col span={2} offset={1}>
            应用分类:
          </Col>
          <Col span={9}>
            <span>{info && info.APP_TYPE_NAME ? info.APP_TYPE_NAME : '默认分类'}</span>
          </Col>
          <Col span={2} offset={6}>
            上架时间:
          </Col>
          <Col span={4}>
            <span>{info && info.CREATE_TIME ? moment(info.CREATE_TIME).format('YYYY-MM-DD') : '2099-9-9'}</span>
          </Col>
        </Row>
        <BlankBar height='20px' />
        <Row>
          <Col span={2} offset={1}>
            应用描述：
          </Col>
          <Col span={20}>
            <span>{info && info.APP_NOTES ? info.APP_NOTES : '软件描述'}</span>
          </Col>
        </Row>
        <BlankBar height='20px' />
        <Row>
          <Col span={2} offset={1}>
            安装说明：
          </Col>
          <Col span={20}>
            <span>{info && info.INSTALL_INFO ? info.INSTALL_INFO : '安装说明'}</span>
          </Col>
        </Row>
        <BlankBar height='20px' />
        <Row>
          <Col span={2} offset={1}>
            版本：
          </Col>
          <Col span={9}>
            <span>{info && info.APP_VERSION ? info.APP_VERSION : '安装说明'}</span>
          </Col>
          <Col span={2} offset={6}>
            测试路径:
          </Col>
          <Col span={4}>
            <span>{info && info.TEST_URL ? info.TEST_URL : '测试路径'}</span>
          </Col>
        </Row>
        <BlankBar height='20px' />
        <Row>
          <Col span={2} offset={1}>
            根路径：
          </Col>
          <Col span={4}>
            <span>{info && info.INDEX_URL ? info.INDEX_URL : '根路径'}</span>
          </Col>
        </Row>
        <BlankBar height='20px' />
        <Row>
          <Col span={2} offset={1}>
            图标:
          </Col>
          <Col>
            {
              info.APP_ICON &&
              <img style={{ width: 48, height: 42 }} alt='软件的图标' src={ajaxUrl.IMG_BASE_URL_V2 + '/' + info.APP_ICON} />
            }
          </Col>
        </Row>
        <BlankBar height='20px' />
        <Row>
          <Col span={2} offset={1}>
            界面截图：
          </Col>
          <Col span={20}>
            {img.length > 0 && img.map((item, index) => {
              return (
                item && <img key={index} style={{ width: '20%', height: 100 }} alt='pc端的界面截图' src={info && ajaxUrl.IMG_BASE_URL_V2 + item} />
              )
            })}
          </Col>
        </Row>
      </div>
    )
  }
}
Relate.propTypes = {
  data: PropTypes.object,
  isBusiDeta: PropTypes.bool
}
export default Relate
