/**
 * 游客登录页软件市场
 */
import React from 'react'
import { Row, Col, List, Avatar } from 'antd'

export default class SoftMarket extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div className='soft-market-container'>
        <div className='soft-market-header'>
          <span>
            <div>软件市场</div>
            <div>Software Market</div>
          </span>
          <span><div>+</div></span>
        </div>
        <div className='soft-market-content'>
          <Row type='flex' justify='space-around'>
            <Col span={6}>
              <div className='item'>
                <List
                  className='soft-market-list-container'
                  dataSource={[{
                    src: '/static/images/u143.png',
                    title: '打字大师',
                    description: 'hhhhhhhhh'
                  }]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar className='img' src={item.src} />}
                        title={<a className='title' href=''>{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
            <Col span={6}>
              <div className='item'>
                <List
                  className='soft-market-list-container'
                  dataSource={[{
                    src: '/static/images/u143.png',
                    title: '打字大师',
                    description: 'hhhhhhhhh'
                  }]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar className='img' src={item.src} />}
                        title={<a className='title' href=''>{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
            <Col span={6}>
              <div className='item'>
                <List
                  className='soft-market-list-container'
                  dataSource={[{
                    src: '/static/images/u143.png',
                    title: '打字大师',
                    description: 'hhhhhhhhh'
                  }]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar className='img' src={item.src} />}
                        title={<a className='title' href=''>{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>
          <Row type='flex' justify='space-around'>
            <Col span={6}>
              <div className='item'>
                <List
                  className='soft-market-list-container'
                  dataSource={[{
                    src: '/static/images/u143.png',
                    title: '打字大师',
                    description: 'hhhhhhhhh'
                  }]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar className='img' src={item.src} />}
                        title={<a className='title' href=''>{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
            <Col span={6}>
              <div className='item'>
                <List
                  className='soft-market-list-container'
                  dataSource={[{
                    src: '/static/images/u143.png',
                    title: '打字大师',
                    description: 'hhhhhhhhh'
                  }]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar className='img' src={item.src} />}
                        title={<a className='title' href=''>{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
            <Col span={6}>
              <div className='item'>
                <List
                  className='soft-market-list-container'
                  dataSource={[{
                    src: '/static/images/u143.png',
                    title: '打字大师',
                    description: 'hhhhhhhhh'
                  }]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar className='img' src={item.src} />}
                        title={<a className='title' href=''>{item.title}</a>}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
