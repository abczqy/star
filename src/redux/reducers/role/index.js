import { SET_ROLE, GET_ROLE, SET_IS_LOGGED, GET_IS_LOGGED, SET_USER_INFO, GET_USER_INFO } from '../../constants/role'
/**
 * 各个角色对应的值
 * 家长:parents 1
 * 学生:students  2
 * 教师:teacher   3
 * 学校:school    4
 * 厂商:vendor    5
 * 游客:''        6
 * 教育局:eduBureau   7
 * 运营者：operator    8
 * @type {{code: string}}
 */
const initialState = {
  code: '', // 默认为游客
  isLogged: false, // 用户是否登录
  personInfo: {} // 用户信息
}

export default function role (state = {...initialState}, action) {
  console.log('action=====')
  console.log(action)
  switch (action.type) {
    case SET_ROLE:
      return {...state, code: action.code}
    case GET_ROLE:
      return {code: state.code}
    case SET_IS_LOGGED:
      return {...state, isLogged: action.isLogged}
    case GET_IS_LOGGED:
      return {isLogged: state.isLogged}
    case SET_USER_INFO:
      return {...state, personInfo: {...action.personInfo}}
    case GET_USER_INFO:
      return {personInfo: state.personInfo}
    default:
      return state
  }
}
