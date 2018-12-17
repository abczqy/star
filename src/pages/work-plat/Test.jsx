/**
 * 为工作台前期同步开发搭建的test空间
 * 1- 在这里每个开发人员可以添加自己的页面路由等
 * 2- 可以点击跳转到各自开发页面
 */
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Test extends Component {
  render () {
    return (
      <div>
        <ul>
          <li>
            <Link to='/operate-manage-home/work-plat/home'>
              首页
            </Link>
          </li>
          <li>
            管理
            <ul>
              <li>
                <Link to='/operate-manage-home/work-plat/manage'>
                测试
                </Link>
              </li>
            </ul>
          </li>
          <li>
            个人中心
            <ul>
              <li>
                <Link to='/operate-manage-home/work-plat/per-center'>
                测试
                </Link>
              </li>
              <li>
                <Link to='/operate-manage-home/work-plat/per-center'>
                首页
                </Link>
              </li>
            </ul>
          </li>
          <li>
            弹窗测试页
            <ul>
              <li>
                <Link to='/operate-manage-home/work-plat/per-center'>
                测试
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Test)