/**
 * 后台管理
 * 常用到的一些工具函数-抽象出来-公用
 */

/**
   * 为每一条表格数据增加一个key值 目前是有id的话 用id 也可以抽象成工具函数出去 能不做重复的就不做重复的吧
   * 返回一个新的dataSource 赋值给state.tableData.data
   * @param {int} datas 从后台拿到的原始的list
   * @param {string} idName 这里是父组件数据中的id值 参与key值的生成 可选参数
   */
const addKey2TableData = (datas, idName) => {
  let resArr = datas || []
  datas && datas instanceof Array && datas.map((curVal, index) => {
    // 当idName没有的时候 我们有自己的生成key值的算法
    resArr[index].key = idName
      ? (curVal[idName] + index)
      : (index + 'key' + getIntRandom())
  })
  return resArr
}
/**
 * 获得随机整数
 */
const getIntRandom = () => {
  return Math.ceil(Math.random() * 1000)
}

/**
 * 将对象转为string 供打印数据
 * 测试用：把obj转成string -- 有的obj用JSON.stringify转不了
 * 后面可以作为测试函数放在utils中
 */
const Obj2String = (obj) => {
  let str = ''

  for (let item in obj) {
    str += `${item}: ${obj[item]} \n`
  }

  return str
}

/**
 * 对象的深拷贝 -- 返回一个深拷贝后的对象
 * 目前导出后调用会报错 暂未探究 供内部调用
 * @param {obj} srcObj 源对象
 */
const deepCopy = (srcObj) => {
  let result = {}
  for (let i in srcObj) {
    if (typeof srcObj[i] === 'object') {
      // 递归
      result[i] = (srcObj[i].constructor === Array) ? [] : {}
      result[i] = deepCopy(srcObj[i])
      // if (srcObj[i].constructor === Array) {
      //   srcObj[i].map((item) => {
      //     result[i] = deepCopy(item)
      //   })
      // } else {
      //   result[i] = deepCopy(srcObj[i])
      // }
    } else {
      result[i] = srcObj[i]
    }
  }
  return result
}

export { addKey2TableData, getIntRandom, Obj2String }
