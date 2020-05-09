import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import setAuthorizationToken from "../src/components/users/utils/utils";

const initialState = {};
const middlewares = [thunk];

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);

setAuthorizationToken(localStorage["jwtToken"]);
