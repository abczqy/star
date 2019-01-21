import React, { Component } from 'react'
import { Col, Row, Input, Layout, message, Button } from 'antd'
import PropsTypes from 'prop-types'
import './HomepageBox.scss'
import {deleteGatewayNavigation} from 'services/software-manage'
const { Header, Content } = Layout

class HomepageBox extends Component {
  onDelete = (value) => {
    let a = value.toString()
    let params = { 'navigation_id': a }
    deleteGatewayNavigation(params, res => {
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
    const { title, orderNum, dataa, datab, id, onChange, onChanget } = this.props
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
                <Col span={14}>
                  <Input defaultValue={dataa
                  } onChange={onChange} disabled />
                </Col>
              </Row>
              <Row>
                <Col span={2} offset={4}>
                  路径:
                </Col>
                <Col span={14}>
                  <Input disabled defaultValue={datab
                  } onChange={onChanget} />
                </Col>
              </Row>
              <Row>
                <Col span={2} offset={6}>
                  <Button size='small' onClick={() => { this.onDelete(id) }}>删除</Button>
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
  dataa: PropsTypes.string,
  datab: PropsTypes.string,
  id: PropsTypes.number,
  getList: PropsTypes.func,
  onChange: PropsTypes.func,
  onChanget: PropsTypes.func
}

export default HomepageBox
