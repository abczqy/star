/**
 *  这是个占位用的添加小方块的+
 *  功能是点击后会出现一个可编辑的小框
 *  这里肯定是需要加入表单的--去绑定key的-- 视图层搞定后结合接口
 *  好好设计下交互
 */
import React, { Component } from 'react'
import { Col, Row, Input, Layout, Icon } from 'antd'
import PropsTypes from 'prop-types'
import './HomepageBox.scss'

const { Header, Content } = Layout

class HomepageBox extends Component {
  render () {
    const { title, orderNum, onDelete } = this.props
    return (
      <div className='box-wrap'>
        <div className='box-content-wrap'>
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
                  路径:
                </Col>
                <Col span={12}>
                  <Input />
                </Col>
                <Col span={2}>
                  <Icon type='close-circle' onClick={(orderNum) => onDelete(orderNum)} />
                </Col>
              </Row>
            </Content>
          </Layout>
        </div>
      </div>
    )
  }
}

HomepageBox.propTypes = {
  orderNum: PropsTypes.number,
  title: PropsTypes.string,
  onDelete: PropsTypes.func
}

export default HomepageBox