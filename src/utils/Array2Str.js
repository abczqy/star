/**
 * 一个工具函数 -- 适配接口的参数要求
 * 1- [1,2,3,4] --> '1,2,3,4'
 */
const array2Str = (arr) => {
  let a = arr || []
  let result = ''
  a.slice().map((v, i) => {
    if (i === 0) {
      result += `${v}`
    } else {
      result += `,${v}`
    }
  })
  console.log('result', result)
  return result
}

export { array2Str }
