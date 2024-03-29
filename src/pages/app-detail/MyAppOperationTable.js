/**
 * 应用管理-运营中
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Card,
  Form,
  Row,
  Col,
  Select,
  Input,
  Icon,
  Button,
  Modal,
  Checkbox,
  message } from 'antd'
import { Link } from 'react-router-dom'
import { axios } from 'utils'
import config from '../../config'
// import {myAppInOperation} from 'services/my-app/'
import CustomPagingTable from '../../components/common/PagingTable'
import './MyAppOperationTable.scss'

const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_EDU_MARKET = config.SERVICE_EDU_MARKET

const FormItem = Form.Item
const Option = Select.Option
const Search = Input.Search
class MyAppTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      checked: false,
      btnDisable: true,
      myAppInOperationData: [],
      appTypeData: [],
      total: 0,
      pageSize: 10,
      pageNum: 1,
      currentPage: 1,
      typeId: '',
      keyword: '',
      detailVisible: false,
      detail: {}
    }
    this.columns = [{
      title: '应用名称',
      dataIndex: 'APP_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'APP_TYPE_NAME',
      defaultSortOrder: 'descend'
      // width: 150
    }, {
      title: '下载次数',
      dataIndex: 'DOWNLOAD_COUNT',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.sw_downloads - b.sw_downloads
      // width: 150
    }, {
      title: '版本',
      dataIndex: 'APP_VERSION'
      // width: 150
    }, {
      title: '上线时间',
      dataIndex: 'CREATE_TIME',
      render: date => moment(date).format('YYYY-MM-DD')
      // width: 150
    }, {
      title: '操作',
      dataIndex: 'clickCount',
      // width: 150
      render: (text, record, index) => {
        return (
          <div key={index}>
            <span style={{marginRight: '10px'}}>
              <Link to={{pathname: '/operate-manage-home/iteration', search: '?' + record.APP_ID + '&' + record.APP_VERSION}}>迭代</Link>
            </span>
            {/* <span style={{marginRight: '10px'}}>
              <Link to='/operate-manage-home/iteration'>日志下载</Link>
            </span> */}
            <span style={{marginRight: '10px', color: '#1890ff', cursor: 'pointer'}} onClick={() => this.props.showDetail(record)}>
              查看详情
            </span>
          </div>
        )
      }
    }]
    this.platColumns = [{
      title: '应用名称',
      dataIndex: 'APP_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'APP_TYPE_NAME',
      defaultSortOrder: 'descend'
      // width: 150
    }, {
      title: '版本',
      dataIndex: 'APP_VERSION'
      // width: 150
    }, {
      title: '地址',
      dataIndex: 'APP_LINK'
    }, {
      title: '上线时间',
      dataIndex: 'CREATE_TIME',
      render: date => moment(date).format('YYYY-MM-DD')
      // width: 150
    }, {
      title: '操作',
      dataIndex: 'clickCount',
      // width: 150
      render: (text, record, index) => {
        return (
          <div key={index}>
            <span style={{marginRight: '10px'}}>
              <Link to={{pathname: '/operate-manage-home/platiteration', search: '?' + record.APP_ID + '&' + record.APP_VERSION}}>迭代</Link>
            </span>
            {/* <span style={{marginRight: '10px'}}>
              <Link to='/operate-manage-home/iteration'>日志下载</Link>
            </span> */}
            <span style={{marginRight: '10px', color: '#1890ff', cursor: 'pointer'}} onClick={() => this.props.showDetail(record)}>
              查看详情
            </span>
          </div>
        )
      }
    }]
  }
  // 我的应用-运营中
  getMyAppInOperationData = (thiz) => {
    const {tabsType} = this.props
    let params
    if (tabsType === 'rj') {
      params = {
        auditStatus: '4', // 审核状态
        keyword: this.state.keyword || '', // 应用名称,
        pageNum: this.state.pageNum || 1,
        pageSize: this.state.pageSize || 15,
        typeId: this.state.typeId || 0,
        platformType: 'rj'
      }
    } else {
      params = {
        auditStatus: '4', // 审核状态
        keyword: this.state.keyword || '', // 应用名称,
        pageNum: this.state.pageNum || 1,
        pageSize: this.state.pageSize || 15,
        typeId: this.state.typeId || 0,
        platformType: 'pt'
      }
    }
    axios.get(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/manage-app/list-by-audit-status', {params: params})
      .then(function (res) {
        if (res.data.code === 200) {
          const data = res.data
          data.data.data &&
        thiz.setState({
          myAppInOperationData: data.data.data.slice()
        })
        } else {
          message.warning(res.data.msg || '请求出错')
        }
      })
  }
  // 获取应用类型下拉框数据
  getApplicationTypeData = (thiz) => {
    axios.get(API_BASE_URL_V2 + SERVICE_EDU_MARKET + '/app-type')
      .then(function (res) {
        if (res.data.code === 200) {
          const data = res.data
          data.data &&
          thiz.setState({
            appTypeData: data.data.slice()
          })
        } else {
          message.warning(res.data.msg || '请求出错')
        }
      })
  }
  // 改变每页显示条数
  onShowSizeChange = (pageNum, pageSize) => {
    this.setState({pageNum, pageSize}, () => {
      this.getMyAppInOperationData(this)
    })
  }
  // 页码
  onPageNumChange = (pageNum, pageSize) => {
    this.setState({pageNum, pageSize}, () => {
      this.getMyAppInOperationData(this)
    })
  }
  // 分类搜索
  onChangeState=(value) => {
    this.setState({
      typeId: value
    }, function () {
      this.handleSearch()
    })
  }
  handleSearch = () => {
    this.setState({
      pageNum: 1
    }, () => {
      this.getMyAppInOperationData(this)
    })
  }
  // 名称搜索
  handleSearchTextChange (e) {
    console.log('keyword: ', e.target.value.trim())
    this.setState({
      keyword: e.target.value.trim()
    })
  }
  handBtnleFilter =() => {
    this.handleSearch()
  }
  // 上架申请弹出框
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false
    })
  }
  // 处理Checkbox
  handleCheckbox = (e) => {
    if (this.state.checked === false) {
      this.setState({
        checked: `${e.target.checked}`
      })
    } else {
      this.setState({
        checked: false
      })
    }
  }
  componentDidMount () {
    this.props.form.validateFields()
    this.getMyAppInOperationData(this)
    this.getApplicationTypeData(this)
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const {tabsType} = this.props
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 15
      }
    }
    return (
      <Card>
        <Form>
          <Row>
            <Col span={1} style={{paddingTop: 9}}>
              <span>类型 :</span>
            </Col>
            <Col span={4} >
              <FormItem
                {...formItemLayout}
              >
                {getFieldDecorator('progressState')(
                  <Select placeholder='全部' style={{ width: '150%' }} onChange={this.onChangeState} allowClear>
                    { this.state.appTypeData && this.state.appTypeData.map((item, index, data) => {
                      return <Option
                        key={index}
                        value={item.APP_TYPE_ID}
                      >
                        {item.APP_TYPE_NAME}
                      </Option>
                    })}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={6} style={{paddingTop: 3}}>
              <div style={{marginBottom: '0px'}} onKeyDown={this.handleKeyDown}>
                <Search
                  mode='combobox'
                  placeholder='搜索应用名称'
                  style={{ width: '83%', marginRight: '10px' }}
                  enterButton
                  onChange={e => { return this.handleSearchTextChange(e) }}
                  onSearch={() => { this.handBtnleFilter() }}
                />
              </div>
            </Col>
            <Col span={2} style={{paddingTop: 3, float: 'right'}}>
              <Button onClick={this.showModal} style={{backgroundColor: '#33CC00', border: 0}} type='primary'><Icon type='plus' />上架申请</Button>
            </Col>
          </Row>
        </Form>
        <div className='marketAnalysis-table'>
          <CustomPagingTable
            dataSource={this.state.myAppInOperationData}
            columns={tabsType === 'rj' ? this.columns : this.platColumns}
            pageVisible
            //   loading={this.state.loading}
            total={this.state.total}
            // customCls='ant-table-body'
            pageSize={this.state.pageSize}
            pageNum={this.state.pageNum}
            currentPage={this.state.currentPage}
            onShowSizeChange={(current, pageSize) => this.onShowSizeChange(current, pageSize)}
            onChange={(current, pageSize) => this.onPageNumChange(current, pageSize)}
          />
        </div>
        <Modal
          title='免责声明'
          width={'34%'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <p style={{color: '#999', fontSize: '12px', margin: 0}}>本系统提醒您： 在使用本系统的所有功能之前，请您务必仔细阅读并透彻理解本声明。您可以选择不使用本系统，但如果您使用本系统，您的使用行为将被视为对本声明全部内容的认可。</p>
          <p style={{color: '#999', fontSize: '12px', margin: 0}}>免责声明： 鉴于本系统使用非人工检索/分析方式，无法确定您输入的条件进行是否合法，所以本系统对检索/分析出的结果不承担责任。如果因以本系统的检索/分析结果作为任何商业行为或者学术研究的依据而产生不良后果，本系统不承担任何法律责任。
关于隐私权： 访问者在本系统注册时提供的一些个人资料，本系统除您本人同意外不会将用户的任何资料以任何方式泄露给第三方。当政府部门、司法机关等依照法定程序要求本系统披露个人资料时，本系统将根据执法单位之要求或为公共安全之目的提供个人资料，在此情况下的披露，本系统不承担任何责任。</p>
          <p style={{color: '#999', fontSize: '12px', margin: 0}}>关于版权：</p>
          <p style={{color: '#999', fontSize: '12px', margin: 0}}>一、 凡本系统注明“国家知识产权局”、“专利检索及分析”的所有作品，其版权属于国家知识产权局和本系统所有。其他媒体、网站或个人转载使用时不得进行商业性的原版原式的转载，也不得歪曲和篡改本系统所发布的内容。</p>
          <p style={{color: '#999', fontSize: '12px', margin: 0}}>二、 凡本系统转载其它媒体作品的目的在于传递更多信息，并不代表本系统赞同其观点和对其真实性负责；其他媒体、网站或个人转载使用时必须保留本站注明的文章来源，并自负法律责任。</p>
          <p style={{color: '#999', fontSize: '12px', margin: 0}}>三、 被本系统授权使用的单位，不应超越授权范围。</p>
          <p style={{color: '#999', fontSize: '12px', margin: 0}}>四、 本系统提供的资料如与相关纸质文本不符，以纸质文本为准。</p>
          <p style={{color: '#999', fontSize: '12px', margin: 0}}>五、 如因作品内容、版权和其它问题需要同本系统联系的，请在本系统发布该作品后的30日内进行。</p>
          <p style={{color: '#999', fontSize: '12px', margin: 0}}>关于解释权： 本系统之声明以及其修改权、更新权及最终解释权均属本站以及国家知识产权局所有。</p>
          <div style={{width: '100%', marginTop: '20px'}}>
            <Checkbox onChange={this.handleCheckbox} style={{marginLeft: '40%'}}>我已确认须知</Checkbox>
          </div>
          <Button disabled={this.state.checked === false} style={{width: '160px', marginLeft: '36%', marginTop: '20px'}} type='primary'><Link to='/operate-manage-home/please'>上架申请</Link></Button>
        </Modal>
      </Card>
    )
  }
}

MyAppTable.propTypes = {
  dataSource: PropTypes.array,
  form: PropTypes.object,
  getNewNewsNum: PropTypes.func,
  showDetail: PropTypes.func,
  tabsType: PropTypes.string
}

export default Form.create()(MyAppTable)
