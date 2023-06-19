import {
  IMAGE_UPLOADING_FAILED,
  IMAGE_UPLOADING_PENDING,
  IMAGE_UPLOADING_SUCCESSFULLY,
  USER_DATA_GET_SUCCESSFULLY,
} from "../actionTypes";
const initialState = {
  userDetail: null,
  isLoading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA_GET_SUCCESSFULLY:
      return {
        ...state,
        userDetail: action.payload,
      };
    case IMAGE_UPLOADING_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case IMAGE_UPLOADING_SUCCESSFULLY:
      return {
        ...state,
        isLoading: false,
      };
    case IMAGE_UPLOADING_FAILED:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
