import {axios} from '../../utils'

/**
 * 用户登陆
 */
export function login (sucFn) {
  return axios.get('/home/login/students')
    .then(response => { sucFn(response.data) })
}
