/* eslint-disable react/jsx-no-bind,react/prop-types */
/**
 * header-bar-right
 * maol/setting/poweroff
 */
import React from 'react'
import {Card, Icon} from 'antd'
import Unbind from './UnbindModel'
import Addbind from './AddbindModel'
import {relationQueryStu} from '../../../../services/topbar-mation/index'
import webStorage from 'webStorage'
import { withRouter } from 'react-router'
import './ChildBind.scss'
class ChildBind extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unbindVisible: false,
      addbindVisible: false
    }
  }
  componentDidMount () {
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents') {
      this.getBindList()
    }
  }
  // 获取学生绑定数据接口 stuData 要在此接口返回
  getBindList=() => {
    relationQueryStu({
      maf_id: webStorage.getItem('STAR_WEB_PERSON_INFO').id
    }, (response) => {
      console.log('返回学生绑定信息', response)
      this.setState({
        stuData: response.data,
        maf_id: webStorage.getItem('STAR_WEB_PERSON_INFO').id
      })
    })
  }
  hiddenModal (type) {
    this.setState({
      [type]: false
    })
  }
  /* 解绑弹出框 */
  visibaleUnbindModel =(id, name) => {
    console.log('解除绑定，学生id', id)
    this.setState({
      stuName: name,
      unbindVisible: true,
      stu_id: id,
      maf_id: this.state.maf_id
    })
  }
  /* 添加绑定 */
  visibaleaddbindModel =() => {
    this.setState({
      addbindVisible: true,
      maf_id: this.state.maf_id
    })
  }
  render () {
    let model
    if (webStorage.getItem('STAR_WEB_ROLE_CODE') === 'parents') {
      let stuData = this.state.stuData
      model = (
        <Card title='绑定列表' className='message-setting-card'>
          <div className='setting-body'>
            {stuData && stuData.map((item, index) => {
              return (<div key={index} className='stu_list'>
                <div className='photo'>
                  {/* <img style={{height: '70px', width: '55px'}} src={item.stu_photo} alt='' /> */}
                </div>
                <div className='stumessage'>
                  <h4>{item.stu_name}</h4>
                  <p>{item.sh_id}</p>
                  <p>{item.stu_class}</p>
                </div>
                <Icon type='link' title='解绑' className='stulink-icon' onClick={() => { this.visibaleUnbindModel(item.stu_id, item.stu_name) }} />
              </div>)
            })
            }
            <div className='stu_list addbind' onClick={() => { this.visibaleaddbindModel() }}>
              <h4><Icon type='link' className='stulink-icon-add' />添加</h4>
            </div>
          </div>
        </Card>
      )
    }
    return (
      <div className='child-info'>
        <div className='child-info-top'>
          <div className='child-info-title'>孩子绑定</div>
        </div>
        {/* 家长 ,厂商 */}
        { model}
        <Unbind
          visible={this.state.unbindVisible}
          hiddenModal={this.hiddenModal.bind(this, 'unbindVisible')}
          stu_id={this.state.stu_id}
          maf_id={this.state.maf_id}
          stuName={this.state.stuName}
          getBindList={this.getBindList}
        />
        <Addbind
          visible={this.state.addbindVisible}
          hiddenModal={this.hiddenModal.bind(this, 'addbindVisible')}
          getBindList={this.getBindList}
          maf_id={this.state.maf_id}
        />
      </div>
    )
  }
}
export default withRouter(ChildBind)
