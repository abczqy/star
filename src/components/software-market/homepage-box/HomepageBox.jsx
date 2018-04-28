import React, { Component } from 'react'
import { Col, Row, Input, Layout, message, Button } from 'antd'
import PropsTypes from 'prop-types'
import './HomepageBox.scss'

import axios from 'axios'
import ajaxUrl from 'config'
const { Header, Content } = Layout

class HomepageBox extends Component {
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
                <Col span={12}>
                  <Input defaultValue={dataa
                  } onChange={onChange} />
                </Col>
              </Row>
              <Row>
                <Col span={2} offset={4}>
                  路径:
                </Col>
                <Col span={12}>
                  <Input defaultValue={datab
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
