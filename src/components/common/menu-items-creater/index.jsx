/**
 * 给一组数据 动态生成menu的items
 * 1- 数据结构的设计
 * 2- Item组件 - 判断当前是有子页面的还是无子页面的
 * 3- 需要一个key生成器 -- 增量递进 -- 时间考虑，后面去实现这个算法
 * 4- data - 我们可以以json/js文件存在一个配置文件中 -- 并进行说明
 * 5- 算法-递归（目录解析算法）
 * 6- 这里只负责递归渲染
 * data数据结构-目录嵌套结构:
 * [{
 *  title: // 菜单item的名字 字符串/有样式的组件
 *  icon: // title前面的图标（允许缺省）
 *  to: // 要跳转到的页面路由
 *  children: // 子menu的item 是一个数组
 * }]
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import './MenuItemsCreater.scss'

const { SubMenu, Item } = Menu

/**
 * 一个描述菜单的title的组件
 */
const Title = (props) => (
  <span>
    {
      props.icon &&
      <img
        className='menu-item-icon'
        src={props.icon}
      /> }
    { props.title || '' }
  </span>
)

class MenuItemsCreater extends Component {
  /**
   * 获得MenuItem的key
   * 同级的key 是 key的末尾数字增1
   * 次级的key 是key的末尾数据增 '-' + i
   * @param { string } lastKey 上一层的key值
   * @param { num } i 存在的话 则是次级的key
   */
  // getKey (lastKey, i) {
  //   if (i) {
  //     let keys = lastKey.match(/\d/g)
  //     keys[keys.length - 1] = parseInt(keys[keys.length - 1]) + 1
  //     console.log('同级的key： ' + keys.join('-'))
  //     // 同级的key
  //     return keys.join('-')
  //   } else {
  //     console.log('次级的key： ' + lastKey + '-' + i)
  //     // 次级的key
  //     return lastKey + '-' + i
  //   }
  // }

  /**
   * @param {object} data 描述路由文件的json数据
   * @param {num} deep （暂时作废）当前层级 一般初始传一个1进去 用来生成层级 进而生成每一个Item的key
   */
  getListRender (data, fatherKey) {
    // let key = parseInt(fatherKey.match(/\d/g).pop()) + 1 + '-'
    return data.map((v, i) => {
      // console.log('key' + i + ': ' + key + i)
      if (v.children) {
        // let key = this.getKey(fatherKey)
        // 有子节点的菜单
        return (
          <SubMenu
            key={v.key}
            title={
              <Title
                icon={v.icon || null}
                title={v.title || null}
              />}
          >
            {this.getListRender(v.children)}
          </SubMenu>
        )
      } else {
        // 无子节点的菜单项
        return (
          <Item key={v.key}>
            <Link
              to={v.to}
            >
              <Title
                icon={v.icon || null}
                title={v.title || null}
              />
            </Link>
          </Item>
        )
      }
    })
  }
  render () {
    return (
      <Menu
        mode={this.props.mode}
        theme={this.props.theme || 'light'}
        defaultSelectedKeys={this.props.defaultSelectedKeys || ['1']}
        // defaultOpenKeys={['sub1']}
        style={this.props.style}
        onClick={this.props.onClick}
      >
        { this.getListRender(this.props.data, '0') }
      </Menu>
    )
  }
}

MenuItemsCreater.propTypes = {
  data: PropTypes.array.isRequired, // 描述菜单的数据（json，结构见文档说明部分）
  mode: PropTypes.string,
  theme: PropTypes.string,
  defaultSelectedKeys: PropTypes.array,
  style: PropTypes.object,
  onClick: PropTypes.func
}

Title.propTypes = {
  icon: PropTypes.any, // item的图标（可以省略）
  title: PropTypes.any // item的文字
}

export default MenuItemsCreater
