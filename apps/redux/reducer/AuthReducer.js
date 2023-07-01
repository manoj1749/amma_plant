import {
  LOGIN_FAILED,
  LOGIN_PEDNDING,
  LOGIN_SUCCESSFULLY,
} from "../actionTypes";
const initialState = {
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PEDNDING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESSFULLY:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
