/**
 * 一份默认的"后台管理"的菜单描述文件-json
 * 数据结构:
 * {
 *  title: // 菜单item的名字 字符串/有样式的组件
 *  icon: // title前面的图标（允许缺省）
 *  to: // 要跳转到的页面路由
 *  children: // 子menu的item 是一个数组
 * }
 */
import ImgSoft from 'assets/images/operationMana/u103.png'
import ImgMemb from 'assets/images/operationMana/u15.png'
import ImgPlat from 'assets/images/operationMana/u57.png'
// import ImgOper from 'assets/images/operationMana/u83.png'

export default [
  /* {
    title: '工单管理',
    icon: ImgSoft,
    key: '1',
    to: '/software-market-home/software-manage/businessing'
  }, */
  {
    title: '门户平台管理',
    icon: ImgPlat,
    key: '2',
    children: [
      {
        title: '门户首页',
        key: '2-1',
        to: '/software-market-home/platform-manage/porttal-homepage'
      }, {
        title: '教育新闻',
        key: '2-2',
        to: '/software-market-home/platform-manage/news-list'
      }, {
        title: '信息公开',
        key: '2-3',
        to: '/software-market-home/platform-manage/public-info'
      }
    ]
  }, {
    title: '软件超市管理',
    icon: ImgPlat,
    key: '3',
    children: [
      {
        title: '超市平台管理',
        key: '3-1',
        to: '/software-market-home/soft-market-manage/plat-manage'
      }, {
        title: '应用管理',
        icon: ImgPlat,
        key: '3-2',
        children: [
          {
            title: '上架列表',
            key: '3-2-1',
            to: '/software-market-home/software-manage/businessing'
          }, {
            title: '待审核',
            key: '3-2-2',
            to: '/software-market-home/software-manage/wait-verify'
          }, {
            title: '迭代审核',
            key: '3-2-3',
            to: '/software-market-home/software-manage/iteration-verify'
          }, {
            title: '下架列表',
            key: '3-2-4',
            to: '/software-market-home/software-manage/remove'
          }, {
            title: '未通过审核',
            key: '3-2-5',
            to: '/software-market-home/software-manage/reject'
          }
          // }, {
          //   title: '应用统计',
          //   key: '3-2-6',
          //   to: '/software-market-home/platform-manage/app-count'
          // }
        ]
      }
    ]
  }, /* {
    title: '运营统计',
    icon: ImgOper,
    key: '4',
    to: '/software-market-home/software-manage/analysis'
    // children: [
    //   {
    //     title: '应用统计',
    //     key: '4-1',
    //     to: '/software-market-home/platform-manage/app-count'
    //   }, {
    //     title: '用户统计',
    //     key: '4-2',
    //     to: '/software-market-home/platform-manage/user-count'
    //   }
    // ]
  }, {
    title: '订单管理',
    icon: ImgSoft,
    key: '5',
    to: '/software-market-home/software-manage/businessing'
  }, {
    title: '财务管理',
    icon: ImgSoft,
    key: '6',
    to: '/software-market-home/software-manage/businessing'
  }, {
    title: '销售管理',
    icon: ImgSoft,
    key: '7',
    to: '/software-market-home/software-manage/businessing'
  }, {
    title: '用户管理',
    icon: ImgMemb,
    key: '8',
    children: [
      {
        title: '老师',
        key: '8-1',
        to: '/software-market-home/member-manage/teacher'
      }, {
        title: '学生',
        key: '8-2',
        to: '/software-market-home/member-manage/student'
      }, {
        title: '家长',
        key: '8-3',
        to: '/software-market-home/member-manage/parent'
      }, {
        title: '游客',
        key: '8-4',
        to: '/software-market-home/member-manage/tourist'
      }
    ]
  }, */{
    title: '用户管理',
    icon: ImgMemb,
    key: '12',
    to: '/software-market-home/member-manage/home'
  }, /* {
    title: '实体管理',
    icon: ImgMemb,
    key: '11',
    children: [
      {
        title: '厂商',
        key: '11-1',
        to: '/software-market-home/member-manage/manufacturer'
      }, {
        title: '学校',
        key: '11-2',
        to: '/software-market-home/member-manage/school'
      }, {
        title: '教育机构',
        key: '11-3',
        to: '/software-market-home/member-manage/educational-services'
      }
    ]
  }, {
    title: '系统设置',
    icon: ImgSoft,
    key: '9',
    to: '/software-market-home/software-manage/businessing'
  }, */{
    title: '消息管理',
    icon: ImgSoft,
    key: '10',
    to: '/software-market-home/software-manage/messages'
  }
]
