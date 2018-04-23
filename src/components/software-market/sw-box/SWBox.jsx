import React, { Component } from 'react'
import { Col, Row, Input, Layout, Icon, Upload, Button } from 'antd'
import PropsTypes from 'prop-types'
import './SWBox.scss'

const { Header, Content } = Layout

// 测试用图片数据
const fileList = [{
  uid: -1,
  name: 'xxx.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
}, {
  uid: -2,
  name: 'yyy.png',
  status: 'done',
  url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
}]

const uploadConfig = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  defaultFileList: [...fileList]
}

class SWBox extends Component {
  render () {
    const { title, orderNum, onDelete } = this.props
    return (
      <div className='sw-box-wrap'>
        <div className='sw-content-wrap'>
          <Layout>
            <Header>
              <Row>
                {title}{orderNum}:
              </Row>
            </Header>
            <Content>
              <Row>
                <Col span={2} offset={4}>
                  标题:
                </Col>
                <Col span={12}>
                  <Input />
                </Col>
              </Row>
              <Row>
                <Col span={2} offset={4}>
                  描述:
                </Col>
                <Col span={12}>
                  <Input />
                </Col>
              </Row>
              <Row>
                <Col span={2} offset={4}>
                  路径:
                </Col>
                <Col span={12}>
                  <Input />
                </Col>
                <Col span={2}>
                  <Icon type='close-circle' onClick={(orderNum) => onDelete(orderNum)} />
                </Col>
              </Row>
              <Row gutter={16} className='row-move-L'>
                <Col span={4} offset={2}>
                  <span className='sw-left-label'>
                  软件图片:
                  </span>
                </Col>
                <Col span={12}>
                  <Upload {...uploadConfig} >
                    <Button>
                      <Icon type='upload' /> 上传文件
                    </Button>
                    <div className='marks-font-type'>支持扩展名：.png .jpg... （图片尺寸：50*50）</div>
                  </Upload>
                </Col>
              </Row>
            </Content>
          </Layout>
        </div>
      </div>
    )
  }
}

SWBox.propTypes = {
  orderNum: PropsTypes.number,
  title: PropsTypes.string,
  onDelete: PropsTypes.func
}

export default SWBox
