import TYPES from "../reducers/types";

export function setAuthUser(user) {
  return function (dispatch) {
    dispatch({
      type: TYPES.ADD_AUTH,
      payload: {
        isAuthenticated: true,
        user: user,
      },
    });
  };
}

export function removeAuthUser() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("username");
  return function (dispatch) {
    dispatch({
      type: TYPES.REMOVE_AUTH,
      payload: {
        isAuthenticated: false,
        user: {},
      },
    });
  };
}

export function authfollowers(id, follow) {
  return function (dispatch) {
    dispatch({
      type: TYPES.EDIT_AUTH,
      payload: {
        followerId: id,
        follow,
      },
    });
  };
}
