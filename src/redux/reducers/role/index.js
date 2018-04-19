import { SET_ROLE, GET_ROLE } from '../../constants/role'
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
  code: 'vendor' // 默认为游客
}

export default function role (state = {...initialState}, action) {
  switch (action.type) {
    case SET_ROLE:
      return {code: action}
    case GET_ROLE:
      return {code: state.code}
    default:
      return state
  }
}
