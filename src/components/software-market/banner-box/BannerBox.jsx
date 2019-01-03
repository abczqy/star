/**
 * 关于样式的问题：解决方法：目前就是给内部div一个min-width 和 min-height 把父元素撑起来
 * 或者  横排公用一个div的上下border
 */
import React, { Component } from 'react'
import { Col, Row, Upload, Button, Icon, Popconfirm, message } from 'antd'
import PropsTypes from 'prop-types'
import './BannerBox.scss'
// import ajaxUrl from 'config'
import config from '../../../../config/index'
const {IMG_BASE_URL_V2} = config

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
  cancelUp=(e) => {
    message.warn('您打消了删除这一条banner的这个决定。')
  }
  render () {
    const { title, orderNum, id, url, onDelete } = this.props
    const fileList = [{
      uid: id,
      name: url,
      status: 'done',
      url: IMG_BASE_URL_V2 + url,
      thumbUrl: IMG_BASE_URL_V2 + url
    }]
    const aaa = {
      action: '333333333',
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
                  <Icon type='upload' /> 上传图片
                </Button>
                <div className='marks-font-type'>支持扩展名：.png .jpg...  （图片尺寸：1425*450）</div>
              </Upload>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={2} offset={7}>
              <Popconfirm title='您确定要删除此banner吗?' onConfirm={() => onDelete(id)} onCancel={this.cancelUp} okText='确定' cancelText='取消'>
                <Button size='small'>删除</Button>
              </Popconfirm>
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
  type: PropsTypes.string,
  onDelete: PropsTypes.func
}

export default BannerBox
