/**
 * 关于样式的问题：解决方法：目前就是给内部div一个min-width 和 min-height 把父元素撑起来
 * 或者  横排公用一个div的上下border
 */
import React, { Component } from 'react'
import { Col, Row, Upload, Button, Icon, message } from 'antd'
import PropsTypes from 'prop-types'
import './BannerBox.scss'
import {deleteGatewayBanner} from 'services/software-manage'
import ajaxUrl from 'config'

// const { Header, Content } = Layout

// 测试用图片数据
// const fileList = [{
//   uid: -1,
//   name: 'xxx.png',
//   status: 'done',
//   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
// }, {
//   uid: -2,
//   name: 'yyy.png',
//   status: 'done',
//   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
// }]

class BannerBox extends Component {
  onDelete = (value) => {
    let a = value.toString()
    let params = { 'banner_id': a }
    deleteGatewayBanner(params, res => {
      console.log(res.data)
      if (res.data) {
        this.props.getList()
        message.success('删除成功')
      } else {
        message.error('删除失败')
      }
    })
  }
  render () {
    const { title, orderNum, id, url, type } = this.props
    const fileList = [{
      uid: id,
      name: type,
      status: 'done',
      url: ajaxUrl.IMG_BASE_URL + url,
      thumbUrl: ajaxUrl.IMG_BASE_URL + url
    }]
    const aaa = {
      action: 'http://p1663488m8.imwork.net:49784/addGatewayBanner',
      listType: 'picture',
      defaultFileList: [...fileList]
    }
    return (
      <div className='box-wrap'>
        <div className='banner-box-content-wrap '>
          <Row gutter={16}>
            <Col span={5}>
              <span className='left-label'>
                {title} {orderNum} :
              </span>
            </Col>
            <Col span={19}>
              <Upload {...aaa} disabled>
                <Button>
                  <Icon type='upload' /> 上传文件
                </Button>
                <div className='marks-font-type'>支持扩展名：.png .jpg...  （图片尺寸：1425*450）</div>
              </Upload>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={2} offset={7}>
              <Button size='small' onClick={() => this.onDelete(id)} > 删除</Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

BannerBox.propTypes = {
  orderNum: PropsTypes.number,
  title: PropsTypes.string,
  id: PropsTypes.number,
  getList: PropsTypes.func,
  bannerData: PropsTypes.array,
  datas: PropsTypes.object,
  url: PropsTypes.string,
  type: PropsTypes.string
}

export default BannerBox
