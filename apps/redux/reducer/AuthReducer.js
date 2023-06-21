import {
  DELETE_LOCATION,
  LOGIN_FAILED,
  LOGIN_PEDNDING,
  LOGIN_SUCCESSFULLY,
  PENDING_LOCATION,
  UPDATE_LONG_LAT,
} from "../actionTypes";
const initialState = {
  loading: false,
  geoLocation: null,
  isLoadingLocation: false,
  selectedLocation: false,
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
    case UPDATE_LONG_LAT:
      return {
        ...state,
        geoLocation: action.payload,
        isLoadingLocation: false,
        selectedLocation: true,
      };
    case PENDING_LOCATION:
      return {
        ...state,
        isLoadingLocation: true,
      };
    case DELETE_LOCATION:
      return {
        ...state,
        geoLocation: null,
        selectedLocation: false,
      };
    default:
      return state;
  }
};

export default authReducer;
