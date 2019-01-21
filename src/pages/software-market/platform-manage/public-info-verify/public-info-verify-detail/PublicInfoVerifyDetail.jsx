import React, { Component } from 'react'
import { Card, Icon, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import PropsTypes from 'prop-types'
import {
  detEmInfoList,
  passEmInfoList
} from 'services/software-manage'
import { PublicInfoVerifyView } from 'components/software-market'

class PublicInfoVerifyDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  /**
   * 审核决定 -- 驳回（0）/通过（1）
   * @param {int} infoState 驳回（0）/通过（1）
   */
  verifyDecision = (infoState) => {
    const param = {
      info_id: this.state.data.info_id,
      info_state: infoState
    }
    passEmInfoList(param, (res) => {
      const info = res.data
      console.log('审核结果' + info)
      if (infoState === 1) {
        message.success(info)
      } else {
        message.error(info)
      }
    })
  }
  componentDidMount () {
    // 获取原有的要编辑的数据
    const searchId = this.props.location.search.replace('?', '')
    detEmInfoList({info_id: searchId}, (res) => {
      const data = res.data
      this.setState({
        data: data
      })
    })
  }
  render () {
    const { data } = this.state
    return (
      <div className='news-list-wrap' >
        <Card title='审核信息' extra={<Link to='/software-market-home/platform-manage/public-info-verify'><Icon type='double-left' />返回列表页</Link>}>
          <div className='edit-head-wrap'>
            <PublicInfoVerifyView
              title={data.info_title}
              desc={data.info_desc}
              attach={data.info_attachment}
            />
          </div>
        </Card>
        <div className='foot-bar'>
          <span>
            <Link to='/software-market-home/platform-manage/public-info-verify'>
              <Button className='btn-refuse' onClick={(e) => this.verifyDecision(0)}>驳回</Button>
            </Link>
            <span className='blank-bar-ver' />
            <Link to='/software-market-home/platform-manage/public-info-verify'>
              <Button type='primary' onClick={(e) => this.verifyDecision(1)}>通过</Button>
            </Link>
          </span>
        </div>
      </div>
    )
  }
}

PublicInfoVerifyDetail.propTypes = {
  location: PropsTypes.object
}

export default PublicInfoVerifyDetail
