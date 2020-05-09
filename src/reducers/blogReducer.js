import TYPES from "./types";

const initialState = {
  hotItems: [],
  latestItems: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TYPES.FETCH_HOT_BLOGS:
      return {
        ...state,
        hotItems: action.payload,
      };
    case TYPES.FETCH_LATEST_BLOGS:
      return {
        ...state,
        latestItems: action.payload,
      };
    case TYPES.ADD_BLOG:
      let blogs = state.latestItems;
      blogs.push(action.payload);
      return {
        ...state,
        latestItems: blogs,
      };
    default:
      return state;
  }
}
