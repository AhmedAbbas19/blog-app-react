import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import catReducer from "./catReducer";
import authReducer from "./authReducer";

export default combineReducers({
  blogs: blogReducer,
  categories: catReducer,
  auth: authReducer,
});
