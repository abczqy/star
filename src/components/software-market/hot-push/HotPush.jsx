import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { Collapse, Table, Checkbox, Button, message } from 'antd'
import { HomepageManageBar, SearchBar, BlankBar, SWBox } from 'components/software-market'
import { AppDetailModal } from 'pages/software-market'
import './HotPush.scss'
import {getSoftwareDetail, getPopularRecommendationList, savePopularRecommendation, getApptype} from 'services/software-manage'
import ajaxUrl from 'config'

const Panel = Collapse.Panel

/**
   * 表格分页器设置-默认值
   */
const pagination = {
  pageNum: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true,
  text: '' // 用来赋空翻页后的search框--需要这样吗
}

class HotPush extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: {
        data: []
      },
      pagination,
      expand: false,
      searchValue: '',
      type: '',
      options: ['全部', '教育类', '教辅类'],
      appDetailModalCon: {
        visible: false,
        swName: ''
      },
      boxList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      imgList: []
    }
    // 表格的列信息
    this.columns = [{
      title: '应用名称',
      dataIndex: 'SW_NAME',
      key: 'SW_NAME'
    }, {
      title: '所属类型',
      dataIndex: 'SW_TYPE',
      key: 'SW_TYPE'
    }, {
      title: '供应商',
      dataIndex: 'fa_name',
      key: 'fa_name'
    }, {
      title: '图片',
      dataIndex: 'SW_ICON',
      key: 'SW_ICON',
      render: (text) => <img style={{width: '50px', height: '40px'}} src={ajaxUrl.IMG_BASE_URL + text} />
    }, {
      title: '选择',
      dataIndex: 'sw_popular_recommendation',
      key: 'sw_popular_recommendation',
      render: (text, record, index) => {
        return (
          <Checkbox onClick={() => { this.checkClick(record) }} checked={record.sw_popular_recommendation === 1} />
        )
      }
    }, {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text, record, index) => (
        <span>
          <a href='javascript:void(0)' onClick={() => this.showAppDetailModal(record)}>详情</a>
        </span>
      )
    }]
  }
  copyArray = (arr) => {
    let result = []
    arr.map((item, index) => {
      result[index] = item
    })
    return result
  }

  /**
   * 点击选择状态
   */
  checkClick = (record) => {
    if (this.state.imgList.length >= 12) {
      if (record.sw_popular_recommendation === 0) {
        message.warning('已达推送上限')
      } else {
        record.sw_popular_recommendation = 0
        const params = {
          sw_id: record.SW_ID,
          state: '0'
        }
        savePopularRecommendation(params, res => {
          if (res.data) {
            let bb = this.copyArray(this.state.imgList)
            let cc = ajaxUrl.IMG_BASE_URL + record.SW_ICON
            let index = bb.indexOf(cc)
            bb.splice(index, 1)
            message.success('已取消推送')
            this.setState({
              imgList: bb
            })
          } else {
            message.warning('取消失败')
          }
        })
      }
    } else {
      const a = record.sw_popular_recommendation ? 0 : 1
      record.sw_popular_recommendation = a
      const b = record.sw_popular_recommendation.toString()
      const params = {
        'sw_id': record.SW_ID,
        'state': b
      }
      savePopularRecommendation(params, res => {
        if (record.sw_popular_recommendation) {
          console.log(record.sw_popular_recommendation)
          let b = this.copyArray(this.state.imgList)
          let c = ajaxUrl.IMG_BASE_URL + record.SW_ICON
          b.push(c)
          message.success('推送成功')
          this.setState({
            imgList: b
          })
        } else {
          let bb = this.copyArray(this.state.imgList)
          console.log(record.sw_popular_recommendation + '11111111111111' + bb)
          let cc = ajaxUrl.IMG_BASE_URL + record.SW_ICON
          let index = bb.indexOf(cc)
          bb.splice(index, 1)
          message.success('已取消推送')
          this.setState({
            imgList: bb
          })
        }
      })
    }
  }
  /**
   * 展开时修改相应的state
   */
  onExpand = () => {
    this.setState({
      expand: !this.state.expand
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
      },
      inputValue: this.state.pagination.text
    }, () => {

    })
  }
  /**
   * 当select的值变化时回调
   */
  onSelect = (val) => {
    this.setState({
      type: val
    })
  }
  getSearchData = () => {
    let params = {
      apptype: this.state.type || '',
      appName: this.state.searchValue || ''
    }
    getPopularRecommendationList(params, res => {
      this.setState({
        tableData: {
          data: []
        }
      }, () => {
        this.setState({
          tableData: {
            data: res.data
          }
        })
      })
    })
  }

  inputChange = (e) => {
    let value = e.target.value
    this.setState({
      searchValue: value
    })
  }
  // 应用类型下拉框数据获取
  getSelectOptions () {
    const thiz = this
    getApptype({}, (res) => {
      const data = res.data
      const a = this.copyArray(data.type)
      a.unshift('')
      thiz.setState({
        options: a
      })
    })
  }

  // 获取数据列表
  getList = () => {
    let params = {
      apptype: this.state.type || '',
      appName: this.state.searchValue || ''
    }
    getPopularRecommendationList(params, res => {
      res.data.map((item, index) => {
        let b = this.copyArray(this.state.imgList)
        b.push(ajaxUrl.IMG_BASE_URL + item.SW_ICON)
        if (item.sw_popular_recommendation === 1) {
          this.setState({
            imgList: b
          })
        }
      })
      console.log(this.state.imgList.length)
      this.setState({
        tableData: {
          data: []
        }
      }, () => {
        this.setState({
          tableData: {
            data: res.data
          }
        })
      })
    })
  }
  componentDidMount () {
    this.getList()
    this.getSelectOptions()
  }
  /**
   * 页码变化时回调
   */
  pageNumChange = (page, pageSize) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        pageNum: page
      },
      searchValue: this.state.pagination.text
    })
  }
   // 显示‘详情’弹窗
   showAppDetailModal = (record) => {
     // 指定回调中setState()的执行环境 bind(this)效果也一样 但是这里会有报错
     const thiz = this
     // 获取对应的后台数据
     const params = {
       sw_id: record.SW_ID
     }

     getSoftwareDetail(params, (res) => {
       const resData = res.data ? res.data : {}
       // 通过state将数据res传给子组件
       thiz.setState({
         appDetailModalCon: {
           ...thiz.state.detModalCon,
           visible: true,
           swName: record.sw_name,
           resData: resData,
           sw_id: record.sw_id
         }
       })
     })
   }
  // 关闭‘详情’弹窗
  handleAppDetCancel = () => {
    this.setState({
      appDetailModalCon: {
        ...this.state.appDetailModalCon,
        visible: false
      }
    })
  }
  render () {
    const { expand, tableData, pagination, appDetailModalCon, options } = this.state
    const { header } = this.props
    const { title } = header
    return (
      <div className='hp-maker'>
        <Collapse onChange={this.onExpand}>
          <Panel showArrow={false} header={<HomepageManageBar title={title} expand={expand} />} key='1' >
            <SearchBar
              onSeachChange={this.inputChange}
              onSearch={this.getSearchData}
              onBtnClick={this.getSearchData}
              onSelectChange={this.onSelect}
              options={options} />
            <BlankBar />
            <SWBox list={this.state.imgList} boxList={this.state.boxList} />
            <BlankBar />
            <Table
              columns={this.columns}
              dataSource={tableData.data}
              pagination={{
                ...pagination,
                total: this.state.tableData.total,
                onShowSizeChange: this.onShowSizeChange,
                onChange: this.pageNumChange
              }}
            />
            <div ref='appDetailElem' className='app-detail-wrap' />
            <AppDetailModal
              title={appDetailModalCon.swName}
              getContainer={() => this.refs.appDetailElem}
              visible={appDetailModalCon.visible}
              onCancel={this.handleAppDetCancel}
              resData={appDetailModalCon.resData}
              footer={[
                <Button key='back' type='primary' onClick={this.handleAppDetCancel}>关闭</Button>
              ]}
            />
          </Panel>
        </Collapse>
      </div>
    )
  }
}
HotPush.propTypes = {
  header: PropsTypes.object
}
export default HotPush
