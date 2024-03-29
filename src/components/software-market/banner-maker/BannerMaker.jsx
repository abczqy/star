/**
 *  这里要引入我们地小组件
 *  需要组件说明
 *  动态组件应该由函数式输出--函数式组件
 */
import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Collapse, message, Table, Row, Col, Input, Button, Switch } from 'antd'
import { HomepageManageBar, HomepageAdd, BannerBox, BannerNewBox, BlankBar } from 'components/software-market'
import './BannerMaker.scss'
import { addGatewayBanner, getGatewayBannerList, deleteGatewayBanner, getSchoolInfoList, updateBannerIsDefault } from 'services/software-manage'
import BannerModel from './BannerModel'
import config from '../../../config/index'
const {API_BASE_URL_V2, SERVICE_PORTAL} = config

const Panel = Collapse.Panel
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true
}
class BannerMaker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      boxList: [1, 2, 3],
      fileList: [],
      visible: false,
      bannerData: [],
      bannerNewData: [],
      schName: '',
      keyValue: '',
      dataList: [{ sw_shName: '福建学校', sw_zone: '福建', def_ban: 1 }],
      pagination,
      total: 0,
      id: '',
      picId: null,
      saveOk: true
    }

    // 表格的列信息
    this.columns = [{
      title: '学校机构',
      dataIndex: 'sh_name',
      key: 'sh_name'
    }, {
      title: '区域',
      dataIndex: 'sh_area',
      key: 'sh_area'
    }, {
      title: '默认banner',
      dataIndex: 'def_ban',
      key: 'def_ban',
      render: (text, record, index) => {
        return (
          <Switch checked={record.isDefault === 1} onChange={() => this.handleDefault(record)} />
        )
      }
    }, {
      title: '操作',
      dataIndex: 'sw_path',
      key: 'sw_path',
      render: (text, record, index) => (
        <span>
          {record.isDefault === 1 ? null : <a href='javascript:void(0)' onClick={() => this.showModal(record)}>操作</a>}
        </span>
      )
    }]
  }
  /**
   * 展开时修改相应的state
   */
  onExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
  }

  // 处理是否是默认banner
  handleDefault = (record) => {
    const thiz = this
    const params = {
      id: record && record.id,
      isDefault: record.isDefault ? 0 : 1
    }
    updateBannerIsDefault(params, (res) => {
      const data = res.data ? res.data : {}
      console.log(data)
      if (data.SUCCESS) {
        message.success(data.msg)
        thiz.getSchoolList()
      }
    })
  }

  copyArray = (arr) => {
    let result = []
    arr.map((item, index) => {
      result[index] = item
    })
    return result
  }

  onAdd = () => {
    let a = 0
    a += this.state.bannerNewData.length + 1
    let b = this.copyArray(this.state.bannerNewData)
    b.push(a)
    if (b.length <= 1) {
      this.setState({
        bannerNewData: b
      })
    } else {
      message.warning('请保存后继续新增')
    }
  }

  /**
   * 渲染“添加小方块”
   * @param { int } count 渲染多少个出来 默认是3个
   */
  getPanelAdd = () => {
    return (<HomepageAdd onAdd={this.onAdd} />)
  }
  // 保存新增banner图
  addBanner = () => {
    const thiz = this
    if (!this.state.saveOk) {
      return false
    } else {
      this.setState({
        saveOk: false
      }, () => {
        setTimeout(() => {
          thiz.setState({
            saveOk: true
          })
        }, 500)
      })
    }
    if (!this.state.picId) {
      message.warn('请先添加banner并上传图片后再进行保存')
      return false
    }
    let obj = {
      url: this.state.picId
    }
    if (this.props.header.title !== '平台介绍' && this.props.header.from !== '软件超市') {
      obj.type = 1
    } else if (this.props.header.title !== '平台介绍' && this.props.header.from === '软件超市') {
      obj.type = 3
    } else {
      obj.type = 2
    }
    addGatewayBanner(obj, res => {
      if (res.data.code === 200) {
        this.setState({
          bannerNewData: [],
          fileList: [],
          picId: null
        })
        message.success('图片保存成功')
        this.getList()
      } else {
        message.success(res.data.msg)
      }
      console.log(res)
    })
  }

  recerve = () => {
    this.setState({
      bannerNewData: [],
      fileList: []
    })
  }
  onDelete = (value) => {
    let a = value.toString()
    deleteGatewayBanner(a, res => {
      if (res.data.code === 200) {
        this.getList()
        this.setState({
          picId: null
        })
        message.success('删除成功')
      } else {
        message.error(res.data.msg)
      }
    })
  }
  getList = () => {
    let param = {}
    let type
    if (this.props.header.title !== '平台介绍' && this.props.header.from !== '软件超市') {
      type = 1
    } else if (this.props.header.title !== '平台介绍' && this.props.header.from === '软件超市') {
      type = 3
    } else {
      type = 2
    }
    getGatewayBannerList(param, type, res => {
      console.log(res)
      if (res.data.code === 200) {
        this.setState({
          bannerData: []
        }, () => {
          this.setState({
            bannerData: res.data.data
          })
        })
      } else {
        message.warn(res.data.msg)
      }
      console.log(this.state.bannerData)
    })
  }
  componentDidMount () {
    this.getList()
    if (this.props.header.title !== '平台介绍') {
      this.getSchoolList()
    }
  }

  getSchoolList = () => {
    const parmas = {
      pageSize: this.state.pagination.pageSize,
      pageNum: this.state.pagination.pageNum,
      sh_name: this.state.schName,
      sh_keyword: this.state.keyValue
    }
    getSchoolInfoList(parmas, (res) => {
      let data = res.data
      this.setState({
        dataList: data.list,
        total: data.total
      })
    })
  }
  /**
   * 渲染小方块
   * @param { int } count 渲染多少个出来 默认是3个
   */
  // getPanelBox = (num) => {
  //   return (<BannerBox orderNum={num} />)
  // }

  // 输入学校名称onChange
  onSchNameChange = (e) => {
    let value = e.target.value
    console.log(value)
    this.setState({
      schName: value
    })
  }

  // 搜索
  getSearchData = () => {
    this.getSchoolList()
  }

  // 关键字输入
  onKeyValChange = (e) => {
    let value = e.target.value
    this.setState({
      keyValue: value
    })
  }

  /**
   * pageSize 变化时回调
   */
  onShowSizeChange = (current, size) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNum: current,
        pageSize: size
      }
    }, () => {
      this.getSchoolList()
    })
  }

  /**
   * 页码变化时回调
   */
  pageNumChange = (page, pageSize) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNum: page
      }
    }, () => {
      this.getSchoolList()
    })
  }

  // 隐藏弹出的bannerModel
  handleClose = () => {
    this.setState({
      visible: false
    })
  }

  // 显示编辑bannerModal
  showModal = (record) => {
    this.setState({
      visible: true,
      id: record.id
    })
  }

  // 上传图片
  onUploadChange = (e) => {
    if (e.fileList[0].status === 'done') {
      if (e.fileList[0].response.code === 200) {
        this.setState({picId: e.fileList[0].response.data})
      } else {
        message.warn(e.fileList[0].response.msg)
      }
    }
  }

  render () {
    const { expand, bannerData, bannerNewData, pagination } = this.state
    const { header } = this.props
    const { title } = header
    const Search = Input.Search
    const datas = {
      action: API_BASE_URL_V2 + SERVICE_PORTAL + '/file-upload',
      data: {fileType: 'pic'},
      onChange: this.onUploadChange,
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file)
          const newFileList = fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList
          }
        })
      },
      beforeUpload: (file) => {
        if (this.state.fileList.length >= 1) {
          message.warn('请不要多传图片')
        } else {
          this.setState(({ fileList }) => ({
            fileList: [...fileList, file]
          }))
        }
        // return false
      },
      fileList: this.state.fileList,
      accept: 'image/*'
    }
    return (
      <div className='hp-maker'>
        <Collapse onChange={this.onExpand}>
          <Panel showArrow={false} header={<HomepageManageBar title={title} expand={expand} addpage={this.addBanner} click={this.recerve} />} key='1'>
            {bannerData.map((item, index) => {
              return (<div className='float-box' key={index}><BannerBox title={title} orderNum={index + 1
              } id={item.id} url={item.picUrl} type={item.type} datas={datas} bannerData={bannerData} datab={item.banner_url} getList={this.getList} onDelete={this.onDelete} /></div>)
            })}
            {bannerNewData.map((item, index) => {
              return (<div className='float-box' key={index}><BannerNewBox title={title} orderNum={index + 1
              } datas={datas} getList={this.getList} /></div>)
            })}
            <div className='float-box'>{this.getPanelAdd()}</div>
            <div style={{ clear: 'both' }} />
            <BlankBar />
            {
              this.props.header.title !== '平台介绍' && this.props.header.from !== '软件超市'
                ? <div>
                  <div>
                    <Row gutter={16}>
                      <Col span={8}>
                        <span>学校机构:</span>
                        <Input placeholder='福州实验小学' onChange={this.onSchNameChange} style={{ width: '75%' }} />
                      </Col>
                      <Col span={6}>
                        <Search
                          onSearch={this.getSearchData}
                          onChange={this.onKeyValChange}
                        />
                      </Col>
                      <Col span={4}>
                        <Button type='primary' onClick={this.getSearchData}>搜索</Button>
                      </Col>
                    </Row>
                  </div>
                  <BlankBar />
                  <Table
                    columns={this.columns}
                    dataSource={this.state.dataList}
                    pagination={{
                      ...pagination,
                      total: this.state.total,
                      onShowSizeChange: this.onShowSizeChange,
                      onChange: this.pageNumChange
                    }}
                  />
                </div>
                : null
            }
          </Panel>
        </Collapse>
        <BannerModel
          visible={this.state.visible}
          handleClose={() => this.handleClose()}
          header={title}
          id={this.state.id}
        />
      </div>
    )
  }
}

BannerMaker.propTypes = {
  header: PropsTypes.object
}

export default BannerMaker
