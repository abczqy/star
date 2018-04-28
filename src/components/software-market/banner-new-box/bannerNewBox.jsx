/**
 * 关于样式的问题：解决方法：目前就是给内部div一个min-width 和 min-height 把父元素撑起来
 * 或者  横排公用一个div的上下border
 */
import React, { Component } from 'react'
import { Col, Row, Upload, Button, Icon, message } from 'antd'
import PropsTypes from 'prop-types'
import './BannerNewBox.scss'

import axios from 'axios'
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

// const uploadConfig = {
//   action: '//jsonplaceholder.typicode.com/posts/',
//   listType: 'picture',
//   defaultFileList: [...fileList]
// }

class BannerNewBox extends Component {
    onDelete = (value) => {
      let a = value.toString()
      axios.post(ajaxUrl.deleteGatewayNavigation, { 'navigation_id': a }).then(
        res => {
          console.log(res.data)
          if (res.data) {
            this.props.getList()
            message.success('删除成功')
          } else {
            message.error('删除失败')
          }
        }
      ).catch(e => { console.log(e) })
    }
    render () {
      const { title, orderNum, datas, handleOk } = this.props

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
                <Upload {...datas} >
                  <Button>
                    <Icon type='upload' /> 上传文件
                  </Button>
                  <div className='marks-font-type'>支持扩展名：.png .jpg...  （图片尺寸：1425*450）</div>
                </Upload>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={2} offset={7}>
                <Button size='small' disabled > 删除</Button>
                <Button onClick={handleOk}>暂存</Button>
              </Col>
            </Row>
          </div>
        </div>
      )
    }
}

BannerNewBox.propTypes = {
  orderNum: PropsTypes.number,
  title: PropsTypes.string,
  getList: PropsTypes.object,
  datas: PropsTypes.object,
  handleOk: PropsTypes.func
}

export default BannerNewBox
