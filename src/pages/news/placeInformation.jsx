/**
 * 教育局的信息公开
 */
import React from 'react'
import {Row, Col, Card, Pagination} from 'antd'
import img from '../../assets/images/hear.jpg'
import hand from '../../assets/images/hand.png'
import people from '../../assets/images/u1632.png'
import './newsList.scss'
import BottomHeader from '../../components/common/BottomHeader'

class Information extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        imgO: img,
        imgT: img,
        imgH: hand,
        imgP: people,
        dataP: [
          '民办普通高校等学校的设立发123...',
          '民办高等学校办学地址变更发123...',
          '民办学校以捐赠者姓名或者名123...',
          '本市进一步推进高中阶段学校123...',
          '民办学校以捐赠者姓名或者名123...']
      },
      dataRight: {
        total: 99,
        pageSize: 10,
        data: [{
          people: '教育机构',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '教育机构',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '运营者',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '教育机构',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '运营者',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '教育机构',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        },
        {
          people: '教育机构',
          title: '教育部部署2018年重点高校招收农村和贫困地区学生工作',
          time: '2018-03-23',
          paragraph: '为贯彻党的十九大精神，落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》，近日教育部印发《关于做好2018年重点高校招收农村和贫困地区学生工落实《国务院关于深化考试招生制度改革的实施意见》和《政府工作报告》作......'
        }]
      },
      options: [
        {
          value: '省级',
          label: '省级'
        }, {
          value: '市级',
          label: '市级',
          children: [{
            value: '福州市',
            label: '福州市'
          }]
        }, {
          value: '区级',
          label: '区级',
          children: [{
            value: '福州市',
            label: '福州市',
            children: [{
              value: '县级',
              label: '县级'
            }]
          }]
        }]
    }
  }
  getList=() => {
    console.log('获取数据')
  }
  componentWillMount () {
    this.getList()
  }
  // 标题的点击事件
  title =() => {
    console.log('右边的标题')
  }
  // 更多的点击事件
  more=() => {
    console.log('更多')
  }
  // 分页页码改变
  ptChange=(page, pageSize) => {
    console.log('页码改变', page, pageSize)
    this.getList()
  }
  // 每页展示数量改变
  stChange=(current, size) => {
    console.log('每页的数量改变', current, size)
    this.getList()
  }
  // // 省厅的modal
  // modal=() => {
  //   console.log('省厅弹出框')
  // }
  // 下拉分级改变
  onChangeF =(value) => {
    console.log(value)
    this.getList()
  }
  render () {
    return <div>
      <div style={{marginLeft: '15%', marginBottom: '20px'}}>
        <Row>
          <Col span={5}>
            <Row><div className='left-downer'><img src={this.state.data.imgO} style={{width: '280px'}} alt='' /></div></Row>
            <Row><div className='left-downer'>
              <Card title='公告' bordered={false} extra={<a onClick={this.more}>更多...</a>} style={{ width: 280 }}>
                <ul className='ul-margin'>
                  {this.state.data.dataP.map((item, index) => {
                    return <li className='li-hover' key={index} ><span className='span-color'>{item}</span></li>
                  })}
                </ul>
              </Card></div>
            </Row>
            <Row><img src={this.state.data.imgT} style={{width: '280px'}} alt='' /></Row>
          </Col>
          <Col span={16}>
            <ul className='ul-top' style={{width: '800px'}}>
              {/* <li style={{listStyle: 'none', width: '800px'}}>
                <span>发布机构 : <Cascader placeholder='请选择' options={this.state.options} onChange={(value) => { this.onChange(value) }} changeOnSelect /></span>
                {/* <span className='ST'><a onClick={this.modal}><img src={this.state.data.imgP} style={{width: '18px'}} alt='' />省厅</a></span> */}
              {/* <span style={{fontSize: '12px', marginLeft: '45%'}}><img src={this.state.data.imgH} style={{width: '20px'}} alt='' />点击蓝色字段，可切换级别筛选</span></li> */}
              {this.state.dataRight.data.map((item, index) => {
                return <li style={{listStyle: 'none', borderBottom: '1px solid rgb(180,190,199)', width: '800px', height: '120px'}} key={index}>
                  <Col span={24}>
                    <Row>
                      <Col span={17}><p className='p'><a onClick={this.title}>{item.title}</a></p></Col>
                      {/* <Col span={4}><span className='span-top'>发布者:{item.people}</span></Col> */}
                      {/* <Col span={3}><span className='span-top'>{item.time}</span></Col> */}
                    </Row>
                    <Row>
                      <Col span={23}>
                        <p style={{fontSize: '12px'}}>{item.paragraph}</p>
                      </Col>
                    </Row>
                  </Col>
                </li>
              })}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col span={10} />
          <Col >
            <Pagination
              size='small'
              total={this.state.dataRight.total}
              showSizeChanger
              showQuickJumper
              pageSize={this.state.dataRight.pageSize}
              onChange={(page, pageSize) => { this.ptChange(page, pageSize) }}
              onShowSizeChange={(current, size) => { this.stChange(current, size) }}
            // pageSizeOptions={5}
            /></Col>
        </Row>
      </div>
      <Row>
        <BottomHeader />
      </Row>
    </div>
  }
}

export default Information