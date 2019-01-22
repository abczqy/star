import React from 'react'
import { Modal, Select, Input } from 'antd'
import PropTypes from 'prop-types'
import './NewAgent.scss'

const Option = Select.Option

class NewAgent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: ''
    }
  }
  onOk = () => {
    console.log(this.state.name)
    this.props.onOk(this.state.name)
  }
  render () {
    const { visible, changeVisible } = this.props
    return (
      <Modal visible={visible}
        onOk={this.onOk}
        onCancel={() => changeVisible(false)}
        destroyOnClose
        centered
        title='新增代理商'>
        <div className='new-agent-item'>
          <span className='title'>代理商名称</span>
          <Input className='input' onChange={(value) => this.setState({name: value})} />
        </div>
        <div className='new-agent-item'>
          <span className='title'>所属区域</span>
          <Select style={{width: 100, marginRight: 10}} defaultValue={'1'}>
            <Option value='1'>四川省</Option>
          </Select>
          <Select style={{width: 100, marginRight: 10}} defaultValue={'1'}>
            <Option value='1'>成都市</Option>
          </Select>
          <Select style={{width: 100}} defaultValue={'1'}>
            <Option value='1'>青羊区</Option>
          </Select>
        </div>
      </Modal>
    )
  }
}

NewAgent.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  changeVisible: PropTypes.func
}

export default NewAgent
