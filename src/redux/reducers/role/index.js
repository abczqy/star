import { SET_ROLE, GET_ROLE } from '../../constants/role'
/**
 * 各个角色对应的值
 * 家长:parents
 * 学生:students
 * 教师:teacher
 * 学校:school
 * 厂商:vendor
 * 游客:''
 * 教育局:eduBureau
 * 运营者：operator
 * @type {{code: string}}
 */
const initialState = {
  code: 'operator' // 默认为游客
}

export default function role (state = initialState, action) {
  switch (action.type) {
    case SET_ROLE:
      return {code: action}
    case GET_ROLE:
      return {code: state.code}
    default:
      return state
  }
}
