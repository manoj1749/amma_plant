import { combineReducers } from "redux";
import authReducer from "./reducer/AuthReducer";
import postReducer from "./reducer/PostReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});
export default rootReducer;
