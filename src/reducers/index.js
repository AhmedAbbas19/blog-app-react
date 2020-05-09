import { combineReducers } from "redux";
import blogReducer from "../reducers/blogReducer";
import catReducer from "../reducers/catReducer";
import usersReducer from "../reducers/userReducer";

export default combineReducers({
  blogs: blogReducer,
  categories: catReducer,
  users: usersReducer,
});
