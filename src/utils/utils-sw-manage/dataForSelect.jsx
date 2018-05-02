/**
   * 获得下拉框的值
   * 可以放在util中 不用每一个都写
   * @param {func} sunFn 向后台请求的函数
   * @param {string} typeVal 请求参数中的type
   * @param {string} key 要设置的selectList的key 字符串不能直接做key
   * @param {obj} thiz 把调用改函数的this环境传进来 以对调用者的环境state进行操作
   */
const getSelectList = (sunFn, typeVal, key, thiz) => {
  let list = {}
  // list['idList'] = ['123', '234', '345']
  const reqParam = typeVal ? {type: typeVal} : null
  // 向后台请求数据
  sunFn(reqParam, (res) => {
    const data = res.data
    list[key] = data.data
  })
  // 加个key ??

  // 设置selectList数据到调用者state中
  thiz.setState({
    selectList: {
      ...thiz.state.selectList,
      ...list
    }
  })
}

export { getSelectList }
