/**
 * 一些view开发阶段的mock数据
 * 1- 用以支撑view的初步开发
 * 2- 在接口文档还不明确的情况下
 * 3- 部分数据还可以参与部分写死的view的渲染
 */

export default {
  // work-plat -> Home -> 待办列表数据
  waitToDoData: [{
    message: '教育部部署2018年重点高校招收农村和贫困地区学生工作'
  }, {
    message: '2018年春季福建高校党政负责干部会议召开'
  }, {
    message: '中国高校外语科学发展联盟在上外成立'
  }, {
    message: '本市进一步推进高中阶段学校考试招生制度改革实施意见出台'
  }, {
    message: '2018年春季福建高校党政负责干部会议召开'
  }, {
    message: '中国高校外语科学发展联盟在上外成立'
  }],
  sysRecommend: [{
    label: '查教育'
  }, {
    label: '超级教师'
  }, {
    label: '自主学习'
  }, {
    label: '教学助手'
  }, {
    label: '视频教育资源'
  }, {
    label: '英语教室'
  }],
  myApps: [{
    label: '学生评价'
  }, {
    label: '班务日志'
  }, {
    label: '自主学习'
  }, {
    label: '教学助手'
  }, {
    label: '电子教学设计'
  }, {
    label: '学生评价'
  }, {
    label: '班务日志'
  }, {
    label: '自主学习'
  }, {
    label: '教学助手'
  }, {
    label: '电子教学设计'
  }, {
    label: '学生评价'
  }, {
    label: '班务日志'
  }, {
    label: '自主学习'
  }, {
    label: '教学助手'
  }, {
    label: '电子教学设计'
  }, {
    label: '更多' // 这个更多到时候 我们对数据进行操作 - 在末尾加上一个更多的数据就行
  }],
  myCollection: [{
    label: '学生评价'
  }, {
    label: '班务日志'
  }, {
    label: '自主学习'
  }, {
    label: '教学助手'
  }, {
    label: '电子教学设计'
  }, {
    label: '学生评价'
  }, {
    label: '班务日志'
  }, {
    label: '自主学习'
  }, {
    label: '教学助手'
  }, {
    label: '电子教学设计'
  }, {
    label: '学生评价'
  }, {
    label: '班务日志'
  }],
  statList: [{
    title: '超级教师(教学类)',
    percent: 30
  }, {
    title: '超级教师(教学类)',
    percent: 40
  }, {
    title: '超级教师(教学类)',
    percent: 50
  }, {
    title: '超级教师(教学类)',
    percent: 60
  }, {
    title: '超级教师(教学类)',
    percent: 70
  }],
  waitToDoVnd: [{
    title: '审核通过', // 厂商 - 待办列表
    content: '您的软件【超级教师】已审核通过',
    date: '2018-03-29 12：31',
    type: 'pass'
  }, {
    title: '审核通过',
    content: '您的软件【超级教师】已审核通过',
    date: '2018-03-29 12：31',
    type: 'reject'
  }, {
    title: '审核通过',
    content: '您的软件【超级教师】已审核通过',
    date: '2018-03-29 12：31',
    type: 'info'
  }]
}
