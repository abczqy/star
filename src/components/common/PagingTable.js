import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

export default class PagingTable extends React.Component {
  constructor (props) {
    super(props)
    this.showTotal = this.showTotal.bind(this)
  }

  /**
     * 展示表格的显示情况
     * @param total
     * @param range
     * @returns {string}
     */
  showTotal (total, range) {
    return `显示${range[0]}-${range[1]}条记录，共${total}条记录`
  }

  render () {
    return (
      <div>
        <Table dataSource={this.props.dataSource}
          rowKey={this.props.rowKey ? this.props.rowKey : (record, index) => {
            return index
          }}
          defaultCurrent={1}
          scroll={{ x: this.props.xScroll, y: this.props.yScroll }}
          className={this.props.customCls}
          columns={this.props.columns}
          pagination={this.props.pageVisible ? {
            onShowSizeChange: this.props.onShowSizeChange,
            style: { float: 'right', marginTop: '30px' },
            total: this.props.total,
            showTotal: this.showTotal,
            onChange: this.props.onChange,
            showQuickJumper: true,
            showSizeChanger: true,
            defaultCurrent: this.props.defaultCurrent,
            defaultPageSize: this.props.defaultPageSize
          } : false}
          loading={this.props.loading}
          rowSelection={this.props.rowSelection || null}
          onRow={this.props.onRowClick ? this.props.onRowClick : () => {}} />
      </div>
    )
  }
}
PagingTable.propTypes = {
  customCls: PropTypes.string, // 覆盖样式名，用于固定表格的高度
  dataSource: PropTypes.array.isRequired, // 数据
  columns: PropTypes.array.isRequired, // 表头数据
  onRowClick: PropTypes.func, // 点击一行的方法
  rowSelection: PropTypes.object, // 用于选中每行数据的多选框
  xScroll: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]), // X轴滚动，等于所有列宽的和
  yScroll: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]), // Y轴滚动，一列相当于50，需要显示多少列，就*50
  pageVisible: PropTypes.bool.isRequired, // 分页是否显示
  onChange: PropTypes.func, // 页数变化的方法
  onShowSizeChange: PropTypes.func, // 每页显示数量的变化
  defaultPageSize: PropTypes.number, // 每页的显示数量
  defaultCurrent: PropTypes.number, // 当前页数
  total: PropTypes.number, // 总记录数
  loading: PropTypes.bool,
  rowKey: PropTypes.func
}
PagingTable.defaultProps = {
  xScroll: 0,
  yScroll: 0,
  pageVisible: true,
  defaultPageSize: 10,
  defaultCurrent: 1,
  total: 0
}
