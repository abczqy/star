import {axios} from '../../utils'

/**
 * 用户登陆
 */
export function login (params, sucFn) {
  return axios.post('/session/login', {...params})
    .then(function (res) {
      sucFn(res)
    })
}
