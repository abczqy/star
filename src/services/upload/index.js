import { axios } from 'utils'
import config from '../../config'

const API_BASE_URL_V2 = config.API_BASE_URL_V2
const SERVICE_PORTAL = config.SERVICE_PORTAL

/**
   * 接口调用-上传文件
   * 1- 在提交时调用
   * 2- 这里利用封装 - 避免下回调地狱
   */
const getUpload = (fileType, file, callBack) => {
  // 构造参数
  let params = new FormData()
  params.append('fileType', fileType)
  params.append('file', file)
  axios.post(API_BASE_URL_V2 + SERVICE_PORTAL + `/file-upload`, params)
    .then(function (res) {
      // 不阻塞 - 执行成功会执行回调
      callBack && callBack(res)
    }).catch(function (e) {
      // 不阻塞 - 执行失败也会执行回调
      callBack && callBack(e)
    })
}

/**
   * 接口调用-上传多文件
   * 1- 在提交时调用
   * 2- 这里利用封装 - 避免下回调地狱
   */
const getMultiUpload = (fileType, fileList, callBack) => {
  // 构造参数
  let params = new FormData()
  params.append('fileType', fileType)
  fileList.forEach((file, i) => {
    params.append('file', file)
  })

  axios.post(API_BASE_URL_V2 + SERVICE_PORTAL + `/file-upload/all`, params)
    .then(function (res) {
      // 不阻塞 - 执行成功会执行回调
      callBack && callBack(res)
    }).catch(function (e) {
      // 不阻塞 - 执行失败也会执行回调
      callBack && callBack(e)
    })
}

export {
  getUpload,
  getMultiUpload
}
