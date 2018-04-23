import { SET_ROLE, GET_ROLE, SET_IS_LOGGED, GET_IS_LOGGED, SET_USER_INFO, GET_USER_INFO } from '../../constants/role'

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

/**
 * 设置当前用户角色
 */
export const setIsLogged = (isLogged) => ({
  type: SET_IS_LOGGED,
  isLogged
})

/**
 * 返回用户角色
 */
export const getIsLogged = () => ({
  type: GET_IS_LOGGED
})

/**
 * 设置当前用户角色
 */
export const setUserInfo = (personInfo) => ({
  type: SET_USER_INFO,
  personInfo
})

/**
 * 返回用户角色
 */
export const getUserInfo = () => ({
  type: GET_USER_INFO
})
