/**
 * 软件相关
 * 用于填充在详情弹框中
 */
import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import { BlankBar } from 'components/software-market'
import PropsTypes from 'prop-types'
import moment from 'moment'
import ajaxUrl from 'config'

class SWRelate extends Component {
  render () {
    const { resData, isWaitItera, isBusiDeta } = this.props
    console.log(resData.data.data[0])
    let data = resData.data.data[0]
    // +++转换接收到的兼容系统sw_path参数内容为数组+++
    // 第一步把获取到的sw_path以逗号为分隔符分割
    // let pathArray = []
    // pathArray = resData && resData.sw_path ? resData.sw_path.split(',') : []
    let swPath = data.RUNNING_PLATFORM
    // 刨除第一个元素剩余的内容
    let swPathRest = []
    // for (let i = 0; i < pathArray.length; i++) {
    //   // 第二步以冒号为分隔符分割
    //   swPath.push(pathArray[i].split(':'))
    // }
    // // 给swPathRest赋值
    // for (let i = 1; i < swPath.length; i++) {
    //   swPathRest.push(swPath[i])
    // }

    // 转换接收到的PC端界面截图sw_computer_photo参数类型为数组
    let computerPho = []
    computerPho = data && data.APP_PC_PIC ? data.APP_PC_PIC.split(',') : []

    return (
      <div className='ralate-wrap'>
        <Row>
          <Col span={4}>
            软件相关
          </Col>
        </Row>
        <BlankBar height='20px' />
        <div className='relate-content'>
          <Row>
            <Col span={2} offset={1}>
              软件分类:
            </Col>
            <Col span={9}>
              <span>{data && data.APP_TYPE_NAME ? data.APP_TYPE_NAME : '默认分类'}</span>
            </Col>
            <Col span={2} offset={6}>
              上架时间:
            </Col>
            <Col span={4}>
              <span>{data && data.CREATE_TIME ? moment(data.CREATE_TIME).format('YYYY-MM-DD') : '2099-9-9'}</span>
            </Col>
          </Row>
          <BlankBar height='20px' />
          <Row>
            <Col span={2} offset={1}>
              <span>软件描述:</span>
            </Col>
            <Col span={19}>
              <span>{data && data.APP_NOTES ? data.APP_NOTES : '此软件用于教学，可以让学生寓教于乐'}</span>
            </Col>
          </Row>
          <BlankBar height='20px' />
          {isWaitItera || isBusiDeta ? <Row>
            <Col span={2} offset={1}>
              <span>兼容系统:</span>
            </Col>
            <Col span={9}>
              <span>{swPath !== undefined ? swPath : 'Windows32'}:</span>
              <span><Icon type='paper-clip' /></span>
              <span>{data && data.APP_DOWNLOAD_ADDRESS ? data.APP_DOWNLOAD_ADDRESS : 'PC端.dmg'}</span>
              {/* {!isBusiDeta ? <a href={swPath && swPath[0] && ajaxUrl.IMG_BASE_URL + swPath[0][1]}><Icon type='download' /></a> : null} */}
            </Col>
            <Col span={2} offset={6}>
              版本号:
            </Col>
            <Col span={4}>
              <span>{data.APP_VERSION}</span>
            </Col>
          </Row> : null}
          {isWaitItera || isBusiDeta ? <Row>
            <Col span={9} offset={3}>
              {swPathRest.length > 0 && swPathRest.map((item, index) => {
                let fileName = item && item[1].substr(item[1].lastIndexOf('/') + 1)
                return <span key={index}>
                  <span>{item && item[0]}:</span>
                  <span><Icon type='paper-clip' /></span>
                  <span>{fileName}</span>
                  {!isBusiDeta ? <a href={item && ajaxUrl.IMG_BASE_URL + item[1]}><Icon type='download' /></a> : null}
                </span>
              })}
            </Col>
          </Row> : null}
          <BlankBar height='20px' />
          <Row>
            <Col span={2} offset={1}>
              <span>软件图标:</span>
            </Col>
            <Col>
              {
                data.APP_ICON &&
                <img style={{ width: 48, height: 42 }} alt='软件的图标' src={ajaxUrl.IMG_BASE_URL_V2 + '/' + data.APP_ICON} />
              }
            </Col>
          </Row>
          <BlankBar height='20px' />
          {isWaitItera || isBusiDeta ? <Row className='sw-relate-move-L'>
            <Col span={3}>
              <span>PC端界面截图:</span>
            </Col>
            <Col>
              {computerPho.length > 0 && computerPho.map((item, index) => {
                return (
                  item && <img key={index} style={{ width: '20%', height: 100 }} alt='pc端的界面截图' src={resData && ajaxUrl.IMG_BASE_URL_V2 + item} />
                )
              })}
            </Col>
          </Row> : null}
        </div>
      </div>
    )
  }
}

SWRelate.propTypes = {
  resData: PropsTypes.object,
  isWaitItera: PropsTypes.bool,
  isBusiDeta: PropsTypes.bool
}

export default SWRelate
