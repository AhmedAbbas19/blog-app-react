import TYPES from "./types";

const initialState = {
  isAuthenticated: false,
  activeUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.ADD_AUTH:
    case TYPES.REMOVE_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        activeUser: action.payload.user,
      };
    case TYPES.EDIT_AUTH:
      const user = { ...state.activeUser };
      if (action.payload.follow) {
        user.followers.push(action.payload.followerId);
      } else {
        const idx = user.followers.findIndex(
          (f) => f === action.payload.followerId
        );
        user.followers.splice(idx, 1);
      }
      return {
        ...state,
        activeUser: user,
      };
    default:
      return state;
  }
}
