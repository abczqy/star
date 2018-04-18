import { SET_ROLE, GET_ROLE } from '../../constants/role'

/**
 * 设置当前用户角色
 */
export const setRole = (code) => ({
  type: SET_ROLE,
  code
})

/**
 * 返回用户角色
 */
export const getRole = () => ({
  type: GET_ROLE
})
