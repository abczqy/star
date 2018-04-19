/**
 * 老师学生确认信息弹框
 */
import React from 'react'
import { Row, Col, Modal, Button } from 'antd'
import PropTypes from 'prop-types'

export default class SureInfoWin extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    visible: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  renderItem (item, index) {
    return <Col key={index} span={12} className='sure-info-item'>{item.type}:{item.value}</Col>
  }

  render () {
    let thiz = this
    return (
      <Modal
        title='确认信息'
        visible={this.props.visible}
        onCancel={thiz.props.handleClose}
        footer={[
          <Button style={{background: '#CC0000', color: 'white'}} key='infoError' onClick={this.handleCancel}>信息有误</Button>,
          <Button key='infoOk' type='primary' onClick={thiz.props.handleInfoOk}>确认</Button>
        ]}
      >
        <Row gutter={16}>
          {
            this.props.data.map((item, index, arr) => {
              return this.renderItem(item, index)
            })
          }
        </Row>
      </Modal>
    )
  }
}