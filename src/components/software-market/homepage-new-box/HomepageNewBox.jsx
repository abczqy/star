import React, { Component } from 'react'
import { Col, Row, Input, Layout, Button } from 'antd'
import PropsTypes from 'prop-types'
import './HomepageNewBox.scss'

const { Header, Content } = Layout

class HomepageNewBox extends Component {
  render () {
    const { title, orderNum, dataa, datab, onChange, onChanget } = this.props
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
                  <Button size='small' disabled>删除</Button>
                </Col>
              </Row>
            </Content>
          </Layout>
        </div>
      </div>
    )
  }
}

HomepageNewBox.propTypes = {
  orderNum: PropsTypes.number,
  title: PropsTypes.string,
  dataa: PropsTypes.string,
  datab: PropsTypes.string,
  onChange: PropsTypes.func,
  onChanget: PropsTypes.func
}

export default HomepageNewBox
