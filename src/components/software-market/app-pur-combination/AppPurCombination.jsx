// 平台应用的购买套餐选项卡组件
import React, { Component } from 'react'
import { Card, Radio } from 'antd'
import './AppPurCombination.scss'
import imgPur1 from '../../../assets/images/my-app/u9734.png'
import imgPur2 from '../../../assets/images/my-app/u9754.png'
import imgPur3 from '../../../assets/images/my-app/u9772.png'
const { Meta } = Card

class AppPurCombination extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 1
    }
  }

  render () {
    return (
      <Radio.Group className='combination-container' defaultValue='a' buttonStyle='solid' onChange={(e) => { this.setState({type: e.target.value}) }}>
        <Radio.Button value='a'><Card hoverable className='cbnt-item'
          style={{ width: '100%', height: 'auto' }}
          cover={<img alt='example' src={imgPur1} />}
        >
          <Meta
            title='套餐一'
            description='一句话描述'
          />
          <span style={{float: 'right'}}>¥199</span>
        </Card></Radio.Button>
        <Radio.Button value='b'><Card hoverable className='cbnt-item'
          style={{ width: '100%', height: 'auto' }}
          cover={<img alt='example' src={imgPur2} />}
        >
          <Meta
            title='套餐二'
            description='一句话描述'
          />
          <span style={{float: 'right'}}>¥289</span>
        </Card></Radio.Button>
        <Radio.Button value='c'><Card hoverable className='cbnt-item'
          style={{ width: '100%', height: 'auto' }}
          cover={<img alt='example' src={imgPur3} />}
        >
          <Meta
            title='套餐三'
            description='一句话描述'
          />
          <span style={{float: 'right'}}>¥389</span>
        </Card></Radio.Button>
      </Radio.Group>
    )
  }
}
export default AppPurCombination
