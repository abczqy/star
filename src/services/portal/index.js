import {axios} from '../../utils'

/**
 * 用户登陆
 */
export function login (sucFn) {
  return axios.get('/session/login')
    .then(response => { sucFn(response.data) })
}
