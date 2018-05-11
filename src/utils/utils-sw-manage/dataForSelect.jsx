/**
   * 获得下拉框的值
   * 可以放在util中 不用每一个都写
   * @param {func} sunFn 向后台请求的函数
   * @param {string} typeVal 请求参数中的type
   * @param {string} key 要设置的selectList的key 字符串不能直接做key
   * @param {obj} thiz 把调用改函数的this环境传进来 以对调用者的环境state进行操作
   */
const getSelectList = (sunFn, typeVal, key, thiz) => {
  // list['idList'] = ['123', '234', '345']
  const reqParam = typeVal ? {type: typeVal} : null
  // console.log(`reqParam: ${JSON.stringify(reqParam)}`)
  // 向后台请求数据
  sunFn(reqParam, (res) => {
    const data = res.data
    let list = {}
    list[key] = data.list
    // 设置selectList数据到调用者state中
    thiz.setState({
      selectList: {
        ...thiz.state.selectList,
        ...list
      }
    })

    // console.log(`工具函数中-请求回调内-原始数据：${data.list}`)
    // console.log(`工具函数中-请求回调内-添加数据：${list[key]}`)
    // console.log(`工具函数中：${JSON.stringify(list)}`)
  })
  // 加个key ??
}

const getSelectListWithNoParam = (sunFn, key, thiz) => {
  // list['idList'] = ['123', '234', '345']
  // 向后台请求数据
  if (key === 'eduClassList') {
    sunFn((res) => {
      const data = res.data
      let list = {}
      list[key] = data.list
      // 设置selectList数据到调用者state中
      thiz.setState({
        selectList: {
          ...thiz.state.selectList,
          ...list
        }
      }, () => {
        thiz.state.selectList.eduClassList.push('全部')
      })

      console.log(`工具函数中-请求回调内-原始数据：${data.list}`)
      console.log(`工具函数中-请求回调内-添加数据：${list[key]}`)
      console.log(`工具函数中：${JSON.stringify(list)}`)
    })
  } else {
    sunFn((res) => {
      const data = res.data
      let list = {}
      list[key] = data.list
      // 设置selectList数据到调用者state中
      thiz.setState({
        selectList: {
          ...thiz.state.selectList,
          ...list
        }
      })

      console.log(`工具函数中-请求回调内-原始数据：${data.list}`)
      console.log(`工具函数中-请求回调内-添加数据：${list[key]}`)
      console.log(`工具函数中：${JSON.stringify(list)}`)
    })
  }
  // 加个key ??
}

export { getSelectList, getSelectListWithNoParam }
