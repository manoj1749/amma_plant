import {
  IMAGE_UPLOADING_FAILED,
  IMAGE_UPLOADING_PENDING,
  IMAGE_UPLOADING_SUCCESSFULLY,
  USER_DATA_GET_SUCCESSFULLY,
} from "../actionTypes";
const initialState = {
  userDetail: null,
  isUploadLoading: false,
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
        isUploadLoading: true,
      };
    case IMAGE_UPLOADING_SUCCESSFULLY:
      return {
        ...state,
        isUploadLoading: false,
      };
    case IMAGE_UPLOADING_FAILED:
      return {
        ...state,
        isUploadLoading: false,
      };

    default:
      return state;
  }
};

export default postReducer;
