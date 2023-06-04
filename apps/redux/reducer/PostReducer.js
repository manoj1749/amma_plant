import { USER_DATA_GET_SUCCESSFULLY } from "../actionTypes";
const initialState = {
  userDetail: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_GET_SUCCESSFULLY:
      return {
        ...state,
        userDetail: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
