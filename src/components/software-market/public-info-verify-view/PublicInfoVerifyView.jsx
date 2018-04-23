import React, { Component } from 'react'
import { Row, Col, Input } from 'antd'
import './PublicInfoVerifyView.scss'

const { TextArea } = Input

// 测试用数据
const text = `各设区市、平潭综合实验区教育局：

2015年底，省政府办公厅印发《福建省乡村教师支持计划（2015-2020年）实施办法》（闽政办〔2015〕155号），在全省建立乡村教师生活补助制度，按平均每人每月不低于300元的标准予以生活补助，具体由各地依据学校艰苦边远程度实行差别化的补助标准，补助额度不纳入绩效工资总量。近期，我厅就各地大力推进乡村教师支持计划、落实乡村教师生活补助政策情况进行了梳理分析。现将有关情况通报如下：

一、实施情况

（一）补助覆盖范围

我省共92个县（市、区），有乡村教师的县（市、区）共有83个。截至2017年12月，已落实乡村教师生活补助的县（市、区）有56个，覆盖率为67.5%。56个实施县中受益学校2661所，受益教师8.4万人。

（二）补助标准与资金投入

2017年，各实施县共投入资金2.96亿元，月人均补助293元。56个实施县中，月人均补助标准在500元以上的有5个，300～500元的有41个，300元以下的有10个。`

const titleText = `十九大精神“新鲜热辣”进校园`

const textAreaConfig = {
  disabled: true,
  autosize: true
}

class PublicInfoVerifyView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pubInfoDetail: '',
      inputText: ''
    }
  }
  componentDidMount () {
    // 测试数据
    this.setState({
      pubInfoDetail: text,
      inputText: titleText
    })
  }
  render () {
    const { pubInfoDetail, inputText } = this.state
    return (
      <div className='pub-info-verify-view-wrap'>
        <Row gutter={16}>
          <Col span={12}>
            <span className='left-label'>通知标题:</span>
            <Input disabled value={inputText} className='right-input' />
          </Col>
          <Col span={12}>
            <span className='left-label'>附件:</span>
            <img alt='应该是一个图片式的文件下载链接' />
          </Col>
        </Row>
        <div>
          <span className='left-label'>通知内容:</span>
          <TextArea value={pubInfoDetail} {...textAreaConfig} />
        </div>
      </div>
    )
  }
}

export default PublicInfoVerifyView
