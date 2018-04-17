import { SET_ROLE, GET_ROLE } from '../../constants/role'

const initialState = {
  code: '' // 默认为游客
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
